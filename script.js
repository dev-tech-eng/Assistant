let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")
if ('speechSynthesis' in window) {
    console.log("Speech Synthesis API is supported.");
} else {
    console.error("Speech Synthesis API is not supported in this browser.");
}
function listVoices() {
    let voices = window.speechSynthesis.getVoices();
    console.log("Available voices:", voices);
}

window.speechSynthesis.onvoiceschanged = listVoices;


function speak(text) {
    // Clear any existing utterances
    window.speechSynthesis.cancel();

    // Create the speech utterance
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US"; // Adjust language as needed

    // Get available voices and choose a female voice
    let voices = window.speechSynthesis.getVoices();
    let femaleVoice = voices.find(voice => voice.name.includes("Female") || voice.name.includes("Samantha") || voice.name.includes("Google UK English Female"));

    // Set the female voice if found
    if (femaleVoice) {
        text_speak.voice = femaleVoice;
    } else {
        console.warn("Female voice not found. Using default voice.");
    }

    // Speak the text
    window.speechSynthesis.speak(text_speak);
}

// Load voices and speak
window.speechSynthesis.onvoiceschanged = () => speak("Hello, how can I assist you?");


function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning bro")
    }
    else if(hours>=12 && hours <16){
        speak("Good afternoon bro")
    }else{
        speak("Good Evening bro")
    }
}
//  window.addEventListener('load',()=>{
//     wishMe()
// })
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition 
let recognition =new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
   takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    voice.style.display="block"
    btn.style.display="none"
})
function takeCommand(message){
   voice.style.display="none"
    btn.style.display="flex"
    if(message.includes("hello")||message.includes("hey")){
        speak("hello bro,what can i help you?")
    }
    else if(message.includes("who are you")){
        speak("i am virtual assistant ,created by Devraj bro")
    }else if(message.includes("open youtube")){
        speak("opening youtube...")
        window.open("https://youtube.com/","_blank")
    }
    else if(message.includes("open google")){
        speak("opening google...")
        window.open("https://google.com/","_blank")
    }
    else if(message.includes("open facebook")){
        speak("opening facebook...")
        window.open("https://facebook.com/","_blank")
    }
    else if(message.includes("open instagram")){
        speak("opening instagram...")
        window.open("https://instagram.com/","_blank")
    }
    else if(message.includes("open calculator")){
        speak("opening calculator..")
        window.open("calculator://")
    }
    else if(message.includes("open whatsapp")){
        speak("opening whatsapp..")
        window.open("whatsapp://")
    }
    else if(message.includes("time")){
      let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
      speak(time)
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
      }
    else{
        let finalText="this is what i found on internet regarding" + message.replace("ava","") || message.replace("ava","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("ava","")}`,"_blank")
    }
}