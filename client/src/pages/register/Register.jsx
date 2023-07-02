import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React from "react";
import RegisterForm from "../../components/registerForm/RegisterForm";

const Register = () => {
  return (
    <VStack
      flexGrow={1}
      // bgColor={"yellow"}
      // display="flex"
      // alignItems={"center"}
      p="40px"
      overflow={"hidden"}
      // h="100%"
    >
      <HStack
        h={"100%"}
        gap={10}
        overflow={{ base: "scroll", md: "hidden" }}
        flexDir={{ base: "column", md: "row" }}
      >
        <Box
          w={{ base: "100%", md: "50%" }}
          h="100%"
          display="flex"
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          userSelect={"none"}
        >
          <Box display={"flex"} flexDir={"column"} gap={"30px"}>
            <Heading lineHeight={"40px"}>
              <span style={{ color: "#BB141A", fontSize: "36px" }}>XSEED </span>
              <span style={{ color: "rgb(69,69,69)", fontSize: "24px" }}>
                Students score +21% more than others, make your child a shining
                star{" "}
              </span>
              <StarIcon
                color={"#ECC440"}
                position={"relative"}
                bottom={"5px"}
              />
              <span style={{ color: "rgb(69,69,69)", fontSize: "24px" }}>
                {" "}
                today.
              </span>
            </Heading>
            <Text textAlign={"justify"} color="gray" fontSize={"14px"}>
              XSEED is a proven and research based academic program for schools
              that builds thinking skills & problem solving confidence in
              children. XSEED children ask more questions, can write in their
              own words, like doing word problems in mathematics, can complete
              their homework on their own, are not afraid to speak-up in
              English, persist longer in solving problems, and score well on
              tests.
            </Text>
          </Box>
        </Box>
        <Box
          h={"100%"}
          border={"0.5px dashed lightgray"}
          display={{ sm: "none", md: "block" }}
        ></Box>
        <Box
          w={{ base: "100%", md: "50%" }}
          h="100%"
          display={"flex"}
          flexDir={"column"}
          // justifyContent={"center"}
        >
          <Heading
            mb={"30px"}
            textAlign={"center"}
            // style={{ color: "rgb(69,69,69)" }}
            userSelect={"none"}
            color={"#BB141A"}
            fontSize={"36px"}
          >
            Register Now.
          </Heading>
          <Box flex="1" overflow={{ md: "scroll" }}>
            <RegisterForm />
          </Box>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Register;
