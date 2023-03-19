const router = require("express").Router();
const { Account, User, Transaction } = require("../../models");
const withAuth = require("../../utils/auth");

//add post method for creating account to user
router.post("/", withAuth, async (req, res) => {
  try {
    const newAccount = await Account.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newAccount);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  //get all accounts
  try {
    const accountData = await Account.findAll();

    res.status(200).json(accountData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get account by id (retrieve data of one of the accounts)
router.get("/:id", withAuth, async (req, res) => {
  try {
    const accountData = await Account.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Transaction,
        },
      ],
    });

    res.status(200).json(accountData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//add post method for adding transaction to account
router.post("/:id", withAuth, async (req, res) => {
  try {
    const newTransaction = await Transaction.create({
      ...req.body,
      account_id: req.params.id,
    });

    res.status(200).json(newTransaction);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
