FROM node:20-alpine3.19

# Update Alpine packages to reduce vulnerabilities
RUN apk update && apk upgrade
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4000
ENV PORT=4000

CMD ["npm", "start"]
