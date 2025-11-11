"use client";
import { useEffect, useRef } from "react";

// ESewaForm: injects backend-provided HTML form (string) into the DOM and auto-submits it.
// Props:
// - formHtml: raw HTML string containing a <form> (server-provided)
// - action: optional action URL (if formHtml is empty)
// - onSubmit: optional callback invoked just before submitting
export default function ESewaForm({ formHtml, action, onSubmit }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Insert provided HTML or build a minimal form
    if (formHtml && String(formHtml).trim() !== "") {
      container.innerHTML = formHtml;
    } else {
      container.innerHTML = `<form id=\"esewa_form\" action=\"${action}\" method=\"post\"></form>`;
    }

    // Try to submit the form
    const form = container.querySelector("form");
    if (form) {
      try {
        if (typeof onSubmit === "function") onSubmit();
        form.submit();
      } catch (e) {
        // Last resort: navigate the browser to the action URL
        if (action) window.location.href = action;
      }
    } else if (action) {
      // No form found: navigate directly
      window.location.href = action;
    }
  }, [formHtml, action, onSubmit]);

  return <div ref={containerRef} />;
}
