    // Mobile menu toggle
const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  }); 
  // Scroll up/down navbar show/hide
  let lastScrollTop = 0;
  const header = document.getElementById('main-header');

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scroll Down
      header.classList.add("hide-navbar");
    } else {
      // Scroll Up
      header.classList.remove("hide-navbar");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }); 
// Timmer Section
//
// // Set the target event date and time (change as needed)
  const eventDate = new Date("2025-08-10T09:00:00").getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      document.getElementById("event-timer").innerHTML = `
        <div class="event-timer-container">
          <h1 class="event-title">🎉 The Event is Live Now!</h1>
        </div>`;
      return;
    }

    // Calculate time parts
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the HTML
    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  };

  // Initial call and repeat every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  document.querySelectorAll(".club-card").forEach((card) => {
    const video = card.querySelector("video");

    card.addEventListener("mouseenter", () => {
      video.play();
    });

    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
const video = document.getElementById('background-video');
  video.addEventListener('canplaythrough', () => {
    video.style.opacity = '1';
  });



// the slider for clubs

document.addEventListener("DOMContentLoaded", () => {
  const clubsGrid = document.getElementById("clubsGrid");

  // Clone club cards for infinite scrolling
  function cloneCards() {
    const cards = [...clubsGrid.children];
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      clubsGrid.appendChild(clone);
    });
  }

  let isDragging = false;
  let startX;
  let scrollLeft;
  let animationFrameId;

  function autoScroll() {
    clubsGrid.scrollLeft += 2;
    if (clubsGrid.scrollLeft >= clubsGrid.scrollWidth / 2) {
      clubsGrid.scrollLeft = 0;
    }
    animationFrameId = requestAnimationFrame(autoScroll);
  }

  function checkLoop() {
    if (clubsGrid.scrollLeft >= clubsGrid.scrollWidth / 2) {
      clubsGrid.scrollLeft -= clubsGrid.scrollWidth / 2;
    } else if (clubsGrid.scrollLeft <= 0) {
      clubsGrid.scrollLeft += clubsGrid.scrollWidth / 2;
    }
  }

  // Snap function — scroll to nearest card smoothly
  function snapToNearestCard() {
    const card = clubsGrid.querySelector(".club-card");
    const style = getComputedStyle(clubsGrid);
    const gap = parseFloat(style.gap) || 0;
    const cardWidth = card.offsetWidth + gap;

    const scrollPos = clubsGrid.scrollLeft;
    const index = Math.round(scrollPos / cardWidth);
    const targetPos = index * cardWidth;

    return new Promise((resolve) => {
      clubsGrid.scrollTo({
        left: targetPos,
        behavior: "smooth",
      });

      // Wait for the smooth scroll to finish (~300ms)
      setTimeout(resolve, 350);
    });
  }

  clubsGrid.addEventListener("mousedown", (e) => {
    isDragging = true;
    clubsGrid.classList.add("dragging");
    startX = e.pageX - clubsGrid.offsetLeft;
    scrollLeft = clubsGrid.scrollLeft;
    cancelAnimationFrame(animationFrameId);
  });

  clubsGrid.addEventListener("mouseleave", async () => {
    if (isDragging) {
      isDragging = false;
      clubsGrid.classList.remove("dragging");
      await snapToNearestCard();
      animationFrameId = requestAnimationFrame(autoScroll);
    }
  });

  clubsGrid.addEventListener("mouseup", async () => {
    if (isDragging) {
      isDragging = false;
      clubsGrid.classList.remove("dragging");
      await snapToNearestCard();
      animationFrameId = requestAnimationFrame(autoScroll);
    }
  });

  clubsGrid.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - clubsGrid.offsetLeft;
    const walk = (x - startX) * 2;
    clubsGrid.scrollLeft = scrollLeft - walk;
    checkLoop();
  });

  clubsGrid.addEventListener("touchstart", (e) => {
    isDragging = true;
    clubsGrid.classList.add("dragging");
    startX = e.touches[0].pageX - clubsGrid.offsetLeft;
    scrollLeft = clubsGrid.scrollLeft;
    cancelAnimationFrame(animationFrameId);
  });

  clubsGrid.addEventListener("touchend", async () => {
    if (isDragging) {
      isDragging = false;
      clubsGrid.classList.remove("dragging");
      await snapToNearestCard();
      animationFrameId = requestAnimationFrame(autoScroll);
    }
  });

  clubsGrid.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - clubsGrid.offsetLeft;
    const walk = (x - startX) * 2;
    clubsGrid.scrollLeft = scrollLeft - walk;
    checkLoop();
  });

  cloneCards();
  autoScroll();
});

