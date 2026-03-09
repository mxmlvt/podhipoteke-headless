"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2, FileText, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
  title: string;
  url: string;
  type: "Artykuł" | "Strona";
  excerpt: string;
}

interface Props {
  onClose?: () => void;
}

export default function SearchBar({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        onClose?.();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const json = await res.json();
      setResults(json.results ?? []);
      setOpen(true);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 300);
  }

  function handleClear() {
    setQuery("");
    setResults([]);
    setOpen(false);
    inputRef.current?.focus();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog?s=${encodeURIComponent(query.trim())}`);
      setOpen(false);
      onClose?.();
    }
  }

  function handleResultClick() {
    setOpen(false);
    setQuery("");
    onClose?.();
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-full border-2 border-[#2299AA] bg-white shadow-sm">
          {loading ? (
            <Loader2 className="w-4 h-4 text-[#2299AA] shrink-0 animate-spin" />
          ) : (
            <Search className="w-4 h-4 text-[#9ca3af] shrink-0" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Szukaj artykułów, stron..."
            className="flex-1 text-sm text-[#111827] placeholder-[#9ca3af] outline-none bg-transparent min-w-0"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="text-[#9ca3af] hover:text-[#374151] transition-colors"
              aria-label="Wyczyść"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown results */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e5e7eb] rounded-2xl shadow-2xl z-[100] overflow-hidden">
          {results.length === 0 ? (
            <div className="px-4 py-5 text-center text-sm text-[#6b7280]">
              Brak wyników dla „{query}"
            </div>
          ) : (
            <>
              <ul className="divide-y divide-[#f3f4f6]">
                {results.map((r) => (
                  <li key={r.url}>
                    <Link
                      href={r.url}
                      onClick={handleResultClick}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-[#f0fafb] transition-colors group"
                    >
                      <span className="mt-0.5 shrink-0 text-[#9ca3af] group-hover:text-[#2299AA]">
                        {r.type === "Artykuł" ? (
                          <FileText className="w-4 h-4" />
                        ) : (
                          <Globe className="w-4 h-4" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#111827] group-hover:text-[#1c435e] leading-snug line-clamp-1">
                          {r.title}
                        </p>
                        {r.excerpt && (
                          <p className="text-xs text-[#6b7280] mt-0.5 line-clamp-1">
                            {r.excerpt}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-[#9ca3af] bg-[#f3f4f6] px-2 py-0.5 rounded-full self-start mt-0.5">
                        {r.type}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2.5 border-t border-[#f3f4f6] bg-[#f9fafb]">
                <button
                  onClick={handleSubmit as any}
                  className="text-xs text-[#2299AA] hover:underline font-medium"
                >
                  Zobacz wszystkie wyniki dla „{query}" →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
