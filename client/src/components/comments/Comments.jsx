import {
  Avatar,
  Box,
  Button,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { makeRequest } from "../../utils/axios";
import moment from "moment";

const Comments = ({ chapterId }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionInput, setQuestionInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getAllQuestions();
  }, []);

  const getAllQuestions = async () => {
    try {
      const res = await makeRequest().get(`/questions/${chapterId}`);
      console.log(res.data.data);
      setAllQuestions(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response.error?.message || "Something went wrong!");
    }
  };

  const handleSubmitQuestion = async () => {
    try {
      setLoading(true);
      const res = await makeRequest().post("/questions/create", {
        question: questionInput,
        user: currentUser._id,
        chapter: chapterId,
      });
      setLoading(false);
      setAllQuestions((prev) => [res.data.data, ...prev]);
      setQuestionInput("");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(
        err.response.error.message ||
          "Something went wrong, cannot post the question!"
      );
    }
  };

  return (
    <HStack
      display={"flex"}
      flexDir={{ base: "column", md: "row" }}
      gap={"30px"}
      alignItems={"flex-start"}
    >
      <VStack width={{ base: "100%", md: "50%" }} gap={"10px"}>
        {currentUser ? (
          <Text fontSize={"xl"} userSelect={"none"}>
            Ask your doubts here.
          </Text>
        ) : (
          <Text fontSize={"xl"} userSelect={"none"}>
            Login to ask your doubts.
          </Text>
        )}
        <Textarea
          isDisabled={!currentUser}
          placeholder="Type your question here..."
          onChange={(e) => setQuestionInput(e.target.value)}
          value={questionInput}
          resize={"none"}
        />
        <Button
          alignSelf={"flex-end"}
          fontSize={"md"}
          fontWeight={600}
          color={"white"}
          bg={"red.600"}
          _hover={{
            bg: "red.500",
          }}
          onClick={handleSubmitQuestion}
          isDisabled={!currentUser || !questionInput}
          isLoading={loading}
        >
          Post
        </Button>
      </VStack>
      <VStack
        border={"1px dashed lightgray"}
        boxShadow={"lg"}
        width={{ base: "100%", md: "50%" }}
        borderRadius={"10px"}
        p={"10px"}
        alignItems={"flex-start"}
        gap={"10px"}
      >
        <Text
          fontSize={"xl"}
          w={"100%"}
          textAlign={"center"}
          userSelect={"none"}
        >
          Previously asked questions
        </Text>
        {allQuestions?.map((ques) => (
          <HStack
            key={ques._id}
            alignItems={"flex-start"}
            border={"1px solid lightgray"}
            boxShadow={"base"}
            width={"100%"}
            p={"10px"}
            borderRadius={"10px"}
          >
            <Avatar size={"sm"} bg="red.600" src="" />
            <VStack gap="0" alignItems={"flex-start"}>
              <HStack>
                <Text fontSize={"lg"} fontWeight={"600"}>
                  {ques.user.studentName}
                </Text>
                <Text fontSize={"xs"}>{moment(ques.createdAt).fromNow()}</Text>
              </HStack>
              <Text fontSize={{ base: "sm", md: "md" }}>{ques.question}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </HStack>
  );
};

export default Comments;
