// Date and time picker setup
const datePicker = $('#date').pickadate({
	editable: true,
	min: true,
	format: 'ddd d mmmm, yyyy'
}).pickadate('picker');

const timeOption = {
	editable: true,
	min: [7, 0], // min = 7 AM
	max: [22, 0] // max = 10PM
};

const startPicker = $('#start-time').pickatime(timeOption).pickatime('picker');
const endPicker = $('#end-time').pickatime(timeOption).pickatime('picker');

$('#date').click(() => datePicker.open());
$('#start-time').click(() => startPicker.open());
$('#end-time').click(() => endPicker.open());

// Quilljs setup
const quill = new Quill('#full-desc', {
	placeholder: 'Event full description',
	theme: 'snow'
});

$('#full-desc').click(function () {
	$(this).addClass('quill-active');
});

$(document).click(function (event) {
	if (!$(event.target).closest('#full-desc').length) {
		$('#full-desc').removeClass('quill-active');
	}
});

// Submit handler
let form = $('.needs-validation').eq(0);
form.submit(event => {
	event.preventDefault();
	//reset
	$('#discount').prop('required', false);
	$('#promo-code').prop('required', false);
	// Promocode and discount percentage complementary handler
	if ($('#promo-code').val().trim()) {
		$('#discount').prop('required', true);
	}
	if ($('#discount').val().trim()) {
		$('#promo-code').prop('required', true);
	}

	form.addClass('was-validated');
	// Textarea handler
	if (quill.getLength() === 1) {
		$('#quill-feedback').show();
		$('.ql-container').css('border-color', '#dc3545');
	} else {
		$('#quill-feedback').hide();
		$('.ql-container').css('border-color', '#28a745');
	}

	// Time handler
	let filledStatus;
	filledStatus = (datePicker.get('select') === null || startPicker.get('select') === null ||
		endPicker.get('select') === null) ? false : true;
	if (filledStatus) {
		const validTime = checkTime(datePicker, startPicker, endPicker);
		if (!validTime) {
			$('#start-feedback').text('Start time must be before end time.');
			$('#start-time').addClass('is-invalid');
			$('#start-time').css('border-color', '#dc3545'); // red 
			$('#end-time').css('border-color', '#dc3545');
		} else {
			$('#start-time').removeClass('is-invalid');
			$('#start-time').css('border-color', '#28a745'); // green
			$('#end-time').css('border-color', '#28a745');
		}
	}
});

// check if start time < end time
function checkTime(datePicker, startPicker, endPicker) {
	const { hour: startHour, mins: startMin } = startPicker.get('select');
	const { hour: endHour, mins: endMin } = endPicker.get('select');

	const date = datePicker.get('select').obj;
	const startTime = new Date(date.getTime());
	startTime.setHours(startHour);
	startTime.setMinutes(startMin);

	const endTime = new Date(date.getTime());
	endTime.setHours(endHour);
	endTime.setMinutes(endMin);

	return startTime.getTime() < endTime.getTime();
}