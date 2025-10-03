# Ocean Eats – Food Ordering Frontend

Modern, ocean-inspired food ordering interface built with Next.js (App Router) and Tailwind CSS utilities. Users can browse restaurants, filter by cuisine, rating and price, view menus, manage a cart, and place orders. REST calls are abstracted behind a simple service with dummy data for now.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- Minimal state via React Context (Cart + UI)

## Ocean Professional Style
- Primary: `#2563EB` (Blue-600)
- Secondary: `#F59E0B` (Amber-500)
- Error: `#EF4444`
- Background: `#f9fafb`
- Surface: `#ffffff`
- Typography: modern, clean, minimalist with subtle shadows and rounded corners

## Features
- Header with navigation
- Sidebar filters: search, cuisines, rating, price
- Restaurant list with cards
- Restaurant details with menu sections
- Add to cart, inline quantity controls, remove/clear
- Persistent cart summary bar
- Dummy REST API integration with fallback data
- Responsive layout

## Getting Started
Install dependencies and run dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Configuration
Environment variables:
- NEXT_PUBLIC_API_BASE: Optional base URL for backend REST API. If not set, the app will use local dummy data. Add to `.env.local`:

```
NEXT_PUBLIC_API_BASE=https://your-backend.example.com
```

Do not commit actual secrets. Provide only necessary public endpoints.

## Project Structure
- src/app: App Router pages and layout
- src/components: UI components (cards, sidebar, details, cart bar)
- src/context: Cart and UI context providers
- src/services: REST API abstraction with dummy fallback
- src/types: Shared TypeScript types

## API Integration Notes
- `src/services/api.ts` defines `api.getRestaurants`, `api.getRestaurant`, and `api.placeOrder`.
- Replace dummy endpoints with real backend URLs and shape once the backend is available.
- Ensure CORS and authentication (if needed) are configured on the backend.

## Accessibility
- Buttons and inputs have accessible labels where applicable
- Color choices respect contrast with light surfaces

## Deployment
- `next.config.ts` is configured for static export (`output: "export"`).
- Use `npm run build` and then deploy the `out/` directory to a static host or use Vercel.

## License
MIT
