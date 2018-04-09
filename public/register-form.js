// check matching password
const pw = $('#password')[0];
const confPw = $('#confPassword')[0];
pw.onchange = () => checkPw();
confPw.onchange = () => checkPw();

function checkPw() {
  const pwValue = $('#password').val();
  const confPwValue = $('#confPassword').val();
  if (pwValue !== confPwValue) {
    confPw.setCustomValidity('Password does not match.');
  } else {
    confPw.setCustomValidity('');
  }
}

// submit
$('main form').eq(0).submit(event => {
  console.log('123');
  event.preventDefault();
  console.log('123');
});
