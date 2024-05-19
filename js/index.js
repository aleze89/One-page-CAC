const formRegister=document.getElementById("formregister")
const inputNombre=document.getElementById("firstname");
const inputEmail=document.getElementById("email");
const inputTurno=document.getElementById("turno");
const parrafo=document.getElementById("error-firstname");

// console.log(inputNombre);

formRegister.addEventListener("submit",e=>{
e.preventDefault();
let warning="";
let valor=false;
parrafo.innerHTML="";
let regexEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

if(inputNombre.value.length<3){
   warning+=`El nombre es corto<br>`
   valor=true;
}

// if(!regexEmail.test(inputEmail.value)){
//     warning+=`El email no es valido<br>`
//     valor=true;
// }
// if(inputTurno.value=="default"){
//     warning+=`Elija una opcion <br>`
//     valor=true;
// }


if(valor){
    parrafo.innerHTML=warning;
}else{
    parrafo.innerHTML="Enviado";
    formRegister.reset();
}
})