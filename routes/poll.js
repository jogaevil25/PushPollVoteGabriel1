const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '882812',
    key: 'cdc0209ebdb93405e413',
    secret: '41453e8b00faf9559e92',
    cluster: 'us2',
    encrypted: true
  });

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({ success: true, votes: votes}));
});

router.post('/', (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1
  }

  new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os
    });
  
    return res.json({succes: true,message : 'thank you for voting'});
  }); 
});

module.exports = router;