import { AgreggateRoot } from "../domain/aggregate-root"
import EventDispatcher from '../event/event-dispatcher';
import EventHandlerInterface from '../event/event-handler.interface';

export class Mediator {

    eventDispatcher: EventDispatcher;

    register(eventName: string, listener: EventHandlerInterface) {
        this.eventDispatcher.register(eventName, listener);
    }

    async publish(aggregate_root: AgreggateRoot) {
        const events = aggregate_root.events
        for (const event of events) {
            this.eventDispatcher.notify(event)
        }
    }
}