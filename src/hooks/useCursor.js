import { useEffect } from 'react';

export default function useCursor() {
  useEffect(() => {
    // Encode SVGs as data URIs
    const defaultCursor = `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.32935 1.73767C1.96266 1.61648 1.61927 1.96576 1.74146 2.32751L1.74243 2.33044L5.61646 13.9633C5.76121 14.3947 6.35075 14.3875 6.49634 13.9808L6.49731 13.9789L8.39478 8.73865L8.4856 8.48767L8.73755 8.39587L13.9768 6.49939L13.9788 6.49841L14.051 6.46619C14.3863 6.2804 14.3644 5.75399 13.968 5.61853L2.32837 1.73865L2.32935 1.73767Z' fill='white' stroke='black' stroke-width='1.14286'/%3E%3C/svg%3E") 0 0, auto`;

    const clickCursor = `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.75 0.5C5.64542 0.5 4.75 1.39543 4.75 2.5V7.6492L4.26533 7.51995C2.99563 7.18137 1.75 8.13835 1.75 9.45243V10C1.75 10.1672 1.83355 10.3233 1.97265 10.416L4.72073 12.2481C4.77765 12.286 4.8369 12.3199 4.898 12.3496C4.80315 12.5463 4.75 12.7669 4.75 13V14C4.75 14.8284 5.42158 15.5 6.25 15.5H12.75C13.5784 15.5 14.25 14.8284 14.25 14V13C14.25 12.6158 14.1056 12.2654 13.868 12C14.1056 11.7346 14.25 11.3842 14.25 11V7.77222C14.25 6.50785 13.306 5.44253 12.0508 5.29038L8.75 4.89028V2.5C8.75 1.39543 7.85458 0.5 6.75 0.5ZM12.75 11.5C13.0261 11.5 13.25 11.2761 13.25 11V7.77222C13.25 7.0136 12.6836 6.3744 11.9305 6.28312L8.18983 5.8297C7.9388 5.79927 7.75 5.5862 7.75 5.33332V2.5C7.75 1.94771 7.30228 1.5 6.75 1.5C6.19772 1.5 5.75 1.94771 5.75 2.5V8.3C5.75 8.45535 5.6778 8.60185 5.55463 8.6965C5.43143 8.79112 5.27127 8.82315 5.12117 8.78312L4.00768 8.48617C3.37283 8.3169 2.75 8.79537 2.75 9.45243V9.7324L5.27542 11.416C5.35755 11.4708 5.45407 11.5 5.55277 11.5H12.75ZM6.25 12.5C5.97385 12.5 5.75 12.7239 5.75 13V14C5.75 14.2761 5.97385 14.5 6.25 14.5H12.75C13.0261 14.5 13.25 14.2761 13.25 14V13C13.25 12.7239 13.0261 12.5 12.75 12.5H6.25Z' fill='black'/%3E%3Cpath d='M6.25 12.5C5.97385 12.5 5.75 12.7239 5.75 13V14C5.75 14.2761 5.97385 14.5 6.25 14.5H12.75C13.0261 14.5 13.25 14.2761 13.25 14V13C13.25 12.7239 13.0261 12.5 12.75 12.5H6.25Z' fill='white'/%3E%3Cpath d='M12.75 11.5C13.0261 11.5 13.25 11.2761 13.25 11V7.77222C13.25 7.0136 12.6836 6.3744 11.9305 6.28312L8.18983 5.8297C7.9388 5.79927 7.75 5.5862 7.75 5.33332V2.5C7.75 1.94771 7.30228 1.5 6.75 1.5C6.19772 1.5 5.75 1.94771 5.75 2.5V8.3C5.75 8.45535 5.6778 8.60185 5.55463 8.6965C5.43143 8.79112 5.27127 8.82315 5.12117 8.78312L4.00768 8.48617C3.37283 8.3169 2.75 8.79537 2.75 9.45243V9.7324L5.27542 11.416C5.35755 11.4708 5.45407 11.5 5.55277 11.5H12.75Z' fill='white'/%3E%3C/svg%3E") 2 0, pointer`;

    // Apply default cursor globally
    document.documentElement.style.cursor = defaultCursor;

    // Clickable element selectors
    const CLICKABLE = 'button, a, [role="button"], input, select, textarea, label, [tabindex]';

    const applyClickCursor = (e) => (e.target.style.cursor = clickCursor);
    const removeClickCursor = (e) => (e.target.style.cursor = '');

    // Use event delegation on document
    const onOver = (e) => {
      if (e.target.matches(CLICKABLE) || e.target.closest(CLICKABLE)) {
        document.documentElement.style.cursor = clickCursor;
      } else {
        document.documentElement.style.cursor = defaultCursor;
      }
    };

    document.addEventListener('mouseover', onOver);

    return () => {
      document.removeEventListener('mouseover', onOver);
      document.documentElement.style.cursor = '';
    };
  }, []);
}