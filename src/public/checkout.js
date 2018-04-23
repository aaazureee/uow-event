let eventId = $('.redeem').data('eventid');
let data = {
  eventId,
  type: 'book-in'
};

$('#promo').focus(() => {
  $('#promo').val('');
  $('.invalid').hide();
});

$('#promo').keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
    $('.redeem').click();
  }
});

$('.redeem').click(() => {
  $(this).attr('disabled', true);
  $.ajax({
    type: 'POST',
    data: {
      promo: $('#promo').val()
    },
    url: `/event/id/${eventId}/promo`,
    success: data => {
      if (data.valid) {
        //TODO
        console.log('discount: ' + data.discount);
        const discountItem = `<li class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <div class="text-success">
            <h6>Promo code</h6>
            <small>KAPPA123</small>
          </div>
          <small class="text-success">
            -${data.discount}%
          </small>
        </div>
      </li>`;
        $('.first').after(discountItem);
        const total = Number($('.price').text().trim().replace('$', ''));
        const discounted = (total - total * data.discount / 100).toFixed(2);
        $('.total').text('$' + discounted);
        $('.invalid').hide();
        $('.redeem').attr('disabled', true);
        $('#promo').attr('disabled', true);
      } else {
        $('.invalid').show();
      }
    }
  });
});

$('form').eq(1).submit(e => {
  e.preventDefault();
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