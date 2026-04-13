

## Plan: Rediseño minimalista — quitar la estética "desesperada"

### El problema actual
El sitio usa verde eléctrico (#22D07A) sobre navy oscuro (#0D1B2A), que es exactamente la paleta de apps de trading y crypto. Combinado con CTAs agresivos ("Anotate gratis", "Reservar mi lugar", "Cupos limitados"), sombras verdes en botones, y la palabra "gratis" repetida constantemente, el resultado comunica urgencia comercial — lo opuesto a una organización educativa sin fines de lucro.

### Dirección: Minimalismo editorial
Inspiración: sitios como Stripe Press, Linear, o Are.na. Fondo claro, casi todo en blanco y negro, con un solo color de acento usado con moderación extrema.

### Cambios concretos

**1. Nueva paleta — casi monocromática**
- Fondo: blanco puro `#FFFFFF`
- Texto principal: negro suave `#1A1A1A`
- Texto secundario: gris medio `#6B6B6B`
- Bordes: gris claro `#E5E5E5`
- Acento (usado solo en 2-3 lugares): un azul oscuro sobrio `#1D4ED8` — no verde, no neón
- Eliminar las variables `--green`, `--green-hover`, `--cream`, `--navy`, `--navy-light`
- El hero pasa de fondo oscuro navy a fondo blanco

**2. Nueva tipografía**
- Reemplazar Space Grotesk + Plus Jakarta Sans por **Instrument Sans** (headings) + **Source Serif 4** (body)
- Instrument Sans es geométrica pero con personalidad, no genérica
- Source Serif 4 aporta seriedad editorial que comunica educación, no venta
- Eliminar JetBrains Mono — las etiquetas monospace se reemplazan por texto en mayúsculas con letter-spacing

**3. Botones: calma en vez de urgencia**
- Eliminar `shadow-lg shadow-green/20` y todas las sombras de color
- CTA principal: fondo negro `#1A1A1A`, texto blanco, sin sombra, sin glow
- CTA secundario: borde fino negro, texto negro, fondo transparente
- Reducir tamaño de botones (de `h-[52px]` a `h-11`)

**4. Tono del copy — menos desesperado**
- Eliminar "Cupos limitados" badge
- Reducir repeticiones de "gratis" (aparece ~8 veces en la home)
- "Anotate gratis" → "Inscribite"
- "Anotate ahora — es gratis" → "Empezá acá"
- "Reservar mi lugar" → "Ver próximas clases"
- "100% GRATUITO · SIN FINES DE LUCRO" badge en hero → eliminado (se comunica naturalmente en el subtítulo)
- Quitar el "Sin tarjeta de crédito. Sin compromisos." — nadie esperaba pagar

**5. Layout del hero**
- Fondo blanco, no navy oscuro
- Eliminar el SVG grid decorativo
- Título en negro, sin "Gratis." en color de acento
- Subtítulo más corto y neutro
- Un solo botón, no dos

**6. Secciones de la home**
- Eliminar alternancia forzada blanco/navy entre secciones
- Todo sobre fondo blanco o gris muy sutil (`#FAFAFA`)
- UpcomingClasses: quitar el badge "Cupos limitados", simplificar a una lista limpia
- FinalCTA: fondo blanco en vez de navy, tono tranquilo

**7. Navbar y Footer**
- Navbar: fondo blanco, texto negro, borde inferior sutil
- Footer: fondo `#FAFAFA`, texto gris, sin fondo oscuro navy

### Archivos a modificar
- `src/index.css` — nueva paleta, nueva tipografía
- `tailwind.config.ts` — nuevas font families, limpiar colores custom
- `src/components/ui/button.tsx` — nuevos variants cta/cta-outline
- `src/pages/Index.tsx` — hero, copy, layout de todas las secciones
- `src/components/Navbar.tsx` — fondo claro
- `src/components/Footer.tsx` — fondo claro
- Todas las páginas secundarias — adaptar a la nueva paleta

