const payBtn = document.getElementById("pay")
const tokenRes = await fetch("http://localhost:5000/api/payment/token");
const { clientToken } = await tokenRes.json();
    Paddle.Initialize({
        token: clientToken
    });
payBtn.addEventListener('click' ,async ()=>{
    const res = await fetch('http://localhost:5000/api/payment/checkout' , {
        method: 'POST',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify({"projectId": 1}),
    })
    const data = await res.json()
    console.log(transaction.checkout.url)
    window.location.href = data.checkoutUrl;
})
