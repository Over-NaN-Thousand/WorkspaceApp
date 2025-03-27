$(document).ready(function () {
    // i get workspace id and lease type from local storage or just use demo values
    const workspaceID = localStorage.getItem("workspaceID") || "WS123";
    const leaseType = localStorage.getItem("leaseType") || "hourly";
    $("#leaseType").val(leaseType); // i put leaseType in the dropdown

    loadDateTimeInputs(); // show time or date fields depending on lease
    updateBookingList(); // load old bookings if any

    // when leaseType dropdown changes, reload the inputs
    $("#leaseType").change(function () {
        loadDateTimeInputs();
    });

    // when i click book button
    $("#bookBtn").click(function () {
        const workspaceName = $("#workspaceName").val();
        const userId = $("#userId").val();
        const leaseType = $("#leaseType").val();
        let startTime, endTime;

        // checking if user left fields empty
        if (!workspaceName || !userId) {
            alert("Please enter workspace name and user ID!");
            return;
        }

        // if lease is hourly i get time inputs, else date inputs
        if (leaseType === "hourly") {
            startTime = $("#startTime").val();
            endTime = $("#endTime").val();
        } else {
            startTime = $("#startDate").val();
            endTime = $("#endDate").val();
        }

        // check if user selected both start and end
        if (!startTime || !endTime) {
            alert("Please select valid start and end times/dates!");
            return;
        }

        bookWorkspace(workspaceName, userId, startTime, endTime); // send it to book
    });

    // when i press cancel i reset form and reload inputs
    $("#cancelBtn").click(function () {
        $("#bookingForm")[0].reset();
        loadDateTimeInputs();
    });
});

function bookWorkspace(workspaceName, userId, startTime, endTime) {
    // get old bookings from localStorage or start fresh
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // check if the time slot already used by same workspace
    let isBooked = bookings.some(booking =>
        booking.name === workspaceName &&
        ((startTime >= booking.startTime && startTime <= booking.endTime) ||
            (endTime >= booking.startTime && endTime <= booking.endTime))
    );

    // if it’s already booked i alert the user
    if (isBooked) {
        alert("This time slot is already booked!");
        return;
    }

    // add new booking to array
    bookings.push({
        name: workspaceName,
        userId: userId,
        startTime: startTime,
        endTime: endTime
    });

    // save updated bookings to localStorage
    localStorage.setItem('bookings', JSON.stringify(bookings));
    updateBookingList(); // refresh the list on screen
    alert("Workspace booked successfully!");
}

function updateBookingList() {
    // get all bookings
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    $("#bookingList").empty(); // clear the old list

    // show each booking with a delete cross
    bookings.forEach((booking, index) => {
        $("#bookingList").append(`
            <div class="booking-item">
                <p><strong>${booking.name}</strong> - ${booking.startTime} to ${booking.endTime}</p>
                <span class="delete-booking" data-index="${index}">&#10006;</span>
            </div>
        `);
    });

    // when user clicks delete icon, remove that booking
    $(".delete-booking").click(function () {
        const index = $(this).data("index");
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.splice(index, 1); // remove 1 item at that index
        localStorage.setItem('bookings', JSON.stringify(bookings)); // save updated
        updateBookingList(); // show again
    });
}

function loadDateTimeInputs() {
    let leaseType = $("#leaseType").val();
    let dateTimeSelection = $("#dateTimeSelection");
    dateTimeSelection.empty(); // clear old inputs

    // show time inputs if hourly
    if (leaseType === "hourly") {
        dateTimeSelection.append(`
            <label for="startTime">Start Time:</label>
            <input type="time" id="startTime">
            <label for="endTime">End Time:</label>
            <input type="time" id="endTime">
        `);
    } else {
        // else show date inputs
        dateTimeSelection.append(`
            <label for="startDate">Start Date:</label>
            <input type="date" id="startDate">
            <label for="endDate">End Date:</label>
            <input type="date" id="endDate">
        `);
    }
}
