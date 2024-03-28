#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 50000;
let mypin = 3456;

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellow("enter your pin"),
        type: "number",
    }
]);
if (pinAnswer.pin === mypin) {
    console.log("correct pin code!!!");
    let operationAnswer = await inquirer.prompt([
        {
            name: "operation",
            message: chalk.bgBlue("please select an option"),
            type: "list",
            choices: ["withdraw", "check balance", "fastcash",]
        }
    ]);
    if (operationAnswer.operation === "withdraw") {
        let amountAnswer = await inquirer.prompt([
            {
                name: "amount",
                message: chalk.bgGray("enter your amount to withdraw $"),
                type: "number",
            }
        ]);
        if (amountAnswer.amount < myBalance) {
            myBalance -= amountAnswer.amount;
            console.log(chalk.red("your remaining balance is: $$" + myBalance));
        }
        else if (amountAnswer.amount > myBalance) {
            console.log("insufficient balance. cannot withdraw more than your current balance.");
        }
    }
    else if (operationAnswer.operation === "check balance") {
        console.log("your balance is:" + myBalance);
    }
    else if (operationAnswer.operation === "fastcash") {
        let fast = await inquirer.prompt([
            {
                name: "fastcash",
                message: "how much money you want to withdraw!",
                type: "list",
                choices: ["1000", "3000", "6000", "10000", "15000"],
            }
        ]);
        myBalance -= fast.fastcash;
        console.log(chalk.bgCyan("your remaining balance is $$" + myBalance));
    }
    console.log("Thank you for using our ATM service!!");
}
else {
    console.log(chalk.bgRedBright("Incorrect pin number"));
}
