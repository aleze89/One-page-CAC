const formRegister=document.getElementById("formregister")
const inputNombre=document.getElementById("firstname");
const inputApellido=document.getElementById("lastname");
const inputEmail=document.getElementById("email");
const inputTelefono=document.getElementById("phone");
const inputComunicacion=document.getElementById("comunicacion");
const inputCurso=document.getElementById("product");
const inputMensaje=document.getElementById("message");
const parrafo=document.getElementById("error");


formRegister.addEventListener("submit",e=>{
e.preventDefault();
let warning="";
let valor=false;
parrafo.innerHTML="";
let regexEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let regexPhone = /^\d+$/;


if(inputNombre.value.length<3){
   warning+=`El nombre es corto<br>`
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