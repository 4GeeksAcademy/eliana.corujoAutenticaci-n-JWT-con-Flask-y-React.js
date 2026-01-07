from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token # Importamos JWT

api = Blueprint('api', __name__)
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello from backend"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    if not body or 'email' not in body or 'password' not in body:
        return jsonify({"msg": "Faltan datos"}), 400

    user = User.query.filter_by(email=body['email']).first()
    if user:
        return jsonify({"msg": "El usuario ya existe"}), 400

    new_user = User(email=body['email'], password=body['password'], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "Usuario creado con éxito"}), 200

# --- ESTA ES LA RUTA DE LOGIN ---
@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if not body or 'email' not in body or 'password' not in body:
        return jsonify({"msg": "Faltan datos"}), 400

    user = User.query.filter_by(email=body['email']).first()

    # Si no existe el usuario o la clave está mal
    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    if user.password != body['password']:
        return jsonify({"msg": "Contraseña incorrecta"}), 401

    # Crear token
    access_token = create_access_token(identity=user.email)
    return jsonify({"token": access_token, "user_id": user.id}), 200