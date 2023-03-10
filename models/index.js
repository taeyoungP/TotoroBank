//Define models relation
const User = require('./User');
const Account = require('./Account');
const Transaction = require('./Transaction');

//User can has many accounts
User.hasMany(Account, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//Account belongs to a user
Account.belongsTo(User, {
    foreignKey: 'user_id'
});

//Account has many transactions
Account.hasMany(Transaction, {
    foreignKey: 'account_id',
    onDelete: 'CASCADE'
});

//transactions belong to an account
Transaction.belongsTo(Account, {
    foreignKey: 'account_id'
});


module.exports = { User, Account, Transaction };