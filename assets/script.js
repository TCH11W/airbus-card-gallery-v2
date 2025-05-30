
const allCards = [
  { name: "A220", rarity: "common" },
  { name: "A320", rarity: "common" },
  { name: "A330", rarity: "common" },
  { name: "A350", rarity: "common" },
  { name: "A380", rarity: "rare" },
  { name: "BelugaXL", rarity: "rare" },
  { name: "A400M", rarity: "epic" },
  { name: "Concorde", rarity: "legendary" }
];

function getUnlocked() {
  const params = new URLSearchParams(window.location.search);
  const urlList = params.getAll("unlocked");
  const stored = JSON.parse(localStorage.getItem("unlockedCards")||"[]");
  const newly = urlList.filter(n=>!stored.includes(n));
  newly.forEach(n=>alert(`Congratulations! You have unlocked the ${n}`));
  const combined = Array.from(new Set([...stored,...urlList]));
  localStorage.setItem("unlockedCards", JSON.stringify(combined));
  return { all:combined, newly:newly };
}

function createCard(card, unlockedInfo) {
  const is = unlockedInfo.all.includes(card.name);
  const div = document.createElement("div");
  div.classList.add("card-frame", is?"unlocked":"locked", card.rarity);
  if(is){
    const img = document.createElement("img");
    img.src=`assets/cards/${card.name}.png`;
    img.classList.add("card-img");
    div.appendChild(img);
    if(unlockedInfo.newly.includes(card.name)){
      window.requestAnimationFrame(()=>{
        div.classList.add("shine");
        setTimeout(()=>div.classList.remove("shine"),1000);
      });
    }
    div.addEventListener("click",()=>{
      div.classList.remove("shine");
      void div.offsetWidth;
      div.classList.add("shine");
      setTimeout(()=>div.classList.remove("shine"),1000);
    });
  } else {
    const lock = document.createElement("img");
    lock.src="assets/icons/lock.png";
    lock.classList.add("lock-icon");
    div.appendChild(lock);
  }
  return div;
}

function render(){
  const g=document.querySelector(".gallery");
  g.innerHTML="";
  const ui=getUnlocked();
  allCards.forEach(c=>g.appendChild(createCard(c,ui)));
}

window.addEventListener("DOMContentLoaded",render);
