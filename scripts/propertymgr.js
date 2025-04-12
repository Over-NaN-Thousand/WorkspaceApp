$(document).ready(function () {
    //Open add property popup
    $('#addProperty').on('click', function () {
        $('#propertyForm')[0].reset();
        $('#propertyPopup').css('display', 'flex');
    });
    //Close property popup
    $('#closePropertyPopup').on('click', function () {
        $('#propertyPopup').css('display', 'none');
    });

    //Open add workspace popup
    $('#addWorkspace').on('click', function () {
        $('#workspaceForm')[0].reset();
        $('#workspacePopup').css('display', 'flex');
    });

    // Close workspace popup
    $('#closeWorkspacePopup').on('click', function () {
        $('#workspacePopup').css('display', 'none');
    });

$('#saveProperty').on('click', async function () {
    const token = localStorage.getItem('token');
    const propertyData = {
      name: $('#propertyName').val(),
      address1: $('#address1').val(),
      address2: $('#address2').val(),
      neighborhood: $('#neighborhood').val(),
      city: $('#city').val(),
      province: $('#province').val(),
      country: $('#country').val(),
      postalcode: $('#postalCode').val(),
      ownerEmail: localStorage.getItem('email') 
    };

    try {
      const res = await fetch('http://localhost:3000/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(propertyData)
      });

      if (res.ok) {
        alert('Property saved to database!');
        $('#propertyPopup').css('display', 'none');
      } else {
        alert(' Failed to save property!');
      }
    } catch (err) {
      console.error(err);
      alert(' Network or server error!');
    }
  });
  $('#saveWorkspace').on('click', async function () {
    const token = localStorage.getItem('token');
    const workspaceData = {
      //workspaceID: Date.now(), //Need to be fixed
      workspaceName: $('#workspaceName').val(),
      workspaceType: $('#workspaceType').val(),
      leaseTerm: $('#leaseTerm').val(),
      sqFt: parseInt($('#sqFt').val()),
      seatCapacity: parseInt($('#seatCapacity').val()),
      price: parseFloat($('#price').val()),
      rating: parseInt($('#rating').val()),
      //propertyId: parseInt($('#propertyId').val()), //Need to be fixed

      amenities: $('#amenities').val().split(',').map(a => a.trim()),
      ownerEmail: localStorage.getItem('email') 
    };
  
    try {
      const res = await fetch('http://localhost:3000/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(workspaceData)
      });
  
      if (res.ok) {
        alert('Workspace saved to database!');
        $('#workspacePopup').css('display', 'none');
      } else {
        alert('Failed to save workspace!');
      }
    } catch (err) {
      console.error(err);
      alert('Network or server error!');
    }
  });
  
});

