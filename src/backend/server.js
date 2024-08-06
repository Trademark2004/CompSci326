import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes.js';
import PouchDB from 'pouchdb';

const db = new PouchDB('courses');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    verifyAndCreateCourse();
});

async function verifyAndCreateCourse() {
    const courseId = 'course_123';
    try {
        const course = await db.get(courseId);
        console.log('Course already exists:', course);
    } catch (error) {
        if (error.status === 404) {
            const course = {
                _id: courseId,
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
                            { question: 'What is the closest planet to the Sun?', options: ['Mercury', 'Venus', 'Earth', 'Mars'], answer: 'Mercury' },
                            { question: 'What is the largest planet in our solar system?', options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], answer: 'Jupiter' },
                            { question: 'What galaxy is Earth located in?', options: ['Milky Way', 'Andromeda', 'Triangulum', 'Whirlpool'], answer: 'Milky Way' }
                        ],
                        attempts: []
                    }
                ]
            };
            await db.put(course);
            console.log('Course created successfully!');
        } else {
            console.error('Error fetching course data:', error);
        }
    }
}
