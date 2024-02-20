from db import db
class PhotoModel(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    

class AnimalModel(db.Model):
    __tablename__ = 'animals'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    weight = db.Column(db.String(20), nullable=True)
    color = db.Column(db.String(50), nullable=True)
    age = db.Column(db.String(20), nullable=True)
    breed = db.Column(db.String(255), nullable=True)
    type = db.Column(db.String(50), nullable=True)
    description = db.Column(db.String, nullable=True)
    photos = db.relationship('PhotoModel', lazy=True, cascade='all, delete-orphan')
    city = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    
    @classmethod
    def get_user_posts(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()