console.log("DETAILS JS LOADED");
import {submitProject} from './submitProject.js'
import {projectSteps} from './data.js'
const form = document.getElementById("projectForm")
let num=0
let UserProjectData = {}
renderForm()
const refCode = new URLSearchParams(window.location.search).get("ref");
console.log("refCode =", refCode);
console.log("visitorCounted =", sessionStorage.getItem("visitorCounted"));
if (
    refCode &&
    !sessionStorage.getItem("visitorCounted")
) {
    console.log("FETCH IS RUNNING");
    fetch("http://localhost:5000/api/auth/visitor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ refCode })
    })
    .then(async res => {
        console.log("Status:", res.status);
        console.log(await res.json());
    })
    .catch(err => console.error(err));

    sessionStorage.setItem(
        "visitorCounted",
        "true"
    );

}
function renderQuestion(question) {

    if (question.type === "text" ||
        question.type === "email" ||
        question.type === "url" ||
        question.type === "tel") {

        return `
            <div>
                <label for="${question.id}">${question.label}</label>
                <input
                    name='${question.id}'
                    id="${question.id}"
                    type="${question.type}"
                    placeholder="${question.placeholder}" required>
            </div>
        `;
    }

    if (question.type === "textarea") {
        return `
            <div>
                <label for="${question.id}">${question.label}</label>
                <textarea
                    name ='${question.id}'
                    id="${question.id}"
                    placeholder="${question.placeholder}" required></textarea>
            </div>
        `;
    }

    if (question.type === "select") {
        return `
            <div>
                <label for="${question.id}">${question.label}</label>

                <select id="${question.id}" name='${question.id}'  required>
                    <option value="" selected disabled>
                        Select an option
                    </option>
                    ${question.options
                        .map(option => `<option>${option}</option>`)
                        .join("")}
                </select>
            </div>
        `;
    }

    if (question.type === "radio") {
        return `
            <div>
                <label>${question.label}</label>
                ${question.options.map(option => `
                    <label>
                        <input type="radio"  value="${option}" name="${question.id}" required>
                        ${option}
                    </label>
                `).join("")}
            </div>
        `;
    }


}
function renderForm(){
    form.innerHTML = `
        <h2>${projectSteps[num].title}</h2>

        ${projectSteps[num].questions
            .map(renderQuestion)
            .join("")}

        <button id="next" class="btn">
            ${num === projectSteps.length - 1 ? "Submit" : "Next"}
        </button>
    `;}
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data= new FormData(form)
    const projectData = Object.fromEntries(data.entries());
    UserProjectData = {
        ...UserProjectData,
        ...projectData,
        refCode : new URLSearchParams(window.location.search).get('ref')
    }
    document.querySelector(`.step${num}`).style.backgroundColor = 'red'
    if (num < projectSteps.length - 1) {
        num++;
        renderForm();
    }
        else {
            console.log("URL =", window.location.search);
            const refCode = new URLSearchParams(window.location.search).get("ref");
            console.log("RefCode =", refCode);
            const result = await submitProject(UserProjectData)
            console.log(result)
            form.innerHTML = 
            `<div class="success-message">
                <h2>Thank <span class='red'>You!</span></h2>
                <p>Your request has been submitted successfully.</p>
                <p>We'll contact you as soon as possible.</p>
                <a href='index.html'><span class='red'>Back to</span> home page</a>
            </div>`
    ;
}
    })
