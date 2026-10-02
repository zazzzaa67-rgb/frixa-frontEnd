const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const contactSubmitButton = contactForm?.querySelector('button[type="submit"]');
const CONTACT_API_URL = "https://forixa-backend.vercel.app/api/contact";

contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = {
        whatsapp: formData.get("whatsapp").toString().trim(),
        subject: formData.get("subject").toString().trim(),
        message: formData.get("message").toString().trim()
    };

    contactSubmitButton.disabled = true;
    contactStatus.textContent = "Sending...";

    try {
        const response = await fetch(CONTACT_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Message could not be sent.");

        contactStatus.textContent = "Your message was sent successfully.";
        contactForm.reset();
    } catch (error) {
        contactStatus.textContent = error.message || "Message could not be sent. Please try again.";
    } finally {
        contactSubmitButton.disabled = false;
    }
});
