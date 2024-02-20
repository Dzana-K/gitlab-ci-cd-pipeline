from sqlite3 import IntegrityError
import os
import uuid
from sqlalchemy import or_, and_
from sqlalchemy.dialects import mysql
from werkzeug.utils import secure_filename
from flask import request, url_for, jsonify, send_from_directory
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, create_refresh_token, get_jwt_identity
from flask.views import MethodView
from passlib.hash import pbkdf2_sha256
from sqlalchemy.exc import SQLAlchemyError
from flask_smorest import Blueprint, abort
from models.pet import AnimalModel, PhotoModel
from schemas.pet import PhotoSchema, AnimalSchema
from db import db

import json
from blocklist import BLOCKLIST


blp=Blueprint("Pets", "pets", description="Operations on pets")
@blp.route("/animals")
class AnimalsAPI(MethodView):
    @jwt_required()
    @blp.response(200,AnimalSchema(many=True))
    def get(self):
        ##animals = AnimalModel.query.all()
        """""
        animal_type = request.args.get('type')  # Get the animal type from query parameter
        if animal_type:
            animals = AnimalModel.query.filter_by(type=animal_type).all()
        else:
            animals = AnimalModel.query.all()"""
        animal_type = request.args.get('type')  # Get the animal type from query parameter
        search_query = request.args.get('searchQuery')  # Get the search query from query parameter

        query = AnimalModel.query

        if animal_type:
            query = query.filter_by(type=animal_type)
        if search_query:
            print('hello')
            search_terms = search_query.split(',')  # Split the search_query into individual words
            print(search_terms)
            conditions = []
            for term in search_terms:
        # Handle gender separately with an exact match
                if term.lower() in ['male', 'female']:
                    conditions.append(AnimalModel.gender == term.lower())
                else:
                    conditions.append(
                        or_(
                            AnimalModel.name.ilike(f'%{term}%'),
                            AnimalModel.description.ilike(f'%{term}%'),
                            AnimalModel.city.ilike(f'%{term}%'),
                            AnimalModel.country.ilike(f'%{term}%'),
                            AnimalModel.type.ilike(f'%{term}%')
                        )
                    )

            query = query.filter(and_(*conditions))
            

            
        animals = query.all()


        
        animal_list = [{
            'id': animal.id,
            'name': animal.name,
            'gender': animal.gender,
            'weight': animal.weight,
            'color': animal.color,
            'age': animal.age,
            'breed': animal.breed,
            'description': animal.description,
            'photos': [url_for('Pets.photo', animal_id=animal.id, filename=photo.filename) for photo in animal.photos],
            'city': animal.city,
            'country': animal.country,
            'user_id':animal.user_id,
            'type':animal.type,
        } for animal in animals]

        print(animal_list)
        return jsonify(animal_list)
    
    @jwt_required()
    @blp.response(201, AnimalSchema)
    def post(self):
        data = request.form.to_dict()
        user_id = get_jwt_identity()
        # Assuming 'photos' is the key for file uploads
        photos = request.files.getlist('photos')
        print(photos)
        # Validate and process the JSON data
        if 'name' not in data or 'gender' not in data or 'city' not in data or 'country' not in data:
            return jsonify({'message': 'Missing required fields'}), 400

        new_animal = AnimalModel(
            name=data['name'],
            gender=data['gender'],
            weight=data.get('weight'),
            color=data.get('color'),
            age=data.get('age'),
            breed=data.get('breed'),
            description=data.get('description'),
            city=data['city'],
            country=data['country'],
            user_id=user_id,
            type=data.get('type')
        )

        db.session.add(new_animal)
        db.session.commit()

        # Handle file uploads
        for photo in photos:
            # Ensure a secure filename to prevent security issues
            filename = secure_filename(photo.filename)
            upload_folder = 'photo'
            filepath = os.path.join(upload_folder, str(new_animal.id), filename)
            os.makedirs(os.path.dirname(filepath), exist_ok=True)
            photo.save(filepath)
            print(filepath)
            new_photo = PhotoModel(animal_id=new_animal.id, filename=filename)
            db.session.add(new_photo)

        db.session.commit()

        return jsonify({'message': 'Animal added successfully'}), 201
@blp.route("/animal/<int:animal_id>")
class FetchAnimal(MethodView):
    @jwt_required()
    @blp.response(200,AnimalSchema)
    def get(self, animal_id):
        animal = AnimalModel.query.get(animal_id)
        
        
        if animal:
            animal_data = {
                'id': animal.id,
                'name': animal.name,
                'gender': animal.gender,
                'weight': animal.weight,
                'color': animal.color,
                'age': animal.age,
                'breed': animal.breed,
                'description': animal.description,
                'photos': [url_for('Pets.photo', animal_id=animal.id, filename=photo.filename) for photo in animal.photos],
                'city': animal.city,
                'country': animal.country,
                'user_id':animal.user_id
            }
            print(animal_data)
            return jsonify(animal_data)
        else:
            return jsonify({'message': 'Animal not found'}), 404
        
@blp.route('/photo')
class PhotoAPI(MethodView):
    def get(self, animal_id, filename):
        photo_folder = os.path.join(os.getcwd(), 'photo')
        file_path = os.path.join(photo_folder, str(animal_id), filename)
        print(f"Constructed File Path: {file_path}")
        return send_from_directory(photo_folder, str(animal_id) + '/' + filename)
@blp.route("/user/posts")
class UserPosts(MethodView):
    @jwt_required()
    @blp.response(200, AnimalSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()

        user_posts = AnimalModel.get_user_posts(user_id)
        post_list = [
            {
                'id': post.id,
                'name': post.name,
                'gender': post.gender,
                'weight': post.weight,
                'color': post.color,
                'age': post.age,
                'breed': post.breed,
                'description': post.description,
                'photos': [url_for('Pets.photo', animal_id=post.id, filename=photo.filename) for photo in post.photos],
                'city': post.city,
                'country': post.country,
            } for post in user_posts
        ]
        return jsonify(post_list)
@blp.route("/animal/delete/<int:animal_id>")
class AnimalDelete(MethodView):
    @jwt_required()
    
    def delete(self, animal_id):  
        user_id = get_jwt_identity()

        # Check if the post exists
        post_to_delete = AnimalModel.query.filter_by(id=animal_id, user_id=user_id).first()
        if not post_to_delete:
            return jsonify({'message': 'Post not found'}), 404

        # Check if the user has permission to delete the post
        if post_to_delete.user_id != user_id:
            return jsonify({'message': 'Permission denied'}), 403

        # Delete the post and associated photos
        db.session.delete(post_to_delete)
        db.session.commit()

        return jsonify({'message': 'Post deleted successfully'}), 200

blp.add_url_rule('/animals', view_func=AnimalsAPI.as_view('animals'))
blp.add_url_rule('/photo/<int:animal_id>/<filename>', view_func=PhotoAPI.as_view('photo'))