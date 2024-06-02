import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify} from 'hono/jwt' 
import { createBlogInput, updateBlogInput } from '@shashwatjain/medium-common' 

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
  Variables:{
    userId : string
  }
}>();;

blogRouter.use('/*', async (c, next) => {
    //get the header
    //verify the header
    //if the header is correct, we can proceed,
    // if not, we return the user a 403 status code
  
    const header = c.req.header("Authorization") || "";
    if(!header){
      c.status(403)
      return c.json({error: "unauthorized"});
    }
  
    

  
    
    
    const responce = await verify(header, c.env.JWT_SECRET)
    if(!responce){
      c.status(403);
      return c.json({error: "unauthorized"});
    }
    //@ts-ignore
    c.set('userId', responce.id);
    await next()
  
  })

blogRouter.get('/bulk', async (c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
   
  const blogs = await prisma.post.findMany({
    select: {
        content: true,
        title: true,
        id: true,
        author: {
            select: {
                name: true
            }
        }
    }
});

return c.json({
    blogs
})
  
    
    
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    try{
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }, 
            select: {
              title: true,
              content: true,
              author: {
                select: {
                  name: true
                }
              }

            }
        })
        return c.json({
            blog
        })
    }  catch(e) {
        c.status(411)
        return c.json({message: "Error while fetching blog post"})
    }
  })
blogRouter.post('/',async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({msg: "Inputs are incorrect"})
    }
    
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const authorId = c.get('userId');
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })

    return c.json({
        id: blog.id
    })
  })

  
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({msg: "Inputs are incorrect"})
    }
    
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    
    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,


        }
    })
    return c.json({id: blog.id, msg:"ol"}
        );
  })

// todo: pagination
