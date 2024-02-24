import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Heading, Text, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlus, FaUserCircle, FaStoreAlt } from "react-icons/fa";

const Index = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "", store: "", quantity: 0 });

  const handleNewItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addNewItem = () => {
    setInventoryItems([...inventoryItems, newItem]);
    setNewItem({ name: "", category: "", store: "", quantity: 0 });
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <VStack spacing={4}>
          <Heading>Inventory Management System</Heading>
          <HStack>
            <FaUserCircle size={30} />
            <Text fontWeight="bold">User Role: Manager</Text>
          </HStack>
          <Box w="full" p={4} borderWidth="1px" borderRadius="lg">
            <Heading size="md" mb={4}>
              <FaStoreAlt /> Add New Inventory Item
            </Heading>
            <HStack>
              <FormControl id="itemName" isRequired>
                <FormLabel>Item Name</FormLabel>
                <Input name="name" value={newItem.name} onChange={handleNewItemChange} />
              </FormControl>
              <FormControl id="itemCategory" isRequired>
                <FormLabel>Category</FormLabel>
                <Select name="category" value={newItem.category} onChange={handleNewItemChange}>
                  {/* Categories can be dynamically loaded */}
                  <option value="electronics">Electronics</option>
                  <option value="apparel">Apparel</option>
                  <option value="home-goods">Home Goods</option>
                </Select>
              </FormControl>
              <FormControl id="itemStore" isRequired>
                <FormLabel>Store</FormLabel>
                <Select name="store" value={newItem.store} onChange={handleNewItemChange}>
                  {/* Stores can be dynamically loaded */}
                  <option value="store-1">Store 1</option>
                  <option value="store-2">Store 2</option>
                </Select>
              </FormControl>
              <FormControl id="itemQuantity" isRequired>
                <FormLabel>Quantity</FormLabel>
                <Input type="number" name="quantity" value={newItem.quantity} onChange={handleNewItemChange} />
              </FormControl>
              <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addNewItem}>
                Add Item
              </Button>
            </HStack>
          </Box>
          <Box w="full" p={4} borderWidth="1px" borderRadius="lg">
            <Heading size="md" mb={4}>
              Inventory List
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Item Name</Th>
                  <Th>Category</Th>
                  <Th>Store</Th>
                  <Th isNumeric>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {inventoryItems.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.name}</Td>
                    <Td>{item.category}</Td>
                    <Td>{item.store}</Td>
                    <Td isNumeric>{item.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
