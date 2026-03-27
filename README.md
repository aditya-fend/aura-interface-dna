# Aura — Interface DNA Intelligence

![Aura Header](/public/aura-page.png)

Aura — Interface DNA Intelligence is an experimental UX simulation engine that transforms static UI components into dynamic, data-driven nodes. By leveraging a reactive scoring algorithm and real-time particle traffic simulation, it provides designers with instant visual feedback on layout hierarchy and interaction flow. This "Interface DNA" approach bridges the gap between creative design and analytical performance, allowing for a deep, living map of user experience directly within the canvas.

🔗 **Live Demo**
https://aditya-fend-aura.vercel.app

---

## 🎯 Project Goal

This project was created as a **portfolio showcase** for **Aura — Interface DNA Intelligence** to demonstrate:

* **Advanced Logic Integration :** Building a reactive "scoring engine" that translates spatial UI coordinates into meaningful UX metrics.
* **Complex Interactive Systems :** Implementing high-fidelity canvas interactions including 8-point resizing and drag-and-drop using `@dnd-kit`.
* **Data-Driven Visualizations :** Developing synchronized feedback layers, such as particle-based traffic simulations and dynamic heatmaps, to represent abstract data visually.
* **Robust TDD Workflow :** Ensuring system stability through a comprehensive suite of unit and integration tests using Vitest and React Testing Library.
* **Modern Hybrid Architecture :** Orchestrating a seamless blend of Astro’s speed with React’s interactivity and Zustand’s efficient state management.

---

## 🛠 Tech Stack

* **Astro 6.0** (Web framework with Islands Architecture)
* **React 19** (UI library for interactive components)
* **TypeScript** (Language for type-safety and scalability)
* **Tailwind CSS 4.0** (Utility-first CSS framework)
* **Zustand** (Lightweight state management)
* **Vitest** (Blazing fast unit test runner)
* **React** Testing Library (User-centric component testing)
* **JSDOM** (DOM environment for testing)

---

## 🔧 Tooling & Libraries

* **@dnd-kit** (Core, Sortable, and Utilities for drag-and-drop mechanics)
* **Framer Motion** (Production-ready animations and particle simulations)
* **Vite** (Build tool with React and TSConfig path plugins)
* **Iconify** (Lucide icons and unified icon framework)
* **Astro Icon** (Optimized icon component for Astro)
* **Jest DOM** (Custom matchers for DOM state assertions)

---

## ✨ Features

* ⚡ **Live DNA Scoring Engine**
    A real-time analytical core that evaluates UI elements based on their spatial positioning ($x, y$) and dimensions ($width, height$). It provides an instant "Survival Score" (0-100%) to help designers understand the visual impact of their layout.
* 🧬 **Interactive Design Canvas**
    A high-fidelity workspace powered by `@dnd-kit`, featuring:
    * **Fluid Drag-and-Drop :** Move elements with precision sensors and activation constraints.
    * **8-Point Manual Resizing :** Full control over element scaling with real-time coordinate updates.
    * **Smart Selection :** Instant node focus with "Empty Workspace" detection to clear active states.
* 🛰️ **User Traffic Simulator**
    A dynamic particle system built with Framer Motion that simulates "User Intent." Particles are magnetically drawn toward high-scoring nodes, providing a visual representation of how a user's attention might flow through the interface.
* 🔥 **Ambient Heatmap Layer**
    A reactive background visualization that generates a "glow" around components. The heatmap's intensity and color (Indigo for optimal, Rose for sub-optimal) shift dynamically based on the element's performance score.
* 🔍 **Aura Intelligence Inspector**
    A sophisticated properties panel that offers more than just inputs:
    * **Contextual Insights :** Automated textual feedback based on UX scores.
    * **Identity Mapping :** Deep configuration of labels, dimensions, and axis coordinates.
    * **Compliance Monitoring :** Simulated "Accessibility & Performance" checks (Contrast, Touch Sensitivity, Latency).
* ⌨️ **Advanced Command Shortcuts**
    Productivity-focused keyboard mapping allowing users to instantly remove selected nodes using `Delete` or `Backspace`, with smart detection to prevent accidental deletions while typing in input fields.
* 🧪 **Rock-Solid Stability (TDD)**
    A comprehensive testing infrastructure that ensures every interaction—from dragging a button to resizing a card—is bug-free and mathematically accurate through **Vitest** and **React Testing Library.**

---

## 🧪 Testing

This project includes comprehensive testing for:

* **(Spatial Logic & Core Engine) :** Validates the mathematical accuracy of the UX scoring algorithm, ensuring that changes in coordinates and dimensions consistently produce the correct "Interface Intelligence" metrics.
* **(State Integrity & CRUD Operations) :** Tests the global state management to ensure adding, updating, and removing nodes remains synchronized and persistent across all UI synchronization points.
* **(Node Interaction & Manipulation) :** Ensures high-fidelity interaction mechanics, specifically verifying the precision of 8-way manual resizing and the reliability of drag-and-drop coordinate translations.
* **(Orchestration & Workflow) :** Verifies that the primary workspace correctly manages multiple layers (Simulation, Heatmap, Nodes) and that empty states are handled gracefully.
* **(Input & Conflict Management) :** Tests global event listeners and keyboard shortcuts to ensure productivity commands (like deletion) do not trigger while the user is actively typing in input fields.
* **(Reactive Property Syncing) :** Confirms that manual adjustments in the configuration panel instantly reflect on the visual canvas and trigger the necessary recalculations in the engine.
* **(Visual Simulation Behavior) :** Ensures that the particle system and traffic simulation correctly respond to the active state of the engine and prioritize the intended visual targets.
Run tests locally:

