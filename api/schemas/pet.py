from marshmallow import Schema, fields

class PhotoSchema(Schema):
    id = fields.Int(dump_only=True)
    filename = fields.Str(required=True)

class AnimalSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    gender = fields.Str(required=True)
    weight = fields.Str(required=True)
    color = fields.Str(required=True)
    age = fields.Str(required=True)
    breed = fields.Str(required=True)
    description = fields.Str(required=True)
    photos = fields.Nested(PhotoSchema, many=True)
    city = fields.Str(required=True)
    type=fields.Str(required=True)
    country = fields.Str(required=True)
    user_id = fields.Int(dump_only=True)