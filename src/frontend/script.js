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
      showError("The username and password are incorrect (use \"user1\" and \"pass1\" to access the site or click \"forgot username/password\ to create login info)" );
    }
  } catch (error) {
    showError("An error occurred. Please try again.");
  } finally {
    // Remove loading spinner
    document.body.removeChild(loadingSpinner);
  }
});

document.getElementById("forgotButton").addEventListener("click", () => {
  document.querySelector(".login-container").style.display = "none";
  document.querySelector(".create-account-container").style.display = "block";
});

document.getElementById("createAccountForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const newUsername = document.getElementById("newUsername").value;
  const newPassword = document.getElementById("newPassword").value;

  try {
    const response = await fetch("http://localhost:3001/api/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newUsername, newPassword }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Account created successfully! Please log in with your new credentials.");
      document.querySelector(".create-account-container").style.display = "none";
      document.querySelector(".login-container").style.display = "block";
    } else {
      showError(result.message);
    }
  } catch (error) {
    showError("An error occurred. Please try again.");
  }
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
