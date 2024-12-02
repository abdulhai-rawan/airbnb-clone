# Full Stack Airbnb Clone with Next.js 15  

This project is a **Full Stack Airbnb Clone** built with **Next.js 15**, leveraging modern technologies like **React**, **Tailwind CSS**, **Prisma**, **MySQL**, and **NextAuth**.  

## [Demo](https://rent-appartment-application.vercel.app/)

![Project Screenshot](https://github.com/KChakhalyan/airbnb-clone/assets/10487372/41cff2ba-4d86-465f-8567-82e9e6869ecf)

---

## Credits  

**Name:** Antonio Erdeljac  
**Video Tutorial:** [Watch here](https://www.youtube.com/watch?v=c_-b_isI4vg&t=15692s)  

---

## Prerequisites  

- **Node.js version 14.x or above**  

---

## Getting Started  

### Cloning the Repository  

```bash
git clone https://github.com/AntonioErdeljac/next13-airbnb-clone.git
```

### Install Dependencies  

```bash
npm i
```

### Setup Environment Variables  

Create a `.env` file in the root directory and populate it with the following variables:  

```env
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
```

---

## Database Setup with Prisma  

Run the following command to push Prisma schema changes to your database:  

```bash
npx prisma db push
```

---

## Running the Application  

Start the development server:  

```bash
npm run dev
```

---

## Available Commands  

| Command   | Description                              |  
| --------- | ---------------------------------------- |  
| `dev`     | Starts a development instance of the app |  
