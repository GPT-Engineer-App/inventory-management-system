import React, { useState, useEffect } from "react";
import { Box, FormControl, FormLabel, Input, Button, VStack, HStack, Table, Thead, Tbody, Tr, Th, Td, Heading, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const PAGE_SIZE = 5;

const Suppliers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingSupplier, setEditingSupplier] = useState(null);
  // Remove the editIndex state as it's no longer used
  const toast = useToast();
  const fakeSuppliers = Array.from({ length: 30 }, (_, index) => {
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
  const [newSupplier, setNewSupplier] = useState({ code: "", name: "", contact: "", address: "", email: "" });

  const handleNewSupplierChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setEditingSupplier({ ...editingSupplier, [name]: value });
  };

  // This useEffect is removed as it is no longer necessary with the change in the handleEditClick function.

  const handleEditClick = (pageIndex) => {
    const globalIndex = (currentPage - 1) * PAGE_SIZE + pageIndex;
    const supplierToEdit = suppliers[globalIndex];
    setEditingSupplier({ ...supplierToEdit });
  };

  const handleSaveClick = (pageIndex) => {
    const supplierToSave = suppliers.find((supplier) => supplier.code === editingSupplier.code);
    const supplierIndex = suppliers.indexOf(supplierToSave);
    if (supplierIndex !== -1) {
      if (!editingSupplier.code || !editingSupplier.name || !editingSupplier.contact || !editingSupplier.address || !editingSupplier.email) {
        toast({
          title: "Error",
          description: "All fields are required.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const globalIndex = (currentPage - 1) * PAGE_SIZE + pageIndex;
      const updatedSuppliers = suppliers.map((supplier, idx) => (idx === supplierIndex ? { ...editingSupplier, isEditing: false } : supplier));
      setSuppliers(updatedSuppliers);
      setEditingSupplier(null);
    }
  };

  const handleCancelClick = () => {
    setEditingSupplier(null);
    // setEditIndex(-1); (This line has been removed as `setEditIndex` is not defined)
  };
  const handleDeleteSupplier = (indexToDelete) => {
    const globalIndexToDelete = (currentPage - 1) * PAGE_SIZE + indexToDelete;
    setSuppliers(suppliers.filter((_, idx) => idx !== globalIndexToDelete));
  };
  const handleCancelEditSupplier = () => {
    setEditingSupplier(null);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addNewSupplier = () => {
    const { code, name, contact, address, email } = newSupplier;
    const isEmpty = !code || !name || !contact || !address || !email;
    const isDuplicate = suppliers.some((supplier) => supplier.code === code);
    const isEmailValid = validateEmail(email);

    if (isEmpty) {
      alert("Please fill in all the fields.");
    } else if (isDuplicate) {
      alert("A supplier with this code already exists.");
    } else if (!isEmailValid) {
      alert("Please enter a valid email address.");
    } else {
      setSuppliers([...suppliers, { code, name, contact, address, email }]);
      setNewSupplier({ code: "", name: "", contact: "", address: "", email: "" });
    }
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
          <Input placeholder="Enter supplier code" name="code" value={newSupplier.code} onChange={handleNewSupplierChange} size="md" />
        </FormControl>
        <FormControl>
          <FormLabel>Supplier Name</FormLabel>
          <Input placeholder="Enter supplier name" name="name" value={newSupplier.name} onChange={handleNewSupplierChange} size="md" />
        </FormControl>
        <FormControl>
          <FormLabel>Supplier Phone</FormLabel>
          <Input placeholder="Enter supplier phone" name="contact" value={newSupplier.contact} onChange={handleNewSupplierChange} size="md" />
        </FormControl>
        <FormControl>
          <FormLabel>Supplier Address</FormLabel>
          <Input placeholder="Enter supplier address" name="address" value={newSupplier.address} onChange={handleNewSupplierChange} size="md" />
        </FormControl>
        <FormControl>
          <FormLabel>Supplier E-mail</FormLabel>
          <Input type="email" placeholder="Enter supplier email" name="email" value={newSupplier.email} onChange={handleNewSupplierChange} size="md" />
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
            <Th>E-mail</Th>
          </Tr>
        </Thead>
        <Tbody>
          {suppliers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((supplier, index) => (
            <Tr key={index}>
              <Td>{editingSupplier && editingSupplier.code === supplier.code ? <Input value={editingSupplier.code} onChange={(e) => setEditingSupplier({ ...editingSupplier, code: e.target.value })} /> : supplier.code}</Td>
              <Td>{editingSupplier && editingSupplier.code === supplier.code ? <Input value={editingSupplier.name} onChange={(e) => setEditingSupplier({ ...editingSupplier, name: e.target.value })} /> : supplier.name}</Td>
              <Td>{editingSupplier && editingSupplier.code === supplier.code ? <Input value={editingSupplier.contact} onChange={(e) => setEditingSupplier({ ...editingSupplier, contact: e.target.value })} /> : supplier.contact}</Td>
              <Td>{editingSupplier && editingSupplier.code === supplier.code ? <Input value={editingSupplier.address} onChange={(e) => setEditingSupplier({ ...editingSupplier, address: e.target.value })} /> : supplier.address}</Td>
              <Td>{editingSupplier && editingSupplier.code === supplier.code ? <Input type="email" value={editingSupplier.email} onChange={(e) => setEditingSupplier({ ...editingSupplier, email: e.target.value })} /> : supplier.email}</Td>
              <Td>
                {editingSupplier && suppliers[(currentPage - 1) * PAGE_SIZE + index].code === editingSupplier.code ? (
                  <>
                    <Button leftIcon={<FaSave />} colorScheme="green" size="sm" mr={2} onClick={() => handleSaveClick(index)}>
                      Save
                    </Button>
                    <Button leftIcon={<FaTimes />} colorScheme="gray" size="sm" ml={2} onClick={handleCancelClick}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button leftIcon={<FaEdit />} colorScheme="yellow" size="sm" mr={2} onClick={() => handleEditClick(index)}>
                      Edit
                    </Button>
                    <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" ml={2} onClick={() => handleDeleteSupplier(index)}>
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
