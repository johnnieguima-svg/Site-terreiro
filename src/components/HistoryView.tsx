import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring } from "motion/react";
import { PageHeader } from "./PageHeader";
import { FloatingReadingIndex } from "./FloatingReadingIndex";
import { InstitutionalFooter } from "./InstitutionalFooter";
import { ArrowRight, Calendar, Sparkles, Compass, CheckCircle2, ChevronDown } from "lucide-react";

const carouselImages = [
  "/Header/tpm2.webp",
  "/Header/tpm.webp",
  "/Header/obra.webp",
  "/Header/inaug.webp",
  "/Header/cucacorrente.webp"
];

const forjaImages = [
  "/Header/obi.webp",
  "/Header/amacimeu.webp",
  "/Header/cruzamento.webp"
];

interface FoundationTimelineStep {
  id: string;
  year: string;
  dateLabel: string;
  title: string;
  subtitle: string;
  quote: string;
  summary: string;
  deepDetail: string;
  image: string;
  chapterTarget: string;
}

const FOUNDATION_TIMELINE_STEPS: FoundationTimelineStep[] = [
  {
    id: "marco-1987",
    year: "1987",
    dateLabel: "2 de Fevereiro de 1987",
    title: "A Semente: Nasce o Terreiro do Pai Maneco",
    subtitle: "Pai Fernando de Ogum (1937 – 2012)",
    quote: "Umbanda simples e sem mistificações, onde prevaleça o respeito mútuo, a caridade e o amor fraterno.",
    summary: "Na garagem de uma prima, Fernando Macedo Guimarães abre a primeira gira e consolida o alicerce da 'Umbanda Pés no Chão'.",
    deepDetail: "Irmão do avô do dirigente, Pai Fernando de Ogum encantava pela seriedade e pelas convicções inabaláveis. Seu terreiro tornou-se uma extensão do próprio lar para toda a família, plantando a raiz ética que hoje sustenta a CUCA.",
    image: "/Header/Pai.webp",
    chapterTarget: "cap-raizes"
  },
  {
    id: "marco-2009",
    year: "2009",
    dateLabel: "Ano de 2009",
    title: "O Ingresso na Corrente de Aço",
    subtitle: "O Amaci e o Chamado na Juventude",
    quote: "Servir de instrumento para que o Caboclo Akuan e o Caboclo Tupinambá fundamentassem o axé.",
    summary: "Nascido e criado entre atabaques, o dirigente realiza seu amaci em 2009 e inicia o trabalho mediúnico ainda antes da maioridade.",
    deepDetail: "Desde cedo, a gira de Ogum às segundas-feiras já se encontrava sob a regência espiritual do Caboclo Akuan, moldando silenciosamente a disciplina e a entrega sacerdotal.",
    image: "/Header/amacimeu.webp",
    chapterTarget: "cap-forja"
  },
  {
    id: "marco-2017",
    year: "2017",
    dateLabel: "Ano de 2017",
    title: "Terreiro Filhos do Sol",
    subtitle: "Pai Léo de Oxóssi · Uma Umbanda Pulsante",
    quote: "Após quase três décadas de serviço no TPM, o chamado espiritual ergue uma nova seara de luz.",
    summary: "Ao lado de seu pai carnal e espiritual, vivencia a fundação do Terreiro Filhos do Sol, escola de dinamismo e firmeza mediúnica.",
    deepDetail: "Foi no Terreiro Filhos do Sol que a presença do Caboclo Akuan foi se afirmando gradualmente na coroa do dirigente, substituindo elementos metálicos por sementes, contas naturais e dentes.",
    image: "/Header/obi.webp",
    chapterTarget: "cap-forja"
  },
  {
    id: "marco-2022",
    year: "2022",
    dateLabel: "Abril de 2022",
    title: "O Cruzamento de Pai de Santo",
    subtitle: "Caboclo Tupinambá & Caboclo Akuan",
    quote: "Os guias já preparavam, no recolhimento e na fé, uma travessia decisiva para erguer nova casa.",
    summary: "Recebe o cruzamento sacerdotal de Pai de Santo pelas mãos do Caboclo Tupinambá e do Caboclo Akuan.",
    deepDetail: "Daquele recolhimento espiritual nasceu a inspiração para a Casa de Umbanda Corrente de Akuan (CUCA), unindo a herança do TPM e do Filhos do Sol.",
    image: "/Header/cruzamento.webp",
    chapterTarget: "cap-forja"
  },
  {
    id: "marco-2025-profecia",
    year: "Maio 2025",
    dateLabel: "1º Semestre de 2025",
    title: "A Profecia de Akuan & A Dívida à Aroeira",
    subtitle: "O Aviso Cravado pela Espiritualidade",
    quote: "A única coisa que peço é que cuidem da aroeira, pois abaixo dela deverá haver o tambor dos Pretos Velhos.",
    summary: "Em consulta no Terreiro do Pai Maneco, o Caboclo Akuan afirma que até setembro de 2025 estariam instalados na própria sede.",
    deepDetail: "Meses depois, a espiritualidade cravou a data e o sinal: a casa seria encontrada entre o final de junho e o começo de julho, e o único pedido dos Pretos Velhos era cuidar da Aroeira que haveria no local.",
    image: "/Header/tpm2.webp",
    chapterTarget: "cap-promessa"
  },
  {
    id: "marco-2025-aroeira",
    year: "Jun 2025",
    dateLabel: "Última Semana de Junho de 2025",
    title: "O Milagre da Aroeira-Vermelha",
    subtitle: "A Sede no Jardim Botânico",
    quote: "Seo Akuan, nos abençoa. E, se for pra ser aqui, que esse lugar nos aceite.",
    summary: "Na última semana de junho, o imóvel é encontrado. A dona aceita com alegria — sua filha era ex-médium do Pai Maneco!",
    deepDetail: "Ao retornarem ao terreno aprovados, avistaram logo na entrada uma única árvore imponente. Ao pesquisarem a espécie, veio a confirmação arrepiante: era uma Aroeira-vermelha. A promessa aos Pretos Velhos estava paga.",
    image: "/Header/IMG_4660.webp",
    chapterTarget: "cap-aroeira"
  },
  {
    id: "marco-2025-inauguracao",
    year: "Set 2025",
    dateLabel: "1º de Setembro de 2025",
    title: "A Inauguração no Dia de Pai Fernando",
    subtitle: "Não Existe Coincidência Diante de Deus",
    quote: "1º de setembro: a data escolhida para inaugurar a CUCA era exatamente o aniversário de Pai Fernando de Ogum.",
    summary: "Obras concluídas e templo consagrado em 1º de setembro, selando o elo sagrado com o tio-avô fundador do TPM.",
    deepDetail: "Apenas semanas após definir a meta de 1º de setembro, o dirigente percebeu que aquela data era o aniversário de nascimento de Pai Fernando Macedo Guimarães. A linhagem fechava um ciclo luminoso.",
    image: "/Header/inaug.webp",
    chapterTarget: "cap-aroeira"
  }
];

