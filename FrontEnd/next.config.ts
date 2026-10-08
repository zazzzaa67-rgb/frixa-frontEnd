import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: false },
      { source: "/details.html", destination: "/details", permanent: false },
      { source: "/logIn.html", destination: "/login", permanent: false },
      { source: "/signup.html", destination: "/signup", permanent: false },
      { source: "/pricing.html", destination: "/pricing", permanent: false },
      { source: "/Dashboard.html", destination: "/dashboard", permanent: false },
      { source: "/MarketerDashboard.html", destination: "/marketer-dashboard", permanent: false },
      { source: "/leaderboard.html", destination: "/leaderboard", permanent: false },
      { source: "/adminLogin.html", destination: "/admin-login", permanent: false },
      { source: "/adminDashboard.html", destination: "/admin-dashboard", permanent: false },
      { source: "/pyment.html", destination: "/payment", permanent: false },
      { source: "/privcy.html", destination: "/privacy", permanent: false },
      { source: "/refund.html", destination: "/refund", permanent: false },
      { source: "/terms.html", destination: "/terms", permanent: false },
      { source: "/service.html", has: [{ type: "query", key: "id", value: "(?<id>\\d+)" }], destination: "/service/:id", permanent: false },
      { source: "/service.html", destination: "/service/1", permanent: false }
    ];
  }
};

export default nextConfig;
