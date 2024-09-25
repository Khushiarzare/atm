
let balance = 2000; 
let selectedOption = '';
let lastAmount = 0; // To store the last entered amount

// Step 1: Verify PIN
function verifyPIN() {
    const pin = document.getElementById('pin').value;
    if (pin === '1428') { 
        document.getElementById('step1').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
    } else {
        alert('  Wrong Pin,Try Again');
    }
}

// Step 2: Select Option
function selectOption(option) {
    selectedOption = option;
    document.getElementById('step2').classList.add('hidden');
    if (option === 'withdraw' || option === 'deposit') {
        document.getElementById('step3').classList.remove('hidden');
    } else if (option === 'transfer') {
        document.getElementById('step4').classList.remove('hidden');
    } else if (option === 'balance') {
        showResult(`Your current balance is ${balance}`);
    }
}

// Step 3: Submit Amount (for Withdraw or Deposit)
function submitAmount() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    lastAmount = amount;

    if (selectedOption === 'withdraw')
     {
        if (amount <= balance) 
        {
            if (amount % 100 === 0)
            {
                balance -= amount;
                showResult(`You have withdrawn Rs.{amount}`);
            } else (amount % 100 != 0)
            {
                alert("amount is not valid")
            }
        }
         else
         {
            alert('Insufficient funds');
        }
    } 
    else if (selectedOption === 'deposit') 
    {
        balance += amount;
        showResult('You have deposited ${amount}');
    }
    document.getElementById('amount').value = ""; // Clear the input
}

// Step 4: Submit Transfer
function submitTransfer() {
    const transferAmount = parseFloat(document.getElementById('transferAmount').value);
    const accountNumber = document.getElementById('accountNumber').value;

    if (isNaN(transferAmount) || transferAmount <= 0 || accountNumber === '') {
        alert('Please enter valid transfer details');
        return;
    }

    if (transferAmount <= balance) {
        balance -= transferAmount;
        showResult('You have transferred Rs.{transferAmount} to account Rs.{accountNumber}', accountNumber, transferAmount);
    } else {
        alert('Insufficient funds for transfer');
    }

    document.getElementById('transferAmount').value = "";
    document.getElementById('accountNumber').value = "";
}

// Show the transaction result
function showResult(message, accountNumber = 7566895255, transferAmount = null) {
    document.getElementById('step3').classList.add('hidden');
    document.getElementById('step4').classList.add('hidden');
    document.getElementById('balanceDisplay').classList.remove('hidden');
    document.getElementById('transactionResult').textContent = message;
    document.getElementById('balance').textContent = balance;

    if (accountNumber && transferAmount) {
        const transferDetail = 'Transferred Rs.{transferAmount} to account: Rs.{accountNumber}';
        document.getElementById('transferDetail').textContent = transferDetail;
        document.getElementById('transferDetail').classList.remove('hidden');
    } else {
        document.getElementById('transferDetail').classList.add('hidden');
    }
}

// Go back to the options page
function goBack() {
    document.getElementById('balanceDisplay').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
}



