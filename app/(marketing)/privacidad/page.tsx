import LegalPage from "@/components/legal-page";

export const metadata = {
  title: "Política de privacidad — hunda.",
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de privacidad"
      updated="14 de septiembre de 2026"
      sections={[
        {
          title: "1. Qué datos recolectamos",
          body: [
            "Recolectamos los datos que cargás al crear una cuenta (nombre, email) y los datos del perro y las medidas que ingresás para generar una prótesis (nombre, raza, peso, medidas del muñón, fotos opcionales).",
          ],
        },
        {
          title: "2. Para qué los usamos",
          body: [
            "Usamos esta información exclusivamente para generar el modelo 3D de la prótesis, mostrarte el historial de tus pedidos y contactarte sobre el estado de tu solicitud.",
          ],
        },
        {
          title: "3. Con quién la compartimos",
          body: [
            "No vendemos tus datos. Compartimos la información necesaria (medidas, sin datos personales) con el servicio de generación de modelos 3D para poder crear la prótesis.",
          ],
        },
        {
          title: "4. Dónde se almacena",
          body: [
            "Los datos se almacenan en Supabase con acceso restringido por autenticación. Los archivos STL generados se guardan en almacenamiento privado y se comparten mediante links firmados con vencimiento.",
          ],
        },
        {
          title: "5. Tus derechos",
          body: [
            "Podés pedirnos en cualquier momento que eliminemos tu cuenta y tus datos escribiendo a betterbm26@gmail.com.",
          ],
        },
      ]}
    />
  );
}
