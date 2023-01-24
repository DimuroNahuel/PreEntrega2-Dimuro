let datos=12342;
let usserLista=[{usserSavee:"admin",passSavee:"1234", saldo:0}];
let arrayAux=[];
let indiceUser=0;
let usuarioActivo="";
let passUsserActivo="";
let saldoUsserActivo=0;
let ingresar=false;

inicio ();

function inicio (){
    sacarLocal();
    var botonIngreso = document.getElementById("idLogear");
    botonIngreso.addEventListener("click",()=>{
        document.getElementById ("ingreseUsuario").classList.toggle("show");
        document.getElementById ("ingresePass").classList.toggle("show");
        document.getElementById ("btnIngreso").classList.toggle("show");
        ingresoForm();
        }
    );
    var botonRegistro = document.getElementById("idRegistrar");
    botonRegistro.addEventListener("click",()=>{
        document.getElementById ("crearUser").classList.toggle("show");
        document.getElementById ("crearPass").classList.toggle("show");
        document.getElementById ("repitePass").classList.toggle("show");
        document.getElementById ("btnRegistrar").classList.toggle("show");
        document.getElementById ("btnSubmit").classList.toggle("show");
        registroFrom();
        }
    );

    let btnSubmit = document.getElementById("btnSubmit");
    if(btnSubmit)btnSubmit.addEventListener("click",()=>{
        document.getElementById("crearUser").value="";
        document.getElementById("crearPass").value="";
        document.getElementById("repitePass").value="";
    })
}

function ingresoForm(){
    var botonIngreso = document.getElementById("btnIngreso");
    botonIngreso.addEventListener("click",()=>{
        let usser = document.getElementById("ingreseUsuario");
        let usserPass = document.getElementById("ingresePass");
        let buscar = usserLista.findIndex(usserLista=>usserLista.usserSavee==usser.value);
        if ((buscar!=-1)&&(usserLista[buscar].passSavee==usserPass.value)){//comparacion de usuario ingresado con el de la bd.
            indiceUser=buscar;
            ingresar=true;      //si los datos ingresados coinciden con los guardados, se validará la autentificacion.
                //funcion llamada al estar logeado correctamente
            usuarioActivo=usserLista[buscar].usserSavee;
            passUsserActivo=usserLista[buscar].passSavee;
            saldoUsserActivo=usserLista[buscar].saldo;
            logeado();
            menuLogin();
        }
        if (ingresar==false&& botonIngreso) { //si ingresa datos invalidos dará error.
            alert("INTENTE NUEVAMENTE");
            }
        }
    );

}

// function ingresarUsuario(){ //funcion para logear, 3 intentos permitidos antes de dar error.
//     if (!ingresar){
//         for (let i=2; i>=0; i--){ //ciclo para contabilizar la cantidad de intentos.
//             let usser=prompt("Ingrese usuario \n"+(i+1)+" intentos restantes");
//             let usserPass=prompt("Ingrese pass  ");
//             let buscar = ussers.findIndex(ussers=>ussers.usserSavee==usser);
//             if ((buscar!=-1)&&(ussers[buscar].passSavee==usserPass)){//comparacion de usuario ingresado con el de la bd.
//                 ingresar=true;      //si los datos ingresados coinciden con los guardados, se validará la autentificacion.
//                   //funcion llamada al estar logeado correctamente
//                 usuarioActivo=ussers[buscar].usserSavee;
//                 passUsserActivo=ussers[buscar].passSavee;
//                 saldoUsserActivo=ussers[buscar].saldo;
//                 if(document.getElementById("htmlIdMenu").attributes.length<3) { // condicion que encontré para que no se vuelvan a agregar los elemntos al dom
//                     logeado();
//                     menuLogin();
//                 }

//                 else {
//                     document.getElementById("htmlIdMenu").style.display = 'block'; //en esta condicion, js reconoce que los elementos se encuentran creados y cambia el display para hacerlos visibles
//                     logeado();
//                 }
//                 break;
//             }
//             if (i<1 && ingresar==false) { //si ingresa datos invalidos dará error.
//                 document.getElementById("idLogear").innerHTML= "DATOS INVALIDOS, INTENTE NUEVAMENTE"
//             }
//         }
//     }

