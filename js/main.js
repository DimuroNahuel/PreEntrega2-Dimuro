let datos=12342;
let usserLista=[{usserSavee:"admin",passSavee:"1234", saldo:0}];
let arrayAux=[];
let indiceUser=0;
let usuarioActivo="";
let passUsserActivo="";
let saldoUsserActivo=0;
let ingresar=false;
let dispBlock="block";
let dispNone="none";
let dispFlex="flex";


let saldoMostrar=["mostrarSaldo","actualizaSaldo"];
let depositoMostrar=["saldoDeposito","inputDeposito","btnDeposito"];
let transferirMostrar=["saldoTransferir","cbuTransferencia","montoTransferencia","motivoTransferencia","btnTransferir"];
let extraerMostrar=["saldoExtraccion","extraerDinero","confirmaPass","btnExtraer"];
let listaMostrarLog=["btnSALIR","idVerSaldo","idDeposito","idTransferir","idExtraccion"];
let listaOcultarLog=["ingreseUsuario","ingresePass","btnIngreso","crearUser","crearPass","repitePass","btnRegistrar","btnSubmit"];
let menuDesplegable=["menuDesplegable0","menuDesplegable1"];
let menuLogeado=["menuLogeado"];

let listaInicio=[];
listaInicio= listaInicio.concat(saldoMostrar,depositoMostrar,transferirMostrar,extraerMostrar,menuLogeado,listaMostrarLog,listaOcultarLog);
cambioDisplay(listaInicio,dispNone);
listaOcultarLog.unshift("idLogear","idRegistrar");


inicio ();

function inicio (){
    usserLista=JSON.parse(localStorage.getItem("usuarios"));

    let botonIngreso = document.getElementById("idLogear");
    botonIngreso.addEventListener("click",()=>{
        let listaMostrar=["ingreseUsuario","ingresePass","btnIngreso"]
        switchOcutar(listaMostrar);
        ingresoForm();
        }
    );
    let botonRegistro = document.getElementById("idRegistrar");
    botonRegistro.addEventListener("click",()=>{
        let listaMostrar=["crearUser","crearPass","repitePass","btnRegistrar","btnSubmit"]
        switchOcutar(listaMostrar);
        registroFrom();
        }
    );

    let btnSubmit = document.getElementById("btnSubmit");
    if(btnSubmit)btnSubmit.addEventListener("click",()=>{
        let reinicioInput=["crearUser","crearPass","repitePass"]
        reiniciandoInput(reinicioInput);
    })
}

function ingresoForm(){
    let botonIngreso = document.getElementById("btnIngreso");
    botonIngreso.addEventListener("click",()=>{
        let usser = document.getElementById("ingreseUsuario");
        let usserPass = document.getElementById("ingresePass");
        let buscar = usserLista.findIndex(usserLista=>usserLista.usserSavee==usser.value);
        if ((buscar!=-1)&&(usserLista[buscar].passSavee==usserPass.value)){//comparacion de usuario ingresado con el de la bd.
            Swal.fire(
                '¡Operación exitosa!',
                'Está ingresando a nuestro sistema',
                'success')
            indiceUser=buscar;
            ingresar=true;      //si los datos ingresados coinciden con los guardados, se validará la autentificacion.
                //funcion llamada al estar logeado correctamente
            usuarioActivo=usserLista[buscar].usserSavee;
            passUsserActivo=usserLista[buscar].passSavee;
            saldoUsserActivo=usserLista[buscar].saldo;
            logeado();
            
        }
        if (ingresar==false&& botonIngreso) { //si ingresa datos invalidos dará error.
            Swal.fire(
                '¡Hubo un problema!',
                'INTENTE NUEVAMENTE',
                'error')
            }
        }
    );

}

function registroFrom(){
    let botonRegistro = document.getElementById("btnRegistrar");
    botonRegistro.addEventListener("click",()=>{
        let registroUsser= document.getElementById("crearUser").value;
        let registroPass= document.getElementById("crearPass").value;
        let confirmarPass= document.getElementById("repitePass").value;
        let buscar = usserLista.findIndex(usserLista=>usserLista.usserSavee==registroUsser); //valida si el usuario se encuentra o no en el array.
        if (buscar==-1){//si el nombre de usuario no se encuentra, quiere decir que dispone de el para usarlo como username.
            if (registroPass==confirmarPass && !registroUsser=="" && !registroPass==""){
                Swal.fire(
                    '¡Registro exitoso!',
                    'Bienvenido a nuestro sistema '+registroUsser,
                    'success'
                  )
                let newUser={usserSavee:registroUsser, passSavee:registroPass, saldo:0};
                usserLista.push(newUser);//se agrega el usuario registrado al array de usuarios, para poder logear.
                guardarLocal();
                let reinicioInput=["crearUser","crearPass","repitePass"]
                reiniciandoInput(reinicioInput);
            }
            else if(registroUsser=="" || registroPass=="" ){
                Swal.fire(
                    '¡Hubo un problema!',
                    'Los campos no pueden estar vacios',
                    'error'
                  )
            }
            else {
                Swal.fire(
                    '¡Hubo un problema!',
                    'Las contraseñas no coinciden',
                    'error'
                  )
            }
        }
        else {
            Swal.fire(
                '¡Hubo un problema!',
                'Usuario actualmente en uso',
                'error'
              )
        }
    }
    );
}

