/* Challenge 0 - task 3 */
let orders = [
  {
    orderId: 1,
    customerName: 'John Doe',
    email: 'john.doe@gmail.com',
    product: 'Laptop',
    category: 'Electronics',
    price: 999.99,
    orderDate: '2023-10-01'
  },
  {
    orderId: 2,
    customerName: 'Jane Smith',
    email: 'jane.smith@gmail.com',
    product: 'Smartphone',
    category: 'Electronics',
    price: 699.99,
    orderDate: '2023-10-02'
  },
  {
    orderId: 3,
    customerName: 'Bob Johnson',
    email: 'bob.johnson@gmail.com',
    product: 'Headphones',
    category: 'Electronics',
    price: 199.99,
    orderDate: '2023-10-03'
  },
  {
    orderId: 4,
    customerName: 'Alice Williams',
    email: 'alice.williams@gmail.com',
    product: 'Tablet',
    category: 'Electronics',
    price: 499.99,
    orderDate: '2023-10-04'
  },
  {
    orderId: 5,
    customerName: 'Michael Brown',
    email: 'michael.brown@icloud.com',
    product: 'Smartphone',
    category: 'Electronics',
    price: 699.99,
    orderDate: '2023-10-05'
  },
  {
    orderId: 6,
    customerName: 'Thato Mokoena',
    email: 'thato.mokoena@gmail.com',
    product: 'Smartwatch',
    category: 'Electronics',
    price: 299.99,
    orderDate: '2023-10-06'
  },
  {
    orderId: 7,
    customerName: "Sipho Dlamini",
    email: 'sipho.dlamini@outlook.com',
    product: "Bluetooth Speaker",
    category: "Electronics",
    price: 149.99,
    orderDate: '2023-10-07'
  },
  {
    orderId: 8,
    customerName: 'Lerato Khumalo',
    email: 'lerato.khumalo@gmail.com',
    product: 'Wireless Earbuds',
    category: 'Electronics',
    price: 129.99,
    orderDate: '2023-10-08'
  },
  {
    orderId: 9,
    customerName: "Thabo Mthembu",
    email: 'thabomthembu.@yahoo.com',
    product: 'Gaming Console',
    category: 'Electronics',
    price: 12499.99,
    orderDate: '2023-10-09'
  },
  {
    orderId: 10,
    customerName: "Zanele Ndlovu",
    email: 'zee007@outlook.com',
    product: 'Digital Camera',
    category: 'Electronics',
    price: 10899.99,
    orderDate: '2023-10-10'
  },
]

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
                ${orders.map((order) => `
                <tr class="hover:bg-slate-50">
                    <td class="px-4 py-3 font-medium text-slate-900">#${order.orderId}</td>
                    <td class="px-4 py-3">
                        <span class="block font-medium text-slate-900">${order.customerName}</span>
                        <span class="block text-xs text-slate-500">${order.email}</span>
                    </td>
                    <td class="px-4 py-3 text-slate-700">${order.product}</td>
                    <td class="px-4 py-3 text-slate-500">${order.category}</td>
                    <td class="px-4 py-3 text-right font-medium text-slate-900">${currency.format(order.price)}</td>
                    <td class="px-4 py-3 text-slate-500">${orderDate(order.orderDate)}</td>
                </tr>`).join('')}
            </tbody>
        </table>
    </div>`;
