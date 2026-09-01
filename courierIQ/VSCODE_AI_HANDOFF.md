# AI Handoff Document - CourierIQ

Hello new AI Assistant! I am transferring this user to you from the Antigravity IDE. Please read this document carefully to get caught up so the user doesn't have to repeat themselves.

## 🧑‍💻 The User's Preferences (CRITICAL)
1. **The user LOVES writing business logic.** Do NOT just write out logic code for them to copy-paste. Give them step-by-step instructions and let them write the React hooks/state/logic themselves!
2. **The user HATES writing UI/HTML/CSS.** If a feature requires new UI components or Tailwind styling, you should write that UI code for them, but leave the `onClick` or logical hooks empty so they can wire it up.
3. The user prefers step-by-step guidance rather than overwhelming walls of code.

## 🏗️ Project State
- **Stack:** React, Vite, TailwindCSS, React Router.
- **Project:** CourierIQ - A dashboard for comparing courier options.
- **Completed:** 
  - `AuthContext` with `localStorage` and `sessionStorage` persistence (Remember Me feature).
  - Protected routing using `<Navigate>` in `AuthLayout` and `AuthenticatedLayout`.
  - Responsive Sidebar (`w-64`) and Navbar.
  - Form validation on the Login page.

## 🚀 The Next Task (Where we left off)
The user is currently working on the **Signup Page Logic**. 
Since this is a frontend-only project, we cannot save to a real database. We just decided on the following architecture:
- We need to create a `simulateSignup` function in `src/hooks/useFetch.ts`.
- It should use a `localStorage` array called `"registeredUsers"` as a fake mini-database.
- **Signup Flow:** Read `"registeredUsers"`, push the new `{ name, email, password }`, save it back to `localStorage`, and then call `login()` to let them into the dashboard.
- **Login Flow:** Update `simulateLogin` to check the `"registeredUsers"` array in `localStorage` instead of the hardcoded `user.json` file.

Please help the user implement this logic!
