import { Box, HStack, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player/youtube";
import Comments from "../comments/Comments";

const ChapterContent = ({ content }) => {
  return (
    <Box textAlign={"justify"}>
      <Heading mb={"20px"}>{content.topic}</Heading>
      {content?.images?.map((img, index) => (
        <Box key={index} display={"flex"} gap={"20px"}>
          <Image
            src={img}
            alt="Physics Image"
            borderRadius={"10px"}
            m={"30px 0"}
          />
        </Box>
      ))}
      <Box m={"20px 0"}>
        {content?.lesson?.map((para) => (
          <Box key={para._id} mb={"30px"}>
            <Text fontSize={"2xl"} fontWeight={600} mb={"10px"}>
              {para.title}
            </Text>
            <Text fontSize={"md"}>{para.content}</Text>
          </Box>
        ))}
      </Box>
      <Box mb={"50px"}>
        <Text
          fontSize={"2xl"}
          fontWeight={600}
          textAlign={"center"}
          m={"40px 0"}
        >
          Explore Videos
        </Text>
        <HStack gap={10}>
          {content?.videos?.map((video, index) => (
            <ReactPlayer key={index} url={video} controls />
          ))}
        </HStack>
      </Box>

      <Comments chapterId={content._id} />
    </Box>
  );
};

export default ChapterContent;
