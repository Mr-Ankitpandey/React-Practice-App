# Food Zone — React Food Ordering Demo

Small React project that demonstrates a client-side food ordering UI with a simple Node backend (local JSON data). Features include a product listing (meals), cart management, a checkout flow, modal UI, and a tiny HTTP helper hook. Various implemented React concepts are components, hooks, context, form management etc.

## Features

- Product listing (meals) fetched from the backend/local JSON.
  - See [`Meals`](Food-Order/01-starting-project/src/components/Meals.jsx) and [`useHttp`](Food-Order/01-starting-project/src/hooks/useHttp.js).
- Add/remove items with quantities and a running cart total.
  - Cart UI: [`Cart`](Food-Order/01-starting-project/src/components/Cart.jsx)
  - Per-item row: [`CartItem`](Food-Order/01-starting-project/src/components/CartItem.jsx)
  - Cart state via reducer/context: [`CartContextProvider`](Food-Order/01-starting-project/src/store/CartContext.jsx)
- Checkout flow with simple progress state (cart -> checkout -> success/error).
  - Progress provider: [`UserProgressContext`](Food-Order/01-starting-project/src/store/UserProgressContext.jsx)
  - Checkout UI: [`Checkout`](Food-Order/01-starting-project/src/components/Checkout.jsx)
- Modal dialog rendered with a portal to a DOM node.
  - [`Modal`](Food-Order/01-starting-project/src/components/Modal.jsx)
- Reusable presentational Button and Input components.
  - [`Button`](Food-Order/01-starting-project/src/components/Button.jsx)
  - [`InputElement`](Food-Order/01-starting-project/src/components/InputElement.jsx)
- Formatting utilities (currency formatting).
  - [`currencyFormatter`](Food-Order/01-starting-project/src/util/formatting.js)

## Architecture & implementation notes

- UI composition
  - Root: [`App.jsx`](Food-Order/01-starting-project/src/App.jsx) composes providers and pages.
  - Providers: [`UserProgressContextProvider`](Food-Order/01-starting-project/src/store/UserProgressContext.jsx) wraps [`CartContextProvider`](Food-Order/01-starting-project/src/store/CartContext.jsx) so UI components can read progress and cart state.
- State management
  - Cart uses a reducer in [`CartContext.jsx`](Food-Order/01-starting-project/src/store/CartContext.jsx) with actions:
    - `ADD_ITEM` — increments existing item quantity or adds new item
    - `REMOVE_ITEM` — decrements quantity or removes item
    - `CLEAR_CART` — empties cart
- Data fetching
  - The app uses [`useHttp`](Food-Order/01-starting-project/src/hooks/useHttp.js) hook to fetch meals (from the backend `backend/data/available-meals.json` or remote endpoint).
- Modal & Portal
  - [`Modal.jsx`](Food-Order/01-starting-project/src/components/Modal.jsx) uses a HTML `<dialog>` element and `createPortal` to render into `<div id="modal">` in the app shell.
- Backend
  - Minimal Node/Express-like server at [`backend/app.js`](Food-Order/01-starting-project/backend/app.js) serving JSON under `backend/data/`.
  - Seed data: [`backend/data/available-meals.json`](Food-Order/01-starting-project/backend/data/available-meals.json) and orders file [`backend/data/orders.json`](Food-Order/01-starting-project/backend/data/orders.json).

## Key files

- Project entry: [`index.html`](Food-Order/01-starting-project/index.html) and [`src/main.jsx`](Food-Order/01-starting-project/src/main.jsx)
- App composition: [`src/App.jsx`](Food-Order/01-starting-project/src/App.jsx)
- Components:
  - [`src/components/Header.jsx`](Food-Order/01-starting-project/src/components/Header.jsx)
  - [`src/components/Meals.jsx`](Food-Order/01-starting-project/src/components/Meals.jsx)
  - [`src/components/MealItem.jsx`](Food-Order/01-starting-project/src/components/MealItem.jsx)
  - [`src/components/Cart.jsx`](Food-Order/01-starting-project/src/components/Cart.jsx)
  - [`src/components/CartItem.jsx`](Food-Order/01-starting-project/src/components/CartItem.jsx)
  - [`src/components/Checkout.jsx`](Food-Order/01-starting-project/src/components/Checkout.jsx)
  - [`src/components/Modal.jsx`](Food-Order/01-starting-project/src/components/Modal.jsx)
  - [`src/components/Error.jsx`](Food-Order/01-starting-project/src/components/Error.jsx)
- Store / hooks / utils:
  - [`src/store/CartContext.jsx`](Food-Order/01-starting-project/src/store/CartContext.jsx) — cart reducer & provider
  - [`src/store/UserProgressContext.jsx`](Food-Order/01-starting-project/src/store/UserProgressContext.jsx)
  - [`src/hooks/useHttp.js`](Food-Order/01-starting-project/src/hooks/useHttp.js)
  - [`src/util/formatting.js`](Food-Order/01-starting-project/src/util/formatting.js)


Code by @nkit.

---

