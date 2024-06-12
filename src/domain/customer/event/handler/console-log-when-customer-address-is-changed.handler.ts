import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent, { CustomerAddressChangedProps } from "../customer-address-changed.event";

export default class ConsoleLogWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    let data = event.eventData as CustomerAddressChangedProps
    let address = `${data.street} ${data.number} ${data.zip}`
    console.log(`Endereço do cliente: ${data.customerId}, ${data.name} alterado para: ${address}`)
  }
}