const springSmooth = { type: "spring" as const, stiffness: 220, damping: 28, mass: 0.9 };
const easeApple: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HistoryView({ 
  handleScroll, 
  onNavigateAkuan,
  onNavigate
}: { 
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onNavigateAkuan?: () => void;
  onNavigate?: (viewId: string) => void;
}) {
  const [tick, setTick] = useState(0);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const [hoveredTimelineIndex, setHoveredTimelineIndex] = useState<number | null>(null);
  const [expandedStepId, setExpandedStepId] = useState<string | null>("marco-2025-aroeira");
  const [timelineProgressRatio, setTimelineProgressRatio] = useState(0.15);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineSectionRef = useRef<HTMLElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const smoothBeamScale = useSpring(timelineProgressRatio, {
    stiffness: 140,
    damping: 26,
    mass: 0.6
  });

  useEffect(() => {
    smoothBeamScale.set(timelineProgressRatio);
  }, [timelineProgressRatio, smoothBeamScale]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Update timeline progress both on scroll and when hovering nodes
  const updateTimelineOnScroll = (e: React.UIEvent<HTMLDivElement>) => {
    handleScroll(e);

    const scrollContainer = e.currentTarget;
    if (!timelineSectionRef.current) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const sectionRect = timelineSectionRef.current.getBoundingClientRect();

    // Calculate how far the user has scrolled through the timeline section
    const viewportTriggerY = containerRect.top + containerRect.height * 0.55;
    const relativeY = viewportTriggerY - sectionRect.top;
    const rawRatio = Math.max(0.08, Math.min(1, relativeY / Math.max(1, sectionRect.height - 120)));
    setTimelineProgressRatio(rawRatio);

    // Determine which step card is closest to the reading focal line
    let closestIdx = 0;
    let minDistance = Infinity;
    stepRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const stepCenter = rect.top + rect.height * 0.35;
      const dist = Math.abs(stepCenter - viewportTriggerY);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });
    setActiveTimelineIndex(closestIdx);
  };

  // Also allow mouse vertical movement inside the timeline to fluidly guide the beam
  const handleTimelineMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!timelineSectionRef.current) return;
    const rect = timelineSectionRef.current.getBoundingClientRect();
    const mouseRelY = e.clientY - rect.top;
    const mouseRatio = Math.max(0.08, Math.min(1, mouseRelY / Math.max(1, rect.height - 80)));
    // Blend scroll and mouse position for responsive tactile feel
    setTimelineProgressRatio((prev) => prev * 0.35 + mouseRatio * 0.65);
  };

  const scrollToStep = (idx: number) => {
    setActiveTimelineIndex(idx);
    setTimelineProgressRatio((idx + 1) / FOUNDATION_TIMELINE_STEPS.length);
    const targetEl = stepRefs.current[idx];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const currentHighlightedIndex = hoveredTimelineIndex !== null ? hoveredTimelineIndex : activeTimelineIndex;

  const chapters = [
    { id: "cap-linha-tempo", number: "01", label: "Linha do Tempo Viva" },
    { id: "cap-raizes", number: "02", label: "Pai Fernando & TPM" },
    { id: "cap-forja", number: "03", label: "Caminho de Forja" },
    { id: "cap-promessa", number: "04", label: "A Promessa Espiritual" },
    { id: "cap-aroeira", number: "05", label: "O Milagre da Aroeira" },
    { id: "cap-akuan", number: "06", label: "O Patrono Akuan" },
  ];

  return (
    <motion.div 
      ref={containerRef}
      key="history" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.5, ease: easeApple }}
      onScroll={updateTimelineOnScroll} 
      className="w-full h-full flex flex-col overflow-y-auto bg-[#FBF9F5] overscroll-none"
    >
      <FloatingReadingIndex chapters={chapters} title="Capítulos da História" />

      <PageHeader 
        kicker="Memória, Linhagem & Fundamento"
        meta="1987 — Presente"
        title="A História da Casa"
        subtitle="Role a página ou mova o cursor pela linha do tempo viva para percorrer o caminho de forja da Casa de Umbanda Corrente de Akuan."
        imageSrc="/Header/corrente.webp"
        containerBg="bg-[#FBF9F5]"
      />

      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 pb-28 space-y-32">
        
        {/* =================================================================
            CAPÍTULO 1: LINHA DO TEMPO INTERATIVA DE ROLAGEM & MOUSE (APPLE CRYSTAL)
            ================================================================= */}
        <section 
          id="cap-linha-tempo" 
          ref={timelineSectionRef}
          onMouseMove={handleTimelineMouseMove}
          className="scroll-mt-28 pt-2 relative"
        >
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs uppercase tracking-[0.28em] font-bold text-vinho block">
              01 · Linha do Tempo Interativa da Fundação
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">
              Da Garagem de 1987 ao Milagre da Aroeira
            </h2>
            <p className="text-sm md:text-base text-charcoal/75">
              À medida que você desce a tela ou passa o mouse pelos marcos abaixo, o fio condutor da nossa ancestralidade se ilumina etapa por etapa.
            </p>
          </div>

          {/* Sticky Crystal HUD Bar showing active era & quick jump */}
          <div className="sticky top-22 z-30 mb-14">
            <div className="crystal-pill rounded-2xl p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-vinho shrink-0" />
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-vinho">
                  Marco Ativo ({currentHighlightedIndex + 1}/{FOUNDATION_TIMELINE_STEPS.length}):
                </span>
                <span className="text-xs md:text-sm font-serif font-medium text-charcoal truncate">
                  {FOUNDATION_TIMELINE_STEPS[currentHighlightedIndex].year} — {FOUNDATION_TIMELINE_STEPS[currentHighlightedIndex].title}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {FOUNDATION_TIMELINE_STEPS.map((step, idx) => {
                  const isCurrent = idx === currentHighlightedIndex;
                  const isPassed = idx <= currentHighlightedIndex;
                  return (
                    <button
                      key={step.id}
                      onClick={() => scrollToStep(idx)}
                      onMouseEnter={() => setHoveredTimelineIndex(idx)}
                      onMouseLeave={() => setHoveredTimelineIndex(null)}
                      className={`relative px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold tabular-nums transition-all cursor-pointer ${
                        isCurrent
                          ? "text-white shadow-sm"
                          : isPassed
                          ? "text-vinho bg-vinho/8 hover:bg-vinho/15"
                          : "text-charcoal/55 hover:text-charcoal bg-white/50"
                      }`}
                    >
                      {isCurrent && (
                        <motion.span
                          layoutId="timelineHudActivePill"
                          transition={springSmooth}
                          className="absolute inset-0 rounded-xl bg-vinho -z-10"
                        />
                      )}
                      {step.year}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Vertical Scroll-Driven Timeline Container */}
          <div className="relative py-6">
            {/* Background Track Rail */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-vinho/10 via-charcoal/15 to-vinho/10 rounded-full overflow-hidden">
              {/* Animated Luminous Fill Beam */}
              <motion.div
                style={{
                  scaleY: smoothBeamScale,
                  transformOrigin: "top"
                }}
                className="w-full h-full bg-gradient-to-b from-vinho via-[#C0A080] to-vinho shadow-[0_0_18px_rgba(107,15,15,0.65)]"
              />
            </div>

            {/* Timeline Milestone Nodes */}
            <div className="space-y-16 md:space-y-24 relative z-10">
              {FOUNDATION_TIMELINE_STEPS.map((step, idx) => {
                const isEven = idx % 2 === 0;
                const isActive = idx === currentHighlightedIndex;
                const isReached = (idx / Math.max(1, FOUNDATION_TIMELINE_STEPS.length - 1)) <= timelineProgressRatio + 0.05 || idx <= currentHighlightedIndex;
                const isExpanded = expandedStepId === step.id;

                return (
                  <div
                    key={step.id}
                    ref={(el) => {
                      stepRefs.current[idx] = el;
                    }}
                    onMouseEnter={() => {
                      setHoveredTimelineIndex(idx);
                      setTimelineProgressRatio((idx + 0.7) / FOUNDATION_TIMELINE_STEPS.length);
                    }}
                    onMouseLeave={() => setHoveredTimelineIndex(null)}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } gap-8 md:gap-12`}
                  >
                    {/* Central Luminous Crystal Node Marker */}
                    <button
                      onClick={() => scrollToStep(idx)}
                      aria-label={`Ir para ${step.year}`}
                      className="absolute left-5 md:left-1/2 -translate-x-1/2 top-8 z-20 flex items-center justify-center cursor-pointer group focus:outline-none"
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.25 : isReached ? 1 : 0.85,
                          backgroundColor: isActive ? "#6B0F0F" : isReached ? "#C0A080" : "#F3EFE6",
                          borderColor: isActive ? "#C0A080" : isReached ? "#6B0F0F" : "rgba(41,37,36,0.25)"
                        }}
                        transition={springSmooth}
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-lg backdrop-blur-md"
                      >
                        <span
                          className={`font-mono text-[11px] font-bold tabular-nums ${
                            isActive ? "text-white" : isReached ? "text-[#1C1917]" : "text-charcoal/60"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                      </motion.div>
                      {isActive && (
                        <motion.span
                          layoutId="timelineActiveHalo"
                          transition={springSmooth}
                          className="absolute -inset-2 rounded-full border border-vinho/40 bg-vinho/10 -z-10"
                        />
                      )}
                    </button>

                    {/* Content Card Column (50% width on desktop) */}
                    <div className={`w-full md:w-[calc(50%-3rem)] pl-14 md:pl-0 ${isEven ? "md:pr-4" : "md:pl-4"}`}>
                      <motion.article
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        animate={{
                          scale: isActive ? 1.015 : 1,
                          y: isActive ? -4 : 0
                        }}
                        transition={springSmooth}
                        onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                        className={`crystal-card rounded-3xl overflow-hidden cursor-pointer group ${
                          isActive
                            ? "ring-2 ring-vinho/35 shadow-2xl"
                            : "opacity-90 hover:opacity-100"
                        }`}
                      >
                        {/* Top Visual Strip */}
                        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#1C1917]">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/30 to-transparent" />

                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                            <span className="crystal-pill px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-vinho flex items-center gap-1.5">
                              <Calendar size={13} />
                              {step.dateLabel}
                            </span>
                            {isReached && (
                              <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[#C0A080] text-[10px] uppercase tracking-widest font-bold border border-[#C0A080]/30">
                                {step.year}
                              </span>
                            )}
                          </div>

                          <div className="absolute bottom-4 left-5 right-5 text-white">
                            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C0A080] font-semibold block">
                              {step.subtitle}
                            </span>
                            <h3 className="font-serif text-2xl sm:text-3xl leading-tight mt-0.5">
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        {/* Crystal Body */}
                        <div className="p-6 sm:p-7 space-y-4">
                          <div className="p-4 rounded-2xl bg-vinho/[0.04] border border-vinho/10">
                            <p className="font-serif italic text-sm sm:text-base text-charcoal/90 leading-relaxed">
                              “{step.quote}”
                            </p>
                          </div>

                          <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed">
                            {step.summary}
                          </p>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: easeApple }}
                                className="overflow-hidden"
                              >
                                <div className="pt-3 border-t border-vinho/10 space-y-4">
                                  <p className="text-sm text-charcoal/80 leading-relaxed prose-editorial">
                                    {step.deepDetail}
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const el = document.getElementById(step.chapterTarget);
                                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }}
                                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold text-vinho hover:underline cursor-pointer"
                                  >
                                    <span>Ir para o relato completo deste capítulo</span>
                                    <ArrowRight size={14} />
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="pt-2 flex items-center justify-between text-xs text-charcoal/55 border-t border-charcoal/5">
                            <span className="font-medium text-vinho/80">
                              {isExpanded ? "Recolher detalhes" : "Clique para aprofundar neste marco"}
                            </span>
                            <ChevronDown
                              size={16}
                              className={`text-vinho transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                            />
                          </div>
                        </div>
                      </motion.article>
                    </div>

                    {/* Opposite Spacer Column on Desktop with Ambient Year Callout */}
                    <div
                      className={`hidden md:flex md:w-[calc(50%-3rem)] items-center pt-10 ${
                        isEven ? "justify-start pl-6" : "justify-end pr-6"
                      }`}
                    >
                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0.4,
                          x: isActive ? 0 : isEven ? -10 : 10
                        }}
                        transition={springSmooth}
                        className={`space-y-1 ${isEven ? "text-left" : "text-right"}`}
                      >
                        <span className="font-serif text-5xl lg:text-6xl text-vinho/80 font-light tracking-tight block">
                          {step.year}
                        </span>
                        <span className="text-xs uppercase tracking-[0.25em] text-charcoal/60 font-bold block">
                          {step.subtitle}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 2: AS RAÍZES E O PAI FERNANDO */}
        <motion.section 
          id="cap-raizes"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easeApple }}
          className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-t border-vinho/10 pt-20"
        >
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-vinho">
                Capítulo 02 · A Raiz Familiar (1987)
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">
                As Raízes e o Pai Fernando de Ogum
              </h2>
            </div>

            <div className="crystal-card p-6 rounded-2xl">
              <p className="text-sm md:text-base font-serif italic text-charcoal">
                "Umbanda simples e sem mistificações, onde prevaleça o respeito mútuo, a caridade e o amor fraterno." — <strong className="not-italic font-sans text-xs uppercase tracking-wider text-vinho">Pai Fernando de Ogum</strong>
              </p>
            </div>

            <div className="space-y-5 text-base md:text-lg text-charcoal/85 prose-editorial">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:text-vinho first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                Minha doutrina inicia-se no cerne de minha família, na figura, hoje mítica, de <strong>Fernando Macedo Guimarães (1937 – 2012)</strong>, irmão de meu avô e mais conhecido como <strong>Pai Fernando de Ogum</strong>. Imagine-o como um homem magro, sem cabelos e extremamente sério. Quando ele adentrava um cômodo, todos aninhavam-se ao seu redor com olhar de respeito e curiosidade.
              </p>
              <p>
                No dia <strong>2 de fevereiro de 1987</strong>, Fernando abriu a primeira gira de Umbanda na garagem de uma prima. Naquela noite nascia o <strong>Terreiro do Pai Maneco (TPM)</strong>, consolidando a prática que batizou de <em>Umbanda Pés no Chão</em> — o alicerce ético que até hoje sustenta nossa casa.
              </p>
            </div>
          </div>

          <figure className="lg:col-span-5 order-1 lg:order-2 space-y-3">
            <div className="crystal-card p-2 rounded-3xl overflow-hidden shadow-xl relative aspect-[4/5] group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative bg-charcoal">
                <img 
                  src="/Header/Pai.webp" 
                  alt="Pai Fernando de Ogum" 
                  className="w-full h-full object-cover sepia-[.15] group-hover:scale-105 group-hover:sepia-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent"></div>
              </div>
            </div>
            <figcaption className="text-xs font-serif italic text-charcoal/65 text-center">
              Fig. 1 — Fernando Macedo Guimarães (Pai Fernando de Ogum), fundador do Terreiro do Pai Maneco.
            </figcaption>
          </figure>
        </motion.section>

        {/* CAPÍTULO 3: O CAMINHO DE FORJA */}
        <motion.section 
          id="cap-forja"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easeApple }}
          className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center crystal-panel p-8 md:p-14 rounded-3xl"
        >
          <figure className="lg:col-span-5 space-y-3">
            <div className="crystal-card p-2 rounded-3xl overflow-hidden shadow-xl relative aspect-[4/5] group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative bg-charcoal/10">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={tick % forjaImages.length}
                    src={forjaImages[tick % forjaImages.length]} 
                    alt="Ritual Espiritual e Caminho de Forja" 
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.85, ease: easeApple }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3 right-3 z-20 flex gap-1.5">
                  {forjaImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTick(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === tick % forjaImages.length ? 'w-6 bg-white' : 'w-2 bg-white/50'
                      }`}
                      aria-label={`Ver foto ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <figcaption className="text-xs font-serif italic text-charcoal/65 text-center">
              Fig. 2 — Registros dos ritos de confirmação, amaci e cruzamento sacerdotal.
            </figcaption>
          </figure>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-vinho">
                Capítulo 03 · Das Raízes ao Sol (2009 – 2022)
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">
                O Caminho de Forja
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="crystal-card p-5 rounded-2xl">
                <span className="font-mono text-xs font-bold text-vinho">2009 · Corrente de Aço</span>
                <p className="text-xs text-charcoal/80 mt-1.5 leading-relaxed">
                  Ingresso formal no Terreiro do Pai Maneco e início do labor mediúnico ainda na juventude.
                </p>
              </div>
              <div className="crystal-card p-5 rounded-2xl">
                <span className="font-mono text-xs font-bold text-vinho">2017 & 2022 · Filhos do Sol</span>
                <p className="text-xs text-charcoal/80 mt-1.5 leading-relaxed">
                  Fundação do Terreiro Filhos do Sol e cruzamento de Pai de Santo pelo Caboclo Tupinambá e Caboclo Akuan.
                </p>
              </div>
            </div>

            <div className="space-y-5 text-base md:text-lg text-charcoal/85 prose-editorial">
              <p>
                Nasci e cresci entre atabaques, mas foi em <strong>2009</strong> que ingressei formalmente na Corrente de Aço do Terreiro do Pai Maneco. Em <strong>2017</strong>, após quase três décadas de serviço, meu pai ouviu o chamado de seu guia para erguer nova seara: nasceu o <strong>Terreiro Filhos do Sol</strong>, onde contemplei uma Umbanda pulsante e dinâmica.
              </p>
              <p>
                Em <strong>abril de 2022</strong>, recebi o cruzamento de Pai de Santo pelas mãos do <strong>Caboclo Tupinambá</strong> e, mais adiante, do <strong>Caboclo Akuan</strong>. Eu sentia, desde então, que os guias me preparavam para uma travessia decisiva. Desse recolhimento nasceu a inspiração para a <strong>Casa de Umbanda Corrente de Akuan (CUCA)</strong>.
              </p>
            </div>
          </div>
        </motion.section>

        {/* CAPÍTULO 4: A PROMESSA ESPIRITUAL */}
        <motion.section 
          id="cap-promessa"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easeApple }}
          className="scroll-mt-28 space-y-12"
        >
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-vinho">
              Capítulo 04 · A Profecia e a Dívida à Aroeira
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">
              A Promessa Espiritual da Fundação
            </h2>
          </div>

          <div className="crystal-card p-2.5 rounded-3xl overflow-hidden shadow-xl relative aspect-[16/9] md:aspect-[21/9] group">
            <div className="w-full h-full rounded-2xl overflow-hidden relative bg-charcoal">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={tick % carouselImages.length}
                  src={carouselImages[tick % carouselImages.length]} 
                  alt="Construção e inauguração da CUCA" 
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: easeApple }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent z-10 pointer-events-none"></div>
              <div className="absolute bottom-4 left-6 right-6 z-20 flex items-center justify-between text-white/90 text-xs">
                <span className="font-serif italic">Da obra material à consagração do templo</span>
                <div className="flex gap-1.5">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTick(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === tick % carouselImages.length ? 'w-6 bg-white' : 'w-2 bg-white/50'
                      }`}
                      aria-label={`Ir para foto ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6 text-base md:text-lg text-charcoal/85 prose-editorial">
            <p>
              Quando saímos em busca de fundar nossa própria casa, muitas incertezas nos acompanhavam. Em busca de orientação, voltei ao Terreiro do Pai Maneco. Lá, o <strong>Caboclo Akuan</strong> se fez presente, chamou o grupo e deu uma diretriz direta: tudo já estava resolvido pela espiritualidade e até <strong>setembro de 2025</strong> estaríamos instalados em nossa sede. Mas alertou: <em>"Vocês devem fazer por onde construir esta casa pelas vias materiais."</em>
            </p>
            <div className="my-8 p-8 crystal-panel rounded-3xl text-center">
              <p className="text-lg md:text-xl font-serif italic text-charcoal leading-relaxed">
                "Quem encontrará a casa é você! Será entre o final de junho e começo de julho. A única coisa que peço é que cuidem da aroeira, pois abaixo dela deverá haver o tambor dos Pretos Velhos. Este é o único pedido deles para esta casa."
              </p>
              <span className="block mt-3 text-xs font-sans uppercase tracking-[0.2em] text-vinho font-bold">
                — Aviso Espiritual antes da descoberta do imóvel
              </span>
            </div>
          </div>
        </motion.section>

        {/* CAPÍTULO 5: O MILAGRE DA AROEIRA */}
        <motion.section 
          id="cap-aroeira"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easeApple }}
          className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start border-t border-vinho/10 pt-16"
        >
          <figure className="lg:col-span-5 space-y-3 lg:sticky lg:top-28">
            <div className="crystal-card p-2 rounded-3xl overflow-hidden shadow-xl relative aspect-[4/5] group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img 
                  src="/Header/IMG_4660.webp" 
                  alt="Árvore Aroeira iluminada pelo sol na entrada da CUCA" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent"></div>
              </div>
            </div>
            <figcaption className="text-xs font-serif italic text-charcoal/65 text-center">
              Fig. 3 — A Aroeira-vermelha encontrada na entrada da sede da CUCA no Jardim Botânico.
            </figcaption>
          </figure>

          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-vinho">
                Capítulo 05 · A Confirmação Sagrada (2025)
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">
                O Milagre da Aroeira
              </h2>
            </div>
            
            <div className="p-6 md:p-8 crystal-card rounded-3xl">
              <p className="text-xl md:text-2xl font-serif italic text-charcoal leading-relaxed">
                “Seo Akuan, nos abençoa. E, se for pra ser aqui, que esse lugar nos aceite.”
              </p>
            </div>

            <div className="space-y-5 text-base md:text-lg text-charcoal/85 prose-editorial">
              <p>
                Na última semana de junho, exatamente no prazo cravado pelos guias, encontramos o imóvel no Jardim Botânico. Tudo parecia encaixar perfeitamente; o único receio era revelar à proprietária que se tratava de um terreiro de Umbanda.
              </p>
              <p>
                A resposta veio dias depois como um abraço do astral: a proprietária aceitou com alegria e sua filha revelou ser <strong>ex-médium do Terreiro do Pai Maneco</strong>, feliz por abrigar uma casa da mesma raiz! Quando voltamos ao terreno e olhamos para a entrada, lá estava uma única árvore imponente: uma <strong>Aroeira-vermelha</strong>. A promessa aos Pretos Velhos estava cumprida.
              </p>
              <p>
                A data escolhida para a inauguração foi <strong>1º de setembro</strong>. Semanas depois, veio a constatação emocionante: 1º de setembro é exatamente o <strong>aniversário de Pai Fernando de Ogum</strong>, fundador do TPM. Não existe coincidência diante da grandeza espiritual.
              </p>
            </div>

            <div className="crystal-panel p-6 rounded-2xl flex items-center gap-4">
              <CheckCircle2 className="text-vinho shrink-0" size={24} />
              <p className="text-xs md:text-sm text-charcoal/85 leading-relaxed">
                Hoje, abaixo da Aroeira-vermelha na entrada da CUCA, repousa o fundamento sagrado prometido aos Pretos Velhos, abençoando cada visitante que cruza nosso portão.
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* CAPÍTULO 6: CONVITE AO CABOCLO AKUAN */}
      <motion.section 
        id="cap-akuan"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeApple }}
        className="scroll-mt-28 py-24 md:py-28 bg-[#1C1917] text-[#FBF9F5] text-center px-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <img src="/Header/IMG_4660.webp" alt="" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto crystal-dark p-10 md:p-14 rounded-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-[#C0A080] uppercase tracking-[0.35em] font-semibold text-xs">
            <Compass size={15} />
            <span>O Patrono Espiritual da Casa</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight font-normal">
            O Caboclo <span className="italic text-[#C0A080]">Akuan</span>
          </h2>
          <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
            Conheça a história, a identidade espiritual e os ensinamentos do mentor de Ogum e Oxalá que governa os rumos da nossa corrente, juntamente com os 12 Guias Dirigentes da casa.
          </p>
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={springSmooth}
              onClick={onNavigateAkuan}
              className="inline-flex items-center gap-3 crystal-vinho text-white px-8 py-4 rounded-2xl text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 cursor-pointer shadow-lg"
            >
              <Sparkles size={15} className="text-[#C0A080]" />
              <span>Conhecer o Caboclo Akuan e os Guias</span>
              <ArrowRight size={15} />
            </motion.button>
          </div>
        </div>
      </motion.section>

      <InstitutionalFooter onNavigate={onNavigate} />
    </motion.div>
  );
}
