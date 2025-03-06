document.addEventListener('DOMContentLoaded', () => {
    const DISCOUNT = 10;
    // Order object will hold items keyed by dish name
    const order = {};
  
    const orderSummaryContainer = document.getElementById('order-summary');
    const itemsTotalElem = document.getElementById('items-total');
    const discountElem = document.getElementById('discount');
    const totalPaymentElem = document.getElementById('total-payment');
    const placeOrderBtn = document.getElementById('place-order');
  
    // Function to update totals
    function updateTotals() {
      let itemsTotal = 0;
      for (let dish in order) {
        itemsTotal += order[dish].unitPrice * order[dish].quantity;
      }
      itemsTotalElem.textContent = `৳${itemsTotal}`;
      let toPay = itemsTotal - DISCOUNT;
      if (toPay < 0) toPay = 0;
      totalPaymentElem.textContent = `৳${toPay}`;
    }
  
    // Function to create an order row element for a dish
    function createOrderRow(dishName, details) {
      const row = document.createElement('div');
      row.classList.add('flex', 'justify-between', 'items-center', 'mb-2');
      row.setAttribute('data-dish', dishName);
      row.innerHTML = `
        <span>${dishName}</span>
        <div class="flex items-center space-x-2">
          <button class="bg-gray-200 px-2 py-1 rounded text-sm minus">-</button>
          <span class="px-2 quantity">${details.quantity}</span>
          <button class="bg-gray-200 px-2 py-1 rounded text-sm plus">+</button>
        </div>
        <span class="price">৳${details.unitPrice * details.quantity}</span>
      `;
  
      // Minus button event
      row.querySelector('.minus').addEventListener('click', () => {
        if (order[dishName].quantity > 1) {
          order[dishName].quantity--;
          updateOrderRow(row, dishName);
        } else {
          // Remove the item if quantity goes to 0
          delete order[dishName];
          row.remove();
          updateTotals();
        }
      });
  
      // Plus button event in order summary row
      row.querySelector('.plus').addEventListener('click', () => {
        order[dishName].quantity++;
        updateOrderRow(row, dishName);
      });
  
      return row;
    }
  
    // Function to update an order row element's quantity and price
    function updateOrderRow(row, dishName) {
      const details = order[dishName];
      row.querySelector('.quantity').textContent = details.quantity;
      row.querySelector('.price').textContent = `৳${details.unitPrice * details.quantity}`;
      updateTotals();
    }
  
    // Attach event listeners to the plus buttons in the menu (left section)
    const addToOrderButtons = document.querySelectorAll('.add-to-order');
    addToOrderButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Get the parent menu item container
        const menuItem = button.closest('.flex.items-center.justify-between.border.p-4.rounded-lg.shadow');
        const dishName = menuItem.querySelector('h2.text-lg.font-bold').textContent.trim();
        const priceText = menuItem.querySelector('span.bg-green-200').textContent.trim(); // e.g., "৳70"
        const unitPrice = parseFloat(priceText.replace('৳', ''));
  
        // If dish already exists in the order, increment its quantity
        if (order[dishName]) {
          order[dishName].quantity++;
          const existingRow = orderSummaryContainer.querySelector(`[data-dish="${dishName}"]`);
          if (existingRow) {
            updateOrderRow(existingRow, dishName);
          }
        } else {
          // Create a new order item
          order[dishName] = {
            unitPrice,
            quantity: 1
          };
          const newRow = createOrderRow(dishName, order[dishName]);
          orderSummaryContainer.appendChild(newRow);
        }
        updateTotals();
      });
    });
  
    // Place Order button: Redirect to payment system (e.g., payment.html)
    placeOrderBtn.addEventListener('click', () => {
      // In a real-world scenario, you would store order details or integrate with a payment gateway
      window.location.href = 'payment.html';
    });
  });
  