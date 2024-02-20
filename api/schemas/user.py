from marshmallow import Schema, fields

class UserSchema(Schema):
    id=fields.Int(dump_only=True)
    
    password=fields.Str(required=True, load_only=True)   
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    email = fields.Email(required=True)
    
    address = fields.Str(required=True)
    city = fields.Str(required=True)
    country = fields.Str(required=True)