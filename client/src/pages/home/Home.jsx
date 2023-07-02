import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PathCard from "../../components/pathCard/PathCard";
import toast from "react-hot-toast";
import { makeRequest } from "../../utils/axios";
import ChapterContent from "../../components/chapterContent/ChapterContent";

const Home = () => {
  const [chapterData, setChapterData] = useState({});
  const [chapterLoading, setChapterLoading] = useState(true);
  useEffect(() => {
    getChapterData();
  }, []);

  const getChapterData = async () => {
    try {
      const res = await makeRequest().get("/chapters/scope_of_physics");
      console.log(res.data.data);
      setChapterData(res.data.data);
      setChapterLoading(false);
    } catch (err) {
      setChapterLoading(false);
      console.log(err);
      toast.error(err.response.error.message);
    }
  };

  if (chapterLoading) {
    return;
  }

  return (
    <Box
      // bgColor={"yellow"}
      overflow={"scroll"}
      p={10}
      display={"flex"}
      flexDir={"column"}
      gap={"20px"}
    >
      <PathCard
        standard={chapterData.standard}
        subject={chapterData.subject}
        topic={chapterData.topic}
      />
      <ChapterContent content={chapterData} />
    </Box>
  );
};

export default Home;
