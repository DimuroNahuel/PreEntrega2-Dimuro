let datos=12342;
let usserLista=[{usserSavee:"admin",passSavee:"1234", saldo:0, saldoDolar:0}];
let arrayAux=[];
let indiceUser=0;
let usuarioActivo="";
let passUsserActivo="";
let saldoUsserActivo=0;
let saldoDolarActivo=0;
let ingresar=false;
let dispBlock="block";
let dispNone="none";
let dispFlex="flex";
let fechaDolar="";
let precioDolar=0;


let saldoMostrar=["mostrarSaldo","actualizaSaldo"];
let depositoMostrar=["saldoDeposito","inputDeposito","btnDeposito"];
let transferirMostrar=["saldoTransferir","cbuTransferencia","montoTransferencia","motivoTransferencia","btnTransferir"];
let extraerMostrar=["saldoExtraccion","extraerDinero","confirmaPass","btnExtraer"];
let dolarMostrar=["mostrarSaldoDolar","comprarDolar","venderDolar"];
let compraDolar=["textCompraDolar","montoComprar","btnComprar"];
let ventaDolar=["textVenderDolar","montoVender","btnVender"];

let listaMostrarLog=["btnSALIR","idVerSaldo","idDeposito","idTransferir","idExtraccion","dolares"];
let listaOcultarLog=["ingreseUsuario","ingresePass","btnIngreso","crearUser","crearPass","repitePass","btnRegistrar","btnSubmit"];
let menuDesplegable=["menuDesplegable0","menuDesplegable1"];
let menuLogeado=["menuLogeado"];

//DESLOGEO
    let listaMostrar=["idLogear","idRegistrar"];
    let listaOcultar =["saldoDeposito","mostrarSaldo","ingreseUsuario","ingresePass","btnIngreso","crearUser","crearPass","repitePass","btnRegistrar","btnSubmit","btnSALIR","idVerSaldo","idDeposito","idTransferir","idExtraccion","actualizaSaldo","inputDeposito","btnDeposito","saldoTransferir","cbuTransferencia","montoTransferencia","motivoTransferencia","btnTransferir","saldoExtraccion","extraerDinero","confirmaPass","btnExtraer","mostrarSaldoDolar","comprarDolar","textCompraDolar","montoComprar","btnComprar","venderDolar","textVenderDolar","montoVender","btnVender"];
    let reinicioInput =["ingreseUsuario","ingresePass"]
//DESLOGEO

let listaInicio=[];
listaInicio= listaInicio.concat(saldoMostrar,depositoMostrar,transferirMostrar,extraerMostrar,menuLogeado,listaMostrarLog,listaOcultarLog,dolarMostrar,compraDolar,ventaDolar);
cambioDisplay(listaInicio,dispNone);
listaOcultarLog.unshift("idLogear","idRegistrar");

Swal.fire(
    'Bienvenido a nuestro sistema ATM',
    'realice depositos, transferencias a los demas usuarios y hasta extracciones en un solo lugar',
  )
inicio ();

//BOTONES PARA EL MENU LUEGO DEL LOGEO, CON EL MENU DESPLEGADO.
let btnDepositar = document.getElementById("btnDeposito");
if(btnDepositar){btnDepositar.addEventListener("click",deposito);
}
let extraerDinero = document.getElementById("btnExtraer");
if(extraerDinero){extraerDinero.addEventListener("click",extraccion);
}
let btnTransferir = document.getElementById ("btnTransferir");
if(btnTransferir){btnTransferir.addEventListener("click",transferir);
}
let actualizaSaldo = document.getElementById("actualizaSaldo");
if(actualizaSaldo){actualizaSaldo.addEventListener("click",funActSaldo);  
}

let btnComprar = document.getElementById("btnComprar");
if (btnComprar){btnComprar.addEventListener("click",comprarDolar);}

let btnVender = document.getElementById("btnVender");
if (btnVender){btnVender.addEventListener("click",venderDolar);}

let btnSALIR = document.getElementById ("btnSALIR");
if(btnSALIR){btnSALIR.addEventListener("click",()=>{
    document.getElementById("title").textContent = "Bienvenido ";
    cambioDisplay(listaOcultar,dispNone);
    cambioDisplay(menuLogeado,dispNone);
    cambioDisplay(ventaDolar,dispNone);
    cambioDisplay(compraDolar,dispNone);
    cambioDisplay(ventaDolar,dispNone);

    cambioDisplay(listaMostrar,dispBlock);
    cambioDisplay(menuDesplegable,dispFlex); 

    reiniciandoInput(reinicioInput);
    //limpiando los input.
    usuarioActivo,passUsserActivo="";
    saldoUsserActivo=0;
    Swal.fire(
        '¡Saliendo...!',
        'Gracias por utilizar nuestro sistema',
        'success')

});
}

 
let inputComprar = document.getElementById("montoComprar");
let textoComprar = document.getElementById("textCompraDolar");
inputComprar.addEventListener("keyup",()=>{
    textoComprar.innerHTML = "COSTO EN AR$ : "+precioDolar*inputComprar.value;
})

