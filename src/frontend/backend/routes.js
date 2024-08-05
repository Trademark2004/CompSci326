const express = require('express');
const db = require('./db');
const router = express.Router();


// Retrieve course content
router.get('/courses/:courseId/content', async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await db.get(courseId);
        res.status(200).send(course.content);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Download specific content file
router.get('/courses/:courseId/content/:fileId', async (req, res) => {
    const { courseId, fileId } = req.params;

    try {
        const course = await db.get(courseId);
        const file = course.content.find(f => f.id === fileId);
        res.status(200).send(file);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Create and manage quizzes
router.post('/courses/:courseId/quizzes', async (req, res) => {
    const { courseId } = req.params;
    const { quiz } = req.body;

    try {
        const course = await db.get(courseId);
        course.quizzes.push(quiz);
        await db.put(course);
        res.status(200).send(course);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Start quiz attempt
router.post('/courses/:courseId/quizzes/:quizId/attempt', async (req, res) => {
    const { courseId, quizId } = req.params;
    const { attempt } = req.body;
    console.log(`Submitting attempt for course ${courseId}, quiz ${quizId}`);

    try {
        const course = await db.get(courseId);
        const quiz = course.quizzes.find(q => q.id === quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        quiz.attempts.push(attempt);
        await db.put(course);
        res.status(200).json(quiz);
    } catch (error) {
        console.error('Error submitting quiz attempt:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//Show quiz results
    const { courseId, quizId } = req.params;
    console.log(`Fetching results for course ${courseId}, quiz ${quizId}`);

    try {
        const course = await db.get(courseId);
        const quiz = course.quizzes.find(q => q.id === quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(quiz.attempts);
    } catch (error) {
        console.error('Error fetching quiz results:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

module.exports = router;
