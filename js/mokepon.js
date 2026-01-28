//Usar disabled para que las mascotan solo puedan atacar con un elemento, probar si funcion

let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3
let resultado

function iniciarJuego(){
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'

    let botonMascotaJugardor = document.getElementById('boton-mascota')
    botonMascotaJugardor.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener('click', ataqueFuego)

    let botonAgua = document.getElementById("boton-agua")
    botonAgua.addEventListener('click', ataqueAgua)

    let botonHierba = document.getElementById("boton-hierba")
    botonHierba.addEventListener('click', ataqueHierba)

    let botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.addEventListener('click', reiniciarJuego)

}

function seleccionarMascotaJugador(){
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex'

    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'

    let imputRatigueya = document.getElementById("ratigueya")
    let imputHipodoge = document.getElementById('hipodoge')
    let imputCapipepo = document.getElementById('capipepo')
    let spanMascota = document.getElementById('mascota-jugador')

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
    let spanMascotaEnemiga = document.getElementById('mascota-pc')
    
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
    let spanVidasJugador = document.getElementById("player-hp")
    let spanVidasPc = document.getElementById("pc-hp")

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
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = 'Tu mascota ataco con ' + ataqueJugador + ', la mascota del enemigo ataco con '+ ataqueEnemigo + ' - ' + resultado

    sectionMensajes.appendChild(parrafo)

}

function mensajeFinal(resultadoFinal){
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoFinal
    sectionMensajes.appendChild(parrafo)

    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.disabled = true

    let botonAgua = document.getElementById("boton-agua")
    botonAgua.disabled = true

    let botonHierba = document.getElementById("boton-hierba")
    botonHierba.disabled = true

    //OJO hay que crear la variable de nuevo ya que son locales, es decir no existen fuera de la funcion previa
    let sectionReiniciar = document.getElementById('reiniciar')
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

// function combate() {
//     if(ataqueEnemigo == ataqueJugador) {
//         crearMensaje("EMPATE")
//     } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
//         crearMensaje("GANASTE")
//     } else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
//         crearMensaje("GANASTE")
//     } else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
//         crearMensaje("GANASTE")
//     } else {
//         crearMensaje("PERDISTE")
//     }
// }

// function crearMensaje(resultado) {
//     let sectionMensajes = document.getElementById('mensajes')
    
//     let parrafo = document.createElement('p')
//     parrafo.innerHTML = 'Tu mascota atacó con ' + ataqueJugador + ', las mascota del enemigo atacó con ' + ataqueEnemigo + '- ' + resultado

//     sectionMensajes.appendChild(parrafo)
// } Forma alternativa que se mostro en el curso, en vez de crear otra variable le añadio un parametro a la funcion de crearMensaje