class BankAccount {
    constructor(name, accNo, initialBalance = 0) {
        this.name = name
        this.accountNumber = accNo
        this.balance = initialBalance
    }

    deposit(amount) {
        this.updateBalance(amount)
        console.log(`₹${amount} deposited successfully`)
    }

    withdraw(amount) {
        if (!this.hasEnoughBalance(amount)) {
            console.log("Insufficient balance")
            return
        }

        this.updateBalance(-amount)
        console.log(`₹${amount} withdrawn successfully`)
    }

    checkBalance() {
        console.log(`Current Balance: ₹${this.balance}`)
    }

    // helper methods (new structure)
    updateBalance(value) {
        this.balance += value
    }

    hasEnoughBalance(amount) {
        return amount <= this.balance
    }
}

const account1 = new BankAccount("Swaraj Jadhav", 12345, 1000)

account1.deposit(500)
account1.withdraw(300)
account1.checkBalance()