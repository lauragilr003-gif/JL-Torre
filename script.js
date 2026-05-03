const power = document.getElementById('btn-power');
const perilla = document.getElementById('perilla');
const aguja = document.getElementById('aguja-roja');
const mhzDisp = document.getElementById('mhz');

const audioCambio = document.getElementById('snd-cambio');
const audioFinal = document.getElementById('snd-final');

let encendido = false;

audioCambio.volume = 0.9;
audioFinal.volume = 1.0;

power.addEventListener('click', () => {
    encendido = !encendido;
    power.classList.toggle('on');
    
    if (!encendido) {
        audioCambio.pause();
        audioFinal.pause();
        audioFinal.currentTime = 0;
    }
});

perilla.addEventListener('input', () => {
    if (!encendido) return;
    
    let val = perilla.value;
    let mhz = (88.0 + (val * 0.2)).toFixed(1);
    mhzDisp.innerText = mhz;
    
    // ARREGLO DEL SLIDER: Ahora la aguja se mueve exactamente del 0% al 100% 
    // del contenedor interno, sin importar el valor.
    aguja.style.left = val + "%";

    // Efecto de sintonía cada vez que hay movimiento
    audioCambio.currentTime = 0; 
    audioCambio.play().catch(e => console.log("Error de audio: ", e));

    // Sintonía JL Torres
    if (parseFloat(mhz) === 99.8) {
        audioCambio.pause();
        audioFinal.play();
    } else {
        if (!audioFinal.paused) { 
            audioFinal.pause(); 
            audioFinal.currentTime = 0; 
        }
    }
});
