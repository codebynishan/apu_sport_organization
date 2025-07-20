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