// }

// function menuPrincipal (){ //funcion antigua proximamente borrada, solo mantenida para extraer cosas utiles
//     let opcionMenu=prompt("Seleccione opcion: \n 1- Mostrar datos\n 2- Ingresar datos\n 3- Eliminar datos\n 4- Volver al menu");
//     switch(opcionMenu){//menu dentro del login
//         case "1": {
//             alert("Mostrando datos\n "+ datos);
//             menuPrincipal (); //llama a menu para no solicitarle al usuario que toque el boton en cada error.
//             break;
//         }//muestra los datos almacenados
//         case "2": {
//             let datoAgregado=prompt("Ingrese dato o digite 0 para dejar de agregar \n DATOS ACTUALES:\n " +datos);
//             while (datoAgregado!=0){//solicita datos y lo agrega al array, mientras no se presione el valor de salida 0, seguirá pidiendo datos.
//                 datos.push(datoAgregado);//agrega dato
//                 datoAgregado=prompt("Ingrese dato o digite 0 para dejar de agregar \n DATOS ACTUALES:\n " +datos);//bucle del while.
//             }
//             menuPrincipal ()//muestra nuevamente el menu.
//             break;
//         }//agrega datos
//         case "3": {
//             let datoBorrar=prompt("Mostrando datos, digite 0 para volver o \n escriba el nombre del dato a borrar: \n" + datos)//solicita el dato a borrar o el numero 0 para volver.
//             if (datoBorrar==0){ //si presiona el 0 vuelve al menu
//                 menuPrincipal ();
//                 break;
//             }
//             let buscador = datos.indexOf(datoBorrar); //valida que el dato a borrar exista en el array.
//             if (buscador!=-1){ //si encuentra el valor, lo borrará, sinó pasará al siguiente if
//                 datos.splice(buscador,1);
//                 menuPrincipal ();
//                 break;
//             }
//             else {
//                 alert("dato invalido"); //si no se encuentra el dato a borrar y tampoco es presionado el 0, dará error.
//                 menuPrincipal ();
//                 break;
//             }

//         }
//         case "": {
//             alert("DEBE INGRESAR UN DATO");//si se presiona aceptar sin introducir datos, tira error.
//             menuPrincipal ();
//             //opcion para volver.
//             break;
//         }
//         case "4": {
//             //opcion para volver.
//             break;
//         }
//         default:{
//             alert("INVALIDO!");//de presionarse otro boton fuera de los definidos, dará error.
//             menuPrincipal ();
//             break;
//         }
//     }
// }

function registroFrom(){
    var botonRegistro = document.getElementById("btnRegistrar");
    botonRegistro.addEventListener("click",()=>{

        let registroUsser= document.getElementById("crearUser").value;
        let registroPass= document.getElementById("crearPass").value;
        let confirmarPass= document.getElementById("repitePass").value;
        let buscar = usserLista.findIndex(usserLista=>usserLista.usserSavee==registroUsser); //valida si el usuario se encuentra o no en el array.
        if (buscar==-1){//si el nombre de usuario no se encuentra, quiere decir que dispone de el para usarlo como username.
            if (registroPass==confirmarPass && !registroUsser=="" && !registroPass==""){
                alert("registro exitoso");//si la pass y su confirmacion coincide, se acepta el registro.
                let newUser={usserSavee:registroUsser, passSavee:registroPass, saldo:0};
                usserLista.push(newUser);//se agrega el usuario registrado al array de usuarios, para poder logear.
                guardarLocal("usuarios",usserLista);
                document.getElementById("crearUser").value="";
                document.getElementById("crearPass").value="";
                document.getElementById("repitePass").value="";
            }
            else if(registroUsser=="" || registroPass=="" ){
                alert("los campos no pueden estar vacios");
            }
            else {
                alert("error, las contraseñas no coinciden");
            }
        }
        else {
            alert("error, usuario en uso");//si el nombre de usuario es encontrado en el array, quiere decir que ya se encuentra en uso y lo avisa.
        }
    }
    );
}

