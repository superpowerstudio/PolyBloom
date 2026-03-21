"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { href: "/", label: "Terminal" },
    { href: "/polymarket", label: "Polymarket" },
    { href: "/signals", label: "Signals" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/news", label: "News" },
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(10, 16, 25, 0.8)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid #1C2431",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1
                style={{
                  fontFamily: "Newsreader, serif",
                  fontStyle: "italic",
                  fontSize: "1.25rem",
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
                }}
              >
                GRAND OPUS PROTOCOL
              </p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative py-4 transition-colors"
                style={{
                  fontFamily: "Space Grotesk, monospace",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: pathname === item.href ? "#C49A3C" : "#D2C5B1",
                }}
              >
                {item.label}
                {pathname === item.href && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: "#C49A3C" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* Live Clock */}
            <div
              style={{
                fontFamily: "Space Grotesk, monospace",
                fontSize: "0.75rem",
                color: "#807665",
              }}
            >
              {formatTime(currentTime)}
            </div>

            {/* Session Indicator */}
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#22c55e" }}
              />
              <span
                style={{
                  fontFamily: "Space Grotesk, monospace",
                  fontSize: "0.625rem",
                  color: "#807665",
                  textTransform: "uppercase",
                }}
              >
                LIVE
              </span>
            </div>

            {/* Settings Icon */}
            <button
              className="p-2 transition-colors"
              style={{ color: "#807665" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: "#D2C5B1" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden py-4"
            style={{ borderTop: "1px solid #1C2431" }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 transition-colors"
                style={{
                  fontFamily: "Space Grotesk, monospace",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: pathname === item.href ? "#C49A3C" : "#D2C5B1",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}