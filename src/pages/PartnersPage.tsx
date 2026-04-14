import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionFade from "@/components/SectionFade";
import { CheckCircle2, ArrowRight, Handshake } from "lucide-react";

const collaborationOptions = [
  "Ceder un espacio para clases",
  "Patrocinar materiales",
  "Difundir el programa",
  "Mentoría para estudiantes",
  "Otro",
];

const PartnersPage = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", org: "", role: "", email: "", collab: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.org && form.email) setSent(true);
  };

  const inputClass = "w-full h-12 px-4 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow font-heading";

  return (
    <>
      <section className="pt-32 md:pt-40 pb-20">
        <div className="container">
          <SectionFade>
            <p className="text-xs font-heading font-medium uppercase tracking-widest text-muted-foreground mb-6">
              Alianzas
            </p>
            <h1 className="text-3xl md:text-5xl text-foreground max-w-3xl mb-6">
              Construyamos juntos
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Buscamos instituciones, organizaciones y empresas que quieran apoyar la educación financiera de los jóvenes uruguayos.
            </p>
          </SectionFade>
        </div>
      </section>

      {/* Empty state — no partners yet */}
      <section className="py-24 md:py-32 border-y border-border">
        <div className="container max-w-2xl text-center">
          <Handshake size={40} className="mx-auto text-muted-foreground/30 mb-6" />
          <h2 className="text-2xl md:text-3xl text-foreground mb-4">
            Estamos buscando nuestros primeros aliados institucionales
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            ¿Tu organización quiere sumarse a esta iniciativa? Completá el formulario abajo y te contactamos.
          </p>
          <Button asChild variant="cta" size="cta" className="gap-2">
            <a href="#aliarse">Quiero ser aliado <ArrowRight size={16} /></a>
          </Button>
        </div>
      </section>

      {/* Empty testimonials state */}
      <section className="py-24 md:py-32">
        <div className="container max-w-3xl text-center">
          <p className="text-xs font-heading font-medium uppercase tracking-widest text-muted-foreground mb-6">
            Testimonios
          </p>
          <p className="text-muted-foreground text-lg">
            Todavía no tenemos testimonios publicados. ¡Volvé pronto!
          </p>
        </div>
      </section>

      <section id="aliarse" className="py-24 md:py-32 border-t border-border">
        <div className="container max-w-2xl">
          <p className="text-xs font-heading font-medium uppercase tracking-widest text-muted-foreground mb-4">
            Sumate
          </p>
          <h2 className="text-3xl md:text-4xl text-foreground mb-4">
            Quiero ser aliado
          </h2>
          <p className="text-muted-foreground mb-10">
            Podés ayudar cediendo un espacio, difundiendo el programa, o aportando recursos. Completá el formulario y te contactamos.
          </p>
          {sent ? (
            <div className="text-center py-12">
              <CheckCircle2 size={40} className="text-foreground mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-foreground text-xl mb-2">Recibido</h3>
              <p className="text-muted-foreground">Te contactamos pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-heading font-medium text-foreground mb-1.5">Nombre *</label>
                  <input className={inputClass} value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-heading font-medium text-foreground mb-1.5">Organización *</label>
                  <input className={inputClass} value={form.org} onChange={(e) => setForm((p) => ({ ...p, org: e.target.value }))} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-heading font-medium text-foreground mb-1.5">Rol / Cargo</label>
                <input className={inputClass} value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-heading font-medium text-foreground mb-1.5">Email *</label>
                <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-heading font-medium text-foreground mb-1.5">¿Cómo te gustaría colaborar?</label>
                <select className={inputClass} value={form.collab} onChange={(e) => setForm((p) => ({ ...p, collab: e.target.value }))}>
                  <option value="">Seleccionar...</option>
                  {collaborationOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <Button type="submit" variant="cta-outline" size="cta" className="w-full">
                Enviar solicitud
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default PartnersPage;