let inputVender = document.getElementById("montoVender");
let textoVender = document.getElementById("textVenderDolar");
inputVender.addEventListener("keyup",()=>{
    textoVender.innerHTML = "OBTENDRAS EN AR$: "+precioDolar*inputVender.value;     
    
})


//BOTONES PARA EL MENU LUEGO DEL LOGEO, CON EL MENU DESPLEGADO.




//SWITCH PARA MENUS DENTRO DEL LOGEO
let btn_funSaldo = document.getElementById ("idVerSaldo");
if(btn_funSaldo)btn_funSaldo.addEventListener("click",()=>{
    switchOcutar(saldoMostrar);
});//llamo a funcion con parametros que realiza el cambio de clases, en ella se llama el array que cambiará su clase segun se presione su respectivo boton.

let btn_funDeposito = document.getElementById ("idDeposito");
if(btn_funDeposito)btn_funDeposito.addEventListener("click",()=>{
    switchOcutar(depositoMostrar);
});   

let btn_funTransferir = document.getElementById ("idTransferir");
if(btn_funTransferir)btn_funTransferir.addEventListener("click",()=>{
    switchOcutar(transferirMostrar);
});

let btn_funExtraccion = document.getElementById ("idExtraccion");
if(btn_funExtraccion)btn_funExtraccion.addEventListener("click",()=>{
    switchOcutar(extraerMostrar);
});

let btn_funDolar = document.getElementById ("dolares");
if(btn_funDolar)btn_funDolar.addEventListener("click",()=>{
    switchOcutar(dolarMostrar);
});

let btn_funComprar = document.getElementById ("comprarDolar");
if(btn_funComprar)btn_funComprar.addEventListener("click",()=>{
    switchOcutar(compraDolar);
});

let btn_funVender = document.getElementById ("venderDolar");
if(btn_funVender)btn_funVender.addEventListener("click",()=>{
    switchOcutar(ventaDolar);
});
//SWITCH PARA MENUS DENTRO DEL LOGEO



