const sectionSeleccionarAtaque=document.getElementById('selecciona-ataque')
const sectionReiniciar=document.getElementById('reiniciar')
const botonMascotaJugado = document.getElementById('boton-mascota')
const botonReiniciar= document.getElementById('boton-reiniciar')
sectionReiniciar.style.display='none'

const sectionSeleccionarMascota=document.getElementById('selecciona-mascota')

const spanMascotaJugador=document.getElementById('mascota-jugador')

const spanMascotaEnemigo=document.getElementById('mascota-enemigo')

const spanVidasJugador=document.getElementById('vidas-jugador')
const spanVidasEnemigo=document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas =document.getElementById('contenedorTarjetas')
const contenedorAtaques=document.getElementById('contenedorAtaques')

let mokepones=[]
let ataqueJugador = []
let ataqueEnemigo=[]
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones=[]
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador=0
let victoriasEnemigo=0
let vidasJugador =3
let vidasEnemigo =3

class Mokepon{
    constructor(nombre,foto,vida){
        this.nombre = nombre
        this.foto=foto
        this.vida=vida
        this.ataques=[]
    }
}

let hipodoge= new Mokepon('Hipodoge','./assets/hopo_mokepon.jpg', 5 )

let capipepo=new Mokepon('Capipepo','./assets/capi_mokepon.jpg',5)

let ratigueya=new Mokepon('Ratigueya', './assets/rati_mokepon.jpg', 5)

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'}
)

capipepo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
)

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},   
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'}
)

mokepones.push(hipodoge,capipepo,ratigueya)
 
function iniciarJuego(){
    
    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones=`
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre} >
            <p>${mokepon.nombre} </p>
            <img src=${mokepon.foto} alt=${mokepon.nombre} >
        </label>
        `
    contenedorTarjetas.innerHTML+=opcionDeMokepones

     inputHipodoge=document.getElementById('Hipodoge')
     inputCapipepo=document.getElementById('Capipepo')
     inputRatigueya=document.getElementById('Ratigueya')
    })
    
    botonMascotaJugado.addEventListener('click', seleccionarMascotaJugador)
    
        
    botonReiniciar.addEventListener('click',reiniciarJuego)
}

function seleccionarMascotaJugador(){
    
    sectionSeleccionarMascota.style.display = 'none'

   
    sectionSeleccionarAtaque.style.display = 'flex'

   

    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML= inputHipodoge.id  
        mascotaJugador=inputHipodoge.id
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML=inputCapipepo.id  
        mascotaJugador=inputCapipepo.id
    } else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML=inputRatigueya.id
        mascotaJugador=inputRatigueya.id
    } else {
        alert('debes seleccionar una mascota') 
    }

    
    extraerAtaque(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaque(mascotaJugador){

    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques=mokepones[i].ataques
        }
        
    }
    
    mostrarAtaques(ataques)

}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon=`
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML+=ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones=document.querySelectorAll('.BAtaque')

    
}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click',(e)=>{
             if(e.target.textContent ==='🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background='#112f58'
                boton.disabled= true
            } else if(e.target.textContent ==='💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background='#112f58'
                boton.disabled= true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background='#112f58'
                boton.disabled= true
            }
            ataqueAleatoreoEnemigo()
        })
    })

    
}

function seleccionarMascotaEnemigo(){

    let mascotaAleatoreo=aleatoreo(0,mokepones.length-1)
    
    spanMascotaEnemigo.innerHTML= mokepones[mascotaAleatoreo].nombre
    ataquesMokeponEnemigo= mokepones[mascotaAleatoreo].ataques
    secuenciaAtaque()

}



function ataqueAleatoreoEnemigo(){
    let ataqueAleatoreo=aleatoreo(0,ataquesMokeponEnemigo.length-1)

    if (ataqueAleatoreo == 0 || ataqueAleatoreo == 1){
        ataqueEnemigo.push('FUEGO')
    }else if (ataqueAleatoreo == 3 || ataqueAleatoreo == 4 ){
        ataqueEnemigo.push('AGUA') 
    }else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()

}

function iniciarPelea(){
    if (ataqueJugador.length===5) {
        combate()
    }
}

function indexAmbosOpo(jugador,enemigo){

    indexAtaqueJugador=ataqueJugador[jugador]
    indexAtaqueEnemigo=ataqueEnemigo[enemigo]
}

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) { 
        if (ataqueJugador[index]===ataqueEnemigo[index]){
        indexAmbosOpo(index,index)
        crearMensaje("Empate")
        }
            else if( ataqueJugador[index]==='FUEGO' && ataqueEnemigo[index] ==='TIERRA'){
            victoriasJugador++
            indexAmbosOpo(index,index)
            crearMensaje("Ganaste")
            spanVidasJugador.innerHTML=victoriasJugador
        }
        else if(ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO'){
            victoriasJugador++
            indexAmbosOpo(index,index)
            crearMensaje("Ganaste")
            spanVidasJugador.innerHTML=victoriasJugador
        }
        else if(ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA'){
            victoriasJugador++
            indexAmbosOpo(index,index)
            crearMensaje("Ganaste")
            spanVidasJugador.innerHTML=victoriasJugador
        }
        else{
            victoriasEnemigo++
            indexAmbosOpo(index,index)
            crearMensaje("Perdiste")
            spanVidasEnemigo.innerHTML=victoriasEnemigo
        }
        
    }

   

    revisarVictorias()

}

function revisarVictorias(){
    if (victoriasJugador===victoriasEnemigo){
        crearMensajeFinal("Empataste bobo hp")

    }else if (victoriasJugador>victoriasEnemigo){
        crearMensajeFinal("Felicitaciones, Ganaste")
    } else{
        crearMensajeFinal("PERDEDOR HP")
    }
}

function crearMensaje(resultado){
    
    let nuevoAtaqueDelJugador= document.createElement('p')
    let nuevoAtaqueDelEnemigo= document.createElement('p')

    sectionMensajes.innerHTML= resultado
    nuevoAtaqueDelJugador.innerHTML=indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML=indexAtaqueEnemigo

   
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    
    sectionMensajes.innerHTML=resultadoFinal

    sectionReiniciar.style.display = 'block'
    
}

function reiniciarJuego(){
    location.reload()
}


function aleatoreo(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load', iniciarJuego)