import pytest

from app import create_app
from db import db
import logging
from models.pet import AnimalModel
logging.basicConfig(level=logging.DEBUG)

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        
        db.session.close()
        db.session.remove()
        db.drop_all()


@pytest.mark.usefixtures("client")
def test_add_animal(client):
    logging.debug("Starting test_add_animal")
    # Make a POST request to add a new animal
    data = {'user_id':'1','name': 'New Test Animal', 'gender': 'male', 'city': 'Test City', 'country': 'Test Country', 'weight':'test', 'color':'test', 'age':'3', 'breed':'cat', 'description':'hfjkkbk', 'type':'cat', }
    response = client.post('/animals', data=data)
    assert response.status_code == 201

    # Check if the animal was added to the database
    animal = AnimalModel.query.filter_by(name='New Test Animal').first()
    assert animal is not None
    assert animal.name == 'New Test Animal'
    assert animal.gender == 'male'
    assert animal.city == 'Test City'
    assert animal.country == 'Test Country'

