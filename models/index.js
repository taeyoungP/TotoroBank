//Define models relation
const User = require('./User');
const Account = require('./Account');

//User can has many accounts
User.hasMany(Account, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//Account belongs to a user
Account.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Account };