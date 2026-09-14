export default function LegMeasurementDiagram() {
  return (
    <svg
      viewBox="0 0 220 260"
      className="h-full w-full max-w-[180px] mx-auto"
      fill="none"
    >
      {/* cuerpo del perro (referencia) */}
      <path
        d="M40 40 Q60 10 110 10 Q160 10 175 45 L175 70 L60 70 Z"
        fill="white"
        fillOpacity="0.04"
        stroke="white"
        strokeOpacity="0.15"
      />

      {/* muñón: trapezoide, más ancho arriba (proximal) que abajo (distal) */}
      <path
        d="M75 70 L145 70 L128 220 L92 220 Z"
        fill="#41C086"
        fillOpacity="0.12"
        stroke="#41C086"
        strokeOpacity="0.6"
      />

      {/* anillo proximal */}
      <ellipse cx="110" cy="72" rx="35" ry="8" fill="none" stroke="#41C086" strokeWidth="2" />
      {/* anillo distal */}
      <ellipse cx="110" cy="218" rx="18" ry="6" fill="none" stroke="#41C086" strokeWidth="2" />

      {/* flecha de longitud */}
      <line x1="165" y1="72" x2="165" y2="218" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="160" y1="72" x2="170" y2="72" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="160" y1="218" x2="170" y2="218" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />

      {/* etiquetas */}
      <text x="110" y="58" textAnchor="middle" fontSize="11" fill="white" fillOpacity="0.75" fontWeight="600">
        Proximal
      </text>
      <text x="110" y="60" textAnchor="middle" fontSize="9" fill="white" fillOpacity="0.4" dy="14">
        (cerca del cuerpo)
      </text>

      <text x="110" y="246" textAnchor="middle" fontSize="11" fill="white" fillOpacity="0.75" fontWeight="600">
        Distal
      </text>
      <text x="110" y="248" textAnchor="middle" fontSize="9" fill="white" fillOpacity="0.4" dy="14">
        (punta del muñón)
      </text>

      <text x="182" y="148" textAnchor="middle" fontSize="9" fill="white" fillOpacity="0.4" transform="rotate(90 182 148)">
        Longitud
      </text>
    </svg>
  );
}
