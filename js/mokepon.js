const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugardor = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascota = document.getElementById('mascota-jugador')

const spanMascotaEnemiga = document.getElementById('mascota-pc')
const spanVidasJugador = document.getElementById("player-hp")
const spanVidasPc = document.getElementById("pc-hp")

const sectionMensajes = document.getElementById('resultado-combate')
const ataqueDelJugador = document.getElementById('ataque-del-juagador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById("contenedorAtaques")

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let ataquesMokepon
let imputRatigueya 
let imputHipodoge 
let imputCapipepo 
let mascotaJugador
let botonFuego
let botonAgua 
let botonHierba
let vidasJugador = 3
let vidasEnemigo = 3
let resultado

class Mokepon {
    constructor(nombre, foto, vidas){
        this.nombre = nombre
        this.foto = foto
        this.vidas = vidas
        this.ataques = []
    }
}

let ratigueya = new Mokepon("Ratigueya", "./assets/ratigueya.png", 3)
let hipodoge = new Mokepon("Hipodoge", "./assets/hipodoge.png", 5)
let capipepo = new Mokepon("Capipepo", "./assets/capipepo.png", 8)

ratigueya.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-hierba"}
)

hipodoge.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-hierba"}
)

capipepo.ataques.push(
    {nombre: "🌱", id: "boton-hierba"},
    {nombre: "🌱", id: "boton-hierba"},
    {nombre: "🌱", id: "boton-hierba"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"}
)

mokepones.push(ratigueya, hipodoge, capipepo)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        imputRatigueya = document.getElementById("Ratigueya")
        imputHipodoge = document.getElementById('Hipodoge')
        imputCapipepo = document.getElementById('Capipepo')
    })

    sectionReiniciar.style.display = 'none'
    botonMascotaJugardor.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionSeleccionarMascota.style.display = 'none'
    if(imputRatigueya.checked){
        spanMascota.innerHTML = imputRatigueya.id
        mascotaJugador= imputRatigueya.id
    }else if(imputHipodoge.checked){
        spanMascota.innerHTML = imputHipodoge.id
        mascotaJugador = imputHipodoge.id
    }else if(imputCapipepo.checked){
        spanMascota.innerHTML = imputCapipepo.id
        mascotaJugador = imputCapipepo.id
    }else{
        alert("No has seleccionado ninguna mascota")
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAyaques(ataques)
}

function mostrarAyaques(ataques){
    ataques.forEach(ataque => {
        ataquesMokepon = `
        <button id=${ataque.id} class="botones-ataque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    });
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonHierba = document.getElementById("boton-hierba")

    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonHierba.addEventListener('click', ataqueHierba)
}

function seleccionarMascotaEnemigo(){
    let mascotaEnemiga = aleatorio(0, mokepones.length - 1)
    spanMascotaEnemiga.innerHTML = mokepones[mascotaEnemiga].nombre
}

function ataqueFuego(){
    ataqueJugador = "Lanzallamas!"
    ataqueAleatorioEnemigo()
}

function ataqueAgua(){
    ataqueJugador = "Balas de agua!"
    ataqueAleatorioEnemigo()
}

function ataqueHierba(){
    ataqueJugador = "Hojas cortantes!"
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1, 3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "Lanzallamas!"
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "Balas de agua!"
    } else {
        ataqueEnemigo ="Hojas cortantes!"
    }

    kombat()
    
}

function kombat() {
    if (ataqueJugador == ataqueEnemigo) {
      resultado = "EMPATE"
      crearMensaje()
    } else if (ataqueJugador == "Lanzallamas!" && ataqueEnemigo == "Hojas cortantes!") {
      resultado = "GANASTE"
      crearMensaje()
      vidasEnemigo--
      spanVidasPc.innerHTML = vidasEnemigo
    } else if (ataqueJugador == "Balas de agua!" && ataqueEnemigo == "Lanzallamas!") {
      resultado = "GANASTE"
      crearMensaje()
      vidasEnemigo--
      spanVidasPc.innerHTML = vidasEnemigo
    } else if (ataqueJugador == "Hojas cortantes!" && ataqueEnemigo == "Balas de agua!") {
      resultado = "GANASTE"
      crearMensaje()
      vidasEnemigo--
      spanVidasPc.innerHTML = vidasEnemigo
    } else {
        resultado = "PERDISTE"
        crearMensaje()
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    revisarVidas()

}

function revisarVidas(){
    if (vidasEnemigo ==0) {
        mensajeFinal("Felicidades Ganastes🎉")
    } else if(vidasJugador == 0){
        mensajeFinal("Perdistes ☹- Mejor Suerte la Proxima")

    }

}

function crearMensaje(){
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo
    
    ataqueDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function mensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonHierba.disabled = true
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max-min+1) + min)
}

window.addEventListener('load', iniciarJuego) 
//otra manera de llamar al script después de que se cargue todo el HTML
//la función iniciarJuego se carga cuando ya todo el contenido está cargado.