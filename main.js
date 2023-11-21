function checkCashRegister(price, cash, cid) {
  // Define the currency values in cents
  const currencyUnit = {
    "PENNY": 1,
    "NICKEL": 5,
    "DIME": 10,
    "QUARTER": 25,
    "ONE": 100,
    "FIVE": 500,
    "TEN": 1000,
    "TWENTY": 2000,
    "ONE HUNDRED": 10000
  };

  // Calculate the change amount in cents
  let changeDue = (cash * 100) - (price * 100);

  // Calculate the total cash in drawer in cents
  const totalCashInDrawer = cid.reduce((total, [, amount]) => total + (amount * 100), 0);

  // Initialize an array to store the change
  let change = [];

  // If the cash in drawer is less than the change due, return "INSUFFICIENT_FUNDS"
  if (totalCashInDrawer < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  // If the cash in drawer is equal to the change due, return "CLOSED"
  if (totalCashInDrawer === changeDue) {
    return { status: "CLOSED", change: cid };
  }

  // Calculate the change to be given
  for (let i = cid.length - 1; i >= 0; i--) {
    const [currency, amount] = cid[i];
    const currencyValue = currencyUnit[currency];
    let availableAmount = (amount * 100);

    let returnedAmount = 0;
    while (availableAmount > 0 && changeDue >= currencyValue) {
      changeDue -= currencyValue;
      availableAmount -= currencyValue;
      returnedAmount += currencyValue;
    }

    if (returnedAmount > 0) {
      change.push([currency, returnedAmount / 100]);
    }
  }

  // If we can't return the exact change, return "INSUFFICIENT_FUNDS"
  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change };
}

// Test cases
console.log(checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]));