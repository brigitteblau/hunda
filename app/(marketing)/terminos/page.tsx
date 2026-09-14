import LegalPage from "@/components/legal-page";

export const metadata = {
  title: "Términos y condiciones — hunda.",
};

export default function TerminosPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Términos y condiciones"
      updated="14 de septiembre de 2026"
      sections={[
        {
          title: "1. Sobre el servicio",
          body: [
            "hunda. es una plataforma que ayuda a diseñar y generar modelos de prótesis caninas personalizadas para su posterior impresión 3D. El diseño se genera a partir de las medidas que el usuario carga en la plataforma.",
          ],
        },
        {
          title: "2. Uso de la plataforma",
          body: [
            "Los modelos generados son una guía técnica y deben ser revisados por un profesional veterinario antes de fabricar e instalar cualquier prótesis en un animal. hunda. no reemplaza el criterio clínico de un veterinario.",
            "El usuario es responsable de la exactitud de las medidas cargadas. Medidas incorrectas pueden generar un modelo que no se ajuste correctamente al animal.",
          ],
        },
        {
          title: "3. Fabricación e impresión",
          body: [
            "hunda. no fabrica ni imprime físicamente las prótesis. La plataforma sugiere puntos de impresión 3D aliados, pero cada punto opera de forma independiente y es responsable de la calidad de su propia impresión.",
          ],
        },
        {
          title: "4. Cuentas de usuario",
          body: [
            "Cada usuario es responsable de mantener la confidencialidad de su cuenta y contraseña, y de toda actividad que ocurra bajo su cuenta.",
          ],
        },
        {
          title: "5. Cambios en estos términos",
          body: [
            "Podemos actualizar estos términos a medida que la plataforma evolucione. Vamos a avisar los cambios relevantes por este mismo medio.",
          ],
        },
        {
          title: "6. Contacto",
          body: [
            "Ante cualquier duda sobre estos términos, escribinos a betterbm26@gmail.com.",
          ],
        },
      ]}
    />
  );
}
