import {OrderDto} from "../persistence/order.dto";

export interface IReportsRepository {
  getOrder(customerId: string, orderId: string): Promise<any>;
  upsertOrder(p: OrderDto): Promise<any>
}
