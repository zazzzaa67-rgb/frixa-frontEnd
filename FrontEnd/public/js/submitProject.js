export async function submitProject(data){
    const res = await fetch('https://forixa-backend.vercel.app/api/projects' , {
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body : JSON.stringify(data)
    })
    const result = await res.json()
    return result
}