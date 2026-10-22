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
    orderDate: '2026-10-05'
  },
  {
    orderId: 10,
    customerName: "Zanele Ndlovu",
    email: 'zee007@outlook.com',
    product: 'Office Chair',
    category: 'Furniture',
    price: 1089.99,
    orderDate: '2026-10-19'
  },
]
// task 5 - Challenge 0
let orderSection = document.getElementById('order-section');
let sortNewestFirst = true;
let searchTerm = '';
let selectedCategory = '';
let minPrice = null;
let maxPrice = null;

const currency = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' });

function renderOrders() {
    const visible = visibleOrders();
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
                    <th scope="col" class="px-4 py-3 font-semibold" aria-sort="${sortNewestFirst ? 'descending' : 'ascending'}">
                        <button type="button" data-sort="date" class="inline-flex items-center gap-1 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
                            Date <span aria-hidden="true">${sortNewestFirst ? '↓' : '↑'}</span>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                ${visible.length === 0
                    ? '<tr><td colspan="6" class="px-4 py-6 text-sm text-slate-500">No orders match the current filters.</td></tr>'
                    : visible.map((order) => {
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
                    <td class="px-4 py-3 text-right">
                        <span class="block font-medium text-slate-900">${formatMoney(order.price)}</span>
                        <span class="block text-xs text-slate-500">VAT ${formatMoney(orderVat(order.price))} · total ${formatMoney(orderTotal(order.price))}</span>
                    </td>
                    <td class="px-4 py-3">
                        <span class="block font-medium text-slate-900">${readableDate(order)}</span>
                        <span class="block text-xs text-slate-500">${daysAgoText(order)}</span>
                        ${isRecentOrder(order) ? '<span class="mt-1 inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800">Recent</span>' : ''}
                    </td>
                </tr>`;
                }).join('')}
            </tbody>
        </table>
    </div>`;
}

renderOrders();
updateStats();

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

// Challenge 2: Order Math (Number and Math)
function formatMoney(value) {
    return currency.format(value.toFixed(2));
}

function orderVat(price) {
    const cents = Math.round(price * 100);
    return Math.round((cents * 15) / 100) / 100;
}

function orderTotal(price) {
    return price + orderVat(price);
}

function totalRevenue() {
    return orders.reduce((sum, order) => sum + parseFloat(order.price), 0);
}

function totalVat() {
    return orders.reduce((sum, order) => sum + orderVat(order.price), 0);
}

function averageOrderPrice() {
    return Math.round((totalRevenue() / orders.length) * 100) / 100;
}

function highestOrderPrice() {
    return Math.max(...orders.map((order) => order.price));
}

function lowestOrderPrice() {
    return Math.min(...orders.map((order) => order.price));
}

// Challenge 7: Export and Import Orders (JSON)

function updateStats() {
    document.getElementById('stat-orders').textContent = orders.length;
    document.getElementById('stat-revenue').textContent = formatMoney(totalRevenue());
    document.getElementById('stat-average').textContent = formatMoney(averageOrderPrice());
    document.getElementById('stat-highest').textContent = formatMoney(highestOrderPrice());
    document.getElementById('stat-lowest').textContent = formatMoney(lowestOrderPrice());
    document.getElementById('stat-vat').textContent = formatMoney(totalVat());
}

function renderDataProcessing() {
    const container = document.querySelector('#data-processing div[aria-label="Data processing"]');
    if (!container) return;
    container.innerHTML = `
        <div class="p-4 space-y-4">
            <div>
                <label class="block text-xs font-medium text-slate-600 mb-2">Export Orders (JSON)</label>
                <textarea id="exportJson" readonly class="w-full border border-slate-200 px-3 py-2 text-xs font-mono h-24">${escapeHtml(JSON.stringify(orders, null, 2))}</textarea>
                <button id="copyExport" class="mt-2 text-xs px-2 py-1 border border-slate-200 hover:bg-slate-50">Copy</button>
            </div>
            <div>
                <label class="block text-xs font-medium text-slate-600 mb-2">Import Orders (JSON)</label>
                <textarea id="importJson" class="w-full border border-slate-200 px-3 py-2 text-xs font-mono h-24" placeholder='[{"orderId":11,...}]'></textarea>
                <button id="importBtn" class="mt-2 text-xs px-2 py-1 border border-slate-200 hover:bg-slate-50">Import</button>
                <p id="importError" class="text-xs text-red-600 mt-1"></p>
            </div>
        </div>`;
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

renderDataProcessing();

document.querySelector('#data-processing').addEventListener('click', (e) => {
    if (e.target.id === 'copyExport') {
        const ta = document.getElementById('exportJson');
        ta.select();
        document.execCommand('copy'); // ponytail: simple copy, add Clipboard API if need more
    }
    if (e.target.id === 'importBtn') {
        const ta = document.getElementById('importJson');
        const err = document.getElementById('importError');
        err.textContent = '';
        try {
            const parsed = JSON.parse(ta.value);
            if (!Array.isArray(parsed)) throw new Error('Not an array');
            // ponytail: assume shape matches; add validation if needed
            orders = orders.concat(parsed);
            renderOrders();
            updateStats();
            renderCategories();
            renderCategoryFilter();
            renderFilterPanel();
            buildProductMap();
            renderDataProcessing(); // refresh export
        } catch (ex) {
            err.textContent = 'Invalid JSON or format.';
        }
    }
});

// Challenge 3: Order Dates (Date)
function orderDateObject(order) {
    return new Date(`${order.orderDate}T00:00:00`);
}

function readableDate(order) {
    const date = orderDateObject(order);
    return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
}

function daysSince(order) {
    return Math.floor((Date.now() - orderDateObject(order).getTime()) / 86400000);
}

function daysAgoText(order) {
    const days = daysSince(order);
    return `${days} day${days === 1 ? '' : 's'} ago`;
}

function isRecentOrder(order) {
    return daysSince(order) <= 30;
}

function sortedOrders() {
    return [...orders].sort((a, b) => {
        const diff = orderDateObject(b).getTime() - orderDateObject(a).getTime();
        return sortNewestFirst ? diff : -diff;
    });
}

// Challenge 4: Search, Filter and Analyse Orders (Array Methods)
function categoryOptions() {
    return [...new Set(orders.map((order) => order.category))].sort();
}

function scopedOrders() {
    return sortedOrders().filter((order) => {
        if (selectedCategory && order.category !== selectedCategory) return false;
        if (minPrice !== null && order.price < minPrice) return false;
        if (maxPrice !== null && order.price > maxPrice) return false;
        return true;
    });
}

function matchesTerm(order, query) {
    return String(order.orderId) === query || cleanName(order.customerName).toLowerCase().includes(query);
}

function visibleOrders() {
    const query = searchTerm.trim().toLowerCase();
    return scopedOrders().filter((order) => !query || matchesTerm(order, query));
}

function findOrder(term) {
    const query = term.trim().toLowerCase();
    return query ? scopedOrders().find((order) => matchesTerm(order, query)) : undefined;
}

function totalOf(list) {
    return list.reduce((sum, order) => sum + order.price, 0);
}

function renderFilterPanel() {
    const visible = visibleOrders();
    const found = findOrder(searchTerm);
    const products = visible.map((order) => ({ product: order.product, total: orderTotal(order.price) }));

    document.getElementById('filter-summary').innerHTML = `
        <p class="text-sm font-medium text-slate-900">${visible.length} of ${orders.length} orders</p>
        <p>Total ${formatMoney(totalOf(visible))}</p>
        <p>Any order over R 1 000: ${visible.some((order) => order.price > 1000) ? 'Yes' : 'No'}</p>
        <p>All prices valid: ${visible.every((order) => Number.isFinite(order.price) && order.price > 0) ? 'Yes' : 'No'}</p>`;

    document.getElementById('search-result').innerHTML = found
        ? `<p class="text-xs font-medium uppercase tracking-wider text-slate-500">Found</p>
           <p class="mt-1 text-sm font-medium text-slate-900">#${found.orderId} - ${cleanName(found.customerName)}</p>
           <p class="text-xs text-slate-500">${found.product} - ${formatMoney(orderTotal(found.price))} incl. VAT</p>`
        : searchTerm.trim() ? '<p class="text-sm text-slate-500">No order found.</p>' : '';

    document.getElementById('product-list').innerHTML = `
        <p class="text-xs font-medium uppercase tracking-wider text-slate-500">Products incl. VAT</p>
        <ul class="mt-1 space-y-0.5">
            ${products.map((item) => `<li class="flex justify-between gap-3"><span class="truncate text-slate-600">${item.product}</span><span class="shrink-0 font-medium text-slate-900">${formatMoney(item.total)}</span></li>`).join('')}
        </ul>`;
}

const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');

function applyFilters() {
    renderOrders();
    renderFilterPanel();
}

searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value;
    applyFilters();
});

categoryFilter.addEventListener('change', () => {
    selectedCategory = categoryFilter.value;
    applyFilters();
});

minPriceInput.addEventListener('input', () => {
    minPrice = minPriceInput.value === '' ? null : Number(minPriceInput.value);
    applyFilters();
});

maxPriceInput.addEventListener('input', () => {
    maxPrice = maxPriceInput.value === '' ? null : Number(maxPriceInput.value);
    applyFilters();
});

document.getElementById('clear-filters').addEventListener('click', () => {
    searchInput.value = '';
    categoryFilter.value = '';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    searchTerm = '';
    selectedCategory = '';
    minPrice = null;
    maxPrice = null;
    applyFilters();
});

renderFilterPanel();

// Challenge 5: Unique Categories (Set)

function getUniqueCategories() {
    return [...new Set(orders.map(order => order.category))];
}

function renderCategories() {
    const categories = getUniqueCategories();
    const container = document.querySelector('#categories div[aria-label="Categories"]');
    if (!container) return;
    container.innerHTML = `
        <ul class="divide-y divide-slate-100">
            ${categories.map(cat => `<li class="px-4 py-2 text-sm text-slate-700">${cat}</li>`).join('')}
        </ul>`;
}

function renderCategoryFilter() {
    const select = document.getElementById('category-filter');
    if (!select) return;
    select.innerHTML = '<option value="">All categories</option>' + categoryOptions().map((category) => `<option value="${category}">${category}</option>`).join('');
}

renderCategories();
renderCategoryFilter();

orderSection.addEventListener('click', (event) => {
    if (!event.target.closest('[data-sort="date"]')) return;
    sortNewestFirst = !sortNewestFirst;
    renderOrders();
});

// Challenge 6: Product Lookup (Map)
const productMap = new Map();
const productInput = document.getElementById('product-input');

function buildProductMap() {
    productMap.clear();
    orders.forEach((order) => {
        productMap.set(order.product, { price: order.price, category: order.category });
    });
    document.getElementById('product-options').innerHTML = [...productMap.keys()].map((name) => `<option value="${name}"></option>`).join('');
    document.getElementById('catalog-size').textContent = `${productMap.size} products in catalog`;
}

function findProduct(name) {
    const query = name.trim();
    if (!query) return undefined;
    if (productMap.has(query)) return { name: query, ...productMap.get(query) };
    for (const key of productMap.keys()) {
        if (key.toLowerCase() === query.toLowerCase()) return { name: key, ...productMap.get(key) };
    }
    return undefined;
}

function renderProductLookup() {
    const query = productInput.value.trim();
    const result = document.getElementById('product-result');
    const missing = document.getElementById('product-missing');

    if (!query) {
        result.innerHTML = '';
        missing.classList.add('hidden');
        return;
    }

    const product = findProduct(query);
    if (!product) {
        result.innerHTML = '';
        missing.textContent = `No product named "${query}". The catalog holds ${productMap.size} products.`;
        missing.classList.remove('hidden');
        return;
    }

    missing.classList.add('hidden');
    result.innerHTML = `
        <p class="text-sm font-medium text-slate-900">${product.name}</p>
        <p class="text-xs text-slate-500">${product.category}</p>
        <p class="mt-1 text-sm font-medium text-slate-900">${formatMoney(product.price)}</p>
        <p class="text-xs text-slate-500">VAT ${formatMoney(orderVat(product.price))} · total ${formatMoney(orderTotal(product.price))}</p>`;
}

buildProductMap();
productInput.addEventListener('input', renderProductLookup);