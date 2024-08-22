import strformatter from "./strformatter.js"
let init = false
/** @param {([string, string, string])[]} arr  */
export default function (arr) {
    if (init) {
        console.info("This function is only disposable ONCE. So you can't trigger it again. You can see the source code also from the browser's console lmao.")
        return
    }
    let active = true
    const nav = document.createElement("div")
    nav.classList.add("navigation")
    const player = document.createElement("div"); player.id = "plctrl"; player.classList.add("player-btn")
    nav.appendChild(player)
    const imgsl = document.createElement("div")
    imgsl.classList.add("image-slider")
    for (const obj of arr) {
        const divcont = document.createElement("div"); divcont.classList.add(`slide`); if (active) divcont.classList.add("active");
        const sbtn = document.createElement("div"); if (active) sbtn.classList.add("active")
        sbtn.classList.add('slider-btn')
        nav.appendChild(sbtn)
        const slidec = document.createElement("div"); slidec.classList.add("slide-text")
        const img = document.createElement("img"); img.alt = ""
        /** @type {URL} */
        let isurl;
        try {
            isurl = new URL(obj[0])
            img.src = obj[0]
            const linksrc = document.createElement("a")
            linksrc.href = obj[0]
            linksrc.innerHTML = `See original image from: ${isurl.hostname}`
            slidec.appendChild(linksrc)
        } catch (_) {
            img.src = `assets/images/${obj[0]}`
        }
        divcont.appendChild(img)
        if (active) slidec.classList.add("active")
        const h2 = document.createElement("h2")
        const p = document.createElement("p")
        h2.innerHTML = obj[1]
        p.innerHTML = strformatter(obj[2])
        slidec.appendChild(h2)
        slidec.appendChild(p)
        divcont.appendChild(slidec)
        imgsl.appendChild(divcont)
        if (active) active = false
    }
    imgsl.appendChild(nav)
    const slidess = document.createElement("section");slidess.id="slider";slidess.classList.add("section-slider")
    slidess.appendChild(imgsl)
    document.body.appendChild(slidess)
    init = true
}