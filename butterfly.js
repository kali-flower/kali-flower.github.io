document.addEventListener('DOMContentLoaded', function() {
    const butterfly = document.getElementById('butterfly-animation');
    
    // Page load fade-in and animation
    function initializePageLoad() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
            
            // Play butterfly animation
            playButterflyAnimation(butterfly);
        }, 10);
    }
    
    // Butterfly animation function
    function playButterflyAnimation(butterflyElement) {
        butterflyElement.classList.add('animate');
        
        // Optional: Add event listener for animation iteration
        butterflyElement.addEventListener('animationiteration', () => {
            // You can add custom logic here if needed
        });
    }
    
    // Initialize page load
    initializePageLoad();
});