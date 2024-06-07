const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const stopButton = document.getElementById('stop-button')
const speedInput = document.getElementById('speed')
const textInput = document.getElementById('text')

let currentCharacter


speechSynthesis.cancel()
const utterance = new SpeechSynthesisUtterance()

utterance.addEventListener('end' , ()=>{
    textInput.disabled = false
})

utterance.addEventListener('boundary' , e =>{
    utterance.rate = speedInput.value || 1
    currentCharacter = e.charIndex  
})

playButton.addEventListener('click' , ()=>{
    playText(textInput.value)
})

speedInput.addEventListener('input', () => {
    stopText()
    playText(utterance.text.substring(currentCharacter))
})

pauseButton.addEventListener('click' , () => pauseText() )

stopButton.addEventListener('click' , ()=> stopText())

function playText(text){
    if(speechSynthesis.paused && speechSynthesis.speaking){ 
        speechSynthesis.resume()
        document.querySelector('body').style.backgroundColor = 'green'
        return
    }
    if(speechSynthesis.speaking) return 

    
    
    utterance.text = text
    speechSynthesis.speak(utterance)
    textInput.disabled = true
}



function pauseText(){
    if(speechSynthesis.speaking) speechSynthesis.pause()    
}
function stopText(){
    speechSynthesis.resume()
    speechSynthesis.cancel()
}
