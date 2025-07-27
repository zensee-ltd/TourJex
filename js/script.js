$(document).ready(function() {
    'use strict';
    
    // ===== INITIALIZATION =====
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // ===== NAVIGATION =====
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000, 'easeInOutExpo');
        }
    });
    
    // Mobile navigation close on link click
    $('.navbar-nav .nav-link').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });
    
    // ===== HERO SLIDER =====
    let currentSlide = 0;
    const slides = $('.hero-slide');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        slides.removeClass('active');
        slides.eq(index).addClass('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Auto-advance slides
    setInterval(nextSlide, 5000);
    
    // Navigation buttons
    $('.next-btn').on('click', nextSlide);
    $('.prev-btn').on('click', prevSlide);
    
    // ===== COUNTERS ANIMATION =====
    function animateCounters() {
        $('.counter').each(function() {
            const $this = $(this);
            const target = parseInt($this.data('target'));
            
            $({ count: 0 }).animate({ count: target }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.count).toLocaleString());
                },
                complete: function() {
                    $this.text(target.toLocaleString());
                }
            });
        });
    }
    
    // Trigger counters when section becomes visible
    const counterSection = $('.counter').closest('section');
    if (counterSection.length) {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counterSection[0]);
    }
    
    // ===== GALLERY FILTER =====
    $('.filter-btn').on('click', function() {
        const filterValue = $(this).data('filter');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter gallery items
        if (filterValue === 'all') {
            $('.gallery-item').fadeIn(300);
        } else {
            $('.gallery-item').fadeOut(300);
            $(`.gallery-item[data-category="${filterValue}"]`).fadeIn(300);
        }
    });
    
    // ===== LIGHTBOX =====
    window.openLightbox = function(imageSrc, imageTitle) {
        $('#lightboxImage').attr('src', imageSrc);
        $('#lightboxTitle').text(imageTitle);
        $('#lightboxModal').modal('show');
    };
    
    // ===== BOOKING MODAL =====
    window.openBookingForm = function() {
        $('#bookingModal').modal('show');
    };
    
    // ===== CONTACT FORM =====
    $('#contactForm').on('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            subject: $('#subject').val(),
            travelDates: $('#travelDates').val(),
            groupSize: $('#groupSize').val(),
            interests: $('input[name="interests"]:checked').map(function() { return this.value; }).get(),
            message: $('#message').val()
        };
        
        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const $submitBtn = $('#contactForm button[type="submit"]');
        const originalText = $submitBtn.html();
        $submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...').prop('disabled', true);
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(function() {
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            $('#contactForm')[0].reset();
            $submitBtn.html(originalText).prop('disabled', false);
        }, 2000);
    });
    
    // ===== NEWSLETTER SUBSCRIPTION =====
    $('footer .input-group button').on('click', function() {
        const email = $(this).siblings('input[type="email"]').val();
        
        if (!email) {
            showNotification('Please enter your email address.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const $btn = $(this);
        const originalText = $btn.text();
        $btn.text('Subscribing...').prop('disabled', true);
        
        // Simulate subscription (replace with actual logic)
        setTimeout(function() {
            showNotification('Successfully subscribed to our newsletter!', 'success');
            $btn.siblings('input[type="email"]').val('');
            $btn.text(originalText).prop('disabled', false);
        }, 1500);
    });
    
    // ===== NOTIFICATIONS =====
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        $('.notification').remove();
        
        const notification = $(`
            <div class="notification notification-${type}">
                <div class="notification-content">
                    <i class="fas ${getNotificationIcon(type)} me-2"></i>
                    <span>${message}</span>
                    <button class="notification-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `);
        
        $('body').append(notification);
        
        // Animate in
        setTimeout(() => notification.addClass('show'), 100);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button
        notification.find('.notification-close').on('click', function() {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }
    
    // ===== SCROLL TO TOP =====
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            if (!$('.scroll-to-top').length) {
                $('body').append(`
                    <button class="scroll-to-top">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                `);
            }
        } else {
            $('.scroll-to-top').remove();
        }
    });
    
    $(document).on('click', '.scroll-to-top', function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
    
    // ===== LAZY LOADING =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    // ===== FORM ENHANCEMENTS =====
    // Floating labels effect
    $('.form-control, .form-select').on('focus blur', function(e) {
        const $this = $(this);
        const label = $this.siblings('.form-label');
        
        if (e.type === 'focus' || $this.val()) {
            label.addClass('focused');
        } else {
            label.removeClass('focused');
        }
    });
    
    // Character counter for textarea
    $('textarea').on('input', function() {
        const maxLength = $(this).attr('maxlength');
        if (maxLength) {
            const currentLength = $(this).val().length;
            let counter = $(this).siblings('.character-counter');
            
            if (!counter.length) {
                counter = $(`<div class="character-counter"></div>`);
                $(this).after(counter);
            }
            
            counter.text(`${currentLength}/${maxLength}`);
            
            if (currentLength > maxLength * 0.9) {
                counter.addClass('warning');
            } else {
                counter.removeClass('warning');
            }
        }
    });
    
    // ===== ACCORDION ENHANCEMENTS =====
    $('.accordion-button').on('click', function() {
        const target = $(this).attr('data-bs-target');
        const icon = $(this).find('.accordion-icon');
        
        if ($(target).hasClass('show')) {
            icon.removeClass('fa-minus').addClass('fa-plus');
        } else {
            $('.accordion-icon').removeClass('fa-minus').addClass('fa-plus');
            icon.removeClass('fa-plus').addClass('fa-minus');
        }
    });
    
    // ===== PRELOADER =====
    $(window).on('load', function() {
        $('.preloader').fadeOut('slow');
    });
    
    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce scroll events
    let scrollTimeout;
    $(window).on('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Scroll-dependent code here
        }, 16); // ~60fps
    });
    
    // ===== ACCESSIBILITY =====
    // Keyboard navigation for custom elements
    $('.gallery-card, .service-card, .destination-card').attr('tabindex', '0');
    
    $('.gallery-card').on('keypress', function(e) {
        if (e.which === 13) { // Enter key
            $(this).click();
        }
    });
    
    // Focus management for modals
    $('.modal').on('shown.bs.modal', function() {
        $(this).find('[autofocus]').focus();
    });
    
    // ===== ERROR HANDLING =====
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        console.error('Error: ', msg, 'Script: ', url, 'Line: ', lineNo, 'Column: ', columnNo, 'StackTrace: ', error);
        return false;
    };
    
    // ===== BROWSER COMPATIBILITY =====
    // Check for modern browser features
    if (!window.fetch) {
        console.warn('Fetch API not supported. Consider using a polyfill.');
    }
    
    if (!window.IntersectionObserver) {
        console.warn('IntersectionObserver not supported. Consider using a polyfill.');
    }
    
    // ===== DEVELOPMENT HELPERS =====
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Development mode detected');
        
        // Add visual indicators for interactive elements
        $('[data-aos]').css('outline', '1px dashed rgba(255, 0, 0, 0.3)');
    }
});

