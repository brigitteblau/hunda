"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { printLocations, type PrintLocation } from "@/lib/print-locations";

const markerIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:26px;height:26px;border-radius:9999px;
    background:#171717;border:2px solid #41C086;
    box-shadow:0 2px 8px rgba(0,0,0,.25);
  "></div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

const typeLabel: Record<PrintLocation["type"], string> = {
  Makerspace: "Makerspace",
  "Imprenta 3D": "Imprenta 3D",
  "Veterinaria aliada": "Veterinaria aliada",
};

export default function PrintLocationsMap({ className = "" }: { className?: string }) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
  }, []);

  const center: [number, number] = [-34.9011, -56.1645];

  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 ${className}`}>
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", minHeight: 280 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com">Esri</a> — HERE, Garmin, FAO, NOAA, USGS'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        {printLocations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={markerIcon}>
            <Popup className="dark-popup">
              <div className="flex flex-col gap-1 text-sm">
                <span className="font-semibold text-white">{loc.name}</span>
                <span className="text-xs text-white/55">{typeLabel[loc.type]}</span>
                <span className="text-xs text-white/55">{loc.address}, {loc.city}</span>
                <span className="text-xs text-white/55">{loc.hours}</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 text-xs font-medium text-[#41C086] hover:underline"
                >
                  Cómo llegar →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
