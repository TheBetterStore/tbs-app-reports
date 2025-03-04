import 'reflect-metadata';
import TYPES from '../../../infrastructure/types';
import container from './container';
import {SQSEvent} from 'aws-lambda';
import {IAppReportsService} from "../../services/app-reports-service.interface";
import {OrderDto} from "../../../infrastructure/persistence/order.dto";

console.log('INFO - lambda is cold-starting.');
exports.handler = async (event: SQSEvent) => {
  console.info('Entered confirm-order handler', event);

  const svc = container.get<IAppReportsService>(TYPES.IAppReportsService);

  const recs = event.Records;
  for(let i = 0; i < recs.length; i++) {
    const rec = recs[i];

    console.debug(rec.body);
    const o: any = JSON.parse(rec.body);

    const order: OrderDto = o.detail;

    console.debug(`Received order: `, order);


    await svc.upsertOrder(o);
  }
  console.info('Exiting handler');
};