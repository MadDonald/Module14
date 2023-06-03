// This function handles the form submission to create a new post
const postFormHandler = async (event) => {
  event.preventDefault();


  // Get the values of the title and contents fields
  const title = document.querySelector("#title").value.trim();
  const contents = document.querySelector("#contents").value.trim();


  // If both fields have a value ....Send a POST request to create a new post with the provided title and contents
  if (title && contents) { 
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ title, contents }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to add post.");
    }
  }
};

// Add a listener to the form to handle the submission
document
  .querySelector(".post-form")
  .addEventListener("submit", postFormHandler);
