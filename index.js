let hasLoanedOnce = false;
// set first laptop as the initially selected one.
let selectedLaptop = store[0];
let payBalanceEl = document.getElementById("pay-balance");
let bankBalanceEl = document.getElementById("bank-balance");
let laptopPriceEl = document.getElementById("laptop-price");

updateLaptopInfo();

function getBankBalance() {
  return Number(bankBalanceEl.innerText.split(" ")[0]);
}

function getPayBalance() {
  return Number(payBalanceEl.innerText.split(" ")[0]);
}

document.getElementById("btn-bank").addEventListener("click", () => {
  bankBalanceEl.innerText = getBankBalance() + getPayBalance() + " Kr.";
  payBalanceEl.innerText = 0 + " Kr.";
});

document.getElementById("btn-work").addEventListener("click", () => {
  payBalanceEl.innerText = getPayBalance() + 100 + " Kr.";
});

document.getElementById("btn-get-loan").addEventListener("click", () => {
  if (hasLoanedOnce) {
    alert("You can only loan once before a purchase..");
    return;
  }

  let amountToLoan = prompt(
    "Please enter the amount you want to loan",
    getBankBalance()
  );

  amountToLoan = Number(amountToLoan);

  if (isNaN(amountToLoan)) {
    alert("Only numbers are allowed. Try again!");
    return;
  }

  if (amountToLoan <= getBankBalance() * 2) {
    bankBalanceEl.innerText = getBankBalance() + amountToLoan + " Kr.";
    hasLoanedOnce = true;
  } else if (getBankBalance() === 0) {
    alert(
      "Your bank balance seems to 0. You need to earn by working before we can lend you money."
    );
  } else {
    alert("You can't loan more than double of your existing balance..");
  }
});
document.getElementById("btn-buy-now").addEventListener("click", () => {
  // We check if we have enough balance to complete the purchase
  if (getBankBalance() >= selectedLaptop.price) {
    // we check if we have already bought this laptop. If we have, we
    // want to confirm from the user that he/she really wants to buy the same one again.
    // If not, we just return and stop the execution. Otherwise we continue.
    if (selectedLaptop.bought) {
      const continueBuy = confirm(
        "You have already bought this computer. Do you still wish to continue?"
      );

      if (!continueBuy) {
        return;
      }
    }

    bankBalanceEl.innerText = getBankBalance() - selectedLaptop.price;

    alert("You bought a new " + selectedLaptop.name + " computer!");

    selectedLaptop.bought = true;
    hasLoanedOnce = false;
  } else {
    alert(
      "You don't have enough money in your bank account to make the purchase... "
    );
  }
});

document.getElementById("laptops").addEventListener("change", (event) => {
  const selectedLaptopId = event.target.value;

  selectedLaptop = store.find(
    (laptop) => laptop.id === Number(selectedLaptopId)
  );

  updateLaptopInfo();
});

function updateLaptopInfo() {
  document.getElementById("features-output").innerText =
    selectedLaptop.features;
  document.getElementById("laptop-name").innerText = selectedLaptop.name;
  document.getElementById("laptop-description").innerText =
    selectedLaptop.description;
  document.getElementById("laptop-price").innerText =
    selectedLaptop.price + " Kr.";
  document.getElementById("laptop-image").src = selectedLaptop.image;
}
