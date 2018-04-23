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

if (button.data('price') !== 'Free' && data.type === 'book-in') {
  button.click(() => {
    window.location.href = `/event/id/${eventId}/checkout`;
  });
} else {
  button.click(() => {
    button.attr('disabled', true);
    $.ajax({
      type: 'POST',
      url: '/event/book',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: data => {
        if (!data.error) {
          window.location.reload();
        } else {
          $('#event-modal').on('hide.bs.modal', () => {
            window.location.reload();
          });
          $('#event-modal .modal-body p').text(data.error.message);
          $('#event-modal').modal('show');
        }
      },
    });
  });
}