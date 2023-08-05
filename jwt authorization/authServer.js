// jwt is used for authorization, not authentication
import express from "express" ;
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 55000;

app.use(express.json());

let refreshTokens =  [];

app.post('/refreshToken', (req, res) => {
    const refreshToken = req.body.token;
    if(!refreshToken) res.sendStatus(402);
    if(!refreshTokens.includes(refreshToken)) res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        console.log(err, data);
        if(err) res.sendStatus(403);
        const accessToken = jwt.sign({username: data.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'});
        res.json({accessToken})
    });
})

app.post("/login", (req, res) => {
    //authorization
    const data = req.body;
    console.log({data});
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s'});
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({
        accessToken, refreshToken
    })
})

//cause we dont set expiration time for refreshToken, when user logs out, we delete that token
app.post('/logout', (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter(refToken => refToken !== refreshToken)
    res.sendStatus(200).json('Ok');
})

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
});

