const paths: Record<string, string> = {
  economy: "M4 19V5m0 14h16M7 14l5-5 4 3 5-8m-5 0h5v5",
  employment: "M9 6V3h6v3M3 7h18v13H3zM3 12h18m-11 0v3h4v-3",
  democracy: "M12 3v18M5 21h14M4 7h16M6 7l-4 8h8L6 7zm12 0-4 8h8l-4-8",
  education: "M2 8l10-5 10 5-10 5L2 8zm4 3v7l6 3 6-3v-7m4-3v9",
  digital: "M8 3h8v18H8zM11 17h2M4 7H1m22 0h-3M4 12H1m22 0h-3",
};
export function ResearchIcon({ category }: { category: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[category] || paths.economy} />
    </svg>
  );
}
export function ExternalArrow() {
  return (
    <svg
      className="external-arrow"
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M3 13 13 3M4 3h9v9" />
    </svg>
  );
}
