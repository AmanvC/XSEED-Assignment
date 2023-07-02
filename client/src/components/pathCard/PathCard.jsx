import { HStack, Tag } from "@chakra-ui/react";
import React from "react";

const PathCard = ({ standard, subject, topic }) => {
  return (
    <HStack spacing={2} userSelect={"none"} mb={"10px"}>
      <Tag>Class {standard} </Tag>
      <p>{">"}</p>
      <Tag> {subject} </Tag>
      <p>{">"}</p>
      <Tag>{topic} </Tag>
    </HStack>
  );
};

export default PathCard;
