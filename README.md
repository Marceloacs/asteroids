# Asteroids Full Stack App

By Marcelo A.C.

## Installation

### Prerequisites

- Bun: 1.0.35 https://bun.sh/

```
curl -fsSL https://bun.sh/install | bash
```

- Node: 21.1.0

### Install dependencies

```
cd schema
bun install
cd ../server-app
bun install
cd ../web-app
bun install
```

### Run the app
Run the server app

.env file (optional, there are default values)
```
JWT_SECRET=secret
NASA_API_KEY=DEMO_KEY
ALLOWED_ORIGIN=http://localhost:3000
```

```
cd server-app
bun run dev
```

Run the web app
```
cd ../web-app
bun run dev
```

## How works

This project is a full stack app that uses the following technologies:

Schema: allows share the types between the server and the client making easy to implement changes in the future and giving better context to the code.

Server: is a simple API that uses the schema to define the types of the data.
- Stack: Bun, SQLite, TypeScript, Express and JWT

Client: is a simple React app that uses the schema to define the types of the data.
- Stack: Bun, Next.js, Tailwind CSS, Shadcn, Lucide, React Query

Features:
- User authentication: Easy way to authenticate users using just a user name. Returns a JWT token that is used to access saved favorite asteroids.
- User favorite asteroids: Users can add and remove asteroids from their favorites.
- Asteroids search: Users can search for asteroids by name or by id.
    - Filters:
        - Date range: Users can filter the asteroids by date range.
        - Only Favs: Users can filter the asteroids by their favorites.
        - Only hazardous
        - Pagination: rows per page and page number.
    - Sorting: Users can sort the asteroids by name, date or diameter.

## Disclaimer
Nasa API is a great resource for asteroid data, but it has a limit of request and they can block your IP if you make too many requests.
You can use a VPN to avoid this issue.

# asteroids
