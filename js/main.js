const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

fadeInOnScroll();

window.addEventListener('scroll', fadeInOnScroll);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
const customAlert = document.getElementById('customAlert');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value || 'No subject';
    const message = document.getElementById('message').value;
    
    try {
        // Send to webhook
        const webhookURL = 'https://discord.com/api/webhooks/1393221196396368022/KwFJtctETH5NWxwzOyxMAZTwU0BhVkQSK_pm4MFfWHcIWtoPtgHPva8i3esvEIObdcnc';
        
        const embed = {
            title: 'New Contact Form Submission',
            color: 0x6c63ff,
            fields: [
                {
                    name: 'Name',
                    value: name,
                    inline: true
                },
                {
                    name: 'Email',
                    value: email,
                    inline: true
                },
                {
                    name: 'Subject',
                    value: subject
                },
                {
                    name: 'Message',
                    value: message
                }
            ],
            timestamp: new Date().toISOString()
        };
        
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                embeds: [embed]
            })
        });
        
        if (response.ok) {
            // Show alert
            customAlert.classList.add('show');
            
            setTimeout(() => {
                customAlert.classList.remove('show');
            }, 5000);
            
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        customAlert.querySelector('i').className = 'fas fa-exclamation-circle';
        customAlert.querySelector('h4').textContent = 'Error!';
        customAlert.querySelector('p').textContent = 'Failed to send message. Please try again later.';
        customAlert.classList.add('show');
        
        setTimeout(() => {
            customAlert.classList.remove('show');
            setTimeout(() => {
                customAlert.querySelector('i').className = 'fas fa-check-circle';
                customAlert.querySelector('h4').textContent = 'Message Sent!';
                customAlert.querySelector('p').textContent = 'Thank you for reaching out. I\'ll get back to you soon.';
            }, 500);
        }, 5000);
    }
});
