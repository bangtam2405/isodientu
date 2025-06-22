document.addEventListener('DOMContentLoaded', function() {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    primary: '#1e40af',      // Blue-700
                    secondary: '#3b82f6',    // Blue-500
                    accent: '#FF6B35',       // Amber-500
                    'light-bg': '#f8fafc',   // Slate-50
                    'dark-bg': '#0f172a',    // Slate-900
                    'text-primary': '#1e293b', // Slate-800
                    'text-secondary': '#64748b', // Slate-500
                },
                animation: {
                    'float': 'float 6s ease-in-out infinite',
                    'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    'bounce-slow': 'bounce 3s infinite',
                    'spin-slow': 'spin 8s linear infinite',
                    'gradient': 'gradient 8s ease infinite',
                    'slide-up': 'slideUp 0.8s ease-out',
                    'slide-down': 'slideDown 0.8s ease-out',
                    'scale-in': 'scaleIn 0.6s ease-out',
                    'fade-in-up': 'fadeInUp 0.8s ease-out',
                },
                keyframes: {
                    float: {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-20px)' }
                    },
                    gradient: {
                        '0%, 100%': { backgroundPosition: '0% 50%' },
                        '50%': { backgroundPosition: '100% 50%' }
                    },
                    slideUp: {
                        '0%': { transform: 'translateY(100px)', opacity: '0' },
                        '100%': { transform: 'translateY(0)', opacity: '1' }
                    },
                    slideDown: {
                        '0%': { transform: 'translateY(-100px)', opacity: '0' },
                        '100%': { transform: 'translateY(0)', opacity: '1' }
                    },
                    scaleIn: {
                        '0%': { transform: 'scale(0.8)', opacity: '0' },
                        '100%': { transform: 'scale(1)', opacity: '1' }
                    },
                    fadeInUp: {
                        '0%': { transform: 'translateY(30px)', opacity: '0' },
                        '100%': { transform: 'translateY(0)', opacity: '1' }
                    }
                },
                backgroundImage: {
                    'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                    'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                }
            }
        }
    }
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Header scroll effect - Cập nhật
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        const backToTop = document.getElementById('backToTop');
        const scrollIndicator = document.getElementById('scrollIndicator');
        
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
            if (backToTop) {
                backToTop.classList.remove('opacity-0', 'invisible');
                backToTop.classList.add('opacity-100', 'visible');
            }
        } else {
            header.classList.remove('header-scrolled');
            if (backToTop) {
                backToTop.classList.add('opacity-0', 'invisible');
                backToTop.classList.remove('opacity-100', 'visible');
            }
        }
        
        // Update scroll progress
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollIndicator) {
            scrollIndicator.style.transform = `scaleX(${scrollPercent / 100})`;
        }
        
        // Update active navigation
        updateActiveNavigation();
    });


    // Back to top functionality
    const backToTopButton = document.getElementById('backToTop');
    if(backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars';
            } else {
                icon.className = 'fas fa-times';
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                }

                // Update active navigation immediately
                setTimeout(() => {
                    // Manually set active class on click for faster feedback
                    document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => link.classList.remove('active'));
                    document.querySelectorAll(`a[href="${this.getAttribute('href')}"]`).forEach(link => link.classList.add('active'));
                }, 50); // Small delay to allow scroll to start
            }
        });
    });

    // Counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += step;
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Initialize counter animation
    animateCounters();

    // Tilt effect for cards
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // Magnetic button effect
    document.querySelectorAll('.magnetic-button').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });

    // Particles.js configuration
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // GSAP animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero text animation
        gsap.from('.hero-content h1', {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-content p', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        // Floating elements animation
        gsap.to('.floating-shapes .shape:nth-child(1)', {
            y: -30,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
                    
        gsap.to('.floating-shapes .shape:nth-child(2)', {
            y: -20,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: 1
        });
        
        gsap.to('.floating-shapes .shape:nth-child(3)', {
            y: -25,
            duration: 3.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: 2
        });
        
        // Section animations
        gsap.utils.toArray('.section-animate').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add loading states for buttons
    document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.href && (this.href.startsWith('tel:') || this.href.startsWith('mailto:'))) {
                return; // Don't add loading state for tel/mailto links
            }
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang xử lý...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });

    // Form validation and submission (if contact form exists)
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form submission logic here
            const formData = new FormData(form);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
            successMessage.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.';
            
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.style.transform = 'translateX(0)';
            }, 100);
            
            setTimeout(() => {
                successMessage.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 300);
            }, 3000);
            
            // Reset form
            form.reset();
        });
    });

    // Add click tracking for analytics
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('click', function() {
            const action = this.textContent.trim() || this.getAttribute('aria-label') || 'Unknown';
            console.log('User interaction:', action);
            
            // Add your analytics tracking code here
            // Example: gtag('event', 'click', { 'event_category': 'engagement', 'event_label': action });
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add focus styles for keyboard navigation
    const keyboardStyles = document.createElement('style');
    keyboardStyles.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid var(--accent-color) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(keyboardStyles);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in, .scale-in').forEach(el => {
        observer.observe(el);
    });

    // Preloader (optional)
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // Error handling for external resources
    window.addEventListener('error', function(e) {
        console.warn('Resource failed to load:', e.target.src || e.target.href);
    });

    // Service Worker registration (for PWA capabilities)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }

    // Thêm vào cuối file script.js

