import { FastifyRequest } from 'fastify';

export interface UserById {
    id: number;
}

export interface UserModel {
    name: string;
    email: string;
    password: string;
}