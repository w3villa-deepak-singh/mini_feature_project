const express = require('express');
const passport = require('passport');
  
const FRONTEND_URL = process.env.FRONTEND_URL;
const FRONTEND_FAILURE_URL = process.env.FRONTEND_FAILURE_URL;

// Start Google OAuth authentication
const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

// Handle Google OAuth callback
const googleCallback = passport.authenticate('google', {
  successRedirect: FRONTEND_URL,
  failureRedirect: FRONTEND_FAILURE_URL
});

// Handle authentication failure
const authFailure = (req, res) => {
  res.send('fail');
};

// Handle logout
const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

// Export the handlers
module.exports = { 
  googleAuth,
  googleCallback,
  authFailure,
  logout
};
