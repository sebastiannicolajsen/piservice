// GET request to localhost/status/[id] returns true / false depending on status
// GET request to localhost/update/[id] sets the trigger status to true until TIMEOUT (10000 ms currently) is reached, from where it is deleted


const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const TIMEOUT = 10000 //ms

// could be a database instead...
const keys = {}


app.get("/status/:id", (req, res)  => {
    const id = req.params.id;
    console.log("Status requested for " + id)
    if(keys[id] !== undefined) res.json({result: keys[id]})
    else res.json({result: false})
    res.send();
})

app.get("/update/:id", (req, res) => {
    const id = req.params.id;
    keys[id] = true;
    console.log("Updated status for " + id)
    setTimeout(() => {
        delete keys[id];
        console.log("Deleted status for " + id)
    }, TIMEOUT)
    res.json({success: true})
})


app.listen(PORT, () => {
    console.log("running...")
})