document.addEventListener("DOMContentLoaded", function() {
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const calendarSheets = document.querySelectorAll('.calendar_sheet');
    let currentMonthIndex = 0; // Index of the currently displayed month

    // Function to toggle the disabled attribute for the navigation buttons
    function toggleButtonState() {
        prevMonthButton.disabled = currentMonthIndex === 0; // Disable previous button at first month
        nextMonthButton.disabled = currentMonthIndex === calendarSheets.length - 1; // Disable next button at last month
    }

    // Function to show the next month
    nextMonthButton.addEventListener('click', function() {
        if (currentMonthIndex < calendarSheets.length - 1) { // Check if not already at the last month
            calendarSheets[currentMonthIndex].style.display = 'none'; // Hide current month
            currentMonthIndex++; // Increment index
            calendarSheets[currentMonthIndex].style.display = 'block'; // Show next month
        }
        toggleButtonState(); // Toggle button state after navigation

    });

    // Function to show the previous month
    prevMonthButton.addEventListener('click', function() {
        if (currentMonthIndex > 0) { // Check if not already at the first month
            calendarSheets[currentMonthIndex].style.display = 'none'; // Hide current month
            currentMonthIndex--; // Decrement index
            calendarSheets[currentMonthIndex].style.display = 'block'; // Show previous month
        }
        toggleButtonState(); // Toggle button state after navigation

    });

    // Initially toggle button state based on current month
    toggleButtonState();

    // Function to handle date click event
    function handleDateClick(event) {
        // Get the reference point to redirect to
        const referencePoint = event.target.dataset.reference;
        if (referencePoint) {
            // Find the referenced section
            const referencedSection = document.querySelector(referencePoint);
            if (referencedSection) {
                // Find the details element inside the referenced section
                const detailsElement = referencedSection.querySelector('details');
                if (detailsElement) {
                    // Toggle the open state of the details element
                    detailsElement.open = !detailsElement.open;
                }
            }
            window.location.href = referencePoint;
        }
    }

    // Add event listeners to handle date hover and click events for all dates in the calendar
    const allDates = document.querySelectorAll('.day:not(.head)');
    allDates.forEach(date => {
        date.addEventListener('click', handleDateClick);
    });
});

// Initialize the map centered at Montréal
var map = L.map('map_container').setView([45.5017, -73.5673], 13);

// Add the base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Add pins for special places
var specialPlaces = [
    { name: "Aéroport international Pierre-Elliott-Trudeau de Montréal", location: [45.4656851,-73.7454814] },
    { name: "Université de Montréal", location: [45.502151,-73.6173584] },
    { name: "Parc Arthur-Therrien", location: [45.465879, -73.559969] },
    { name: "Parc du Lien nord (Canal Lachine)", location: [45.4835995,-73.5692302] }, 
    { name: "Parc national du Mont-Orford", location: [45.3449572,-72.2430047] },
    { name: "Ski Bromont", location: [45.2987788,-72.6490905] },
    { name: "Vieux Port de Montréal", location: [45.507287, -73.549374] },
    { name: "Québec", location: [46.8104508,-71.2182458] },
    { name: "Chute de Montmorency", location: [46.8908136,-71.1464673] },
    { name: "Lac aux Castors", location: [45.4987479,-73.5987143] },
    { name: "Mont Royal Belvédère ", location: [45.5038476,-73.5963577] },
    { name: "Domaine Enchanteur", location: [46.4640961,-72.6401675] },
];

specialPlaces.forEach(function(place) {
    L.marker(place.location).addTo(map)
        .bindPopup(place.name);
});

