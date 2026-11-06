import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { List, ChevronRight, X } from 'lucide-react';

export interface ReadingChapter {
  id: string;
  number: string;
  label: string;
}

const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 240,
  damping: 28,
  mass: 0.9
};

export function FloatingReadingIndex({
  chapters,
  activeId,
  onSelectChapter,
  title = "Índice da Página"
}: {
  chapters: ReadingChapter[];
  activeId?: string;
  onSelectChapter?: (id: string) => void;
  title?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleJump = (id: string) => {
    if (onSelectChapter) {
      onSelectChapter(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Floating Crystal Rail */}
      <aside 
        aria-label={title}
        className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-1 crystal-pill p-3.5 max-w-[215px] rounded-2xl"
      >
        <div className="px-2 pb-2 mb-1 border-b border-vinho/10 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-vinho">
            {title}
          </span>
          <span className="text-[10px] font-mono tabular-nums text-charcoal/45">
            {chapters.length} cap.
          </span>
        </div>
        {chapters.map((chapter) => {
          const isActive = activeId === chapter.id;
          return (
            <button
              key={chapter.id}
              onClick={() => handleJump(chapter.id)}
              className={`relative group flex items-center gap-2.5 text-left px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                isActive
                  ? 'text-white font-semibold'
                  : 'text-charcoal/75 hover:text-vinho hover:bg-vinho/5'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="floatingIndexActivePill"
                  transition={SPRING_TRANSITION}
                  className="absolute inset-0 rounded-xl bg-vinho shadow-sm"
                />
              )}
              <span
                className={`relative z-10 font-mono text-[10px] tabular-nums shrink-0 ${
                  isActive ? 'text-[#C0A080]' : 'text-vinho/50 group-hover:text-vinho'
                }`}
              >
                {chapter.number}
              </span>
              <span className="relative z-10 truncate leading-snug">{chapter.label}</span>
            </button>
          );
        })}
      </aside>

      {/* Mobile / Tablet Compact Crystal Trigger */}
      <div className="xl:hidden fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2.5 crystal-dark text-[#FBF9F5] border border-[#C0A080]/40 px-4 py-3 rounded-full shadow-xl text-xs uppercase tracking-[0.18em] font-bold cursor-pointer"
        >
          {mobileOpen ? <X size={15} className="text-[#C0A080]" /> : <List size={15} className="text-[#C0A080]" />}
          <span>Sumário</span>
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={SPRING_TRANSITION}
              className="absolute bottom-14 left-0 w-72 crystal-pill rounded-2xl p-4 space-y-1.5"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-vinho/10">
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-vinho">
                  {title}
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-charcoal/50 hover:text-charcoal p-1"
                >
                  <X size={14} />
                </button>
              </div>
              {chapters.map((chapter) => {
                const isActive = activeId === chapter.id;
                return (
                  <button
                    key={chapter.id}
                    onClick={() => handleJump(chapter.id)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left text-xs transition-colors ${
                      isActive
                        ? 'bg-vinho text-white font-semibold'
                        : 'text-charcoal/80 hover:bg-vinho/5 hover:text-vinho'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <span className={`font-mono text-[10px] tabular-nums ${isActive ? 'text-[#C0A080]' : 'text-vinho/50'}`}>
                        {chapter.number}
                      </span>
                      <span className="truncate">{chapter.label}</span>
                    </span>
                    <ChevronRight size={14} className="shrink-0 opacity-50" />
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
