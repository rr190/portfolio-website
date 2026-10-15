// Inline SVG diagrams for case studies. They draw with currentColor and the
// CSS colour tokens, so they follow the page's palette.

const arrowMarker = (id: string) => `
  <defs>
    <marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5"
      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
    </marker>
  </defs>
`

const box = (x: number, y: number, w: number, h: number, title: string, sub: string) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="currentColor" />
  <text x="${x + 14}" y="${y + 32}" font-size="17" fill="currentColor">${title}</text>
  <text x="${x + 14}" y="${y + 56}" font-size="12" fill="var(--muted)">${sub}</text>
`

// Self-play → replay buffer → train → arena, looping back when the new net wins
export const alphaZeroLoop = `
<svg viewBox="0 0 880 270" role="img" aria-label="AlphaZero training loop: self-play, replay buffer, train, arena, then back to self-play with the new best network">
  ${arrowMarker('az-loop-arrow')}
  <g font-family="inherit">
    ${box(20, 50, 165, 80, 'Self-play', 'MCTS + best network')}
    ${box(245, 50, 165, 80, 'Replay buffer', 'position, π, outcome')}
    ${box(470, 50, 165, 80, 'Train', 'policy + value loss')}
    ${box(695, 50, 165, 80, 'Arena', 'new net vs best')}

    <g stroke="currentColor" fill="none" marker-end="url(#az-loop-arrow)">
      <path d="M185 90 H243" />
      <path d="M410 90 H468" />
      <path d="M635 90 H693" />
      <path d="M777 130 V200 H102 V132" />
    </g>

    <text x="440" y="228" font-size="13" fill="var(--muted)" text-anchor="middle">
      promoted to best only if it wins the arena match
    </text>
  </g>
</svg>
`

// Input planes → conv → residual tower → policy and value heads
export const alphaZeroNetwork = `
<svg viewBox="0 0 880 300" role="img" aria-label="Network: 3 by 6 by 7 input, 3 by 3 convolution with 64 filters, four residual blocks, then a policy head giving 7 column probabilities and a value head giving a score between minus one and one">
  ${arrowMarker('az-net-arrow')}
  <g font-family="inherit">
    ${box(20, 110, 130, 80, 'Input', '3 × 6 × 7')}
    ${box(190, 110, 130, 80, 'Conv 3×3', '64 filters')}
    ${box(360, 110, 150, 80, 'Residual × 4', '64 × 6 × 7')}
    ${box(570, 30, 140, 80, 'Policy head', 'FC → softmax')}
    ${box(570, 190, 140, 80, 'Value head', 'FC → tanh')}

    <g stroke="currentColor" fill="none" marker-end="url(#az-net-arrow)">
      <path d="M150 150 H188" />
      <path d="M320 150 H358" />
      <path d="M510 150 H540 V70 H568" />
      <path d="M510 150 H540 V230 H568" />
      <path d="M710 70 H733" />
      <path d="M710 230 H733" />
    </g>

    <text x="742" y="75" font-size="15" fill="currentColor">7 column probs</text>
    <text x="742" y="235" font-size="15" fill="currentColor">v ∈ [−1, 1]</text>
  </g>
</svg>
`
