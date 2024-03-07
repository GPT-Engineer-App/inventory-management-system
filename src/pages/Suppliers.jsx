import React, { useState } from "react";
import { SupplierController } from "../controllers/SupplierController";
import { Box, FormControl, FormLabel, Input, Button, VStack, HStack, Table, Thead, Tbody, Tr, Th, Td, Heading, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const PAGE_SIZE = 5;

const Suppliers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const supplierController = new SupplierController();
  const [suppliers, setSuppliers] = useState(supplierController.suppliers);
  const [newSupplier, setNewSupplier] = useState(supplierController.newSupplier);
  const [editingSupplier, setEditingSupplier] = useState(null);

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
    supplierController.editSupplier(globalIndex, newSupplier);
    setSuppliers(supplierController.suppliers);
    setEditingIndex(-1);
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
    supplierController.addSupplier(newSupplier);
    setSuppliers(supplierController.suppliers);
    setNewSupplier(supplierController.newSupplier);
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
