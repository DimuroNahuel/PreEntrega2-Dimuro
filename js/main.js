
let usserSave="admin"; //defino los datos del login
let passSave="1234";
let datos=[];
let Ussers=[{usserSavee:"admin", passSavee:"1234"}];
function ingresarUsuario(){ //funcion para logear, 3 intentos permitidos antes de dar error.
    let ingresar=false;
    for (let i=2; i>=0; i--){ //ciclo para contabilizar la cantidad de intentos.
        let usser=prompt("Ingrese usuario \n"+(i+1)+" intentos restantes");
        let usserPass=prompt("Ingrese pass  ");
        let buscar = Ussers.findIndex(Ussers=>Ussers.usserSavee==usser);
        if ((buscar!=-1)&&(Ussers[buscar].passSavee==usserPass)){//comparacion de usuario ingresado con el de la bd.
            window.location="logged.html"; //si se logea correctamente, te envia a una pagina.
            ingresar=true;
            break;
        }
        if (i<1 && ingresar==false) {
            window.location="error.html";
        }//al equivocarse 3 veces, te envia a otra pagina.
    }
}

function menuPrincipal (){
    let opcionMenu=prompt("Seleccione opcion: \n 1- Mostrar datos\n 2- Ingresar datos\n 3- Eliminar datos\n 4- Volver al menu");
    switch(opcionMenu){//menu dentro del login
        case "1": {
            alert("Mostrando datos\n "+ datos); 
            menuPrincipal ()
            break;
        }//muestra los datos almacenados 
        case "2": {
            let datoAgregado=prompt("Ingrese dato o digite 0 para dejar de agregar \n DATOS ACTUALES:\n " +datos);
            while (datoAgregado!=0){//solicita datos y lo agrega al array, mientras no se presione el valor de salida 0, seguirá pidiendo datos.
                datos.push(datoAgregado);//agrega dato
                datoAgregado=prompt("Ingrese dato o digite 0 para dejar de agregar \n DATOS ACTUALES:\n " +datos);//bucle del while.
            }
            menuPrincipal ()//muestra nuevamente el menu.
            break;
        }//agrega datos
        case "3": {
            let datoBorrar=prompt("Mostrando datos, digite 0 para volver o \n escriba el nombre del dato a borrar: \n" + datos)//solicita el dato a borrar o el numero 0 para volver.
            let buscador = datos.indexOf(datoBorrar); //valida que el dato a borrar exista en el array.
            if (buscador!=-1){ //si encuentra el valor, lo borrará, sinó pasará al siguiente if
                datos.splice(buscador,1);
                menuPrincipal ()
            }
            if (datoBorrar==0){ //si presiona el 0 vuelve al menu
                menuPrincipal ()
            }
            else {
                alert("dato invalido"); //si no se encuentra el dato a borrar y tampoco es presionado el 0, dará error.
                menuPrincipal ()
            }
            break;
        }
        case "4": {
            alert("Volviendo al menu");//opcion para volver.
            break;
        }
        default:{
            alert("INVALIDO!");//de presionarse otro boton fuera de los definidos, dará error.
            menuPrincipal ();
        }
    }
}

function registro (){//funcion para registrar nuevo usuario.
    let registroUsser=prompt("ingrese usuario a registrar");//solicita nombre de usuario.
    let buscar = Ussers.findIndex(Ussers=>Ussers.usserSavee==registroUsser); //valida si el usuario se encuentra o no en el array.
    if (buscar==-1){//si el nombre de usuario no se encuentra, quiere decir que dispone de el para usarlo como username.
        let registroPass=prompt("ingrese pass a registrar");
        let confirmarPass=prompt("confirme la pass ingresada");//solicita pass y confirmacion para guardarla.
        if (registroPass==confirmarPass){
            alert("registro exitoso");//si la pass y su confirmacion coincide, se acepta el registro.
            let newUser={usserSavee:registroUsser, passSavee:registroPass};
            Ussers.push(newUser);//se agrega el usuario registrado al array de usuarios, para poder logear.
        }
        else {
            alert("error, las contraseñas no coinciden");//si la pass y su confirmacion no coinciden, este lo avisa.
        }
    }
    else {
        alert("error, usuario en uso");//si el nombre de usuario es encontrado en el array, quiere decir que ya se encuentra en uso y lo avisa.
    }
}

var botonIngresar = document.getElementById("logear"); //defino eventos para los botones.
var botonMenu = document.getElementById("menu");
var botonRegistrar = document.getElementById("registrar");




if (botonIngresar) botonIngresar.addEventListener("click",ingresarUsuario); //defino la accion para invocar los eventos.
if (botonMenu) botonMenu.addEventListener("click",menuPrincipal);
if (botonRegistrar) botonRegistrar.addEventListener("click",registro);






