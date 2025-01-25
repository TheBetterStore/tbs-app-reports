import {Order} from '../../domain/entities/order';

export interface IReportsRepository {
  getOrder(customerId: string, orderId: string): Promise<any>;
  upsertOrder(p: Order): Promise<any>
}