// Array chứa thông tin các ảnh giải thưởng
const awardImages = [
    {
        src: 'image/top10.jpg',
        title: 'TOP 10 Doanh nghiệp CNTT Việt Nam 2022',
        description: 'Vinh danh CUSC trong danh sách 10 doanh nghiệp CNTT hàng đầu'
    },
    {
        src: 'image/chungnhan.png',
        title: 'Giải thưởng chuyển đổi số Việt Nam 2019',
        description: 'Công nhận đóng góp xuất sắc trong chuyển đổi số quốc gia'
    },
    {
        src: 'image/saokhueISO.jpg',
        title: 'Giải thưởng Sao Khuê 2018',
        description: 'Giải thưởng danh giá nhất ngành CNTT Việt Nam'
    }
];

let currentImageIndex = 0;

// Mở modal xem ảnh full size
function viewFullImage(imageSrc, title) {
    // Tìm index của ảnh hiện tại
    currentImageIndex = awardImages.findIndex(img => img.src === imageSrc);
    
    const modal = document.getElementById('fullImageModal');
    const image = document.getElementById('fullImage');
    const titleElement = document.getElementById('fullImageTitle');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    image.src = imageSrc;
    titleElement.textContent = title;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add loading effect
    image.style.opacity = '0';
    image.onload = function() {
        image.style.opacity = '1';
        image.style.transition = 'opacity 0.3s ease';
    };
}

// Đóng modal
function closeFullImage() {
    const modal = document.getElementById('fullImageModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// Xem ảnh trước
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + awardImages.length) % awardImages.length;
    const currentImage = awardImages[currentImageIndex];
    
    const image = document.getElementById('fullImage');
    const titleElement = document.getElementById('fullImageTitle');
    
    image.style.opacity = '0';
    setTimeout(() => {
        image.src = currentImage.src;
        titleElement.textContent = currentImage.title;
        image.style.opacity = '1';
    }, 150);
}

// Xem ảnh tiếp theo
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % awardImages.length;
    const currentImage = awardImages[currentImageIndex];
    
    const image = document.getElementById('fullImage');
    const titleElement = document.getElementById('fullImageTitle');
    
    image.style.opacity = '0';
    setTimeout(() => {
        image.src = currentImage.src;
        titleElement.textContent = currentImage.title;
        image.style.opacity = '1';
    }, 150);
}

// Tải ảnh về máy
function downloadImage() {
    const image = document.getElementById('fullImage');
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `cusc-award-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Đóng modal khi nhấn ESC
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('fullImageModal');
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeFullImage();
    }
    // Navigation với arrow keys
    if (!modal.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

// Đóng modal khi click bên ngoài
document.getElementById('fullImageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeFullImage();
    }
});

// Thêm zoom functionality cho ảnh trong modal
let isZoomed = false;
let zoomLevel = 1;

document.getElementById('fullImage').addEventListener('click', function(e) {
    e.stopPropagation();
    
    if (!isZoomed) {
        this.style.transform = 'scale(1.5)';
        this.style.cursor = 'zoom-out';
        isZoomed = true;
        zoomLevel = 1.5;
    } else {
        this.style.transform = 'scale(1)';
        this.style.cursor = 'zoom-in';
        isZoomed = false;
        zoomLevel = 1;
    }
});

// Mouse wheel zoom
const fullImage = document.getElementById('fullImage');
if (fullImage) {
    fullImage.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        if (e.deltaY < 0) {
            // Zoom in
            zoomLevel = Math.min(zoomLevel + 0.1, 3);
        } else {
            // Zoom out
            zoomLevel = Math.max(zoomLevel - 0.1, 0.5);
        }
        
        this.style.transform = `scale(${zoomLevel})`;
        
        if (zoomLevel > 1) {
            this.style.cursor = 'zoom-out';
            isZoomed = true;
        } else {
            this.style.cursor = 'zoom-in';
            isZoomed = false;
        }
    });
}


    console.log('🚀 CUSC-ISO Website loaded successfully!');
    console.log('📞 Liên hệ: 0292-3831-301');
    console.log('📧 Email: info@cusc.ctu.edu.vn');
    console.log('🌐 Website: https://www.cusc.ctu.edu.vn');

// Thêm vào cuối file script.js

// Active Navigation Handler
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
    const headerHeight = document.getElementById('header').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50; // Adjusted offset
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Handle case for the very bottom of the page
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
         const lastSection = sections[sections.length - 2]; // Assuming contact is not a major section, but proof is.
         if(lastSection) currentSection = lastSection.getAttribute('id');
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initial check
updateActiveNavigation();

});


