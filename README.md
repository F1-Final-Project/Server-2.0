# Server-2.0 Documentation

## Query
* [User](#user)
* [Auth](#auth)
* [Ingredient](#ingredient)
* [Dish](#dish)
* [CategoryMenu](#category-menu)
* [Invoice](#invoice)
* [Order](#order)
* [Order Ingredient](#order-ingredient)
* [Order Category](#order-category)
* [News](#news)
* [Reserved](#reserved)

## User
Fields:
```json
id: ID
email: String
firstName: String
lastName: String
permission: String
```
### user(id: ID): User
Returns a User instance by id.
### userAll: [User]
Returns all User instance.

## Auth
Fields:
```json
id: String
token: String
permission: String
```
### login(email: String!, password: String!): Auth
Returns auth token.


## Ingredient
Fields:
```json
id: ID
title: String
restInStock: Int
description: String
price: Int
```
### ingredient(id: ID!): Ingredient
Returns a Ingredient instance by id.
### ingredientAll: [Ingredient]
Returns all Ingredient instance.

## Dish
Fields:
```json
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
### dish(id: ID!): Dish
Returns a Dish instance by id.
### dishAll: [Dish]
Returns all Dish instance.

## Category
Fields:
```json
id: ID
title: String
description: String
icon: String
```
### category(id: ID!): Category
Returns a Category instance by id.
### categoryAll: [Category]
Returns all Category instance.


## Invoice
Fields:
```json
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
### invoice(id: ID!): Invoice
Returns a Invoice instance by id.
### invoiceAll: [Invoice]
Returns all Invoice instance.

## Order
Fields:
```json
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
### order(id: ID!): Order
Returns a Order instance by id.
### orderAll: [Order]
Returns all Order instance.

## Order Ingredient
Fields:
```json
id: ID
order: [Ingredient]
orderCategory: OrderCategory
editingOrder: Boolean
pendingOrder: Boolean
orderHasArrived: Boolean
```
### orderIngredient(id: ID!): OrderIngredient
Returns a OrderIngredient instance by id.
### orderIngredientAll: [OrderIngredient]
Returns all OrderIngredient instance.

## Order Category
Fields:
```json
id: ID
title: String
```
### orderCategory(id: ID!): OrderCategory
Returns a OrderCategory instance by id.
### orderCategoryAll: [OrderCategory]
Returns all OrderCategory instance.

## News
Fields:
```json
id: ID
title: String
text: String
img: String
created_at: String
```
### news(id: ID!): News
Returns a News instance by id.
### newsAll: [News]
Returns all News instance.

## Reserved
Fields:
```json
id: ID
client: String
phone: String
date: String
table: Int
```
### reserved(id: ID!): Reserved
Returns a Reserved instance by id.
### reservedAll: [Reserved]
Returns all Reserved instance.
