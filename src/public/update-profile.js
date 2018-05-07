// check matching password
const pw = $('#password')[0];
const confPw = $('#confPassword')[0];
const email = $('#email')[0];

pw.oninput = () => checkPw();
confPw.oninput = () => checkPw();

function checkPw() {
  const pwValue = pw.value;
  const confPwValue = confPw.value;
  if (pwValue !== confPwValue && confPwValue !== '') {
    confPw.setCustomValidity('Password does not match.');
  } else {
    confPw.setCustomValidity('');
  }
}

// form submit handler
let form = $('form').eq(1);
let url = '/user/' + form.data('username');
form.submit(e => {
  $('.btn-update').attr('disabled', true);
  e.preventDefault();
  let data = {
    email: email.value,
    password: pw.value,
  };
  $.ajax({
    type: 'PUT',
    url,
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: data => {
      if (!data.error) {
        window.location.replace(url);
      } else {
        $('#user-modal').on('hide.bs.modal', () => {
          $('.btn-update').attr('disabled', false);
        });
        $('#user-modal .modal-body p').text(data.error.message);
        $('#user-modal').modal('show');
      }
    },
  });
});

