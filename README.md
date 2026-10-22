# E-Commerce Order Processor

## Project Description

A client-side e-commerce order dashboard for viewing and processing orders. It displays order details, calculates revenue/statistics, cleans customer data, and provides date-based sorting and insights.

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
| `Date` | `orderDateObject()` (`new Date()`), `readableDate()` (`toLocaleDateString()`), `daysSince()` (`Date.now()`), sorting by date |
| `Array` | Order data structure, `map()`, `reduce()`, `sort()`, spread `[...orders]`, `filter`-like logic via methods |
| `RegExp` | Whitespace normalization in `cleanName()` (`/\s+/`) and `cleanEmail()` (`/\s+/g`) |
| `Intl` | `Intl.NumberFormat` for ZAR currency formatting |

## How to Run

1. Clone or download the project files.
2. Open `index.html` in a modern web browser (no build step required). All dependencies (Tailwind CSS) load via CDN.

## Screenshots

### Orders Displayed
![Orders table showing order list with cleaned customer names, products, categories, prices with VAT/total, and dates](./screenshots/orders-displayed.png)

### Calculated Statistics
![Statistics cards showing total orders, revenue, average order value, highest order, lowest order, and total VAT](./screenshots/calculated-statistics.png)

### Date Processing
![Order rows showing readable dates, days ago, and Recent badge for orders within 30 days; sortable by date](./screenshots/date-processing.png)

## Reflection

1. **Which built-in JavaScript object did you find most useful?**  
   (To be answered via /grill-me)

2. **Which challenge was the most difficult?**  
   (To be answered via /grill-me)

3. **What did you learn about choosing the right JavaScript method for a problem?**  
   (To be answered via /grill-me)

4. **If you had more time, what would you improve about the application?**  
   (To be answered via /grill-me)
