const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Bom Dia chefe...");
    } else if (hour >= 12 && hour < 17) {
        speak("Boa tarde Mestre...");
    } else {
        speak("Boa noite senhor...");
    }
}

window.addEventListener('carregar', () => {
    speak("Inicializando JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Audição...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('ei') || message.includes('olá')) {
        speak("Olá senhor, em que posso ajudá-lo?");
    } else if (message.includes("abra o Google")) {
        window.open("https://google.com", "_blank");
        speak("Abrindo o Google...");
    } else if (message.includes("abra o youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Abrindo o YouTube...");
    } else if (message.includes("abrir Facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Abrindo o Facebook...");
    } else if (message.includes('o que é') || message.includes('quem é') || message.includes('o que são')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Isto é o que encontrei na internet sobre " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "Isto é o que encontrei na Wikipedia sobre " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "A hora atual é " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "A data de hoje é " + date;
        speak(finalText);
    } else if (message.includes('calculadora')) {
        window.open('Calculadora:///');
        const finalText = "Abra a calculadora";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Encontrei algumas informações para " + message + " no Google";
        speak(finalText);
    }
}