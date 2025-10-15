# 🐱 CatFact GraphQL API

A lightweight **GraphQL + REST** backend built with the **NERN stack** (Node.js, Express, Railway, and Node GraphQL).  
This API fetches random cat facts from an external API and provides user details stored securely in environment variables.

---

## 🚀 Live Demo

🔗 **Hosted on Railway:**  
https://njay-randomcatfact.up.railway.app/

🔗 **GitHub Repository:**  
https://github.com/Njay2trappy/Random-cat
---

## 🧩 Features

- `getAPIcatfact` → Fetches live cat facts from [catfact.ninja](https://catfact.ninja/fact) 🐾  
- `getUserDetails` → Returns user information from `.env`  
- `getRandomnfact` → Combines API fact, user info, and a timestamp into a single JSON response  
- `/me` → REST endpoint that reuses the same GraphQL schema internally  
- Rate limiting and localhost-only CORS protection enabled  
- Clean error handling and console logs for every process

---

## 🧰 Tech Stack

| Tool | Purpose |
|------|----------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **Apollo Server v4** | GraphQL integration |
| **Axios** | API requests |
| **dotenv** | Environment variable management |
| **CORS** | Request origin control |
| **Express-Rate-Limit** | Basic rate limiting |
| **Body-Parser** | Middleware for request parsing |

---

## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/Njay2trappy/Random-cat.git
cd catfact-graphql

### 2. Install dependencies

npm install

### 3. Create a .env file in the root directory

Add the following environment variables:

```bash
CATFACT_BASE_URL=https://catfact.ninja/fact
CATFACT_CSRF_TOKEN=EA7B0Qjv4wK5Npiv1a8Klpp187JrDA5AMk6QSEFy
PORT=4000
USER_EMAIL=your email
USER_NAME=your name
USER_STACK=NERN Stack (Node.js, Express, React, Node GraphQL)
```

### 4. Run the server locally
For development:

npm run dev

For production:

npm start
Server will start at:
👉 http://localhost:4000/graphql

🧪 Test the API Locally
🐾 GraphQL Playground
Visit:

http://localhost:4000/graphql
Run query:

```graphql
query {
  getRandomnfact {
    status
    user {
      email
      name
      stack
    }
    timestamp
    fact
  }
}
```

🌐 REST Endpoint
GET request to:

http://localhost:4000/me
Expected response:

```json
{
  "status": "success",
  "user": {
    "email": "you@example.com",
    "name": "Your Name",
    "stack": "NERN Stack (Node.js, Express, Railway, GraphQL)"
  },
  "timestamp": "2025-10-15T14:35:10Z",
  "fact": "Cats sleep for 70% of their lives."
}
```

📦 Dependencies
These are automatically installed when you run npm install:

```json
{
  "@apollo/server": "^4.10.0",
  "axios": "^1.7.0",
  "body-parser": "^1.20.2",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.19.2",
  "express-rate-limit": "^8.1.0",
  "graphql": "^16.9.0"
}
```

🧠 Notes
Hosted successfully on Railway (no Docker required)

CORS restricted to http://localhost:3000 for security

Includes rate limiting for public deployment

Clean modular design (schema.js, resolvers.js, server.js)

🧾 License
This project is open-source and available under the MIT License.

✨ Author
Ikechukwu Ngoeisna
Backend & Blockchain Developer
🔗 [Portfolio](https://unixmachine.netlify.app/)
🐙 [GitHub](https://github.com/Njay2trappy)


