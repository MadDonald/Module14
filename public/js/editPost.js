// Function to handle updating a post
const editPostFormHandler = async (event) => {
    const postId = document.querySelector("#post-id").getAttribute("value"); // Get the post ID from the hidden input field
  
  
    // Get the updated title and contents from the form fields
    const title = document
      .querySelector('input[name="updated-post-title"]')
      .value.trim();
    const contents = document
      .querySelector('input[name="updated-post-contents"]')
      .value.trim();
  
      // Extractin the post ID from the URL
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
  
    const response = await fetch(`/api/posts/${id}`, { // Send a PUT request to update the post
      method: "PUT",
      body: JSON.stringify({ title, contents }),
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) { // If the update was successful, redirect to the post page
      document.location.replace(`/post/${postId}`);
    } else {
      alert("Failed to update post");
    }
  };
  
  // event listener to the "Edit Post" button
  document
    .querySelector("#edit-post-btn")
    .addEventListener("click", editPostFormHandler);
  