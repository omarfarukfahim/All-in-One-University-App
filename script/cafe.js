document.addEventListener('DOMContentLoaded', () => {
  // Sample menu data for each category
  const categories = {
    breakfast: [
      {
        name: 'Pancakes',
        image: 'https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/09/beef-burger.jpg?',
        description: 'Calories: 350 | Protein: 80g',
        price: '৳70',
        button: 'Add to Cart+'
      },
      {
        name: 'Omelette',
        image: 'https://msmarket.coop/wp-content/uploads/omlete.jpg',
        description: 'Calories: 400 | Protein: 15g',
        price: '৳20',
        button: 'Add to Cart+'
      },
      {
        name: 'Noodles',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s',
        description: 'Calories: 138 | Protein: 15g',
        price: '৳20',
        button: 'Add to Cart+'
      }
    ],
    lunch: [
      {
        name: 'Grilled Chicken Salad',
        image: 'assets/Grilled-Chicken-Caesar-Salad-14.png',
        description: 'Fresh greens with grilled chicken',
        price: '৳150',
        button: 'Add to Cart+'
      },
      {
        name: 'Spaghetti Bolognese',
        image: 'assets/images.png',
        description: 'Pasta with rich tomato & beef sauce',
        price: '৳200',
        button: 'Add to Cart+'
      }
    ],
    snacks: [
      {
        name: 'French Fries',
        image: 'assets/Crispy-Fries_8.png',
        description: 'Crispy golden fries',
        price: '৳50',
        button: 'Add to Cart+'
      },
      {
        name: 'Chicken Nuggets',
        image: 'assets/images (1).png',
        description: 'Tender nuggets served with dip',
        price: '৳80',
        button: 'Add to Cart+'
      }
    ]
  };

  // Select the container where the menu items will be rendered.
  const menuItemsContainer = document.querySelector('.space-y-4');

  // Select all the category buttons.
  const categoryButtons = document.querySelectorAll('.flex.space-x-4.mb-6 button');

  // Order Details Elements (right section)
  const orderSummaryContainer = document.getElementById('order-summary');
  const itemsTotalElem = document.getElementById('items-total');
  const discountElem = document.getElementById('discount');
  const totalPaymentElem = document.getElementById('total-payment');

  const DISCOUNT = 10;
  // Global order object to store added items
  const order = {};

  // Function to update the totals displayed in the Order Details section
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

  // Function to create a new order row element for a dish
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

    // Attach event listener for the minus button
    row.querySelector('.minus').addEventListener('click', () => {
      if (order[dishName].quantity > 1) {
        order[dishName].quantity--;
        updateOrderRow(row, dishName);
      } else {
        // Remove the item if quantity is 1 and user clicks minus
        delete order[dishName];
        row.remove();
        updateTotals();
      }
    });

    // Attach event listener for the plus button in the order summary row
    row.querySelector('.plus').addEventListener('click', () => {
      order[dishName].quantity++;
      updateOrderRow(row, dishName);
    });

    return row;
  }

  // Function to update the order row element's quantity and price
  function updateOrderRow(row, dishName) {
    const details = order[dishName];
    row.querySelector('.quantity').textContent = details.quantity;
    row.querySelector('.price').textContent = `৳${details.unitPrice * details.quantity}`;
    updateTotals();
  }

  // The addToCart function that updates the Order Details section
  function addToCart(item) {
    // Convert price text (e.g., "৳70") to a number
    const unitPrice = parseFloat(item.price.replace('৳', ''));
    if (order[item.name]) {
      // If item already exists in order, increase quantity
      order[item.name].quantity++;
      const existingRow = orderSummaryContainer.querySelector(`[data-dish="${item.name}"]`);
      if (existingRow) {
        updateOrderRow(existingRow, item.name);
      }
    } else {
      // Add a new entry for the item
      order[item.name] = { unitPrice, quantity: 1 };
      const newRow = createOrderRow(item.name, order[item.name]);
      orderSummaryContainer.appendChild(newRow);
    }
    updateTotals();
  }

  // Function to render menu items for a given category
  function renderMenu(category) {
    // Clear current menu items
    menuItemsContainer.innerHTML = '';
    const items = categories[category];
    if (!items) return;
    items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = "flex items-center justify-between border p-4 rounded-lg shadow";
      itemDiv.innerHTML = `
        <div class="flex items-center space-x-4">
          <img src="${item.image}" class="w-20 h-20 rounded-lg" alt="${item.name}" />
          <div>
            <h2 class="text-lg font-bold">${item.name}</h2>
            <p class="text-sm text-gray-600">${item.description}</p>
            <span class="bg-green-200 px-2 py-1 rounded text-sm">${item.price}</span>
          </div>
        </div>
        <button class="bg-green-500 add-to-cart p-2 rounded-full w-20 text-white text-2xl font-bold">
          ${item.button}
        </button>
      `;
      menuItemsContainer.appendChild(itemDiv);

      // Attach event listener to the add-to-cart button for this menu item
      const cartButton = itemDiv.querySelector('.add-to-cart');
      cartButton.addEventListener('click', () => {
        addToCart(item);
      });
    });
  }

  // Set up event listeners on category buttons to render corresponding menu
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Reset styles for all buttons
      categoryButtons.forEach(btn => {
        btn.classList.remove('bg-green-300');
        btn.classList.add('bg-gray-300');
      });
      // Activate the clicked button
      button.classList.remove('bg-gray-300');
      button.classList.add('bg-green-300');

      // Get the category from the button text and render the menu
      const selectedCategory = button.textContent.trim().toLowerCase();
      renderMenu(selectedCategory);
    });
  });

  // Render the breakfast menu by default on page load
  renderMenu('breakfast');
});
