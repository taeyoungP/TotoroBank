const sequelize = require('../config/connection');
const { User, Account } = require('../models');

const userData = require('./userData.json');
const accountData = require('./accountData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const accounts = await Account.bulkCreate(accountData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();