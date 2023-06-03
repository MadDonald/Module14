// Edit comment form submission handler
const editFormHandler = async (event) => {

    // Check if the clicked element has a data-id attribute
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
      const postId = document.querySelector("#post-id").getAttribute("value");
  
       // Get the updated contents from the form
      const contents = document.querySelector("#updated_contents").value; 
  
      // Send a PUT request to update the comment with the given id
      const response = await fetch(`/api/comment/${id}`, {
        method: "PUT",
        body: JSON.stringify({ contents }),
        headers: { "Content-Type": "application/json" },
      });
  
      // Redirection If the request is successful otherwise
      if (response.ok) {
        document.location.replace(`/post/${postId}`);
      } else {
        alert("Failed to edit comment.");
      }
    }
  };
  
  document.querySelector("#edit-btn").addEventListener("click", editFormHandler);
  