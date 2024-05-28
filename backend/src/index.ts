import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign} from 'hono/jwt' 

const app = new Hono<{
  Bindings: {
    DATABASE_URL: String
    JWT_SECTRET: String
  }
}>()

app.post('/api/v1/signup', async (c) => {
	const prisma = new PrismaClient({
    //@ts-ignore
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
    //@ts-ignore
    const token = await sign({id: user.id}, c.env.JWT_SECTRET)
    return c.json({
      jwt: token
    })
	
		
	} catch(e) {
		return c.status(403);
	}

  
})

app.post('/api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl : c.env?.DATABASE_URL ,
  }).$extends(withAccelerate())
  
  const body = c.req.json();
})
app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id');
   console.log(id);
   return c.text('get blog route')
})
app.post('/api/v1/blog', (c) => {
  return c.text('sign up route')
})
app.put('/api/v1/blog', (c) => {
  return c.text("blog put")
})

export default app
