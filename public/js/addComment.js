// function that handles submitting the comment
const commentFormHandler = async (event) => {
  event.preventDefault();

  // Get the comment contents from the form input field
  const contents = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

 // Get the post ID from the URL
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // If the comment contents field is not empty
  if (contents) {
  
    // Send a POST request to the /api/comment route with the post ID and comment contents
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ post_id, contents }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to comment.");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
