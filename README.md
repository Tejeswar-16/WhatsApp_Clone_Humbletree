## WhatsApp Clone - Humbletree

A full-stack WhatsApp Web clone built using React, Node.js, Express, and MongoDB with real-time chat functionality.

## Features

- Real-time chat UI
- One-to-one messaging
- WhatsApp-like interface
- Chat sidebar with users
- Last message preview
- Auto scroll to latest message
- Timestamp display
- Search users


## Tech Stack

- React.js
- Node.js
- Express.js
- MongoDB
- Axios
- Tailwind CSS

## Authentication Page
![alt text](image-1.png)

## Chat Interface
![alt text](image-3.png)

## Folder Structure
![alt text](image.png)

## Setup Development

## Tech Setup

1. Install the latest LTS version of Node.js from https://nodejs.org/en in your machine.
2. Create a working directory in your machine and open that directory in your IDE.
3. Clone this repo
```bash
git clone https://github.com/Tejeswar-16/WhatsApp_Clone_Humbletree.git
```

## Backend Setup

4. Navigate to backend folder:

```bash
cd WhatsApp_Clone_Humbletree/backend
```

5. Install dependencies:
```bash
npm install
```

6. Create a .env file in the backend root directory:
```
PORT=3001
MONGO_URI=your_mongodb_connection_string
```

7. Start backend server:

```bash
node server.js
```
You should see
```bash
Server running on PORT 3001
DB Connected
```

## Frontend Setup

8. Open new terminal and navigate to whatsappclone folder (which is the frontend folder).
   NOTE: Do not close the backend terminal
```bash
cd WhatsApp_Clone_Humbletree/whatsappclone
```

9. Install dependencies for frontend
```bash
npm install
```

10. Start the React development server
```bash
npm run dev
```
The app will open at http://localhost:5173/.
You can now register and then login.

## NOTE:
Initially, you will be seeing "No Chats Found" since you are the only user logged in.
Logout and then login as another user using different email and password. Now open two
tabs each logged in with different users. Then try sending messages from one to another.