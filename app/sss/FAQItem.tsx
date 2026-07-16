"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl" style={{ border: "1px solid var(--gray-100)" }}>
      <button
        className="faq-item-btn w-full flex items-center justify-between text-left gap-4"
        style={{ background: open ? "var(--gray-50)" : "white", padding: "1.5rem 1.75rem", borderRadius: open ? "0.75rem 0.75rem 0 0" : "0.75rem" }}
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-base" style={{ color: "var(--teal-dark)" }}>
          {q}
        </span>
        <FaChevronDown
          className="flex-shrink-0 transition-transform"
          style={{ color: "var(--gray-400)", fontSize: 14, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div style={{ color: "var(--gray-600)", background: "var(--gray-50)", borderTop: "1px solid var(--gray-100)", padding: "1.25rem 1.75rem 1.5rem", fontSize: "0.9rem", lineHeight: 1.75 }}>
          {a}
        </div>
      )}
    </div>
  );
}
