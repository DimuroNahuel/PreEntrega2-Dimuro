
let usserSave="admin"; //defino los datos del login
let passSave="1234";
let datos=[];
let Ussers=[{usserSavee:"admin", passSavee:"1234"}];
function ingresarUsuario(){ //funcion para logear, 3 intentos permitidos antes de dar error.
    let ingresar=false;
    for (let i=2; i>=0; i--){ //ciclo para contabilizar la cantidad de intentos.
        let usser=prompt("Ingrese usuario \n"+(i+1)+" intentos restantes");
        let usserPass=prompt("Ingrese pass  ");
        if (usser==usserSave && passSave==usserPass){//comparacion de usuario ingresado con el de la bd.
            window.location="logged.html"; //si se logea correctamente, te envia a una pagina.
            ingresar=true;
            break;
        }
        if (i<1 && !ingresar) {
            window.location="error.html";
        }//al equivocarse 3 veces, te envia a otra pagina.
    }
}

function menuPrincipal (){
    let opcionMenu=prompt("Seleccione opcion: \n 1- Mostrar datos\n 2- Ingresar datos\n 3- Eliminar datos\n 4- Volver al menu");
    switch(opcionMenu){
        case "1": {
            alert("Mostrando datos\n "+ datos);
            menuPrincipal ()
            break;
        }
        case "2": {
            let datoAgregado=prompt("Ingrese dato o digite 0 para dejar de agregar \n DATOS ACTUALES:\n " +datos);
            while (datoAgregado!=0){
                datos.push(datoAgregado);
                datoAgregado=prompt("Ingrese dato o digite 0 para dejar de agregar \n DATOS ACTUALES:\n " +datos);
            }
            menuPrincipal ()
            break;
        }
        case "3": {
            let datoBorrar=prompt("Mostrando datos, digite 0 para volver o \n escriba el nombre del dato a borrar: \n" + datos)
            let buscador = datos.indexOf(datoBorrar);
            if (buscador!=-1){
                datos.splice(buscador,1);
                menuPrincipal ()
            }
            if (datoBorrar==0){
                menuPrincipal ()
            }
            else {
                alert("dato invalido");
                menuPrincipal ()
            }
            break;
        }
        case "4": {
            alert("Volviendo al menu");
            break;
        }
        default:{
            alert("INVALIDO!");
            menuPrincipal ();
        }
    }
}



var botonIngresar = document.getElementById("logear"); 
var botonMenu = document.getElementById("menu");



if (botonIngresar) botonIngresar.addEventListener("click",ingresarUsuario);
if (botonMenu) botonMenu.addEventListener("click",menuPrincipal);






