import {services , projectSteps} from './data.js'
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const servicePhoto = document.getElementById("serv-photo");
const includeHeading = document.getElementById("incH");
const time = document.getElementById("time");
const startBtn = document.getElementById("start");
const backBtn = document.getElementById("serv");
const includes = document.getElementById('includes')
const params = new  URLSearchParams(window.location.search)
const id = Number(params.get('id'))
const serviceId = services.find((e) => e.id == id);
if (serviceId){
const service = services.find((e)=>{return e.id == id})    
time.textContent =service.delivery
title.textContent = service.title
description.textContent = service.description
startBtn.textContent = service.button
price.textContent = `Starts from $${service.price}`
includes.innerHTML = service.includes
    .map(item => `
        <p><span class="red"><i class="fa-solid fa-check"></i></span> ${item}</p>
    `)
    .join("");
console.log('script added')
}
const btn = document.getElementById("toggle")
const body = document.body

const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
    body.classList.add("dark")

    if (btn) {
        btn.classList.add("dark")
        btn.querySelector(".theme-toggle__pill").textContent = "🌙"
    }
} else {
    if (btn) {
        btn.classList.remove("dark")
        btn.querySelector(".theme-toggle__pill").textContent = "☀"
    }
}

if (btn) {
    btn.addEventListener("click", () => {
        body.classList.toggle("dark")
        btn.classList.toggle("dark")

        if (body.classList.contains("dark")) {
            btn.querySelector(".theme-toggle__pill").textContent = "🌙"
            localStorage.setItem("theme", "dark")
        } else {
            btn.querySelector(".theme-toggle__pill").textContent = "☀"
            localStorage.setItem("theme", "light")
        }
    })
}