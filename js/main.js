
let usserSave="admin"; //defino los datos del login
let passSave="1234";

function ingresarUsuario(){ //funcion para logear, 3 intentos permitidos antes de dar error.
    let ingresar=false;
    for (let i=2; i>=0; i--){ //ciclo para contabilizar la cantidad de intentos.
        let usser=prompt("Ingrese usuario \n"+(i+1)+" intentos restantes");
        if (usser==-1){ 
            break;
        } //breakpoint de emergencia, para pruebas y poder cancelar.
        let usserPass=prompt("Ingrese pass  ");
        if (usser==usserSave && passSave==usserPass){//comparacion de usuario ingresado con el de la bd.
            window.location="logged.html"; //si se logea correctamente, te envia a una pagina.
            ingresar=true;
            break;
        }
  
        else window.location="error.html";//al equivocarse 3 veces, te envia a otra pagina.
    }
}

function menuPrincipal (){
    let opcionMenu=prompt("Seleccione opcion: \n 1- Mi cuenta\n 2- Ingresar datos\n 3- Eliminar datos\n 4- Volver");
    switch(opcionMenu){
        case "1": {
            alert("Accediste a tu cuenta");
            break;
        }
        case "2": {
            alert("Ingresaste un dato");
            break;
        }
        case "3": {
            alert("Eliminaste un dato");
            break;
        }
        case "4": {
            alert("Volviendo...");
            break;
        }
        
    }
}


var botonIngresar = document.getElementById("logear"); 
var botonMenu = document.getElementById("menu");

if (botonIngresar) botonIngresar.addEventListener("click",ingresarUsuario);
if (botonMenu) botonMenu.addEventListener("click",menuPrincipal);





