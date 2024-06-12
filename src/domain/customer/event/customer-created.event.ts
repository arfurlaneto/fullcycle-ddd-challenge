import EventInterface from "../../@shared/event/event.interface";

export type CustomerCreatedEventProps = {
  customerId : string,
  name: string
}

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: CustomerCreatedEventProps) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
