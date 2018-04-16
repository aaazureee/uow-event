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

