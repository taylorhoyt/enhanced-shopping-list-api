# Enhanced Shopping List API Documentation

## Authentication

All endpoints require authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Table of Contents

1. [Items API](#items-api)
2. [Meals API](#meals-api)
3. [Lists API](#lists-api)

---

## Items API

Base endpoint: `/api/items`

### Get All Items

Retrieve all items for the authenticated user.

**Endpoint:** `GET /api/items`

**Authentication:** Required

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "name": "Milk",
    "category": "Dairy",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Get Item by ID

Retrieve a specific item by its ID.

**Endpoint:** `GET /api/items/:id`

**Parameters:**

- `id` (path) - UUID of the item

**Authentication:** Required

**Response:** `200 OK`

Note: Returns an array containing the item.

```json
[
  {
    "id": "uuid",
    "name": "Milk",
    "category": "Dairy",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Get Items by Category

Retrieve all items in a specific category.

**Endpoint:** `GET /api/items/category/:category`

**Parameters:**

- `category` (path) - Name of the category

**Authentication:** Required

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "name": "Milk",
    "category": "Dairy",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Create Item

Create a new item.

**Endpoint:** `POST /api/items`

**Authentication:** Required

**Request Body:**

```json
{
  "name": "Milk",
  "category": "Dairy"
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "name": "Milk",
  "category": "Dairy",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

### Update Item

Update an existing item.

**Endpoint:** `PUT /api/items/:id`

**Parameters:**

- `id` (path) - UUID of the item

**Authentication:** Required

**Request Body:**

```json
{
  "name": "Whole Milk",
  "category": "Dairy"
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "name": "Whole Milk",
  "category": "Dairy",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

### Delete Item

Delete an item.

**Endpoint:** `DELETE /api/items/:id`

**Parameters:**

- `id` (path) - UUID of the item

**Authentication:** Required

**Response:** `200 OK`

```json
{
  "success": true
}
```

---

## Meals API

Base endpoint: `/api/meals`

### Get All Meals

Retrieve all meals for the authenticated user.

**Endpoint:** `GET /api/meals`

**Authentication:** Required

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "name": "Breakfast",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": null
  }
]
```

---

### Get Meal by ID

Retrieve a specific meal by its ID.

**Endpoint:** `GET /api/meals/:id`

**Parameters:**

- `id` (path) - UUID of the meal

**Authentication:** Required

**Response:** `200 OK`

Note: Returns an array containing the meal.

```json
[
  {
    "id": "uuid",
    "name": "Breakfast",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": null
  }
]
```

---

### Get Meal Items

Retrieve all items in a specific meal.

**Endpoint:** `GET /api/meals/:id/items`

**Parameters:**

- `id` (path) - UUID of the meal

**Authentication:** Required

**Response:** `200 OK`

```json
[
  {
    "item": {
      "id": "uuid",
      "name": "Milk",
      "category": "Dairy"
    },
    "quantity": 2,
    "unit": "cups"
  }
]
```

---

### Create Meal

Create a new meal with items.

**Endpoint:** `POST /api/meals`

**Authentication:** Required

**Request Body:**

```json
{
  "name": "Breakfast",
  "items": [
    {
      "item_id": "uuid",
      "quantity": 2,
      "unit": "cups"
    }
  ]
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "name": "Breakfast",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": null
}
```

---

### Update Meal Name

Update the name of a meal.

**Endpoint:** `PUT /api/meals/:id/name`

**Parameters:**

- `id` (path) - UUID of the meal

**Authentication:** Required

**Request Body:**

```json
{
  "name": "Morning Breakfast"
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "name": "Morning Breakfast",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-02T00:00:00.000Z"
}
```

---

### Add Item to Meal

Add an item to a meal.

**Endpoint:** `PUT /api/meals/:id/items`

**Parameters:**

- `id` (path) - UUID of the meal

**Authentication:** Required

**Request Body:**

```json
{
  "item_id": "uuid",
  "quantity": 2,
  "unit": "cups"
}
```

**Response:** `200 OK`

```json
{
  "item_id": "uuid",
  "meal_id": "uuid",
  "quantity": 2,
  "unit": "cups"
}
```

---

### Remove Item from Meal

Remove an item from a meal.

**Endpoint:** `DELETE /api/meals/:id/items/:itemId`

**Parameters:**

- `id` (path) - UUID of the meal
- `itemId` (path) - UUID of the item

**Authentication:** Required

**Response:** `200 OK`

```json
{
  "success": true
}
```

---

### Update Meal Item

Update the quantity and/or unit of an item in a meal.

**Endpoint:** `PUT /api/meals/:id/items/:itemId`

**Parameters:**

- `id` (path) - UUID of the meal
- `itemId` (path) - UUID of the item

**Authentication:** Required

**Request Body:**

```json
{
  "quantity": 3,
  "unit": "cups"
}
```

**Response:** `200 OK`

```json
{
  "item_id": "uuid",
  "meal_id": "uuid",
  "quantity": 3,
  "unit": "cups"
}
```

---

### Delete Meal

Delete a meal.

**Endpoint:** `DELETE /api/meals/:id`

**Parameters:**

- `id` (path) - UUID of the meal

**Authentication:** Required

**Response:** `200 OK`

```json
{
  "success": true
}
```

---

## Lists API

Base endpoint: `/api/lists`

### Create List

Create a new shopping list.

**Endpoint:** `POST /api/lists`

**Authentication:** Required

**Request Body:**

```json
{
  "name": "Weekly Shopping",
  "items": [
    {
      "item_id": "uuid",
      "quantity": 2,
      "unit": "cups",
      "meal_id": "uuid",
      "meal_quantity": 1
    }
  ]
}
```

**Response:** `201 Created`

Note: This endpoint calls `getListById`, which returns an array with a single element.

```json
[
  {
    "id": "uuid",
    "name": "Weekly Shopping",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": null,
    "list_items": [
      {
        "count": 1
      }
    ]
  }
]
```

---

### Get All Lists

Retrieve all shopping lists for the authenticated user.

**Endpoint:** `GET /api/lists`

**Authentication:** Required

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "name": "Weekly Shopping",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": null,
    "list_items": [
      {
        "count": 5
      }
    ]
  }
]
```

---

### Get List by ID

Retrieve a specific shopping list by its ID.

**Endpoint:** `GET /api/lists/:id`

**Parameters:**

- `id` (path) - UUID of the list

**Authentication:** Required

**Response:** `200 OK`

Note: Returns an array containing the list.

```json
[
  {
    "id": "uuid",
    "name": "Weekly Shopping",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": null,
    "list_items": [
      {
        "count": 5
      }
    ]
  }
]
```

---

### Get List Items

Retrieve all items in a specific shopping list.

**Endpoint:** `GET /api/lists/:id/items`

**Parameters:**

- `id` (path) - UUID of the list

**Authentication:** Required

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "item": {
      "id": "uuid",
      "name": "Milk",
      "category": "Dairy"
    },
    "quantity": 2,
    "unit": "cups",
    "is_purchased": false
  }
]
```

---

### Get List Meals

Retrieve all meals in a specific shopping list.

**Endpoint:** `GET /api/lists/:id/meals`

**Parameters:**

- `id` (path) - UUID of the list

**Authentication:** Required

**Response:** `200 OK`

Note: Returns unique meals (duplicates are filtered out).

```json
[
  {
    "meal": {
      "id": "uuid",
      "name": "Breakfast"
    }
  }
]
```

---

### Update Item Purchased State

Update the purchased state of an item in a list.

**Endpoint:** `PUT /api/lists/:id/items/:listItemId/purchased`

**Parameters:**

- `id` (path) - UUID of the list
- `listItemId` (path) - UUID of the list item

**Authentication:** Required

**Request Body:**

```json
{
  "is_purchased": true
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "item_id": "uuid",
  "is_purchased": true
}
```

---

### Update Item Quantity

Update the quantity of an item in a list.

**Endpoint:** `PUT /api/lists/:id/items/:listItemId/quantity`

**Parameters:**

- `id` (path) - UUID of the list
- `listItemId` (path) - UUID of the list item

**Authentication:** Required

**Request Body:**

```json
{
  "quantity": 3
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "item_id": "uuid",
  "quantity": 3
}
```

---

### Update Item Unit

Update the unit of an item in a list.

**Endpoint:** `PUT /api/lists/:id/items/:listItemId/unit`

**Parameters:**

- `id` (path) - UUID of the list
- `listItemId` (path) - UUID of the list item

**Authentication:** Required

**Request Body:**

```json
{
  "unit": "liters"
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "item_id": "uuid",
  "unit": "liters"
}
```

---

### Add Item to List

Add an item to a shopping list.

**Endpoint:** `PUT /api/lists/:id/items`

**Parameters:**

- `id` (path) - UUID of the list

**Authentication:** Required

**Request Body:**

```json
{
  "item_id": "uuid",
  "quantity": 2,
  "unit": "cups",
  "meal_id": "uuid",
  "meal_quantity": 1
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "item_id": "uuid",
  "quantity": 2,
  "unit": "cups",
  "meal_id": "uuid",
  "meal_quantity": 1
}
```

---

### Remove Item from List

Remove an item from a shopping list.

**Endpoint:** `DELETE /api/lists/:id/items/:listItemId`

**Parameters:**

- `id` (path) - UUID of the list
- `listItemId` (path) - UUID of the list item

**Authentication:** Required

**Response:** `200 OK`

```json
{
  "success": true
}
```

---

### Delete List

Delete a shopping list.

**Endpoint:** `DELETE /api/lists/:id`

**Parameters:**

- `id` (path) - UUID of the list

**Authentication:** Required

**Response:** `200 OK`

```json
{
  "success": true
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized

```json
{
  "error": "Unauthorized"
}
```

### 404 Not Found

```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Error message describing what went wrong"
}
```

---

## Data Models

### Item

```typescript
{
  id: string; // UUID
  name: string;
  category: string;
  created_at: Date;
}
```

### Meal

```typescript
{
  id: string; // UUID
  name: string;
  created_at: Date;
  updated_at: Date | null;
}
```

### Meal Item (from Get Meal Items)

```typescript
{
  item: {
    id: string;         // UUID
    name: string;
    category: string;
  };
  quantity: number;
  unit?: string;
}
```

### Shopping List

```typescript
{
  id: string;           // UUID
  name: string;
  created_at: Date;
  updated_at: Date | null;
  list_items: [
    {
      count: number;
    }
  ];
}
```

### List Item (from Get List Items)

```typescript
{
  id: string;           // UUID (list item id)
  item: {
    id: string;         // UUID
    name: string;
    category: string;
  };
  quantity: number;
  unit?: string;
  is_purchased: boolean;
}
```

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- All UUIDs are in standard UUID format
- All endpoints require authentication via Bearer token
- Quantity and unit are optional fields in requests
- `meal_id` and `meal_quantity` are optional when adding items to lists
- Items can be added directly to lists or through meals
- Some endpoints return arrays even when returning a single item (e.g., `GET /api/items/:id` returns an array)
- `list_items` in shopping list responses contains an array with a count object
