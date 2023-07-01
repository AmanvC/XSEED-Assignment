import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { makeRequest } from "../../utils/axios";

const RegisterForm = () => {
  const [inputs, setInputs] = useState({
    studentName: "",
    parentName: "",
    email: "",
    password: "",
    schoolCode: "",
    schoolAccessKey: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (
      !inputs.studentName ||
      !inputs.parentName ||
      !inputs.email ||
      !inputs.password ||
      !inputs.schoolCode ||
      !inputs.schoolAccessKey
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [inputs]);

  const handleSubmitForm = async () => {
    try {
      setLoading(true);
      const res = await makeRequest().post("/users/register", { ...inputs });
      toast.success(res.data.message);
      setInputs({
        studentName: "",
        parentName: "",
        email: "",
        password: "",
        schoolCode: "",
        schoolAccessKey: "",
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message || "Internal server error!");
      console.log(err);
    }
  };

  return (
    <Box
      userSelect={"none"}
      display={"flex"}
      flexDir={"column"}
      gap="10px"
      overflow={"scroll"}
      p={1}
    >
      <FormControl isRequired>
        <FormLabel>Student Name</FormLabel>
        <Input
          boxShadow="inner"
          name="studentName"
          onChange={handleInputChange}
          size="md"
          placeholder="Enter Student Name"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Parent / Guardian Name</FormLabel>
        <Input
          boxShadow="inner"
          name="parentName"
          onChange={handleInputChange}
          size="md"
          placeholder="Enter Parent / Guardian Name"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          boxShadow="inner"
          type="email"
          name="email"
          onChange={handleInputChange}
          size="md"
          placeholder="Enter Email"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          boxShadow="inner"
          type="password"
          name="password"
          onChange={handleInputChange}
          size="md"
          placeholder="Enter Password"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>School Code</FormLabel>
        <Input
          boxShadow="inner"
          name="schoolCode"
          onChange={handleInputChange}
          size="md"
          placeholder="Enter School Code"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>School Access Key</FormLabel>
        <Input
          boxShadow="inner"
          name="schoolAccessKey"
          onChange={handleInputChange}
          size="md"
          placeholder="Enter School Access Key"
        />
      </FormControl>
      <Button
        type="submit"
        mt={"32px"}
        isDisabled={!isValid}
        colorScheme="red"
        onClick={handleSubmitForm}
        isLoading={loading}
        loadingText="Registering User..."
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
