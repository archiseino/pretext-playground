import { useState } from 'react';
import TextBox from './Textbox';

const DEMO_TEXTS = [
  {
    label: 'Short',
    text: 'pretext gives you pixel-perfect text layout in the browser.',
  },
  {
    label: 'Medium',
    text: 'pretext computes line-breaks and text heights before the browser paints — so your layout never flashes or reflows. Resize this box and watch the line count update instantly.',
  },
  {
    label: 'Long',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    label: 'Dense',
    text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  },
];

export function App() {
  const [activeIdx, setActiveIdx] = useState(1);
  const [customText, setCustomText] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const displayText = showCustom
    ? customText || 'Start typing above…'
    : DEMO_TEXTS[activeIdx]!.text;

  return (
    <div className='app-shell'>
      {/* Header */}
      <header className='header'>
        <div className='header-inner'>
          <div className='logo-lockup'>
            <span className='logo-badge'>pre</span>
            <div className='logo-text'>
              <span className='logo-name'>pretext</span>
              <span className='logo-tagline'>pixel-perfect text layout</span>
            </div>
          </div>
          <a
            className='header-link'
            href='https://github.com/chenglou/pretext'
            target='_blank'
            rel='noreferrer'
          >
            github ↗
          </a>
        </div>
      </header>

      <main className='main'>
        {/* Hero */}
        <section className='hero'>
          <h1 className='hero-title'>Text that knows its own shape</h1>
          <p className='hero-sub'>
            <code>prepare()</code> + <code>layout()</code> — measure fonts,
            compute wraps, and get exact heights before the browser paints. No
            reflows. No flicker.
          </p>
        </section>

        {/* Live demo card */}
        <section className='demo-card'>
          <div className='demo-card-header'>
            <span className='demo-label'>Live demo</span>
            <span className='demo-hint'>↔ resize the box below</span>
          </div>

          {/* Preset buttons */}
          <div className='preset-row'>
            {DEMO_TEXTS.map((d, i) => (
              <button
                key={d.label}
                className={`preset-btn${activeIdx === i && !showCustom ? ' active' : ''}`}
                onClick={() => {
                  setActiveIdx(i);
                  setShowCustom(false);
                }}
              >
                {d.label}
              </button>
            ))}
            <button
              className={`preset-btn${showCustom ? ' active' : ''}`}
              onClick={() => setShowCustom(true)}
            >
              Custom
            </button>
          </div>

          {/* Custom textarea */}
          {showCustom && (
            <textarea
              className='custom-input'
              placeholder='Type anything…'
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={3}
            />
          )}

          {/* Resizable TextBox wrapper */}
          <div className='resize-shell'>
            <div className='resize-label'>TextBox</div>
            <div className='resize-inner'>
              <TextBox text={displayText} />
            </div>
            <div className='resize-handle-hint'>⟷ drag right edge</div>
          </div>
        </section>

        {/* How it works */}
        <section className='how'>
          <h2 className='how-title'>How it works</h2>
          <div className='steps'>
            <div className='step'>
              <span className='step-num'>01</span>
              <div>
                <strong>prepare(text, font)</strong>
                <p>
                  Measures each word's advance width using an offscreen canvas —
                  once, not on every resize.
                </p>
              </div>
            </div>
            <div className='step'>
              <span className='step-num'>02</span>
              <div>
                <strong>layout(prepared, containerWidth, lineHeight)</strong>
                <p>
                  Runs a greedy wrap algorithm in JS to return{' '}
                  <code>height</code> and <code>lineCount</code> synchronously.
                </p>
              </div>
            </div>
            <div className='step'>
              <span className='step-num'>03</span>
              <div>
                <strong>ResizeObserver</strong>
                <p>
                  Re-runs <code>layout()</code> whenever the container width
                  changes — zero DOM reads during paint.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Code snippet */}
        <section className='snippet-section'>
          <h2 className='how-title'>Usage</h2>
          <pre className='snippet'>{`import { prepare, layout } from '@chenglou/pretext';

const prepared = prepare(text, '14px JetBrains Mono');
const { height, lineCount } = layout(prepared, width, 24);`}</pre>
        </section>
      </main>

      <footer className='footer'>
        <span>@chenglou/pretext · MIT license</span>
      </footer>
    </div>
  );
}

export default App;
