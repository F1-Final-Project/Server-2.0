# Server-2.0 Documentation

## Query & Mutation
* [User](#user)
* [Auth](#auth)
* [Ingredient](#ingredient)
* [Dish](#dish)
* [Category](#category)
* [Invoice](#invoice)
* [Order](#order)
* [Order Ingredient](#order-ingredient)
* [Order Category](#order-category)
* [News](#news)
* [Reserved](#reserved)

## User
Fields:
```
id: ID
email: String
firstName: String
lastName: String
permission: String
```
###  Query
```
user(id: ID): User

userAll: [User]
```
### Mutation
```
addUser(
  email: String!
  password: String!
  firstName: String!
  lastName: String!
  permission: String!
): User

deleteUser(id: ID): User

updateUser(
  id: ID!
  email: String!
  password: String!
  firstName: String!
  lastName: String!
  permission: String!
): User
```

## Auth
Fields:
```
id: String
token: String
permission: String
```
### Query 
```
login(email: String!, password: String!): Auth
```

## Ingredient
Fields:
```
id: ID
title: String
restInStock: Int
description: String
price: Int
```
### Query
```
ingredient(id: ID!): Ingredient

ingredientAll: [Ingredient]
```
### Mutation
```
addIngredient(
  title: String!
  restInStock: Int!
  description: String!
  price: Float!
): Ingredient

deleteIngredient(id: ID): Ingredient

updateIngredient(
  id: ID!
  title: String!
  restInStock: Int!
  description: String!
  price: Float!
): Ingredient
```

## Dish
Fields:
```
id: ID
title: String!
description: String
img: String
category: Category
ingredients: [Ingredient]
additionalIngredients: [Ingredient]
price: Float
weight: Float
```
### Query
```
dish(id: ID!): Dish

dishAll: [Dish]
```
### Mutation
```
addDish(
  title: String!
  description: String!
  img: String!
  category: ID!
  ingredients: [ID]!
  additionalIngredients: [ID]!
  price: Float!
  weight: Float!
): Dish

deleteDish(id: ID): Dish

updateDish(
  id: ID!
  title: String!
  description: String!
  img: String!
  category: ID!
  ingredients: [ID]!
  additionalIngredients: [ID]!
  price: Float!
  weight: Float!
): Dish
```

## Category
Fields:
```
id: ID
title: String
description: String
icon: String
```
### Query
```
category(id: ID!): Category

categoryAll: [Category]
```
### Mutation
```
addCategory(
  title: String!
  description: String!
  icon: String
): Category

deleteCategory(id: ID!): Category

updateCategory(
  id: ID!
  title: String!
  description: String!
  icon: String
): Category
```

## Invoice
Fields:
```
id: ID
invoiceItems: [{
  title: String 
  price: Float
}]
invoicePrice: Float
staff: User
paymentMethod: String
created_at: String
```
### Query
```
invoice(id: ID!): Invoice

invoiceAll: [Invoice]
```
### Mutation
```
addInvoice(
  invoiceItems: [InvoiceItemInput]!
  invoicePrice: Float!
  staff: String!
  paymentMethod: String!
  created_at: String!
): Invoice

deleteInvoice(id: ID!): Invoice

updateInvoice(
  id: ID!
  invoiceItems: [InvoiceItemInput]!
  invoicePrice: Float!
  staff: String!
  paymentMethod: String!
  created_at: String!
): Invoice
```

## Order
Fields:
```
id: ID
staff: User
table: Int
orderItems: [{
  title: String
  description: String
  ingredients: [Ingredient]
  additionalIngredients: [Ingredient]
  price: Float
  weight: Int
}]
newOrderItems: [{
  title: String
  description: String
  ingredients: [Ingredient]
  additionalIngredients: [Ingredient]
  price: Float
  weight: Int
}]
orderPrice: Float
onKitchen: Boolean
completed: Boolean
created_at: String
updated_at: String
```
### Query
```
order(id: ID!): Order

orderAll: [Order]
```
### Mutation
```
addOrder(
  staff: String!
  table: Int!
  orderItems: [OrderItemInput]!
  newOrderItems: [OrderItemInput]!
  orderPrice: Float!
  onKitchen: Boolean!
  completed: Boolean!
  created_at: String!
  updated_at: String!
): Order

deleteOrder(id: ID!): Order

updateOrder(
  id: ID!
  staff: String!
  table: Int!
  orderItems: [OrderItemInput]!
  newOrderItems: [OrderItemInput]!
  orderPrice: Float!
  onKitchen: Boolean!
  completed: Boolean!
  created_at: String!
  updated_at: String!
): Order
```

## Order Ingredient
Fields:
```
id: ID
order: [Ingredient]
orderCategory: OrderCategory
editingOrder: Boolean
pendingOrder: Boolean
orderHasArrived: Boolean
```
### Query
```
orderIngredient(id: ID!): OrderIngredient

orderIngredientAll: [OrderIngredient]
```
### Mutation
```
addOrderIngredient(
  order: [ID]!
  orderCategory: ID!
  editingOrder: [Boolean]!
  pendingOrder: [Boolean]!
  orderHasArrived: [Boolean]!
): OrderIngredient

deleteOrderIngredient(id: ID!): OrderIngredient

updateOrderIngredient(
  id: ID!
  order: [ID]!
  orderCategory: ID!
  editingOrder: [Boolean]!
  pendingOrder: [Boolean]!
  orderHasArrived: [Boolean]!
): OrderIngredient
```

## Order Category
Fields:
```
id: ID
title: String
```
### Query
```
orderCategory(id: ID!): OrderCategory

orderCategoryAll: [OrderCategory]
```
### Mutation
```
addOrderCategory(title: [String]!): OrderCategory

deleteOrderCategory(id: ID!): OrderCategory

updateOrderCategory(
  id: ID!
  title: [String]!
): OrderCategory
```

## News
Fields:
```
id: ID
title: String
text: String
img: String
created_at: String
```
### Query
```
news(id: ID!): News

newsAll: [News]
```
### Mutation
```
addNews(
  title: String!
  text: String!
  img: String!
  created_at: String!
): News

deleteNews(id: ID!): News

updateNews(
  id: ID!
  title: String!
  text: String!
  img: String!
  created_at: String!
): News
```

## Reserved
Fields:
```
id: ID
client: String
phone: String
date: String
table: Int
```
### Query
```
reserved(id: ID!): Reserved

reservedAll: [Reserved]
```
### Mutation
```
addReserved(
  date: String!
  table: Int!
  client: String!
  phone: String
): Reserved

deleteReserved(id: ID!): Reserved
```
