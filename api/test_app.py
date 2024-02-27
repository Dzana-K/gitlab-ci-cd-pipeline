from flask_jwt_extended import create_access_token
import pytest

from app import create_app
from db import db
import logging
from models.pet import AnimalModel
logging.basicConfig(level=logging.DEBUG)

@pytest.fixture
def app():
    app = create_app('sqlite:///test.db')
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'  
    with app.app_context():
        db.create_all()
        yield app
        db.session.close()
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()


@pytest.mark.usefixtures("client")

def test_add_animal(client):
    logging.debug("Starting test_add_animal")
    user_id = 1  
    access_token = create_access_token(identity=user_id)
    
    data = {'name': 'New Test Animal', 'gender': 'male', 'city': 'Test City', 'country': 'Test Country', 'weight':'test', 'color':'test', 'age':'3', 'breed':'cat', 'description':'hfjkkbk', 'type':'cat', }
    headers = {'Authorization': f'Bearer {access_token}'}
    response = client.post('/animals', data=data, headers=headers)
    assert response.status_code == 201
    
    
    animal = AnimalModel.query.filter_by(name='New Test Animal').first()
    assert animal is not None
    assert animal.name == 'New Test Animal'
    assert animal.gender == 'male'
    assert animal.city == 'Test City'
    assert animal.country == 'Test Country'

    
    
@pytest.mark.usefixtures()

def test_fetch_animal(client ):
    user_id = 1  
    access_token = create_access_token(identity=user_id)
    headers = {'Authorization': f'Bearer {access_token}'}
    data = {'name': 'New Test Animal', 'gender': 'male', 'city': 'Test City', 'country': 'Test Country', 'weight':'test', 'color':'test', 'age':'3', 'breed':'cat', 'description':'hfjkkbk', 'type':'cat', }
    headers = {'Authorization': f'Bearer {access_token}'}
    response = client.post('/animals', data=data, headers=headers)
    
    
    
    response = client.get('/animal/1', headers=headers)
    
    assert response.status_code == 200
    data = response.json
    assert data['name'] == 'New Test Animal'
    assert data['gender'] == 'male'
    assert data['city'] == 'Test City'
    assert data['country'] == 'Test Country'
   