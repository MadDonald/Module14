// Delete comment handler function
const deleteFormHandler = async (event) => {
  const postId = document.querySelector("#post-id").getAttribute("value");

  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert("Failed to delete comment.");
    }
  }
};
// Add event listener to delete comment button
document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteFormHandler);
