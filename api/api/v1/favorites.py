from sqlite3 import IntegrityError
import os
import uuid
from schemas.favorites import FavoritesSchema
from werkzeug.utils import secure_filename
from flask import request, url_for, jsonify, send_from_directory
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, create_refresh_token, get_jwt_identity
from flask.views import MethodView
from passlib.hash import pbkdf2_sha256
from sqlalchemy.exc import SQLAlchemyError
from flask_smorest import Blueprint, abort
from models.pet import AnimalModel, PhotoModel
from models.favorites import FavoriteModel
from schemas.pet import PhotoSchema, AnimalSchema
from db import db

import json
from blocklist import BLOCKLIST


blp=Blueprint("Favorites", "favorites", description="Operations on pets")
@blp.route("/favorites")
class Favorites(MethodView):
    @jwt_required()
    @blp.response(200, FavoritesSchema)
    def get(self):
        user_id=get_jwt_identity()
        favorites = FavoriteModel.get_user_favorites(user_id)
        favorite_list = []
        for favorite in favorites:
            if favorite.animal:
                favorite_list.append (
                    {
                        'id': favorite.id,
                        'animal': {
                            'id': favorite.animal.id,
                            'name': favorite.animal.name,
                            'gender': favorite.animal.gender,
                            'weight': favorite.animal.weight,
                            'color': favorite.animal.color,
                            'age': favorite.animal.age,
                            'type':favorite.animal.type,
                            'user_id':favorite.animal.user_id,
                            'breed': favorite.animal.breed,
                            'description': favorite.animal.description,
                            'photos': [url_for('Pets.photo', animal_id=favorite.animal.id, filename=photo.filename) for photo in favorite.animal.photos],
                            'city': favorite.animal.city,
                            'country': favorite.animal.country,
                        }
                    } 
                )
        return jsonify(favorite_list)

@blp.route("/favorites/add")
class FavoritesAdd(MethodView):
    @jwt_required()
    @blp.arguments(FavoritesSchema)
    def post(self, data):
        user_id = get_jwt_identity()
        """API for adding an animal to the favorites table"""
        animal_id = data.get("animal_id")

        if not user_id or not animal_id:
            return jsonify({'message': 'Both user_id and animal_id are required'}), 400

        # Check if the favorite already exists
        existing_favorite = FavoriteModel.query.filter_by(user_id=user_id, animal_id=animal_id).first()
        if existing_favorite:
            return jsonify({'message': 'Favorite already exists'}), 400

        new_favorite = FavoriteModel(user_id=user_id, animal_id=animal_id)
        db.session.add(new_favorite)
        db.session.commit()

        return jsonify({'message': 'Favorite added successfully'}), 201

@blp.route("/favorites/delete/<int:animal_id>")
class FavoritesDelete(MethodView):
    @jwt_required()
    
    def delete(self, animal_id):
        user_id = get_jwt_identity()

        if not user_id or not animal_id:
            return jsonify({'message': 'Both user_id and animal_id are required'}), 400

        # Find and delete the favorite
        favorite = FavoriteModel.query.filter_by(user_id=user_id, animal_id=animal_id).first()
        if favorite:
            db.session.delete(favorite)
            db.session.commit()
            return jsonify({'message': 'Favorite deleted successfully'}), 200
        else:
            return jsonify({'message': 'Favorite not found'}), 404