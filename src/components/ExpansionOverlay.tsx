import { X, ChevronDown } from 'lucide-react';
import type { CategoryPanel } from '@/types';
import ImageSlot from './ImageSlot';

interface ExpansionOverlayProps {
  panel: CategoryPanel;
  onClose: () => void;
  onEnlarge: (slot: number, kind: 'board' | 'thumb' | 'webm', filename: string, alt: string) => void;
}

function ExpansionOverlay({ panel, onClose, onEnlarge }: ExpansionOverlayProps) {
  const expansion = panel.expansion;
  if (!expansion) return null;

  return (
    <div className="section-expansion bg-gradient-to-b from-ocean-800/95 via-ocean-700/95 to-ocean-900/95 backdrop-blur-lg">
      {/* Close button */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-ocean-900/80 backdrop-blur-md">
        <h2 className="font-display text-2xl text-white text-shadow-soft">{expansion.title}</h2>
        <button
          className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
          onClick={onClose}
          aria-label="Close section"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="px-6 pb-24 max-w-3xl mx-auto">
        {/* ─── Text-only (left panels) ─── */}
        {panel.expansionType === 'text-only' && (
          <div className="expansion-snap min-h-dvh flex flex-col justify-center py-12">
            <div className="glass-card p-8 md:p-12">
              <p className="font-body text-lg md:text-xl text-white/90 leading-relaxed whitespace-pre-line">
                {expansion.bodyText}
              </p>
            </div>
          </div>
        )}

        {/* ─── Beach Dreams ─── */}
        {panel.expansionType === 'beach-dreams' && (
          <div className="expansion-snap min-h-dvh py-12">
            <p className="font-body text-lg text-white/80 mb-8 text-center max-w-xl mx-auto">
              {expansion.beachDreamsText}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {expansion.thumbnails?.map((thumb, i) => (
                <div
                  key={thumb.slot}
                  className="flex flex-col items-center"
                  style={{ marginTop: `${(i % 4) * 16}px` }}
                >
                  <ImageSlot
                    slot={thumb.slot}
                    kind="thumb"
                    filename={thumb.filename}
                    alt={thumb.alt}
                    className="w-full aspect-square rounded-2xl object-cover board-glow"
                  />
                  <p className="mt-2 text-white/70 text-xs text-center font-body">
                    [Slot {thumb.slot} — replace with description]
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Behind the Sunscreen ─── */}
        {panel.expansionType === 'behind-sunscreen' && (
          <div className="space-y-12 py-12">
            {expansion.steps?.map((step, i) => (
              <div key={step.slot} className="expansion-snap min-h-dvh flex flex-col justify-center">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-shrink-0">
                    <ImageSlot
                      slot={step.slot}
                      kind="board"
                      filename={step.filename}
                      alt={step.alt}
                      className="w-64 h-64 md:w-80 md:h-80 object-contain board-glow"
                    />
                  </div>
                  <div className="glass-card p-6 md:p-8 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full bg-sun-400 text-ocean-900 font-display font-bold flex items-center justify-center text-sm">
                        {i + 1}
                      </span>
                      <h3 className="font-display text-xl text-white">{step.title}</h3>
                    </div>
                    <p className="font-body text-white/85 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── Summer Postcards ─── */}
        {panel.expansionType === 'summer-postcards' && (
          <div className="py-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {expansion.boards?.map((board) => (
                <div key={board.slot} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => onEnlarge(board.slot, 'board', board.filename, board.name)}
                    aria-label={`View ${board.name} full size`}
                    className="block w-full rounded-2xl transition-transform hover:scale-[1.03] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ImageSlot
                      slot={board.slot}
                      kind="thumb"
                      filename={board.thumbFilename}
                      alt={board.name}
                      className="w-full aspect-square rounded-2xl object-cover board-glow"
                    />
                  </button>
                  <div className="mt-3 text-center">
                    <h3 className="font-display text-lg text-white">{board.name}</h3>
                    <p className="font-body text-sm text-white/70 mt-1">{board.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Add It Up ─── */}
        {panel.expansionType === 'add-it-up' && (
          <div className="expansion-snap min-h-dvh flex flex-col justify-center py-12 relative">
            {/* Decorative images (defined in data.ts → expansion.decorations) */}
            {expansion.decorations?.map((dec) => (
              <div
                key={dec.slot}
                className={`absolute ${dec.positionClass} ${dec.floatAnim ?? ''} opacity-80`}
                style={dec.zIndex !== undefined ? { zIndex: dec.zIndex } : undefined}
              >
                <ImageSlot
                  slot={dec.slot}
                  kind={dec.kind}
                  filename={dec.filename}
                  alt={dec.alt}
                  className={`${dec.sizeClass} object-contain`}
                />
              </div>
            ))}
            <div className="glass-card p-8 md:p-12 relative z-10">
              <p className="font-body text-base md:text-lg text-white/90 leading-relaxed whitespace-pre-line font-mono">
                {expansion.techText}
              </p>
            </div>
          </div>
        )}

        {/* ─── Featured Board ─── */}
        {panel.expansionType === 'featured-board' && expansion.featured && (
          <div className="expansion-snap min-h-dvh flex flex-col items-center justify-center py-12 gap-8">
            <ImageSlot
              slot={expansion.featured.slot}
              kind="webm"
              filename={expansion.featured.filename}
              alt={expansion.featured.name}
              className="w-full max-w-2xl aspect-[3/1] object-contain board-glow"
            />
            <div className="glass-card p-6 md:p-8 max-w-2xl">
              <h3 className="font-display text-2xl text-white mb-3">{expansion.featured.name}</h3>
              <p className="font-body text-white/85 leading-relaxed">{expansion.featured.description}</p>
            </div>
          </div>
        )}

        {/* Scroll hint */}
        <div className="expansion-snap flex items-center justify-center py-8">
          <ChevronDown className="w-6 h-6 text-white/40 animate-bounce" />
        </div>
      </div>
    </div>
  );
}

export default ExpansionOverlay;