// function registro (){//funcion para registrar nuevo usuario.
//     if (!ingresar){
//         sacarLocal();
//         let registroUsser=prompt("ingrese usuario a registrar");//solicita nombre de usuario.
//         let buscar = ussers.findIndex(ussers=>ussers.usserSavee==registroUsser); //valida si el usuario se encuentra o no en el array.
//         if (buscar==-1){//si el nombre de usuario no se encuentra, quiere decir que dispone de el para usarlo como username.
//             let registroPass=prompt("ingrese pass a registrar");
//             let confirmarPass=prompt("confirme la pass ingresada");//solicita pass y confirmacion para guardarla.
//             if (registroPass==confirmarPass){
//                 alert("registro exitoso");//si la pass y su confirmacion coincide, se acepta el registro.
//                 let newUser={usserSavee:registroUsser, passSavee:registroPass};
//                 ussers.push(newUser);//se agrega el usuario registrado al array de usuarios, para poder logear.
//                 guardarLocal("usuarios",ussers);
//             }
//             else {
//                 alert("error, las contraseñas no coinciden");//si la pass y su confirmacion no coinciden, este lo avisa.
//             }
//         }
//         else {
//             alert("error, usuario en uso");//si el nombre de usuario es encontrado en el array, quiere decir que ya se encuentra en uso y lo avisa.
//         }
//     }
// }

function logeado(){
    
    document.getElementById("barraNav").setAttribute("class","cajaLoged");

    document.getElementById("idBody").setAttribute("class","bodySW");
    document.getElementById("idLogear").setAttribute("class","oculto"); //cambio de clase
    document.getElementById("idRegistrar").setAttribute("class","oculto");
    document.getElementById("title").textContent = "Bienvenido "+usuarioActivo+"";

    document.getElementById("saldoDeposito").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
    document.getElementById("mostrarSaldo").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
    document.getElementById("saldoExtraccion").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
    document.getElementById("saldoTransferir").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;

    document.getElementById("ingreseUsuario").setAttribute("class","oculto");
    document.getElementById("ingresePass").setAttribute("class","oculto");
    document.getElementById("btnIngreso").setAttribute("class","oculto");
    

    document.getElementById("crearUser").setAttribute("class","oculto");
    document.getElementById("crearPass").setAttribute("class","oculto");
    document.getElementById("repitePass").setAttribute("class","oculto");
    document.getElementById("btnRegistrar").setAttribute("class","oculto");
    document.getElementById("btnSubmit").setAttribute("class","oculto");

    document.getElementById("btnSALIR").setAttribute("class","show");
    document.getElementById("idVerSaldo").setAttribute("class","show");
    document.getElementById("idDeposito").setAttribute("class","show");
    document.getElementById("idTransferir").setAttribute("class","show");
    document.getElementById("idExtraccion").setAttribute("class","show");

    // 4 //cambia el evento del boton
    // if (botonAbajo) botonAbajo.addEventListener("click",deslogear);
    let btnDepositar = document.getElementById("btnDeposito");
    if(btnDepositar)btnDepositar.addEventListener("click",deposito);

    let extraerDinero = document.getElementById("btnExtraer");
    if(extraerDinero)extraerDinero.addEventListener("click",extraccion);

    let btnSALIR = document.getElementById ("btnSALIR");
    if(btnSALIR)btnSALIR.addEventListener("click",deslogear);

    let btnTransferir = document.getElementById ("btnTransferir");
    if(btnTransferir)btnTransferir.addEventListener("click",transferir);
    

    let actualizaSaldo = document.getElementById("actualizaSaldo");
    if(actualizaSaldo)actualizaSaldo.addEventListener("click",()=>{
        document.getElementById("mostrarSaldo").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
    });

    
} //esta es una funcion se llama al logearse, cambia la class de los botones, haciendo que estos tengan otra funcion al estar logeado en el sistema

function menuLogin() {
    ocultarBtn();
}

