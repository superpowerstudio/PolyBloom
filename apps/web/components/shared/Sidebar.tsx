"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Terminal", icon: "💹" },
    { href: "/polymarket", label: "Polymarket", icon: "🔮" },
    { href: "/signals", label: "Signals", icon: "📊" },
    { href: "/portfolio", label: "Portfolio", icon: "📁" },
    { href: "/news", label: "News", icon: "📰" },
  ];

  return (
    <aside
      className="hidden lg:flex flex-col w-64 fixed left-0 top-0 h-full"
      style={{
        backgroundColor: "#0D141F",
        borderRight: "1px solid #1C2431",
      }}
    >
      {/* Logo */}
      <div className="p-6" style={{ borderBottom: "1px solid #1C2431" }}>
        <Link href="/">
          <h1
            style={{
              fontFamily: "Newsreader, serif",
              fontStyle: "italic",
              fontSize: "1.5rem",
              color: "#C49A3C",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            THE BESPOKE LEDGER
          </h1>
          <p
            style={{
              fontFamily: "Space Grotesk, monospace",
              fontSize: "0.625rem",
              color: "#807665",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginTop: "0.25rem",
            }}
          >
            GRAND OPUS PROTOCOL
          </p>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4" style={{ borderBottom: "1px solid #1C2431" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-sm flex items-center justify-center"
            style={{ backgroundColor: "#1C2431" }}
          >
            <span style={{ fontSize: "1.25rem" }}>👤</span>
          </div>
          <div>
            <p
              style={{
                fontFamily: "Work Sans, sans-serif",
                fontSize: "0.875rem",
                color: "#F9F9FF",
              }}
            >
              Operator
            </p>
            <p
              style={{
                fontFamily: "Space Grotesk, monospace",
                fontSize: "0.625rem",
                color: "#807665",
                textTransform: "uppercase",
              }}
            >
              Paper Mode
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 transition-colors relative"
                style={{
                  backgroundColor: isActive ? "rgba(196, 154, 60, 0.1)" : "transparent",
                  borderLeft: isActive ? "2px solid #C49A3C" : "2px solid transparent",
                }}
              >
                <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                <span
                  style={{
                    fontFamily: "Space Grotesk, monospace",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: isActive ? "#C49A3C" : "#D2C5B1",
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4" style={{ borderTop: "1px solid #1C2431" }}>
        <p
          style={{
            fontFamily: "Space Grotesk, monospace",
            fontSize: "0.5rem",
            color: "#4E4637",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          v0.2.0 · Build 2024.03.21
        </p>
      </div>
    </aside>
  );
}