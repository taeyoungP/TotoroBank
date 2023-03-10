// (/ => login page)
// (/homepage => main page once user logged in)
// (/viewAccount => user's account information) (accessible from nav bar)

const router = require('express').Router();
const { User, Account, Transaction } = require('../models');
const withAuth = require('../utils/auth');

//Initial Page (LOGIN)
router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }

    res.render('login'); //render login.handlebars
});

// When user loggedin 
router.get('/homepage', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ Model: Account }]
        });

        const user = userData.get({ plain: true });

        res.render('homepage', {
            ...user,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err);  
    }
});

router.get('/viewAccount', withAuth, async (req, res) => {
    try {
        const accountData = await Account.findAll({
            include: [{ model: User }, { model: Transaction }]
        });
    } catch (err){
        res.status(500).json(err);  
    }
});

// added routes for handling error

// can we use this for error handling on the server.js? But add in the new route of a 404 page?

// app.use((req, res) => {
//     res.status(404).send('Sorry, we cannot find that!');
//   });