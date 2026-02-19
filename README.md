<p align="center">
  <img src="assets/images/title-logo.png" alt="FreshKeep" width="320" />
</p>

<p align="center">
  <strong>Reduce food waste, cook with what you have.</strong>
</p>

<p align="center">
  <a href="https://v0-freshkeep.vercel.app">Landing</a> &middot;
  <a href="https://v0-freshkeep.vercel.app/privacy">Privacy</a> &middot;
  <a href="https://v0-freshkeep.vercel.app/terms">Terms</a> &middot;
  <a href="https://v0-freshkeep.vercel.app/faq">FAQ</a>
</p>

---

FreshKeep is an open-source app to track your food, get alerts before items expire, and generate AI-powered recipes using what you already have in your kitchen. Available for iOS and Android.

<p align="center">
  <img src="assets/images/onboarding-1.png" alt="FreshKeep Preview" width="280" />
</p>

## Features

- **Smart inventory** — Track food items with category, quantity, storage location, and expiration date. Scan product labels with your camera using AI.
- **Expiration alerts** — Configurable notifications at 7, 3, or 1 day before expiration. Optional daily summary.
- **AI recipes** — Generate personalized recipes with the ingredients you already have. Prioritizes items that are about to expire.
- **Meal tracking** — Daily nutrition log with calories, protein, fats, and carbs.
- **Statistics** — Visualize consumption vs. waste, money saved and lost, category-wise analysis.
- **Shopping list** — Automatic suggestions based on expired products from your inventory.
- **Multi-provider AI** — OpenAI, Claude, Groq, DeepSeek, and Gemini.
- **Multi-currency** — 12 Latin American currencies + USD.
- **Dark mode** — Light, dark, or automatic based on your device.
- **Offline-first** — All data is stored locally with SQLite.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Expo](https://expo.dev) (SDK 54) + React Native 0.81 |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based) |
| Database | [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) (local SQLite) |
| AI | OpenAI, Anthropic, Groq, DeepSeek, Google Gemini |
| Notifications | [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) |
| UI | Glass morphism (expo-glass-effect), expo-blur, expo-linear-gradient |
| Fonts | Playpen Sans, Nunito (Google Fonts) |
| Landing | Next.js 14 + Tailwind CSS |
| Language | TypeScript |

## Project Structure

```
freshkeep/
├── app/                        # Screens (Expo Router)
│   ├── (tabs)/                 # Tab navigation
│   │   ├── index.tsx           # Home — daily nutrition
│   │   ├── inventory.tsx       # Food inventory
│   │   ├── shopping.tsx        # Shopping list
│   │   ├── stats.tsx           # Statistics
│   │   └── settings.tsx        # Settings
│   ├── add-item.tsx            # Add food item
│   ├── edit-item.tsx           # Edit food item
│   ├── add-meal.tsx            # Log meal
│   ├── edit-meal.tsx           # Edit meal
│   └── ai-recipes.tsx          # AI recipes
├── src/
│   ├── components/             # Reusable components
│   ├── constants/              # Categories, themes, AI providers
│   ├── contexts/               # SettingsContext
│   ├── database/               # Schema and SQLite operations
│   ├── hooks/                  # useDatabase, useTheme
│   ├── services/               # labelScanner, openai
│   ├── types/                  # TypeScript types
│   └── utils/                  # Dates, currency, notifications
├── landing/                    # Landing page (Next.js)
│   ├── app/                    # Pages: home, privacy, terms, faq
│   └── public/                 # Assets and SEO
├── assets/                     # Images, icons, fonts
├── app.json                    # Expo configuration
└── eas.json                    # EAS Build configuration
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS: Xcode 15+ (macOS only)
- Android: Android Studio with SDK 34+
- An API key from any supported AI provider (OpenAI, Claude, Groq, DeepSeek, or Gemini)

## Installation

```bash
# Clone the repository
git clone https://github.com/victorgalvez56/freshkeep.git
cd freshkeep

# Install dependencies
npm install

# iOS — install pods and run
npx expo run:ios

# Android — run
npx expo run:android
```

### Landing page

```bash
cd landing
npm install
npm run dev
# Opens http://localhost:3000
```

## Database

FreshKeep uses SQLite locally with 5 tables:

| Table | Description |
|-------|------------|
| `food_items` | Food items with category, expiration, price, storage location |
| `meals` | Meal entries with macronutrients |
| `meal_items` | Individual items within a meal |
| `shopping_list` | Shopping list with automatic suggestions |
| `settings` | User settings (key-value) |

## AI Providers

Configure your API key from **Settings > AI Integration** within the app.

| Provider | Chat Model | Vision Model |
|----------|-----------|-------------|
| OpenAI | gpt-4o-mini | gpt-4o |
| Claude | claude-sonnet-4-5-20250929 | claude-sonnet-4-5-20250929 |
| Groq | llama-3.3-70b-versatile | llama-3.2-90b-vision |
| DeepSeek | deepseek-chat | — |
| Gemini | gemini-2.0-flash | gemini-2.0-flash |

## Production Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build iOS
eas build --platform ios --profile production

# Build Android
eas build --platform android --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

## Contributing

Contributions are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

MIT

---
