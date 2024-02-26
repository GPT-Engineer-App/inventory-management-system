import React, { useState } from "react";
import { Box, Heading, VStack, FormControl, FormLabel, Input, Button, Switch, Table, Thead, Tbody, Tr, Th, Td, HStack, Select } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const PAGE_SIZE = 5;

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const fakeUsers = [
    { username: "user1", role: "Admin", isActive: true },
    { username: "user2", role: "Editor", isActive: false },
    { username: "user3", role: "Viewer", isActive: true },
    { username: "user4", role: "Admin", isActive: false },
    { username: "user5", role: "Editor", isActive: true },
    { username: "user6", role: "Viewer", isActive: false },
    { username: "user7", role: "Admin", isActive: true },
    { username: "user8", role: "Editor", isActive: true },
    { username: "user9", role: "Viewer", isActive: false },
    { username: "user10", role: "Admin", isActive: true },
  ];
  const [users, setUsers] = useState(fakeUsers);
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
          <Select name="role" value={newUser.role} onChange={handleNewUserChange} placeholder="Select role">
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </Select>
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
          {users.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((user, index) => (
            <Tr key={index}>
              <Td>{user.username}</Td>
              <Td>{user.role}</Td>
              <Td>{user.isActive ? "Yes" : "No"}</Td>
              <Td>
                <Button leftIcon={<FaEdit />} colorScheme="yellow" mr={2} onClick={() => handleEditUser(index)}>
                  Save Edit
                </Button>
                <Button leftIcon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteUser(index)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack justifyContent="center" spacing={2} mt="8">
        <Button onClick={() => setCurrentPage(currentPage - 1)} isDisabled={currentPage <= 1}>
          Back
        </Button>
        {[...Array(Math.ceil(users.length / PAGE_SIZE)).keys()].map((pageNum) => (
          <Button key={pageNum} onClick={() => setCurrentPage(pageNum + 1)} colorScheme={currentPage === pageNum + 1 ? "blue" : "gray"}>
            {pageNum + 1}
          </Button>
        ))}
        <Button onClick={() => setCurrentPage(currentPage + 1)} isDisabled={users.length <= currentPage * PAGE_SIZE}>
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default UserManagement;
