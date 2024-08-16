document.addEventListener("DOMContentLoaded", () => {
    const courseTitle = document.getElementById("courseTitle");
    const courseDescription = document.getElementById("courseDescription");
    const courseImage = document.getElementById("courseImage");
    const backButton = document.getElementById("backButton");
    const summaryTab = document.getElementById("summaryTab");
    const filesTab = document.getElementById("filesTab");
    const quizTab = document.getElementById("quizTab");
    const summaryView = document.getElementById("summaryView");
    const filesView = document.getElementById("filesView");
    const quizView = document.getElementById("quizView");
    const quizForm = document.getElementById("quizForm");
    const filesList = document.getElementById("filesList");

    const courseInfo = localStorage.getItem("courseInfo");
    const courseId = localStorage.getItem("courseId");

    courseTitle.textContent = "Course Details";
    courseDescription.textContent = courseInfo;

    if (courseId === "anthropology_101") {
        courseImage.src = "https://h-o-m-e.org/wp-content/uploads/2022/12/anthropology_1672308158-1024x576.webp";
        filesList.innerHTML = `
            <li>File 1: <a href="https://open.umn.edu/opentextbooks/textbooks/1150" target="_blank">Anthropology textbook</a></li>
            <li>File 2: <a href="https://www.youtube.com/watch?v=2T9naLwRtQ4" target="_blank">Anthropology Introduction video</a></li>
        `;
        quizForm.innerHTML = `
            <div class="question">
                <label>Question 1: What is the study of human societies and cultures and their development?</label><br>
                <input type="radio" name="question1" value="Anthropology"> Anthropology<br>
                <input type="radio" name="question1" value="Sociology"> Sociology<br>
                <input type="radio" name="question1" value="Psychology"> Psychology<br>
                <input type="radio" name="question1" value="Archaeology"> Archaeology<br>
            </div>
            <div class="question">
                <label>Question 2: Who is considered the father of American anthropology?</label><br>
                <input type="radio" name="question2" value="Franz Boas"> Franz Boas<br>
                <input type="radio" name="question2" value="Bronisław Malinowski"> Bronisław Malinowski<br>
                <input type="radio" name="question2" value="Margaret Mead"> Margaret Mead<br>
                <input type="radio" name="question2" value="Claude Lévi-Strauss"> Claude Lévi-Strauss<br>
            </div>
            <div class="question">
                <label>Question 3: What is the term for the process by which children learn the culture of their society?</label><br>
                <input type="radio" name="question3" value="Enculturation"> Enculturation<br>
                <input type="radio" name="question3" value="Acculturation"> Acculturation<br>
                <input type="radio" name="question3" value="Assimilation"> Assimilation<br>
                <input type="radio" name="question3" value="Socialization"> Socialization<br>
            </div>
            <button type="submit">Submit Quiz</button>
        `;
    } else if (courseId === "astronomy_101") {
        courseImage.src = "https://www.worldatlas.com/r/w1200/upload/b2/b6/94/shutterstock-300203846.jpg";
        filesList.innerHTML = `
            <li>File 1: <a href="https://ai.stanford.edu/~nilsson/MLBOOK.pdf" target="_blank">Introduction to Astronomy Syllabus</a></li>
            <li>File 2: <a href="https://www.youtube.com/watch?v=Hk34Xrm3ssU" target="_blank">Astronomy Introduction Video</a></li>
        `;
        quizForm.innerHTML = `
            <div class="question">
                <label>Question 1: What is the closest planet to the Sun?</label><br>
                <input type="radio" name="question1" value="Mercury"> Mercury<br>
                <input type="radio" name="question1" value="Venus"> Venus<br>
                <input type="radio" name="question1" value="Earth"> Earth<br>
                <input type="radio" name="question1" value="Mars"> Mars<br>
            </div>
            <div class="question">
                <label>Question 2: What is the largest planet in our solar system?</label><br>
                <input type="radio" name="question2" value="Jupiter"> Jupiter<br>
                <input type="radio" name="question2" value="Saturn"> Saturn<br>
                <input type="radio" name="question2" value="Uranus"> Uranus<br>
                <input type="radio" name="question2" value="Neptune"> Neptune<br>
            </div>
            <div class="question">
                <label>Question 3: What galaxy is Earth located in?</label><br>
                <input type="radio" name="question3" value="Milky Way"> Milky Way<br>
                <input type="radio" name="question3" value="Andromeda"> Andromeda<br>
                <input type="radio" name="question3" value="Triangulum"> Triangulum<br>
                <input type="radio" name="question3" value="Whirlpool"> Whirlpool<br>
            </div>
            <button type="submit">Submit Quiz</button>
        `;
    }

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
    });

    quizForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(quizForm);
        const quizData = {
            question1: formData.get("question1"),
            question2: formData.get("question2"),
            question3: formData.get("question3")
        };

        const correctAnswers = {
            anthropology_101: {
                question1: "Anthropology",
                question2: "Franz Boas",
                question3: "Enculturation"
            },
            astronomy_101: {
                question1: "Mercury",
                question2: "Jupiter",
                question3: "Milky Way"
            }
        };

        const answers = correctAnswers[courseId];
        let correctCount = 0;

        for (const question in answers) {
            if (quizData[question] === answers[question]) {
                correctCount++;
            }
        }

        alert(`Quiz submitted successfully! You got ${correctCount} out of 3 questions right.`);
    });

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
