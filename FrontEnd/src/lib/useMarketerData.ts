"use client";

import { useEffect, useState } from "react";

export type MarketerProfile = {
  full_name: string;
  email: string;
  ref_code: string;
  visitors: number;
  sales: number;
  points: number;
  balance: number;
};

export type MarketerProject = {
  id: number;
  project_name: string;
  status: string;
  price: number | null;
  created_at: string;
};

const API = "https://forixa-backend.vercel.app";

export function useMarketerData() {
  const [profile, setProfile] = useState<MarketerProfile | null>(null);
  const [projects, setProjects] = useState<MarketerProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch(`${API}/api/auth/profile`, { headers }),
      fetch(`${API}/api/projects/my-projects`, { headers })
    ]).then(async ([profileResponse, projectsResponse]) => {
      if (profileResponse.status === 401 || profileResponse.status === 403) {
        localStorage.removeItem("token");
        window.location.replace("/login");
        return;
      }
      if (!profileResponse.ok) throw new Error("Could not load your account.");
      const profileData = await profileResponse.json() as MarketerProfile;
      setProfile(profileData);

      if (projectsResponse.ok) {
        const projectData = await projectsResponse.json();
        setProjects(Array.isArray(projectData) ? projectData : []);
      } else {
        setError("Your profile loaded, but projects could not be loaded.");
      }
    }).catch((loadError: unknown) => {
      setError(loadError instanceof Error ? loadError.message : "Could not load your account.");
    }).finally(() => setLoading(false));
  }, []);

  return { profile, projects, loading, error };
}
