import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"


 export const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'}>
        <div className="flex justify-center flex-col cursor-pointer text-xl text-center mt-2 font-bold">
            Not medium
        </div>
        </Link>
        <div>
        <Link to={'/publish'}>
        <button type="button" className="mr-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create New</button>
        </Link>

            <Avatar size={"big"} name={"Shashwat"}/>
        </div>
    </div>
  )
}

