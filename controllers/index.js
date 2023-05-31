// We're bringing in all the tools we need
const router = require('express').Router();

// Importing routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

// Setting up routes
// When the user navigates to the root ('/') of the site, the server will use the homeRoutes
router.use('/', homeRoutes);

// When the user navigates to '/api', the server will use the apiRoutes
router.use('/api', apiRoutes);

// When the user navigates to '/dashboard', the server will use the dashboardRoutes
router.use('/dashboard', dashboardRoutes); 

// Finally, we make this file available to other parts of our app
module.exports = router;
