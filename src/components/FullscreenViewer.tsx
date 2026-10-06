import { X } from 'lucide-react';
import type { ImageKind } from '@/types';
import ImageSlot from './ImageSlot';

interface FullscreenViewerProps {
  slot: number;
  kind: ImageKind;
  filename: string;
  alt: string;
  onClose: () => void;
}

function FullscreenViewer({ slot, kind, filename, alt, onClose }: FullscreenViewerProps) {
  return (
    <div className="fullscreen-viewer" onClick={onClose}>
      <button
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
        onClick={onClose}
        aria-label="Close fullscreen view"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="w-full max-w-5xl max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <ImageSlot
          slot={slot}
          kind={kind}
          filename={filename}
          alt={alt}
          className={
            kind === 'webm'
              ? 'max-w-full max-h-[85dvh] object-contain'
              : 'h-[80dvh] w-auto max-w-full aspect-[1/3] object-contain'
          }
        />
        <p className="mt-4 text-white/80 text-sm font-body">
          Slot {slot} — {alt}
        </p>
      </div>
    </div>
  );
}

export default FullscreenViewer;
