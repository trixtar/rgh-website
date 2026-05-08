import { RefObject, useEffect, useRef } from 'react';

interface UseAccessibleModalProps {
  isOpen: boolean;
  dialogRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onClose: () => void;
};

export function useAccessibleModal({
  isOpen,
  dialogRef,
  initialFocusRef,
  onClose,
}: UseAccessibleModalProps) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const scrollY = window.scrollY;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    const trapFocus = (e: KeyboardEvent) => {
      const modal = dialogRef.current;
      if (!modal) return;

      const focusableElements = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => el.offsetParent !== null);

      if (!focusableElements.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      const active = document.activeElement as HTMLElement;

      if (!modal.contains(active)) return;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Tab') {
        trapFocus(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    initialFocusRef?.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      window.scrollTo(0, scrollY);

      if (
        previousFocusRef.current &&
        document.contains(previousFocusRef.current)
      ) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, dialogRef, initialFocusRef, onClose]);
}