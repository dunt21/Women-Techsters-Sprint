# CourierIQ

> **Compare. Choose. Deliver smarter.**

## 1. Project Overview

**CourierIQ** is a web application designed to help individuals and small businesses compare courier and delivery services in one place.

The idea came from a common problem when sending deliveries. A user may have to open different courier applications such as Uber, Bolt, and Yango, enter the same pickup and destination information several times, and compare the prices before deciding which service to use.

CourierIQ aims to simplify this process.

Instead of switching between different applications, the user enters their delivery information once. CourierIQ then displays the available courier options together so the user can compare them based on price, estimated time, and availability.

After choosing an option, the user can continue to the selected courier provider to complete the delivery.

**CourierIQ does not intend to replace courier companies. It acts as a comparison and decision-making platform between the user and the courier providers.**

---

## 2. Problem Statement

People and businesses that send deliveries regularly often compare several courier services before making a booking.

The current process can involve:

1. Opening one courier application.
2. Entering the pickup location.
3. Entering the destination.
4. Checking the price and estimated time.
5. Opening another courier application.
6. Entering the same information again.
7. Comparing the results.
8. Repeating the process until the preferred option is found.

This becomes inconvenient for businesses that make several deliveries every day.

CourierIQ aims to reduce this repeated work by allowing the user to enter their delivery information once and compare available options from one interface.

---

## 3. Target Users

CourierIQ is mainly designed for people and businesses that frequently send deliveries, such as:

- Small business owners
- Online sellers
- Instagram and TikTok businesses
- Clothing and fashion businesses
- Food vendors
- Pharmacies
- Retail shops
- Freelancers
- Individuals who frequently send packages

The initial focus is on the type of delivery use cases commonly experienced by small businesses in Ghana.

---

## 4. Main Objectives

The project aims to:

- Reduce the time spent switching between courier applications.
- Allow users to enter delivery information only once.
- Compare courier options in a simple interface.
- Help users make decisions based on price and speed.
- Allow users to continue with their selected courier provider.
- Create a system that can support multiple courier providers.
- Provide practical experience with frontend, backend, databases, and APIs.
- Create a foundation that can be expanded in the future if the project proves useful.

---

# 5. How CourierIQ Will Work

The expected process is:

```text
User
  ↓
Enter pickup and destination
  ↓
Add package information
  ↓
Click "Compare"
  ↓
CourierIQ requests available quotes
  ↓
Provider information is received
  ↓
CourierIQ standardizes the information
  ↓
Results are displayed
  ↓
User compares the options
  ↓
User selects a provider
  ↓
User continues to the provider
  ↓
Delivery booking is completed
```

For example:

```text
Available Delivery Options

Bolt
GH₵18.50
Pickup: 8 mins
        [Continue]

Yango
GH₵19.20
Pickup: 10 mins
        [Continue]

Uber
GH₵21.00
Pickup: 6 mins
        [Continue]
```

The system can highlight:

- **Cheapest**
- **Fastest**
- **Best Value**

The final decision remains with the user.

---

# 6. Core Features

## User Authentication

Users will be able to create accounts and log in.

Accounts will allow users to save information such as:

- Saved addresses
- Search history
- Delivery history
- User preferences

---

## Delivery Comparison

The user can enter:

- Pickup location
- Destination
- Package size
- Package weight where required
- Delivery type
- Optional package description

CourierIQ will use this information to request available delivery options.

---

## Location Search

A maps/location service will provide:

- Address search
- Address suggestions
- Coordinates
- Distance
- Route information

This will make entering locations easier and more accurate.

---

## Comparison Results

Each courier result can display:

- Provider name
- Price
- Currency
- Estimated pickup time
- Estimated delivery time
- Availability
- Service type

Users can sort results by:

- Cheapest
- Fastest
- Best Value

---

## Saved Addresses

Users can save frequently used locations such as:

- Home
- Office
- Shop
- Warehouse
- Supplier

This makes future delivery searches faster.

---

## History

Users can view previous searches and deliveries.

Information may include:

- Date
- Pickup
- Destination
- Provider
- Price

Users can also repeat a previous route and request new prices.

---

## Provider Redirect

CourierIQ will not handle the actual delivery.

Where a courier provider officially supports deep links or approved booking integrations, CourierIQ will direct the user to that provider to complete the booking.

---

# 7. Courier Provider Integration

One of the most important parts of CourierIQ is connecting it to different courier providers.

The initial providers being investigated are:

- Uber
- Yango
- Bolt

However, each provider has different API access rules.

Some providers may provide developer or partner APIs, while others may require approval or restrict how their data can be used.

Because of this, CourierIQ will use a **provider-based architecture**.

Conceptually:

```text
                 CourierIQ
                     |
          -----------------------
          |          |          |
        Yango      Bolt       Uber
       Provider   Provider   Provider
```

Each provider will return information in its own format.

CourierIQ will convert the information into a common format such as:

```text
Provider
Price
Currency
Pickup Time
Delivery Time
Availability
Booking Link
```

This allows the frontend to display different providers consistently.

It also makes it easier to add more providers later.

---

# 8. API Feasibility

API access is one of the main feasibility considerations for this project.

The project will investigate official developer and partner APIs provided by courier companies.

The goal is to use **official and approved integrations** wherever possible.

The application will **not rely on scraping, reverse-engineering private APIs, bypassing authentication, or using stolen/unauthorized credentials.**

If a provider cannot be officially integrated during the capstone, that provider will use simulated/mock data.

This allows the rest of the system to be developed and demonstrated while leaving room for a real integration in the future.

---

# 9. Mock Provider Data

During development, some providers may use mock data.

For example:

```text
Bolt
GH₵18.50
8 mins

Yango
GH₵19.20
10 mins

Uber
GH₵21.00
6 mins
```

