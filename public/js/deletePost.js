// Delete post handler function
const deletePostFormHandler = async (event) => {

    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
  
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert("Failed to delete post.");
      }
    }
  };
  
  // Add event listener to delete post button
  document
    .querySelector("#delete-post-btn")
    .addEventListener("click", deletePostFormHandler);
  