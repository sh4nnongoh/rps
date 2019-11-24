const path = require("path")
const express = require("express")

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});



app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`)
})