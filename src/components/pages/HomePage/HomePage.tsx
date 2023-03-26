import React, {FC, useMemo, useState} from 'react';
import Posts from "../../ui/Home/Posts";
import Container from "../../ui/Container/Container";
import PostCreator from "../../ui/Home/PostCreator/PostCreator";
import Find from "../../ui/Find/Find";
import {IPost} from "../../../types/post.types";
import PostService from "../../../services/Post.service";
import Loader from "../../ui/Loader/Loader";
import Tags from "../../ui/Home/Tags/Tags";

const HomePage: FC = () => {

    const [posts, setPosts] = useState<IPost[]>([])
    const [search, setSearch] = useState('');
    const [postsLoading, setPostLoading] = useState(false)

    const filteredPosts = useMemo(() => {
        const reg = RegExp(search.replace(/[\\^$|.*?+{}()[\]]/g, '\\$&'), 'gi');

        return search
            ? posts.reduce((acc, n) => {
                const bodyHTML = n.tags.join(",").replace(reg, '<mark>$&</mark>');
                if (bodyHTML !== n.tags.join(",")) {
                    // @ts-ignore
                    acc.push({ ...n, bodyHTML });
                }

                return acc;
            }, [])
            : posts;
    }, [ posts, search ]);

    React.useEffect(() => {
        const fetchData = async () => {
            const postFromDb = await PostService.getAllPosts()
            setPosts(postFromDb)
        }
        fetchData()

    }, [])

    return (
        <Container>
            <PostCreator/>
            <Find setFilter={setSearch} filter={search} setPostLoading={setPostLoading} setPosts={setPosts}/>
            <Tags setSearch={setSearch}/>
            {
                postsLoading ?
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}><Loader/></div> :
                    <Posts posts={filteredPosts}/>
            }
        </Container>
    );
};

export default HomePage;