import moment from 'moment';

export default function (inputEvents) {
  let outputEvents = inputEvents.map(value => {
    let event = value.toObject();
    if (!event.price) {
      event.price = 'Free';
    } else {
      event.price = '$' + event.price;
    }
    let fromDate = moment(event.startDate).format('ddd D MMM YYYY, hh:mmA');
    let toDate = moment(event.endDate).format('hh:mmA');
    event.durationString = `${fromDate} - ${toDate}`;
    return event;
  });
  return outputEvents;
}