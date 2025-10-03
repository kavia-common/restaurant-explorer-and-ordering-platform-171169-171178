"use client";

import { useId } from "react";

export function SidebarFilters(props: {
  allCuisines: string[];
  selectedCuisines: string[];
  onCuisineChange: (v: string[]) => void;
  query: string;
  onQueryChange: (v: string) => void;
  rating: number;
  onRatingChange: (v: number) => void;
  priceLevel: number | null;
  onPriceChange: (v: number | null) => void;
}) {
  const id = useId();
  const toggleCuisine = (c: string) => {
    if (props.selectedCuisines.includes(c)) {
      props.onCuisineChange(props.selectedCuisines.filter((x) => x !== c));
    } else {
      props.onCuisineChange([...props.selectedCuisines, c]);
    }
  };

  return (
    <div className="card p-4 space-y-4">
      <div>
        <label htmlFor={`${id}-search`} className="text-sm font-medium">
          Search
        </label>
        <input
          id={`${id}-search`}
          placeholder="Search by name or cuisine"
          className="input mt-1"
          value={props.query}
          onChange={(e) => props.onQueryChange(e.target.value)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Cuisines</span>
          <button
            className="text-xs text-[var(--color-primary)]"
            onClick={() => props.onCuisineChange([])}
          >
            Clear
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {props.allCuisines.map((c) => {
            const selected = props.selectedCuisines.includes(c);
            return (
              <button
                key={c}
                className={`badge ${selected ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-blue-50" : ""}`}
                onClick={() => toggleCuisine(c)}
              >
                {c}
              </button>
            );
          })}
          {props.allCuisines.length === 0 && (
            <span className="text-xs text-gray-500">No cuisines</span>
          )}
        </div>
      </div>

      <div>
        <span className="text-sm font-medium">Rating</span>
        <div className="mt-2 flex gap-2">
          {[0, 3.5, 4.0, 4.5].map((r) => (
            <button
              key={r}
              className={`btn ${props.rating === r ? "btn-primary" : "btn-ghost border border-gray-200"}`}
              onClick={() => props.onRatingChange(r)}
            >
              {r === 0 ? "Any" : `≥ ${r}★`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-sm font-medium">Price</span>
        <div className="mt-2 flex gap-2">
          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              className={`btn ${props.priceLevel === p ? "btn-secondary" : "btn-ghost border border-gray-200"}`}
              onClick={() => props.onPriceChange(props.priceLevel === p ? null : p)}
            >
              {"$".repeat(p)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
