from flask import jsonify, request
from app.models import Movie

def index():
    return jsonify({'message': 'Hello World API Cac-movies'})

def create_movie():
    data = request.json
    new_movie = Movie(title=data['title'], director=data['director'], release_date=data['release_date'], banner=data['banner'])
    new_movie.save()
    return jsonify({'message': 'Movie created successfully'}), 201

def get_all_movies():
    movies = Movie.get_all()
    return jsonify([movie.serialize() for movie in movies])

def get_movie(movie_id):
    movie = Movie.get_by_id(movie_id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404
    return jsonify(movie.serialize())

def update_movie(movie_id):
    movie = Movie.get_by_id(movie_id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404
    data = request.json
    movie.title = data['title']
    movie.director = data['director']
    movie.release_date = data['release_date']
    movie.banner = data['banner']
    movie.save()
    return jsonify({'message': 'Movie updated successfully'})

def delete_movie(movie_id):
    movie = Movie.get_by_id(movie_id)
    if not movie:
        return jsonify({'message': 'Movie not found'}), 404
    movie.delete()
    return jsonify({'message': 'Movie deleted successfully'})