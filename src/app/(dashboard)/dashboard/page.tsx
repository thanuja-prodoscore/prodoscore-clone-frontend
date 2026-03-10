"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

export default function DashboardPage() {
  const [userInfo, setUserInfo] = useState({ email: "", name: "" });

  useEffect(() => {
    const idToken = localStorage.getItem("token");
    if (!idToken) return;

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();
          console.log("Token claims:", tokenResult.claims);

          setUserInfo({
            email: user.email || (tokenResult.claims.email as string) || "",
            name: user.displayName || (tokenResult.claims.name as string) || "",
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        const decoded = JSON.parse(atob(idToken.split(".")[1]));
        setUserInfo({
          email: decoded.email || "",
          name: decoded.name || "",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Welcome, {userInfo.name}!</h1>
      <p>Email: {userInfo.email}</p>
    </div>
  );
}