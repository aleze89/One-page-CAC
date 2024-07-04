const BASEURL = 'http://127.0.0.1:5000'; // Conectar con Python Anywhere; explicacion clase 30 → https://youtu.be/s1sgQPDggyo?list=PL3jC5zn-KQJZDWMxxz-oM7iFX_y1vpuda&t=3581

/**
* Función para realizar una petición fetch con JSON.
* @param {string} url - La URL a la que se realizará la petición.
* @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
* @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
* @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
*/
async function fetchData(url, method, data = null) {
const options = {
method: method,
headers: {
'Content-Type': 'application/json',
},
body: data ? JSON.stringify(data) : null, // Si hay datos, los convierte a JSON y los incluye en el cuerpo
};
try {
const response = await fetch(url, options); // Realiza la petición fetch
if (!response.ok) {
throw new Error(`Error: ${response.statusText}`);
}
return await response.json(); // Devuelve la respuesta en formato JSON
} catch (error) {
console.error('Fetch error:', error);
alert('An error occurred while fetching data. Please try again.');
}
}



// ------------------------- GUARDAR TESTIMONIO -------------------------

// Codigo original → EMPIEZA

// /**
// * Función para comunicarse con el servidor para poder Crear o Actualizar
// * un registro de pelicula
// * @returns
// */
// async function saveMovie(){
//     const idMovie = document.querySelector('#id-movie').value;
//     const title = document.querySelector('#title').value;
//     const director = document.querySelector('#director').value;
//     const releaseDate = document.querySelector('#release-date').value;
//     const banner = document.querySelector('#banner-form').value;

//     //VALIDACION DE FORMULARIO
//     if (!title || !director || !releaseDate || !banner) {
//     Swal.fire({
//     title: 'Error!',
//     text: 'Por favor completa todos los campos.',
//     icon: 'error',
//     confirmButtonText: 'Cerrar'
//     });
//     return;
//     }

//     // Crea un objeto con los datos de la película
//     const movieData = {
//     title: title,
//     director: director,
//     release_date: releaseDate,
//     banner: banner,
//     };
    
//     let result = null;

//     // Si hay un idMovie, realiza una petición PUT para actualizar la película existente
//     if(idMovie!==""){
//     result = await fetchData(`${BASEURL}/api/movies/${idMovie}`, 'PUT', movieData);
//     }else{
    

//     // Si no hay idMovie, realiza una petición POST para crear una nueva película
//     result = await fetchData(`${BASEURL}/api/movies/`, 'POST', movieData);
//     }

//     const formMovie = document.querySelector('#form-movie');
//     formMovie.reset();
//     Swal.fire({
//     title: 'Exito!',
//     text: result.message,
//     icon: 'success',
//     confirmButtonText: 'Cerrar'
//     })

//     showMovies();

// Codigo original → TERMINA

// Función para comunicarse con el servidor para poder Crear o Actualizar un registro de testimonio @returns.
async function saveTestimonio(){
    const idTestimonio = document.querySelector('#id-testimonio').value;
    const estudiante = document.querySelector('#estudiante').value;
    const comentario = document.querySelector('#comentario').value;
    const fechaPublicacion = document.querySelector('#fecha-publicacion').value; 
    const fotoPerfil = document.querySelector('#foto-perfil-form').value; 

    //VALIDACION DE FORMULARIO
    if (!estudiante || !comentario || !fechaPublicacion || !fotoPerfil) {
        Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
    }

    // Crea un objeto con los datos del testimonio
    const testimonioData = {
        estudiante: estudiante,
        comentario: comentario,
        fecha_publicacion: fechaPublicacion,
        foto_perfil: fotoPerfil,
    };
    let result = null;

    // Si hay un idTestimonio, realiza una petición PUT para actualizar el testimonio existente
    if(idTestimonio!==""){
    result = await fetchData(`${BASEURL}/api/testimonios/${idTestimonio}`, 'PUT', testimonioData); // ←◄ ⚠️ Alejandro: Revisá si la direccion "/api/testimonios/" es la misma que usaste al desarrollar el backend ⚠️ 
    }else{

    // Si no hay idTestimonio, realiza una petición POST para crear un nuevo testimonio
    result = await fetchData(`${BASEURL}/api/testimonios/`, 'POST', testimonioData); // ←◄ ⚠️ Alejandro: Revisá si la direccion "/api/testimonios/" es la misma que usaste al desarrollar el backend ⚠️ 
    }

    const formTestimonio = document.querySelector('#form-testimonio'); // ←◄ ⚠️ No lo encuentro en el HTML // Tampoco encuentro '#form-movie' en el original ⚠️
    formTestimonio.reset();
    Swal.fire({
        title: 'Exito!',
        text: result.message,
        icon: 'success',
        confirmButtonText: 'Cerrar'
    })
    
    showTestimonios();

}



// ------------------------- MOSTRAR TESTIMONIOS EN LA TABLA -------------------------

// Codigo original → EMPIEZA

