let datos=[];
let ussers=[{usserSavee:"admin",passSavee:"1234"}];
let arrayAux=[];
let ingresar=false;
sacarLocal();

function ingresarUsuario(){ //funcion para logear, 3 intentos permitidos antes de dar error.
    if (!ingresar){
        for (let i=2; i>=0; i--){ //ciclo para contabilizar la cantidad de intentos.
            let usser=prompt("Ingrese usuario \n"+(i+1)+" intentos restantes");
            let usserPass=prompt("Ingrese pass  ");
            let buscar = ussers.findIndex(ussers=>ussers.usserSavee==usser);
            if ((buscar!=-1)&&(ussers[buscar].passSavee==usserPass)){//comparacion de usuario ingresado con el de la bd.
                ingresar=true;      //si los datos ingresados coinciden con los guardados, se validará la autentificacion. 
                logeado();  //funcion llamada al estar logeado correctamente
                break;
            }
            if (i<1 && ingresar==false) { //si ingresa datos invalidos dará error.
                document.getElementById("idLogear").innerHTML= "DATOS INVALIDOS, INTENTE NUEVAMENTE"
            }/
        }
    }

}

function menuPrincipal (){
    if(ingresar){
        let opcionMenu=prompt("Seleccione opcion: \n 1- Mostrar datos\n 2- Ingresar datos\n 3- Eliminar datos\n 4- Volver al menu");
        switch(opcionMenu){//menu dentro del login
            case "1": {
                alert("Mostrando datos\n "+ datos); 
                menuPrincipal (); //llama a menu para no solicitarle al usuario que toque el boton en cada error.
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
                if (datoBorrar==0){ //si presiona el 0 vuelve al menu
                    menuPrincipal ();
                    break;
                }
                let buscador = datos.indexOf(datoBorrar); //valida que el dato a borrar exista en el array.
                if (buscador!=-1){ //si encuentra el valor, lo borrará, sinó pasará al siguiente if
                    datos.splice(buscador,1);
                    menuPrincipal ();
                }
                else {
                    alert("dato invalido"); //si no se encuentra el dato a borrar y tampoco es presionado el 0, dará error.
                    menuPrincipal ();
                }
                break;
            }
            case "": {
                alert("DEBE INGRESAR UN DATO");//si se presiona aceptar sin introducir datos, tira error.
                menuPrincipal ();
                //opcion para volver.
                break;
            }
            case "4": {
                //opcion para volver.
                break;
            }
            default:{
                alert("INVALIDO!");//de presionarse otro boton fuera de los definidos, dará error.
                menuPrincipal ();
                break;
            }
        }
    }
}

function registro (){//funcion para registrar nuevo usuario.
    if (!ingresar){
        sacarLocal();
        let registroUsser=prompt("ingrese usuario a registrar");//solicita nombre de usuario.
        let buscar = ussers.findIndex(ussers=>ussers.usserSavee==registroUsser); //valida si el usuario se encuentra o no en el array.
        if (buscar==-1){//si el nombre de usuario no se encuentra, quiere decir que dispone de el para usarlo como username.
            let registroPass=prompt("ingrese pass a registrar");
            let confirmarPass=prompt("confirme la pass ingresada");//solicita pass y confirmacion para guardarla.
            if (registroPass==confirmarPass){
                alert("registro exitoso");//si la pass y su confirmacion coincide, se acepta el registro.
                let newUser={usserSavee:registroUsser, passSavee:registroPass};
                ussers.push(newUser);//se agrega el usuario registrado al array de usuarios, para poder logear.
                guardarLocal("usuarios",ussers);
            }
            else {
                alert("error, las contraseñas no coinciden");//si la pass y su confirmacion no coinciden, este lo avisa.
            }
        }
        else {
            alert("error, usuario en uso");//si el nombre de usuario es encontrado en el array, quiere decir que ya se encuentra en uso y lo avisa.
        }
    }
}

function logeado(){
    botonArriba.setAttribute("class", "claseMenu"); //cambio de clase
    botonAbajo.setAttribute("class", "claseDeslogear"); //cambio de clase
    document.getElementById("idLogear").innerHTML= "MENU" //cambia el texto del boton
    document.getElementById("idRegistrar").innerHTML= "SALIR"   //cambia el texto del boton
    if (botonArriba) botonArriba.addEventListener("click",menuPrincipal); //cambia el evento del boton
    if (botonAbajo) botonAbajo.addEventListener("click",deslogear);
} //esta es una funcion se llama al logearse, cambia la class de los botones, haciendo que estos tengan otra funcion al estar logeado en el sistema

function deslogear(){
    ingresar=false;
    botonArriba.setAttribute("class", "claseIngreso");
    botonAbajo.setAttribute("class", "claseRegistro");
    document.getElementById("idLogear").innerHTML= "LOGEAR"
    document.getElementById("idRegistrar").innerHTML= "REGISTRAR"
} //esta funcion se habilita al salir del menu, vuelve a poner las clases y los textos como  estaban al principio, para mostrar un menu de logeo nuevmante.

var botonArriba = document.getElementById("idLogear"); //defino eventos para los botones.
var botonAbajo = document.getElementById("idRegistrar");

if (botonArriba) botonArriba.addEventListener("click",ingresarUsuario); //evento se ejecuta al presionar el boton.
if (botonAbajo) botonAbajo.addEventListener("click",registro);

function guardarLocal(arr, arrSave){
    localStorage.setItem(arr,JSON.stringify(arrSave))
}; // funcion para guardar los usuarios registrados en el localstore
function sacarLocal(){
    arrayAux=localStorage.getItem("usuarios");
    for (x=ussers.length; x<=0;x--){
        x.push(arrayAux);
        ussers=arrayAux;
    }
    guardarLocal("usuarios",ussers);
} //funcion ejecutada luego del registro, se crea un array auxiliar para tomar valores momentaneamente y de esta manera
//se combinan los array del localstore con el array utilizado en el registro local de nuevas cuentas.