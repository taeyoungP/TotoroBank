module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  is_negative: (amount) => {
    // return true if amount is less than 0 (amount < 0)
    return amount < 0;
  },
  absNum: (amount) => {
    return Math.abs(amount);
  },
};
