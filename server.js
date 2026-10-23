const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/bookings", bookingRoutes);

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "travel",
    password: "12062007",
    port: 5432
});

pool.connect()
.then(() => console.log("Connected to PostgreSQL"))
.catch(err => console.log(err));

app.post("/contact", async (req, res) => {
    const { name, concern, message } = req.body;

    try {
        await pool.query(
            "INSERT INTO contact (name, concern, message) VALUES ($1, $2, $3)",
            [name, concern, message]
        );

        res.send("Contact saved successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
});

app.get("/contact", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM contact");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
});

app.delete("/contact/:id", async (req, res) => {
    const id = req.params.id;

    try {
        await pool.query(
            "DELETE FROM contact WHERE id = $1",
            [id]
        );

        res.send("Inquiry deleted successfully");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error deleting inquiry");
    }
});

app.put("/contact/:id", async (req, res) => {

    const id = req.params.id;

    const { name, concern, message } = req.body;

    try {

        await pool.query(
            "UPDATE contact SET name=$1, concern=$2, message=$3 WHERE id=$4",
            [name, concern, message, id]
        );

        res.send("Inquiry updated successfully");

    } catch (err) {

        console.log(err);

        res.status(500).send("Update Failed");

    }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});