/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
// async function showMovies(){
//     let movies =  await fetchData(BASEURL+'/api/movies/', 'GET');
//     const tableMovies = document.querySelector('#list-table-movies tbody');
//     tableMovies.innerHTML='';
//     movies.forEach((movie) => {
//       let tr = `<tr>
//                     <td>${movie.title}</td>
//                     <td>${movie.director}</td>
//                     <td>${movie.release_date}</td>
//                     <td>
//                         <img src="${movie.banner}" width="30%">
//                     </td>
//                     <td>
//                         <button class="btn-cac" onclick='updateMovie(${movie.id_movie})'><i class="fa fa-pencil" ></button></i>
//                         <button class="btn-cac" onclick='deleteMovie(${movie.id_movie})'><i class="fa fa-trash" ></button></i>
//                     </td>
//                   </tr>`;
//       tableMovies.insertAdjacentHTML("beforeend",tr);
//     });
//   }

// Codigo original → TERMINA

// Funcion que permite crear un elemento <tr> para la tabla de testimonios por medio del uso de template string de JS.

async function showTestimonios(){
    let testimonios =  await fetchData(BASEURL+'/api/testimonios/', 'GET'); // ←◄ ⚠️ Alejandro: Revisá si la direccion "/api/testimonios/" es la misma que usaste al desarrollar el backend ⚠️ 
    const tableTestimonios = document.querySelector('#list-table-testimonios tbody');
    tableTestimonios.innerHTML='';
    testimonios.forEach((testimonio) => {
        let tr = `<tr>
                    <td>${testimonio.estudiante}</td>
                    <td>${testimonio.comentario}</td>
                    <td>${testimonio.fecha_publicacion}</td>
                    <td>
                        <img src="${testimonio.foto_perfil}" width="30%">
                    </td>
                    <td>
                        <button class="btn-cac" onclick='updateTestimonio(${testimonio.id_testimonio})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-cac" onclick='deleteTestimonio(${testimonio.id_testimonio})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
        tableTestimonios.insertAdjacentHTML("beforeend",tr);
    });
}



// ------------------------- BORRAR TESTIMONIO -------------------------

// Codigo original → EMPIEZA

/**
* Function que permite eliminar una pelicula del array del localstorage
* de acuedo al indice del mismo
* @param {number} id posición del array que se va a eliminar
*/

// function deleteMovie(id){
//     Swal.fire({
//     title: "Esta seguro de eliminar la pelicula?",
//     showCancelButton: true,
//     confirmButtonText: "Eliminar",
//     }).then(async (result) => {
//     if (result.isConfirmed) {
//     let response = await fetchData(`${BASEURL}/api/movies/${id}`, 'DELETE');
//     showMovies();
//     Swal.fire(response.message, "", "success");
//     }
//     });
//     }

// Codigo original → TERMINA

// Funcion que permite eliminar un testimonio del array del localstorage de acuedo al indice del mismo @param {number} id posición del array que se va a eliminar.

function deleteTestimonio(id){
    Swal.fire({
        title: "¿Esta seguro de eliminar el testimonio?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            let response = await fetchData(`${BASEURL}/api/testimonios/${id}`, 'DELETE'); // ←◄ ⚠️ Alejandro: Revisá si la direccion "/api/testimonios/" es la misma que usaste al desarrollar el backend ⚠️
            showTestimonios();
            Swal.fire(response.message, "", "success");
        }
    });
}



// ------------------------- EDITAR UNA PELICULA -------------------------

// Codigo original → EMPIEZA

/**
* Function que permite cargar el formulario con los datos de la pelicula
* para su edición
* @param {number} id Id de la pelicula que se quiere editar
*/
// async function updateMovie(id){
//     //Buscamos en el servidor la pelicula de acuerdo al id
//     let response = await fetchData(`${BASEURL}/api/movies/${id}`, 'GET');
//     const idMovie = document.querySelector('#id-movie');
//     const title = document.querySelector('#title');
//     const director = document.querySelector('#director');
//     const releaseDate = document.querySelector('#release-date');
//     const banner = document.querySelector('#banner-form');

//     idMovie.value = response.id_movie;
//     title.value = response.title;
//     director.value = response.director;
//     releaseDate.value = response.release_date;
//     banner.value = response.banner;
// }

// Codigo original → TERMINA

// Funcion que permite cargar el formulario con los datos del testimonio para su edición @param {number} id Id del testimonio que se quiere editar.

async function updateTestimonio(id){
    //Buscamos en el servidor el testimonio de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/testimonios/${id}`, 'GET'); // ←◄ ⚠️ Alejandro: Revisá si la direccion "/api/testimonios/" es la misma que usaste al desarrollar el backend ⚠️
    const idTestimonio = document.querySelector('#id-testimonio');
    const estudiante = document.querySelector('#estudiante'); 
    const comentario = document.querySelector('#comentario'); 
    const fechaPublicacion = document.querySelector('#fecha-publicacion'); 
    const fotoPerfil = document.querySelector('#foto-perfil-form');

    idTestimonio.value = response.id_testimonio;
    estudiante.value = response.estudiante;
    comentario.value = response.comentario;
    fechaPublicacion.value = response.fecha_publicacion;
    fotoPerfil.value = response.foto_perfil;
}


// ------------------------- INICIALIZACION -------------------------

// Codigo original → EMPIEZA

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el contenido del DOM ha sido completamente cargado y parseado.
// document.addEventListener('DOMContentLoaded',function(){
//     const btnSaveMovie = document.querySelector('#btn-save-movie');
//     //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
//     btnSaveMovie.addEventListener('click',saveMovie);
//     showMovies();
//     });

// Codigo original → TERMINA

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSaveTestimonio = document.querySelector('#btn-save-testimonio');
    
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveTestimonio.addEventListener('click',saveTestimonio);
    showTestimonios();
});