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

// Fetch course data
router.get('/courses/:courseId', async (req, res) => {
  const { courseId } = req.params;
  console.log(`Fetching data for course ${courseId}`);

  try {
    const course = await db.get(courseId);
    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch quiz questions
router.get('/courses/:courseId/quiz', async (req, res) => {
  const { courseId } = req.params;
  console.log(`Fetching quiz for course ${courseId}`);

  try {
    const course = await db.get(courseId);
    res.status(200).json(course.quiz || []);
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a quiz question
router.post('/courses/:courseId/quiz', async (req, res) => {
  const { courseId } = req.params;
  const { question, options, answer } = req.body;

  try {
    const course = await db.get(courseId);
    const quiz = course.quiz || [];
    quiz.push({ id: `question_${quiz.length + 1}`, question, options, answer });
    course.quiz = quiz;
    await db.put(course);
    res.status(200).json({ message: 'Quiz question added successfully' });
  } catch (error) {
    console.error('Error adding quiz question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a quiz question
router.put('/courses/:courseId/quiz/:questionId', async (req, res) => {
  const { courseId, questionId } = req.params;
  const { question, options, answer } = req.body;

  try {
    const course = await db.get(courseId);
    const quiz = course.quiz || [];
    const questionIndex = quiz.findIndex(q => q.id === questionId);
    if (questionIndex !== -1) {
      quiz[questionIndex] = { id: questionId, question, options, answer };
      await db.put(course);
      res.status(200).json({ message: 'Quiz question updated successfully' });
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    console.error('Error updating quiz question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a quiz question
router.delete('/courses/:courseId/quiz/:questionId', async (req, res) => {
  const { courseId, questionId } = req.params;

  try {
    const course = await db.get(courseId);
    course.quiz = course.quiz || [];
    course.quiz = course.quiz.filter(q => q.id !== questionId);
    await db.put(course);
    res.status(200).json({ message: 'Quiz question deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
