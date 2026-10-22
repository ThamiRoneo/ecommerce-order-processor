# E-Commerce Order Processor

## Project Description

A client-side e-commerce order dashboard for viewing and processing orders. It displays order details, calculates revenue/statistics, cleans customer data, sorts by date, shows unique categories, supports JSON export/import, and validates customer emails and order ids with regular expressions. The Statistics section summarises the whole dataset: order count, revenue, average, highest/lowest order, VAT, unique categories, orders per category, valid/invalid emails, most expensive product and recent orders. Every statistic recalculates whenever the dataset changes (for example after a JSON import).

## Technologies

- HTML
- Tailwind CSS
- JavaScript

## Built-In Objects Used

| Built-In Object | Where Used in the Project |
| --------------- | --------------------------- |
| `String` | `cleanName()` (trimming, splitting, case conversion), `cleanEmail()` (trimming, lowercasing), `firstName()`, `emailDomain()` |
| `Number` | Price parsing/handling in totals (`parseFloat`), numeric calculations for VAT and averages |
| `Math` | `Math.round()` for VAT and averages, `Math.floor()` for days calculation, `Math.max()`/`Math.min()` for highest/lowest orders |
| `Date` | `orderDateObject()` (`new Date()`), `readableDate()` (`toLocaleDateString()`), `daysSince()` (`Date.now()`), sorting by date, `isRecentOrder()` for the recent orders statistic |
| `Array` | Order data structure, `map()`, `reduce()`, `filter()`, `sort()`, spread `[...orders]`, concatenation on import |
| `Set` | `getUniqueCategories()` to build unique categories from orders |
| `Map` | Product lookup catalog (`buildProductMap()`, `findProduct()`), orders per category (`categoryCounts()`) |
| `JSON` | `JSON.stringify()` in export, `JSON.parse()` in import with try/catch |
| `RegExp` | Whitespace normalization in `cleanName()` (`/\s+/`) and `cleanEmail()` (`/\s+/g`); validation patterns (`EMAIL_PATTERN`, `ORDER_ID_PATTERN`) with `.test()` in Challenge 8; email validity counts in the statistics |
| `Intl` | `Intl.NumberFormat` for ZAR currency formatting |

## How to Run

1. Clone or download the project files.
2. Open `index.html` in a modern web browser (no build step required). All dependencies (Tailwind CSS) load via CDN.

## Screenshots

### Dashboard overview
![Full e-commerce order dashboard](./assets/dashboard.png)

### Statistics dashboard
![Statistics cards summarising total orders, revenue, average order value, highest and lowest order, VAT, unique categories, valid and invalid emails, most expensive product, recent orders, and orders per category](./assets/statistics-dashboard.png)

### Orders displayed
![Orders table showing cleaned customer names, products, categories, prices with VAT and total, and dates](./assets/orders-displayed.png)

### Searching and filtering
![Search panel filtering orders by customer name with the product list and price breakdown](./assets/search-filtering.png)

### Unique categories
![Categories section listing unique product categories](./assets/unique-categories.png)

### Product lookup
![Product lookup showing the catalog entry for a searched product](./assets/product-lookup.png)

### JSON export and import
![Data processing panel with the exported JSON and the import box](./assets/json-processing-validation.png)

## Reflection

1. **Which built-in JavaScript object did you find most useful?**  
   
   **`Array` — mostly `map()` and `filter()`.** The order data lives in one array, and nearly every feature in the app is a read-only pass over that array rather than a change to it. `map()` turned each order into a table row in `renderOrders()`, each order into its category for the unique-category list (`[...new Set(orders.map((order) => order.category))].sort()`), and each `[category, count]` pair into a row in the statistics section. `filter()` narrowed the dataset for the search and filter panel (`scopedOrders()` and `visibleOrders()`), and it is how the statistics count valid emails and recent orders.
   
   The thing I had to be careful with was sorting. `sort()` mutates the array it is called on, so sorting the orders by date would have re-ordered the original list every time I clicked the date header — sorting a copy (`[...orders].sort(...)`) avoids that. It also made the difference between the three obvious: `map()` and `filter()` always hand back a new array, while `sort()` changes the one you gave it.

2. **Which challenge was the most difficult?**  
   
   **Challenge 8 — validating emails with regular expressions.** The pattern was where I got stuck. My first attempt was a flat pattern, roughly "some characters, then `@`, then some characters, then a dot", and it was too permissive: it accepted `thabomthembu.@yahoo.com`, the order with a trailing dot before the `@`. The version that works splits the address into a local part and a domain and turns the dots into optional groups of characters instead of plain characters (`(?:\.[A-Za-z0-9_%+-]+)*`). Because every dot now has to be followed by at least one character, the trailing-dot address finally fails, while the two genuinely broken ones (`sipho.dlamini` and `alice.williams(at)gmail.com`) still fail because they have no `@` at all.
   
   The order id pattern was the easy contrast — `/^[1-9]\d*$/` is a single quantifier — but the email pattern is where I had to stop thinking in characters and start thinking in structure. My first pattern described which characters were allowed; the one that works describes the shape of the address: a label, then optional dot-separated labels, then a top-level domain. The nested groups are harder to read, but they are the reason the pattern is actually correct.

3. **What did you learn about choosing the right JavaScript method for a problem?**  
   
   The honest version is that I picked the wrong method first and then worked out why. For the product lookup in Challenge 6 I started with `filter()` over the orders array. It worked, but every keystroke in the search box scanned the whole list looking for a match, because that was the shape of the code I had written, not the shape of the problem. The question was never "find the orders that match", it was "look this one up by name" — a key lookup, not a search — so `Map` was the right tool: `productMap.set()` while building the catalog and `productMap.get()` to read it back. The lesson was to ask what shape the question is before asking which method to write.
   
   The other half of the lesson is knowing when *not* to reach for the big tool. `emailDomain()` needs the domain out of an email address, and `split('@')[1]` does exactly that; a regular expression would have been a bigger hammer than the job needed. In Challenge 8 the job changed. Now I needed to know whether an address is well-formed, which is a pattern question, and that is where the regex earned its place. Same problem area, opposite decision, and the only thing that changed was what the question was actually asking.

4. **If you had more time, what would you improve about the application?**  
   

   
