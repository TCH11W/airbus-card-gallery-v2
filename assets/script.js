
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

function getUnlockedCards() {
  const params = new URLSearchParams(window.location.search);
  const urlUnlocked = params.getAll("unlocked");
  const stored = JSON.parse(localStorage.getItem("unlockedCards") || "[]");
  const newlyUnlocked = urlUnlocked.filter(name => !stored.includes(name));
  newlyUnlocked.forEach(name => {
    alert(`Congratulations! You have unlocked the ${name}`);
  });
  const combined = Array.from(new Set([...stored, ...urlUnlocked]));
  localStorage.setItem("unlockedCards", JSON.stringify(combined));
  return { all: combined, newly: newlyUnlocked };
}

function createCardElem(card, unlockedInfo) {
  const isUnlocked = unlockedInfo.all.includes(card.name);
  const div = document.createElement("div");
  div.classList.add("card-frame", isUnlocked ? "unlocked" : "locked", card.rarity);
  if (isUnlocked) {
    const img = document.createElement("img");
    img.src = `assets/cards/${card.name}.png`;
    img.alt = `${card.name} Card`;
    img.classList.add("card-img");
    div.appendChild(img);
    if (unlockedInfo.newly.includes(card.name)) {
    requestAnimationFrame(() => {
      div.classList.add("shine");
      setTimeout(() => div.classList.remove("shine"), 1500);
    });
      div.classList.add("shine");
      setTimeout(() => div.classList.remove("shine"), 1500);
    }
    div.addEventListener('click', () => {
      div.classList.remove('shine');
      void div.offsetWidth;
      div.classList.add('shine');
      setTimeout(() => div.classList.remove('shine'), 1500);
    });
  } else {
    const lock = document.createElement("img");
    lock.src = "assets/icons/lock.png";
    lock.alt = "Locked";
    lock.classList.add("lock-icon");
    div.appendChild(lock);
  }
  return div;
}

function renderGallery() {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  const unlockedInfo = getUnlockedCards();
  allCards.forEach(card => {
    const elem = createCardElem(card, unlockedInfo);
    gallery.appendChild(elem);
  });
}

window.addEventListener("DOMContentLoaded", renderGallery);
