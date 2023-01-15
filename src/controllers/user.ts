import { PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcryptjs';
import { UserById, UserModel } from '../models/user.models';
import { handleError } from '../shared/handle-error';

const prisma = new PrismaClient()

export const getUsers = async( req: FastifyRequest , reply: FastifyReply ) => {
   
    const users = await prisma.user.findMany();
    
    reply.send(users);

}

export const getUser = async(req: FastifyRequest<{ Params: UserById }>, reply: FastifyReply) => {
    const { id } = req.params;

    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id : id,
        },
      });
      reply.send(user);
    } catch (e) {
      handleError(e, reply);
    }
}

export const createUser = async(req: FastifyRequest<{Body: UserModel}>, reply: FastifyReply) => {
    const { name, email, password} = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hashedpassword = bcrypt.hashSync(password, salt);

    try {

      const userExists = await prisma.user.findUnique({where: {email}})
    
      if(userExists){
        return reply.status(400).send({msg: 'Email already registered.'})
      }

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedpassword
        },
      })
      reply.send({ id: user.id });
    } catch (e) {
      handleError(e, reply);
    }
}

export const updateUser = async( req: FastifyRequest<{Body: UserModel, Params: UserById}> , reply: FastifyReply ) => {

    const { name, email, password } = req.body;
    const { id } = req.params;

    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(password, salt);

    try {

      const userExists = await prisma.user.findUniqueOrThrow({where: {id}})
    
      if(!userExists){
        return reply.status(404).send({msg: 'User does not exist.'})
      }
      
      const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
          name,
          email,
          password: hashedpassword
        },
      })
      reply.send(user);
    } catch(e) {
      handleError(e, reply);
    }
}

export const deleteUser = async( req: FastifyRequest<{Params: UserById }> , reply: FastifyReply ) => {

    const { id } = req.params;

    try {
      const user = await prisma.user.delete({
        where: {
            id,
        },
      });
      reply.send(user);
    } catch (e) {
      handleError(e, reply);
    }
}
