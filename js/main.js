let datos=12342;
let usserLista=[{usserSavee:"admin",passSavee:"1234", saldo:0}];
let arrayAux=[];
usuarioActivo="";
passUsserActivo="";
saldoUsserActivo="";
let ingresar=false;
sacarLocal();

function ingresoForm(){
    let usser = document.getElementById("ingreseUsuario");
    let usserPass = document.getElementById("ingresePass");
    let buscar = usserLista.findIndex(usserLista=>usserLista.usserSavee==usser.value);
    if ((buscar!=-1)&&(usserLista[buscar].passSavee==usserPass.value)){//comparacion de usuario ingresado con el de la bd.
        ingresar=true;      //si los datos ingresados coinciden con los guardados, se validará la autentificacion. 
            //funcion llamada al estar logeado correctamente
        usuarioActivo=usserLista[buscar].usserSavee;
        passUsserActivo=usserLista[buscar].passSavee;
        saldoUsserActivo=usserLista[buscar].saldo;
        if(document.getElementById("htmlIdMenu").attributes.length<3) { // condicion que encontré para que no se vuelvan a agregar los elemntos al dom
            logeado();
            menuLogin();
        }

        else {
            document.getElementById("htmlIdMenu").style.display = 'block'; //en esta condicion, js reconoce que los elementos se encuentran creados y cambia el display para hacerlos visibles
            logeado();
        }
    }
    if (ingresar==false&& botonIngreso) { //si ingresa datos invalidos dará error.
        alert("INTENTE NUEVAMENTE");
    }
    usser.reset();
    usserPass.reset();
}
var botonIngreso = document.getElementById("btnIngreso");
if(botonIngreso)botonIngreso.addEventListener("click",ingresoForm);


function ingresarUsuario(){ //funcion para logear, 3 intentos permitidos antes de dar error.
    if (!ingresar){
        for (let i=2; i>=0; i--){ //ciclo para contabilizar la cantidad de intentos.
            let usser=prompt("Ingrese usuario \n"+(i+1)+" intentos restantes");
            let usserPass=prompt("Ingrese pass  ");
            let buscar = ussers.findIndex(ussers=>ussers.usserSavee==usser);
            if ((buscar!=-1)&&(ussers[buscar].passSavee==usserPass)){//comparacion de usuario ingresado con el de la bd.
                ingresar=true;      //si los datos ingresados coinciden con los guardados, se validará la autentificacion. 
                  //funcion llamada al estar logeado correctamente
                usuarioActivo=ussers[buscar].usserSavee;
                passUsserActivo=ussers[buscar].passSavee;
                saldoUsserActivo=ussers[buscar].saldo;
                if(document.getElementById("htmlIdMenu").attributes.length<3) { // condicion que encontré para que no se vuelvan a agregar los elemntos al dom
                    logeado();
                    menuLogin();
                }

                else {
                    document.getElementById("htmlIdMenu").style.display = 'block'; //en esta condicion, js reconoce que los elementos se encuentran creados y cambia el display para hacerlos visibles
                    logeado();
                }
                break;
            }
            if (i<1 && ingresar==false) { //si ingresa datos invalidos dará error.
                document.getElementById("idLogear").innerHTML= "DATOS INVALIDOS, INTENTE NUEVAMENTE"
            }
        }
    }

}

function menuPrincipal (){ //funcion antigua proximamente borrada, solo mantenida para extraer cosas utiles
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
                break;
            }
            else {
                alert("dato invalido"); //si no se encuentra el dato a borrar y tampoco es presionado el 0, dará error.
                menuPrincipal ();
                break;
            }
            
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

    document.getElementById("idBody").setAttribute("class", "bodySW");
    botonArriba.setAttribute("class", "claseMenu"); //cambio de clase
    botonAbajo.setAttribute("class", "claseDeslogear"); //cambio de clase
    document.getElementById("title").textContent = "Bienvenido "+usuarioActivo+"";
    document.getElementById("idLogear").style.display= "none"; //cambia el texto del boton
    document.getElementById("idRegistrar").innerHTML= "SALIR" ;  //cambia el texto del boton
    document.getElementById("ingreseUsuario").setAttribute("class", "formLogin");
    document.getElementById("ingresePass").setAttribute("class", "formLogin");
    document.getElementById("btnIngreso").setAttribute("class", "formLogin");

    botonArriba.setAttribute("class", "claseMenu");

    // 4 //cambia el evento del boton
    if (botonAbajo) botonAbajo.addEventListener("click",deslogear);
    
} //esta es una funcion se llama al logearse, cambia la class de los botones, haciendo que estos tengan otra funcion al estar logeado en el sistema

