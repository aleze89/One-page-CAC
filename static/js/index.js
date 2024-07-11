const formRegister=document.getElementById("formregister")
const inputNombre=document.getElementById("firstname");
const inputApellido=document.getElementById("lastname");
const inputEmail=document.getElementById("email");
const inputTelefono=document.getElementById("phone");
const inputComunicacion=document.getElementById("comunicacion");
const inputCurso=document.getElementById("product");
const inputMensaje=document.getElementById("message");
const inputTerms=document.getElementById("terms");
const statusMessage=document.getElementById("status-message");


formRegister.addEventListener("submit",e=>{
    e.preventDefault();
    let valor=false;
    
    document.querySelectorAll('.error').forEach(el => el.innerHTML = '');
    statusMessage.innerHTML='';

    let regexEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regexPhone = /^\d+$/;

    //Nombre
    if(inputNombre.value.length<3){
        document.getElementById("error-firstname").innerHTML = `El nombre es corto`;
        valor = true;
    }

    //Apellido
    if(inputApellido.value.length<3){
        document.getElementById("error-lastname").innerHTML = `El apellido es corto`;
        valor = true;
    }

    //Email
    if(!regexEmail.test(inputEmail.value)){
        document.getElementById("error-email").innerHTML = `El email no es valido`;
        valor = true;
    }

    //Telefono
    if (!regexPhone.test(inputTelefono.value) || inputTelefono.value.length < 10) {
        if (!regexPhone.test(inputTelefono.value)) {
            document.getElementById("error-phone").innerHTML = `El teléfono solo debe contener números`;
        } else {
            document.getElementById("error-phone").innerHTML = `El teléfono no es valido`;
        }
        valor = true;
    }

    //Medio de comunicación
    if(!document.querySelector('input[name="contact-choice"]:checked')) {
        document.getElementById("error-comunicacion").innerHTML = "Elija una opción de comunicación";
        valor = true;
    }

    //Curso
    if(inputCurso.value == ""){
        document.getElementById("error-product").innerHTML = "Elija una opción";
        valor = true;
    }

    //Mensaje
    if(inputMensaje.value.length < 10) {
        document.getElementById("error-message").innerHTML = "¿Qué mensaje quiere dejarnos?";
        valor = true;
    }

    //Terminos
    if(!inputTerms.checked) {
        document.getElementById("error-terms").innerHTML = "Debe aceptar la política de privacidad";
        valor = true;
    }

    //Error o Envio
    if ( valor ) {
        statusMessage.innerHTML= "";
    } else {
        statusMessage.innerHTML="Enviado";
        formRegister.reset();
    }
});


/*menu hamburguesa*/

document.addEventListener('DOMContentLoaded', function () {
    const menuHamburguesa = document.getElementById('menu-hamburguesa');
    const menuDesplegable = document.getElementById('menu-desplegable');

    menuHamburguesa.addEventListener('click', function () {
        menuDesplegable.classList.toggle('open');
    });

});