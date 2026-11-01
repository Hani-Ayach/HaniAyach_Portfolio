import { useEffect, useRef } from "react";

// For sub-pages opened by client-side navigation: start at the top and move
// focus to the page heading so screen readers announce the new page.
// Put the returned ref on the page's <h1 tabIndex={-1}>.
export function usePageEntry(title, key = title) {
  const headingRef = useRef(null);
  useEffect(() => {
    document.title = title;
    window.scrollTo?.(0, 0);
    headingRef.current?.focus({ preventScroll: true });
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return headingRef;
}