function ocultarBtn(){
    //funcion que cambia las clases de los botones y les agrega eventos para ocultar/mostrarlos.
    let btn_funSaldo = document.getElementById ("idVerSaldo");
    if(btn_funSaldo)btn_funSaldo.addEventListener("click",funSaldo);

    let btn_funDeposito = document.getElementById ("idDeposito");
    if(btn_funDeposito)btn_funDeposito.addEventListener("click",funDeposito);

    let btn_funTransferir = document.getElementById ("idTransferir");
    if(btn_funTransferir)btn_funTransferir.addEventListener("click",funTransferir);

    let btn_funExtraccion = document.getElementById ("idExtraccion");
    if(btn_funExtraccion)btn_funExtraccion.addEventListener("click",funExtraccion);


    function funSaldo(){
        document.getElementById ("mostrarSaldo").classList.toggle("show");
        document.getElementById ("actualizaSaldo").classList.toggle("show");
    }
    function funDeposito(){
        document.getElementById ("saldoDeposito").classList.toggle("show");
        document.getElementById ("inputDeposito").classList.toggle("show");
        document.getElementById ("btnDeposito").classList.toggle("show");
    }

    function funTransferir(){
        document.getElementById ("saldoTransferir").classList.toggle("show");
        document.getElementById ("cbuTransferencia").classList.toggle("show");
        document.getElementById ("montoTransferencia").classList.toggle("show");
        document.getElementById ("motivoTransferencia").classList.toggle("show");
        document.getElementById ("btnTransferir").classList.toggle("show");
    }
    function funExtraccion(){
        document.getElementById ("saldoExtraccion").classList.toggle("show");
        document.getElementById ("extraerDinero").classList.toggle("show");
        document.getElementById ("confirmaPass").classList.toggle("show");
        document.getElementById ("btnExtraer").classList.toggle("show");
    }
}

function deslogear(){
    document.getElementById("idBody").setAttribute("class", "body");
    document.getElementById("idLogear").setAttribute("class", "claseIngreso"); //cambio de clase
    document.getElementById("idRegistrar").setAttribute("class", "claseRegistro");
    document.getElementById("title").textContent = "Bienvenido ";

    document.getElementById("saldoDeposito").setAttribute("class","oculto");
    document.getElementById("mostrarSaldo").setAttribute("class","oculto");

    document.getElementById("ingreseUsuario").setAttribute("class", "oculto");
    document.getElementById("ingresePass").setAttribute("class", "oculto");
    document.getElementById("btnIngreso").setAttribute("class", "oculto");

    document.getElementById("crearUser").setAttribute("class", "oculto");
    document.getElementById("crearPass").setAttribute("class", "oculto");
    document.getElementById("repitePass").setAttribute("class", "oculto");
    document.getElementById("btnRegistrar").setAttribute("class", "oculto");
    document.getElementById("btnSubmit").setAttribute("class", "oculto");

    document.getElementById("btnSALIR").setAttribute("class","oculto");
    document.getElementById("idVerSaldo").setAttribute("class","oculto");
    document.getElementById("idDeposito").setAttribute("class","oculto");
    document.getElementById("idTransferir").setAttribute("class","oculto");
    document.getElementById("idExtraccion").setAttribute("class","oculto");
    document.getElementById("actualizaSaldo").setAttribute("class","oculto");
    document.getElementById("inputDeposito").setAttribute("class","oculto");
    document.getElementById("btnDeposito").setAttribute("class","oculto");

    document.getElementById("saldoTransferir").setAttribute("class","oculto");
    document.getElementById("cbuTransferencia").setAttribute("class","oculto");
    document.getElementById("montoTransferencia").setAttribute("class","oculto");
    document.getElementById("motivoTransferencia").setAttribute("class","oculto");
    document.getElementById("btnTransferir").setAttribute("class","oculto");

    document.getElementById("saldoExtraccion").setAttribute("class","oculto");
    document.getElementById("extraerDinero").setAttribute("class","oculto");
    document.getElementById("confirmaPass").setAttribute("class","oculto");
    document.getElementById("btnExtraer").setAttribute("class","oculto");

    document.getElementById("barraNav").setAttribute("class","caja");

    
    

    document.getElementById("ingreseUsuario").value="";
    document.getElementById("ingresePass").value="";

    usuarioActivo="";
    passUsserActivo="";
    saldoUsserActivo=0;
   


} //esta funcion se habilita al salir del menu, vuelve a poner las clases y los textos como  estaban al principio, para mostrar un menu de logeo nuevmante.

