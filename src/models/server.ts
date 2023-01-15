import Fastify, { FastifyInstance } from 'fastify'
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user';
import { authLogin } from '../controllers/auth';
import { Schemas } from './schemas';


class Server{

    private app: FastifyInstance;


    constructor(){
        this.app = Fastify({logger: true})
    }


    start(){

        this.app.listen({ port: 3000 , host: '::'}, function (err: any, address: any) {
            if (err) {
                process.exit(1)
            }
          })

    }

    routes(){

        // Crud routes
        this.app.get('/users', getUsers)
        this.app.get('/users/:id', { schema: Schemas.usersById }, getUser)
        this.app.post('/users', { schema: Schemas.usersCreate }, createUser)
        this.app.put('/users/:id', { schema: Schemas.usersUpdate }, updateUser)
        this.app.delete('/users/:id', { schema: Schemas.usersById }, deleteUser)

        // Auth routes
        this.app.post('/login', { schema: Schemas.auth }, authLogin)
    }

}


export default Server