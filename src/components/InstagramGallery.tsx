"use client";

import { useState } from "react";

const images = [
  "instagram-one",
  "instagram-two",
  "instagram-three",
  "instagram-four",
  "instagram-five",
  "instagram-six",
];

export default function InstagramGallery() {
  const [page, setPage] = useState(0);
  const visibleImages = images.slice(page * 3, page * 3 + 3);

  return (
    <div className="instagram-carousel">
      <button
        className="instagram-arrow instagram-previous"
        type="button"
        aria-label="Previous Instagram images"
        onClick={() => setPage((current) => (current === 0 ? 1 : 0))}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m14 5-7 7 7 7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </button>
      <div className="instagram-grid">
        {visibleImages.map((image) => (
          <div className={`instagram-image ${image}`} key={image} />
        ))}
      </div>
      <button
        className="instagram-arrow instagram-next"
        type="button"
        aria-label="Next Instagram images"
        onClick={() => setPage((current) => (current === 0 ? 1 : 0))}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m10 5 7 7-7 7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}
