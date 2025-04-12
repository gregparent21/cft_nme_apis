const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

/*
Get /
A simple root route to test that the backend is working
Visit: http://localhost:3000/

Req is request
Res is result
*/
app.get("/",(req,res)=>{
    res.send("Welcome to the backend!");
});

let users = [
    {id:1,name:"Greg"},
    {id:2,name:"Jon"}
];

app.get("/users",(req,res) => {
    res.json(users);
});
// console.log("test");

app.get("/users/:id",(req,res) =>{
    const user = users.find(u => u.id=== parseInt(req.params.id));
    if (!user) return res.status(404).json({error: "User not found"});
    res.json(user);
});
/*
Adds a new user to our database
*/
app.post("/users",(req,res) => {
    const newUser = {
        id: users.length+1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.listen(PORT, ()=>{
    console.log('Server is running on http://localhost:3000');
});

let balance =0;
let transactions = [];

app.get("/balance",(req,res) => {
    res.json({balance});
});

app.post("/deposit",(req,res)=>{
    const amount = req.body.amount;

    if (typeof amount !== "number" || account<=0){
        return res.status(400).json({error:"Invalid deposit amount"});
    }
    balance+=amount;
    transactions.push({
        type:"deposit",
        amount,
        date: new Date().toISOString()
    });

    res.json({message: 'Deposited $${amount}',balance});
});

app.post("/withdraw",(req,res) => {
    const amount = req.body.amount;
    if (typeof amount !=="number" || amount<=0) {
        return res.status(400).json({error: "Invalid withdrawal amount"});
    }

    if (amount>=balance) {
        return res.status(400).json({error: "Insufficient funds"});
    }
});