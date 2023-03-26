import {IPostData} from "../../../../types/post.types";
import React from "react";
import PostService from "../../../../services/Post.service";
import {findWords} from "../../../../utils/FindWords";

export const usePostUpdate = ({title, text, tags, id}: IPostData) => {
    const [isLoading, setIsLoading] = React.useState(false)

    const [updateStatus, setUpdateStatus] = React.useState(false)

    const [titleUpdate, setTitleUpdate] = React.useState(title)
    const [textUpdate, setTextUpdate] = React.useState(text)
    const [tagsUpdate, setTagsUpdate] = React.useState(tags)

    const handleClickDelete = async () => {
        if (id) {
            await PostService.deletePost(id)
        }
    }

    const handleClickUpdate = async () => {
        setIsLoading(true)
        await PostService.updatePost({title: titleUpdate, text: textUpdate, tags: tagsUpdate, id})
        await PostService.updateTags({tags, id})
        setUpdateStatus(false)
    }

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagsUpdate(findWords(e.target.value))
        setTextUpdate(e.target.value)
    }

    return {
        isLoading,
        info: {
            titleUpdate,
            textUpdate,
            tagsUpdate,
            updateStatus
        },
        functions: {
            setUpdateStatus,
            setTitleUpdate,
            setTextUpdate,
            setTagsUpdate,
            handleClickDelete,
            handleClickUpdate,
            handleText
        }
    }
}