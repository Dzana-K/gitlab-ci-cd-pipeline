from db import db

class FavoriteModel(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    animal = db.relationship('AnimalModel', foreign_keys=[animal_id])

    @classmethod
    def get_user_favorites(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()