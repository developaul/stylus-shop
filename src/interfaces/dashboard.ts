export interface DashboardInfo {
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
  cancelledOrders: number;
  numberOfClients: number;
  numberOfProducts: number;
  productsWithNoInventory: number;
  lowInventory: number;
}