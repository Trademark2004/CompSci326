document.addEventListener("DOMContentLoaded", () => {
    const homeView = document.getElementById("homeView");
    const profileView = document.getElementById("profileView");
    const coursesView = document.getElementById("coursesView");
    const courseInfo = document.getElementById("courseInfo");
    const courseDescription = document.getElementById("courseDescription");

    const homeButton = document.getElementById("homeButton");
    const profileButton = document.getElementById("profileButton");
    const coursesButton = document.getElementById("coursesButton");
    const logoutButton = document.getElementById("logoutButton");

    homeButton.addEventListener("click", () => {
        showView("home");
    });

    profileButton.addEventListener("click", () => {
        showView("profile");
    });

    coursesButton.addEventListener("click", () => {
        showView("courses");
    });

    logoutButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    document.getElementById("profileForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const pronouns = document.getElementById("pronouns").value;
        // Save the name and pronouns to local storage or send to server
        localStorage.setItem("name", name);
        localStorage.setItem("pronouns", pronouns);
        alert("Profile updated successfully!");
    });

    document.querySelectorAll(".course-box").forEach((course) => {
        course.addEventListener("click", () => {
            const info = course.getAttribute("data-info");
            const courseId = course.getAttribute("data-id");
            localStorage.setItem("courseInfo", info);
            localStorage.setItem("courseId", courseId);
            window.location.href = "course.html";
        });
    });

    function showView(view) {
        homeView.style.display = "none";
        profileView.style.display = "none";
        coursesView.style.display = "none";
        courseInfo.style.display = "none";

        if (view === "home") {
            homeView.style.display = "block";
        } else if (view === "profile") {
            profileView.style.display = "block";
        } else if (view === "courses") {
            coursesView.style.display = "block";
        }
    }
});
