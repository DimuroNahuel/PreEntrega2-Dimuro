
let usserSave="admin"; //defino los datos del login
let passSave="1234";

function volver(){  //funcion para volver al menu principal
    window.location="index.html";
}

function log(){ //funcion para logear, 3 intentos permitidos antes de dar error.
    let ingresar=false;
    for (let i=2; i>=0; i--){ //ciclo para contabilizar la cantidad de intentos.
        let usser=prompt("Ingrese usuario        "+(i+1)+" intentos restantes");
        if (usser==-1) break; //breakpoint de emergencia, para pruebas y poder cancelar.
        let usserPass=prompt("Ingrese pass  ");
        if (usser==usserSave && passSave==usserPass){//comparacion de usuario ingresado con el de la bd.
            ingresar=true;
            window.location="logged.html"; //si se logea correctamente, te envia a una pagina.
            break;
        }
        else window.location="error.html";//al equivocarse 3 veces, te envia a otra pagina.
    }
}

// var button = document.getElementById("boton"); 
// button.addEventListener("click",log);

// mi idea era crear 2 eventlistener, para que uno ejecute el log() y otro para ejecutar
// la vuelta al index, una vez se encuentre en las otras paginas, pero me topé con un error
// que me obligó a usar un onClick en el html para poder realizar la ejecucion como deseaba.
// dejaré en el coderask mi consulta para asi poder quitar el onClick del html. se las comento
// al quitar el comentario arriba, para asi tener dos eventlistener, el primero funciona correctamente,
//pero el segundo queda nulo. quitando el onclick="log()" del html index en button, deja de 
//reconocerme el segundo eventlistener, probé muchas formas pero no lo logré, por eso lo
//ejecuto de esa manera para hacer correr el programa

var vuelve = document.getElementById("volver");
vuelve.addEventListener("click",volver); //evento ejecutado al presionar el boton "volver", te envia al inicio.




