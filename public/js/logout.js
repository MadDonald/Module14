// Defining logout function
const logout = async () => {
  // Send POST request to server to logout user
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  // If the logout is successful, redirect the user to the homepage
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to logout"); // If the logout is unsuccessful, display an alert message
  }
};

// Attach the logout function to the click event of the logout button
document.querySelector("#logout").addEventListener("click", logout);
