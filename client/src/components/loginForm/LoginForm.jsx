import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (inputs.email.length > 0 && inputs.password.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [inputs]);

  const handleSubmitForm = async () => {
    setLoading(true);
    await login(inputs.email, inputs.password);
    setLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"} mt={6} mb={6}>
          {/* <Heading mb={4} d="flex" justifyContent={"center"}> */}
          <img
            style={{
              height: "40px",
              display: "inline-block",
              margin: "30px 0",
            }}
            src="https://cdn-igjlb.nitrocdn.com/EXTVWscdRUObVEkANNyRfVXPJkRRYGrl/assets/images/optimized/rev-bc099d6/wp-content/uploads/2015/04/logo.png"
            alt=""
          />
          {/* </Heading> */}
          <p>Login to continue!</p>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
              size="lg"
            />
          </FormControl>
          <FormControl isRequired mt={6}>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
              size="lg"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            isDisabled={!isValid}
            colorScheme="red"
            onClick={handleSubmitForm}
            isLoading={loading}
            loadingText="Logging In"
          >
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginForm;
