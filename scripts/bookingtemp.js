$(document).ready(function () {
    //When click the button, get the value from workspaceName.
    $("#bookBtn").click(function () {
        const workspaceName = $("#workspaceName").val();
 
        bookWorkspace(workspaceName);
    });
});
 
function bookWorkspace(workspaceName) {
    if (workspaceName) {
        //Check if the workspace has booked
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        //.some can reture true or false value.
        let isBooked = bookings.some(booking => booking.name === workspaceName);
        if (isBooked) {
            alert("This workspace has been booked by others");
            return;
        }
        else {
            bookings.push({ name: workspaceName });
            localStorage.setItem('bookings', JSON.stringify(bookings));
            $("#workspaceName").val('');//Clear the input field
            updateBookingList();
            alert("Workspace booked!");
        }
    } else {
        alert("Please enter a workspace name!");
 
    }
}
 
function updateBookingList(){
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    $("#bookingList").empty();//Clear the bookingList in html
    bookings.forEach(booking => {
        $("#bookingList").append(`<p>${booking.name} </p>`);//Loop for each booking then append to html
    });
}