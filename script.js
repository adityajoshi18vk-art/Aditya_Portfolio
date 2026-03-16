// Theme Toggle (Dark/Light Mode)
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
}

themeToggle.onclick = () => {
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
}


// mobile menu

const menuToggle = document.getElementById("menuToggle")
const navLinks = document.getElementById("navLinks")

menuToggle.onclick = () => {
    navLinks.classList.toggle("active")
}


// close menu after clicking link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active")
    })

})


// navbar shadow when scrolling
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.4)"
    }
    else {
        navbar.style.boxShadow = "none"
    }
})

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal-on-scroll").forEach(section => {
    revealObserver.observe(section);
});

// Active Link Highlighting
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href").includes(current)) {
            item.classList.add("active");
        }
    });
});


// ========== EmailJS Contact Form ==========

// TODO: Replace these 3 values with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";      // From EmailJS → Account → Public Key
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";      // From EmailJS → Email Services
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";    // From EmailJS → Email Templates

emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Disable button while sending
    const submitBtn = contactForm.querySelector(".contact-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formStatus.textContent = "";
    formStatus.style.color = "";

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
        .then(() => {
            formStatus.textContent = "✅ Message sent successfully! I'll get back to you soon.";
            formStatus.style.color = "#4ade80";
            contactForm.reset();
        })
        .catch((error) => {
            formStatus.textContent = "❌ Failed to send message. Please try again or email me directly.";
            formStatus.style.color = "#f87171";
            console.error("EmailJS Error:", error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message →";
        });
});