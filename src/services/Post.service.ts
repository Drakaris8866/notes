import {instance as axios} from '../api/interseptors'
import {IPost, IPostData, ITag, ITagsData} from "../types/post.types";
import {AxiosResponse} from "axios";

class PostService {
    async getAllPosts(){
        const {data} = await axios.get("/posts")

        return data as IPost[]
    }
    async createPost({title, text, tags}: IPostData){
        return axios.post<IPostData, AxiosResponse<IPost>>("/posts", {
            title, text, tags
        })
    }
    async deletePost(id: number){
        return axios.delete(`/posts/${id}`)
    }
    async updatePost({title, text, tags, id}: IPostData){
        return axios.put(`/posts/${id}`, {
            title, text, tags
        })
    }
    async getFiltredPosts(filter: string){
        const {data} = await axios.get(`/posts?q=${filter}`)

        return data as IPost[] | []
    }
    async getAllTags(){
        const {data} = await axios.get("/tags")

        return data as ITag[]
    }
    async createTags({tags}: ITagsData){
        tags.map(async tag => await axios.post<string[], string[]>("/tags", {
            tag
        }))
    }
    async updateTags({tags, id}: ITagsData){
        return axios.put(`/tags/${id}`, {
            ...tags
        })
    }
    async deleteTag(tag: string){
        return axios.delete(`tags/`)
    }
}

export default new PostService()