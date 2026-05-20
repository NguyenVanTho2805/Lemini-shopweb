"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

export default function TagInput({
  tags,
  onChange,
  placeholder = "Nhập rồi nhấn Enter...",
  suggestions = [],
}: TagInputProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addTag = (value: string) => {
    const trimmed = value.trim().replace(/,+$/, "");
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput("");
    setShowSuggestions(false);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tag: string) => onChange(tags.filter((t) => t !== tag));

  const filteredSuggestions = suggestions.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s)
  );

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          border: "1px solid var(--border-color)",
          borderRadius: 6,
          padding: "6px 8px",
          minHeight: 40,
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          alignItems: "center",
          background: "var(--bg-input)",
          cursor: "text",
        }}
        onClick={() => document.getElementById("tag-input-field")?.focus()}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              background: "var(--color-primary-light)",
              color: "var(--color-primary)",
              borderRadius: 4,
              padding: "2px 8px",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "inherit",
                padding: 0,
                display: "flex",
                alignItems: "center",
                lineHeight: 1,
              }}
            >
              <X size={10} />
            </button>
          </span>
        ))}
        <input
          id="tag-input-field"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onKeyDown={handleKey}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder={tags.length === 0 ? placeholder : ""}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: 13,
            color: "var(--text-primary)",
            flex: 1,
            minWidth: 80,
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid var(--border-color)",
            borderRadius: 6,
            boxShadow: "var(--shadow-md)",
            zIndex: 50,
            maxHeight: 160,
            overflowY: "auto",
          }}
        >
          {filteredSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={() => addTag(s)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "8px 12px",
                border: "none",
                background: "none",
                fontSize: 13,
                color: "var(--text-secondary)",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--bg-page)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "none")
              }
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
        Nhấn <kbd style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 3, padding: "0 4px", fontSize: 10 }}>Enter</kbd> hoặc dấu phẩy để thêm
      </div>
    </div>
  );
}
