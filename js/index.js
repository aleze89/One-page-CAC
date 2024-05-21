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
   valor=true;
}

if(inputApellido.value.length<3){
    warning+=`El apellido es corto<br>`
    valor=true;
}

if(!regexEmail.test(inputEmail.value)){
    warning+=`El email no es valido<br>`
    valor=true;
}

if (!regexPhone.test(inputTelefono.value) || inputTelefono.value.length < 10) {
    if (!regexPhone.test(inputTelefono.value)) {
        warning += `El teléfono solo debe contener números<br>`;
    } else {
        warning += `El teléfono no es valido<br>`;
    }
    valor = true;
}

if(inputComunicacion.value=="default"){
    warning+=`Elija una opcion <br>`
    valor=true;
}

if(inputCurso.value=="default"){
    warning+=`Elija una opcion <br>`
    valor=true;
}

if(inputMensaje.value.length<10) {
    warning+=`Que mensaje quiere dejarnos?<br>`
    valor=true;
}

if(valor){
    parrafo.innerHTML=warning;
}else{
    parrafo.innerHTML="Enviado";
    formRegister.reset();
}
})