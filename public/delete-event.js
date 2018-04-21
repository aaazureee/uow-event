let footer = $('.modal-footer');
$('.toggle').click(function () {
  let toggle = $(this);
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
      url: toggle.data('href'),
      success: event => {
        clearInterval(loading);
        footer.empty();
        footer.html(`<a href="${event.redirect}" class="btn btn-success mr-auto text-white">Back to ${event.page}</a>`);
        body.text('This event has been succesfully deleted.');
        $('#deleteModal').on('hidden.bs.modal', () => {
          window.location.href = event.redirect;
        });
        $('#deleteModal').off('hide.bs.modal');
      },
      error: err => {
        console.log(err);
      },
    });
  });
});