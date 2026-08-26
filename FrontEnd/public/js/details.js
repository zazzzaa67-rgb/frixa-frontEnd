console.log("DETAILS JS LOADED");
import { submitProject } from './submitProject.js';
import { projectSteps } from './data.js';
const form = document.getElementById("projectForm");
let num = 0;
let UserProjectData = {};
const refCode = localStorage.getItem("refCode");
const translationsCache = {};
// ==============================
// LANGUAGE
// ==============================
function getLanguage() {
    return localStorage.getItem("language") || "en";
}
async function getTranslations(language) {
    if (language === "en") {
        return null;
    }
    if (translationsCache[language]) {
        return translationsCache[language];
    }
    const response = await fetch(`./locales/${language}.json`);
    if (!response.ok) {
        throw new Error(`Failed to load ${language}.json`);
    }
    const translations = await response.json();
    translationsCache[language] = translations;
    return translations;
}
function getNestedValue(object, path) {

    return path.split(".").reduce((current, key) => {
        return current?.[key];
    }, object);

}


// ==============================
// QUESTION TRANSLATION
// ==============================

function translateQuestion(question, translations) {

    if (!translations) {
        return {
            label: question.label,
            placeholder: question.placeholder,
            options: question.options
        };
    }

    const t = translations.details;

    const label = t?.[question.id] || question.label;

    let placeholder = question.placeholder;

    const placeholderKey = `${question.id}Placeholder`;

    if (t?.[placeholderKey]) {
        placeholder = t[placeholderKey];
    }

    let options = question.options;

    if (question.id === "businessType") {

        options = question.options.map(option => {
            return t?.businessOptions?.[option] || option;
        });

    }

    if (question.id === "platform") {

        options = question.options.map(option => {
            return t?.platformOptions?.[option] || option;
        });

    }

    if (question.id === "design") {

        options = question.options.map(option => {

            if (option === "Yes") {
                return t?.yes || option;
            }

            if (option === "No") {
                return t?.no || option;
            }
            return option;
        });
    }
    return {
        label,
        placeholder,
        options
    };
}
// ==============================
// RENDER QUESTION
// ==============================
function renderQuestion(question, translations) {
    const translated = translateQuestion(
        question,
        translations
    );
    if (
        question.type === "text" ||
        question.type === "email" ||
        question.type === "url" ||
        question.type === "tel"
    ) {
        return `
            <div>
                <label for="${question.id}">
                    ${translated.label}
                </label>
                <input
                    name="${question.id}"
                    id="${question.id}"
                    type="${question.type}"
                    placeholder="${translated.placeholder || ""}"
                    class="whiteInput"
                    required
                >
            </div>
        `;
    }
    if (question.type === "textarea") {
        return `
            <div>
                <label for="${question.id}">
                    ${translated.label}
                </label>
                <textarea
                    class="require whiteInput"
                    name="${question.id}"
                    id="${question.id}"
                    placeholder="${translated.placeholder || ""}"
                    required
                ></textarea>
            </div>
        `;
    }
    if (question.type === "select") {
        const language = getLanguage();
            const selectText =
            getLanguage() === "ar"
            ? "اختر خيارًا"
            : "Select an option";
        return `
            <div>
                <label for="${question.id}">
                    ${translated.label}
                </label>
                <select
                    id="${question.id}"
                    name="${question.id}"
                    class="whiteInput"
                    required
                >
                    <option value="" selected disabled>
                        ${selectText}
                    </option>
                    ${question.options
                        .map((option, index) => `
                            <option value="${option}">
                                ${translated.options[index]}
                            </option>
                        `)
                        .join("")}
                </select>
            </div>
        `;
    }
    if (question.type === "radio") {
        return `
            <div>
                <label>
                    ${translated.label}
                </label>
                ${question.options
                    .map((option, index) => `
                        <label class="radio-option">
                            ${translated.options[index]}
                            <input
                                type="radio"
                                value="${option}"
                                name="${question.id}"
                                required
                            >
                        </label>
                    `)
                    .join("")}
            </div>
        `;
    }
}
// ==============================
// RENDER FORM
// ==============================
async function renderForm() {
    const language = getLanguage();
    const translations =
        await getTranslations(language);
    const step = projectSteps[num];
    const t = translations?.details || {};
    let title = step.title;
    if (language === "ar") {
        if (num === 0) {
            title = `<span class="red">نظرة عامة</span> على المشروع`;
        }
        if (num === 1) {
            title = `<span class="red">متطلبات</span> المشروع`;
        }
        if (num === 2) {
            title = `<span class="red">التواصل</span> والإرسال`;
        }
    }
    const buttonText =
    num === projectSteps.length - 1
        ? (t.submit || "Submit")
        : (t.next || "Next");
    form.innerHTML = `

        <h2>${title}</h2>
        ${step.questions
            .map(question =>
                renderQuestion(question, translations)
            )
            .join("")}
        <button id="next" class="btn">
            ${buttonText}
        </button>
    `;
}
// ==============================
// FORM SUBMIT
// ==============================
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const projectData =
        Object.fromEntries(data.entries());
    UserProjectData = {
        ...UserProjectData,
        ...projectData,
        refCode: localStorage.getItem("refCode")
    };
    const step = document.querySelector(`.step${num}`);
    if (step) {
        step.style.backgroundColor = "red";
    }
    if (num < projectSteps.length - 1) {
        num++;
        await renderForm();
    } else {
        console.log("URL =", window.location.search);
        const refCode =
            localStorage.getItem("refCode");
        console.log("RefCode =", refCode);
        const result =
            await submitProject(UserProjectData);
        console.log(result);
        const language = getLanguage();
        if (language === "ar") {
            form.innerHTML = `
                <div class="success-message">
                    <h2>
                        شكرًا <span class="red">لك!</span>
                    </h2>
                    <p>
                        تم إرسال طلبك بنجاح.
                    </p>
                    <p>
                        سنتواصل معك في أقرب وقت ممكن.
                    </p>
                    <a href="index.html">
                        <span class="red">
                            العودة إلى
                        </span>
                        الصفحة الرئيسية
                    </a>
                </div>
            `;
        } else {
            form.innerHTML = `
                <div class="success-message">
                    <h2>
                        Thank <span class="red">You!</span>
                    </h2>
                    <p>
                        Your request has been submitted successfully.
                    </p>
                    <p>
                        We'll contact you as soon as possible.
                    </p>
                    <a href="index.html">
                        <span class="red">
                            Back to
                        </span>
                        home page
                    </a>
                </div>
            `;
        }
    }
});
renderForm();
