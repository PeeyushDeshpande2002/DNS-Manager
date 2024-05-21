const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.status(200).send("Checking")
})

const port = 5000;

app.listen(port, ()=>{
    console.log(`server runnning on port ${port}`);
})