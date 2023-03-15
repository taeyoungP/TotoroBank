const accountBalance = document.getElementById("account-balance");
const depositAmount = document.getElementById("deposit-amount");
const withdrawAmount = document.getElementById("withdraw-amount");
const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.querySelector("withdrawBtn");

let balance = 10000;

function updateBalance() {
  accountBalance.textContent =
    "Account Balance: $" +
    balance.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}

depositBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = parseFloat(depositAmount.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter correct amount!");
    return;
  }
  balance += amount;
  updateBalance();
});

withdrawBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = parseFloat(withdrawAmount.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter correct amount!");
    return;
  }
  if (amount > balance) {
    alert("Insufficient funds!");
    return;
  }
  balance -= amount;
  updateBalance();
});

updateBalance();
