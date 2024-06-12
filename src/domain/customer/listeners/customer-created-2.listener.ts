import { CustomerCreated } from "../entity/customer-created.event";

export class CustomerCreated2Listener {
    handle(event: CustomerCreated){
      console.log("Esse é o segundo console.log do evento: CustomerCreated")
    }
}