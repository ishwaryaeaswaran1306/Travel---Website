// booking.js

// Called when the user clicks the "Book Now" button
function bookPackage(packageName) {
    // Save the selected package in localStorage
    localStorage.setItem("selectedPackage", packageName);

    // Redirect to booking page
    window.location.href = "booking.html";
}

// When booking.html loads
window.onload = function () {
    // Get the selected package from localStorage
    const selectedPackage = localStorage.getItem("selectedPackage");

    // If a package was selected, display it in the package input
    if (selectedPackage) {
        document.getElementById("package").value = selectedPackage;
    }
};

// Handle booking form submission
document.getElementById("bookingForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const bookingData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        package: document.getElementById("package").value,
        date: document.getElementById("date").value,
        people: document.getElementById("people").value,
        message: document.getElementById("message").value
    };

    try {
        const response = await fetch("http://localhost:5000/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Booking submitted successfully!");

            // Clear the form
            document.getElementById("bookingForm").reset();

            // Refill the selected package
            document.getElementById("package").value =
                localStorage.getItem("selectedPackage");
        } else {
            alert(result.message || "Booking failed.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server error. Please try again later.");
    }
});