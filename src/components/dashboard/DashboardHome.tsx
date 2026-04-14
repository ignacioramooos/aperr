import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import DashboardFormacion from "@/components/dashboard/DashboardFormacion";
import { BookOpen, FileText, Target, MapPin, Clock, CalendarDays, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RegisteredEvent {
  id: string;
  title: string;
  event_date: string;
  location: string;
}

const DashboardHome = () => {
  const { user, session } = useAuth();
  const [myEvents, setMyEvents] = useState<RegisteredEvent[]>([]);
  const [lessonCount, setLessonCount] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);

  useEffect(() => {
    if (!session?.user) return;

    const fetchData = async () => {
      // Fetch events
      const { data: regs } = await supabase
        .from("event_registrations")
        .select("event_id")
        .eq("user_id", session.user.id);

      if (regs && regs.length > 0) {
        const ids = regs.map((r: { event_id: string }) => r.event_id);
        const { data: evts } = await supabase
          .from("events")
          .select("id, title, event_date, location")
          .in("id", ids)
          .gte("event_date", new Date().toISOString())
          .order("event_date", { ascending: true })
          .limit(3);
        setMyEvents((evts as RegisteredEvent[]) || []);
      }

      // Fetch lesson progress
      const { count: totalLessons } = await supabase
        .from("lessons")
        .select("*", { count: "exact", head: true })
        .eq("is_published", true);
      setLessonCount(totalLessons ?? 0);

      const { count: completed } = await supabase
        .from("lesson_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", session.user.id);
      setCompletedLessons(completed ?? 0);
    };
    fetchData();
  }, [session]);

  if (!user) return null;

  const progressPercent = lessonCount > 0 ? Math.round((completedLessons / lessonCount) * 100) : 0;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-UY", { weekday: "long", day: "numeric", month: "long" });
  };
  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      {/* Go to landing */}
      <Button asChild variant="cta-outline" size="cta" className="w-full mb-8">
        <Link to="/">
          Ir a la página principal <ArrowRight size={16} />
        </Link>
      </Button>

      {/* Welcome */}
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl text-foreground mb-1">
          Hola, {user.name}!
        </h1>
        <p className="text-muted-foreground text-sm">
          Bienvenido a tu panel de estudiante.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-heading mb-3">
            <BookOpen size={16} /> Formación Online
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-heading font-semibold text-foreground">{progressPercent}%</span>
            <span className="text-sm text-muted-foreground mb-1">{completedLessons}/{lessonCount} lecciones</span>
          </div>
          <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${progressPercent}%`, backgroundColor: "#22D07A" }} />
          </div>
        </div>
        <div className="border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-heading mb-3">
            <Target size={16} /> Próximo Objetivo
          </div>
          <span className="text-lg font-heading font-medium text-foreground">
            {completedLessons < lessonCount ? "Completar formación online" : "Formación completada ✓"}
          </span>
        </div>
      </div>

      {/* Formación Online */}
      <div className="mb-10">
        <p className="text-xs font-heading font-medium uppercase tracking-widest text-muted-foreground mb-4">
          Formación online
        </p>
        <DashboardFormacion />
      </div>

      {/* My upcoming events */}
      {myEvents.length > 0 && (
        <div className="mb-10">
          <p className="text-xs font-heading font-medium uppercase tracking-widest text-muted-foreground mb-4">
            Mis próximos eventos
          </p>
          <div className="space-y-3">
            {myEvents.map((event) => (
              <div key={event.id} className="border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{event.title}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {formatDate(event.event_date)}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {formatTime(event.event_date)}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {event.location}</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-heading">
                  <CheckCircle2 size={14} /> Anotado
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community - empty state since there are no real posts yet */}
      <div>
        <p className="text-xs font-heading font-medium uppercase tracking-widest text-muted-foreground mb-4">
          Comunidad
        </p>
        <div className="border border-border rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Todavía no hay publicaciones en la comunidad. ¡Pronto se habilita esta sección!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
