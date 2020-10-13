const express = require('express');
const router  = express.Router();

const Url = require('../models/Url');

router.get('/', async (req, res) => {
  const Urls = await Url.find();
  res.render('index', { Urls: Urls});
});

router.post('/shortUrls', async (req, res) => {
  await Url.create({ full: req.body.fullUrl });

  res.redirect('/');
});

router.get('/:shortUrl', async (req, res) => {
  const shrinkedUrl = await Url.findOne({ short: req.params.shortUrl });
  if (shrinkedUrl !== null) {
    shrinkedUrl.clicks++;
    shrinkedUrl.save();
    
    res.redirect(shrinkedUrl.full);
  } else {
    res.render('404');
  }
});

module.exports = router;
