const router = require('express').Router();
const userRoutes = require('./userRoutes');
const accountRoutes = require('./accountRoutes');
const depositRoutes = require('./depositRoutes');


router.use('/users', userRoutes);
router.use('/accounts', accountRoutes);
router.use('/deposits', depositRoutes);

module.exports = router;
