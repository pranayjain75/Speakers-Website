const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;
  router.get('/', async (req, res) => {
    try {
      const artwork = await speakersService.getAllArtwork();
      const speakers = await speakersService.getList();
      return res.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:shortname', async (req, res) => {
    try {
      const artwork = await speakersService.getArtworkForSpeaker(req.params.shortname);
      const speaker = await speakersService.getSpeaker(req.params.shortname);
      return res.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers-details',
        speaker,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
