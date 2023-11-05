// Try to log the user in from the client to the API
const loginFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector(".username-input").value.trim();
    const password = document.querySelector(".password-input").value.trim();

    if (username && password) {
        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Failed to login. " + response.status + ": " + response.statusText);
        }
    } else {
        alert("Please fill out all fields.");
    }
};

// Event listener
document
    .querySelector(".login-button")
    .addEventListener("click", loginFormHandler);
