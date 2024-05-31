import { SignupInput } from "@shashwatjain/medium-common";
import axios from "axios";
import { ChangeEvent, useState, } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

//trpc
export const Auth = ({type}: {type: "signup"| "signin"}) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs]= useState<SignupInput>({
    name:"",
    email:"",
    password: ""
  })

  async function sendRequest(){
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
        const jwt = response.data;
        localStorage.setItem("token", jwt);
        navigate("/blogs");
    } catch(e) {
        alert("Error while signing up")
        // alert the user here that the request failed
    }
}
  
  
  return (
    <div className="bg-white h-screen flex justify-center flex-col">
        
        <div className="flex justify-center ">
            <div>        
        <div>
            <div className="text-3xl font-bold text-center">
               {type==="signin"?"Login":"Create an account"}
            </div>
            <div className="text-slate-400 text-center">
               {type==="signin"?"Don't have an account":"Already have an account?"}
               <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}>
                 {type==="signin"? "Sign up": "Sign in"}
                </Link>                           
            </div>
        </div> 
        <div className="mt-4 flex flex-col gap-3">
            {type==="signup" ? <LabelledInput label="Name" placeholder="shashwat jain...." onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })
            }}/>: null }
            <LabelledInput label="email" placeholder="shashwat jain@gmail.com" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    email: e.target.value
                })
            }}/> 

            <LabelledInput label="Password" type={"Password"} placeholder="123456" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    password: e.target.value
                })
            }}/> 
            <button onClick={sendRequest} type="button" className="mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type=="signup"? "Sign up":"Sign in"}</button>

       </div>   
       </div>
        </div>
        
    </div>
  )
}

interface LabelledInputType {
    label:string;
    placeholder: string;
    onChange: (e : ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
    return <div>
        <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900  pt-2">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[25vw] p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}