// (/ => login page)
// (/homepage => main page once user logged in)
// (/viewAccount => user's account information) (accessible from nav bar)

const router = require("express").Router();
const { User, Account, Transaction } = require("../models");
const withAuth = require("../utils/auth");

//Initial Page (LOGIN)

router.get("/", async (req, res) => {
  //If logged in redirect to homepage, else redirect to login page
  if (req.session.logged_in) {
    res.redirect("/homepage");
    return;
  }

  res.render("login"); //render login.handlebars
});

router.get("/deposit", async (req, res) => {
  res.render("deposit"); //render login.handlebars
});

router.get("/login", async (req, res) => {
  res.render("login"); //render login.handlebars
});

router.get("/signup", async (req, res) => {
  res.render("signup"); //render signup.handlebars
});

// When user loggedin, leads to homepage, which view account page
router.get("/homepage", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Account,
          include: {
            model: Transaction,
          },
        },
      ],
    });

    console.log(req.session.user_id);
    const user = userData.get({ plain: true });

    res.render("homepage", {
      //render homepage.handlebars for loggedin user and sending user data
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/*router.get('/account', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Account,
                include: {
                    model: Transaction
                }
            }
            ],
        });


        const user = userData.get({ plain: true });

        res.render('account', { //render account.handlebars for loggedin user
            ...user,
            logged_in: true
        });

        //res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});*/

// added routes for handling error

// can we use this for error handling on the server.js? But add in the new route of a 404 page?

// app.use((req, res) => {
//     res.status(404).send('Sorry, we cannot find that!');
//   });

module.exports = router;
