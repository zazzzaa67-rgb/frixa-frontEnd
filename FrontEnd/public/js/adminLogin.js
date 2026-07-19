const form = document.getElementById('logIn-form')
form.addEventListener('submit' , async(e) =>{
    e.preventDefault();
    const data = {
        email : document.getElementById("email").value,
        password : document.getElementById("password").value
    }
    const res = await fetch(
        "http://localhost:5000/api/admin/login",{
            method: 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(data)
        })
            
    const result = await res.json();
    if(!res.ok){
        return alert(result.message)
    }
    localStorage.setItem('adminToken' , result.token)
    window.location.href = 'adminDashboard.html';
})