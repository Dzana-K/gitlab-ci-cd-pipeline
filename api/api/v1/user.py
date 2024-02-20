from sqlite3 import IntegrityError
import uuid
from flask import request, request, redirect, url_for, flash, jsonify
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, create_refresh_token, get_jwt_identity
from flask.views import MethodView
from passlib.hash import pbkdf2_sha256
from flask_mail import Mail, Message
from sqlalchemy.exc import SQLAlchemyError
from flask_smorest import Blueprint, abort
from .email_utils import mail


from models.user import UserModel
from schemas.user import UserSchema
from db import db
from blocklist import BLOCKLIST


blp=Blueprint("Users", "users", description="Operations on users")

@blp.route("/register")
class UserRegister(MethodView):
    @blp.arguments(UserSchema)
    def post(self, user_data):
        """api for registering a user and adding his data to the users table"""
        print(user_data)
        if  UserModel.query.filter(UserModel.email==user_data["email"]).first():
            abort(409, message="A user with that email already exists.")
        
       
        user=UserModel(
            email=user_data["email"],
            password=pbkdf2_sha256.hash(user_data["password"]),
            first_name=user_data["first_name"],
            last_name=user_data["last_name"],
            address=user_data["address"],
            city=user_data["city"],
            country=user_data["country"],

        )   
        
        db.session.add(user)
        db.session.commit() 
        access_token=create_access_token(identity=user.id, fresh=True)
        refresh_token=create_refresh_token(identity=user.id)
        return {"access_token": access_token, "refresh_token":refresh_token, "user_id":user.id}
        #return {"message": "User created successfully."},201
    
@blp.route("/user/<int:user_id>")
class User(MethodView):
    @jwt_required()
    @blp.response(200, UserSchema)
    def get(self, user_id):
        user=UserModel.query.get_or_404(user_id)
        return user

    def delete(self, user_id):
        user=UserModel.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"message":"User deleted"}, 200    
    
@blp.route("/login")
class UserLogin(MethodView):
    @blp.arguments(UserSchema(only=["email", "password"]))
    def post(self, user_data):
        user=UserModel.query.filter(
            UserModel.email==user_data["email"]
        ).first()

        if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            access_token=create_access_token(identity=user.id, fresh=True)
            refresh_token=create_refresh_token(identity=user.id)
            return {"access_token": access_token, "refresh_token":refresh_token, "user_id":user.id}
        abort(401, message="Invalid credentials.")
@blp.route("/refresh")
class TokenRefresh(MethodView):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        print(f"Refreshing token for user {current_user}")
        new_token = create_access_token(identity=current_user, fresh=False)
        
        jti = get_jwt()["jti"]
        print(get_jwt()["jti"])
        BLOCKLIST.add(jti)
        print(f"New access token generated: {new_token}")
        return {"access_token": new_token}, 200
@blp.route("/logout")
class UserLogout(MethodView):
    @jwt_required()
    def post(self):
        jti = get_jwt()["jti"]
        print(get_jwt()["jti"])
        BLOCKLIST.add(jti)
        return {"message": "Successfully logged out"}, 200        
@blp.route('/send_email')
class SendEmail(MethodView):
    @jwt_required()
    def post(self):
        data = request.get_json()
        recipient = data.get('recipient')
        subject = data.get('subject')
        body =data.get('body')

        message = Message(subject, recipients=[recipient], body=body)
        mail.send(message)

        flash('Email sent successfully', 'success')
        return {"message": "Email sent successfully"}