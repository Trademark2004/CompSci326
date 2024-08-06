import express from 'express';
import PouchDB from 'pouchdb';

const db = new PouchDB('courses');
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Implement your login logic here
  res.status(200).json({ success: true });
});

// Submit quiz attempt
router.post('/courses/:courseId/quizzes/:quizId/attempt', async (req, res) => {
  const { courseId, quizId } = req.params;
  const { attempt } = req.body;

  try {
    const course = await db.get(courseId);
    const quiz = course.quizzes.find(q => q.id === quizId);
    if (quiz) {
      quiz.attempts.push({ attempt, timestamp: new Date() });
      await db.put(course);
      res.status(200).json({ message: 'Quiz attempt submitted successfully' });
    } else {
      res.status(404).json({ error: 'Quiz not found' });
    }
  } catch (error) {
    console.error('Error submitting quiz attempt:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch quiz results
router.get('/courses/:courseId/quizzes/:quizId/results', async (req, res) => {
  const { courseId, quizId } = req.params;
  console.log(`Fetching results for quiz ${quizId} in course ${courseId}`);

  try {
    const course = await db.get(courseId);
    console.log('Course data:', course);
    const quiz = course.quizzes.find(q => q.id === quizId);
    if (quiz) {
      console.log('Quiz data:', quiz);
      res.status(200).json(quiz.attempts);
    } else {
      console.log('Quiz not found');
      res.status(404).json({ error: 'Quiz not found' });
    }
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;