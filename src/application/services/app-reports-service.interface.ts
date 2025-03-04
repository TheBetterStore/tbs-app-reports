import {OrderDto} from "../../infrastructure/persistence/order.dto";

export interface IAppReportsService {

  getOrder(customerId: string, orderId: string): Promise<OrderDto>;
  upsertOrder(o: OrderDto);
}
