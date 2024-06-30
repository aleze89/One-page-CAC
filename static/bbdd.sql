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
    foto_perfil varchar(255) DEFAULT NULL,
    PRIMARY KEY (dni)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* En 'foto_perfil' ¿Convendria agregar un valor por defecto? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"*/

CREATE TABLE cursos (
    id_curso int(2) NOT NULL AUTO_INCREMENT,
    nombre varchar(32) NOT NULL,
    nivel_dificultad enum('Básico', 'Intermedio', 'Avanzado') NOT NULL,
    descripcion varchar(400) NOT NULL,
    modulos int(2) NOT NULL,
    duracion int(3) NOT NULL,
    precio double NOT NULL,
    beneficios varchar(400) NOT NULL,
    tecnologias varchar(200) NOT NULL,
    url_temario varchar(255) NOT NULL,
    url_venta varchar(255) NOT NULL,
    PRIMARY KEY (id_curso)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE certificados (
    id_certificado int(12) NOT NULL AUTO_INCREMENT,
    fecha_emision date DEFAULT NULL,
    nota_final decimal(2,1) DEFAULT NULL,
    dni int(11) NOT NULL,
    id_curso int(2) NOT NULL,
    PRIMARY KEY (id_certificado),
    FOREIGN KEY (dni) REFERENCES estudiantes(dni),
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE testimonios (
    id_testimonio int(12) NOT NULL AUTO_INCREMENT,
    comentario varchar(400) DEFAULT NULL,
    fecha_publicacion date DEFAULT NULL,
    dni int(11) NOT NULL,
    id_curso int(2) NOT NULL,
    PRIMARY KEY (id_testimonio),
    FOREIGN KEY (dni) REFERENCES estudiantes(dni),
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;