export const supplierTemplate = {
  code: "",
  name: "",
  contact: "",
  address: "",
  email: "",
};

export const fakeSuppliers = Array.from({ length: 30 }, (_, index) => {
  const paddedIndex = (index + 1).toString().padStart(3, "0");
  return {
    code: `S${paddedIndex}`,
    name: `Supplier ${paddedIndex}`,
    contact: `Contact ${paddedIndex}`,
    address: `Address ${paddedIndex}`,
    email: `email${paddedIndex}@example.com`,
  };
});
