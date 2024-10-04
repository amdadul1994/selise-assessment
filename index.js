const express = require('express');
const app = express();

app.get("/api", (req, res, next) => {
    res.json({"message": "Hello, World!"});
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});