document.addEventListener("DOMContentLoaded", function() {
    // Smooth scroll effect for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth"
            });
        });
    });

    // Fade-in animation for sections and elements
    const sections = document.querySelectorAll("section");
    const options = {
        threshold: 0.5
    };
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, options);
    sections.forEach(section => {
        observer.observe(section);
    });

    // Disable contact form after submission
    const contactForm = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit-btn");
    const successMessage = document.getElementById("success-message");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        // You can add code here to send the form data to your server
        // For now, we'll just show a success message and disable the form
        successMessage.classList.remove("hidden");
        contactForm.reset();
        contactForm.classList.add("disabled");
        submitButton.disabled = true;
        setTimeout(function() {
            document.getElementById("contact").style.display = "none";
        }, 3000); // Hide contact section after 3 seconds
    });
});
