import pytest

from app import create_app
from db import db
import logging
from models.pet import AnimalModel
logging.basicConfig(level=logging.DEBUG)
@pytest.fixture
def client():
    print("Starting test_add_animal")
    app = create_app()
    logging.debug("Starting test_add_animal")
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.session.remove()
            db.drop_all()
@pytest.mark.usefixtures("client")
def test_add_animal(client):
    logging.debug("Starting test_add_animal")
    # Make a POST request to add a new animal
    data = {'name': 'New Test Animal', 'gender': 'male', 'city': 'Test City', 'country': 'Test Country'}
    response = client.post('/animals', data=data)
    assert response.status_code == 201

    # Check if the animal was added to the database
    animal = AnimalModel.query.filter_by(name='New Test Animal').first()
    assert animal is not None
    assert animal.name == 'New Test Animal'
    assert animal.gender == 'male'
    assert animal.city == 'Test City'
    assert animal.country == 'Test Country'
@pytest.mark.usefixtures("client")
def test_fetch_animal(client):
    logging.debug("Starting test_fetch_animal")
    # Add a test animal to the database
    animal = AnimalModel(name='Test Animal', gender='male', city='Test City', country='Test Country')
    db.session.add(animal)
    db.session.commit()

    # Make a GET request to fetch the test animal
    response = client.get(f'/animal/{animal.id}')
    assert response.status_code == 200

    # Check if the response data contains the test animal
    assert b'Test Animal' in response.data
    assert b'Test City' in response.data
    assert b'Test Country' in response.data