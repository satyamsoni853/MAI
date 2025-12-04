document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Render traders from JSON
  tradersData.forEach(trader => {
    const card = document.createElement('div');
    card.className = `trader-card ${trader.position}`;

    card.innerHTML = `
      <img src="../Fifth Section/${trader.img}" alt="${trader.name}">
      <div class="overlay">
        <h3>${trader.name}</h3>
        <p>${trader.location}</p>
      </div>
    `;

    track.appendChild(card);
  });

  // === Carousel Logic ===
  const cards = document.querySelectorAll('.trader-card');
  const totalCards = cards.length;
  const visibleCards = 5;
  let currentIndex = 0;

  const getCardWidth = () => cards[0] ? cards[0].offsetWidth + 32 : 322;

  const updateButtons = () => {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalCards - visibleCards;
  };

  const slideTo = (index) => {
    const cardWidth = getCardWidth();
    const offset = -index * cardWidth;
    track.style.transform = `translateX(${offset}px)`;
    currentIndex = index;
    updateButtons();
  };

  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalCards - visibleCards) {
      slideTo(currentIndex + 1);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      slideTo(currentIndex - 1);
    }
  });

  window.addEventListener('resize', () => {
    slideTo(currentIndex);
  });

  // Initial setup
  updateButtons();
});