function menuLogin() {
    //funcion que crea elementos dentro del html luego de logear, a modo de crear un menu para el usuario.
        
    //creacion de elementos de la lista menu
    const menuCajero = document.getElementById("htmlIdMenu");
    const mostrarSaldo = document.createElement ('ul');
    const ingreso = document.createElement ('ul');
    const transferir = document.createElement ('ul');
    const extraccion = document.createElement ('ul');
    
    //texto de lista
    mostrarSaldo.textContent= "VER SALDO";
    ingreso.textContent = "DEPOSITAR DINERO";
    transferir.textContent = "REALIZAR TRANSFERENCIA";
    extraccion.textContent = "EXTRACCION DE DINERO";
    //clases de elementos de la lista
    mostrarSaldo.innerHTML = "<input type='submit' value='VER SALDO' id='idVerSaldo' class='claseVerSaldo menuDesp'>";
    ingreso.innerHTML = "<input type='submit' value='DEPOSITO' id='idDeposito' class='claseDeposito menuDesp'>";
    transferir.innerHTML = "<input type='submit' value='TRANSFERIR' id='idTransferir' class='claseTransferencia menuDesp'>";
    extraccion.innerHTML = "<input type='submit' value='EXTRACCION' id='idExtraccion' class='claseExtraccion menuDesp'>";
    //agregandolo al dom
    menuCajero.append(mostrarSaldo,ingreso,transferir,extraccion);

    //saldo
    const saldo = document.createElement ('li');
    saldo.innerHTML= "SU SALDO ES $"+saldoUsserActivo+" pesos";
    saldo.setAttribute("id","mostrarSaldo");
    saldo.setAttribute("class","muestraSaldo");
    //boton actualizarsaldo
    const actualizarSaldo = document.createElement ('li');
    actualizarSaldo.innerHTML = "<input type='submit' value='Actualizar' id='actualizaSaldo' class='actualizarSaldo'>";
    //agregandolo al dom
    mostrarSaldo.append(saldo,actualizarSaldo);

    //saldo deposito
    const saldoDeposito=document.createElement ('li');
    saldoDeposito.innerHTML= "SU SALDO ES $"+saldoUsserActivo+" pesos";
    saldoDeposito.setAttribute("id","saldoDeposito");
    saldoDeposito.setAttribute("class","classSaldoDeposito");
    //deposito input
    const depositando = document.createElement ('li');
    depositando.innerHTML = "<input type='text' name='deposito' id='inputDeposito' placeholder='Ingrese dinero' class='inputDeposito' >";
    //boton deposito 
    const enviarDeposito = document.createElement ('li');
    enviarDeposito.innerHTML = "<input type='submit' value='Depositar' id='btnDeposito' class='btnDeposito'>";
    //agregandolo al dom
    ingreso.append(saldoDeposito,depositando,enviarDeposito);

    //transferencia
    //cbu
    const cbuTransferencia = document.createElement ('li');
    cbuTransferencia.innerHTML = "<input type='text' name='cbu' id='cbuTransferencia' placeholder='cbu para enviar' class='cbuTransferencia' >";
    //monto
    const montoTransferencia = document.createElement ('li');
    montoTransferencia.innerHTML = "<input type='text' name='monto' id='montoTransferencia' placeholder='motivo de la transferencia?' class='montoTransferencia'>";
    //motivo
    const motivoTransferencia = document.createElement ('li');
    motivoTransferencia.innerHTML = "<input type='text' name='motivo' id='motivoTransferencia' placeholder='Ingrese dinero a transferir' class='motivoTransferencia'>";
    //boton transferencia
    const enviarTransferencia = document.createElement ('li');
    enviarTransferencia.innerHTML = "<input type='submit' value='Transferir' id='btnTransferir' class='btnTransferir'>";

    //agregandolo al dom
    transferir.append(cbuTransferencia,montoTransferencia,motivoTransferencia,enviarTransferencia);

    //extraccion
    //monto
    const extraerDinero = document.createElement ('li');
    extraerDinero.innerHTML = "<input type='text' name='extraer' id='extraerDinero' placeholder='Ingrese monto para extraccion' class='ExtraerDinero' >";
    //confirmacion con contraseña
    const confirmarExtraccion = document.createElement ('li');
    confirmarExtraccion.innerHTML = "<input type='text' name='confirmacionNecesaria' id='confirmaPass' placeholder='INGRESE CONTRASEÑA PARA CONFIRMAR' class='confirmaPass'>";
    //boton extraer
    const extraccionBoton = document.createElement ('li');
    extraccionBoton.innerHTML = "<input type='submit' value='Extraer' id='btnExtraer'class='btnExtraer' >";
    //agregandolo al dom
    extraccion.append(extraerDinero,confirmarExtraccion,extraccionBoton);

    ocultarBtn();
}

