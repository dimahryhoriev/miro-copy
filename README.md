# Miro Copy

A high-performance virtual whiteboard application built with React and TypeScript, featuring an infinite-like canvas, draggable sticky notes, dynamic connecting arrows with edge snapping, and complete Supabase-powered authentication and persistence.

[🟢 Live Demo](https://miro-copy-ten.vercel.app)

---

## 🛠 Tech Stack

* **Frontend Framework:**  
  React, TypeScript (Strict typing, component composition, custom math and interaction hooks)

* **Styling & UI:**  
  Tailwind CSS, CSS Transforms & SVG (Vector line rendering, GPU-accelerated node transformations)

* **Backend & Database:**  
  Supabase (PostgreSQL, Auth, Row Level Security, custom PL/pgSQL triggers)

* **Architecture:**  
  Feature-Sliced Design principles (`app`, `features`, `shared` modular boundaries)

* **Build Tooling:**  
  Vite (Fast HMR, optimized production builds)

---

## ⚡️ Key Engineering Features

* **Infinite Canvas & Math Mechanics**
  * 🎯 *Screen-to-World Translation:* Viewport matrix math converting raw mouse and touch inputs into dynamic canvas space coordinates.
  * ⚡️ *Optimized Rendering & Positioning:* Direct CSS translate(x, y) for sticker movement combined with absolute zero-origin SVG path rendering (M/L coordinate mapping) for dynamic arrows without DOM reflow.

* **Connected Graph System (Stickers & Smart Arrows)**
  * 📌 *Interactive Sticky Notes:* Dynamic auto-expanding textareas with top-aligned flow, preventing text overflow and visual clipping on multiline typing.
  * 🏹 *Edge Snapping Arrows:* Dynamic SVG connectors that track node coordinates in real time and automatically calculate the closest edge connection points (top, right, bottom, left) with angle-adjusted arrowheads.
  * 🔄 *Dynamic Re-linking:* Dragging any connected sticker recalculates arrow path geometry on the fly without lagging the canvas.

* **Full Authentication Lifecycle & User Management**
  * 🔐 *Secure Auth Flow:* Email & password registration with email verification, secure session-based login, and password reset flows.
  * 👤 *User Profile Synchronization:* Automatic recording and sync of user profiles and workspaces upon authentication.
  * 🔒 *Row Level Security (RLS):* Postgres-level security policies guaranteeing that users can only view, mutate, or delete their own boards and canvas nodes.

* **Database Engine & Automation**
  * ⏱ *Selective Timestamp Triggers:* Custom PL/pgSQL trigger function that selectively updates `updated_at` on the board record only when nodes or connections are altered, ignoring redundant updates.
  * 🛡 *Relational Integrity:* Foreign key cascading rules ensuring clean data deletion when boards or nodes are removed.

* **Modular Architecture**
  * 📂 *Isolated Modules:* Strict boundaries separating canvas geometry math, sticker editing, arrow connection algorithms, and shared UI primitives.
  * 📐 *Type Safety:* Full end-to-end typing for canvas elements, edge snap points, arrow matrices, and database entities.

---

## 🚀 How to Run

### Option 1: Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dimahryhoriev/miro-copy.git
   ```

2. Navigate to the application folder:
   cd miro-copy

3. Install dependencies:
   npm install

4. Configure Environment Variables:
   Create a .env.local file inside the root directory:
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

5. Start the local server:
   npm run dev

### Option 2: Live Demo
Try out the deployed application: [Open Live Demo](https://miro-copy-ten.vercel.app)