function logeado(){
    if (ingresar==true){
        document.getElementById("barraNav").setAttribute("class","cajaLoged");
        document.getElementById("idBody").setAttribute("class","bodySW");
        document.getElementById("title").textContent = "Bienvenido "+usuarioActivo+"";
        //cambio clases de variables para mostrar/ocultar
        funActSaldo();
        cambioDisplay(listaOcultarLog,dispNone);      
        cambioDisplay(listaMostrarLog,dispBlock);
        cambioDisplay(menuDesplegable,dispNone)
        cambioDisplay(menuLogeado,dispFlex)


        //estos son arrays que contienen las id de los elementos que cambiaran su visibilidad al recibir click en un determinado boton.
        let btn_funSaldo = document.getElementById ("idVerSaldo");
        if(btn_funSaldo)btn_funSaldo.addEventListener("click",()=>{switchOcutar(saldoMostrar)});//llamo a funcion con parametros que realiza el cambio de clases, en ella se llama el array que cambiará su clase segun se presione su respectivo boton.
        let btn_funDeposito = document.getElementById ("idDeposito");
        if(btn_funDeposito)btn_funDeposito.addEventListener("click",()=>{switchOcutar(depositoMostrar)});   
        let btn_funTransferir = document.getElementById ("idTransferir");
        if(btn_funTransferir)btn_funTransferir.addEventListener("click",()=>{switchOcutar(transferirMostrar)});
        let btn_funExtraccion = document.getElementById ("idExtraccion");
        if(btn_funExtraccion)btn_funExtraccion.addEventListener("click",()=>{switchOcutar(extraerMostrar)});

        // 4 //cambia el evento del boton
        // if (botonAbajo) botonAbajo.addEventListener("click",deslogear);
        let btnDepositar = document.getElementById("btnDeposito");
        if(btnDepositar){btnDepositar.addEventListener("click",deposito);
        }
        let extraerDinero = document.getElementById("btnExtraer");
        if(extraerDinero){extraerDinero.addEventListener("click",extraccion);
        }
        let btnSALIR = document.getElementById ("btnSALIR");
        if(btnSALIR){btnSALIR.addEventListener("click",deslogear);
        }
        let btnTransferir = document.getElementById ("btnTransferir");
        if(btnTransferir){btnTransferir.addEventListener("click",transferir);
        }
        let actualizaSaldo = document.getElementById("actualizaSaldo");
        if(actualizaSaldo){actualizaSaldo.addEventListener("click",funActSaldo);
        }
    }
} //esta es una funcion se llama al logearse, cambia la class de los botones, haciendo que estos tengan otra funcion al estar logeado en el sistema

function ocultarBtn(){
    if (ingresar==true){
        //funcion que cambia las clases de los botones y les agrega eventos para ocultar/mostrarlos.
        
}
}
function deslogear(){
    if (ingresar==true){
        document.getElementById("idBody").setAttribute("class", "body"); //cambio de clases a objetos para ocultar / mostrar
        document.getElementById("barraNav").setAttribute("class","caja");
        document.getElementById("title").textContent = "Bienvenido ";

        let listaMostrar=["idLogear","idRegistrar"];
        let listaOcultar =["saldoDeposito","mostrarSaldo","ingreseUsuario","ingresePass","btnIngreso","crearUser","crearPass","repitePass","btnRegistrar","btnSubmit","btnSALIR","idVerSaldo","idDeposito","idTransferir","idExtraccion","actualizaSaldo","inputDeposito","btnDeposito","saldoTransferir","cbuTransferencia","montoTransferencia","motivoTransferencia","btnTransferir","saldoExtraccion","extraerDinero","confirmaPass","btnExtraer"];
        let reinicioInput =["ingreseUsuario","ingresePass"]
        //array que cambiará su clase para mostrar/ocultarse
        cambioDisplay(listaOcultar,dispNone);
        cambioDisplay(listaMostrar,dispBlock);
        cambioDisplay(menuDesplegable,dispFlex);  
        cambioDisplay(menuLogeado,dispNone)
        reiniciandoInput(reinicioInput);
        //limpiando los input.
        usuarioActivo,passUsserActivo="";
        saldoUsserActivo=0;
        Swal.fire(
            '¡Saliendo...!',
            'Gracias por utilizar nuestro sistema',
            'success')

    }
} //esta funcion se habilita al salir del menu, vuelve a poner las clases y los textos como  estaban al principio, para mostrar un menu de logeo nuevmante.

function guardarLocal(){
    localStorage.setItem("usuarios",JSON.stringify(usserLista));
}; // funcion para guardar los usuarios registrados en el localstore

