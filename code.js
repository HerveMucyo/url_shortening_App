const express = require("express");
const mysql = require("mysql");
const shortid = require("shortid");

const app = express();

app.use(express.static("public"));
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shorturls"
});
con.connect(function(error) {
    if (error) {
        console.log("Database connection failed");
    }
});

app.get("/", function(request, response) {
    response.sendFile(__dirname + "/public/index.html");
});

// Handle form submission to create a short URL
app.post("/api/create-short-url", function(request, response) {
    let longUrl = request.body.longurl;
    let uniqueID = shortid.generate();
    let sql = `INSERT INTO links(longurl, shorturlid) VALUES ('${longUrl}', '${uniqueID}')`;
    con.query(sql, function(error, result) {
        if (error) {
            response.status(500).json({
                status: "notok",
                message: "Something went wrong"
            });
        } else {
            response.status(200).json({
                status: "ok",
                shorturlid: uniqueID
            });
        }
    });
});

// Handle redirection based on short URL
app.get("/:shorturlid", function(request, response) {
    let shorturlid = request.params.shorturlid;
    let sql = `SELECT * FROM links WHERE shorturlid='${shorturlid}' LIMIT 1`;
    con.query(sql, function(error, result) {
        if (error || result.length === 0) {
            response.status(404).send("Short URL not found");
        } else {
            response.redirect(result[0].longurl);
        }
    });
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});