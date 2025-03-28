# Recipe Book

A full-stack web application for viewing recipes, built with Next.js and NestJS.

## Project Structure

The project is divided into two main parts:

- `frontend/` - application on Next.js
- `backend/` - NestJS API server

## Installation and Running

### Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create .env file:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

The server will be available at: http://localhost:3000

### Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create .env file:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at: http://localhost:3001

## Features

- View all recipes
- Filter recipes by:
  - Ingredients
  - Country
  - Category
- Detailed recipe view
- Navigation between related recipes
- Responsive design

## Technologies

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Backend

- NestJS
- TypeScript
- Axios
