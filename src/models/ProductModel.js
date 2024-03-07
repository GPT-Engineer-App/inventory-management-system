export const productTemplate = {
  code: "",
  name: "",
  description: "",
  unit: "",
  productGroup: "",
};

export const fakeProducts = Array.from({ length: 10 }, (_, index) => {
  const paddedIndex = (index + 1).toString().padStart(3, "0");
  return {
    code: `P${paddedIndex}`,
    name: `Product ${paddedIndex}`,
    description: `Description for product ${paddedIndex}`,
    unit: `Unit ${paddedIndex}`,
    productGroup: `Group ${paddedIndex}`,
  };
});
