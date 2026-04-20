// Anniversary Date: January 18, 2026
const anniversaryDate = new Date('2026-01-18T00:00:00').getTime();

// Update counter every second
function updateCounter() {
    const now = new Date().getTime();
    const timeDifference = now - anniversaryDate;

    // Calculate days, hours, minutes
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    // Update DOM
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
}

// Initialize counter on page load
window.addEventListener('load', () => {
    updateCounter();
    setInterval(updateCounter, 1000);
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe gallery items and reason cards
document.querySelectorAll('.gallery-item, .reason-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Music Control
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = true;

// Set volume to 30% for background music
bgMusic.volume = 0.3;

// Try to autoplay the music
window.addEventListener('load', () => {
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Autoplay was prevented, wait for user interaction
            console.log('Autoplay prevented, waiting for user interaction');
            isPlaying = false;
            musicToggle.classList.add('paused');
        });
    }
});

// Allow user to play music on first interaction
document.addEventListener('click', () => {
    if (!isPlaying) {
        bgMusic.play();
        isPlaying = true;
        musicToggle.classList.remove('paused');
    }
}, { once: true });

// Toggle music on button click
musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlaying) {
        bgMusic.pause();
        isPlaying = false;
        musicToggle.classList.add('paused');
    } else {
        bgMusic.play();
        isPlaying = true;
        musicToggle.classList.remove('paused');
    }
});
