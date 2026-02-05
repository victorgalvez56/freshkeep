# Food Expiration Tracker App - Development Prompt

**App Name Suggestions:** FreshKeep / ExpiryGuard / PantryPal

## Core Purpose

Build a React Native (Expo) mobile app that helps users track food expiration dates, sends timely notifications before items expire, and maintains a smart shopping list based on expired or low-stock items.

---

## Key Features

### 1. Food Inventory Management

- Add food items with name, category, quantity, purchase date, expiration date, and price (optional)
- Support barcode scanning to auto-populate product info (optional)
- Organize items by category:
  - Fruits
  - Vegetables
  - Dairy (yogurt, milk, cheese)
  - Cereals/Grains
  - Canned Goods
  - Meat/Protein
  - Frozen
  - Beverages
  - Condiments
  - Snacks
- Edit and delete items
- Mark items as consumed or thrown away

### 2. Expiration Tracking & Alerts

- Visual dashboard showing items expiring soon (today, this week, this month)
- Color-coded status:
  - 🟢 Green: Fresh
  - 🟡 Yellow: Expiring soon
  - 🔴 Red: Expired
- Push notifications configurable by user (e.g., 3 days before, 1 day before, day of expiration)
- Daily summary notification option

### 3. Smart Shopping List

- Auto-suggest items to buy based on what's expired or running low
- Manual add items to shopping list
- Check off items while shopping
- Option to move purchased items directly to inventory with expiration date

### 4. Additional Features

- Search and filter inventory
- Storage location tags (fridge, freezer, pantry, counter)
- Usage statistics (food waste tracking, money lost on expired items, money saved)
- Monthly/weekly spending reports (when prices are logged)
- Dark/light mode

---

## Technical Requirements

- **Framework:** Expo SDK (latest stable)
- **Storage:** Local storage (AsyncStorage or Expo SQLite) for offline functionality
- **Notifications:** Expo Notifications for push alerts
- **UI/UX:** Clean, intuitive UI with smooth animations

### 5. Price Tracking (Optional)

- Register price paid for each item (optional field)
- Track total money spent on groceries
- Calculate money lost due to expired/wasted food
- View spending by category (fruits, dairy, etc.)
- Set budget alerts (optional)

---

## Screens Overview

1. **Home/Dashboard** - Overview of inventory status and items expiring soon
2. **Inventory** - Full list of all food items with filters
3. **Add/Edit Item** - Form to add or modify food items
4. **Shopping List** - List of items to buy
5. **Statistics** - Spending reports, waste tracking, savings
6. **Settings** - Notification preferences, categories, currency, theme

---

## Data Model (Example)

```javascript
FoodItem {
  id: string,
  name: string,
  category: string,
  quantity: number,
  unit: string,
  purchaseDate: Date,
  expirationDate: Date,
  storageLocation: string, // fridge, freezer, pantry, counter
  status: string, // fresh, expiring, expired
  price: number | null, // optional - price paid for the item
  currency: string, // optional - default to user's locale
  notes: string
}
```

---

## Notification Logic

| Condition | Notification |
|-----------|--------------|
| 3 days before expiration | "🟡 {item} expires in 3 days" |
| 1 day before expiration | "🟠 {item} expires tomorrow!" |
| Day of expiration | "🔴 {item} expires today!" |
| Already expired | "❌ {item} has expired" |

---

## Future Enhancements (Optional)

- Cloud sync for multiple devices
- Recipe suggestions based on expiring items
- Shared household inventory
- Integration with grocery delivery services
- AI-powered expiration date prediction based on typical shelf life
