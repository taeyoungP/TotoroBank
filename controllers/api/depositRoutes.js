const router = require("express").Router();
const { Account, User, Transaction } = require("../../models");
const withAuth = require("../../utils/auth");

//router get deposit page
//retrieve account data of req.session.user_id
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Account,
          include: {
            model: Transaction,
          },
        },
      ],
    });

    const user = userData.get({ plain: true });
    //console.log(user);

    //res.status(200).json(userData);

    res.render("deposit", {
      ...user,
      logged_in: true, //to grab user account data, (user.)accounts
      //#each accounts as |account|
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//router to add balance (deposit)
router.put("/:id", withAuth, async (req, res) => {
  try {
    const accountBalanceData = await Account.findByPk(req.params.id, {
      attributes: ["balance", "user_id"],
    });
    //console.log(req.session.user_id);
    //console.log(req.params.id);
    //console.log(accountBalanceData.balance);

    //get user_id from account balance data and compare with user session id if they matches. if not send error msg

    if (req.session.user_id !== accountBalanceData.user_id) {
      res
        .status(404)
        .json({ message: "User ID does not match with logged in user" });
      return;
    }

    const newTransaction = await Transaction.create({
      title: "Deposit",
      transaction_desc: "Deposited $" + req.body.amount + ".",
      amount: req.body.amount,
      account_id: req.params.id,
    });

    const updatedAccount = await Account.update(
      {
        balance: accountBalanceData.balance + req.body.amount,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedAccount) {
      res.status(404).json({ message: "No account found with this id!" });
      return;
    }

    res.status(200).json(newTransaction);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
