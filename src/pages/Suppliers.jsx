import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Button, VStack, HStack, Table, Thead, Tbody, Tr, Th, Td, Heading } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const PAGE_SIZE = 5;

const Suppliers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingSupplier, setEditingSupplier] = useState({ code: "", name: "", contact: "", address: "", isEditing: false });
  const fakeSuppliers = Array.from({ length: 20 }, (_, index) => {
    const paddedIndex = (index + 1).toString().padStart(3, "0");
    return {
      code: `S${paddedIndex}`,
      name: `Supplier ${paddedIndex}`,
      contact: `Contact ${paddedIndex}`,
      address: `Address ${paddedIndex}`,
      isEditing: false,
    };
  });
  const [suppliers, setSuppliers] = useState(fakeSuppliers);
  const [newSupplier, setNewSupplier] = useState({ code: "", name: "", contact: "", address: "" });

  const handleNewSupplierChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  const handleSupplierChange = (e, index) => {
    const { name, value } = e.target;
    setSuppliers(suppliers.map((supplier, idx) => (idx === index ? { ...supplier, [name]: value } : supplier)));
  };

  const handleEditSupplier = (index) => {
    const supplierToEdit = suppliers[index];
    setEditingSupplier({ ...supplierToEdit, isEditing: true });
    setSuppliers(suppliers.map((supplier, idx) => (idx === index ? { ...supplier, isEditing: true } : supplier)));
  };

  const handleSaveEditSupplier = (indexToSave) => {
    setSuppliers(suppliers.map((supplier, idx) => (idx === indexToSave ? { ...supplier, isEditing: false } : supplier)));
  };

  const handleCancelEditSupplier = (index) => {
    setSuppliers(suppliers.map((supplier, idx) => (idx === index ? { ...supplier, isEditing: false } : supplier)));
  };

  const addNewSupplier = () => {
    const { code, name, contact, address } = editingSupplier;
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

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Box p={4}>
      <Heading mb={6}>Suppliers Management</Heading>
      <VStack spacing={4}>
        {/* ... All existing form controls and the Add Supplier button ... */}
        <FormControl>
          <FormLabel>Supplier Code</FormLabel>
          <Input placeholder="Enter supplier code" name="code" value={newSupplier.code} onChange={handleNewSupplierChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Supplier Name</FormLabel>
          <Input placeholder="Enter supplier name" name="name" value={newSupplier.name} onChange={handleNewSupplierChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Supplier Contact</FormLabel>
          <Input placeholder="Enter supplier contact" name="contact" value={newSupplier.contact} onChange={handleNewSupplierChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Supplier Address</FormLabel>
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
            <Th>Supplier Address</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {suppliers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((supplier, index) => (
            <Tr key={index}>
              <Td>{supplier.isEditing ? <Input value={supplier.code} onChange={(e) => handleSupplierChange(e, index)} name="code" /> : supplier.code}</Td>
              <Td>{supplier.isEditing ? <Input value={supplier.name} onChange={(e) => handleSupplierChange(e, index)} name="name" /> : supplier.name}</Td>
              <Td>{supplier.isEditing ? <Input value={supplier.contact} onChange={(e) => handleSupplierChange(e, index)} name="contact" /> : supplier.contact}</Td>
              <Td>{supplier.isEditing ? <Input value={supplier.address} onChange={(e) => handleSupplierChange(e, index)} name="address" /> : supplier.address}</Td>
              <Td>
                {supplier.isEditing ? (
                  <>
                    <Button leftIcon={<FaEdit />} colorScheme="yellow" size="sm" mr={2} onClick={() => handleSaveEditSupplier(index)}>
                      Save
                    </Button>
                    <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" ml={2} onClick={() => handleCancelEditSupplier(index)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button leftIcon={<FaEdit />} colorScheme="yellow" size="sm" mr={2} onClick={() => handleEditSupplier(index)}>
                      Edit
                    </Button>
                    <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" ml={2}>
                      Delete
                    </Button>
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack justifyContent="center" spacing={2} mt="8">
        <Button onClick={handlePreviousPage} isDisabled={currentPage <= 1}>
          Back
        </Button>
        {[...Array(Math.ceil(suppliers.length / PAGE_SIZE)).keys()].map((pageNum) => (
          <Button key={pageNum} onClick={() => setCurrentPage(pageNum + 1)} colorScheme={currentPage === pageNum + 1 ? "blue" : "gray"}>
            {pageNum + 1}
          </Button>
        ))}
        <Button onClick={handleNextPage} isDisabled={suppliers.length <= currentPage * PAGE_SIZE}>
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default Suppliers;
