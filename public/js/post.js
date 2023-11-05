// Submit a comment
const submitCommentHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector(".comment-input").value.trim();
    const user_id = document.querySelector(".logged-in-user-id").textContent; 
    const post_id = document.querySelector(".current-post-id").textContent;

    if (!user_id) {
        document.location.replace("/login");
    } else {
        if (comment) {
            const response = await fetch("/api/comment/", {
                method: "POST",
                body: JSON.stringify({ comment, user_id, post_id }),
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                document.location.replace("/post/" + post_id + "#comment-section");
                //Reloading the page
                document.location.reload();
            } else {
                alert(
                    "Failed to submit comment. " +
                    response.status +
                    ": " +
                    response.statusText
                );
            }
        } else {
            alert("Please fill out all fields.");
        }
    }
};

// Delete a comment on the client to API
const deleteCommentHandler = async (event) => {
    event.preventDefault();

    const deleteCommentId = event.target.getAttribute("data-id");
    const currentPostId = document.querySelector(".current-post-id").textContent;

    if (deleteCommentId) {
        const response = await fetch("/api/comment/" + deleteCommentId, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/post/" + currentPostId + "#comment-section");
            
            document.location.reload();
        } else {
            alert(
                "Failed to delete post. " +
                response.status +
                ": " +
                response.statusText
            );
        }
    }
};

// Add event listeners
document
    .querySelector(".comment-submit")
    .addEventListener("click", submitCommentHandler);

const deleteLinks = document.querySelectorAll(".delete-comment");
deleteLinks.forEach((el) =>
    el.addEventListener("click", (event) => deleteCommentHandler(event))
);
