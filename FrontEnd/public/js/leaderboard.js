async function loadLeaderboard() {
    const res = await fetch(
        "http://localhost:5000/api/projects/leaderboard"
    );
    const marketers = await res.json();
    const body =
        document.getElementById("leaderboardBody");
    body.innerHTML = "";
    marketers.forEach((marketer, index) => {
        let rank = index + 1;
        if(rank === 1) rank = "🥇";
        else if(rank === 2) rank = "🥈";
        else if(rank === 3) rank = "🥉";
        body.innerHTML += `
            <tr>
                <td>${rank}</td>
                <td>${marketer.full_name}</td>
                <td>${marketer.visitors}</td>
                <td>${marketer.sales}</td>
                <td>${marketer.points}</td>
                <td>$${marketer.balance}</td>
            </tr>
        `;
    });
}

loadLeaderboard();