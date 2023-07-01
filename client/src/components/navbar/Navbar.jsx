import { React, useContext } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import LoginForm from "../loginForm/LoginForm";

const Links = ["About Us", "News", "Contact Us"];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <>
      <Box
        boxShadow="xl"
        p={"10px 20px"}
        position={"sticky"}
        top={0}
        bgColor={"white"}
        zIndex={100}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link to={"/"}>
                <img
                  style={{ height: "30px" }}
                  src="https://cdn-igjlb.nitrocdn.com/EXTVWscdRUObVEkANNyRfVXPJkRRYGrl/assets/images/optimized/rev-bc099d6/wp-content/uploads/2015/04/logo.png"
                  alt=""
                />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((item) => (
                <Link key={item}>{item}</Link>
              ))}
            </HStack>
          </HStack>
          {currentUser ? (
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"md"}
                fontWeight={400}
                variant={"link"}
              >
                <Link to={"/register"}>Register</Link>
              </Button>
              <Button
                fontSize={"md"}
                fontWeight={600}
                color={"white"}
                bg={"red.600"}
                _hover={{
                  bg: "red.500",
                }}
                onClick={openModal}
              >
                Login
              </Button>
            </Stack>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack spacing={4}>
              <Link to={"/register"} onClick={isOpen ? onClose : onOpen}>
                Register
              </Link>
              {Links.map((link) => (
                <Link onClick={isOpen ? onClose : onOpen} key={link} to={`/`}>
                  {link}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <LoginForm isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;
