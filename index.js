const express = require("express");
const app = express();

// set "public" as the directory for default pages
app.use(express.static("public"));

// allow ejs to be used
app.set("view engine", "ejs");

// set port to environmental variable or 3000
const PORT = process.env.PORT || 3001;
// listen to a server on the defined port and consolé-dot-log when it's running
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

// serve the homepage when no additional path is specified, and print the group number when opening the page
let group = "group 1"
app.get("/", (req,res) => {
    res.render("index", {name:group});
});