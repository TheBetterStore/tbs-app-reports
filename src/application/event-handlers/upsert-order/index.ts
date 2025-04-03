import 'reflect-metadata';
import TYPES from '../../../infrastructure/types';
import container from './container';
import {IAppReportsService} from "../../services/app-reports-service.interface";
import {EventBridgeEvent} from "aws-lambda/trigger/eventbridge";

console.log('INFO - lambda is cold-starting.');
exports.handler = async (event: EventBridgeEvent<any,any>) => {
  console.info('Entered upsert-order handler', event);

  const svc = container.get<IAppReportsService>(TYPES.IAppReportsService);

  const order = event.detail;
  console.info(order);
  await svc.upsertOrder(order);
  console.info('Exiting handler');
};