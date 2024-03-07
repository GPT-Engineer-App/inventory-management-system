import React, { useState, useEffect } from "react";
import { Box, Heading, VStack, FormControl, FormLabel, Input, Button, Switch, Table, Thead, Tbody, Tr, Th, Td, HStack, Select } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { UserController } from "../controllers/UserController";

const userController = new UserController();

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

  const handleUserChange = (e, pageUserIndex) => {
    const { name, value, checked, type } = e.target;
    const actualIndex = (currentPage - 1) * PAGE_SIZE + pageUserIndex;
    setUsers(users.map((user, idx) => (idx === actualIndex ? { ...user, [name]: type === "checkbox" ? checked : value } : user)));
  };

  const addNewUser = () => {
    if (newUser.username && newUser.role) {
      setUsers([...users, newUser]);
      setNewUser({ username: "", role: "", isActive: true });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEditUser = (pageUserIndex) => {
    const actualIndex = (currentPage - 1) * PAGE_SIZE + pageUserIndex;
    setUsers(users.map((user, idx) => (idx === actualIndex ? { ...user, isEditing: true } : user)));
  };

  const handleSaveEdit = (pageUserIndex) => {
    const actualIndex = (currentPage - 1) * PAGE_SIZE + pageUserIndex;
    setUsers(
      users.map((user, idx) => {
        if (idx === actualIndex) {
          return { ...user, isEditing: false };
        }
        return user;
      }),
    );
  };

  const handleNewUserChange = (e, index) => {
    const { name, value, checked, type } = e.target;
    const updatedUsers = users.map((user, idx) =>
      idx === index
        ? {
            ...user,
            [name]: type === "checkbox" ? checked : value,
          }
        : user,
    );
    setUsers(updatedUsers);
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
          <Input name="username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })} size="md" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Role</FormLabel>
          <Select name="role" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })} size="md" placeholder="Select role">
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </Select>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Active</FormLabel>
          <Switch name="isActive" isChecked={newUser.isActive} onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.checked })} />
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
          {users.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((user, pageUserIndex) => (
            <Tr key={pageUserIndex}>
              <Td>{user.isEditing ? <Input name="username" value={user.username} onChange={(e) => handleUserChange(e, pageUserIndex)} /> : user.username}</Td>
              <Td>
                {user.isEditing ? (
                  <Select name="role" value={user.role} onChange={(e) => handleUserChange(e, pageUserIndex)}>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </Select>
                ) : (
                  user.role
                )}
              </Td>
              <Td>{user.isEditing ? <Switch name="isActive" isChecked={user.isActive} onChange={(e) => handleUserChange(e, pageUserIndex)} /> : user.isActive ? "Yes" : "No"}</Td>
              <Td>
                {user.isEditing ? (
                  <Button leftIcon={<FaEdit />} colorScheme="green" onClick={() => handleSaveEdit(pageUserIndex)}>
                    Save
                  </Button>
                ) : (
                  <Button leftIcon={<FaEdit />} colorScheme="yellow" onClick={() => handleEditUser(pageUserIndex)}>
                    Edit
                  </Button>
                )}
                <Button leftIcon={<FaTrash />} colorScheme="red" ml={2} onClick={() => handleDeleteUser((currentPage - 1) * PAGE_SIZE + pageUserIndex)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack position="fixed" bottom="0" left="0" right="0" p="5" bg="white" justifyContent="center" spacing={2} boxShadow="lg">
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
