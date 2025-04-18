import { workspaces } from ".data/workspaceData.js";


$(document).ready(function () {
    const leaseType = localStorage.getItem("leaseType") || "hourly"; // Still grabbing lease type to pre-fill
    $("#leaseType").val(leaseType);


    loadDateTimeInputs(); // show time/date inputs based on lease type
    fetchAndShowBookings(); // get bookings from DB and show them
    populateWorkspaceDropdown();

    // reload inputs if leaseType dropdown changes
    $("#leaseType").change(function () {
        loadDateTimeInputs();
    });

    // when user clicks Book button
    $("#bookBtn").click(async function () {
        const workspaceName = $("#workspaceSelect").val();
        const userEmail = $("#userEmail").val();
        const leaseType = $("#leaseType").val();
        let startTime, endTime;

        if (!workspaceName || !userEmail) {
            alert("Please fill in workspace name and user Email!");
            return;
        }

        if (leaseType === "hourly") {
            startTime = $("#startTime").val();
            endTime = $("#endTime").val();
        } else {
            startTime = $("#startDate").val();
            endTime = $("#endDate").val();
        }

        if (!startTime || !endTime) {
            alert("Please select valid start and end times/dates!");
            return;
        }

        // Here we make the actual POST request to the backend
        try {
            const res = await fetch("http://localhost:3000/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // If token is needed:
                    // Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    workspaceName,
                    userEmail,
                    leaseType,
                    startTime,
                    endTime,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Booking successful!");
                fetchAndShowBookings(); // refresh list
                $("#bookingForm")[0].reset();
                loadDateTimeInputs();
            } else {
                alert("Booking failed: " + (data.error || "Unknown error"));
            }
        } catch (err) {
            console.error("Booking error:", err);
            alert("Something went wrong.");
        }
    });

    // cancel button clears form
    $("#cancelBtn").click(function () {
        $("#bookingForm")[0].reset();
        loadDateTimeInputs();
    });
});

// fetch all bookings from DB
async function fetchAndShowBookings() {
    try {
        const res = await fetch("http://localhost:3000/bookings");
        const bookings = await res.json();

        $("#bookingList").empty();
        bookings.forEach((booking) => {
            $("#bookingList").append(`
                <div class="booking-item">
                    <p><strong>${booking.workspaceName}</strong> - ${booking.startTime} to ${booking.endTime}</p>
                </div>
            `);
        });
    } catch (err) {
        console.error("Error loading bookings:", err);
    }
}

function loadDateTimeInputs() {
    let leaseType = $("#leaseType").val().toLowerCase();
    let dateTimeSelection = $("#dateTimeSelection");
    dateTimeSelection.empty();

    const timeBased = leaseType === "hourly";

    if (timeBased) {
        dateTimeSelection.append(`
            <label for="startTime">Start Time:</label>
            <input type="time" id="startTime">
            <label for="endTime">End Time:</label>
            <input type="time" id="endTime">
        `);
    } else {
        dateTimeSelection.append(`
            <label for="startDate">Start Date:</label>
            <input type="date" id="startDate">
            <label for="endDate">End Date:</label>
            <input type="date" id="endDate">
        `);
    }
}


function populateWorkspaceDropdown() {
    const dropdown = $("#workspaceSelect");

    workspaces.forEach(ws => {
        dropdown.append(
            `<option value="${ws.workspaceName}">${ws.workspaceName} - ${ws.leaseTerm}</option>`
        );
    });

    // auto-fill lease type when user selects a workspace
    dropdown.change(function () {
        const selectedName = $(this).val();
        const selectedWorkspace = workspaces.find(ws => ws.workspaceName === selectedName);
        if (selectedWorkspace) {
            $("#leaseType").val(selectedWorkspace.leaseTerm.toLowerCase());
        }
    });
}