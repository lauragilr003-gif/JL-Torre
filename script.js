const power = document.getElementById('btn-power');
const perilla = document.getElementById('perilla');
const aguja = document.getElementById('aguja-roja');
const mhzDisp = document.getElementById('mhz');

const audioEstatica = document.getElementById('snd-estatica');
const audioCambio = document.getElementById('snd-cambio');
const audioFinal = document.getElementById('snd-final');

let encendido = false;

// Configuración de niveles (Mezcla de audio)
audioEstatica.volume = 0.12; // Estática muy sutil
audioCambio.volume = 0.95;   // Sintonía dominante y fuerte
audioFinal.volume = 1.0;    // Historia al máximo

power.addEventListener('click', () => {
    encendido = !encendido;
    power.classList.toggle('on');
    document.querySelector('.label').innerText = encendido ? "ON" : "OFF";
    
    if (encendido) {
        // Reproducimos estática suave de fondo
        audioEstatica.play().catch(e => console.log("Error cargando estatica.mp3"));
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
    aguja.style.left = (45.4 + (val * 0.33)) + "%";

    // EFECTO DE BÚSQUEDA: Cada movimiento dispara el sonido fuerte de sintonía
    audioCambio.currentTime = 0; 
    audioCambio.play().catch(e => console.log("Error cargando sintonía.mp3"));

    // Lógica de sintonía final en 99.8 MHz
    if (parseFloat(mhz) === 99.8) {
        audioEstatica.pause();
        audioCambio.pause();
        audioFinal.play();
    } else {
        // Si nos salimos de la frecuencia, vuelve la estática de fondo
        if (!audioFinal.paused) { 
            audioFinal.pause(); 
            audioFinal.currentTime = 0; 
        }
        if (audioEstatica.paused) audioEstatica.play();
    }
});
