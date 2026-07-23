const token = localStorage.getItem("adminToken");
if (!token) {
    window.location.href = "adminLogin.html";
}

// ====================
// Dashboard Cards
// ====================

async function loadStats() {

    const res = await fetch(
        "http://forixa-backend-production.up.railway.app/api/projects/dashboard/stats",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const stats = await res.json();

    console.log(stats);

    document.getElementById("projectsCount").textContent =
        stats.totalProjects;

    document.getElementById("clientsCount").textContent =
        stats.totalClients;

    document.getElementById("marketersCount").textContent =
        stats.totalMarketers;

    document.getElementById("revenue").textContent =
        `$${stats.totalRevenue}`;
}


// ====================
// Projects Table
// ====================

async function loadProjects() {

    const res = await fetch(
        "http://forixa-backend-production.up.railway.app/api/projects",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    const projects = await res.json();
    console.log("Projects:", projects);

    const body = document.getElementById("projectsBody");
    body.innerHTML = "";
    projects.forEach(project => {
        body.innerHTML += `
            <tr>
                <td>${project.project_name}</td>
                <td>${project.full_name}</td>
                <td>${project.marketer_name ?? "-"}</td>
                <td>
                    <select id="status-${project.id}">
                        <option value="new" ${project.status==="new"?"selected":""}>New</option>
                        <option value="contacted" ${project.status==="contacted"?"selected":""}>Contacted</option>
                        <option value="waiting_payment" ${project.status==="waiting_payment"?"selected":""}>Waiting Payment</option>
                        <option value="paid" ${project.status==="paid"?"selected":""}>Paid</option>
                        <option value="in_progress" ${project.status==="in_progress"?"selected":""}>In Progress</option>
                        <option value="completed" ${project.status==="completed"?"selected":""}>Completed</option>
                        <option value="cancelled" ${project.status==="cancelled"?"selected":""}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <input
                        type="number"
                        id="price-${project.id}"
                        value="${project.price ?? ""}"
                        style="width:90px"
                    >
                    <button onclick="saveProject(${project.id})">
                        Save
                    </button>
                </td>
                <td>${project.phone}</td>
                <td>${project.email}</td>
            </tr>
        `;
    });
}

// ==============================
async function loadMarketers() {

    const res = await fetch(
        "http://forixa-backend-production.up.railway.app/api/projects/marketers",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    const marketers = await res.json();
    console.log(marketers)
    const body = document.getElementById("marketersBody");
    body.innerHTML = "";
    marketers.forEach(marketer => {
        body.innerHTML += `
        <tr>
            <td>${marketer.id}
            <td>${marketer.full_name}</td>
            <td>${marketer.ref_code}</td>
            <td>${marketer.visitors}</td>
            <td>${marketer.sales}</td>
            <td>${marketer.points}</td>
            <td>${marketer.balance}$</td>
            <td>${marketer.email}</td>
        </tr>
        `;
    });
}
window.saveProject = async function(id){
    const price =
        document.getElementById(`price-${id}`).value;
    const status =
        document.getElementById(`status-${id}`).value;
    await fetch(`http://forixa-backend-production.up.railway.app/api/projects/${id}/price`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({price})
    });
    await fetch(`http://forixa-backend-production.up.railway.app/api/projects/${id}/status`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({status})
    });
    alert("Saved Successfully");
    loadProjects();
    loadStats();
    loadMarketers();
}

loadStats();
loadProjects();
loadMarketers();