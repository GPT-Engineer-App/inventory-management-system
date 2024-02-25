import React, { useState } from "react";
import { Box, Heading, Button, Input, FormControl, FormLabel, Table, Thead, Tbody, Tr, Th, Td, VStack } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function ProductManagement() {
  const [products, setProducts] = useState([
    { code: "P001", name: "Notebook", description: "200 pages notebook", unit: "Pcs", productGroup: "Stationery" },
    { code: "P002", name: "Ball Pen", description: "Blue ink ball pen", unit: "Pcs", productGroup: "Stationery" },
    { code: "P003", name: "Desk Chair", description: "Adjustable office chair", unit: "Pcs", productGroup: "Furniture" },
    { code: "P004", name: "Monitor", description: "24 inch LED monitor", unit: "Pcs", productGroup: "Electronics" },
    { code: "P005", name: "Keyboard", description: "Mechanical keyboard", unit: "Pcs", productGroup: "Electronics" },
    { code: "P006", name: "Mouse", description: "Wireless mouse", unit: "Pcs", productGroup: "Electronics" },
    { code: "P007", name: "Printer", description: "Laser printer", unit: "Pcs", productGroup: "Electronics" },
    { code: "P008", name: "Desk Lamp", description: "LED desk lamp", unit: "Pcs", productGroup: "Furniture" },
    { code: "P009", name: "Stapler", description: "Heavy duty stapler", unit: "Pcs", productGroup: "Stationery" },
    { code: "P010", name: "Marker Pens", description: "Set of 4 colors", unit: "Set", productGroup: "Stationery" },
  ]);
  const [newProduct, setNewProduct] = useState({ code: "", name: "", description: "", unit: "", productGroup: "" });

  const handleNewProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addNewProduct = () => {
    setProducts([...products, { ...newProduct }]);
    setNewProduct({ code: "", name: "", description: "", unit: "", productGroup: "" });
  };

  return (
    <Box p={4}>
      <Heading mb={6}>Product Management</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Code</FormLabel>
          <Input placeholder="Product code" name="code" value={newProduct.code} onChange={handleNewProductChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Product name" name="name" value={newProduct.name} onChange={handleNewProductChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input placeholder="Product description" name="description" value={newProduct.description} onChange={handleNewProductChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Unit</FormLabel>
          <Input placeholder="Unit of measure" name="unit" value={newProduct.unit} onChange={handleNewProductChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Product Group</FormLabel>
          <Input placeholder="Product group" name="productGroup" value={newProduct.productGroup} onChange={handleNewProductChange} />
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addNewProduct}>
          Add Product
        </Button>
      </VStack>
      <Table variant="simple" mt={10}>
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Product Group</Th>
            <Th>Unit</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product, index) => (
            <Tr key={index}>
              <Td>{product.code}</Td>
              <Td>{product.name}</Td>
              <Td>{product.description}</Td>
              <Td>{product.productGroup}</Td>
              <Td>{product.unit}</Td>
              <Td>
                <Button leftIcon={<FaEdit />} colorScheme="yellow" size="sm">
                  Edit
                </Button>
                <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" ml={2}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
