document.addEventListener('DOMContentLoaded', function() {
    const studentDetailsForm = document.getElementById('studentDetailsForm');
    const quizForm = document.getElementById('quizForm');

    if (studentDetailsForm) {
        studentDetailsForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const rollNumber = document.getElementById('rollNumber').value;
            const name = document.getElementById('name').value;
            const batch = document.getElementById('batch').value;
            const section = document.getElementById('section').value;

            const studentDetails = {
                rollNumber: rollNumber,
                name: name,
                batch: batch,
                section: section
            };

            sessionStorage.setItem('studentDetails', JSON.stringify(studentDetails));

            window.location.href = 'test.html';
        });
    }

    if (quizForm) {
        quizForm.addEventListener('submit', function(event) {
            event.preventDefault();


            // Define correct answers for each question
            const correctAnswers = {
                q1: '4', // Question 1 correct answer
                q2: '2',
                q3: '3',
                q4: '2',
                q5: '1' // Define correct answers for other questions in a similar manner
            };

            let marks = 0;

            // Loop through each question in the form
            for (let i = 1; i <= 5; i++) {
                const questionName = 'q' + i;
                const selectedAnswer = document.querySelector('input[name="' + questionName + '"]:checked');

                // Check if an answer is selected for the question
                if (selectedAnswer) {
                    // Compare selected answer with correct answer
                    if (selectedAnswer.value === correctAnswers[questionName]) {
                        marks++; // Increment marks for correct answer
                    }
                }
            }

            // Store marks in session storage
            sessionStorage.setItem('quizMarks', marks);

            // Redirect to results page
            window.location.href = 'result.html';
        });
    }

    // Retrieve student details from session storage
    const studentDetails = JSON.parse(sessionStorage.getItem('studentDetails'));

    // Display student details
    if (studentDetails) {
        const studentDetailsDiv = document.getElementById('studentDetails');
        studentDetailsDiv.innerHTML = `
            <p><strong>Roll Number:</strong> ${studentDetails.rollNumber}</p>
            <p><strong>Name:</strong> ${studentDetails.name}</p>
            <p><strong>Batch:</strong> ${studentDetails.batch}</p>
            <p><strong>Section:</strong> ${studentDetails.section}</p>
        `;
    }

    // Retrieve quiz details from session storage
    const quizTopic = sessionStorage.getItem('quizTopic');

    // Display quiz details
    if (quizTopic) {
        const quizDetailsDiv = document.getElementById('quizDetails');
        quizDetailsDiv.innerHTML = `
            <p><strong>Topic:</strong> ${quizTopic}</p>`;
    }

    // Retrieve marks from session storage
    const marks = sessionStorage.getItem('quizMarks');

    // Display total marks
    if (marks) {
        const totalMarksDiv = document.getElementById('totalMarks');
        totalMarksDiv.innerHTML = `
            <p><strong>Total Marks:</strong> ${marks*10} out of 50</p>`;
    }

    // Retrieve selected answers from session storage
    const selectedAnswers = JSON.parse(sessionStorage.getItem('selectedAnswers'));

    // Display selected answers
    if (selectedAnswers) {
        const answersDiv = document.getElementById('selectedAnswers');
        let answersHTML = '<h2>Selected Answers</h2>';
        for (let question in selectedAnswers) {
            answersHTML += `<p><strong>Question ${question}:</strong> ${selectedAnswers[question]}</p>`;
        }
        answersDiv.innerHTML = answersHTML;
    }

    // Retrieve correct answers from session storage
    const correctAnswers = JSON.parse(sessionStorage.getItem('correctAnswers'));

    // Display correct answers
    if (correctAnswers) {
        const correctAnswersDiv = document.getElementById('correctAnswers');
        let correctAnswersHTML = '<h2>Correct Answers</h2>';
        for (let question in correctAnswers) {
            correctAnswersHTML += `<p><strong>Question ${question}:</strong> ${correctAnswers[question]}</p>`;
        }
        correctAnswersDiv.innerHTML = correctAnswersHTML;
    }
});
