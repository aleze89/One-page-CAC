const BASEURL ='https://tadeoriganti.pythonanywhere.com/';

// const BASEURL='https://com24187.pythonanywhere.com/'


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
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro del testimonio.
 * @returns 
 */
async function saveTestimonio(){
  const idTestimonio = document.querySelector('#id-testimonio').value;
  const estudiante = document.querySelector('#estudiante').value;
  const comentario = document.querySelector('#comentario').value;
  const fechaPublicacion = document.querySelector('#fecha-publicacion').value;
  const fotoPerfil = document.querySelector('#foto-perfil-form').value;

  // VALIDACION DE FORMULARIO
  if (!estudiante || !comentario || !fechaPublicacion || !fotoPerfil) {
    Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }
  // Crea un objeto con los datos del testimonio.
  const testimonioData = {
      estudiante: estudiante,
      comentario: comentario,
      fecha_publicacion: fechaPublicacion,
      foto_perfil: fotoPerfil,
  };

    
  let result = null;
  // Si hay un idTestimonio, realiza una petición PUT para actualizar el testimonio existente
  if(idTestimonio!==""){
    result = await fetchData(`${BASEURL}/api/testimonios/${idTestimonio}`, 'PUT', testimonioData);
  }else{
    // Si no hay idTestimonio, realiza una petición POST para crear un nuevo testimonio
    result = await fetchData(`${BASEURL}/api/testimonios/`, 'POST', testimonioData);
  }
  
  const formTestimonio = document.querySelector('#form-testimonio');
  formTestimonio.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showTestimonios();
}


/**
 * Funcion que permite crear un elemento <tr> para la tabla de testimonios
 * por medio del uso de template string de JS.
 */
async function showTestimonios(){
  let testimonios =  await fetchData(BASEURL+'/api/testimonios/', 'GET');
  const tableTestimonios = document.querySelector('#list-table-testimonios tbody');
  tableTestimonios.innerHTML='';
  testimonios.forEach((testimonio) => {
    let tr = `<tr>
                  <td>${testimonio.estudiante}</td>
                  <td>${testimonio.comentario}</td>
                  <td>${testimonio.fecha_publicacion}</td>
                  <td>
                      <img src="${testimonio.foto_perfil}" width: 48px;>
                  </td>
                  <td>
                      <button class="btn-cac" onclick='updateTestimonio(${testimonio.id_testimonio})'><i class="fa fa-pencil" ></button></i>
                      <button class="btn-cac" onclick='deleteTestimonio(${testimonio.id_testimonio})'><i class="fa fa-trash" ></button></i>
                  </td>
                </tr>`;
    tableTestimonios.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
 * Function que permite eliminar un testimonio del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteTestimonio(id){
  Swal.fire({
      title: "¿Esta seguro de eliminar el testimonio?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/testimonios/${id}`, 'DELETE');
        showTestimonios();
        Swal.fire(response.message, "", "success");
      }
  });
  
}


/**
 * Function que permite cargar el formulario con los datos del testimonio
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
 */
async function updateTestimonio(id){
  //Buscamos en el servidor el testimonio de acuerdo al id
  let response = await fetchData(`${BASEURL}/api/testimonios/${id}`, 'GET');
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
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveTestimonio = document.querySelector('#btn-save-testimonio');
  //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSaveTestimonio.addEventListener('click',saveTestimonio);
  showTestimonios();
});