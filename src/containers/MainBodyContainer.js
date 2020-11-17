import axios from "axios";
import React, { useEffect, useState } from "react";
import MainBody from "../components/Main/MainBody";
import Post from "../components/Main/Post";
import Swal from "sweetalert2";
import Axios from "axios";

const SERVER = "http://10.80.163.169:8080";

const MainBodyContainer = ({ data }) => {
    const fetchMorePosts = async () => {
        setFetching(true);

        await axios.get(`${SERVER}/10`).then((response) => {
            const fetchedData = response.data;
            console.log(fetchedData);
        });
    };
    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
            fetchMorePosts();
        }
        console.log(scrollHeight, scrollTop, clientHeight);
    };
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

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
            console.log(response.result);
            // setPosts({
            //     ...posts,
            //     title: response.title,
            //     email: response.email,
            //     postTime: response.post_time,
            //     updateTime: response.update_time,
            //     postText: response.text,
            // });
            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        });
    }, []);

    // const { title, email, postTime, updateTime, postText } = posts;
    const postList = posts.map((post) => {
        return <Post post={post} key={post.Post_Code} />;
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
