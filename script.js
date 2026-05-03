const power = document.getElementById('btn-power');
const perilla = document.getElementById('perilla');
const aguja = document.getElementById('aguja-roja');
const mhzDisp = document.getElementById('mhz');

const audioEstatica = document.getElementById('snd-estatica');
const audioCambio = document.getElementById('snd-cambio');
const audioFinal = document.getElementById('snd-final');

let encendido = false;

// Niveles de audio solicitados
audioEstatica.volume = 0.1; 
audioCambio.volume = 0.9;
audioFinal.volume = 1.0;

power.addEventListener('click', () => {
    encendido = !encendido;
    power.classList.toggle('on');
    
    if (encendido) {
        audioEstatica.play();
    } else {
        [audioEstatica, audioCambio, audioFinal].forEach(a => { a.pause(); a.currentTime = 0; });
    }
});

perilla.addEventListener('input', () => {
    if (!encendido) return;
    
    let val = perilla.value;
    let mhz = (88.0 + (val * 0.2)).toFixed(1);
    mhzDisp.innerText = mhz;
    
    // Rotar visualmente el knob
    perilla.style.transform = `rotate(${val * 2.4}deg)`;
    
    // Mover aguja
    aguja.style.left = (45.4 + (val * 0.33)) + "%";

    // Efecto sintonía fuerte al mover
    audioCambio.currentTime = 0;
    audioCambio.play();

    if (parseFloat(mhz) === 99.8) {
        audioEstatica.pause();
        audioFinal.play();
    } else {
        if (!audioFinal.paused) { audioFinal.pause(); audioFinal.currentTime = 0; }
        if (audioEstatica.paused) audioEstatica.play();
    }
});
