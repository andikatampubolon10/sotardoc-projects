"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  FolderKanban,
  Inbox,
  LogOut,
  ExternalLink,
  Database,
  Menu,
  X,
  User,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<any>(null);
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on login page, render children directly without sidebar
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;

    // Check session
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.user) {
          setAdminUser(data.user);
        }
      })
      .catch(() => router.push("/admin/login"));

    // Check DB status
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => setDbStatus(data))
      .catch(() => {});
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Kelola Proyek", icon: FolderKanban },
    { href: "/admin/inquiries", label: "Pesanan Jasa", icon: Inbox },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[#27272A] bg-[#0c0c0c] shrink-0">
        {/* Brand */}
        <div className="p-6 border-b border-[#27272A]/70 flex items-center justify-between">
          <Link href="/admin" className="flex items-center">
            <Image
              src="/sotardoc-logo.webp"
              alt="Sotardoc"
              width={130}
              height={66}
              unoptimized
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-gray-400">
            v2.1
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 font-inter">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? "bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.12)]"
                    : "text-gray-400 hover:text-white hover:bg-neutral-900/80"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-black" : "text-gray-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-[#27272A]/60">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              <span className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4" />
                <span>Landing Page</span>
              </span>
              <span className="text-[10px] text-gray-600">Publik</span>
            </a>
          </div>
        </nav>

        {/* DB Connection Indicator */}
        <div className="p-4 border-t border-[#27272A]/70">
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-roboto space-y-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-gray-400">
                <Database className="w-3.5 h-3.5" />
                <span>Storage</span>
              </span>
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  dbStatus?.database?.connected
                    ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/60"
                    : "bg-amber-950/60 text-amber-400 border border-amber-800/60"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    dbStatus?.database?.connected ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                {dbStatus?.database?.connected ? "MySQL" : "Local Sync"}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 truncate">
              {dbStatus?.database?.name || "sotardoc_projects"}
            </p>
          </div>

          {/* User Profile & Logout */}
          <div className="mt-3 pt-3 border-t border-neutral-900 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-gray-300" />
              </div>
              <div className="truncate">
                <p className="text-xs font-inter font-medium text-white truncate">
                  {adminUser?.name || "Admin"}
                </p>
                <p className="text-[10px] text-gray-500 truncate">@{adminUser?.username || "admin"}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded text-gray-400 hover:text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-[#27272A] px-4 flex items-center justify-between bg-[#0c0c0c]">
          <Image
            src="/sotardoc-logo.webp"
            alt="Sotardoc"
            width={110}
            height={56}
            unoptimized
            className="h-7 w-auto object-contain"
          />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#27272A] bg-[#111111] p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                    active ? "bg-white text-black font-semibold" : "text-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[#27272A] flex justify-between items-center text-xs">
              <a href="/" target="_blank" className="text-gray-400 hover:text-white">
                Lihat Landing Page
              </a>
              <button onClick={handleLogout} className="text-red-400 font-medium">
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Page Container */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
