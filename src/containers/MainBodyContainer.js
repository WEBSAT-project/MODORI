import axios from "axios";
import React, { useEffect, useState } from "react";
import MainBody from "../components/Main/MainBody";
import Post from "../components/Main/Post";
import Swal from "sweetalert2";
import Axios from "axios";

const SERVER = "http://172.20.10.3:8080";

const MainBodyContainer = ({ data }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getPosts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${SERVER}/`);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts().then((response) => {
      setIsLoading(false);
      setPosts(response.result);
      // setPosts({
      //     ...posts,
      //     title: response.title,
      //     email: response.email,
      //     postTime: response.post_time,
      //     updateTime: response.update_time,
      //     postText: response.text,
      // });
    });
  }, []);

  // const { title, email, postTime, updateTime, postText } = posts;
  const postList = posts.map((post) => {
    return <Post post={post} key={post.Post_Code} isOwner={false} />;
  });

  return (
    <MainBody
      postList={postList}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
};

export default MainBodyContainer;
