import type { ReactNode } from "react";

export type FoodKind =
  | "pizza"
  | "burger"
  | "tacos"
  | "fries"
  | "juice"
  | "orange"
  | "avocado"
  | "tajine"
  | "leaf"
  | "chili";

const seeds: [number, number, number][] = [
  [70, 56, -20],
  [100, 50, 10],
  [130, 58, 25],
  [84, 70, 40],
  [118, 72, -30],
];

const art: Record<FoodKind, () => ReactNode> = {
  pizza: () => (
    <g>
      <circle cx="100" cy="100" r="94" fill="#c98428" />
      <circle cx="100" cy="100" r="86" fill="#e2a03a" />
      <circle cx="100" cy="100" r="78" fill="#c23a22" />
      <circle cx="100" cy="100" r="73" fill="#f4d27c" />
      {[0, 60, 120].map((a) => (
        <path key={a} d="M100 100 V28" stroke="#c98428" strokeWidth="1.6" opacity=".45" transform={`rotate(${a} 100 100)`} />
      ))}
      {[
        [70, 70],
        [126, 64],
        [144, 110],
        [104, 138],
        [60, 116],
        [100, 98],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="13" fill="#b3281a" />
          <circle cx={x - 3} cy={y - 3} r="3" fill="#d9573c" />
          <circle cx={x + 4} cy={y + 3} r="2" fill="#8c1e12" />
        </g>
      ))}
      {[
        [86, 84, 20],
        [118, 120, 160],
        [52, 92, 200],
      ].map(([x, y, r]) => (
        <path
          key={`${x}${y}`}
          d="M0 0 C6 -9 18 -9 24 0 C18 9 6 9 0 0Z"
          fill="#4f7d2a"
          transform={`translate(${x} ${y}) rotate(${r})`}
        />
      ))}
    </g>
  ),
  burger: () => (
    <g>
      <path d="M28 142 H172 V150 Q172 172 150 172 H50 Q28 172 28 150Z" fill="#c98428" />
      <rect x="22" y="118" width="156" height="26" rx="13" fill="#4a2a1b" />
      <path d="M30 112 H170 L156 130 L138 114 L118 134 L100 114 L82 134 L62 114 L44 130Z" fill="#f2b92c" />
      <rect x="30" y="100" width="140" height="14" rx="7" fill="#c43a22" />
      <path d="M16 98 q9 -13 18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 t18 0 V106 H16Z" fill="#6e9a3a" />
      <path d="M24 92 C24 34 176 34 176 92 Z" fill="#dc9a3a" />
      <path d="M40 66 C56 46 100 40 130 46" stroke="#f0bc6a" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".7" />
      {seeds.map(([x, y, r]) => (
        <ellipse key={x} cx={x} cy={y} rx="6" ry="3" fill="#f3ead2" transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </g>
  ),
  tacos: () => (
    <g transform="rotate(-14 100 100)">
      <rect x="22" y="62" width="144" height="76" rx="38" fill="#e7c486" />
      {[56, 84, 112, 140].map((x) => (
        <path key={x} d={`M${x} 70 q7 30 0 60`} stroke="#b9772e" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".55" />
      ))}
      <ellipse cx="164" cy="100" rx="20" ry="38" fill="#d2a05a" />
      <ellipse cx="164" cy="100" rx="14" ry="30" fill="#4a2a1b" />
      {[84, 92, 100, 108].map((y, i) => (
        <rect key={y} x={152 + (i % 2) * 6} y={y - 6} width="5" height="20" rx="2" fill="#f2c94c" transform={`rotate(${i * 12 - 18} 164 100)`} />
      ))}
      <circle cx="165" cy="86" r="5" fill="#f2b92c" />
      <circle cx="166" cy="114" r="5" fill="#6e9a3a" />
      <circle cx="160" cy="100" r="4" fill="#c43a22" />
    </g>
  ),
  fries: () => (
    <g>
      {[60, 72, 84, 96, 108, 120, 132, 144].map((x, i) => (
        <rect key={x} x={x} y={26 + ((i * 17) % 34)} width="10" height="84" rx="3" fill="#f0c24a" transform={`rotate(${(i - 4) * 4} ${x + 5} 110)`} />
      ))}
      <path d="M46 100 H154 L142 184 H58Z" fill="#b8371f" />
      <path d="M50 124 H150 L147 144 H53Z" fill="#f3ead2" opacity=".9" />
      <path d="M44 100 H156" stroke="#8f2514" strokeWidth="6" strokeLinecap="round" />
    </g>
  ),
  juice: () => (
    <g>
      <path d="M118 78 L150 8" stroke="#b8371f" strokeWidth="8" strokeLinecap="round" />
      <path d="M52 40 H148 L136 176 Q135 186 124 186 H76 Q65 186 64 176Z" fill="#f3ead2" opacity=".2" />
      <path d="M56 80 H144 L136 176 Q135 186 124 186 H76 Q65 186 64 176Z" fill="#f29a1f" />
      <ellipse cx="100" cy="80" rx="44" ry="6" fill="#f7b64a" />
      <rect x="76" y="108" width="18" height="18" rx="4" fill="#fff" opacity=".28" transform="rotate(12 85 117)" />
      <rect x="104" y="132" width="16" height="16" rx="4" fill="#fff" opacity=".22" transform="rotate(-10 112 140)" />
      <path d="M52 40 H148 L136 176 Q135 186 124 186 H76 Q65 186 64 176Z" fill="none" stroke="#f3ead2" strokeWidth="3.5" strokeLinejoin="round" />
      <g transform="translate(150 46)">
        <circle r="24" fill="#f08a1c" />
        <circle r="19" fill="#fbe6b0" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d="M0 0 L0 -17" stroke="#f08a1c" strokeWidth="2" transform={`rotate(${i * 45})`} />
        ))}
      </g>
    </g>
  ),
  orange: () => (
    <g>
      <circle cx="100" cy="100" r="94" fill="#f08a1c" />
      <circle cx="100" cy="100" r="84" fill="#fbe6b0" />
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={i} d="M100 100 L100 30 A70 70 0 0 1 138.5 41.5Z" fill="#f6a623" transform={`rotate(${i * 40} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="6" fill="#fbe6b0" />
    </g>
  ),
  avocado: () => (
    <g transform="rotate(-22 100 100)">
      <path d="M100 12 C152 12 178 70 172 122 C166 172 134 190 100 190 C66 190 34 172 28 122 C22 70 48 12 100 12Z" fill="#2f4f1f" />
      <path d="M100 12 C152 12 178 70 172 122 C166 172 134 190 100 190 C66 190 34 172 28 122 C22 70 48 12 100 12Z" fill="#b9d36a" transform="translate(100 101) scale(.9) translate(-100 -101)" />
      <path d="M100 12 C152 12 178 70 172 122 C166 172 134 190 100 190 C66 190 34 172 28 122 C22 70 48 12 100 12Z" fill="#dbe88c" transform="translate(100 101) scale(.72) translate(-100 -101)" />
      <circle cx="100" cy="126" r="32" fill="#7a4a26" />
      <circle cx="90" cy="116" r="9" fill="#a56a3a" opacity=".8" />
    </g>
  ),
  tajine: () => (
    <g>
      <path d="M86 24 q-9 -10 0 -20" stroke="#f3ead2" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".6" />
      <path d="M112 26 q-9 -10 0 -22" stroke="#f3ead2" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".6" />
      <path d="M16 142 H184 Q178 182 100 184 Q22 182 16 142Z" fill="#a8461f" />
      <path d="M38 144 C58 98 84 62 95 40 H105 C116 62 142 98 162 144Z" fill="#c9602d" />
      <circle cx="100" cy="34" r="11" fill="#e3a72f" />
      <path d="M52 120 H148" stroke="#e3a72f" strokeWidth="4" strokeLinecap="round" />
      <path d="M68 94 H132" stroke="#e3a72f" strokeWidth="4" strokeLinecap="round" />
      {[62, 80, 100, 120, 138].map((x) => (
        <circle key={x} cx={x} cy="132" r="3" fill="#f3ead2" />
      ))}
      <path d="M16 142 H184" stroke="#7d3014" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  leaf: () => (
    <g>
      <g transform="translate(40 150) rotate(-52)">
        <path d="M0 0 C20 -34 70 -34 110 0 C70 34 20 34 0 0Z" fill="#4f7d2a" />
        <path d="M0 0 H104" stroke="#8fb85a" strokeWidth="3" />
      </g>
      <g transform="translate(70 170) rotate(-12)">
        <path d="M0 0 C18 -28 56 -28 90 0 C56 28 18 28 0 0Z" fill="#65993a" />
        <path d="M0 0 H86" stroke="#9cc869" strokeWidth="3" />
      </g>
    </g>
  ),
  chili: () => (
    <g>
      <path d="M44 66 C84 30 154 62 162 132 C166 168 150 182 140 172 C132 124 92 96 44 96Z" fill="#b8371f" />
      <path d="M62 74 C96 54 138 74 150 112" stroke="#e0583a" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".7" />
      <path d="M44 66 q-14 -12 -4 -30" stroke="#4d7a2a" strokeWidth="9" strokeLinecap="round" fill="none" />
    </g>
  ),
};

const photos: Partial<Record<FoodKind, string>> = {
  pizza: "/images/food/pizza.webp",
  burger: "/images/food/burger.webp",
  tacos: "/images/food/tacos.webp",
  juice: "/images/food/juice.webp",
  leaf: "/images/food/leaf.webp",
  fries: "/images/food/fries.webp",
};

export default function FoodArt({ kind }: { kind: FoodKind }) {
  const photo = photos[kind];
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt=""
        width={720}
        height={720}
        decoding="async"
        draggable={false}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    );
  }
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true" focusable="false">
      {art[kind]()}
    </svg>
  );
}