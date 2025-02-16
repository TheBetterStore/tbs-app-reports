import {OrderViewModel} from '../viewmodels/order-viewmodel';

export interface IAppReportsService {

  getOrder(customerId: string, orderId: string): Promise<OrderViewModel>;
  upsertOrder(o: OrderViewModel);
}
