export async function submitProject(data){
    const res = await fetch('http://localhost:5000/api/projects' , {
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body : JSON.stringify(data)
    })
    const result = await res.json()
    return result
}