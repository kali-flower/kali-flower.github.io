document.addEventListener('DOMContentLoaded', function() {
    // Fade in on page load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 10);
    
    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');
    const dotsNav = document.querySelector('.carousel-dots');
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Create dots
    slides.forEach((_, index) => {
        const dotContainer = document.createElement('div');
        dotContainer.classList.add('carousel-dot-container');
        if (index === 0) dotContainer.classList.add('active');
        
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        
        dotContainer.appendChild(dot);
        dotsNav.appendChild(dotContainer);
        
        // Add click event to dot
        dotContainer.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    const dots = Array.from(document.querySelectorAll('.carousel-dot-container'));
    
    // Set initial position
    updateCarousel();
    
    // Next button event
    nextButton.addEventListener('click', () => {
        if (currentIndex === totalSlides - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateCarousel();
    });
    
    // Previous button event
    prevButton.addEventListener('click', () => {
        if (currentIndex === 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex--;
        }
        updateCarousel();
    });
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Update carousel display
    function updateCarousel() {
        // Update track position
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Update active state for slides
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            
            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === getPrevIndex()) {
                slide.classList.add('prev');
            } else if (index === getNextIndex()) {
                slide.classList.add('next');
            }
        });
        
        // Update active state for dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
            dot.querySelector('.carousel-dot').classList.toggle('active', index === currentIndex);
        });
    }
    
    // Get previous slide index
    function getPrevIndex() {
        return currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    }
    
    // Get next slide index
    function getNextIndex() {
        return currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    }
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });
    
    // Handle swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50; // Minimum distance for swipe
        if (touchEndX < touchStartX - threshold) {
            // Swipe left
            nextButton.click();
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe right
            prevButton.click();
        }
    }
    
    // Handle transitions back to home page
    document.querySelectorAll('a[href="index.html"], a[href="./index.html"], a[href="/"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fade out
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '0';
            
            // Navigate after transition
            setTimeout(() => {
                window.location.href = this.getAttribute('href');
            }, 500);
        });
    });
});