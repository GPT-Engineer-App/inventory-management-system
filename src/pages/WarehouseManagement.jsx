import React, { useState } from "react";
import { Box, VStack, Heading, Text, FormControl, FormLabel, Input, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const WarehouseManagement = () => {
  const [warehouses, setWarehouses] = useState([
    { warehouseCode: "WH001", warehouseName: "Central Warehouse", warehouseAddress: "1234 Central St", managerName: "John Doe", managerPhone: "555-1234", managerEmail: "johndoe@example.com" },
    { warehouseCode: "WH002", warehouseName: "East Warehouse", warehouseAddress: "5678 East Ave", managerName: "Jane Smith", managerPhone: "555-5678", managerEmail: "janesmith@example.com" },
    { warehouseCode: "WH003", warehouseName: "West Warehouse", warehouseAddress: "9101 West Blvd", managerName: "Jim Bean", managerPhone: "555-9101", managerEmail: "jimbean@example.com" },
    { warehouseCode: "WH004", warehouseName: "North Warehouse", warehouseAddress: "1121 North Rd", managerName: "Julia Jones", managerPhone: "555-1121", managerEmail: "juliajones@example.com" },
    { warehouseCode: "WH005", warehouseName: "South Warehouse", warehouseAddress: "3141 South St", managerName: "David Brown", managerPhone: "555-3141", managerEmail: "davidbrown@example.com" },
    { warehouseCode: "WH006", warehouseName: "Warehouse 6", warehouseAddress: "1415 Six St", managerName: "Maria Garcia", managerPhone: "555-1415", managerEmail: "mariagarcia@example.com" },
    { warehouseCode: "WH007", warehouseName: "Warehouse 7", warehouseAddress: "1617 Seven Ave", managerName: "James Wilson", managerPhone: "555-1617", managerEmail: "jameswilson@example.com" },
    { warehouseCode: "WH008", warehouseName: "Warehouse 8", warehouseAddress: "1819 Eight Blvd", managerName: "Linda Martinez", managerPhone: "555-1819", managerEmail: "lindamartinez@example.com" },
    { warehouseCode: "WH009", warehouseName: "Warehouse 9", warehouseAddress: "2021 Nine Rd", managerName: "Robert Anderson", managerPhone: "555-2021", managerEmail: "robertanderson@example.com" },
    { warehouseCode: "WH010", warehouseName: "Warehouse 10", warehouseAddress: "2223 Ten St", managerName: "Patricia Thomas", managerPhone: "555-2223", managerEmail: "patriciathomas@example.com" },
    { warehouseCode: "WH011", warehouseName: "Warehouse 11", warehouseAddress: "2425 Eleven Ave", managerName: "Michael Jackson", managerPhone: "555-2425", managerEmail: "michaeljackson@example.com" },
    { warehouseCode: "WH012", warehouseName: "Warehouse 12", warehouseAddress: "2627 Twelve Blvd", managerName: "Sarah Moore", managerPhone: "555-2627", managerEmail: "sarahmoore@example.com" },
    { warehouseCode: "WH013", warehouseName: "Warehouse 13", warehouseAddress: "2829 Thirteen Rd", managerName: "William Taylor", managerPhone: "555-2829", managerEmail: "williamtaylor@example.com" },
    { warehouseCode: "WH014", warehouseName: "Warehouse 14", warehouseAddress: "3031 Fourteen St", managerName: "Jessica White", managerPhone: "555-3031", managerEmail: "jessicawhite@example.com" },
    { warehouseCode: "WH015", warehouseName: "Warehouse 15", warehouseAddress: "3233 Fifteen Ave", managerName: "Charles Harris", managerPhone: "555-3233", managerEmail: "charlesharris@example.com" },
    { warehouseCode: "WH016", warehouseName: "Warehouse 16", warehouseAddress: "3435 Sixteen Blvd", managerName: "Barbara Martin", managerPhone: "555-3435", managerEmail: "barbaramartin@example.com" },
    { warehouseCode: "WH017", warehouseName: "Warehouse 17", warehouseAddress: "3637 Seventeen Rd", managerName: "Richard Clark", managerPhone: "555-3637", managerEmail: "richardclark@example.com" },
    { warehouseCode: "WH018", warehouseName: "Warehouse 18", warehouseAddress: "3839 Eighteen St", managerName: "Susan Rodriguez", managerPhone: "555-3839", managerEmail: "susanrodriguez@example.com" },
    { warehouseCode: "WH019", warehouseName: "Warehouse 19", warehouseAddress: "4041 Nineteen Ave", managerName: "Joseph Lewis", managerPhone: "555-4041", managerEmail: "josephlewis@example.com" },
    { warehouseCode: "WH020", warehouseName: "Warehouse 20", warehouseAddress: "4243 Twenty Blvd", managerName: "Margaret Lee", managerPhone: "555-4243", managerEmail: "margaretlee@example.com" },
  ]);
  const [newWarehouse, setNewWarehouse] = useState({
    warehouseCode: "",
    warehouseName: "",
    warehouseAddress: "",
    managerName: "",
    managerPhone: "",
    managerEmail: "",
  });

  const handleNewWarehouseChange = (e) => {
    setNewWarehouse({ ...newWarehouse, [e.target.name]: e.target.value });
  };

  const addWarehouse = () => {
    setWarehouses([...warehouses, newWarehouse]);
    setNewWarehouse({ warehouseCode: "", warehouseName: "", warehouseAddress: "" });
  };

  const handleDeleteWarehouse = (warehouseCode) => {
    setWarehouses(warehouses.filter((warehouse) => warehouse.warehouseCode !== warehouseCode));
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Heading>Warehouse Management</Heading>

        <FormControl>
          <FormLabel>Warehouse Code</FormLabel>
          <Input placeholder="Enter warehouse code" name="warehouseCode" value={newWarehouse.warehouseCode} onChange={handleNewWarehouseChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Warehouse Name</FormLabel>
          <Input placeholder="Enter warehouse name" name="warehouseName" value={newWarehouse.warehouseName} onChange={handleNewWarehouseChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Warehouse Manager Name</FormLabel>
          <Input placeholder="Enter warehouse manager's name" name="managerName" value={newWarehouse.managerName} onChange={handleNewWarehouseChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Warehouse Manager Phone</FormLabel>
          <Input placeholder="Enter warehouse manager's phone" name="managerPhone" value={newWarehouse.managerPhone} onChange={handleNewWarehouseChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Warehouse Manager Email</FormLabel>
          <Input placeholder="Enter warehouse manager's email" type="email" name="managerEmail" value={newWarehouse.managerEmail} onChange={handleNewWarehouseChange} />
        </FormControl>
        <Button
          colorScheme="blue"
          onClick={() => {
            if (!newWarehouse.managerName || !newWarehouse.managerPhone || !newWarehouse.managerEmail) {
              alert("Please fill in all the manager fields.");
              return;
            }
            addWarehouse();
          }}
        >
          Add Warehouse
        </Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Manager Name</Th>
              <Th>Manager Phone</Th>
              <Th>Manager Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {warehouses.map((warehouse, index) => (
              <Tr key={index}>
                <Td>{warehouse.warehouseCode}</Td>
                <Td>{warehouse.warehouseName}</Td>
                <Td>{warehouse.managerName}</Td>
                <Td>{warehouse.managerPhone}</Td>
                <Td>{warehouse.managerEmail}</Td>
                <Td>
                  <Button leftIcon={<FaEdit />} colorScheme="yellow" size="sm" mr={2}>
                    Edit
                  </Button>
                  <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => handleDeleteWarehouse(warehouse.warehouseCode)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default WarehouseManagement;
