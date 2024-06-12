import { Sequelize } from "sequelize-typescript";
import { Mediator } from "../../@shared/service/mediator";
import { CustomerAddressChanged } from "../entity/customer-address-changed.event";
import { CustomerCreated } from "../entity/customer-created.event";
import { CustomerAddressChangedListener } from "../listeners/customer-address-changed.listener";
import { CustomerCreated1Listener } from "../listeners/customer-created-1.listener";
import { CustomerCreated2Listener } from "../listeners/customer-created-2.listener";
import  { CustomerService } from "./customer.service";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import EventEmitter2 from "eventemitter2";
import Address from "../value-object/address";

describe("Customer service unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should emit customer events", async () => {
    let customerCreated1Listener = new CustomerCreated1Listener()
    let customerCreated2Listener = new CustomerCreated2Listener()
    let customerAddressChanged = new CustomerAddressChangedListener()

    let spyCustomerCreated1Listener = jest.spyOn(customerCreated1Listener, "handle");
    let spyCustomerCreated2Listener = jest.spyOn(customerCreated2Listener, "handle");
    let spyCustomerAddressChanged = jest.spyOn(customerAddressChanged, "handle");

    const mediator = new Mediator();
    mediator.eventEmitter = new EventEmitter2()
    mediator.register(CustomerCreated.name, customerCreated1Listener.handle)
    mediator.register(CustomerCreated.name, customerCreated2Listener.handle)
    mediator.register(CustomerAddressChanged.name, customerAddressChanged.handle)
  
    const customerRepository = new CustomerRepository()
    let customerService = new CustomerService(customerRepository, mediator)
    let customer = await customerService.create("Customer 1", "street", 10, "zip", "city")
    await customerService.changeAddress(customer.id, "street 2", 20, "zip 2", "city 2")

    expect(spyCustomerCreated1Listener).toHaveBeenCalled();
    expect(spyCustomerCreated2Listener).toHaveBeenCalled();
    expect(spyCustomerAddressChanged).toHaveBeenCalled();
  });
});
