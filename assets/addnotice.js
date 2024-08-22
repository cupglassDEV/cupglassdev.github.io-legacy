import bio from "./bio.js";
class append {
  /** @param {HTMLElement} parent */
  constructor(parent) {
    this.parent = parent;
  }
  /** @param {HTMLElement[]} e */
  init(...e) {
    for (const each of e) {
      this.parent.appendChild(each);
    }
  }
}
function addnotice() {
  const m = document.createElement("section");
  m.id = "notice";
  const c = document.createElement("p");
  c.innerHTML = bio.notice.livevidCopyright;
  c.classList.add("child");
  const h4 = document.createElement("h4");
  if (bio.notice.important) {
    h4.innerHTML = "this is important..";
    h4.classList.add("child");
  }
  const h = document.createElement("h1");
  h.innerHTML = bio.notice.title;
  h.classList.add("child");
  const desc = document.createElement("p");
  desc.innerHTML = bio.notice.description;
  desc.classList.add("child");
  const a = new append(m);
  if (bio.notice.important) a.init(h4);
  if (typeof bio.notice.livevid !== "undefined") {
    m.innerHTML += bio.notice.livevid;
    a.init(c);
  }
  a.init(h);
  a.init(desc);
  let firstInit = true;
  let isurl;
  for (const obj of bio.notice.links) {
    if (firstInit) {
      const p = document.createElement("p");
      p.innerHTML = "Read More at:";
      p.classList.add("child");
      a.init(p);
      firstInit = false;
    }
    try {
      isurl = new URL(obj);
      const linksrc = document.createElement("a");
      linksrc.href = obj;
      linksrc.innerHTML = isurl.hostname;
      linksrc.classList.add("readmorelinks");
      a.init(linksrc);
    } catch (_) {
      const linksrc = document.createElement("a");
      linksrc.classList.add("readmorelinks");
      linksrc.innerHTML = "[invalid link]";
      a.init(linksrc);
    }
  }
  new append(document.body).init(m);
}
export default addnotice;
