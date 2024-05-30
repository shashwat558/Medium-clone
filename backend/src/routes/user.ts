import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify} from 'hono/jwt' 
import { signupInput, signinInput} from "@shashwatjain/medium-common";


export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
  Variables:{
    userId : string
  }
}>();;

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success) {
        c.status(411)
        return c.json({msg: "Inputs are not correct"})
    }
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
  console.log("ff")
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
    console.log('dfd')
    //@ts-ignore
    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({
      msg: 'user created',
      jwt: token
    })
	
		
	} catch(e) {
		return c.status(403);
	}

  
})

userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if(!success){
    c.status(411)
    return c.json(
        {
            msg: "Inputs are incorrect"
    })
  }
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl : c.env?.DATABASE_URL ,
  }).$extends(withAccelerate())
  
  
  const user = await prisma.user.findUnique({    
    where: {
         
      email: body.email,
      password: body.password
      
    }
  });
  if(!user){
    c.status(403);
    return c.json({
      error: "user not found"
    })
  }
  const token = await sign({id: user.id}, c.env.JWT_SECRET)
  return c.json({  token })
})