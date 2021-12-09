//variable del lienzo
let canvas;
//variable del contexo
let contexo
//FPS
let FPS = 50

//ancho dela ficha
let anchoF = 50
let altoF = 50


//tipo de ficha
let pasto = "green";
let agua = "#80DEEA";
let tierra = "brown";
let inicio = "#795548";
let puente = "#641E16";
let arbusto = "#1B5E20";

//escenario array -Matriz
let escenario = [
    [3,2,2,2,2,5,0,1,0,0,0,0,0,0,0], //posicion 0
    [0,5,0,0,2,0,0,1,0,2,2,2,2,2,5], //posicion 1
    [0,0,0,0,2,2,2,4,2,2,0,0,0,0,0], //posicion 2
    [0,0,0,0,0,0,0,1,0,2,2,2,2,0,0], //posicion 3
    [0,0,0,0,0,0,0,1,0,2,5,5,2,0,5], //posicion 4
    [0,0,0,0,0,0,0,1,0,2,5,5,2,0,0],
    [0,0,0,5,0,0,2,4,2,2,2,2,2,0,0],
    [0,0,0,0,2,2,2,1,0,0,0,0,5,0,0],
    [5,0,0,0,2,0,5,1,0,0,0,0,0,0,0],
    [1,1,1,1,4,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,2,2,0,0,0,0,0,2,2,2,5,0],
    [0,0,0,2,0,0,0,0,0,0,2,0,2,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,0,2,0,0],
    [5,0,0,0,0,0,0,0,0,0,0,0,2,2,0],
    [0,0,0,0,0,0,0,5,0,0,0,0,0,2,3]
]

//construir escenario
function dibujarEscenario(){
    let color;
    //recorer el alto del escenario
    for(y = 0; y < escenario.length; y++){
        //recorrer el ancho
        for(x = 0; x < escenario[y].length; x++){
            if(escenario[y][x] == 0){
                color = pasto;
            }
            if(escenario[y][x] == 1){
                color = agua;
            }
            if(escenario[y][x] == 2){
                color = tierra;
            }
            if(escenario[y][x] == 3){
                color = inicio;
            }
            if(escenario[y][x] == 4){
                color = puente;
            }
            if(escenario[y][x] == 5){
                color = arbusto;
            }
            contexo.fillStyle = color
            contexo.fillRect(x*anchoF,y*altoF,anchoF, altoF)

        
        }
        

    }
}

//Declaramos la funcion del personaje 
let jugador = function(){
    this.x = 0;
    this.y = 0;
    this.color = "black"
   
    //Metodos
    this.dibuja = function(){
       contexo.fillStyle = this.color;
       contexo.fillRect(this.x*anchoF,this.y*altoF,anchoF,altoF);
    }
    this.arriba = function(){
        if (this.margenes(this.x,this.y - 1) == false){
            this.y--
        }
        
    }
    this.abajo = function(){
        if (this.margenes(this.x,this.y + 1) == false){
        this.y++
        }
    }
    this.izquierda = function(){
        if (this.margenes(this.x - 1,this.y) == false){
        this.x--
        }
    }
    this.derecha = function(){
        if (this.margenes(this.x + 1,this.y) == false){
        this.x++
         }
    }

    this.margenes = function(x,y){
        let colisiones = false
        if(escenario[y][x] == 0 || escenario[y][x] == 5 || escenario[y][x] == 1){
            colisiones = true
        }
            return(colisiones)
         
    }
    
}



//variable global
let protagonista;

//esta activa todo
function inicializar(){
    canvas = document.getElementById("canva")
        contexo = canvas.getContext("2d")
        
        // creo el jugador
        protagonista = new jugador()

        //lectura de teclado
        document.addEventListener('keydown', function(tecla){
            if(tecla.key == "ArrowUp"){
                protagonista.arriba()
            }
            else if(tecla.key == "ArrowDown"){
                protagonista.abajo()
            }
            else if(tecla.key == "ArrowRight"){
                protagonista.derecha()
            }
            else if(tecla.key == "ArrowLeft"){
                protagonista.izquierda()
            }
        }
        )
        
        //cant de tiempo del personaje para moverse
        setInterval(function(){
            principal()
        },1000/FPS)
    
}

//esta funcion cetraliza las demas funciones
function principal(){

     dibujarEscenario()
     protagonista.dibuja()
}