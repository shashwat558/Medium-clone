import { Blogs } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: {blog: Blogs}) => {

    return <div>
        <AppBar />
        <div className="flex justify-center">
        <div className="grid grid-cols-12 px-20 w-full pt-10 max-w-screen-lg">
        <div className=" col-span-8">
         <div className="text-3xl font-extrabold">
            {blog.title}
         </div>
         <div className="text-slate-400">
            Posted on 11 september, 2011
         </div>
         <div>
            {blog.content}
         </div>
        </div>
        <div className="col-span-4">
            <div>
                Author
            </div>   
           <div className="flex gap-3 mt-3">
               <div>
                 <Avatar name={blog.author.name || "Anonymous"}/>
               </div>
                <div>
                <div className="text-xl font-semibold">
                {blog.author.name || "Anonymous"}

                </div>     
            <div className="pt-2 text-slate-500">
                Random catch phrase about the author's ability to grab the users
            </div>
            
            </div>
           

           </div>
        </div>
        
    </div>
        </div>
    </div>
}