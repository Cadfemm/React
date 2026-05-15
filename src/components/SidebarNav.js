import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accessibility,
  Activity,
  Apple,
  Brain,
  Briefcase,
  Building2,
  ClipboardList,
  Ear,
  Eye,
  Hand,
  HeartPulse,
  Layers2,
  LayoutGrid,
  Menu,
  Mic,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Stethoscope,
  UserCircle,
  X,
} from "lucide-react";

const DEPARTMENTS = [

  "Nursing",
  "Medical Assistant",
  "Doctor",
  "Physiotherapy",
  "Integrated Rehab",
  "Work & Vocational Rehab",
  "Occupational Therapy",
  "Optometry",
  "Prosthetics & Orthotics",
  "Audiology",
  "Dietetics",
  "Speech & Language Therapy",
  "Psychology",
];

const DEPT_ICONS = {
 
  Nursing: HeartPulse,
  "Medical Assistant": ClipboardList,
  Doctor: Stethoscope,
  Physiotherapy: Activity,
  "Integrated Rehab": Layers2,
  "Work & Vocational Rehab": Briefcase,
  "Occupational Therapy": Hand,
  Optometry: Eye,
  "Prosthetics & Orthotics": Accessibility,
  Audiology: Ear,
  Dietetics: Apple,
  "Speech & Language Therapy": Mic,
  Psychology: Brain,
};

const RAIL_EXPANDED = 260;
const RAIL_COLLAPSED = 72;
const LS_COLLAPSED = "clinical-sidebar-collapsed";

/** RMS-style blue for active item */
const ACTIVE =
  "bg-[var(--bs-primary)] border border-[var(--bs-primary)] text-white shadow-sm";

const ACTIVE_ICON =
  "text-white";

/** Light hover surface: Bootstrap `.bg-white { … !important }` in App.css beats normal Tailwind hovers, so use `!` on hover bg. */
const INACTIVE =
  "text-[#1E1E1E] bg-white border border-white hover:!bg-primary-100 hover:!text-[var(--bs-primary)]";

const INACTIVE_ICON =
  "text-[#1E1E1E] group-hover:text-[var(--bs-primary)]";

function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setMatches(mq.matches);
    mq.addEventListener("change", handler);
    setMatches(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

function MainMenuBar({ collapsed, onToggleCollapse }) {
  return (
    <div
      className={`flex items-center gap-2 border-b border-gray-100 px-3 py-3 ${
        collapsed ? "justify-center" : "justify-between"
      }`}
    >
      {!collapsed && (
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Core
        </span>
      )}
      <button
        type="button"
        onClick={onToggleCollapse}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
        title={collapsed ? "Expand menu" : "Collapse menu"}
        aria-label={collapsed ? "Expand menu" : "Collapse menu"}
      >
        {collapsed ? (
          <PanelLeftOpen className="h-4 w-4" strokeWidth={2} />
        ) : (
          <PanelLeftClose className="h-4 w-4" strokeWidth={2} />
        )}
      </button>
    </div>
  );
}

function DepartmentNav({ departments, tab, onSelect, collapsed, className }) {
  return (
    <nav className={className} role="navigation" aria-label="Departments">
      <ul className="flex flex-col gap-0.5 px-2 py-2">
        {departments.map((dept, index) => {
          const Icon = DEPT_ICONS[dept] || LayoutGrid;
          const active = tab === dept;
          return (
            <motion.li
              key={dept}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.015,
                type: "spring",
                stiffness: 420,
                damping: 34,
              }}
            >
<div
  title={collapsed ? dept : undefined}
  onClick={() => onSelect(dept)}
  className={[
    "group flex cursor-pointer w-full items-center gap-[12px] px-[12px] py-[12px] rounded-[12px] text-left text-[16px] font-medium transition-all duration-200 mb-[6px]",
    collapsed ? "justify-center px-[10px]" : "",
    active ? ACTIVE : INACTIVE,
  ].join(" ")}
>
                <Icon
                  className={`h-5 w-5 shrink-0 ${active ? ACTIVE_ICON : INACTIVE_ICON}`}
                  strokeWidth={1.75}
                  aria-hidden
                />
                {!collapsed && (
                  <span className="min-w-0 flex-1 truncate leading-snug">{dept}</span>
                )}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileDrawerHeader({ onClose }) {
  return (
    <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-3">
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
        aria-label="Close menu"
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </motion.button>

      <div className="min-w-0 flex-1" />


    </div>
  );
}

function SidebarNav({ tab, setTab, username }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [collapsed, setCollapsed] = React.useState(() => {
    try {
      return localStorage.getItem(LS_COLLAPSED) === "1";
    } catch {
      return false;
    }
  });
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      localStorage.setItem(LS_COLLAPSED, collapsed ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  React.useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const visibleDepts =
    username === "rmsuser"
      ? DEPARTMENTS.filter((d) => d === "Customer Service" || d === "Optometry")
      : DEPARTMENTS;

  const selectDept = (dept) => {
    setTab(dept);
    setMobileOpen(false);
  };

  const railWidth = collapsed ? RAIL_COLLAPSED : RAIL_EXPANDED;
  const toggleCollapse = () => setCollapsed((c) => !c);

  return (
    <>
      {/* Mobile: menu trigger */}
      <div className="pointer-events-none fixed left-0 top-0 z-[100] md:hidden">
        <div className="pointer-events-auto p-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-md"
            aria-label="Open main menu"
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
          </motion.button>
        </div>
      </div>

      {/* Desktop: flat white rail */}
      <motion.aside
        initial={false}
        animate={{ width: railWidth }}
        transition={{ type: "spring", stiffness: 400, damping: 36 }}
        className="relative z-30 hidden h-screen shrink-0 flex-col border-end bg-white md:flex"
      >
        <MainMenuBar collapsed={collapsed} onToggleCollapse={toggleCollapse} />
        <div className="custom-scrollbar flex-1 overflow-y-auto overflow-x-hidden">
          <DepartmentNav
            departments={visibleDepts}
            tab={tab}
            onSelect={selectDept}
            collapsed={collapsed}
          />
        </div>
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[140] bg-black/35 md:hidden"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              initial={{ x: -24, opacity: 0.96 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0.9 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="fixed left-3 top-3 z-[150] flex h-[calc(100vh-24px)] w-[min(100vw-24px,288px)] max-w-[320px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl md:hidden"
            >
              <MobileDrawerHeader onClose={() => setMobileOpen(false)} />
              <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-4 py-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Main Menu
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-400">
                  <PanelLeftClose className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                </span>
              </div>
              <div className="custom-scrollbar flex-1 overflow-y-auto">
                <DepartmentNav
                  departments={visibleDepts}
                  tab={tab}
                  onSelect={selectDept}
                  collapsed={false}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

<style>{`
  .custom-scrollbar {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .custom-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`}</style>
    </>
  );
}

export default SidebarNav;
