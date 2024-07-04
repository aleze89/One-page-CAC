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

// -------------------------

/**
* Función para comunicarse con el servidor para poder Crear o Actualizar
* un registro de pelicula
* @returns
*/
async function saveMovie(){
    const idMovie = document.querySelector('#id-movie').value;
    const title = document.querySelector('#title').value;
    const director = document.querySelector('#director').value;
    const releaseDate = document.querySelector('#release-date').value;
    const banner = document.querySelector('#banner-form').value;
// async function saveTestimonio(){
    // const idTestimonio = document.querySelector('#id-testimonio').value;
    // const estudiante = document.querySelector('#estudiante').value;
    // const comentario = document.querySelector('#comentario').value;
    // const fechaPublicacion = document.querySelector('#fecha-publicacion').value;
    // const fotoPerfil = document.querySelector('#foto-perfil').value;

    //VALIDACION DE FORMULARIO
    if (!title || !director || !releaseDate || !banner) {
    Swal.fire({
    title: 'Error!',
    text: 'Por favor completa todos los campos.',
    icon: 'error',
    confirmButtonText: 'Cerrar'
    });
    return;
    }
    // if (!estudiante || !comentario || !fechaPublicacion || !fotoPerfil) {
    //     Swal.fire({
    //     title: 'Error!',
    //     text: 'Por favor completa todos los campos.',
    //     icon: 'error',
    //     confirmButtonText: 'Cerrar'
    // });
    // return;
    // }

    // Crea un objeto con los datos de la película
    const movieData = {
    title: title,
    director: director,
    release_date: releaseDate,
    banner: banner,
    };
    // const testimoniosData = {
    //     estudiante: estudiante,
    //     comentario: comentario,
    //     fecha_publicacion: fechaPublicacion,
    //     foto_perfil: fotoPerfil,
    // };
    
    let result = null;

    // Si hay un idMovie, realiza una petición PUT para actualizar la película existente
    if(idMovie!==""){
    result = await fetchData(`${BASEURL}/api/movies/${idMovie}`, 'PUT', movieData);
    }else{
    // if(idTestimonio!==""){
    // result = await fetchData(`${BASEURL}/api/testimonios/${idTestimonio}`, 'PUT', testimonioData); // ←◄ ⚠️ Alejandro: Revisá si la direccion "/api/testimonio/" es la misma que usaste al desarrollar el backend ⚠️ 
    // }else{

    // Si no hay idMovie, realiza una petición POST para crear una nueva película
    result = await fetchData(`${BASEURL}/api/movies/`, 'POST', movieData);
    }
    // result = await fetchData(`${BASEURL}/api/testimonios/`, 'POST', testimonioData); // ←◄ ⚠️ Alejandro: Revisá si la direccion "/api/testimonio/" es la misma que usaste al desarrollar el backend ⚠️ 
    // }

    const formMovie = document.querySelector('#form-movie');
    formMovie.reset();
    Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
    })
    // const formTestimonio = document.querySelector('#form-testimonio');
    // formTestimonio.reset();
    // Swal.fire({
    // title: 'Exito!',
    // text: result.message,
    // icon: 'success',
    // confirmButtonText: 'Cerrar'
    // })
    
    showMovies();
    // showTestimonios();
    }
// -------------------------

/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showMovies(){
    let movies =  await fetchData(BASEURL+'/api/movies/', 'GET');
    const tableMovies = document.querySelector('#list-table-movies tbody');
    tableMovies.innerHTML='';
    movies.forEach((movie) => {
      let tr = `<tr>
                    <td>${movie.title}</td>
                    <td>${movie.director}</td>
                    <td>${movie.release_date}</td>
                    <td>
                        <img src="${movie.banner}" width="30%">
                    </td>
                    <td>
                        <button class="btn-cac" onclick='updateMovie(${movie.id_movie})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-cac" onclick='deleteMovie(${movie.id_movie})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableMovies.insertAdjacentHTML("beforeend",tr);
    });
  }



// -------------------------



// -------------------------



// -------------------------



// -------------------------