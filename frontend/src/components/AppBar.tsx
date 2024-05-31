import { Avatar } from "./BlogCard"


 export const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-3">
        <div className="flex justify-center flex-col">
            Not medium
        </div>
        <div>
            <Avatar size={"big"} name={"Shashwat"}/>
        </div>
    </div>
  )
}

