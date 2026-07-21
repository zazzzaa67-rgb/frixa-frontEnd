const refCode = new URLSearchParams(window.location.search).get("ref");
if (refCode) {
    localStorage.setItem("refCode", refCode);
}
const savedRef = localStorage.getItem("refCode");
console.log("savedRef =", savedRef);
if (
    savedRef &&
    !sessionStorage.getItem("visitorCounted")
) {
    fetch("http://localhost:5000/api/auth/visitor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ refCode: savedRef })
    });
    sessionStorage.setItem("visitorCounted", "true");
}