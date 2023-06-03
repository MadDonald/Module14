// Function to handle the form submission when a user tries to log in
const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevent default behavior of form submission

  
  // Get the values entered by the user for username and password
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();


 // If both the username and password are entered, make a fetch request to login the user  
  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

// If the response is OK, redirect the user to their dashboard, otherwise display an error message
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to login.");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
