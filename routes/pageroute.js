const express = require('express');
const router = express.Router();
const Adoption = require('../models/adoption');


router.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});


router.get('/', (req, res) => {
  res.render('index');
});

router.get('/dashboard', async (req, res) => {
  try {
    const adoptions = await Adoption.getAll();
    res.render('gallery', { adoptions });
  } catch (err) {
    console.error('Error fetching adoptions:', err);
    res.render('gallery', { adoptions: [] });
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/about', (req, res) => {
  res.render('blog');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/contactus', (req, res) => {
  res.render('contactus');
});

router.get('/adopt', (req, res) => {
  res.render('adopt', { formData: {}, error: null });
});

// POST Route for Adoption Form 
router.post('/submit-adoption', async (req, res) => {
  try {
    const adoption = new Adoption(req.body);
    await adoption.save();
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Adoption submission error:', error);
    res.render('adopt', {
      error: 'Failed to submit form. Please check your data and try again.',
      formData: req.body
    });
  }
});

module.exports = router;