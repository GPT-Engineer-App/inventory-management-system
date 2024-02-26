import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Button, VStack, HStack, Table, Thead, Tbody, Tr, Th, Td, Heading } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const PAGE_SIZE = 5;

const Suppliers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const fakeSuppliers = Array.from({ length: 20 }, (_, index) => {
    const paddedIndex = (index + 1).toString().padStart(3, "0");
    return {
      code: `S${paddedIndex}`,
      name: `Supplier ${paddedIndex}`,
      contact: `Contact ${paddedIndex}`,
      address: `Address ${paddedIndex}`,
    };
  });
  const [suppliers, setSuppliers] = useState(fakeSuppliers.map((supplier) => ({ ...supplier, isEditing: false })));
  const [newSupplier, setNewSupplier] = useState({ code: "", name: "", contact: "", address: "" });
  const [editingSupplier, setEditingSupplier] = useState({});

  const handleNewSupplierChange = (e) => {
    const { name, value } = e.target;
    if (editingSupplier.code) {
      setEditingSupplier({ ...editingSupplier, [name]: value });
    } else {
      setNewSupplier({ ...newSupplier, [name]: value });
    }
  };

  const handleEditSupplier = (supplierToEdit) => {
    setEditingSupplier(supplierToEdit);
    setSuppliers(suppliers.map((supplier) => (supplier.code === supplierToEdit.code ? { ...supplier, isEditing: true } : supplier)));
  };

  const handleSaveEdit = (codeToSave) => {
    setSuppliers(suppliers.map((supplier) => (supplier.code === codeToSave ? { ...editingSupplier, isEditing: false } : supplier)));
    setEditingSupplier({});
  };

  const handleCancelEdit = (codeToCancel) => {
    setSuppliers(suppliers.map((supplier) => (supplier.code === codeToCancel ? { ...supplier, isEditing: false } : supplier)));
    setEditingSupplier({});
  };

  const handleDeleteSupplier = (codeToDelete) => {
    setSuppliers(suppliers.filter((supplier) => supplier.code !== codeToDelete));
    if (editingSupplier.code === codeToDelete) {
      setEditingSupplier({});
    }
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
          <Input placeholder="Enter supplier code" name="code" value={editingSupplier.code || newSupplier.code} onChange={handleNewSupplierChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Enter supplier name" name="name" value={editingSupplier.name || newSupplier.name} onChange={handleNewSupplierChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Contact</FormLabel>
          <Input placeholder="Enter supplier contact" name="contact" value={editingSupplier.contact || newSupplier.contact} onChange={handleNewSupplierChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input placeholder="Enter supplier address" name="address" value={editingSupplier.address || newSupplier.address} onChange={handleNewSupplierChange} />
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
          {suppliers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((supplier, index) => (
            <Tr key={index}>
              <Td>{supplier.code}</Td>
              <Td>{supplier.name}</Td>
              <Td>{supplier.contact}</Td>
              <Td>{supplier.address}</Td>
              <Td>
                {supplier.isEditing ? (
                  <>
                    <Button leftIcon={<FaEdit />} colorScheme="green" size="sm" mr={2} onClick={() => handleSaveEdit(supplier.code)}>
                      Save
                    </Button>
                    <Button leftIcon={<FaTrash />} colorScheme="yellow" size="sm" mr={2} onClick={() => handleCancelEdit(supplier.code)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button leftIcon={<FaEdit />} colorScheme="yellow" size="sm" mr={2} onClick={() => handleEditSupplier(supplier)}>
                      Edit
                    </Button>
                    <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" ml={2} onClick={() => handleDeleteSupplier(supplier.code)}>
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
