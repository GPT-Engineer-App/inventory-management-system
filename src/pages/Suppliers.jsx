import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Button, VStack, Table, Thead, Tbody, Tr, Th, Td, Heading } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Suppliers = () => {
  const fakeSuppliers = Array.from({ length: 20 }, (_, index) => ({
    code: `S00${index + 1}`,
    name: `Supplier ${index + 1}`,
    contact: `Contact ${index + 1}`,
    address: `Address ${index + 1}`,
  }));
  const [suppliers, setSuppliers] = useState(fakeSuppliers);
  const [newSupplier, setNewSupplier] = useState({ code: "", name: "", contact: "", address: "" });

  const handleNewSupplierChange = (e) => {
    setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
  };

  const addNewSupplier = () => {
    const { code, name, contact, address } = newSupplier;
    const isEmpty = !code || !name || !contact || !address;
    if (isEmpty) {
      alert("Please fill in all fields.");
      return;
    }
    const isDuplicate = suppliers.some((supplier) => supplier.code === code);
    if (isDuplicate) {
      alert("Supplier with this code already exists.");
      return;
    }
    setSuppliers([...suppliers, newSupplier]);
    setNewSupplier({ code: "", name: "", contact: "", address: "" });
  };

  return (
    <Box p={4}>
      <Heading mb={6}>Suppliers Management</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Supplier Code</FormLabel>
          <Input placeholder="Enter supplier code" name="code" value={newSupplier.code} onChange={handleNewSupplierChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Enter supplier name" name="name" value={newSupplier.name} onChange={handleNewSupplierChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Contact</FormLabel>
          <Input placeholder="Enter supplier contact" name="contact" value={newSupplier.contact} onChange={handleNewSupplierChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input placeholder="Enter supplier address" name="address" value={newSupplier.address} onChange={handleNewSupplierChange} />
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addNewSupplier}>
          Add Supplier
        </Button>
      </VStack>
      <Table variant="simple" mt={10}>
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Name</Th>
            <Th>Contact</Th>
            <Th>Address</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {suppliers.map((supplier, index) => (
            <Tr key={index}>
              <Td>{supplier.code}</Td>
              <Td>{supplier.name}</Td>
              <Td>{supplier.contact}</Td>
              <Td>{supplier.address}</Td>
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
};

export default Suppliers;
