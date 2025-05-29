
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
  // Determine newly unlocked cards
  const newlyUnlocked = urlUnlocked.filter(name => !stored.includes(name));
  // Show a custom alert for each newly unlocked card
  newlyUnlocked.forEach(name => {
    alert(`Congratulations! You have unlocked the ${name}`);
  });
  // Combine and store all unlocked cards
  const combined = Array.from(new Set([...stored, ...urlUnlocked]));
  localStorage.setItem("unlockedCards", JSON.stringify(combined));
  return combined;
}

function createCardElem(card, isUnlocked) {
  const div = document.createElement("div");
  div.classList.add("card-frame", isUnlocked ? "unlocked" : "locked", card.rarity);
  if (isUnlocked) {
    const img = document.createElement("img");
    img.src = `assets/cards/${card.name}.png`;
    img.alt = `${card.name} Card`;
    img.classList.add("card-img");
    div.appendChild(img);
    // Shine on click
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
  const unlocked = getUnlockedCards();
  allCards.forEach(card => {
    const isUnlocked = unlocked.includes(card.name);
    const elem = createCardElem(card, isUnlocked);
    gallery.appendChild(elem);
  });
}

window.addEventListener("DOMContentLoaded", renderGallery);
