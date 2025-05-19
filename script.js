document.addEventListener("DOMContentLoaded", () => {
    const rideForm = document.getElementById("ride-form");
    const rideList = document.getElementById("ride-list");

    rideForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const pickup = document.getElementById("pickup").value;
        const destination = document.getElementById("destination").value;
        const rideType = document.getElementById("ride-type").value;

        rideList.innerHTML = `
            <div class="ride-option">
                <h3>${rideType.charAt(0).toUpperCase() + rideType.slice(1)} Ride</h3>
                <p>Pickup: ${pickup}</p>
                <p>Destination: ${destination}</p>
                <p>Estimated Price: $${Math.floor(Math.random() * 30) + 10}</p>
                <button onclick="bookRide()">Book Now</button>
            </div>
        `;
    });
});

function bookRide() {
    alert("Ride booked! 🚗");
}

/* Three-Dot Menu Toggle */
function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

/* Google Maps & Firebase: Live Driver Tracking */
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    databaseURL: "YOUR_DATABASE_URL"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: -1.2921, lng: 36.8219 }
    });

    const driverMarker = new google.maps.Marker({
        map: map,
        title: "Driver Location"
    });

    /* Track Driver Location */
    db.ref("drivers/driver1").on("value", (snapshot) => {
        const driverLocation = snapshot.val();
        driverMarker.setPosition({ lat: driverLocation.lat, lng: driverLocation.lng });
        map.setCenter({ lat: driverLocation.lat, lng: driverLocation.lng });
    });
}
