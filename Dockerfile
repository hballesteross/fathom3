FROM node:lts-alpine

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

#node:lts-alpine on m1 mac need aarch64-unknown-linux-musl

WORKDIR /usr/src/app
### COPY --from=deps /usr/src/app/node_modules ./node_modules

# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

# Install package.json dependencies
RUN npm install

# Generate Prisma client.
RUN npx prisma generate

# Run and expose the server on port 3000
EXPOSE 3000
ENV PORT 3000
CMD [ "npm", "run", "dev"]