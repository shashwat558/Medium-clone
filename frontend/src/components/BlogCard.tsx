import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName : string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 pb-4 w-screen max-w-screen-md mt-2 cursor-pointer">
        
        <div className="flex">

          <Avatar name={authorName}/> 
          <div className="font-light ml-2 text-sm flex justify-center flex-col">{authorName}</div>
          <div className="flex justify-center flex-col ml-1">
            <Circle />
          </div>
          <div className="ml-2 font-extralight flex justify-center flex-col text-sm">{publishedDate}</div>
                   
        </div>
        <div className="pt-2 text-xl font-semibold">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0, 100) + "...."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
        

    </div>
    </Link>
    
  )
}

export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({name, size = "small"}: {name:string, size?: "small" | "big"}){
    return <div className={`relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full ${size === "small"? "w-6 h-6": "w-11 h-11"} dark:bg-gray-600`}>
    <span className={`font-extralight text-md text-gray-600 dark:text-gray-300 ${size === "small"? "text-xs": "text-xl"}`}>{name[0]}</span>
</div>
}