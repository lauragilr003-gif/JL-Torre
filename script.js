const power = document.getElementById('btn-power');
const perilla = document.getElementById('perilla');
const aguja = document.getElementById('aguja-roja');
const mhzDisp = document.getElementById('mhz');

const audioEstatica = document.getElementById('snd-estatica');
const audioCambio = document.getElementById('snd-cambio');
const audioFinal = document.getElementById('snd-final');

let encendido = false;

// Al hacer clic, forzamos la carga para evitar el bloqueo de Mac/Safari
power.addEventListener('click', () => {
    encendido = !encendido;
    power.classList.toggle('on');
    document.querySelector('.label').innerText = encendido ? "ON" : "OFF";
    
    if (encendido) {
        audioEstatica.load(); // Forzar carga
        audioEstatica.play().catch(err => alert("Error: No se encontró el audio 'estatica.mp3'"));
    } else {
        [audioEstatica, audioCambio, audioFinal].forEach(a => { a.pause(); a.currentTime = 0; });
    }
});

perilla.addEventListener('input', () => {
    if (!encendido) return;
    
    let val = perilla.value;
    let mhz = (88.0 + (val * 0.2)).toFixed(1);
    mhzDisp.innerText = mhz;
    
    // Movimiento aguja: aseguramos que el estilo se aplique
    aguja.style.left = (45.4 + (val * 0.33)) + "%";

    if (audioCambio.paused) audioCambio.play();

    if (parseFloat(mhz) === 99.8) {
        audioEstatica.pause();
        audioFinal.play();
    } else {
        if (!audioFinal.paused) { audioFinal.pause(); audioFinal.currentTime = 0; }
        if (audioEstatica.paused) audioEstatica.play();
    }
});
