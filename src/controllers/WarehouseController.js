export class WarehouseController {
  constructor() {
    this.warehouses = fakeWarehouses;
    this.newWarehouse = warehouseTemplate;
  }

  addWarehouse(warehouse) {
    this.warehouses = [...this.warehouses, warehouse];
    this.newWarehouse = { ...warehouseTemplate };
  }

  editWarehouse(index, warehouse) {
    this.warehouses = this.warehouses.map((item, idx) => (idx === index ? warehouse : item));
  }

  deleteWarehouse(index) {
    this.warehouses = this.warehouses.filter((_, idx) => idx !== index);
  }
}
