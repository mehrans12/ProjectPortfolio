// ===========================
// Mehran Ahmed Portfolio
// My first portfolio JS! :)
// ===========================

// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

// close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(function(link) {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
});


// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});


// ---- Navbar background on scroll ----
window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#fff';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = '#fff';
    }
});





// ---- Skill bars animation ----
function animateSkills() {
    var skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(function(bar) {
        var rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            var width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
}

window.addEventListener('scroll', animateSkills);
// run once on load too
window.addEventListener('load', animateSkills);


// ---- Scroll animations ----
function addScrollAnimations() {
    // add animation class to elements
    var elementsToAnimate = document.querySelectorAll(
        '.service-card, .project-card, .info-box, .skill-item, .contact-item, .about-text, .about-info-boxes'
    );

    elementsToAnimate.forEach(function(el) {
        el.classList.add('animate-on-scroll');
    });
}

function handleScrollAnimations() {
    var elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(function(el) {
        var rect = el.getBoundingClientRect();
        var windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight - 80) {
            el.classList.add('show');
        }
    });
}

// init
addScrollAnimations();
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);


// ---- Contact form ----
var contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    var submitBtn = document.getElementById('submitBtn');
    var originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending... ⏳';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // pretend to send (would connect to a real backend later)
    setTimeout(function() {
        submitBtn.textContent = 'Sent! ✅';
        submitBtn.style.opacity = '1';
        contactForm.reset();

        setTimeout(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
});


// ---- Active nav link highlighting ----
window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('.nav-menu a');
    
    var scrollPos = window.scrollY + 100;
    
    sections.forEach(function(section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(function(link) {
                link.style.color = '#555';
                if (link.getAttribute('href') === '#' + id) {
                    link.style.color = '#4a90d9';
                }
            });
        }
    });
});


// ---- Typing effect on page load ----
window.addEventListener('load', function() {
    var nameElement = document.querySelector('.my-name');
    var fullName = nameElement.textContent;
    nameElement.textContent = '';
    nameElement.style.borderRight = '2px solid white';
    
    var i = 0;
    var typeInterval = setInterval(function() {
        nameElement.textContent += fullName[i];
        i++;
        if (i >= fullName.length) {
            clearInterval(typeInterval);
            // remove cursor after typing
            setTimeout(function() {
                nameElement.style.borderRight = 'none';
            }, 800);
        }
    }, 80);
});
