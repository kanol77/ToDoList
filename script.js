const input = document.querySelector('.data')
const button = document.querySelector('.push')
const list = document.querySelector('.out')
const Delete = document.querySelector('.del')
const out = document.querySelector('.out')
const foot = document.querySelector('footer')
let OList = document.querySelector('.OList')

button.addEventListener('click', () => {
    if (input.value !== '' && input.value !==' ') {
        let newLi = document.createElement("li")
        let newText = document.createTextNode(input.value)
        newLi.appendChild(newText)
        let y = [...document.querySelectorAll('.temp')]
        y.forEach((div) => {
            div.innerHTML = ''
        })
        OList.appendChild(newLi)
        let temporaries = document.querySelectorAll('.temp')
        for (let i = 0; i < temporaries.length; i++) {
            temporaries[i].remove();
        }
    }
    input.value = ''
})

out.addEventListener("click", e => {
    let tgt = e.target
    if(tgt.tagName.toUpperCase()=="LI"){
        tgt.parentNode.removeChild(tgt);
    }
    if(OList.innerHTML == '' || OList.innerHTML == ' '){
        window.location.reload()
        localStorage.clear()
    }
})

input.addEventListener('keyup', e => { 
    if(e.shiftKey) return
    if(e.keyCode === 13 && input.value == false){
            input.value = ''
            alert("Empty Quest Field!")
            return
    } 
    if(e.keyCode === 13){
        e.preventDefault();
        button.click()
    }
})

Delete.addEventListener('click', () => {
    if (out.contains(document.querySelector('.temp'))) return
    OList.innerHTML = ''
    let x = document.createElement('div')
    x.classList.add('temp')
    let text = document.createTextNode('List is empty!')
    x.appendChild(text)
    out.appendChild(x)
    localStorage.clear()
})

window.addEventListener("beforeunload", () => {
    if (out.contains(document.querySelector('.temp'))) return
    localStorage.setItem('quest', out.innerHTML)
})

window.addEventListener('keyup', e => {
    if(e.keyCode === 46){
        e.preventDefault()
        Delete.click()
    }
})

function load() {
    let loadedStroageString = localStorage.getItem('quest')

    if (!loadedStroageString) return

    let text1 = document.createTextNode(loadedStroageString).textContent

    out.innerHTML = ''
    out.innerHTML = text1
    OList = document.querySelector('.OList')
}