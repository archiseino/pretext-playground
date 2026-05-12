import { prepare, layout } from '@chenglou/pretext';
import { useState, useMemo, useRef, useEffect } from 'react';

const FONT = '14px Jetbrains Mono';
const LINE_HEIGHT = 24;

const TextBox = ({ text }: { text: string }) => {
  const [width, setWidth] = useState(300);
  const ref = useRef<HTMLDivElement>(null);

  // Prep the text
  const prepared = useMemo(() => prepare(text, FONT), [text]);
  const { height, lineCount } = useMemo(
    () => layout(prepared, width, LINE_HEIGHT),
    [prepared, width],
  );

  // Jadi, urutannya adalah:React me-render komponen (kembalikan JSX).
  // React membuat elemen fisik di browser.
  // React mengisi ref.current dengan elemen tersebut.useEffect dijalankan.
  // (Sekarang ref.current sudah punya isi).
  useEffect(() => {
    if (!ref.current) return; //
    const ro = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setWidth(entry.contentRect.width);
    });
    ro.observe(ref.current);
    return () => {
      ro.disconnect();
    };
  }, [ref.current]);

  return (
    <div ref={ref}>
      <div
        style={{
          height,
          overflow: 'hidden',
          color: 'white',
        }}
      >
        {text}
      </div>
      {lineCount > 3 && <button>Read more</button>}
    </div>
  );
};

export default TextBox;
