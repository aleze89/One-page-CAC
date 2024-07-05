from app.database import get_db

class Testimonio:
    
    def __init__(self, id_testimonio=None, estudiante=None, comentario=None, fecha_publicacion=None, foto_perfil=None):
        self.id_testimonio = id_testimonio
        self.estudiante = estudiante
        self.comentario = comentario
        self.fecha_publicacion = fecha_publicacion
        self.foto_perfil = foto_perfil

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_testimonio:
            cursor.execute("""
                UPDATE testimonios SET estudiante = %s, comentario = %s, fecha_publicacion = %s, foto_perfil = %s
                WHERE id_testimonio = %s
            """, (self.estudiante, self.comentario, self.fecha_publicacion, self.foto_perfil, self.id_testimonio))
        else:
            cursor.execute("""
                INSERT INTO testimonios (estudiante, comentario, fecha_publicacion, foto_perfil) VALUES (%s, %s, %s, %s)
            """, (self.estudiante, self.comentario, self.fecha_publicacion, self.foto_perfil))
            self.id_testimonio = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM testimonios")
        rows = cursor.fetchall()
        testimonios = [Testimonio(id_testimonio=row[0], estudiante=row[1], comentario=row[2], fecha_publicacion=row[3], foto_perfil=row[4]) for row in rows]
        cursor.close()
        return testimonios

    @staticmethod
    def get_by_id(testimonio_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM testimonios WHERE id_testimonio = %s", (testimonio_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Testimonio(id_testimonio=row[0], estudiante=row[1], comentario=row[2], fecha_publicacion=row[3], foto_perfil=row[4])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM testimonios WHERE id_testimonio = %s", (self.id_testimonio,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id_testimonio': self.id_testimonio,
            'estudiante': self.estudiante,
            'comentario': self.comentario,
            'fecha_publicacion': self.fecha_publicacion.strftime('%Y-%m-%d'),
            'foto_perfil': self.foto_perfil
        }