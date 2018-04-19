let footer = $('.modal-footer');
$('.delete').click(function () {
  $('#deleteModal').on('hide.bs.modal', e => {
    e.preventDefault();
  });

  let text = 'Deleting event';
  let stopper = text + '...';
  let body = $('.modal-body');
  body.text(text);
  let loading = setInterval(() => {
    (body.text() === stopper)
      ? body.text(text)
      : body.append('.');
  }, 300);
  $.ajax({
    type: 'DELETE',
    url: $(this).data('href'),
    success: data => {
      console.log(data);
      clearInterval(loading);
      footer.empty();
      footer.html('<a href="/manage-events" class="btn btn-success mr-auto text-white">Back to Manage Events</a>');
      body.text('This event has been succesfully deleted.');
      $('#deleteModal').on('hidden.bs.modal', () => {
        window.location.href = '/manage-events';
      });
      $('#deleteModal').off('hide.bs.modal');
    },
    error: err => {
      console.log(err);
    },
  });
});