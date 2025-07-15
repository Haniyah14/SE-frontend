## 🛠️ Tech Stack

- **MongoDB**: Robust NoSQL database for storing all application data.
- **Express.js**: Fast and minimalistic backend framework.
- **React.js**: Modern frontend library for building dynamic user interfaces.
- **Node.js**: JavaScript runtime environment for running the backend.
- **Stripe**: Integrated payment gateway for processing transactions.
- **JWT**: JSON Web Tokens for secure user sessions.

## 🗂️ Folder Structure

```plaintext
/
|-- admin/            # React.js admin frontend code
|-- backend/          # Node.js backend code (Express.js)
|-- frontend/         # React.js frontend code
|-- .gitignore        # Files and folders to be ignored by Git
|-- README.md         # Project documentation
```

## Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/hamzarazaa/softwareengineering/tree/main.git
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

<details>
<summary><code>/admin/.env</code></summary>

```env
VITE_BACKEND_URL = "http://localhost:4000"
```

</details>

<details>
<summary><code>/backend/.env</code></summary>

'''
MONGODB_URI = "mongodb+srv://hamza:meowmeow@cluster0.7abodey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

CLOUDINARY_API_KEY ="922763375196737"

CLOUDINARY_SECRET_KEY ="PAEo6IqtDCLBGb4dUZd7EefM86A"

CLOUDINARY_CLOUD_NAME ="dkngu8s92"

JWT_RESET_SECRET=superSecretResetKey

FRONTEND_URL=http://localhost:5173

JWT_SECRET = "qwertytgfdswertyhgferty"

ADMIN_EMAIL = "admin@aura.com" #For testing only

ADMIN_PASSWORD = "admin@123" #For testing only
'''

</details>

<details>
<summary><code>/frontend/.env</code></summary>

```env
VITE_BACKEND_URL = "http://localhost:4000"
VITE_API_URL = "http://localhost:4000"
```

</details>

Replace the placeholder values with your actual Appwrite credentials.

**Running the Project**

**Admin Dashboard Running On:**

```bash
cd admin
```

```bash
npm run dev
```

**Backend Running On:**

```bash
cd backend
```

```bash
npm run server
```

**Frontend Running On:**

```bash
cd frontend
```

```bash
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser to view the admin dashboard.

Open [http://localhost:4000](http://localhost:4000) in your browser to run the backend.

Open [http://localhost:5173](http://localhost:5173) in your browser to view the frontend project.
