export class CustomerAddressChanged {
  readonly occurred_on: Date
  readonly event_version: number = 1;

  constructor(
      readonly aggregate_id: string,
      readonly name: string,
      readonly street: string,
      readonly number: number,
      readonly zip: string,
      readonly city: string
  ){
      this.occurred_on = new Date();
  }
}