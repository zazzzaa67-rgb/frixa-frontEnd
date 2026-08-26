import { services } from './data.js';
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const time = document.getElementById("time");
const startBtn = document.getElementById("start");
const includes = document.getElementById("includes");
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const service = services.find((item) => item.id === id);
async function renderService() {
    if (!service) {
        console.error("Service not found");
        return;
    }
    const language =
        localStorage.getItem("language") || "en";
    // =========================
    // ENGLISH
    // =========================
    if (language === "en") {
        title.textContent = service.title;
        description.textContent =
            service.description;
        startBtn.innerHTML =
            `${service.button} <i class="fa-solid fa-arrow-right-long"></i>`;
        price.innerHTML = `
            <span class="red">
                Starts from $${service.price}
            </span>
        `;
        time.textContent =
            service.delivery;
        includes.innerHTML =
            service.includes
                .map(item => `
                    <p>
                        <span class="red">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        ${item}
                    </p>
                `)
                .join("");
        return;
    }
    // =========================
    // ARABIC
    // =========================
    try {
        const response =
            await fetch("./locales/ar.json");
        if (!response.ok) {
            throw new Error("Failed to load ar.json");
        }
        const translations =
            await response.json();
        // نجيب الخدمة العربية بنفس الـ ID
        const arabicService =
            translations.servicesDesc.find(
                item => item.id === id
            );
        if (!arabicService) {
            console.error(
                "Arabic service not found:",
                id
            );
            return;
        }
        title.textContent =
            arabicService.title;
        description.textContent =
            arabicService.description;
        startBtn.innerHTML =
            `${arabicService.button} <i class="fa-solid fa-arrow-right-long"></i>`;
        price.innerHTML = `
            <span class="red">
                تبدأ من $${arabicService.price}
            </span>
        `;
        time.textContent =
            arabicService.delivery;
        includes.innerHTML =
            arabicService.includes
                .map(item => `
                    <p>
                        <span class="red">
                            <i class="fa-solid fa-check"></i>
                        </span>
                        ${item}
                    </p>
                `)
                .join("");
    } catch (error) {
        console.error(
            "Service translation error:",
            error
        );
    }
}
renderService();
// =========================
// DARK / LIGHT MODE
// =========================
const btn = document.getElementById("toggle");
const body = document.body;
const savedTheme =
    localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark");
    if (btn) {
        btn.classList.add("dark");
        btn.querySelector(
            ".theme-toggle__pill"
        ).textContent = "🌙";
    }
} else {
    if (btn) {
        btn.classList.remove("dark");
        btn.querySelector(
            ".theme-toggle__pill"
        ).textContent = "☀";
    }
}
if (btn) {
    btn.addEventListener("click", () => {
        body.classList.toggle("dark");
        btn.classList.toggle("dark");
        if (body.classList.contains("dark")) {
            btn.querySelector(
                ".theme-toggle__pill"
            ).textContent = "🌙";
            localStorage.setItem(
                "theme",
                "dark"
            );
        } else {
            btn.querySelector(
                ".theme-toggle__pill"
            ).textContent = "☀";
            localStorage.setItem(
                "theme",
                "light"
            );
        }
    });
}