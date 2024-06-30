CREATE DATABASE aprendev;

USE aprendev;

CREATE TABLE estudiantes (
    dni int(11),
    nombre varchar(30),
    apellido varchar(30),
    fecha_nacimiento date,
    correo_electronico varchar(45),
    telefono varchar(20),
    pais varchar(50),
    foto_perfil varchar(255)
);

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
    nota_final decimal(2,1)
);

CREATE TABLE testimonios (
    id_testimonio int(12),
    comentario varchar(400),
    fecha_publicacion date
);