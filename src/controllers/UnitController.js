import { unitTemplate, fakeUnits } from "../models/UnitModel";

export class UnitController {
  constructor() {
    this.units = fakeUnits;
    this.newUnit = unitTemplate;
  }

  addUnit(unit) {
    this.units = [...this.units, unit];
    this.newUnit = { ...unitTemplate };
  }

  editUnit(index, unit) {
    this.units = this.units.map((item, idx) => (idx === index ? unit : item));
  }

  deleteUnit(index) {
    this.units = this.units.filter((_, idx) => idx !== index);
  }
}
