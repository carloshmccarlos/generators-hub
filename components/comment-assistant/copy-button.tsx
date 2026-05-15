"use client";

import { Copy, Check } from "lucide-react";
import { useCallback, useState } from "react";

interface CopyButtonProps {
  onClick: () => void;
  text?: string;
  variant?: "subtle" | "default";
}

export function CopyButton({ onClick, text = "Copy", variant = "default" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    onClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [onClick]);

  const baseClass =
    "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors";
  const variantClass =
    variant === "subtle"
      ? "border-border/40 bg-surface text-muted hover:border-brand hover:text-brand"
      : "border-border/60 bg-surface text-foreground hover:border-brand hover:text-brand";

  return (
    <button onClick={handleClick} className={`${baseClass} ${variantClass}`}>
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : text}
    </button>
  );
}
