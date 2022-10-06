const button = document.querySelector('button');
const text = document.querySelector('p');

const recognition = createRecognition();
let listening = false;

button.addEventListener('click', e => {    
    if(!recognition) return;

    listening ? recognition.stop() : recognition.start();

    button.innerHTML = listening ? 'Aperte para falar <img src="/src/img/microphone.png" alt="">' : 'Parar de falar <img src="/src/img/microphone.png" alt="">'

    button.classList.toggle('active');
    button.classList.toggle('deactive');
    
})

function createRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null

    if(!recognition) {
        text.innerHTML ="Spreech Recognition is not found!"
        return null
    }

    recognition.lang = "pt_BR"

    recognition.onstart = () =>  listening = true
    recognition.onend = () => listening = false
    recognition.onerror = (e) => alert(e)
    recognition.onresult = (e) => text.innerHTML = e.results[0][0].transcript

    return recognition
}