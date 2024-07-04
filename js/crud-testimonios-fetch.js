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
    // Crea un objeto con los datos de la película
    const movieData = {
    title: title,
    director: director,
    release_date: releaseDate,
    banner: banner,
    };
    