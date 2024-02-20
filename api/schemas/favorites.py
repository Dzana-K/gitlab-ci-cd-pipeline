from marshmallow import Schema, fields
from schemas.pet import AnimalSchema

class FavoritesSchema(Schema):
    id = fields.Int(dump_only=True)
    animal_id = fields.Int(required=True)
    user_id = fields.Int(dump_only=True)
    animal = fields.Nested(AnimalSchema(), dump_only=True) 

    @classmethod
    def get_user_favorites(cls, user_id):
        return cls(many=True).dump(cls.query.filter_by(user_id=user_id).all())
