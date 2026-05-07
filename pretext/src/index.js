import { prepare, layout } from '@chenglou/pretext';

const prepared = prepare('AGI 春天到了. بدأت الرحلة 🚀‎', '16px Inter');
const { height, lineCount } = layout(prepared, 320, 20); // pure arithmetic. No DOM layout & reflow!

console.log(height); // total height in pixels
console.log(lineCount); // number of lines
