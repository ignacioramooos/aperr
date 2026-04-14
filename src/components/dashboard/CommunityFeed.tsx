import { Users } from "lucide-react";

const CommunityFeed = () => (
  <div className="p-6 md:p-10 max-w-3xl">
    <p className="text-xs font-heading font-medium uppercase tracking-widest text-muted-foreground mb-4">
      Comunidad
    </p>
    <h2 className="text-2xl font-semibold text-foreground mb-6">Novedades y análisis</h2>

    <div className="border border-border rounded-lg p-12 text-center">
      <Users size={36} className="mx-auto text-muted-foreground/30 mb-4" />
      <p className="text-muted-foreground text-sm mb-2">
        Esta sección se habilitará pronto.
      </p>
      <p className="text-muted-foreground/60 text-xs">
        Acá vas a poder compartir análisis, preguntas y novedades con otros estudiantes.
      </p>
    </div>
  </div>
);

export default CommunityFeed;
