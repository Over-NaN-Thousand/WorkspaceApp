$(document).ready(function () {
        
    // Event listener for form submission
    document.querySelector('.informationForm form').addEventListener('book', handleBooking);
      
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const workspace = JSON.parse(localStorage.getItem('Workspace'));
    
    function handleBooking(event) {
        event.preventDefault();
        
         // Validate input fields
         if (!currentUser) {
            alert('Please log-in first');
            // Redirect to workspace page
            window.location.href = '/WorkspaceApp/pages/login.html';
            return;
        }
    
        // Validate input fields
        if (!startDatee || !endDate || !startTime || !endTime) {
            alert('Please fill in all information.');
            return;
        }
    
        // Determine booking record based on input fields and localGtorage
        const newBooking = {
            id: Date.now(),
            currentUser,
            workspace,
            startDate,
            endDate,
            startTime,
            endTime
        };
    
        // Retrieve existing bookings from localStorage
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    
        if (!localStorage.getItem('bookings')) {
            localStorage.setItem('bookings', JSON.stringify(initialBookings));
        }
    
        // Add the new booking
        bookings.push(newBooking);
    
        // Store bookings array in localStorage
        localStorage.setItem('bookings', JSON.stringify(bookings));
        alert('Booking successful!');
    
    
        // Redirect to workspace page
        window.location.href = "pages/book.html";
    
        //For testing
        console.log(newBooking);
        console.log(bookings);
    }
    });