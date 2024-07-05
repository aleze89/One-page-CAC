class Testimonio{

    constructor(id,estudiante,comentario,fechaPublicacion,fotoPerfil){
        this.id=id;
        this.estudiante=estudiante;
        this.comentario=comentario;
        this.fechaPublicacion=fechaPublicacion;
        this.fotoPerfil=fotoPerfil
    }

}

// const testimonio1 = new Testimonio(1,'Damsel','Un comentario',4.5,'2024-03-01','https://image.tmdb.org/t/p/w500//sMp34cNKjIb18UBOCoAv4DpCxwY.jpg');

// const testimonio2 = new Testimonio(2,'Dune 2','Un comentario 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg');

// const testimonio3 = new Testimonio(3,'Kunfu panda 4','Un comentario 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg');

// let testimonios = [testimonio1,testimonio2,testimonio3];

// localStorage.setItem('testimonios',JSON.stringify(testimonios));

// console.log(testimonios);

function showTestimonios(){
    
    //BUSCAR LO QUE HAY EN LOCAL STORAGE
    let testimonios = JSON.parse(localStorage.getItem('testimonios')) || [];

    //buscar elemento HTML donde quiero insertar las peliculas
    const tbodyTestimonios = document.querySelector('#list-table-testimonios tbody');
    // const tbodyTestimonios = document.getElementById('#tbody-table-testimonios');
    //limpio el contenido de la tabla
    tbodyTestimonios.innerHTML = '';
    testimonios.forEach(testimonio => {
        //TEMPLATE STRING - TEMPLATE LITERAL 
        const tr = `
                    <tr>
                        <td>${testimonio.estudiante}</td>
                        <td>${testimonio.comentario}</td>
                        <td>${testimonio.fechaPublicacion}</td>
                        <td>
                            <img src="${testimonio.fotoPerfil}" alt="${testimonio.estudiante}" width="30%">
                        </td>
                        <td>
                            <button class="btn-cac" onclick='updateTestimonio(${testimonio.id})'><i class="fa fa-pencil" ></button></i>
                            <button class="btn-cac" onclick='deleteTestimonio(${testimonio.id})'><i class="fa fa-trash" ></button></i>
                        </td>
                    </tr>
        `;
        tbodyTestimonios.insertAdjacentHTML('beforeend',tr);
    });

}

/**
 * funcion que permite agregar o modificar una pelicula al listado de peliculas
 * almacenado en el localstorage
 */
function saveTestimonio(){
    
    //Obtengo el elemento HTML del formulario
    const form = document.querySelector('#form-testimonio');

    //obtengo los inputs del formulario
    const inputId = document.querySelector('#id-testimonio');
    const inputEstudiante = document.querySelector('#estudiante');
    const inputComentario = document.querySelector('#comentario');
    const inputFechaPublicacion = document.querySelector('#fecha-publicacion');
    const inputFotoPerfil = document.querySelector('#foto-perfil-form');

    //Realizo una validación simple de acuerdo al contenido del value del input del titulo
    if(inputEstudiante.value.trim() !== ''){
        //Busca en localstorage el item testimonios, si no existe asigna el array vacio.
        let testimonios = JSON.parse(localStorage.getItem('testimonios')) || [];

        //Si el input de ID es distinto de vacio, es porque se trata de una acción de UPDATE
        if(inputId.value!==""){
            //Busco dentro del arraya de testimonios el objeto a editar
            const testimonioFind = testimonios.find(testimonio => testimonio.id == inputId.value);
            //Si existe actualizo el objeto
            if (testimonioFind) {
              testimonioFind.estudiante = inputEstudiante.value;
              testimonioFind.comentario = inputComentario.value;
              testimonioFind.fechaPublicacion = inputFechaPublicacion.value;
              testimonioFind.fotoPerfil = inputFotoPerfil.value;
            }
        }else{
            let newTestimonio = new Testimonio(
                testimonios.length+1,
                inputEstudiante.value,
                inputComentario.value,
                inputFechaPublicacion.value,
                inputFotoPerfil.value,
            );
            testimonios.push(newTestimonio);
        }

        //Se actualiza el array de peliculas en el localstorage
        localStorage.setItem('testimonios',JSON.stringify(testimonios));
        showTestimonios();
        //Se limpian los inputs del formulario
        form.reset();
        Swal.fire({
            estudiante: 'Exito!',
            text: 'Operacion exitosa.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }else{
        Swal.fire({
            estudiante: 'Error!',
            text: 'Por favor completa el campo Titulo.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }

}

/**
 * Function que permite cargar el formulario para editar una pelicula
 * de acuedo al id de la pelicula
 * @param {number} testimonioId id testimonio que se va a actualizar
 */
function updateTestimonio(testimonioId){
    let testimonios = JSON.parse(localStorage.getItem('testimonios'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let testimonioToUpdate = testimonios.find(testimonio => testimonio.id===testimonioId);
    if(testimonioToUpdate){
        //Se buscan los elementos HTML del input
        const inputId = document.querySelector('#id-testimonio');
        const inputEstudiante = document.querySelector('#estudiante');
        const inputComentario = document.querySelector('#comentario');
        const inputFechaPublicacion = document.querySelector('#fecha-publicacion');
        const inputFotoPerfil = document.querySelector('#foto-perfil-form');
        //Se cargan los inputs con los valores de la pelicula encontrada
        inputId.value = testimonioToUpdate.id;
        inputEstudiante.value = testimonioToUpdate.estudiante;
        inputComentario.value = testimonioToUpdate.comentario;
        inputRating.value = testimonioToUpdate.rating;
        inputFechaPublicacion.value = testimonioToUpdate.fechaPublicacion;
        inputFotoPerfil.value = testimonioToUpdate.fotoPerfil;
    }
}

/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} testimonioId id testimonio que se va a eliminar
 */
function deleteTestimonio(testimonioId){
    let testimonios = JSON.parse(localStorage.getItem('testimonios'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let testimonioToDelete = testimonios.find(testimonio => testimonio.id===testimonioId);
    if(testimonioToDelete){
        //se utiliza el metodo filter para actualizar el array de testimonios, sin tener el elemento encontrado en cuestion.
        testimonios = testimonios.filter(testimonio => testimonio.id !== testimonioToDelete.id);
        //se actualiza el localstorage
        localStorage.setItem('testimonios',JSON.stringify(testimonios));
        showTestimonios();
        Swal.fire({
            estudiante: 'Exito!',
            text: 'La pelicula fue eliminada.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }
}

// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSaveTestimonio = document.querySelector('#btn-save-testimonio');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveTestimonio.addEventListener('click',saveTestimonio);
    showTestimonios();
});