Mock data allows the project to test:

- Comparison
- Sorting
- Filtering
- Best-value recommendations
- Loading states
- Error handling
- Backend logic

Mock providers will be replaced with official integrations where access becomes available.

---

# 10. System Architecture

The basic system will work like this:

```text
                 User
                   |
                   ↓
             CourierIQ UI
                   |
                   ↓
             CourierIQ API
                   |
          -------------------
          |        |        |
          ↓        ↓        ↓
       Yango     Bolt     Uber
       API       API      API
          \        |       /
           \       |      /
            ↓      ↓     ↓
             Standardized
                Results
                   |
                   ↓
             Comparison UI
                   |
                   ↓
             Selected Provider
```

The frontend will not need to understand the different formats returned by each provider. The backend will handle that conversion.

---

# 11. Technology Stack

## Frontend

- **Vite** – user interface
- **TypeScript** – application language
- **Tailwind CSS** – styling
- **shadcn/ui** – reusable interface components
- **TanStack Query** – handling API requests and server data

## Backend

The backend will initially use Next.js server-side functionality and API routes.

It will handle:

- Delivery requests
- Provider requests
- Data conversion
- Validation
- Error handling
- User-related operations

This project will also be an opportunity to learn backend development in a practical way.

## Database

- **PostgreSQL**
- **Prisma**

The database can store:

- Users
- Saved addresses
- Search history
- Delivery history
- Preferences

## Maps

A service such as **Google Maps Platform** or **Mapbox** will be used for location-related functionality.

## Authentication

An authentication solution will be used to securely manage user accounts.

---

# 12. Error Handling

Courier providers may sometimes be unavailable or fail to return a quote.

CourierIQ should not stop the entire comparison when one provider fails.

For example:

```text
Bolt
GH₵18.50
Available

Uber
GH₵21.00
Available

Yango
Currently unavailable
```

The system will also handle:

- Invalid locations
- No available couriers
- API errors
- Slow responses
- Internet connection problems
- Invalid user input

---

# 13. Security

API keys and other sensitive credentials will not be exposed in the frontend.

Private credentials will be stored securely on the server using environment variables.

The application will only collect information required for its features.

---

# 14. Capstone MVP Scope

The first version will focus on the core functionality rather than trying to build a complete commercial platform.

### MVP Features

- User registration and login
- Pickup and destination input
- Location search
- Package information
- Courier comparison
- Price and time comparison
- Cheapest/Fastest/Best Value indicators
- Sorting
- Saved addresses
- Search history
- Mock courier providers
- Official provider integrations where available
- Provider redirect/deep-link support where available
- Responsive design

Features outside the MVP will only be added if the core application is completed successfully.

---

# 15. Future Improvements

If the project proves useful, it could later be expanded with:

- More courier providers
- Real-time delivery tracking
- Bulk deliveries
- Scheduled deliveries
- Business accounts
- Multiple staff accounts
- Delivery analytics
- Monthly spending reports
- Price history
- Smart courier recommendations
- Notifications
- Mobile application
- Courier provider partnerships

These features are outside the main capstone scope.

---

# 16. Example User Journey

A business owner needs to send a package from East Legon to Osu.

### Step 1

The user enters:

```text
Pickup: East Legon
Destination: Osu
Package: Small
```

### Step 2

The user clicks:

```text
Compare Delivery Options
```

### Step 3

CourierIQ requests available information.

### Step 4

The user sees:

```text
Cheapest
Bolt — GH₵18.50

Fastest
Uber — 6 mins

Best Value
Yango — GH₵19.20
```

### Step 5

The user chooses a provider.

### Step 6

CourierIQ directs the user to the selected provider where an official integration is available.

### Step 7

The user completes the booking through the courier provider.

---

# 17. Package Note: React Router DOM

`react-router-dom` is a package used to handle navigation and routes in React applications.

It allows different URLs to display different components.

For example:

```text
/login
/dashboard
/compare
/history
/settings
```

Common React Router components include:

- `BrowserRouter` – enables routing.
- `Routes` – contains the application's routes.
- `Route` – connects a URL to a component.
- `Link` – allows navigation between pages.
- `NavLink` – similar to Link but can identify the active page.
- `Outlet` – displays nested routes.
- `Navigate` – redirects users to another route.

---

# 18. Development Plan

The project will be developed gradually.

### Phase 1 – Planning and UI

- Define user flow
- Design screens
- Build reusable components
- Create responsive layouts

### Phase 2 – Core Application

- Build forms
- Add navigation
- Build comparison interface
- Add mock courier data

### Phase 3 – Backend

- Create API routes
- Handle requests and responses
- Validate information
- Create provider structure

### Phase 4 – Database

- Add PostgreSQL
- Add Prisma
- Store users
- Store saved addresses
- Store history

### Phase 5 – External APIs

- Add maps/location service
- Research courier APIs
- Add approved provider integrations where possible

### Phase 6 – Testing and Deployment

- Test different delivery routes
- Test provider failures
- Test invalid inputs
- Test mobile and desktop layouts
- Deploy the application

---

# 19. Expected Outcome

At the end of the capstone, CourierIQ should provide a working MVP that demonstrates how a user can enter one delivery request and compare multiple courier options from a single interface.

The project will demonstrate practical knowledge of:

- React and Next.js
- TypeScript
- Frontend development
- Backend development
- REST APIs
- Database management
- Authentication
- Maps/location services
- Third-party integrations
- Error handling
- Responsive UI design
- Basic system architecture

The long-term purpose of the project is to determine whether CourierIQ can grow beyond a capstone project into a useful tool for people and businesses that regularly send deliveries.

For the capstone, the main priority is to build a reliable MVP that solves the original problem clearly and demonstrates the ability to develop a complete application from frontend to backend.
