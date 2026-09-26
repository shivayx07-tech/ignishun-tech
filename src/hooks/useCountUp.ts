import { useEffect, useRef, useState } from "react";

type EaseFn = (t: number) => number;

const easeOutQuart: EaseFn = (t) => 1 - Math.pow(1 - t, 4);

/**
 * Parses a display string like "+212%", "-30%", "98%", "4/4", "$14,048", "12.8K"
 * into its numeric target, prefix, suffix, and fraction digits.
 */
export function parseMetricValue(raw: string): {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  denominator: string; // for "4/4" style
} {
  // Fraction pattern: "4/4"
  const fractionMatch = raw.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    return {
      prefix: "",
      suffix: `/${fractionMatch[2]}`,
      target: parseInt(fractionMatch[1], 10),
      decimals: 0,
      denominator: fractionMatch[2],
    };
  }

  // Extract prefix chars (e.g. "+", "-", "$")
  const prefixMatch = raw.match(/^([+\-$]*)/);
  const prefix = prefixMatch ? prefixMatch[1] : "";

  // Extract suffix chars (e.g. "%", "K", "M")
  const suffixMatch = raw.match(/([%KMkm]+)$/);
  const suffix = suffixMatch ? suffixMatch[1] : "";

  // Extract numeric portion
  const numStr = raw.replace(prefix, "").replace(suffix, "").replace(/,/g, "");
  const num = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  return { prefix, suffix, target: num, decimals, denominator: "" };
}

/**
 * Hook: given a raw metric string like "+212%", returns a live animated string
 * that counts up from 0 → target over `duration` ms with easeOutQuart.
 */
export function useCountUp(
  raw: string,
  duration = 1200,
  delay = 0
): string {
  const { prefix, suffix, target, decimals } = parseMetricValue(raw);
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const startAnimation = () => {
      const animate = (timestamp: number) => {
        if (!mountedRef.current) return;
        if (startRef.current === null) startRef.current = timestamp;

        const elapsed = timestamp - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const current = eased * Math.abs(target);

        setDisplay(current.toFixed(decimals));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setDisplay(Math.abs(target).toFixed(decimals));
        }
      };

      startRef.current = null;
      rafRef.current = requestAnimationFrame(animate);
    };

    const timer = delay > 0 ? setTimeout(startAnimation, delay) : null;
    if (!timer) startAnimation();

    return () => {
      mountedRef.current = false;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (timer !== null) clearTimeout(timer);
    };
  }, [raw, duration, delay, target, decimals]);

  // Reconstruct the display string with prefix & suffix
  const isNegative = prefix.includes("-");
  const sign = isNegative ? "-" : prefix.startsWith("+") ? "+" : prefix;
  return `${sign}${display}${suffix}`;
}
