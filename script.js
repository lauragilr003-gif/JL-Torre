const power = document.getElementById('btn-power');
const perilla = document.getElementById('perilla');
const aguja = document.getElementById('aguja-roja');
const mhzDisp = document.getElementById('mhz');

const audioEstatica = document.getElementById('snd-estatica');
const audioCambio = document.getElementById('snd-cambio');
const audioFinal = document.getElementById('snd-final');

let encendido = false;

// Configuración de niveles de volumen
audioEstatica.volume = 0.15; // Estática suave de fondo
audioCambio.volume = 0.8;   // Sonido de cambio fuerte
audioFinal.volume = 1.0;    // Audio del caso al máximo

power.addEventListener('click', () => {
    encendido = !encendido;
    power.classList.toggle('on');
    document.querySelector('.label').innerText = encendido ? "ON" : "OFF";
    
    if (encendido) {
        audioEstatica.play().catch(e => console.log("Error al cargar audios"));
    } else {
        [audioEstatica, audioCambio, audioFinal].forEach(a => { 
            a.pause(); 
            a.currentTime = 0; 
        });
    }
});

perilla.addEventListener('input', () => {
    if (!encendido) return;
    
    let val = perilla.value;
    let mhz = (88.0 + (val * 0.2)).toFixed(1);
    mhzDisp.innerText = mhz;
    
    // Movimiento de la aguja en el dial horizontal
    aguja.style.left = (45.4 + (val * 0.33)) + "%";

    // Efecto de sintonía sonora
    audioCambio.currentTime = 0;
    audioCambio.play();

    // Sintonía del Caso JL Torres (99.8 MHz)
    if (parseFloat(mhz) === 99.8) {
        audioEstatica.pause();
        if (audioFinal.paused) audioFinal.play();
    } else {
        // Si sale de la frecuencia, detiene la grabación y vuelve la estática
        if (!audioFinal.paused) { 
            audioFinal.pause(); 
            audioFinal.currentTime = 0; 
        }
        if (audioEstatica.paused) audioEstatica.play();
    }
});
