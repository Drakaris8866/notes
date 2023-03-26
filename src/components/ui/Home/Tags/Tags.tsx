import React, {FC, useState} from 'react';
import PostService from "../../../../services/Post.service";
import styles from "./Tags.module.scss";
import Tag from "./Tag";
import {ITag} from "../../../../types/post.types";

const Tags:FC<{setSearch: any}> = ({setSearch}) => {

    const [tags, setTags] = useState<ITag[]>([])

    React.useEffect(() => {
        const fetchData = async () => {
            const tagsFromDb = await PostService.getAllTags()
            setTags(tagsFromDb)
        }
        fetchData()

    }, [])
    console.log(tags)
    return (
        <div className={styles.tags}>
            {tags.map((el) => <Tag setSearch={setSearch} el={el} key={el.id}/>)}
        </div>
    );
};

export default Tags;