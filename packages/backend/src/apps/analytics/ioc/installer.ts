import "reflect-metadata";
import { Container } from "inversify";
import { InMemoryAsyncEventBus } from "../../../contexts/_core/infrastructure/bus/event/InMemoryAsyncEventBus";
import { ConsoleLogger } from "../../../contexts/_core/infrastructure/logger/ConsoleLogger";
import { coreTypes } from "../../_core/ioc/coreTypes";
import { TrackSwipeOnSwipeCreatedEvent } from "../../../contexts/analytics/candidate/application/TrackSwipeOnSwipeCreatedEvent";
import { setupEnvDependencies } from "./env-config";
import { types } from "./types";
import { MongoSwipeTrackerService } from "../../../contexts/analytics/candidate/infrastructure/MongoSwipeTracker";
import { SwipeTracker } from "../../../contexts/analytics/candidate/application/SwipeTracker";
import { MongoClientFactory } from "../../../contexts/_core/infrastructure/persistence/mongo/MongoClientFactory";

export const container = new Container();
// Core
container.bind(coreTypes.Logger).to(ConsoleLogger).inSingletonScope();
container.bind(coreTypes.EventBus).to(InMemoryAsyncEventBus).inSingletonScope();
container.bind(MongoClientFactory).to(MongoClientFactory).inSingletonScope();


// Tracking
container.bind(SwipeTracker).toSelf().inSingletonScope();
container.bind(types.SwipeTrackerService).to(MongoSwipeTrackerService).inSingletonScope();
container.bind(coreTypes.EventHandler).to(TrackSwipeOnSwipeCreatedEvent).inSingletonScope();


setupEnvDependencies(container);