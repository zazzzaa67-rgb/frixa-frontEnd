const form = document.getElementById('signUp-form')
let data = {}
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
        const response = await fetch("http://forixa-backend-production.up.railway.app/api/auth/marketer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.message);
        console.log(result);
    } catch (err) {
        console.error(err);
    }
});