function ocultarBtn(){
    //funcion que cambia las clases de los botones y les agrega eventos para ocultar/mostrarlos.
    let btn_funSaldo = document.getElementById ("idVerSaldo");
    btn_funSaldo.addEventListener("click",funSaldo);

    let btn_funDeposito = document.getElementById ("idDeposito");
    btn_funDeposito.addEventListener("click",funDeposito);

    let btn_funTransferir = document.getElementById ("idTransferir");
    btn_funTransferir.addEventListener("click",funTransferir);

    let btn_funExtraccion = document.getElementById ("idExtraccion");
    btn_funExtraccion.addEventListener("click",funExtraccion);

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
        document.getElementById ("cbuTransferencia").classList.toggle("show");
        document.getElementById ("montoTransferencia").classList.toggle("show");
        document.getElementById ("motivoTransferencia").classList.toggle("show");
        document.getElementById ("btnTransferir").classList.toggle("show");
    }
    function funExtraccion(){
        document.getElementById ("extraerDinero").classList.toggle("show");
        document.getElementById ("confirmaPass").classList.toggle("show");
        document.getElementById ("btnExtraer").classList.toggle("show");
    }
}

function deslogear(){
    ingresar=false;
    document.getElementById("idBody").setAttribute("class", "body");
    botonArriba.setAttribute("class", "claseIngreso");
    botonAbajo.setAttribute("class", "claseRegistro");
    document.getElementById("idLogear").innerHTML= "LOGEAR"
    document.getElementById("idRegistrar").innerHTML= "REGISTRAR"
    usuarioActivo="";
    document.getElementById("htmlIdMenu").style.display = 'none';
    document.getElementById("idLogear").style.display= "block"
    document.getElementById("title").textContent = "Bienvenido al menu de ingreso";
    usuarioActivo="";
    passUsserActivo="";
    saldoUsserActivo="";
    
} //esta funcion se habilita al salir del menu, vuelve a poner las clases y los textos como  estaban al principio, para mostrar un menu de logeo nuevmante.

function guardarLocal(arr, arrSave){
    localStorage.setItem(arr,JSON.stringify(arrSave))
}; // funcion para guardar los usuarios registrados en el localstore

function sacarLocal(){
    arrayAux=localStorage.getItem("usuarios");
    for (x=usserLista.length; x<=0;x--){
        x.push(arrayAux);
        usserLista=arrayAux;
    }
    guardarLocal("usuarios",usserLista);
} //funcion ejecutada luego del registro, se crea un array auxiliar para tomar valores momentaneamente y de esta manera
//se combinan los array del localstore con el array utilizado en el registro local de nuevas cuentas.
    
var botonArriba = document.getElementById("idLogear"); //defino eventos para los botones.
var botonAbajo = document.getElementById("idRegistrar");

if (botonArriba) botonArriba.addEventListener("click",logeo); //evento se ejecuta al presionar el boton.
if (botonAbajo) botonAbajo.addEventListener("click",registro);

function logeo(){
    document.getElementById ("ingreseUsuario").classList.toggle("show");
    document.getElementById ("ingresePass").classList.toggle("show");
    document.getElementById ("btnIngreso").classList.toggle("show");

}

function registro(){
    document.getElementById ("crearUser").classList.toggle("show");
    document.getElementById ("crearPass").classList.toggle("show");
    document.getElementById ("repitePass").classList.toggle("show");
    document.getElementById ("btnRegistrar").classList.toggle("show");
    document.getElementById ("btmSubmit").classList.toggle("show");

}