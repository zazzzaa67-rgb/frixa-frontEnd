alert('Hello')
async function loadProfile() {

    try {
        console.log("TOKEN IN DASHBOARD:", localStorage.getItem("token"));
        const response = await fetch("https://forixa-backend-production.up.railway.app/api/auth/profile",
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
        console.log("after fetch");
        console.log(response.status)
        if (!response.ok) {
            window.location.href = "logIn.html";
            return;
        }
        const marketer = await response.json();
        console.log(marketer)
        document.getElementById("marName").textContent =
            marketer.full_name;
        document.getElementById("marEmail").textContent =
            marketer.email;
        document.getElementById("refCodeText").textContent =
            marketer.ref_code;
        document.getElementById("visitors").textContent =
            marketer.visitors;
        document.getElementById("sales").textContent =
            marketer.sales;
        document.getElementById("balance").textContent =
            `$${marketer.balance}`;
        document.getElementById("points").textContent = 
        marketer.points
    } catch (err) {
        console.error(err);
    }

}
const logoutBtn = document.getElementById("logOut");

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "login.html";

    localStorage.removeItem("marketer");
    window.location.href = "login.html";
});
async function loadRecentProjects() {

    const token = localStorage.getItem("token");

    const res = await fetch(
        "https://forixa-backend-production.up.railway.app/api/projects/my-projects",
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    const projects = await res.json();
    console.log(projects)
    const container =
        document.getElementById("recentProjects");

    if(projects.length===0){

        container.innerHTML=`
        <p>
            You do not have any project yet
            <a href="details.html">
                start your project
            </a>
        </p>
        `;

        return;
    }

    container.innerHTML="";

    projects.forEach(project=>{

        container.innerHTML+=`
        <div class="project-card">
            <h3>${project.project_name}</h3>
            <p>Status :
                ${project.status}
            </p>
            <p>Price :
                $${project.price ?? 0}
            </p>
        </div>
        `;
    });
}
document.getElementById("copyLinkBtn").addEventListener("click", () => {
    const ref = document.getElementById("refCodeText").textContent;
    const link =
    `${window.location.origin}/forixa-frontEnd/FrontEnd/public/index.html?ref=${ref}`;
    navigator.clipboard.writeText(link);
    const btn = document.getElementById("copyLinkBtn");
    btn.textContent = "Copied ✅";
    setTimeout(() => {
        btn.textContent = "Copy";
    }, 2000);
});
loadRecentProjects()
loadProfile();