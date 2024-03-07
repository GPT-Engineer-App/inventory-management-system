export const warehouseTemplate = {
  warehouseCode: "",
  warehouseName: "",
  warehouseAddress: "",
  managerName: "",
  managerPhone: "",
  managerEmail: "",
};

export const fakeWarehouses = Array.from({ length: 10 }, (_, index) => {
  const paddedIndex = (index + 1).toString().padStart(3, "0");
  return {
    warehouseCode: `W${paddedIndex}`,
    warehouseName: `Warehouse ${paddedIndex}`,
    warehouseAddress: `Address ${paddedIndex}`,
    managerName: `Manager ${paddedIndex}`,
    managerPhone: `Phone ${paddedIndex}`,
    managerEmail: `email${paddedIndex}@warehouse.com`,
  };
});
