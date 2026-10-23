const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// CREATE Booking
router.post("/", async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({
            message: "Booking created successfully!",
            booking
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating booking",
            error: error.message
        });
    }
});

// READ All Bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching bookings",
            error: error.message
        });
    }
});

// UPDATE Booking Status
router.put("/:id", async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Booking updated successfully!",
            updatedBooking
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating booking",
            error: error.message
        });
    }
});

// DELETE Booking
router.delete("/:id", async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);

        res.json({
            message: "Booking deleted successfully!"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting booking",
            error: error.message
        });
    }
});

module.exports = router;