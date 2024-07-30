document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Show loading spinner
    const loadingSpinner = document.createElement("div");
    loadingSpinner.className = "spinner";
    document.body.appendChild(loadingSpinner);

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = { success: true };
      if (result.success) {
        // Store username in local storage
        localStorage.setItem("username", username);
        // Redirect to course list page
        window.location.href = "/home.html";
      } else {
        // Display error message
        showError(result.message);
      }
    } catch (error) {
      showError("An error occurred. Please try again.");
    } finally {
      // Remove loading spinner
      document.body.removeChild(loadingSpinner);
    }
  });

document.getElementById("forgotButton").addEventListener("click", () => {
  alert("Redirecting to forgot username/password page.");
});

function showError(message) {
  let errorDiv = document.getElementById("error");
  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.id = "error";
    errorDiv.className = "error-message";
    document.querySelector(".login-container").appendChild(errorDiv);
  }
  errorDiv.textContent = message;
}
