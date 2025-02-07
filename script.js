// Track quiz start time
const startTime = Date.now();

// Correct answers
const correctAnswers = {
    q1: "d",
    q2: "c",
    q3: "a",
    q4: "e",
    q5: "c"
};

// Handle quiz submission
document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Calculate time spent
    const endTime = Date.now();
    const timeSpent = ((endTime - startTime) / 1000).toFixed(2);

    let studentName = document.getElementById("studentName").value;
    let answers = {};
    let score = 0;
    let totalQuestions = 5;

    // Loop through questions
    Object.keys(correctAnswers).forEach((key) => {
        let selectedOption = document.querySelector(`input[name="${key}"]:checked`);
        if (selectedOption) {
            answers[key] = selectedOption.value;
            if (selectedOption.value === correctAnswers[key]) {
                score++;
            }
        }
    });

    let percentage = (score / totalQuestions) * 100;
    let grade = percentage >= 80 ? "A" : percentage >= 70 ? "B" : percentage >= 60 ? "C" : percentage >= 50 ? "D" : "F";
    let comment = grade === "A" ? "Excellent!" : grade === "B" ? "Good Job!" : grade === "C" ? "Fair Effort" : grade === "D" ? "Needs Improvement" : "Better luck next time!";

    // Display results
    let resultHTML = `
        <p><strong>Name:</strong> ${studentName}</p>
        <p><strong>Score:</strong> ${score}/${totalQuestions} (${percentage.toFixed(2)}%)</p>
        <p><strong>Grade:</strong> ${grade}</p>
        <p><strong>Comment:</strong> ${comment}</p>
        <p><strong>Time Spent:</strong> ${timeSpent} seconds</p>
        <h3>Correct Answers</h3>
        <table id="quizResultsTable">
            <tr><th>Question</th><th>Correct Answer</th><th>Your Answer</th></tr>
    `;

    Object.keys(correctAnswers).forEach((key, index) => {
        resultHTML += `
            <tr>
                <td>Question ${index + 1}</td>
                <td>${correctAnswers[key]}</td>
                <td>${answers[key] || "Not answered"}</td>
            </tr>
        `;
    });

    resultHTML += "</table>";
    document.getElementById("result").innerHTML = resultHTML;

    // Reset form
    document.getElementById("quizForm").reset();
});
