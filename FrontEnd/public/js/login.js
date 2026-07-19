const form = document.getElementById("logIn-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        console.log(result);
        console.log("TOKEN =", result.token);

        if (!response.ok) {
            return alert(result.message);
        }

        localStorage.setItem("token", result.token);

        console.log("TOKEN BEFORE REDIRECT:", localStorage.getItem("token"));
        alert(result.message);
        window.location.href = "MarketerDashboard.html";

    } catch (err) {

        console.error(err);

    }

});




