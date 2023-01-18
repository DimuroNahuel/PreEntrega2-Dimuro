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
                // window.location="logged.html"; //si se logea correctamente, te envia a una pagina.
                ingresar=true;
                logeado();
                break;
            }

            if (i<1 && ingresar==false) {
                document.getElementById("idLogear").innerHTML= "DATOS INVALIDOS, INTENTE NUEVAMENTE"
            
            }//al equivocarse 3 veces, te envia a otra pagina.
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
                alert("DEBE INGRESAR UN DATO");
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

var botonArriba = document.getElementById("idLogear"); //defino eventos para los botones.
var botonAbajo = document.getElementById("idRegistrar");

var claseBotonArriba = document.getElementById('idLogear').className;
var claseBotonAbajo = document.getElementById('idRegistrar').className;

if ((botonArriba) && (claseBotonArriba=="claseIngreso")) botonArriba.addEventListener("click",ingresarUsuario); //defino la accion para invocar los eventos.
if ((botonAbajo)&& (claseBotonAbajo=="claseRegistro")) botonAbajo.addEventListener("click",registro);

if ((botonArriba) && (claseBotonArriba=="claseMenu")) botonArriba.addEventListener("click",menuPrincipal); //defino la accion para invocar los eventos.
if ((botonAbajo)&& (claseBotonAbajo=="claseDeslogear")) botonAbajo.addEventListener("click",deslogear);






// const guardarLocal = (clave, valor) => {localStorage.setItem(clave, valor)};
function guardarLocal(arr, arrSave){
    localStorage.setItem(arr,JSON.stringify(arrSave))
};
function sacarLocal(){
    arrayAux=localStorage.getItem("usuarios");
    for (x=ussers.length; x<=0;x--){
        x.push(arrayAux);
        ussers=arrayAux;
    }
    guardarLocal("usuarios",ussers);
}

function logeado(){
    // document.classList.replace("claseIngreso", "claseMenu");
    // document.classList.replace("claseRegistro", "claseDeslogear");
    document.getElementById('idLogear').className= "claseMenu"
    document.getElementById('idRegistrar').className= "claseDeslogear"
    document.getElementById("idLogear").innerHTML= "NAVEGADOR"
    document.getElementById("idRegistrar").innerHTML= "MENU"
    // document.getElementById("registrar").innerHTML= "DESLOGEAR"
    // document.getElementById("idLogear").id ="menu"
    // document.getElementById("registrar").id = "deslogear"
    // var botonMenu = document.getElementsByClassName("menu");
    // var botonDeslogear = document.getElementsByClassName("deslogear");
    // if (botonMenu) botonMenu.addEventListener("click",menuPrincipal);
    // if (botonMenu) botonDeslogear.addEventListener("click",deslogear);
}

function deslogear(){
    ingresar=false;
    document.getElementById("menu").innerHTML= "LOGEAR"
    document.getElementById("deslogear").innerHTML= "REGISTRAR"
    // document.getElementById("menu").id= "idLogear"
    // document.getElementById("deslogear").id= "registrar"
    // document.getElementById("NAVEGADOR").innerHTML= "nav"
}
