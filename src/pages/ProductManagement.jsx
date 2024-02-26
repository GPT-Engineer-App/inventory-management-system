import React, { useState } from "react";
import { Box, Heading, Button, Input, FormControl, FormLabel, Table, Thead, Tbody, Tr, Th, Td, VStack, HStack } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const PAGE_SIZE = 5;

export default function ProductManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Rest of the component remains unchanged
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

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveEditProduct = () => {
    setProducts(products.map((product) => (product.code === editingProduct.code ? { ...editingProduct } : product)));
    setEditingProduct(null);
  };

  const handleRemoveProduct = (code) => {
    setProducts(products.filter((product) => product.code !== code));
  };

  const handleCancelEditProduct = () => {
    setEditingProduct(null);
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const addNewProduct = () => {
    setProducts([...products, { ...newProduct }]);
    setNewProduct({ code: "", name: "", description: "", unit: "", productGroup: "" });
  };

  return (
    <Box p={4}>
      <Heading mb={6}>Product Management</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Product Code</FormLabel>
          <Input placeholder="Product code" name="code" value={newProduct.code} onChange={handleNewProductChange} size="md" />
        </FormControl>
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input placeholder="Product name" name="name" value={newProduct.name} onChange={handleNewProductChange} size="md" />
        </FormControl>
        <FormControl>
          <FormLabel>Product Description</FormLabel>
          <Input placeholder="Product description" name="description" value={newProduct.description} onChange={handleNewProductChange} size="md" />
        </FormControl>
        <FormControl>
          <FormLabel>Unit</FormLabel>
          <Input placeholder="Unit of measure" name="unit" value={newProduct.unit} onChange={handleNewProductChange} size="md" />
        </FormControl>
        <FormControl>
          <FormLabel>Product Group</FormLabel>
          <Input placeholder="Product group" name="productGroup" value={newProduct.productGroup} onChange={handleNewProductChange} size="md" />
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
          {products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((product, index) => (
            <Tr key={index}>
              <Td>{editingProduct && editingProduct.code === product.code ? <Input value={editingProduct.code} onChange={(e) => setEditingProduct({ ...editingProduct, code: e.target.value })} /> : product.code}</Td>
              <Td>{editingProduct && editingProduct.code === product.code ? <Input value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} /> : product.name}</Td>
              <Td>{editingProduct && editingProduct.code === product.code ? <Input value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} /> : product.description}</Td>
              <Td>{editingProduct && editingProduct.code === product.code ? <Input value={editingProduct.productGroup} onChange={(e) => setEditingProduct({ ...editingProduct, productGroup: e.target.value })} /> : product.productGroup}</Td>
              <Td>{editingProduct && editingProduct.code === product.code ? <Input value={editingProduct.unit} onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })} /> : product.unit}</Td>
              <Td>
                {editingProduct && editingProduct.code === product.code ? (
                  <>
                    <Button leftIcon={<FaEdit />} colorScheme="green" size="sm" mr={2} onClick={handleSaveEditProduct}>
                      Save
                    </Button>
                    <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" ml={2} onClick={handleCancelEditProduct}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button leftIcon={<FaEdit />} colorScheme="yellow" size="sm" mr={2} onClick={() => handleEditProduct(product)}>
                      Edit
                    </Button>
                    <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" ml={2} onClick={() => handleRemoveProduct(product.code)}>
                      Delete
                    </Button>
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack position="fixed" bottom="0" left="0" right="0" p="5" bg="white" justifyContent="center" spacing={2} boxShadow="lg">
        <Button onClick={handlePreviousPage} isDisabled={currentPage <= 1}>
          Back
        </Button>
        {[...Array(Math.ceil(products.length / PAGE_SIZE)).keys()].map((pageNum) => (
          <Button key={pageNum} onClick={() => setCurrentPage(pageNum + 1)} colorScheme={currentPage === pageNum + 1 ? "blue" : "gray"}>
            {pageNum + 1}
          </Button>
        ))}
        <Button onClick={handleNextPage} isDisabled={products.length <= currentPage * PAGE_SIZE}>
          Next
        </Button>
      </HStack>
    </Box>
  );
}
