import { Sequelize } from "sequelize-typescript";
import { Mediator } from "../../@shared/service/mediator";
import  { CustomerService } from "./customer.service";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import ConsoleLogWhenCustomerAddressIsChangedHandler from "../event/handler/console-log-when-customer-address-is-changed.handler";
import ConsoleLogWhenCustomerIsCreated1Handler from "../event/handler/console-log-when-customer-is-created-1.handler";
import ConsoleLogWhenCustomerIsCreated2Handler from "../event/handler/console-log-when-customer-is-created-2.handler";
import CustomerCreatedEvent from "../event/customer-created.event";
import CustomerAddressChanged from "../event/customer-address-changed.event";

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

    const mediator = new Mediator();
    mediator.eventDispatcher = new EventDispatcher();

    let customerCreated1Handler = new ConsoleLogWhenCustomerIsCreated1Handler()
    let customerCreated2Handler = new ConsoleLogWhenCustomerIsCreated2Handler()
    let customerAddressChangedHandler = new ConsoleLogWhenCustomerAddressIsChangedHandler()

    let spyCustomerCreated1Handler = jest.spyOn(customerCreated1Handler, "handle");
    let spyCustomerCreated2Handler  = jest.spyOn(customerCreated2Handler, "handle");
    let spyCustomerAddressChangedHandler = jest.spyOn(customerAddressChangedHandler, "handle");

    mediator.register(CustomerCreatedEvent.name, customerCreated1Handler)
    mediator.register(CustomerCreatedEvent.name, customerCreated2Handler)
    mediator.register(CustomerAddressChanged.name, customerAddressChangedHandler)
  
    const customerRepository = new CustomerRepository()
    let customerService = new CustomerService(customerRepository, mediator)
    let customer = await customerService.create("Customer 1", "street", 10, "zip", "city")
    await customerService.changeAddress(customer.id, "street 2", 20, "zip 2", "city 2")

    expect(spyCustomerCreated1Handler).toHaveBeenCalled();
    expect(spyCustomerCreated2Handler).toHaveBeenCalled();
    expect(spyCustomerAddressChangedHandler).toHaveBeenCalled();
  });
});
