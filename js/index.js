const formRegister=document.getElementById("formregister")
const inputNombre=document.getElementById("firstname");
const inputApellido=document.getElementById("lastname");
const inputEmail=document.getElementById("email");
const inputTelefono=document.getElementById("phone");
const inputComunicacion=document.getElementById("comunicacion");
const inputCurso=document.getElementById("product");
const inputMensaje=document.getElementById("message");
const statusMessage=document.getElementById("status-message");


formRegister.addEventListener("submit",e=>{
    e.preventDefault();
    let valor=false;
    
    document.querySelectorAll('.error').forEach(el => el.innerHTML = '');
    statusMessage.innerHTML='';

    let regexEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regexPhone = /^\d+$/;


    if(inputNombre.value.length<3){
        document.getElementById("error-firstname").innerHTML = `El nombre es corto`;
        valor = true;
    }

    if(inputApellido.value.length<3){
        document.getElementById("error-lastname").innerHTML = `El apellido es corto`;
        valor = true;
    }

    if(!regexEmail.test(inputEmail.value)){
        document.getElementById("error-email").innerHTML = `El email no es valido`;
        valor = true;
    }

    if (!regexPhone.test(inputTelefono.value) || inputTelefono.value.length < 10) {
        if (!regexPhone.test(inputTelefono.value)) {
            document.getElementById("error-phone").innerHTML = `El teléfono solo debe contener números`;
        } else {
            document.getElementById("error-phone").innerHTML = `El teléfono no es valido`;
        }
        valor = true;
    }

    if(!document.querySelector('input[name="contact-choice"]:checked')) {
        document.getElementById("error-comunicacion").innerHTML = "Elija una opción de comunicación";
        valor = true;
    }

    if(inputCurso.value == ""){
        document.getElementById("error-product").innerHTML = "Elija una opción";
        valor = true;
    }

    if(inputMensaje.value.length < 10) {
        document.getElementById("error-message").innerHTML = "¿Qué mensaje quiere dejarnos?";
        valor = true;
    }

    if ( valor ) {
        statusMessage.innerHTML= "";
    } else {
        statusMessage.innerHTML="Enviado";
        formRegister.reset();
    }
});