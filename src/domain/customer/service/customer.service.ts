import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { Mediator } from "../../@shared/service/mediator";
import Customer from "../entity/customer";
import {v4 as uuid} from 'uuid'
import Address from "../value-object/address";

export class CustomerService{
    constructor(
        private customerRepo: CustomerRepository, 
        private mediator: Mediator
    ){}

    async create(name: string, street: string, number: number, zip: string, city: string) {
        const customer = Customer.create(uuid(), name, new Address(street, number, zip ,city));
        await this.customerRepo.create(customer);
        await this.mediator.publish(customer); 
        return customer;
    }

    async changeAddress(id: string, street: string, number: number, zip: string, city: string) {
        const customer = await this.customerRepo.find(id)
        customer.changeAddress(new Address(street, number, zip, city))
        await this.customerRepo.update(customer);
        await this.mediator.publish(customer); 
    }
}