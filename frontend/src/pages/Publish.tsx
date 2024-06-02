import { ChangeEvent, useState } from "react"
import { AppBar } from "../components/AppBar"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";


export const Publish = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const navigate = useNavigate();
    return <div>
        <AppBar />

        <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input onChange={(e) => {
            setTitle(e.target.value)
          } } type="text" id="input-group-1" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="title" />

         <TextEditor onChange={(e) => {
            setDesc(e.target.value)
         }}/>
         <button onClick={async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: desc
            }, 
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            navigate(`/blog/${response.data.id}`)
         }}>Publish post</button>
    </div>
    </div>
    </div>
}


function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2 ">
        <div className="w-full mb-4">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
    
}
