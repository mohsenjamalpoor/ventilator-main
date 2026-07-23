function stripLeadingMove(d) {
  return d.replace(/^\s*M\s*[-\d.]+\s*,\s*[-\d.]+/, "");
}

export function WaveChart({ item, variant, scenarioKey }) {
  const isLeakOpen = item.isLoop && scenarioKey === "leak";

  return (
    <div
      className="relative overflow-hidden rounded-2xl border"
      style={{
        borderColor: `${item.color}33`,
        background:
          "radial-gradient(120% 120% at 50% 0%, #0B1220 0%, #060910 70%)",
        boxShadow: `0 0 60px -20px ${item.color}55 inset`,
      }}
    >
      <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: item.color }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
        </span>
        <span className="font-mono text-[10px] tracking-widest text-slate-300">
          LIVE
        </span>
      </div>

      <div className="p-6 pb-4" dir="ltr">
        <svg
          viewBox={item.viewBox}
          className="h-64 w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="scope-grid"
              width="30"
              height="22"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 0 L0 0 0 22"
                fill="none"
                stroke="rgba(148,163,184,0.10)"
                strokeWidth="1"
              />
            </pattern>
            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {!item.isLoop && (
              <path id={`cycle-${item.id}`} d={variant.path} fill="none" />
            )}
          </defs>

          <rect width="100%" height="100%" fill="url(#scope-grid)" />

          {item.isLoop ? (
            <>
              <line
                x1="30"
                y1="150"
                x2="272"
                y2="150"
                stroke="rgba(148,163,184,0.25)"
                strokeDasharray="3 5"
              />
              <line
                x1="150"
                y1="30"
                x2="150"
                y2="270"
                stroke="rgba(148,163,184,0.25)"
                strokeDasharray="3 5"
              />
            </>
          ) : (
            <line
              x1="0"
              y1={item.baselineY}
              x2="600"
              y2={item.baselineY}
              stroke="rgba(148,163,184,0.18)"
            />
          )}

          {item.isLoop ? (
            <g>
              <path
                d={variant.expPath}
                fill="none"
                stroke={item.color}
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
                className="loop-draw"
              />
              <path
                d={variant.inspPath}
                fill="none"
                stroke={item.color}
                strokeOpacity="0.55"
                strokeWidth="3"
                strokeDasharray="2 6"
                strokeLinecap="round"
                className="loop-draw"
              />
              {isLeakOpen && (
                <circle
                  cx={variant.inspPath.match(/M([-\d.]+),/)[1]}
                  cy={variant.inspPath.match(/M[-\d.]+,([-\d.]+)/)[1]}
                  r="4"
                  fill="#F87171"
                  opacity="0.9"
                />
              )}

              <circle r="5" fill={item.color} filter="url(#glow)">
                <animateMotion
                  dur="2.4s"
                  repeatCount="indefinite"
                  path={`${variant.inspPath} ${stripLeadingMove(variant.expPath)}`}
                />
              </circle>
            </g>
          ) : (
            <g
              className="scroll-group"
              style={{ "--cw": `${item.cycleWidth}px` }}
            >
              <use
                href={`#cycle-${item.id}`}
                x="0"
                stroke={item.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />
              <use
                href={`#cycle-${item.id}`}
                x={item.cycleWidth}
                stroke={item.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />
              <use
                href={`#cycle-${item.id}`}
                x={item.cycleWidth * 2}
                stroke={item.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />
            </g>
          )}
        </svg>
      </div>

      <div
        className="flex items-center justify-between border-t px-6 py-3 text-xs text-slate-400"
        style={{ borderColor: `${item.color}22` }}
      >
        <span>{item.xAxisLabel}</span>
        {item.isLoop ? (
          <div className="flex items-center gap-4 font-normal">
            <span className="flex items-center gap-1.5">
              <span
                className="h-[2px] w-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              بازدم
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="h-[2px] w-4 rounded-full opacity-50"
                style={{
                  backgroundColor: item.color,
                  backgroundImage: `repeating-linear-gradient(90deg, ${item.color} 0 4px, transparent 4px 8px)`,
                }}
              />
              دم
            </span>
          </div>
        ) : null}
        <span>{item.yAxisLabel}</span>
      </div>

      <style>{`
        .loop-draw {
          stroke-dasharray: 700;
          stroke-dashoffset: 700;
          animation: draw-in 1.1s ease-out forwards;
        }
        @keyframes draw-in {
          to { stroke-dashoffset: 0; }
        }
        .scroll-group {
          animation: scroll-left 2.6s linear infinite;
        }
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(calc(var(--cw) * -1)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .loop-draw { animation: none; stroke-dashoffset: 0; }
          .scroll-group { animation: none; }
        }
      `}</style>
    </div>
  );
}
