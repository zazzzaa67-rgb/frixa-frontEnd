export async function Pay(data){
    const res = await fetch('api/payment' , {
        method:"POST",
        headers: {"Content-Type":'application/json'},
        body : JSON.stringify(data)
    })
    const result = await res.json()
    return result
}