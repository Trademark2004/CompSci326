document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Show loading spinner
  const loadingSpinner = document.createElement("div");
  loadingSpinner.className = "spinner";
  document.body.appendChild(loadingSpinner);

  try {
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
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
