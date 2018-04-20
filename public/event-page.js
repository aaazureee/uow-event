let button = $('#btn-book');
let eventId = Number(button.data('eventid'));

let data = {
  eventId,
};

if (button.data('status') === 'book-in') {
  data.type = 'book-in';
} else {
  data.type = 'cancel';
}

button.click( () => {
  $.ajax({
    type: 'POST',
    url: '/event/book',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: data => {
      if (!data.error) {
        window.location.reload();
      } else {
        if (data.error.type === 'eventFull') {
          //Modal
          $('#event-modal .modal-body p').text('This event is currently fully booked');
          $('#event-modal').modal('show');
          $('#event-modal').on('hide.bs.modal', () => {
            window.location.reload();
          });
        } else if (data.error.type === 'eventNonExistent') {
          $('#event-modal .modal-body p').text('This event no longer exists');
        } else {
          alert('An error has occured: ' + data.error.message);
        }
      }
    },
  });
});