// ===== ADDITIONAL STYLES FOR NOTIFICATIONS =====
$(document).ready(function() {
    if (!$('#notification-styles').length) {
        $('head').append(`
            <style id="notification-styles">
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                    background: var(--white);
                    border-radius: 8px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    transform: translateX(400px);
                    opacity: 0;
                    transition: all 0.3s ease;
                    min-width: 300px;
                    max-width: 400px;
                }
                
                .notification.show {
                    transform: translateX(0);
                    opacity: 1;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    position: relative;
                }
                
                .notification-success {
                    border-left: 4px solid var(--success-color);
                }
                
                .notification-error {
                    border-left: 4px solid var(--error-color);
                }
                
                .notification-warning {
                    border-left: 4px solid var(--warning-color);
                }
                
                .notification-info {
                    border-left: 4px solid var(--primary-color);
                }
                
                .notification-close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 3px;
                    transition: all 0.2s ease;
                }
                
                .notification-close:hover {
                    background: rgba(0, 0, 0, 0.1);
                }
                
                .scroll-to-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                    color: var(--white);
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 1000;
                    transition: all 0.3s ease;
                    box-shadow: var(--shadow);
                }
                
                .scroll-to-top:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-lg);
                }
                
                .character-counter {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    text-align: right;
                    margin-top: 0.25rem;
                }
                
                .character-counter.warning {
                    color: var(--warning-color);
                }
                
                .form-label.focused {
                    color: var(--primary-color);
                    transform: translateY(-2px);
                    font-size: 0.9rem;
                }
                
                .lazy {
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                
                .preloader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--white);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .preloader::after {
                    content: '';
                    width: 50px;
                    height: 50px;
                    border: 3px solid var(--border-color);
                    border-top-color: var(--primary-color);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                @media (max-width: 768px) {
                    .notification {
                        top: 10px;
                        right: 10px;
                        left: 10px;
                        min-width: auto;
                        max-width: none;
                        transform: translateY(-100px);
                    }
                    
                    .notification.show {
                        transform: translateY(0);
                    }
                    
                    .scroll-to-top {
                        bottom: 20px;
                        right: 20px;
                        width: 45px;
                        height: 45px;
                    }
                }
            </style>
        `);
    }
});

// ===== EASING FUNCTIONS =====
$.easing.easeInOutExpo = function (x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
};

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}