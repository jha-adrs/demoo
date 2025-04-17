import * as React from "react"

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'center' | 'right';
}

export function Dialog({ isOpen, onClose, title, children, position = 'center' }: DialogProps) {
  if (!isOpen) return null;

  // Close dialog when clicking escape key
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Animation classes based on position
  const containerClasses = position === 'right' 
    ? "fixed inset-0 z-50 bg-black/60 flex justify-end"
    : "fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 sm:p-8";

  const dialogClasses = position === 'right'
    ? "bg-white dark:bg-zinc-800 shadow-xl w-full max-w-sm h-full animate-slide-in-right"
    : "bg-white dark:bg-zinc-800 rounded-xl shadow-xl w-full max-w-4xl overflow-hidden animate-fade-in";

  return (
    <div 
      className={containerClasses}
      onClick={onClose}
    >
      <div 
        className={dialogClasses}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 p-5">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className={
          position === 'right'
          ? "p-6 overflow-y-auto flex-1"
          : "p-6 overflow-y-auto max-h-[calc(85vh-8rem)] lg:max-h-[calc(90vh-8rem)]"
        }>
          {children}
        </div>
      </div>
    </div>
  )
}
