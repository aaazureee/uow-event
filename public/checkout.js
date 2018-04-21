let eventId = $('.redeem').data('eventid');
let data = {
  eventId,
  type: 'book-in'
};

$('#promo').focus(() => {
  $('#promo').val('');
  $('.invalid').hide();
});

$('.redeem').click(() => {
  $.ajax({
    type: 'POST',
    data: {
      promo: $('#promo').val()
    },
    url: `/event/id/${eventId}/promo`,
    success: data => {
      if (data.valid) {
        //TODO
        console.log('promo');
        $('.invalid').hide();
      } else {
        $('.invalid').show();
      }
    }
  });
});

$('form').eq(1).submit((e) => {
  e.preventDefault();
  console.log('clicked submit');
  if ($('form').get(1).checkValidity() === false) {
    return;
  }
  $.ajax({
    type: 'POST',
    url: '/event/book',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: data => {
      if (!data.error) {
        window.location.href = `/event/id/${eventId}`;
      } else {
        $('#error-modal').on('hide.bs.modal', () => {
          window.location.href = `/event/id/${eventId}`;
        });
        $('#error-modal .modal-body p').text(data.error.message);
        $('#error-modal').modal('show');
      }
    },
  });
});