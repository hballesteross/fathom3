import { PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Credentials } from '../models/auth.models'
import { handleError } from '../shared/handle-error'

const prisma = new PrismaClient()

export const authLogin = async (req: FastifyRequest<{Body: Credentials}>, reply: FastifyReply) => {
    const { email, password } = req.body
    try {
        const user =  await prisma.user.findUnique({where: {email}})

        if(!user){

            return reply.status(404).send({msg:'User not found.'})
        }


        if(bcrypt.compareSync( password, user.password)){
        
            const token = jwt.sign(email,process.env.JWTSecret)
    
            return reply.status(200).send({token:token})

    
        } else {
            reply.status(401).send();
        }
    } catch (e) {
        handleError(e, reply)
    }
  }
