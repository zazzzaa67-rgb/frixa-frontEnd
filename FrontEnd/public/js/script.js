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
const service = services.find((e)=>{return e.id == id})    
time.textContent =service.delivery
title.textContent = service.title
description.textContent = service.description
startBtn.textContent = service.button
includes.innerHTML = service.includes
    .map(item => `
        
        <p><span class="red"><i class="fa-solid fa-check"></i></span> ${item}</p>
        
    `)
    .join("");


