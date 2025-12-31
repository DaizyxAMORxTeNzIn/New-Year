document.addEventListener('DOMContentLoaded', () => {
    // --- Modal Logic ---
    const getStartedBtn = document.getElementById('getStartedBtn');
    const authModal = document.getElementById('authModal');
    const closeModalBtn = authModal.querySelector('.close');

    const openModal = () => {
        authModal.hidden = false;
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            authModal.classList.add('opening');
        }, 10);
    };

    const closeModal = () => {
        authModal.classList.remove('opening');
        authModal.classList.add('closing');
        authModal.addEventListener('transitionend', () => {
            authModal.hidden = true;
            authModal.classList.remove('closing');
            document.body.style.overflow = '';
        }, { once: true });
    };

    getStartedBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            closeModal();
        }
    });

    // --- Proposal Buttons Logic ---
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');

    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            const content = authModal.querySelector('.modal-content');
            content.innerHTML = '<h1 style="color: #ff6b6b; font-size: 3rem; margin-bottom: 20px;">Thank You! ❤️</h1><p style="color: white; font-size: 1.5rem;">I promise to make every moment count.<br>Welcome back home.</p>';
        });
    }

    if (noBtn) {
        noBtn.addEventListener('click', () => {
            const content = authModal.querySelector('.modal-content');
            content.innerHTML = '<h1 style="color: white; font-size: 2rem; margin-bottom: 20px;">I Understand. 🤍</h1><p style="color: rgba(255,255,255,0.8); font-size: 1.2rem;">Take all the time you need.<br>I\'ll be right here waiting.</p>';
        });
    }

    // --- Our Story Modal Logic ---
    const ourStoryBtn = document.getElementById('ourStoryBtn');
    const storyModal = document.getElementById('storyModal');
    
    if (ourStoryBtn && storyModal) {
        const closeStoryBtn = storyModal.querySelector('.close');

        const openStoryModal = () => {
            storyModal.hidden = false;
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                storyModal.classList.add('opening');
            }, 10);
        };

        const closeStoryModal = () => {
            storyModal.classList.remove('opening');
            storyModal.classList.add('closing');
            storyModal.addEventListener('transitionend', () => {
                storyModal.hidden = true;
                storyModal.classList.remove('closing');
                document.body.style.overflow = '';
            }, { once: true });
        };

        ourStoryBtn.addEventListener('click', openStoryModal);
        closeStoryBtn.addEventListener('click', closeStoryModal);
        storyModal.addEventListener('click', (e) => {
            if (e.target === storyModal) {
                closeStoryModal();
            }
        });
    }

    // --- Future Modal Logic ---
    const futureBtn = document.getElementById('futureBtn');
    const futureModal = document.getElementById('futureModal');
    
    if (futureBtn && futureModal) {
        const closeFutureBtn = futureModal.querySelector('.close');

        const openFutureModal = () => {
            futureModal.hidden = false;
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                futureModal.classList.add('opening');
            }, 10);
        };

        const closeFutureModal = () => {
            futureModal.classList.remove('opening');
            futureModal.classList.add('closing');
            futureModal.addEventListener('transitionend', () => {
                futureModal.hidden = true;
                futureModal.classList.remove('closing');
                document.body.style.overflow = '';
            }, { once: true });
        };

        futureBtn.addEventListener('click', openFutureModal);
        closeFutureBtn.addEventListener('click', closeFutureModal);
        futureModal.addEventListener('click', (e) => {
            if (e.target === futureModal) {
                closeFutureModal();
            }
        });
    }

    // --- Starry Background Logic ---
    const starContainer = document.getElementById('star-container');
    if (starContainer) {
        // Create Stars
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 1;
            const duration = Math.random() * 3 + 2;
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.setProperty('--duration', `${duration}s`);
            
            starContainer.appendChild(star);
        }

        // Create Shooting Stars
        for (let i = 0; i < 5; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.classList.add('shooting-star');
            
            // Randomize starting positions and delays
            const startX = Math.random() * 100;
            const startY = Math.random() * 50; // Top half
            const delay = Math.random() * 5;
            const duration = Math.random() * 2 + 2;

            shootingStar.style.left = `${startX}%`;
            shootingStar.style.top = `${startY}%`;
            shootingStar.style.animationDelay = `${delay}s`;
            shootingStar.style.animationDuration = `${duration}s`;

            starContainer.appendChild(shootingStar);
        }
    }

    // --- Fireworks Animation Logic ---
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    let fireworks = [];
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.sx = Math.random() * 3 - 1.5;
            this.sy = Math.random() * -3 - 3;
            this.size = 2;
            this.hue = Math.random() * 360;
            this.shouldExplode = false;
        }
        update() {
            this.x += this.sx;
            this.y += this.sy;
            this.sy += 0.05; // gravity
            if (this.sy >= 0 || this.y <= canvas.height * 0.2 + Math.random() * canvas.height * 0.3) {
                this.shouldExplode = true;
            }
        }
        draw() {
            ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    class Particle {
        constructor(x, y, hue) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 6 - 3;
            this.speedY = Math.random() * 6 - 3;
            this.hue = hue;
            this.life = 100;
            this.alpha = 1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += 0.05;
            this.life -= 1;
            this.alpha -= 0.01;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function animate() {
        // Clear canvas with a slight trail effect for fireworks
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';

        // Spawn Fireworks
        if (Math.random() < 0.03) {
            fireworks.push(new Firework());
        }

        // Update & Draw Fireworks
        for (let i = 0; i < fireworks.length; i++) {
            fireworks[i].update();
            fireworks[i].draw();
            if (fireworks[i].shouldExplode) {
                for (let j = 0; j < 50; j++) {
                    particles.push(new Particle(fireworks[i].x, fireworks[i].y, fireworks[i].hue));
                }
                fireworks.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animate);
    }
    animate();

    // --- Gallery Logic ---
    const viewMemoriesBtn = document.getElementById('viewMemoriesBtn');
    const galleryModal = document.getElementById('galleryModal');
    const closeGalleryBtn = galleryModal.querySelector('.close-gallery');
    const galleryScope = document.querySelector('.gallery-scope');

    // --- Interactive Gallery Logic ---
    let rotY = 0;
    let isDragging = false;
    let startX = 0;

    function animateGallery() {
        if (!isDragging && galleryModal && !galleryModal.hidden) {
            rotY += 0.2; // Auto-rotate speed
        }
        if (galleryScope) {
            galleryScope.style.setProperty('--rotY', `${rotY}deg`);
        }
        requestAnimationFrame(animateGallery);
    }
    animateGallery();

    if (viewMemoriesBtn && galleryModal) {
        viewMemoriesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            galleryModal.hidden = false;
            setTimeout(() => {
                galleryModal.classList.add('active');
            }, 10);
        });

        closeGalleryBtn.addEventListener('click', () => {
            galleryModal.classList.remove('active');
            setTimeout(() => {
                galleryModal.hidden = true;
            }, 500);
        });

        // Drag Events
        galleryModal.addEventListener('mousedown', (e) => {
            if (e.target.closest('.close-gallery')) return; // Don't drag if clicking close button
            isDragging = true;
            startX = e.clientX;
            if (galleryScope) galleryScope.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                rotY += deltaX * 0.5; // Drag sensitivity
                startX = e.clientX;
            }
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            if (galleryScope) galleryScope.style.cursor = 'grab';
        });

        // Touch Support
        galleryModal.addEventListener('touchstart', (e) => {
            if (e.target.closest('.close-gallery')) return;
            isDragging = true;
            startX = e.touches[0].clientX;
        });

        window.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const deltaX = e.touches[0].clientX - startX;
                rotY += deltaX * 0.5;
                startX = e.touches[0].clientX;
            }
        });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    // --- 3D Character Follow Logic ---
    const character = document.querySelector('.love-character');
    if (character) {
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;

        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            // Limit rotation to avoid it spinning too far
            targetX = Math.max(-30, Math.min(30, yAxis)); 
            targetY = Math.max(-30, Math.min(30, -xAxis));
        });

        function animateCharacter() {
            // Smooth interpolation (Lerp)
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;

            character.style.transform = `rotateY(${currentY}deg) rotateX(${currentX}deg)`;
            requestAnimationFrame(animateCharacter);
        }
        animateCharacter();
    }
});