function inicio (){
    if (JSON.parse(localStorage.getItem("usuarios"))){    
        usserLista=JSON.parse(localStorage.getItem("usuarios"));
    }
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
            saldoDolarActivo=usserLista[buscar].saldoDolar;

            document.getElementById("title").textContent = "Bienvenido "+usuarioActivo+"";
            funActSaldo();
            cambioDisplay(listaOcultarLog,dispNone);  
            cambioDisplay(menuDesplegable,dispNone)

            cambioDisplay(listaMostrarLog,dispBlock);
            cambioDisplay(menuLogeado,dispFlex)
            
            
        }
        else if (ingresar==false&& botonIngreso) { //si ingresa datos invalidos dará error.
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
                let newUser={usserSavee:registroUsser, passSavee:registroPass, saldo:0, saldoDolar:0};
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

function guardarLocal(){
    localStorage.setItem("usuarios",JSON.stringify(usserLista));
}; // funcion para guardar los usuarios registrados en el localstore

function deposito(){
    if(document.getElementById("inputDeposito").value!="" && document.getElementById("inputDeposito").value>0){
        //validacion para depositar o no
        let saldoAux = document.getElementById("inputDeposito");
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
        if (buscar!=-1 && usuarioActivo!=cbu){
            if(document.getElementById("montoTransferencia").value<=saldoUsserActivo && document.getElementById("montoTransferencia").value>0){
                //conjunto de if para validar que se pueda realar o no la transferencia.
                let saldoAux = document.getElementById("montoTransferencia").value;
                saldoAux=parseInt(saldoAux,10);//se parsea el saldo para tener su valor
                usserLista[buscar].saldo=usserLista[buscar].saldo+saldoAux;
                saldoUsserActivo=saldoUsserActivo-saldoAux;
                usserLista[indiceUser].saldo=saldoUsserActivo;
                //operaciones para el cambio de saldos entre los ussers
                guardarLocal(); //funcion que guarda cambios en el localstorage
                funActSaldo(); //funcion que actualiza el saldo
                let reinicioInput =["cbuTransferencia","montoTransferencia","motivoTransferencia"];
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
        else{
            Swal.fire(
                '¡Hubo un problema!',
                'Imposible auto enviarse dinero',
                'error')
    }
}

function comprarDolar(){
    let valorInput = parseInt(document.getElementById("montoComprar").value,10);
    let dolarTotal = parseFloat((valorInput*precioDolar).toFixed(2));
    if (dolarTotal<=saldoUsserActivo && valorInput>0){

        saldoUsserActivo=saldoUsserActivo-dolarTotal;
        saldoDolarActivo=saldoDolarActivo+valorInput;
        usserLista[indiceUser].saldo=saldoUsserActivo;
        usserLista[indiceUser].saldoDolar=saldoDolarActivo;
        
        funActSaldo();
        guardarLocal();

        document.getElementById("montoComprar").value="";
        Swal.fire(
            '¡Operación exitosa!',
            'Se ha realizado su compra',
            'success') 
   
        }
        else{
            Swal.fire(
                '¡Hubo un problema!',
                'Monto insuficiente para la compra',
                'error')
        }
}

function venderDolar(){
    let valorInput = parseInt(document.getElementById("montoVender").value,10);
    let dolarTotal = parseFloat((valorInput*precioDolar).toFixed(2));
    if (valorInput<=saldoDolarActivo && valorInput>0){

        saldoUsserActivo=saldoUsserActivo+dolarTotal;
        saldoDolarActivo=saldoDolarActivo-valorInput;
        usserLista[indiceUser].saldo=saldoUsserActivo;
        usserLista[indiceUser].saldoDolar=saldoDolarActivo;

        guardarLocal();
        funActSaldo();
        document.getElementById("montoVender").value="";
        Swal.fire(
            '¡Operación exitosa!',
            'Se ha realizado su venta',
            'success')    
        }
        else{
            Swal.fire(
                '¡Hubo un problema!',
                'Monto insuficiente para vender',
                'error')
        }
}

function funActSaldo(){
    document.getElementById("saldoDeposito").textContent = "SU SALDO ACTUAL ES: AR$"+saldoUsserActivo+" US$ "+saldoDolarActivo;
    document.getElementById("mostrarSaldo").textContent = "SU SALDO ACTUAL ES: AR$"+saldoUsserActivo+" US$ "+saldoDolarActivo;
    document.getElementById("saldoExtraccion").textContent = "SU SALDO ACTUAL ES: AR$"+saldoUsserActivo+" US$ "+saldoDolarActivo;
    document.getElementById("saldoTransferir").textContent = "SU SALDO ACTUAL ES: AR$"+saldoUsserActivo+" US$ "+saldoDolarActivo;

    document.getElementById("mostrarSaldoDolar").textContent = "SU SALDO ACTUAL ES: AR$"+saldoUsserActivo+" US$ "+saldoDolarActivo;
    
    document.getElementById("textCompraDolar").textContent = "COSTO EN AR$ : ";
    document.getElementById("textVenderDolar").textContent = "OBTENDRAS EN AR$: ";


}//funcion que se utiliza para actualizar el saldo mostrado en pantalla luego de una operacion o al presionar los botones "actualizar saldo"
function cambioDisplay(lista,display){
    console.log("---------------------------------------------->");
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
        console.log("---------------------------------------------->");
        for (let x=0; x<lista.length;x++ ){
            let elemento=document.getElementById(lista[x]);
            if (elemento.style.display == 'none'){
                elemento.style.display = 'block';
            }
            else{
                elemento.style.display = 'none';
            }
            console.log("nuevo display "+elemento.style.display+" de "+lista[x]);

        }//funcion utilizada para negar el estado de cada elemento del array, los estados son none o block
    }
    
    fetch("https://api.estadisticasbcra.com/usd_of",{
        headers:{
            Authorization: "BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDY3MjQzNDEsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJuYWh1ZWwuZGltdXJvQGhvdG1haWwuY29tIn0.KWt6PevIQz_-VMqyMd9Os8b3NfffRlVtkGiGWuW0zmJRspMjL_0mS8pDHAGLjG0O3AadPMB4BKFJiaw6Cl8l_A",
        },
    })
    .then((response)=> response.json())
    .then((data)=>{
        console.log(data[data.length-1]);
        let dataBank = document.getElementById("dolar");
        fechaDolar=data[data.length-1].d;
        precioDolar=data[data.length-1].v;

        let fechaText = document.createElement("li");
        fechaText.innerHTML= "COTIZ. DOLAR CON FECHA:"
        fechaText.setAttribute("class","item-0")
        let fecha = document.createElement("li");
        fecha.setAttribute("class","item-1")
        fecha.innerHTML= fechaDolar;

        let precioText= document.createElement("li");
        precioText.setAttribute("class","item-2")
        precioText.innerHTML=  "VALOR EN PESOS:";
        let precio = document.createElement("li");
        precio.setAttribute("class","item-3")
        precio.innerHTML="$"+precioDolar;
        dataBank.append(fechaText,fecha,precioText,precio);
});

