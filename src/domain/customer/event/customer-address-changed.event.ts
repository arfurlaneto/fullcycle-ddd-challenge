import EventInterface from "../../@shared/event/event.interface";

export type CustomerAddressChangedProps = {
  customerId : string,
  name: string,
  street: string,
  number: number,
  zip: string,
  city: string
}

export default class CustomerAddressChanged implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: CustomerAddressChangedProps) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
