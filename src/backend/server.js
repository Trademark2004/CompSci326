import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes.js';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    addSampleData();
});

async function addSampleData() {
    try {
        const courseId = 'course_123';
        const existingCourse = await db.get(courseId).catch(err => {
            if (err.status === 404) {
                return null;
            } else {
                throw err;
            }
        });

        const course = {
            _id: courseId,
            _rev: existingCourse ? existingCourse._rev : undefined,
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
