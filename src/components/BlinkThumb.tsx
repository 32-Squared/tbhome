import { useRef } from 'react';
import type { DecorativeImage } from '@/types';
import { useRandomBlink } from '@/useRandomBlink';
import ImageSlot from './ImageSlot';

// A thumbnail whose picture blinks off briefly now and then (a "reverse blink": it is normally
// showing). The dotted frame and background are on the outer box and never blink.
function BlinkThumb({ dec }: { dec: DecorativeImage }) {
  const boxRef = useRef<HTMLDivElement>(null);
  useRandomBlink(boxRef);

  return (
    <div ref={boxRef} className={`${dec.sizeClass} blink-box board-glow${dec.framed ? ' thumb-frame' : ''}`}>
      <ImageSlot
        slot={dec.slot}
        kind={dec.kind}
        filename={dec.filename}
        alt={dec.alt}
        className="w-full h-full object-contain blink-img"
      />
    </div>
  );
}

export default BlinkThumb;
