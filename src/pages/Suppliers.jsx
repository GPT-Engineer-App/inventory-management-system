import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Button, VStack, HStack, Table, Thead, Tbody, Tr, Th, Td, Heading } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const PAGE_SIZE = 5;

const Suppliers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingSupplier, setEditingSupplier] = useState({ code: "", name: "", contact: "", address: "", isEditing: false });
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
  const handleDeleteSupplier = (indexToDelete) => {
    const { code } = suppliers[indexToDelete];
    setSuppliers(suppliers.filter((supplier) => supplier.code !== code));
  };
  const handleCancelEditSupplier = (indexToCancel) => {
    setSuppliers(suppliers.map((supplier, idx) => (idx === indexToCancel ? { ...supplier, isEditing: false } : supplier)));
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
          <Input placeholder="Enter supplier code" name="code" value={newSupplier.code} onChange={handleNewSupplierChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Supplier Name</FormLabel>
          <Input placeholder="Enter supplier name" name="name" value={newSupplier.name} onChange={handleNewSupplierChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Supplier Phone</FormLabel>
          <Input placeholder="Enter supplier phone" name="phone" value={newSupplier.phone} onChange={handleNewSupplierChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Supplier E-mail</FormLabel>
          <Input type="email" placeholder="Enter supplier email" name="email" value={newSupplier.email} onChange={handleNewSupplierChange} />
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
              <Td>{supplier.isEditing ? <Input value={supplier.code} onChange={(e) => handleSupplierChange(e, index)} name="code" /> : supplier.code}</Td>
              <Td>{supplier.isEditing ? <Input value={supplier.name} onChange={(e) => handleSupplierChange(e, index)} name="name" /> : supplier.name}</Td>
              <Td>{supplier.isEditing ? <Input value={supplier.contact} onChange={(e) => handleSupplierChange(e, index)} name="contact" /> : supplier.contact}</Td>
              <Td>{supplier.isEditing ? <Input value={supplier.address} onChange={(e) => handleSupplierChange(e, index)} name="address" /> : supplier.address}</Td>
              <Td>{supplier.isEditing ? <Input type="email" value={supplier.email} onChange={(e) => handleSupplierChange(e, index)} name="email" /> : supplier.email}</Td>
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
