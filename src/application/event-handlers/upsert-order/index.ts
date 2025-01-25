import 'reflect-metadata';
import TYPES from '../../../infrastructure/types';
import container from './container';
import {SQSEvent} from 'aws-lambda';
import {Logger} from '@thebetterstore/tbs-lib-infra-common/lib/logger';
import {IAppReportsService} from "../../services/app-reports-service.interface";

console.log('INFO - lambda is cold-starting.');
exports.handler = async (event: SQSEvent) => {
  Logger.info('Entered confirm-order handler', event);

  const svc = container.get<IAppReportsService>(TYPES.IAppReportsService);

  const recs = event.Records;
  for(let i = 0; i < recs.length; i++) {
    const rec = recs[i];

    Logger.debug(rec.body);
    const o: any = JSON.parse(rec.body);

    Logger.debug(`Received event: `, o);

    await svc.upsertOrder(o);
  }
  Logger.info('Exiting handler');
};