import addslide from "./assets/addslide.js";
import addnotice from "./assets/addnotice.js";
import imglist from "./assets/images/imglist.js";
import bio from "./assets/bio.js";


/** 
 * some utilities 
 * @param {HTMLElement} elem
 * @param {string[]} arr
 */
const addClass = function(elem, arr){
    for (const each of arr) {
    elem.classList.add(each)
}
}
addnotice()
/** Heading */

const h = document.createElement("h1")
h.innerHTML = "cupglassdev"
const headingc = document.createElement("div")
headingc.classList.add("headingc")
addClass(h, ["head", "aja", "yagesya"])
headingc.appendChild(h)
document.body.appendChild(headingc)


/** Slides */

addslide(imglist)
const slides = document.querySelectorAll('.slide')
const buttons = document.querySelectorAll(".slider-btn")
let currentSlide = 0;
let enablePlayer;
if (sessionStorage.getItem("cgd_enableplayer") === null) {
    sessionStorage.setItem("cgd_enableplayer", "true")
}
enablePlayer = sessionStorage.getItem("cgd_enableplayer")==="true"
console.log(`Hey hacky guy! \nThis website uses sessionstorage: cgd_enableplayer for slide animation purposes\nthe value type is boolean: ${enablePlayer}`)
let player; let repeater;
const repeaterfn = function () {
    if (!enablePlayer && plctrlDoneClicked) return
    player = setTimeout(
        function () {
            autosl()
            repeater()
        }, 5000)
}
const autosl = function () {
    manualNav(currentSlide)
    currentSlide++
    if (slides.length == currentSlide) currentSlide = 0
    if (currentSlide >= slides.length) return
}
const repeat = function () {
    repeater = repeaterfn
    repeater()
}
const manualNav = function (manual, resetPlayer = false) {
    if (resetPlayer && enablePlayer) player = clearTimeout(player)
    let activeS = document.querySelectorAll(".slide.active");
    [...activeS].forEach((activeSlide) => {
        if (activeSlide.classList.contains("active")) activeSlide.classList.remove("active")
    })
    let activeT = document.querySelectorAll(".slide-text.active");
    [...activeT].forEach((each) => {
        if (each.classList.contains("active")) each.classList.remove("active")
    })
    const s = slides[manual];
    [...s.children].forEach((el) => {
        if (!el.classList.contains("slide-text")) return;
        el.classList.add("active")
    })
    buttons.forEach((el)=>{if (el.classList.contains("active")) el.classList.remove("active")})
    buttons[manual].classList.add("active")
    s.classList.add("active")
    if (resetPlayer && enablePlayer) repeat()
}
buttons.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
        manualNav(i, true);
        currentSlide = i
    })
})
const playerControl = document.getElementById("plctrl")
if (!enablePlayer) playerControl.classList.add("stop")
playerControl.removeAttribute("id")
let plctrlDoneClicked = false
let plctrlClTgl = true
const runplctrl = function () {
    if (!plctrlClTgl) return
    if (plctrlDoneClicked) {
        enablePlayer = !enablePlayer
        sessionStorage.setItem("cgd_enableplayer", enablePlayer?"true":"false")
    }
    if (enablePlayer) {
        if (playerControl.classList.contains("stop") && plctrlClTgl) playerControl.classList.remove("stop")
        repeat()
    } else {
        if (!playerControl.classList.contains("stop") && plctrlClTgl) playerControl.classList.add("stop")
        player = clearTimeout(player)
    }
    plctrlClTgl = false
    if (!plctrlDoneClicked) plctrlDoneClicked = true
}
playerControl.addEventListener("click", function () {
    plctrlClTgl = true
    runplctrl()
})
runplctrl()




/** some custom elements that idk how to explain */

/** 
 * for 'IM JUST A {text} DEV' 
 */

const chngtxtsection = document.createElement("section");chngtxtsection.id="imjusta";addClass(chngtxtsection, ["imjusta", "section"])
const chngtxtdiv = document.createElement("div");addClass(chngtxtdiv, ["imjusta", "content"])
const chngtxtlist = document.createElement("div");addClass(chngtxtlist, ["imjusta", "list"])
const imjusta1 = document.createElement("p");const imjustadev = document.createElement("p")
addClass(imjusta1, ["imjusta", "text", "only"]);addClass(imjustadev, ["imjusta", "text", "only"])
imjusta1.innerHTML="im just a ";imjustadev.innerHTML = " dev"
chngtxtdiv.appendChild(imjusta1);
for (const each of bio.justa) {
    const txt = document.createElement("p")
    addClass(txt, ["imjusta", "text", "spot"])
    txt.innerHTML = each.toUpperCase()
    chngtxtlist.appendChild(txt)
}
let chngtxtidx = 0
let chngtxtrt;
chngtxtdiv.appendChild(chngtxtlist)
chngtxtdiv.appendChild(imjustadev)
chngtxtsection.appendChild(chngtxtdiv)
document.body.appendChild(chngtxtsection)
let txteach = document.querySelectorAll(".imjusta.text.spot")
txteach[0].classList.add("active")
const runtxtchng = ()=>{
chngtxtrt = setTimeout(function () {
    txteach.forEach((el)=>{if (el.classList.contains("active")) el.classList.remove("active")})
    const el1 = txteach[0];const el2 = txteach[1]
    const cb = ()=>{
        el1.removeEventListener("transitionend", cb)
        const text = el1.innerHTML
        el1.remove()
        const newEl = document.createElement("p")
        newEl.innerHTML = text
        addClass(newEl, ["imjusta", "text", "spot"])
        chngtxtlist.appendChild(newEl)
        txteach = document.querySelectorAll(".imjusta.text.spot")
        runtxtchng()
    }
    el1.addEventListener("transitionend", cb)
    el1.classList.remove("active")
    el1.classList.add("end")
    el2.classList.add("active")
    chngtxtidx++
    if (txteach.length == chngtxtidx) chngtxtidx = 0
    if (chngtxtidx >= txteach.length) return
}, 4000)
}
runtxtchng()