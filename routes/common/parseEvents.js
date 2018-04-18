import moment from 'moment';

export default function (inputEvents) {
  let outputEvents = inputEvents.map(value => {
    let event = value.toObject();
    if (!event.price) {
      event.price = 'Free';
    } else {
      event.price = '$' + event.price;
    }
    let fromDate = moment(event.startDate).format('ddd D MMM YYYY, hh:mm A');
    let toDate = moment(event.endDate).format('hh:mm A');
    event.durationString = `${fromDate} to ${toDate}`;
    return event;
  });
  return outputEvents;
}