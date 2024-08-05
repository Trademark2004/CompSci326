const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    addSampleData();
});

async function addSampleData() {
    try {
        const course = {
            _id: 'course_123',
            title: 'Astronomy 101',
            description: 'This course covers the basics of Astronomy.',
            students: [],
            content: [
                { id: 'file_1', name: 'Introduction to Astronomy.pdf' },
                { id: 'file_2', name: 'The Solar System.mp4' }
            ],
            quizzes: [
                {
                    id: 'quiz_456',
                    questions: [
                        { question: 'What is the closest planet to the Sun?', answer: 'Mercury' },
                        { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
                        { question: 'What galaxy is Earth located in?', answer: 'Milky Way' }
                    ],
                    attempts: []
                }
            ]
        };

        await db.put(course);
        console.log('Sample data added successfully!');
    } catch (error) {
        console.error('Error adding sample data:', error);
    }
}
