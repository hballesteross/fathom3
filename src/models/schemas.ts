import { FastifySchema,  } from 'fastify'

const credentialsBody = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' }
    }
}

const userBody = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' }
    }
}

const userByIdParams = {
    type: 'object',
    properties: {
        id: { type: 'number' }
    }
}

const usersById: FastifySchema = {
    params: userByIdParams
}

const usersUpdate: FastifySchema = {
    params: userByIdParams,
    body: userBody,
}

const usersCreate: FastifySchema = {
    body: userBody,
}

const auth: FastifySchema = {
    body: credentialsBody
}

export const Schemas = {
    usersById,
    usersUpdate,
    usersCreate,
    auth
}