function guardarLocal(arr, arrSave){
    localStorage.setItem(arr,JSON.stringify(arrSave))
}; // funcion para guardar los usuarios registrados en el localstore

function sacarLocal(){
    arrayAux=JSON.parse(localStorage.getItem("usuarios"));
    for (x=usserLista.length; x<=0;x--){
        usserLista[x-1].push(arrayAux);
        usserLista=arrayAux;
    } 
    guardarLocal("usuarios",usserLista);
} //funcion ejecutada luego del registro, se crea un array auxiliar para tomar valores momentaneamente y de esta manera
//se combinan los array del localstore con el array utilizado en el registro local de nuevas cuentas.

function deposito(){
    if(document.getElementById("inputDeposito").value!="" && document.getElementById("inputDeposito").value>0){
        
        const saldoAux = document.getElementById("inputDeposito");
        console.log("SALDO ANTERIOR= "+saldoUsserActivo);
        console.log("SALDO INGRESADO= "+parseInt(saldoAux.value,10));
        saldoUsserActivo=saldoUsserActivo+parseInt(saldoAux.value,10);
        console.log("SALDO TOTAL= "+saldoUsserActivo);
        document.getElementById("saldoDeposito").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
        document.getElementById("mostrarSaldo").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
        document.getElementById("saldoExtraccion").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
        document.getElementById("saldoTransferir").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
        usserLista[indiceUser].saldo=saldoUsserActivo
        guardarLocal("usuarios",usserLista);
        document.getElementById("inputDeposito").value="";
        }
    else{
        alert("CAMPO VACIO");
    }
}

function extraccion(){
    if(document.getElementById("extraerDinero").value!="" || document.getElementById("confirmaPass").value!=""){
        if (document.getElementById("confirmaPass").value==passUsserActivo) {
            if (document.getElementById("extraerDinero").value<saldoUsserActivo && document.getElementById("extraerDinero").value>0) {     
                let saldoAux = document.getElementById("extraerDinero").value;
                saldoAux=parseInt(saldoAux,10);
                console.log("SALDO ANTERIOR= "+saldoUsserActivo);
                console.log("SALDO INGRESADO= "+saldoAux);
                saldoUsserActivo=saldoUsserActivo-saldoAux;
                console.log("SALDO TOTAL= "+saldoUsserActivo);
                document.getElementById("saldoDeposito").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
                document.getElementById("mostrarSaldo").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
                document.getElementById("saldoExtraccion").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
                document.getElementById("saldoTransferir").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
                usserLista[indiceUser].saldo=saldoUsserActivo
                guardarLocal("usuarios",usserLista);
                document.getElementById("extraerDinero").value="";
                }
            else{
                alert("MONTO INSUFICIENTE");
            }
        }    
        else{
            alert("PASS INCORRECTA");
        }
    }
    else{
        alert("CAMPO VACIO");
    }
}

function transferir(){
    let cbu = document.getElementById("cbuTransferencia").value;
    let buscar = usserLista.findIndex(usserLista=>usserLista.usserSavee==cbu); //valida si el usuario se encuentra o no en el array.
    console.log(buscar);
        if (buscar!=-1){
            if(document.getElementById("montoTransferencia").value<saldoUsserActivo && document.getElementById("montoTransferencia").value>0){
                let saldoAux = document.getElementById("montoTransferencia").value;
                saldoAux=parseInt(saldoAux,10);
                usserLista[buscar].saldo=+saldoAux;
                saldoUsserActivo=saldoUsserActivo-saldoAux;
                usserLista[indiceUser].saldo=saldoUsserActivo;
                guardarLocal("usuarios",usserLista);
                document.getElementById("saldoDeposito").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
                document.getElementById("mostrarSaldo").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
                document.getElementById("saldoExtraccion").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
                document.getElementById("saldoTransferir").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
                document.getElementById("cbuTransferencia").value="";
                document.getElementById("montoTransferencia").value="";
                document.getElementById("motivoTransferencia").value="";     
            }
            else{alert("user no encontrado");}
        }
}