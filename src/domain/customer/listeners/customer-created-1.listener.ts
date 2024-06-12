import { CustomerCreated } from "../entity/customer-created.event";

export class CustomerCreated1Listener {
    handle(event: CustomerCreated) {
      console.log("Esse é o primeiro console.log do evento: CustomerCreated")
    }
}