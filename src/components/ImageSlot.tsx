import { useState, useEffect } from 'react';
import type { ImageKind } from '@/types';
import { assetUrl } from '@/assets';

interface ImageSlotProps {
  slot: number;
  kind: ImageKind;
  filename: string;
  alt: string;
  className?: string;
  /** Load right away instead of lazily (for images that are on screen at first paint) */
  eager?: boolean;
}

function ImageSlot({ slot, kind, filename, alt, className = '', eager = false }: ImageSlotProps) {
  const [hasError, setHasError] = useState(false);

  // Reset when filename changes
  useEffect(() => {
    setHasError(false);
  }, [filename]);

  const fullSrc = assetUrl(filename);

  const placeholder = (
    <div
      className={`slot-placeholder ${className}`}
      aria-label={`Slot ${slot} — ${alt} (upload ${filename})`}
    >
      <div className="text-center leading-tight">
        <div className="text-xs opacity-70">SLOT</div>
        <div className="text-2xl font-bold">{slot}</div>
        <div className="text-[10px] opacity-60 mt-1 break-all px-2">{filename}</div>
      </div>
    </div>
  );

  if (hasError) {
    return placeholder;
  }

  if (kind === 'webm') {
    return (
      <video
        src={fullSrc}
        className={className}
        autoPlay
        loop
        muted
        playsInline
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <img
      src={fullSrc}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      draggable={false}
    />
  );
}

export default ImageSlot;
