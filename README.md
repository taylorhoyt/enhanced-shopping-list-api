# Enhanced Shopping List API

A REST API for managing shopping lists, meals, and items built with Node.js, Express, and TypeScript.

## Features

- ✅ Create, read, update, and delete shopping lists, meals, and items
- ✅ Add meals to shopping lists (adds all meal items)
- ✅ Add individual items to shopping lists
- ✅ Mark items as purchased/unpurchased
- ✅ Manage item quantities
- ✅ RESTful API design with organized endpoints
- ✅ TypeScript for type safety and better development experience
- ✅ PostgreSQL database integration
- ✅ CORS enabled for frontend integration
- ✅ Security headers with Helmet
- ✅ Request logging with Morgan
- ✅ Error handling middleware
- ✅ Organized project structure (MVC pattern)

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your PostgreSQL database and create the necessary tables using the SQL schema

4. Create a `.env` file in the root directory:

   ```env
   PORT=3000
   NODE_ENV=development
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=shopping_list_db
   DB_PASSWORD=your_password
   DB_PORT=5432
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. The API will be available at `http://localhost:3000`

## API Endpoints

### Base URL

```
http://localhost:3000
```

### Items (`/api/item`)

| Method | Endpoint           | Description                           |
| ------ | ------------------ | ------------------------------------- |
| GET    | `/api/item`        | Get all items (with optional filters) |
| GET    | `/api/item/search` | Search items by name                  |
| GET    | `/api/item/:id`    | Get a specific item                   |
| POST   | `/api/item`        | Create a new item                     |
| PUT    | `/api/item/:id`    | Update an item                        |
| DELETE | `/api/item/:id`    | Delete an item                        |

### Meals (`/api/meal`)

| Method | Endpoint                       | Description                       |
| ------ | ------------------------------ | --------------------------------- |
| GET    | `/api/meal`                    | Get all meals                     |
| GET    | `/api/meal/recent`             | Get recent meals for a user       |
| GET    | `/api/meal/:id`                | Get a specific meal               |
| GET    | `/api/meal/:id/summary`        | Get meal summary with item counts |
| POST   | `/api/meal`                    | Create a new meal                 |
| PUT    | `/api/meal/:id`                | Update a meal                     |
| DELETE | `/api/meal/:id`                | Delete a meal                     |
| POST   | `/api/meal/:id/items`          | Add item to meal                  |
| PUT    | `/api/meal/:id/items/:item_id` | Update item quantity in meal      |
| DELETE | `/api/meal/:id/items/:item_id` | Remove item from meal             |

### Shopping Lists (`/api/list`)

| Method | Endpoint                                | Description                       |
| ------ | --------------------------------------- | --------------------------------- |
| GET    | `/api/list`                             | Get all shopping lists            |
| GET    | `/api/list/recent`                      | Get recent lists for a user       |
| GET    | `/api/list/:id`                         | Get a specific shopping list      |
| GET    | `/api/list/:id/summary`                 | Get list summary with item counts |
| GET    | `/api/list/:id/meals`                   | Get meals in a shopping list      |
| GET    | `/api/list/:id/purchased`               | Get purchased items from list     |
| POST   | `/api/list`                             | Create a new shopping list        |
| PUT    | `/api/list/:id`                         | Update a shopping list            |
| DELETE | `/api/list/:id`                         | Delete a shopping list            |
| POST   | `/api/list/:id/meals`                   | Add meal to shopping list         |
| POST   | `/api/list/:id/items`                   | Add item to shopping list         |
| PUT    | `/api/list/:id/items/:item_id/purchase` | Update item purchase state        |
| PUT    | `/api/list/:id/items/:item_id/quantity` | Update item quantity              |
| DELETE | `/api/list/:id/items/:item_id`          | Remove item from shopping list    |

## API Examples

### Create a Shopping List

```bash
curl -X POST http://localhost:3000/api/lists \
  -H "Content-Type: application/json" \
  -d '{"name": "Weekly Groceries"}'
```

### Add an Item to a List

```bash
curl -X POST http://localhost:3000/api/lists/1/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Milk", "quantity": 2}'
```

### Update an Item

```bash
curl -X PUT http://localhost:3000/api/lists/1/items/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Get All Lists

```bash
curl http://localhost:3000/api/lists
```

## Data Models

### Shopping List

```json
{
  "id": 1,
  "name": "Grocery Shopping",
  "items": [...],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Item

```json
{
  "id": 1,
  "name": "Milk",
  "quantity": 1,
  "completed": false
}
```

## Scripts

- `npm start` - Start the production server (requires build)
- `npm run dev` - Start the development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run build:watch` - Compile TypeScript with watch mode
- `npm test` - Run tests (not implemented yet)

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
DB_USER=postgres
DB_HOST=localhost
DB_NAME=shopping_list_db
DB_PASSWORD=your_password
DB_PORT=5432
```

## Project Structure

```
├── src/                 # TypeScript source files
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── types/         # TypeScript type definitions
│   └── server.ts      # Main server file
├── dist/              # Compiled JavaScript (generated)
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── nodemon.json       # Nodemon configuration
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Input validation with Joi or similar
- [ ] API rate limiting
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Caching with Redis
- [ ] Real-time updates with WebSockets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC
