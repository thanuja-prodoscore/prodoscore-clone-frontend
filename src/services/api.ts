export const verifyGoogleToken = async (idToken: string) => {
  const res = await fetch("http://localhost:3001/api/v1/employees/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to verify token");
  }

  return res.json();
};

export const basicEmployeeDetails = async(idToken: string) => {
  const res = await fetch("http://localhost:3001/api/v1/profile/basic", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    }
  })

  if(!res.ok){
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch Basic Data");
  }


  return res.json();
}