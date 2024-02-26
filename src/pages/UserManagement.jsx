import React, { useState } from "react";
import { Box, Heading, VStack, FormControl, FormLabel, Input, Button, Switch, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", role: "", isActive: true });

  const handleNewUserChange = (e) => {
    const { name, value, checked, type } = e.target;
    setNewUser({
      ...newUser,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addNewUser = () => {
    if (newUser.username && newUser.role) {
      setUsers([...users, newUser]);
      setNewUser({ username: "", role: "", isActive: true });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEditUser = (index) => {
    const userToEdit = users[index];
    setNewUser({ ...userToEdit, isEditing: true });
  };

  const handleSaveEdit = (index) => {
    const updatedUsers = users.map((user, idx) => {
      if (idx === index) {
        return { ...newUser, isEditing: false };
      }
      return user;
    });
    setUsers(updatedUsers);
    setNewUser({ username: "", role: "", isActive: true });
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, idx) => idx !== index);
    setUsers(updatedUsers);
  };

  return (
    <Box p={5}>
      <Heading mb={6}>User Management</Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input name="username" value={newUser.username} onChange={handleNewUserChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Role</FormLabel>
          <Input name="role" value={newUser.role} onChange={handleNewUserChange} />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Active</FormLabel>
          <Switch name="isActive" isChecked={newUser.isActive} onChange={handleNewUserChange} />
        </FormControl>
        <Button colorScheme="blue" onClick={addNewUser}>
          Add User
        </Button>
      </VStack>
      <Table variant="simple" mt={10}>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Role</Th>
            <Th>Active</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={index}>
              <Td>{user.username}</Td>
              <Td>{user.role}</Td>
              <Td>{user.isActive ? "Yes" : "No"}</Td>
              <Td>
                <Button leftIcon={<FaEdit />} colorScheme="yellow" mr={2} onClick={() => handleEditUser(index)}>
                  Edit
                </Button>
                <Button leftIcon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteUser(index)}>
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

export default UserManagement;
