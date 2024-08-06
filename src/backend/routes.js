import express from 'express';
import PouchDB from 'pouchdb';

const db = new PouchDB('courses');
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt: ${username}`);

  try {
    const user = await db.get(username);
    if (user.password === password) {
      res.status(200).json({ success: true });
    } else {
      console.log('Incorrect password');
      res.status(401).json({ success: false, message: 'Incorrect username or password' });
    }
  } catch (error) {
    if (error.status === 404) {
      console.log('User not found');
      res.status(401).json({ success: false, message: 'Incorrect username or password' });
    } else {
      console.error('Internal server error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
});

// Create account route
router.post('/create-account', async (req, res) => {
  const { newUsername, newPassword } = req.body;
  console.log(`Create account attempt: ${newUsername}`);

  if (!newUsername || !newPassword) {
    console.log('Missing username or password');
    return res.status(400).json({ success: false, message: 'Missing username or password' });
  }

  try {
    const user = await db.get(newUsername);
    return res.status(400).json({ success: false, message: 'Username already exists.' });
  } catch (error) {
    if (error.status === 404) {
      await db.put({ _id: newUsername, password: newPassword });
      return res.status(201).json({ success: true, message: 'Account created successfully.' });
    }
    console.error('Internal server error:', error);
    return res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
  }
});

// Submit quiz attempt
router.post('/courses/:courseId/quizzes/:quizId/attempt', async (req, res) => {
  const { courseId, quizId } = req.params;
  const { attempt } = req.body;

  try {
    const course = await db.get(courseId);
    const quiz = course.quizzes.find(q => q.id === quizId);
    if (quiz) {
      let correctAnswers = 0;
      quiz.questions.forEach((question, index) => {
        if (question.answer === attempt[`question${index + 1}`]) {
          correctAnswers++;
        }
      });

      quiz.attempts.push({ attempt, correctAnswers, timestamp: new Date() });
      await db.put(course);
      res.status(200).json({ message: 'Quiz attempt submitted successfully', correctAnswers });
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
