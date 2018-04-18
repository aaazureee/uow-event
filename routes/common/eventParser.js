import moment from 'moment';

export function parseEvents(inputEvents) {
  let outputEvents = inputEvents.map(parseEvent);
  return outputEvents;
}

export function parseEvent(inputEvent) {
  let event = inputEvent.toObject();
    if (!event.price) {
      event.price = 'Free';
    } else {
      event.price = '$' + event.price;
    }
    let fromDate = moment(event.startDate).format('ddd D MMM YYYY, hh:mmA');
    let toDate = moment(event.endDate).format('hh:mmA');
    event.durationString = `${fromDate} - ${toDate}`;
    return event;
}