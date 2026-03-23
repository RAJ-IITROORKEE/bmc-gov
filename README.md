# BMC-GOV Website

Complete website revamp for **Burdwan Medical College and Hospital** using Next.js 16 and Shadcn/UI.

## ✅ Current Progress

### Phase 1 Complete ✅
- Next.js 16 with App Router
- Shadcn/UI components installed
- Healthcare-themed color palette
- Light/Dark mode support
- Authentication utilities

### Phase 2 Complete ✅  
- Admin authentication system
- Admin layout with sidebar
- Admin dashboard
- 5 Admin modules with placeholders

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update .env.local with credentials
# ADMIN_USERNAME=admin
# ADMIN_PASSWORD=your_password

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - Public site  
Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) - Admin panel

**Default Admin Credentials:**
- Username: `admin`
- Password: `bmc@2024`

## Project Structure

```
app/
├── (main)/          # Public website
├── (admin)/         # Admin panel
│   └── admin/
│       ├── login/
│       ├── dashboard/
│       ├── notices/
│       ├── achievements/
│       ├── gallery/
│       ├── principal-message/
│       └── departments/
components/
├── admin/           # Admin components
├── main/            # Public components
└── ui/              # Shadcn components
lib/                 # Utilities & constants
```

## Tech Stack

- **Framework:** Next.js 16.2.1
- **UI:** Shadcn/UI + Tailwind CSS v4
- **Icons:** Lucide React
- **Fonts:** Inter, Poppins
- **Language:** TypeScript

## Admin Panel Features

All modules accessible via sidebar:
- 📊 Dashboard - Stats overview
- 🔔 Notices - Manage notices (🚧 In Progress)
- 🏆 Achievements - Manage achievements (🚧 In Progress)
- 🖼️ Gallery - Image management (🚧 In Progress)
- 💬 Principal Message - Edit message (🚧 In Progress)
- 🏢 Departments - Manage departments (🚧 In Progress)

## Next Steps

See `plan.md` for complete development roadmap.

**Immediate Next:**
- Phase 3: Public website home page
- Phase 4: Content pages
- Phase 5: UI/UX refinement

---

**Version:** 0.1.0 | **Status:** 🚧 In Development | **Last Updated:** March 23, 2026
