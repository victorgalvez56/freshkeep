<p align="center">
  <img src="assets/images/title-logo.png" alt="FreshKeep" width="320" />
</p>

<p align="center">
  <strong>Reduce el desperdicio alimentario, cocina con lo que tienes.</strong>
</p>

<p align="center">
  <a href="https://v0-freshkeep.vercel.app">Landing</a> &middot;
  <a href="https://v0-freshkeep.vercel.app/privacy">Privacidad</a> &middot;
  <a href="https://v0-freshkeep.vercel.app/terms">Terminos</a> &middot;
  <a href="https://v0-freshkeep.vercel.app/faq">FAQ</a>
</p>

---

FreshKeep es una app open source para trackear tus alimentos, recibir alertas antes de que venzan y generar recetas con IA usando lo que ya tienes en tu cocina. Disponible para iOS y Android.

<p align="center">
  <img src="assets/images/onboarding-1.png" alt="FreshKeep Preview" width="280" />
</p>

## Funcionalidades

- **Inventario inteligente** — Registra alimentos con categoria, cantidad, ubicacion y fecha de vencimiento. Escanea etiquetas con la camara usando IA.
- **Alertas de vencimiento** — Notificaciones configurables a 7, 3 o 1 dia antes. Resumen diario opcional.
- **Recetas con IA** — Genera recetas personalizadas con los ingredientes que ya tienes. Prioriza lo que esta por vencer.
- **Registro de comidas** — Diario nutricional con calorias, proteinas, grasas y carbohidratos por dia.
- **Estadisticas** — Visualiza consumo vs. desperdicio, dinero ahorrado y perdido, analisis por categoria.
- **Lista de compras** — Sugerencias automaticas basadas en productos vencidos de tu inventario.
- **Multi-proveedor IA** — OpenAI, Claude, Groq, DeepSeek y Gemini.
- **Multi-moneda** — 12 monedas latinoamericanas + USD.
- **Modo oscuro** — Claro, oscuro o automatico segun tu dispositivo.
- **Offline-first** — Todos los datos se guardan localmente con SQLite.

## Tech Stack

| Capa | Tecnologia |
|------|-----------|
| Framework | [Expo](https://expo.dev) (SDK 54) + React Native 0.81 |
| Navegacion | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based) |
| Base de datos | [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) (SQLite local) |
| IA | OpenAI, Anthropic, Groq, DeepSeek, Google Gemini |
| Notificaciones | [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) |
| UI | Glass morphism (expo-glass-effect), expo-blur, expo-linear-gradient |
| Fuentes | Playpen Sans, Nunito (Google Fonts) |
| Landing | Next.js 14 + Tailwind CSS |
| Lenguaje | TypeScript |

## Estructura del proyecto

```
freshkeep/
├── app/                        # Pantallas (Expo Router)
│   ├── (tabs)/                 # Navegacion por tabs
│   │   ├── index.tsx           # Inicio — nutricion diaria
│   │   ├── inventory.tsx       # Inventario de alimentos
│   │   ├── shopping.tsx        # Lista de compras
│   │   ├── stats.tsx           # Estadisticas
│   │   └── settings.tsx        # Ajustes
│   ├── add-item.tsx            # Agregar alimento
│   ├── edit-item.tsx           # Editar alimento
│   ├── add-meal.tsx            # Registrar comida
│   └── ai-recipes.tsx          # Recetas con IA
├── src/
│   ├── components/             # Componentes reutilizables
│   ├── constants/              # Categorias, temas, providers IA
│   ├── contexts/               # SettingsContext
│   ├── database/               # Schema y operaciones SQLite
│   ├── hooks/                  # useDatabase, useTheme
│   ├── services/               # labelScanner, openai
│   ├── types/                  # TypeScript types
│   └── utils/                  # Fechas, moneda, notificaciones
├── landing/                    # Landing page (Next.js)
│   ├── app/                    # Pages: home, privacy, terms, faq
│   └── public/                 # Assets y SEO
├── assets/                     # Imagenes, iconos, fuentes
├── app.json                    # Configuracion Expo
└── eas.json                    # Configuracion EAS Build
```

## Requisitos previos

- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS: Xcode 15+ (solo macOS)
- Android: Android Studio con SDK 34+
- Una API key de cualquier proveedor de IA soportado (OpenAI, Claude, Groq, DeepSeek o Gemini)

## Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/victorgalvez56/freshkeep.git
cd freshkeep

# Instalar dependencias
npm install

# iOS — instalar pods y correr
npx expo run:ios

# Android — correr
npx expo run:android
```

### Landing page

```bash
cd landing
npm install
npm run dev
# Abre http://localhost:3000
```

## Base de datos

FreshKeep usa SQLite localmente con 5 tablas:

| Tabla | Descripcion |
|-------|------------|
| `food_items` | Alimentos con categoria, vencimiento, precio, ubicacion |
| `meals` | Registro de comidas con macronutrientes |
| `meal_items` | Items individuales dentro de una comida |
| `shopping_list` | Lista de compras con sugerencias automaticas |
| `settings` | Configuracion del usuario (key-value) |

## Proveedores de IA

Configura tu API key desde **Ajustes > Integracion con IA** dentro de la app.

| Proveedor | Modelo (chat) | Modelo (vision) |
|-----------|--------------|-----------------|
| OpenAI | gpt-4o-mini | gpt-4o |
| Claude | claude-sonnet-4-5-20250929 | claude-sonnet-4-5-20250929 |
| Groq | llama-3.3-70b-versatile | llama-3.2-90b-vision |
| DeepSeek | deepseek-chat | — |
| Gemini | gemini-2.0-flash | gemini-2.0-flash |

## Build para produccion

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login en Expo
eas login

# Build iOS
eas build --platform ios --profile production

# Build Android
eas build --platform android --profile production

# Submit a las tiendas
eas submit --platform ios
eas submit --platform android
```

## Contribuir

Las contribuciones son bienvenidas. Para cambios grandes, abre un issue primero para discutir que te gustaria cambiar.

1. Fork el repositorio
2. Crea tu branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

MIT

---