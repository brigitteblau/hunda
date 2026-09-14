export interface PrintLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  type: "Makerspace" | "Imprenta 3D" | "Veterinaria aliada";
  hours: string;
  phone?: string;
}

// TODO: mover a Supabase cuando exista la tabla `print_locations`.
export const printLocations: PrintLocation[] = [
  {
    id: "ort-maker",
    name: "Makerspace ORT",
    address: "Bv. Gral Artigas 3255",
    city: "Montevideo",
    lat: -34.8985,
    lng: -56.1653,
    type: "Makerspace",
    hours: "Lun a vie · 9:00–19:00",
    phone: "+598 2707 4461",
  },
  {
    id: "labo3d-cordon",
    name: "Labo3D Cordón",
    address: "Av. 18 de Julio 1968",
    city: "Montevideo",
    lat: -34.9059,
    lng: -56.1751,
    type: "Imprenta 3D",
    hours: "Lun a sáb · 10:00–18:00",
  },
  {
    id: "vet-pocitos",
    name: "Veterinaria Pocitos Norte",
    address: "Av. Brasil 2540",
    city: "Montevideo",
    lat: -34.9101,
    lng: -56.1444,
    type: "Veterinaria aliada",
    hours: "Lun a vie · 8:00–20:00",
    phone: "+598 2710 3322",
  },
  {
    id: "fablab-lata",
    name: "FabLab La Tabaré",
    address: "Av. Gral. Flores 2020",
    city: "Montevideo",
    lat: -34.8887,
    lng: -56.1815,
    type: "Makerspace",
    hours: "Mar a sáb · 11:00–19:00",
  },
];
