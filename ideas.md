## base ideas that run through

- can have state of ID's for cart, when adding Item to cart, it pulls the ID, adds to database as cart, checks cart against available and reduces available
- also same for the bundles, uses the ID array and converts it, reducing the amounts

## TO DO OTHER THAN STYLING

- write description

- write footer

#### NAV

- make cart dropdown modal
- make login dropdown modal
- add login/logout button
- add username on nav
- add logo on nav

#### Product page

- display big pic, name, corners, Stock, price, add to cart
- order amount LIMITS with stock levels
- if inStock is 0, the add to cart disables and becomes Product out of stock

#### Cart dynamics

- on page open, generates x random numbers between 1-5 and assigns them to all of the stock and clears all the carts
  - on pressing order items, clears the cart and doesnt revert stock levels
- clear cart
- adds x stock back to inStock of the product per the ID's
- sets the cart of user to an empty array
