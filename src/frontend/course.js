document.addEventListener("DOMContentLoaded", () => {
    const courseTitle = document.getElementById("courseTitle");
    const courseDescription = document.getElementById("courseDescription");
    const backButton = document.getElementById("backButton");
    const summaryTab = document.getElementById("summaryTab");
    const filesTab = document.getElementById("filesTab");
    const quizTab = document.getElementById("quizTab");
    const summaryView = document.getElementById("summaryView");
    const filesView = document.getElementById("filesView");
    const quizView = document.getElementById("quizView");
    const quizForm = document.getElementById("quizForm");
    const quizResults = document.getElementById("quizResults");
    const resultsList = document.getElementById("resultsList");

    const courseInfo = localStorage.getItem("courseInfo");
    courseTitle.textContent = "Course Details";
    courseDescription.textContent = courseInfo;

    backButton.addEventListener("click", () => {
        window.location.href = "home.html";
    });

    summaryTab.addEventListener("click", () => {
        showView("summary");
    });

    filesTab.addEventListener("click", () => {
        showView("files");
    });

    quizTab.addEventListener("click", () => {
        showView("quiz");
        fetchQuizResults();
    });

    quizForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(quizForm);
        const quizData = {
            question1: formData.get("question1"),
            question2: formData.get("question2"),
            question3: formData.get("question3")
        };

        try {
            const response = await fetch('/api/courses/course_123/quizzes/quiz_456/attempt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ attempt: quizData })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            alert("Quiz submitted successfully!");
            fetchQuizResults();
        } catch (error) {
            console.error('Error:', error);
            alert("Failed to submit quiz.");
        }
    });

    async function fetchQuizResults() {
        try {
            const response = await fetch('/api/courses/course_123/quizzes/quiz_456/results');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const results = await response.json();
            displayQuizResults(results);
        } catch (error) {
            console.error('Error:', error);
            alert("Failed to fetch quiz results.");
        }
    }

    function displayQuizResults(results) {
        resultsList.innerHTML = '';
        results.forEach((result, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Attempt ${index + 1}: ${JSON.stringify(result)}`;
            resultsList.appendChild(listItem);
        });
        quizResults.style.display = 'block';
    }

    function showView(view) {
        summaryView.style.display = "none";
        filesView.style.display = "none";
        quizView.style.display = "none";

        if (view === "summary") {
            summaryView.style.display = "block";
        } else if (view === "files") {
            filesView.style.display = "block";
        } else if (view === "quiz") {
            quizView.style.display = "block";
        }
    }

    // Show the summary view by default
    showView("summary");
});
