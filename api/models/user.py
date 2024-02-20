from db import db

class UserModel(db.Model):
    __tablename__="users"

    id=db.Column(db.Integer, primary_key=True)
    
    password=db.Column(db.String(80), nullable=False)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True, nullable=False)
    
    address = db.Column(db.String(255))
    city = db.Column(db.String(100))
    country = db.Column(db.String(100))
    
    