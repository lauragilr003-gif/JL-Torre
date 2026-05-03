const power = document.getElementById('btn-power');
const perilla = document.getElementById('perilla');
const aguja = document.getElementById('aguja-roja');
const mhzDisp = document.getElementById('mhz');

const audioCambio = document.getElementById('snd-cambio');
const audioFinal = document.getElementById('snd-final');

let encendido = false;

// AJUSTE DE VOLUMEN PROFESIONAL
audioCambio.volume = 0.95; // Sonido de sintonía fuerte
audioFinal.volume = 1.0;    // Audio final al máximo

power.addEventListener('click', () => {
    encendido = !encendido;
    power.classList.toggle('on');
    document.querySelector('.label').innerText = encendido ? "ON" : "OFF";
    
    if (!encendido) {
        // Al apagar, cortamos todo el sonido inmediatamente
        audioCambio.pause();
        audioFinal.pause();
        audioFinal.currentTime = 0;
    }
});

perilla.addEventListener('input', () => {
    if (!encendido) return;
    
    let val = perilla.value;
    // Calculamos la frecuencia de 88.0 a 108.0 MHz
    let mhz = (88.0 + (val * 0.2)).toFixed(1);
    mhzDisp.innerText = mhz;
    
    // Movemos la aguja (ajustado a tus medidas de diseño)
    aguja.style.left = (45.4 + (val * 0.33)) + "%";

    // EFECTO DE BÚSQUEDA:
    // Reiniciamos el audio de sintonía cada vez que la perilla se mueve.
    // Esto genera el efecto de pasar por múltiples estaciones.
    audioCambio.currentTime = 0; 
    audioCambio.play().catch(e => console.log("Error: Verifica el nombre 'sintonía.mp3'"));

    // LÓGICA DE SINTONÍA FINAL (99.8 MHz)
    if (parseFloat(mhz) === 99.8) {
        audioCambio.pause();
        audioFinal.play();
    } else {
        // Si el usuario se sale de la frecuencia, la historia se detiene
        if (!audioFinal.paused) { 
            audioFinal.pause(); 
            audioFinal.currentTime = 0; 
        }
    }
});
