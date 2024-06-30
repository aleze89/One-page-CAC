CREATE DATABASE aprendev;

USE aprendev;

CREATE TABLE estudiantes (
    dni int(11) NOT NULL,
    nombre varchar(30) DEFAULT NULL,
    apellido varchar(30) DEFAULT NULL,
    fecha_nacimiento date,
    correo_electronico varchar(45) NOT NULL,
    telefono varchar(20) NOT NULL,
    pais varchar(50) NOT NULL,
    foto_perfil varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* En 'foto_perfil' ¿Convendria agregar un valor por defecto? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"*/

CREATE TABLE cursos (
    id_curso int(2),
    nombre varchar(32),
    nivel_dificultad enum('Básico', 'Intermedio', 'Avanzado'),
    descripcion varchar(400),
    modulos int(2),
    duracion int(3),
    precio double,
    beneficios varchar(400),
    tecnologias varchar(200),
    url_temario varchar(255),
    url_venta varchar(255)
);

CREATE TABLE certificados (
    id_certificado int(12),
    fecha_emision date,
    nota_final decimal(2,1),
    dni int(11),
    id_curso int(2)
);

CREATE TABLE testimonios (
    id_testimonio int(12),
    comentario varchar(400),
    fecha_publicacion date,
    dni int(11),
    id_curso int(2)
);