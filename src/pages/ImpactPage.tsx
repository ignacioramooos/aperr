import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Share2, BookOpen, Users, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

// Animated counter that triggers on scroll into view
const AnimatedMetric = ({ end, label, icon: Icon }: { end: number; label: string; icon: typeof Users }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          const duration = 1200;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, triggered]);

  return (
    <div ref={ref} className="text-center">
      <Icon size={20} className="mx-auto mb-3 opacity-50" style={{ color: "#22D07A" }} />
      <p className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">{value}</p>
      <p className="text-sm text-white/60 font-heading">{label}</p>
    </div>
  );
};

// Uruguay department map (simplified SVG-based)
const DEPARTMENTS = [
  "Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores",
  "Florida", "Lavalleja", "Maldonado", "Montevideo", "Paysandú", "Río Negro",
  "Rivera", "Rocha", "Salto", "San José", "Soriano", "Tacuarembó", "Treinta y Tres",
];

const DeptMap = ({ deptCounts }: { deptCounts: Map<string, number> }) => {
  const maxCount = Math.max(1, ...Array.from(deptCounts.values()));

  return (
    <div className="grid grid-cols-4 md:grid-cols-5 gap-2 max-w-lg mx-auto">
      {DEPARTMENTS.map((dept) => {
        const count = deptCounts.get(dept) || 0;
        const intensity = count > 0 ? Math.max(0.3, count / maxCount) : 0;
        return (
          <div
            key={dept}
            className="rounded-lg p-3 text-center border transition-colors"
            style={{
              backgroundColor: count > 0 ? `rgba(34, 208, 122, ${intensity * 0.3})` : "rgba(255,255,255,0.03)",
              borderColor: count > 0 ? `rgba(34, 208, 122, ${intensity * 0.5})` : "rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-xs font-heading text-white/70 truncate">{dept}</p>
            {count > 0 && (
              <p className="text-xs font-heading font-medium mt-1" style={{ color: "#22D07A" }}>{count}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

const milestones = [
  { date: "Abril 2025", event: "Primer sitio web lanzado" },
  { date: "Próximamente", event: "Primer cohort presencial" },
];

const ImpactPage = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [deptCount, setDeptCount] = useState(0);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [deptCounts, setDeptCounts] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      const [
        { count: students },
        { data: depts },
        { count: lessons },
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("department"),
        supabase.from("lesson_progress").select("*", { count: "exact", head: true }),
      ]);

      setStudentCount(students ?? 0);
      setLessonsCompleted(lessons ?? 0);

      // Calculate unique departments
      const deptMap = new Map<string, number>();
      if (depts) {
        depts.forEach((d: { department: string | null }) => {
          if (d.department) {
            deptMap.set(d.department, (deptMap.get(d.department) || 0) + 1);
          }
        });
      }
      setDeptCounts(deptMap);
      setDeptCount(deptMap.size);
      setLoading(false);
    };
    fetchMetrics();

    // Subscribe to realtime profile inserts
    const channel = supabase
      .channel("impact-profiles")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "profiles" },
        () => {
          setStudentCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleShare = () => {
    const shareData = {
      title: "Impacto de Crecí con Criterio",
      text: "¡Mirá el impacto de Crecí con Criterio en Uruguay! 🇺🇾📈",
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ backgroundColor: "#0D1B2A" }}>
        {/* Hero metrics */}
        <section className="pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="container text-center">
            <p className="text-xs font-heading font-medium uppercase tracking-widest mb-4" style={{ color: "#22D07A" }}>
              Impacto en vivo
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4">
              Nuestro impacto, en tiempo real
            </h1>
            <p className="text-white/50 text-lg mb-2 max-w-lg mx-auto">
              Cada número viene directamente de nuestra base de datos. Sin inventar.
            </p>
            {/* Live indicator */}
            <div className="flex items-center justify-center gap-2 mb-12">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#22D07A" }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: "#22D07A" }} />
              </span>
              <span className="text-xs font-heading" style={{ color: "#22D07A" }}>En vivo</span>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 rounded-lg animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.05)" }} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <AnimatedMetric end={studentCount} label="Inscriptos" icon={Users} />
                <AnimatedMetric end={deptCount} label="Departamentos" icon={MapPin} />
                <AnimatedMetric end={lessonsCompleted} label="Lecciones completadas" icon={BookOpen} />
              </div>
            )}
          </div>
        </section>

        {/* Department map */}
        <section className="pb-20 md:pb-28">
          <div className="container">
            <p className="text-xs font-heading font-medium uppercase tracking-widest text-center mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
              Presencia por departamento
            </p>
            <DeptMap deptCounts={deptCounts} />
          </div>
        </section>

        {/* Timeline */}
        <section className="pb-20 md:pb-28">
          <div className="container max-w-lg">
            <p className="text-xs font-heading font-medium uppercase tracking-widest text-center mb-10" style={{ color: "rgba(255,255,255,0.4)" }}>
              Hitos del proyecto
            </p>
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-4 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: "#22D07A" }} />
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1" style={{ backgroundColor: "rgba(34,208,122,0.2)" }} />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="text-xs font-heading mb-1" style={{ color: "#22D07A" }}>{m.date}</p>
                    <p className="text-white font-heading font-medium">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Share */}
        <section className="pb-20 md:pb-28 text-center">
          <Button onClick={handleShare} variant="cta" size="cta" className="gap-2">
            <Share2 size={16} /> Compartir
          </Button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ImpactPage;
