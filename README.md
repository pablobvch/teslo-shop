# Teslo Shop - E-commerce Clothing Site

Teslo Shop is an e-commerce platform inspired by Tesla's site, designed to offer a seamless shopping experience for a wide range of clothing for men, women, and children. This project aims to replicate the functionality and user interface of Tesla's online store, focusing on the sale of high-quality, stylish clothing.

## Technology Stack

Teslo Shop is built using a modern technology stack, including:

- **Next.js**: A React framework for building server-side rendered and static web applications.
- **React**: A JavaScript library for building user interfaces.
- **Prisma**: An open-source database toolkit that makes it easy to reason about your database schema and how to fetch data from it.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript. It adds static types to the language, helping you catch errors early.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **Zustand**: A small, fast, and scaleable bearbones state-management solution.
- **PayPal**: Integrated for secure and efficient payment processing.

## Getting Started

To get the Teslo Shop project up and running on your local development environment, follow these steps:

1. **Clone the Repository**: First, clone the repository to your local machine using the following command:

```
git clone <repository-url>
```

2. **Environment Variables**: Create a copy of the `.env.template` file, rename it to `.env`, and update the environment variables as needed. This file contains configuration settings that the application will use.

3. **Install Dependencies**: Install the project dependencies by running:

```
npm install
```

4. **Start the Database**: Use Docker Compose to start the database service. Run the following command:

```
docker compose up -d
```

5. **Run Prisma Migrations**: Execute the Prisma migrations to set up your database schema. Use the following command:

```
npx prisma migrate dev
```

6. **Seed the Database**: Populate your database with initial data by running:

```
npm run seed
```

7. **Clear Local Storage**: If necessary, clear your browser's local storage to ensure a clean state.

8. **Start the Project**: Finally, start the development server by running:

```
npm run dev
```

## Project Overview

Teslo Shop is built with a focus on providing a user-friendly interface and a smooth shopping experience. It features a catalog of stylish clothing for men, women, and children, with detailed product descriptions and images. Users can browse products, add items to their cart, and proceed to checkout with ease.

The backend of Teslo Shop is powered by a robust server setup, utilizing Node.js and Prisma for database management. The frontend is designed with a modern, responsive layout, ensuring compatibility across various devices.

## Contributing

If you're interested in contributing to Teslo Shop, whether it's by reporting issues, suggesting enhancements, or submitting pull requests, we welcome all contributions. Please review our contributing guidelines before getting started.
