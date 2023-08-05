const express = require('express')
const app = express()
const bcrypt = require('bcrypt');

app.use(express.json());

//storing users's infor
const users = [];

//get users's information
app.get('/users', (req, res) => {
    res.json(users);
})

//create user to store in users variable
app.post('/users', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(); //generate a salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt); //generate hash
        console.log(salt);
        console.log(hashedPassword);
        const user = {
            name: req.body.name,
            password: hashedPassword
        }
        users.push(user)
        res.status(201).send();
    }
    catch {
        res.status(500).send('damn')
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name);
    if(user == null){
        return res.status(400).send("Cannot find user")
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success');
        } else res.send('Not allowed');
    }catch{
        res.status(500).send('damn')
    }
})

app.listen(3000);