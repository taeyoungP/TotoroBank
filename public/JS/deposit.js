const accountBalance = document.getElementById("account-balance");
const depositAmount = document.getElementById("deposit-amount");
const withdrawAmount = document.getElementById("withdraw-amount");
const depositForm = document.querySelector('.deposit-form');

//const withdrawBtn = document.querySelector("withdrawBtn");

/*let balance = 10000;

function updateBalance() {
  accountBalance.textContent =
    "Account Balance: $" +
    balance.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}*/

depositForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = parseFloat(depositAmount.value.trim());
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter correct amount!");
    return;
  }
  //const amount = depositAmount.value.trim();

  console.log("amount input is: " + amount);

  const select = document.querySelector("#account");
  const currentOpt = select.options[select.selectedIndex];
  //const accountId = accountSelect.options[selectedIndex].getAttribute("data-id");
  //const accountId = document.querySelector("option");
  const dataId = currentOpt.getAttribute("data-id");


  console.log("account number deposited: " + dataId);

  if (amount) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/deposits/${dataId}`, {
      method: "PUT",
      body: JSON.stringify({ amount }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the account page
      document.location.replace("/deposit");
    } else {
      alert(response.statusText);
    }
  }
});

/*withdrawBtn.addEventListener("click", (e) => {
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

updateBalance();*/
