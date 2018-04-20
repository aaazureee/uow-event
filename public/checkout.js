$('#promo').focus(() => {
  $('#promo').val('');
  $('.invalid').hide();
});

$('.redeem').click(() => {
  $('.invalid').show();
});