function deposito(){
    if(document.getElementById("inputDeposito").value!="" && document.getElementById("inputDeposito").value>0){
        //validacion para depositar o no
        const saldoAux = document.getElementById("inputDeposito");
        console.log("SALDO ANTERIOR= "+saldoUsserActivo);
        console.log("SALDO INGRESADO= "+parseInt(saldoAux.value,10));
        saldoUsserActivo=saldoUsserActivo+parseInt(saldoAux.value,10);
        console.log("SALDO TOTAL= "+saldoUsserActivo);
        funActSaldo();
        usserLista[indiceUser].saldo=saldoUsserActivo;//guarda saldo en la lista de ussers
        Swal.fire(
            '¡Operación exitosa!',
            'Se ha realizado su deposito',
            'success')
        guardarLocal();
        document.getElementById("inputDeposito").value="";
        }
    else{
        Swal.fire(
            '¡Hubo un problema!',
            'CAMPO VACIO',
            'error')
    }
}

function extraccion(){
    if(document.getElementById("extraerDinero").value!="" || document.getElementById("confirmaPass").value!=""){
        if (document.getElementById("confirmaPass").value==passUsserActivo) {
            if (document.getElementById("extraerDinero").value<=saldoUsserActivo && document.getElementById("extraerDinero").value>0) {     
                //conjunto de if para validar que se pueda realar o no la extraccion.
                let saldoAux = document.getElementById("extraerDinero").value;//se toma valor del input
                saldoAux=parseInt(saldoAux,10); //se parsea el saldo para tener su valor
                console.log("SALDO ANTERIOR= "+saldoUsserActivo);
                console.log("SALDO INGRESADO= "+saldoAux);
                saldoUsserActivo=saldoUsserActivo-saldoAux;
                console.log("SALDO TOTAL= "+saldoUsserActivo);
                funActSaldo(); //funcion que actualiza el saldo
                usserLista[indiceUser].saldo=saldoUsserActivo
                guardarLocal(); //funcion que guarda cambios en el localstorage
                let reinicioInput =["extraerDinero","confirmaPass"]
                reiniciandoInput(reinicioInput);
                Swal.fire(
                    '¡Operación exitosa!',
                    'Se ha realizado su extracción',
                    'success')
                }
            else{
                Swal.fire(
                    '¡Hubo un problema!',
                    'MONTO INSUFICIENTE',
                    'error')
            }
        }    
        else{
            Swal.fire(
                '¡Hubo un problema!',
                'PASS INCORRECTA',
                'error')
        }
    }
    else{
        Swal.fire(
            '¡Hubo un problema!',
            'CAMPO VACIO',
            'error')
    }
}

function transferir(){
    let cbu = document.getElementById("cbuTransferencia").value;
    let buscar = usserLista.findIndex(usserLista=>usserLista.usserSavee==cbu); //valida si el usuario se encuentra o no en el array.
    console.log(buscar);
        if (buscar!=-1){
            if(document.getElementById("montoTransferencia").value<saldoUsserActivo && document.getElementById("montoTransferencia").value>0){
                //conjunto de if para validar que se pueda realar o no la extraccion.
                let saldoAux = document.getElementById("montoTransferencia").value;
                saldoAux=parseInt(saldoAux,10);//se parsea el saldo para tener su valor
                usserLista[buscar].saldo=+saldoAux;
                saldoUsserActivo=saldoUsserActivo-saldoAux;
                usserLista[indiceUser].saldo=saldoUsserActivo;
                //operaciones para el cambio de saldos entre los ussers
                guardarLocal(); //funcion que guarda cambios en el localstorage
                funActSaldo(); //funcion que actualiza el saldo
                let reinicioInput =["cbuTransferencia","montoTransferencia","motivoTransferencia"]
                reiniciandoInput(reinicioInput);
                //limpio los valores de los input.
                Swal.fire(
                    '¡Operación exitosa!',
                    'Se ha realizado su transferencia',
                    'success')    
            }
            else{
                Swal.fire(
                    '¡Hubo un problema!',
                    'Usuario no encontrado',
                    'error')
            }
        }
}

function funActSaldo(){
    document.getElementById("saldoDeposito").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
    document.getElementById("mostrarSaldo").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
    document.getElementById("saldoExtraccion").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
    document.getElementById("saldoTransferir").textContent = "SU SALDO ACTUAL ES: $"+saldoUsserActivo;
}//funcion que se utiliza para actualizar el saldo mostrado en pantalla luego de una operacion o al presionar los botones "actualizar saldo"
function cambioDisplay(lista,display){
    for (let x=0; x<lista.length;x++ ){
        document.getElementById(lista[x]).style.display = display;
        console.log("nuevo display "+ display+ " de " +lista[x]);
       } // cambio de clase en recursion a objetos que llevarán la misma clase.
}
    function reiniciandoInput(lista){
        for (let x=0; x<lista.length;x++ ){
            document.getElementById(lista[x]).value="";
            console.log("limpiando input de "+lista[x]);
           } // cambio de clase en recursion a objetos que llevarán la misma clase.

        }
    function switchOcutar(lista){
        for (let x=0; x<lista.length;x++ ){
            if (document.getElementById(lista[x]).style.display == 'none'){
                document.getElementById(lista[x]).style.display = 'block';
            }
            else{
                document.getElementById(lista[x]).style.display = 'none';
            }
            console.log("nuevo display none de "+lista[x]);
        }
    }

    