```bash
pnpm test
```

---

## 📁 Project Structure

This project uses a **feature-based architecture** combined with reusable UI components.

```
src/
├── features/
│   ├── canvas/
│   │   ├── components/
│   │   │   ├── CanvasArea.tsx
│   │   │   ├── DraggableElement.tsx
│   │   │   ├── HeatmapLayer.tsx
│   │   │   └── TrafficSimulator.tsx
│   │   ├── tests/
│   │   │   ├── CanvasArea.test.tsx
│   │   │   ├── DraggableElement.test.tsx
│   │   │   ├── HeatmapLayer.test.tsx
│   │   │   └── TrafficSimulator.test.tsx
│   │   └── index.ts
│   │
│   ├── engine/
│   │   ├── components/
│   │   │   └── PatternLibrary.tsx
│   │   ├── lib/
│   │   │   └── scoring.ts
│   │   ├── store/
│   │   │   └── useDNA.ts
│   │   ├── tests/
│   │   │   ├── PatternLibrary.test.tsx
│   │   │   ├── scoring.test.ts
│   │   │   └── useDNA.test.ts
│   │   └── index.ts
│   │
│   └── properties/
│       ├── components/
│       │   └── Properties.tsx
│       ├── tests/
│       │   └── Properties.test.tsx
│       └── index.ts
│
├── layouts/
│   └── layout.astro
│
├── pages/
│   └── index.astro
│
├── styles/
│   └── global.css
│
├── types/
│   └── dna.ts
│
└── vitest.setup.ts
```

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://aditya-fend-aura.vercel.app
cd dashboard-app
```

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

---

## 🔄 Development Workflow

This project follows a real-world, professional development workflow to ensure code quality, stability, and high performance:

* **Feature-Driven Architecture**: Organized the codebase by functional modules (Canvas, Engine, Properties) rather than generic folders, ensuring high cohesion and low coupling.
* **Test-Driven Development (TDD) Approach**: Implemented a comprehensive testing suite using Vitest and React Testing Library *before* and *during* feature finalization to catch edge cases in spatial logic and state synchronization.
* **Reactive State Management**: Utilized Zustand to create a high-performance "Single Source of Truth," allowing seamless real-time communication between independent React islands.
* **Component-Driven Development**: Built reusable UI atoms and complex organisms (like the 8-point resize handle) that are isolated, testable, and highly performant.
* **Modern Build Tooling**: Configured a lean build pipeline by stripping unnecessary PWA overhead and optimizing the Vite-React-Astro transformation for faster Hot Module Replacement (HMR).
* **Strict Type Safety**: Enforced a centralized "DNA" type system across the entire application to prevent runtime errors and ensure predictable data flow between the engine and the UI.
* **Performance-First Hydration**: Leveraged Astro’s "Islands Architecture" with `client:visible` directives to ensure heavy interactive components only hydrate when necessary, maintaining a fast initial load.

---

## 🔮 Future Improvements

* **Persistence Layer Integration**: Implementing Zustand's `persist` middleware with IndexedDB or a PostgreSQL backend to allow users to save and revisit their "Interface DNA" layouts across sessions.
* **AI-Powered Layout Suggestions**: Integrating a Large Language Model (LLM) to provide real-time, natural language design critiques based on the element's DNA score.
* **Export to Frameworks**: Adding a "Code Export" feature to convert canvas layouts directly into production-ready React, Vue, or Svelte component code.
* **Multi-Node Interaction Flows**: Developing a "User Pathing" tool that allows designers to link multiple nodes together to simulate a complete user journey and calculate cumulative flow efficiency.
* **Advanced Accessibility Audits**: Expanding the scoring engine to include WCAG 2.1 contrast ratio checks and automated screen-reader aria-label suggestions.
* **Collaborative Design Mode**: Implementing WebSockets to enable multiple designers to manipulate the same "DNA" canvas and see traffic simulations in real-time.

---

## 📌 Notes

* **Islands Architecture Optimization**: This project leverages Astro's partial hydration. Components like `Properties` are loaded using `client:visible` to prioritize initial page load speed, while the `CanvasArea` serves as the primary interactive hub.
* **Spatial Coordinate System**: The "DNA" scoring logic uses a relative coordinate system ($x, y$) to ensure that UX scores remain consistent regardless of the user's screen resolution or browser scaling.
* **Performance-First Animations**: Traffic simulations and heatmap glows are optimized using `Framer Motion`'s hardware-accelerated transforms to maintain a smooth 60fps, even when multiple UI nodes are active.
* **Event Propagation Management**: Special care was taken to prevent global keyboard shortcuts (like `Delete`) from triggering while a user is focused on input fields within the `Properties` inspector.
* **Lean Build Strategy**: PWA and Service Worker dependencies were intentionally removed to prioritize a lightweight, fast-refreshing development environment, focusing strictly on "Interface Intelligence" core features.
* **Strict Type Mapping**: The centralized `dna.ts` file acts as the single source of truth for all component structures, ensuring that the Engine, Store, and UI layers stay perfectly synchronized.
* **Orientation Intelligence Guard**: Implemented a global layout guard to enforce landscape orientation, ensuring the spatial "DNA" calculations and high-fidelity canvas remain accurate across all mobile and tablet devices.