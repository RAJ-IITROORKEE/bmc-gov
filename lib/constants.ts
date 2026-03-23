// Site-wide constants

export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Burdwan Medical College and Hospital",
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || "A Center of Excellence in Patient Care Services, Medical Education and Research",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contact: {
    email:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
      "burdwanmedicalcollege76@gmail.com",
    secondaryEmail: "principalbmc2015@gmail.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "(0342) 7962201",
    phoneHref: "+913427962201",
    address:
      "Burdwan Medical College, Baburbag, Burdwan-713104",
  },
};

// Navigation items for main site
export const MAIN_NAV_ITEMS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "The Institution",
    href: "/institution",
  },
  {
    title: "Management",
    href: "#",
    children: [
      { title: "Administration", href: "/management/administration" },
      { title: "Past Principals", href: "/management/past-principals" },
      { title: "College Council", href: "/management/college-council" },
    ],
  },
  {
    title: "Committees",
    href: "/committees",
  },
  {
    title: "Academic",
    href: "#",
    children: [
      { title: "Admission 2024", href: "/academic/admission" },
      { title: "Academic Notice", href: "/academic/notice" },
      { title: "Research Proposals", href: "/academic/research" },
    ],
  },
  {
    title: "Departments",
    href: "/departments",
  },
  {
    title: "Courses",
    href: "#",
    children: [
      { title: "Under Graduate (MBBS)", href: "/courses/undergraduate" },
      { title: "Post Graduate (MD/MS)", href: "/courses/postgraduate" },
      { title: "Post Doctoral", href: "/courses/postdoctoral" },
    ],
  },
  {
    title: "Hospital Service",
    href: "#",
    children: [
      { title: "OPD Schedule", href: "/hospital-service/opd" },
      { title: "Organ Donation", href: "/hospital-service/organ-donation" },
    ],
  },
  {
    title: "Gallery",
    href: "/gallery",
  },
];

// Admin sidebar navigation
export const ADMIN_NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "Notices",
    href: "/admin/notices",
    icon: "Bell",
  },
  {
    title: "Achievements",
    href: "/admin/achievements",
    icon: "Award",
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: "Images",
  },
  {
    title: "Principal Message",
    href: "/admin/principal-message",
    icon: "MessageSquare",
  },
  {
    title: "Departments",
    href: "/admin/departments",
    icon: "Building2",
  },
];
