const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugardor = document.getElementById('boton-mascota')
const botonFuego = document.getElementById("boton-fuego")
const botonAgua = document.getElementById("boton-agua")
const botonHierba = document.getElementById("boton-hierba")
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const imputRatigueya = document.getElementById("ratigueya")
const imputHipodoge = document.getElementById('hipodoge')
const imputCapipepo = document.getElementById('capipepo')
const spanMascota = document.getElementById('mascota-jugador')

const spanMascotaEnemiga = document.getElementById('mascota-pc')
const spanVidasJugador = document.getElementById("player-hp")
const spanVidasPc = document.getElementById("pc-hp")

const sectionMensajes = document.getElementById('resultado-combate')
const ataqueDelJugador = document.getElementById('ataque-del-juagador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')

let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3
let resultado

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    botonMascotaJugardor.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonHierba.addEventListener('click', ataqueHierba)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionSeleccionarMascota.style.display = 'none'
    if(imputRatigueya.checked){
        spanMascota.innerHTML = "Ratigueya"
    }else if(imputHipodoge.checked){
        spanMascota.innerHTML = "Hipodoge"
    }else if(imputCapipepo.checked){
        spanMascota.innerHTML = "Capipepo"
    }else{
        alert("No has seleccionado ninguna mascota")
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo(){
    let mascotaEnemiga = aleatorio(1, 3)

    if(mascotaEnemiga == 1){
        spanMascotaEnemiga.innerHTML = "Ratigueya"
    }else if (mascotaEnemiga == 2) {
        spanMascotaEnemiga.innerHTML = "Hipodoge"
    } else {
        spanMascotaEnemiga.innerHTML = "Capipepo"
    }
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