import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  active?: boolean;
}

export function useTypewriter(
  phrases: readonly string[],
  { typingSpeed = 45, deletingSpeed = 25, pause = 1400, active = true }: UseTypewriterOptions = {},
): string {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!active) {
      setText(phrases[phrases.length - 1] ?? "");
      return;
    }

    const current = phrases[phraseIndex] ?? "";
    const isLastPhrase = phraseIndex === phrases.length - 1;

    if (!isDeleting && text === current) {
      if (isLastPhrase) return;
      const timeout = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const delay = isDeleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(() => {
      setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pause, active]);

  return text;
}
