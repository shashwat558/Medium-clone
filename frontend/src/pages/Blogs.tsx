import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";

import { useBlogs } from "../hooks"

export const Blogs = () => {
  const {loading, blogs} = useBlogs();

  if(loading){
    return <div>
      <AppBar />
      <div className="flex justify-center items-center flex-col">
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />

      </div>
      
    </div>
  }
  return (
    <div className="">

      <AppBar />
      <div className="flex justify-center mt-4">
       <div className="">
        {blogs.map(blog => <BlogCard authorName={blog.author.name || "Anonymos"} title={blog.title} content={blog.content} publishedDate={"May 30 2024"} id={blog.id}/>)}
        
        
    </div>
    </div>
    </div>
    
  )
}
