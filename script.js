/* Challenge 0 - task 3 */
let orders = [
  {
    orderId: 1,
    customerName: 'John  Doe',
    email: 'john.doe@gmail.com',
    product: 'Laptop',
    category: 'Electronics',
    price: 999.99,
    orderDate: '2023-08-15'
  },
  {
    orderId: 2,
    customerName: 'jANE sMITH',
    email: 'jane.smith@gmail.com',
    product: 'Running Shoes',
    category: 'Sports',
    price: 89.5,
    orderDate: '2023-09-02'
  },
  {
    orderId: 3,
    customerName: 'Bob Johnson',
    email: 'bob.johnson@gmail.com',
    product: 'Cookware Set',
    category: 'Home & Kitchen',
    price: 149.99,
    orderDate: '2023-10-03'
  },
  {
    orderId: 4,
    customerName: '  Alice Williams  ',
    email: 'alice.williams(at)gmail.com',
    product: 'Denim Jacket',
    category: 'Clothing',
    price: 74.95,
    orderDate: '2023-11-14'
  },
  {
    orderId: 5,
    customerName: 'MICHAEL BROWN',
    email: 'michael.brown@icloud.com',
    product: 'Cookbook',
    category: 'Books',
    price: 32.5,
    orderDate: '2023-12-24'
  },
  {
    orderId: 6,
    customerName: 'Thato Mokoena',
    email: 'thato.mokoena@gmail.com',
    product: 'Wireless Headphones',
    category: 'Electronics',
    price: 219.99,
    orderDate: '2024-01-05'
  },
  {
    orderId: 7,
    customerName: "Sipho Dlamini",
    email: 'sipho.dlamini',
    product: 'Board Game',
    category: 'Toys & Games',
    price: 45.99,
    orderDate: '2024-02-18'
  },
  {
    orderId: 8,
    customerName: 'Lerato khumalo',
    email: 'lerato.khumalo@gmail.com',
    product: 'Yoga Mat',
    category: 'Sports',
    price: 29.9,
    orderDate: '2024-03-30'
  },
  {
    orderId: 9,
    customerName: "Thabo Mthembu",
    email: 'thabomthembu.@yahoo.com',
    product: 'Espresso Machine',
    category: 'Home & Kitchen',
    price: 1249.5,
    orderDate: '2024-04-11'
  },
  {
    orderId: 10,
    customerName: "Zanele Ndlovu",
    email: 'zee007@outlook.com',
    product: 'Office Chair',
    category: 'Furniture',
    price: 1089.99,
    orderDate: '2024-05-22'
  },
]
// task 5 - Challenge 0
let orderSection = document.getElementById('order-section');

const currency = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' });
const orderDate = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' });

orderSection.innerHTML = `
    <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
            <thead>
                <tr class="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <th scope="col" class="px-4 py-3 font-semibold">Order</th>
                    <th scope="col" class="px-4 py-3 font-semibold">Customer</th>
                    <th scope="col" class="px-4 py-3 font-semibold">Product</th>
                    <th scope="col" class="px-4 py-3 font-semibold">Category</th>
                    <th scope="col" class="px-4 py-3 text-right font-semibold">Price</th>
                    <th scope="col" class="px-4 py-3 font-semibold">Date</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                ${orders.map((order) => {
                    const name = cleanName(order.customerName);
                    const email = cleanEmail(order.email);
                    return `
                <tr class="hover:bg-slate-50" title="First name: ${firstName(order.customerName)} | Email domain: ${emailDomain(order.email) || 'none'}">
                    <td class="px-4 py-3 font-medium text-slate-900">#${order.orderId}</td>
                    <td class="px-4 py-3">
                        <span class="block font-medium text-slate-900">${name}</span>
                        <span class="block text-xs text-slate-500">${email}</span>
                    </td>
                    <td class="px-4 py-3 text-slate-700">${order.product}</td>
                    <td class="px-4 py-3 text-slate-500">${order.category}</td>
                    <td class="px-4 py-3 text-right font-medium text-slate-900">${currency.format(order.price)}</td>
                    <td class="px-4 py-3 text-slate-500">${orderDate(order.orderDate)}</td>
                </tr>`;
                }).join('')}
            </tbody>
        </table>
    </div>`;

// Challenge 1: Clean Customer Data (String)
function cleanName(name) {
    return name.trim().split(/\s+/).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function cleanEmail(email) {
    return email.trim().replace(/\s+/g, '').toLowerCase();
}

function firstName(name) {
    return cleanName(name).split(' ')[0];
}

function emailDomain(email) {
    const cleaned = cleanEmail(email);
    return cleaned.includes('@') ? cleaned.split('@')[1] : '';
}

