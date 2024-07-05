from flask import jsonify, request
from app.models import Testimonio

def index():
    return jsonify({'message': 'Bienvenidos a la prueba de AprendeV'})

def create_testimonio():
    data = request.json
    new_testimonio = Testimonio(estudiante=data['estudiante'], comentario=data['comentario'], fecha_publicacion=data['fecha_publicacion'], foto_perfil=data['foto_perfil'])
    new_testimonio.save()
    return jsonify({'message': 'El Testimonio fue creado correctamente.'}), 201

def get_all_testimonios():
    testimonios = Testimonio.get_all()
    # return jsonify([testimonios.serialize() for testimonio in testimonios]) Linea anterior
    # return jsonify([movie.serialize() for movie in movies]) Linea original
    return jsonify([testimonio.serialize() for testimonio in testimonios])

def get_testimonio(testimonio_id):
    testimonio = Testimonio.get_by_id(testimonio_id)
    if not testimonio:
        return jsonify({'message': 'Testimonio no Encontrado.'}), 404
    return jsonify(testimonio.serialize())

def update_testimonio(testimonio_id):
    testimonio = Testimonio.get_by_id(testimonio_id)
    if not testimonio:
        return jsonify({'message': 'Testimonio no Encontrado.'}), 404
    data = request.json
    testimonio.estudiante = data['estudiante']
    testimonio.comentario = data['comentario']
    testimonio.fecha_publicacion = data['fecha_publicaion']
    testimonio.foto_perfil = data['foto_perfil']
    testimonio.save()
    return jsonify({'message': 'El Testimonio a sido creado correctamente.'})

def delete_testimonio(testimonio_id):
    testimonio = Testimonio.get_by_id(testimonio_id)
    if not testimonio:
        return jsonify({'message': 'Testimonio no encontrado.'}), 404
    testimonio.delete()
    return jsonify({'message': 'El testimonio ha sido borrado con exito.'})