// This function adds an item to the cart. It uses a global cart object stored in window.cart.
export function addToCart(item) {
    // Ensure a global cart object exists
    if (!window.cart) {
      window.cart = {};
    }
  
    // Remove the currency symbol and parse the unit price
    const unitPrice = parseFloat(item.price.replace('৳', ''));
  
    // If the item already exists, increment its quantity; otherwise, add it as a new entry
    if (window.cart[item.name]) {
      window.cart[item.name].quantity++;
    } else {
      window.cart[item.name] = {
        name: item.name,
        unitPrice: unitPrice,
        quantity: 1
      };
    }
  
    console.log(`Added ${item.name} to cart. Current quantity: ${window.cart[item.name].quantity}`);
    // Optionally, update a cart counter in your UI here
  }
  