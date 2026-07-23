const payBtn = document.getElementById("pay")
const tokenRes = await fetch("https://forixa-backend-production.up.railway.app/api/payment/token");
const { clientToken } = await tokenRes.json();
    Paddle.Initialize({
        token: clientToken
    });
payBtn.addEventListener('click' ,async ()=>{
    const res = await fetch('https://forixa-backend-production.up.railway.app/api/payment/checkout' , {
        method: 'POST',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify({"projectId": 1}),
    })
    const data = await res.json()

    console.log("FULL RESPONSE:");    
    console.log(data);
    alert(JSON.stringify(data));
    window.location.href = data.checkoutUrl
})
