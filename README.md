# Samovar - Tea Subscription Admin Portal

A React-based admin portal for managing tea subscriptions for Samovar, a premium global tea subscription service.

# Features
Subscription List View: View all current tea subscriptions in a consolidated list
Detail View: Access detailed information for any subscription
Sorting: Sort subscriptions by price
Subscription Management: Delete subscriptions directly from the interface

# Technical Implementation
The application is built with React and communicates with a backend API. Key components include:
App.js: Main application component handling routing and state
SubscriptionsContainer: Manages the display of subscription cards
Subscriptions: Cards holding a preview of subcription details
DetailView: Displays comprehensive information for a selected subscription

# API Integration

The frontend connects to a local API with the following endpoints:
GET /api/v1/subscriptions: Retrieve all subscriptions
GET /api/v1/subscriptions?sort=price: Retrieve subscriptions sorted by price
GET /api/v1/subscriptions/:id: Retrieve details for a specific subscription
DELETE /api/v1/subscriptions/:id: Delete a subscription















# STARTER REPO DETAILS AND PROJECT SPEC

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. This repo also includes Cypress and Router.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Tea Subscription Service
You will create a full stack application for a Tea Subscription Service, including a Rails API and a React front end. You do NOT need to deploy this app.

# Front End
Again, try to limit your total time on the FE to around 8 hours. Prioritize what is important to get this working and as close to MVP as possible. Please do not attempt to recreate an entire existing Tea Shop's website. We're interested in seeing your ability to write clean code to solve a problem with an understanding of basic UX. We're not looking for fancy UI tricks or hacks.

Tea Subscription React App
You will create a tea subscription application that consumes the Rails API you've just built. Feel free to use this starter React repo.

# Requirements:
At a minimum, you must show:

-List of subscriptions (name with an image or icon)
-Detailed View of subscription (name, image or icon, description, tea(s) and customer(s) involved)
-The ability to cancel a subscription (for one tea at a time or multiple teas) somewhere in the application
-Some sort of search, filter, OR sort

Beyond the base requirements, include any additional elements you'd like, just be mindful of your time. You don't need to go overboard, just consider what might be necessary to achieve MVP so that this app is easy-to-use, information is clear, and navigation is painless. Put yourself in a user's shoes and think about what you would need (or want). The app should be usable on desktop, tablet, and mobile devices.