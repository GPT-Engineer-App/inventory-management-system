import { supplierTemplate, fakeSuppliers } from "../models/SupplierModel";

export class SupplierController {
  constructor() {
    this.suppliers = fakeSuppliers;
    this.newSupplier = supplierTemplate;
  }

  addSupplier(supplier) {
    this.suppliers = [...this.suppliers, supplier];
    this.newSupplier = { ...supplierTemplate };
  }

  editSupplier(index, supplier) {
    this.suppliers = this.suppliers.map((item, idx) => (idx === index ? supplier : item));
  }

  deleteSupplier(index) {
    this.suppliers = this.suppliers.filter((_, idx) => idx !== index);
  }
}
