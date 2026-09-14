import LandingNavbar from "@/components/landingnavbar";

interface Section {
  title: string;
  body: string[];
}

export default function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: Section[];
}) {
  return (
    <main className="w-full min-h-screen bg-[#0B0F0D]">
      <LandingNavbar />

      <section className="px-5 sm:px-8 lg:px-16 pt-40 pb-28">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-4">
            {eyebrow}
          </p>
          <h1 className="text-[clamp(2.2rem,4.5vw,3.2rem)] leading-[1.05] tracking-[-0.04em] font-extrabold text-white">
            {title}
          </h1>
          <p className="mt-3 text-sm text-white/35">Última actualización: {updated}</p>

          <div className="mt-14 flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h2 className="text-lg font-bold tracking-[-0.02em] text-white">
                  {section.title}
                </h2>
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-[15px] leading-7 text-white/55">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
