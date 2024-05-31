import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Blogs {
  "content": string;
  "title": string;
  "id": string;
  "author": {
           "name": string;

}}
export const useBlogs = () => {
    
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
          headers: {
            Authorization: localStorage.getItem("token")
           }
        }         
        )
          .then(responce => {
            setBlogs(responce.data.blogs);
            setLoading(false)
          })
    }, [])
    return {
        loading, blogs
    }
}