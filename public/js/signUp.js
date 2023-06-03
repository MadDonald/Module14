// A function to handle the form submission for signing up a new user
const signupFormHandler = async (event) => {
  event.preventDefault();
// Get the values of the username and password fields from the signup form
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  
// Check if both username and password have been provided
  if (username && password) {
    const response = await fetch("/api/users", { // Send a POST request to the server to create a new user
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/"); // If the response is successful, redirect the user to the homepage
    } else {
      alert("Failed to sign up."); // If the response is not successful, show an error message fail to sign up
    }
  }
};

// Add an event listener to the signup form to call the signupFormHandler function on 
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
