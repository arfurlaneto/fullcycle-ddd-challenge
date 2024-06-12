import { CustomerAddressChanged } from "../entity/customer-address-changed.event";

export class CustomerAddressChangedListener {
    handle(event: CustomerAddressChanged){
      console.log(`Endereço do cliente: ${event.aggregate_id}, ${event.aggregate_id} alterado para: ${event.street} ${event.number} ${event.zip}`)
    }
}