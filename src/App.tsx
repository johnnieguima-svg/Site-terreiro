/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import CalendarEmbed from './components/CalendarEmbed';
import { ErvasView } from "./components/ErvasView";
import { InstagramVideoEmbed } from "./components/InstagramVideoEmbed";
import { PageHeader } from "./components/PageHeader";
import { HistoryView } from "./components/HistoryView";
import { GuiasDirigentesView } from "./components/GuiasDirigentesView";
import { FloatingReadingIndex } from "./components/FloatingReadingIndex";
import { InstitutionalFooter } from "./components/InstitutionalFooter";
import { IG_EMBED_1, IG_EMBED_2 } from "./ig_embeds";

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import { 
  Instagram, 
  Shield, 
  Sparkles, 
  Droplets, 
  Zap, 
  Anchor, 
  Flame,
  Heart,
  Coffee,
  Candy,
  SunMoon,
  Drum,
  Lasso,
  Spade,
  Cross,
  Sword,
  ArrowUpRight,
  Scale,
  Tornado,
  Waves,
  Leaf,
  Bird,
  X,
  Menu,
  MapPin,
  Calendar,
  Activity,
  FileText,
  Eye,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Search,
  Clock,
  CheckCircle2,
  BookOpen,
  Download,
  ArrowRight
} from "lucide-react";

type ViewId = 'home' | 'history' | 'visitor' | 'rituals' | 'ervas' | 'orixas' | 'medium' | 'guide' | 'guias';

const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 220,
  damping: 28,
  mass: 0.9
};

const NAV_GROUPS = [
  {
    id: "casa",
    label: "A Casa",
    items: [
      { id: 'history' as ViewId, label: 'História & Linha do Tempo', desc: 'De Pai Fernando (1987) à fundação da CUCA e o milagre da Aroeira' },
      { id: 'guias' as ViewId, label: 'Guias Dirigentes', desc: 'Caboclo Akuan e os 12 mentores espirituais que regem o terreiro' },
    ]
  },
  {
    id: "fundamentos",
    label: "Fundamentos",
    items: [
      { id: 'orixas' as ViewId, label: 'Orixás e Linhas', desc: 'As 9 forças divinas da natureza e as 10 linhas de trabalho' },
      { id: 'rituals' as ViewId, label: 'Rituais e Preceitos', desc: 'Preceito, Vela e Oração, Amalá e Banho de Ervas no dia a dia' },
      { id: 'ervas' as ViewId, label: 'Ervas Sagradas', desc: 'Herbário visual dos 4 elementos com fotos, cores e modo de preparo' },
    ]
  },
  {
    id: "vivencia",
    label: "Vivência",
    items: [
      { id: 'visitor' as ViewId, label: 'Primeira Vez?', desc: 'Guia passo a passo para visitantes, passes, consultas e ética' },
      { id: 'medium' as ViewId, label: 'Quero Ser Médium', desc: 'Os 7 passos de ingresso na corrente, deveres e funções mediúnicas' },
      { id: 'guide' as ViewId, label: 'Documentos & Pontos', desc: 'Manual de médiuns, livro de pontos cantados e ritual de abertura' },
    ]
  }
];

const QUICK_SEARCH_INDEX: { title: string; subtitle: string; keywords: string; view: ViewId; sectionId?: string }[] = [
  { title: "Primeira Vez? Guia do Visitante", subtitle: "O que vestir, como funciona o passe, a consulta e o que não fazemos", keywords: "primeira vez visitante roupa branco consulta passe descarrego", view: "visitor" },
  { title: "Ervas Sagradas (Herbário dos 4 Elementos)", subtitle: "Camomila, Alecrim, Arruda, Aroeira, Espada de São Jorge, Manjericão e mais", keywords: "ervas banho folha amaci camomila alecrim arruda aroeira espada guine manjericao hortela canela", view: "ervas" },
  { title: "Orixás e Linhas de Trabalho", subtitle: "Oxalá, Ogum, Oxóssi, Xangô, Omulu, Iansã, Oxum, Iemanjá, Nanã, Caboclos, Pretos Velhos, Exu", keywords: "orixas oxala ogum oxossi xango omulu iansa oxum iemanja nana caboclo preto velho exu pombagira marinheiro boiadeiro cigano ere", view: "orixas" },
  { title: "Caboclo Akuan & Guias Dirigentes", subtitle: "Conheça o patrono da CUCA e os 12 mentores chefes da casa", keywords: "caboclo akuan itaquaratira urubata pai joaquim anacleto vo anastacia tranca ruas maria padilha", view: "guias" },
  { title: "Rituais e Preceitos", subtitle: "Os 4 pilares: O Preceito, A Vela e Oração, O Amalá e O Banho de Ervas", keywords: "rituais preceito vela oracao amala oferenda banho", view: "rituals" },
  { title: "História da Casa & Linha do Tempo Interativa", subtitle: "Terreiro do Pai Maneco (1987), Filhos do Sol e a Aroeira da CUCA (2025)", keywords: "historia linha do tempo pai fernando maneco filhos do sol aroeira fundacao", view: "history" },
  { title: "Quero Ser Médium (7 Etapas de Ingresso)", subtitle: "Como entrar para a corrente, tiragem de Obi, Amaci e tipos de médiuns", keywords: "medium corrente obi amaci cambone toco transporte sustentacao", view: "medium" },
  { title: "Documentos, Manual e Pontos Cantados", subtitle: "Leitura e download em PDF do Manual CUCA, Pontos Cantados e Ritual de Abertura", keywords: "documentos pdf manual pontos cantados abertura", view: "guide" },
  { title: "Endereço, Horário das Giras e Chave PIX", subtitle: "Segundas às 19h30 · Av. Pref. Maurício Fruet, 1230 · Jardim Botânico", keywords: "endereco horario segunda 19h30 mapa pix doacao contato", view: "home", sectionId: "contato" },
  { title: "Calendário de Giras", subtitle: "Agenda atualizada das giras de atendimento e festas", keywords: "calendario agenda datas giras", view: "home", sectionId: "calendario" },
];

function AccordionItem({ title, desc, defaultOpen = false }: { title: string; desc: string; defaultOpen?: boolean; key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div 
      className="cursor-pointer border-b border-white/15 pb-5 hover:border-[#C0A080]/60 transition-colors" 
      onClick={() => setIsOpen(!isOpen)}
    >
      <h4 className="font-serif text-lg md:text-xl flex items-start justify-between gap-4 text-white">
        <span>{title}</span>
        <span className="text-[#C0A080] font-sans text-lg shrink-0">{isOpen ? '—' : '+'}</span>
      </h4>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING_TRANSITION}
            className="overflow-hidden"
          >
            <p className="text-white/75 leading-relaxed text-sm md:text-base pt-3 font-light">{desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CustomPDFViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setLoading(false);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  return (
    <div className="flex flex-col h-full w-full relative bg-[#F3EFE6]">
      <div className="flex-1 overflow-y-auto flex justify-center p-4 md:p-8">
        <Document 
          file={url} 
          onLoadSuccess={onDocumentLoadSuccess} 
          loading={
            <div className="flex flex-col items-center justify-center h-full text-charcoal/70 space-y-4 py-20">
              <div className="w-8 h-8 border-3 border-vinho/20 border-t-vinho rounded-full animate-spin"></div>
              <p className="text-sm">Carregando documento...</p>
            </div>
          }
          error={
             <div className="flex flex-col items-center justify-center h-full text-charcoal/70 py-20">
               <p className="text-vinho font-medium">Erro ao carregar o PDF. Você pode baixá-lo diretamente no botão acima.</p>
             </div>
          }
          className="flex justify-center"
        >
          <Page 
            pageNumber={pageNumber} 
            renderTextLayer={false} 
            renderAnnotationLayer={false}
            className="shadow-xl"
            width={Math.min(window.innerWidth - 64, 800) * zoom}
          />
        </Document>
      </div>
      
      {!loading && numPages && (
        <div className="h-16 crystal-pill border-t border-charcoal/10 flex items-center justify-between px-6 shrink-0 z-10 w-full overflow-x-auto gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.5))}
              disabled={zoom <= 0.5}
              className="p-2 text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
              title="Diminuir zoom"
            >
              <ZoomOut className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <span className="text-charcoal/80 text-xs font-mono tabular-nums min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={() => setZoom(prev => Math.min(prev + 0.25, 3))}
              disabled={zoom >= 3}
              className="p-2 text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
              title="Aumentar zoom"
            >
              <ZoomIn className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              disabled={pageNumber <= 1} 
              onClick={() => changePage(-1)}
              className="px-4 py-2 text-xs uppercase tracking-widest font-semibold text-charcoal border border-charcoal/20 rounded-lg hover:bg-charcoal/5 disabled:opacity-30 transition-colors cursor-pointer"
            >
              Anterior
            </button>
            <span className="text-charcoal/80 text-xs md:text-sm font-mono tabular-nums whitespace-nowrap">
              Pág. {pageNumber} / {numPages}
            </span>
            <button 
              disabled={pageNumber >= numPages} 
              onClick={() => changePage(1)}
              className="px-4 py-2 text-xs uppercase tracking-widest font-semibold text-charcoal border border-charcoal/20 rounded-lg hover:bg-charcoal/5 disabled:opacity-30 transition-colors cursor-pointer"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function GuideView({ 
  onScroll,
  onNavigate
}: { 
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onNavigate?: (viewId: string) => void;
  key?: string;
}) {
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; url: string } | null>(null);

  const documents = [
    {
      title: "Manual de Médiuns",
      category: "Regimento & Conduta",
      description: "Regimento interno e guia orientativo de condutas éticas, rituais e comportamentais da Casa de Umbanda Corrente de Akuan.",
      url: "/Documentos/MANUAL CUCA PDF.pdf",
    },
    {
      title: "Pontos Cantados",
      category: "Curimba & Oração Cantada",
      description: "Coletânea dos pontos cantados utilizados em nossas giras, organizados por linha de trabalho e Orixá.",
      url: "/Documentos/livro-de-pontos-cantados.pdf",
    },
    {
      title: "Ritual de Abertura",
      category: "Liturgia do Terreiro",
      description: "Passo a passo das invocações, orações e pontos cantados que compõem o rito de abertura e firmeza do terreiro.",
      url: "/Documentos/ritual-de-abertura.pdf",
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={SPRING_TRANSITION}
      onScroll={onScroll}
      className="flex-1 flex flex-col bg-[#FBF9F5] overflow-y-auto overscroll-none"
    >
      <PageHeader
        kicker="Acervo Digital & Estudo"
        meta="3 Documentos Oficiais em PDF"
        title="Documentos da Casa"
        subtitle="Materiais de estudo, regimento interno, pontos cantados e liturgia disponíveis para consulta e download."
        imageSrc="/Carrosel/CUCA-133.webp"
      />
      
      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {documents.map((doc, idx) => (
            <motion.article
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ ...SPRING_TRANSITION, delay: 0.06 * idx }}
              className="flex flex-col crystal-card rounded-3xl overflow-hidden group"
            >
              {/* PDF Preview Thumbnail */}
              <div 
                onClick={() => setSelectedPdf(doc)}
                className="h-64 w-full bg-[#F3EFE6]/75 relative overflow-hidden flex items-center justify-center border-b border-vinho/10 p-4 cursor-pointer"
              >
                <div className="w-full h-full relative z-0 origin-top transform transition-transform duration-500 ease-out group-hover:scale-105 shadow-md flex items-start justify-center overflow-hidden">
                  <Document 
                    file={doc.url} 
                    loading={<div className="h-full w-full flex items-center justify-center"><div className="w-6 h-6 border-2 border-vinho/20 border-t-vinho rounded-full animate-spin"></div></div>}
                    error={<div className="text-vinho/60 text-xs uppercase tracking-widest font-semibold flex flex-col items-center justify-center h-full gap-2"><FileText size={28} /><span>PDF Disponível</span></div>}
                  >
                    <Page 
                      pageNumber={1} 
                      width={260} 
                      renderTextLayer={false} 
                      renderAnnotationLayer={false}
                      className="origin-top flex justify-center"
                    />
                  </Document>
                </div>
                
                <div className="absolute bottom-3 right-3 z-20">
                  <div className="h-10 w-10 bg-vinho text-white rounded-full flex items-center justify-center shadow-lg">
                    <Eye className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-7 space-y-4 flex flex-col flex-1">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-vinho">
                  {doc.category}
                </span>
                <h3 className="text-2xl font-serif text-charcoal">{doc.title}</h3>
                <p className="text-sm text-charcoal/75 leading-relaxed flex-1">
                  {doc.description}
                </p>
                <div className="pt-5 border-t border-charcoal/10 mt-auto flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedPdf(doc)}
                    className="text-xs uppercase tracking-widest text-vinho font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen size={14} />
                    <span>Ler Online</span>
                  </button>
                  <a
                    href={doc.url}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs text-charcoal/65 hover:text-charcoal font-medium"
                  >
                    <Download size={14} />
                    <span>Baixar PDF</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={SPRING_TRANSITION}
              className="w-full h-full max-w-6xl max-h-[92dvh] crystal-pill rounded-3xl flex flex-col overflow-hidden relative shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal/10">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-vinho" strokeWidth={1.75} />
                  <h3 className="text-lg md:text-xl font-serif font-medium text-charcoal">
                    {selectedPdf.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={selectedPdf.url}
                    download
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl crystal-card hover:bg-vinho hover:text-white text-xs font-semibold text-charcoal transition-colors"
                  >
                    <Download size={14} />
                    <span className="hidden sm:inline">Baixar PDF</span>
                  </a>
                  <button 
                    onClick={() => setSelectedPdf(null)}
                    className="p-2 hover:bg-charcoal/5 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5 text-charcoal" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 relative overflow-hidden w-full h-full">
                <CustomPDFViewer url={selectedPdf.url} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <InstitutionalFooter onNavigate={onNavigate} />
    </motion.div>
  );
}

function MediaSection() {
  const CAROUSEL_IMAGES = [
    "/Carrosel/CUCA-123.webp",
    "/Carrosel/CUCA-126.webp",
    "/Carrosel/CUCA-127.webp",
    "/Carrosel/CUCA-133.webp"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full border-y border-vinho/10 bg-[#F3EFE6]">
      {/* Left Column: Carousel */}
      <section className="relative w-full py-16 px-6 md:p-12 lg:p-16 bg-[#FBF9F5] border-b lg:border-b-0 lg:border-r border-vinho/10 flex flex-col justify-center overflow-hidden">
        <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-start justify-center space-y-8">
          <div className="w-full space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-vinho font-bold block">
              Memória Viva do Terreiro
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal leading-tight">
              Um vislumbre da nossa egrégora
            </h2>
            
            <div className="flex gap-4 items-center pt-2">
              <span className="text-xs font-mono tabular-nums text-charcoal/55">
                0{currentIndex + 1} / 0{CAROUSEL_IMAGES.length}
              </span>
              <div className="flex gap-2">
                {CAROUSEL_IMAGES.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? 'w-8 bg-vinho' : 'w-2 bg-vinho/25'}`}
                    aria-label={`Ir para imagem ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative w-full overflow-hidden rounded-3xl bg-charcoal shadow-xl aspect-[4/3]">
            {CAROUSEL_IMAGES.map((src, idx) => (
              <motion.img
                key={src}
                src={src}
                alt={`Registro da CUCA ${idx + 1}`}
                initial={false}
                animate={{ 
                  opacity: currentIndex === idx ? 1 : 0, 
                  scale: currentIndex === idx ? 1 : 1.04,
                  zIndex: currentIndex === idx ? 10 : 0
                }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ pointerEvents: currentIndex === idx ? 'auto' : 'none' }}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Right Column: Instagram Feed / Momentos Sagrados */}
      <section className="relative w-full py-16 px-6 md:p-12 lg:p-16 flex flex-col justify-center bg-[#F3EFE6]">
        <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col justify-start space-y-8">
          <div className="space-y-4 border-b border-charcoal/10 pb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-vinho font-bold block">
              Diário Visual & Comunidade
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal leading-tight">
              Acompanhe nossos ritos e estudos no Instagram
            </h2>
            <a 
              href="https://www.instagram.com/cuca_terreirodeumbanda" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex group w-fit items-center gap-3 crystal-card px-5 py-3 rounded-xl"
            >
              <Instagram className="text-vinho" size={18} />
              <span className="text-xs uppercase tracking-widest text-charcoal font-bold">@cuca_terreirodeumbanda</span>
            </a>
          </div>

          <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full justify-items-center">
              <div className="w-full max-w-[280px] sm:max-w-[300px] crystal-card rounded-2xl flex justify-center overflow-hidden">
                <InstagramVideoEmbed htmlSnippet={IG_EMBED_1} />
              </div>
              <div className="w-full max-w-[280px] sm:max-w-[300px] crystal-card rounded-2xl hidden xl:flex justify-center overflow-hidden">
                <InstagramVideoEmbed htmlSnippet={IG_EMBED_2} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const FRENTES_DE_ATENDIMENTO = [
  { 
    title: "Passe Energético", 
    subtitle: "Transmissão Fluídica Silenciosa",
    summary: "Realizado pelos Médiuns de Passe no centro do terreiro para reequilíbrio vibratório imediato, sem necessidade de conversa verbal.",
    icon: Zap,
    points: [
      { label: "Quem realiza", text: "Médiuns de Passe (ou de Meio) incorporados por suas entidades, atuando em silêncio." },
      { label: "Como funciona", text: "Transmissão direta de energia vital através de movimentos serenos que limpam e recompõem seu campo vibratório." },
      { label: "Sua postura", text: "Apenas feche os olhos, descruze braços e pernas, respire fundo e mantenha o pensamento receptivo." }
    ],
    imageSrc: "/Header/Cópia (2).webp"
  },
  { 
    title: "Descarrego", 
    subtitle: "Limpeza Profunda & Libertação",
    summary: "Atuação segura e ordenada dos guias e Médiuns de Transporte para remover cargas densas, sem encenações ou exageros.",
    icon: Shield,
    points: [
      { label: "Quando ocorre", text: "Quando o consulente carrega cargas espirituais densas que exigem limpeza profunda apoiada pelo ponto cantado e atabaques." },
      { label: "Médiuns de Transporte", text: "Atuam como 'ponte' segura para que os guias dirigentes encaminhem espíritos sofredores ou energias estagnadas para a luz." },
      { label: "Regra de Ouro da CUCA", text: "'Descarrego não precisa ser exorcismo.' Tudo ocorre com ordem, amparo e total controle do guia chefe da gira." }
    ],
    imageSrc: "/Header/Cópia (4).webp"
  },
  { 
    title: "Cura Espiritual",
    subtitle: "O Terreiro como Hospital da Alma",
    summary: "Alinhamento entre espírito, mente e corpo físico que caminha lado a lado com a medicina terrena.",
    icon: Heart,
    points: [
      { label: "Tudo está interligado", text: "Muitas dores físicas ou emocionais refletem feridas da alma; o passe reorganiza o campo sutil para favorecer a saúde integral." },
      { label: "Trabalho a quatro mãos", text: "A cura une o amparo dos guias à sua reforma íntima e disposição real de mudar hábitos nocivos." },
      { label: "Ciência e Fé juntas", text: "Jamais substituímos médicos ou psicólogos. O tratamento terreno deve ser mantido; o terreiro atua em paralelo fortalecendo você." }
    ],
    imageSrc: "/Header/Cópia (5).webp"
  },
  {
    title: "Consultas no Toco",
    subtitle: "Aconselhamento Individual",
    summary: "Conversa franca e privativa com a entidade incorporada para clareza moral, fortalecimento e tomada de decisão consciente.",
    icon: Sparkles,
    points: [
      { label: "O propósito do guia", text: "Inspirar reflexão e despertar sua sabedoria interior para que você tome as rédeas da própria vida, sem criar dependência." },
      { label: "Objetividade e Verdade", text: "Vá direto ao ponto que precisa de luz. Não tente 'testar' o guia nem sature a consulta com longos relatos desnecessários." },
      { label: "Um atendimento por gira", text: "Consulte-se apenas uma vez por gira. O segredo não é acumular conselhos, mas colocar a orientação recebida em prática." }
    ],
    imageSrc: "/Header/Cópia (1).webp"
  }
];

const ORIXAS_DATA = [
  { 
    name: "Oxalá", 
    category: "orixa",
    polarity: "Coroa · Princípio Criador",
    color: "#64748B", 
    icon: Bird, 
    shortRole: "Paz profunda, fé, silêncio interior e reconciliação",
    atuacao: "A paz profunda, a fé e a pureza. É a energia que apazigua grandes brigas, acalma corações irados e traz luz divina máxima para onde há caos e escuridão.", 
    mitologia: "O princípio da criação. Associado à sabedoria extrema, à calma e à figura crística (Jesus) no sincretismo. Representa o amor incondicional e o respeito absoluto por todas as criaturas.", 
    efeito: "Traz esperança, tolerância e compaixão. Ajuda a vencer o ódio e o rancor, ensinando que o silêncio, a humildade e o perdão são muito mais fortes do que qualquer vingança.", 
    elementos: "Canjica branca, arroz doce sem tempero, água mineral ou suco de uva verde. Rosas, lírios ou cravos brancos. Velas puramente brancas." 
  },
  { 
    name: "Ogum", 
    category: "orixa",
    polarity: "Força Masculina · Orixá Regente da CUCA",
    color: "#DC2626", 
    icon: Sword, 
    shortRole: "Abertura de caminhos, proteção, ordem e coragem de agir",
    atuacao: "Abertura de caminhos e proteção. É a força que 'corta' a negatividade, organiza a vida e traz ordem onde há confusão. É o Orixá regente do nosso terreiro.",
    mitologia: "O guerreiro e o ferreiro. Aquele que forja suas próprias ferramentas para o trabalho e para a defesa. A energia da ação reta.", 
    efeito: "Traz coragem, atitude e foco. Cura a procrastinação e o medo de agir, ajudando a pessoa a sair da inércia e tomar as rédeas da própria vida.", 
    elementos: "Frutas vermelhas (maçã e melancia), amendoim, cerveja branca. Flores vermelhas ou espadas-de-são-jorge. Velas vermelhas e brancas." 
  },
  { 
    name: "Oxóssi", 
    category: "orixa",
    polarity: "Força Masculina · Sabedoria das Matas",
    color: "#16A34A", 
    icon: ArrowUpRight, 
    shortRole: "Conhecimento, foco certeiro, cura botânica e fartura",
    atuacao: "É a energia que limpa, nutre e cura através da força das matas. Promove o conhecimento, a fartura e a saúde espiritual.",
    mitologia: "O caçador certeiro. Aquele que detém o conhecimento das florestas e usa apenas uma flecha para atingir seu objetivo.", 
    efeito: "Trabalha o foco, a concentração e a intuição. Ajuda a silenciar a ansiedade, estimula os estudos e direciona a pessoa a atingir suas metas com precisão.", 
    elementos: "Frutas verdes (uva, abacate, maracujá), milho cozido, sucos naturais. Samambaias e flores do campo. Velas verdes." 
  },
  { 
    name: "Xangô", 
    category: "orixa",
    polarity: "Força Masculina · Lei e Equilíbrio",
    color: "#78350F", 
    icon: Scale, 
    shortRole: "Justiça divina, equilíbrio racional, maturidade e retidão",
    atuacao: "É a força da justiça, da lei e do equilíbrio. Corta injustiças, protege contra mentiras e 'pesa' nossas atitudes na balança da vida.",
    mitologia: "O rei sábio, o juiz, o senhor do fogo e das pedreiras. Representa uma base sólida que não se abala facilmente pelas dificuldades.", 
    efeito: "Traz maturidade e razão. Ajuda a pessoa a sair da posição de vítima e assumir a responsabilidade pelos próprios atos com firmeza de caráter.", 
    elementos: "Frutas intensas (abacaxi, banana-da-terra), quiabo, cerveja preta. Flores e cravos em tons de marrom ou vinho. Velas marrons." 
  },
  { 
    name: "Omulu", 
    subtitle: "Obaluaiê",
    category: "orixa",
    polarity: "Força Masculina · Cura e Transmutação",
    color: "#1F2937", 
    icon: Cross, 
    shortRole: "Cura profunda do físico e da alma, humildade e renascimento",
    atuacao: "É a força suprema da cura e da transformação. Atua fortemente na restauração da saúde física e espiritual, encerrando momentos de sofrimento agudo.",
    mitologia: "O curador que esconde suas marcas sob as palhas. O senhor da terra que conhece a dor da doença e tem o poder de transformá-la em renascimento.", 
    efeito: "Ajuda a lidar com o luto, dores crônicas e o medo das perdas. Ensina a humildade e desperta uma imensa força de superação.", 
    elementos: "Pipoca estourada na areia ou calor (sem óleo ou sal), água mineral. Flores do campo brancas como margaridas. Velas pretas e brancas." 
  },
  { 
    name: "Iansã", 
    subtitle: "Oyá",
    category: "orixa",
    polarity: "Força Feminina · Ventos e Movimento",
    color: "#EA580C", 
    icon: Tornado, 
    shortRole: "Mudança rápida, coragem para encerrar ciclos e ânimo vital",
    atuacao: "Movimentação e mudança. É a energia que 'varre' as energias estagnadas, corta amarras tóxicas e afasta más influências com grande rapidez.",
    mitologia: "A guerreira valente, senhora dos ventos e das tempestades, dona de uma força indomável que encaminha os espíritos desorientados.", 
    efeito: "Destrói a paralisia, a apatia e o desespero. Traz ânimo, força para recomeçar e coragem para encerrar ciclos que não fazem bem.", 
    elementos: "Acarajé, laranja, maçã vermelha, sucos cítricos. Rosas e flores vermelhas ou laranjas. Velas cor de laranja ou vermelhas e brancas." 
  },
  { 
    name: "Oxum", 
    category: "orixa",
    polarity: "Força Feminina · Águas Doces e Amor",
    color: "#D97706", 
    icon: Droplets, 
    shortRole: "Afeto, união familiar, amor-próprio, diplomacia e prosperidade",
    atuacao: "É a energia da harmonia, do amor e da união. Restaura laços familiares, protege as gestações e atrai prosperidade e caminhos abertos.",
    mitologia: "A senhora das cachoeiras e dos rios de água doce. Representa o afeto materno, a beleza, a diplomacia e a fluidez da vida.", 
    efeito: "Cura carências afetivas e ensina o amor-próprio. Como o rio que contorna a pedra, Oxum ensina flexibilidade e inteligência emocional.", 
    elementos: "Frutas doces (melão, pera), mel, canjica amarela, água mineral. Rosas e girassóis amarelos. Velas amarelas." 
  },
  { 
    name: "Iemanjá", 
    category: "orixa",
    polarity: "Força Feminina · Grande Mãe dos Oceanos",
    color: "#0284C7", 
    icon: Waves, 
    shortRole: "Acolhimento materno, limpeza emocional das mágoas e paz no lar",
    atuacao: "É o amparo universal e a limpeza profunda. Como o mar, lava as mágoas, reconforta o espírito cansado e traz estabilidade para lares em conflito.",
    mitologia: "A grande mãe do universo, senhora dos oceanos. Aquela que acolhe as tristezas e lágrimas do mundo em suas águas, devolvendo calmaria.", 
    efeito: "Trata feridas profundas ligadas à família, rejeição e abandono. Traz um alívio profundo que acalma a mente ansiosa.", 
    elementos: "Manjar de coco branco, frutas claras (uvas verdes, melão), água mineral. Rosas brancas e flores azuis. Velas brancas e azul-claras." 
  },
  { 
    name: "Nanã", 
    subtitle: "Buruquê",
    category: "orixa",
    polarity: "Força Feminina · Sabedoria Ancestral",
    color: "#7E22CE", 
    icon: Leaf, 
    shortRole: "Decantação, paciência, perdão de dores antigas e maturidade",
    atuacao: "É a energia da decantação, da paciência e da sabedoria. Ajuda a desacelerar a vida, fechar ciclos dolorosos e acalmar ambientes endurecidos.",
    mitologia: "A avó divina, a mais velha e sábia. Senhora da lama primordial (encontro da terra com a água). Representa o respeito ao tempo.", 
    efeito: "Cura o excesso de ansiedade e o apego ao passado. Traz o perdão de velhas dores e a paz de compreender que tudo tem sua hora certa.", 
    elementos: "Batata-doce, beterraba cozida, suco de uva integral. Violetas e flores em tons de lilás. Velas lilás." 
  }
];

const LINHAS_TRABALHO_DATA = [
  { 
    name: "Caboclos(as)", 
    category: "direita",
    polarity: "Linha da Direita · Doutrina e Cura",
    color: "#16A34A", 
    icon: SunMoon,
    shortRole: "Passes magnéticos potentes, cura pelas folhas e retidão moral",
    atuacao: "Grandes doutrinadores e curadores da Umbanda. Trabalham com intensa aplicação de passes magnéticos, quebrando feitiçarias e limpando o corpo espiritual com o vigor das folhas.",
    mitologia: "Representam os povos originários do Brasil: o guerreiro e guardião da floresta, imbuído de coragem, comunhão com a mata e palavra reta.",
    efeito: "Cura a estagnação. Insufla no consulente assertividade, foco, coragem de buscar o próprio sustento e reconexão com a natureza.",
    elementos: "Frutas brasileiras vibrantes, ervas maceradas, água de coco, folhagens como samambaia e guiné, e velas verdes ou brancas."
  },
  { 
    name: "Pretos(as) Velhos(as)", 
    category: "direita",
    polarity: "Linha da Direita · Sabedoria e Humildade",
    color: "#78350F", 
    icon: Coffee,
    shortRole: "Benzedura, escuta acolhedora, consolo familiar e paciência",
    atuacao: "Senhores da benzedura e do aconselhamento. Desatam nós familiares, absorvem mágoas profundas e realizam limpezas densas de forma pacífica e contínua.",
    mitologia: "A ancestralidade que venceu a dor pela resiliência do espírito e pelo amor incondicional dos avós. Representam a misericórdia.",
    efeito: "Grandes terapeutas da alma: reduzem a ansiedade, ensinam a paciência, ajudam a elaborar traumas antigos e dissolvem o orgulho pela humildade.",
    elementos: "Café preto, tutu de feijão, rapadura, cocada, suco de milho, cigarro de palha, cravos e margaridas brancas. Velas brancas e pretas."
  },
  { 
    name: "Erês", 
    subtitle: "E Curumins",
    category: "direita",
    polarity: "Linha da Direita · Pureza e Renovação",
    color: "#0D9488", 
    icon: Candy,
    shortRole: "Limpeza veloz pela alegria, leveza e reconexão com a criança interior",
    atuacao: "Promovem uma assepsia energética extremamente veloz, purificando ambientes densos com vibrações de alta frequência, alegria e verdade.",
    mitologia: "O espírito encantado e a alma infantil pura; seres da natureza que manifestam a bondade sem máscaras.",
    efeito: "Desarmam a seriedade excessiva, a melancolia e o desespero adulto, devolvendo otimismo, leveza e esperança.",
    elementos: "Doces caseiros, bolos simples, balas de frutas, sucos naturais e flores coloridas. Velas brancas, azuis ou cor-de-rosa."
  },
  { 
    name: "Baianos", 
    subtitle: "E Zé Pelintra",
    category: "neutra",
    polarity: "Linhas Neutras · Jogo de Cintura e Fé",
    color: "#D97706", 
    icon: Drum,
    shortRole: "Superação de dificuldades materiais, resiliência alegre e abertura de portas",
    atuacao: "Quebradores de magias e removedores de obstáculos densos. Excelentes orientadores para as lutas de sobrevivência material e situações enroladas.",
    mitologia: "A sagacidade e a resistência do povo brasileiro que enfrenta as agruras do destino sem perder a fé, a dignidade e o sorriso.",
    efeito: "Ensinam o verdadeiro 'jogo de cintura', ajudando o consulente a sair da vitimização e encarar a vida com coragem prática.",
    elementos: "Coco, amendoim, aipim, água de coco, batidas, rosas vermelhas e brancas. Velas brancas ou vermelhas e brancas."
  },
  { 
    name: "Marinheiros", 
    category: "neutra",
    polarity: "Linhas Neutras · Povo d'Água",
    color: "#2563EB", 
    icon: Anchor,
    shortRole: "Limpeza de angústias, equilíbrio emocional nas tormentas e desapego",
    atuacao: "Associados a Iemanjá e aos domínios do mar, lavam angústias, ilusões e desespero, estabilizando tonturas energéticas da alma.",
    mitologia: "O navegador que balança ao ritmo das ondas bravias, mas nunca cai e jamais perde o leme da vida.",
    efeito: "Trabalham nossa capacidade de soltar o que não podemos controlar, permitindo que a emoção flua e lave o coração.",
    elementos: "Frutas aquosas e claras (uvas, peras, melão), água mineral, rosas brancas ou flores azuis. Velas azuis e brancas."
  },
  { 
    name: "Boiadeiros", 
    category: "neutra",
    polarity: "Linhas Neutras · Força do Sertão",
    color: "#B45309", 
    icon: Lasso,
    shortRole: "Foco, firmeza de propósito, proteção do lar e recolhimento de obsessores",
    atuacao: "Especialistas em laçar, conter e encaminhar espíritos sofredores e desorganizados, trabalhando sob a disciplina cabocla.",
    mitologia: "O homem do sertão, de trato direto e firme como o chão batido, que traz no laço sua ferramenta de ordem espiritual.",
    efeito: "Reúne as energias do consulente que estavam dispersas por confusão mental, devolvendo foco e vontade férrea de caminhar.",
    elementos: "Broa de milho, curau, pamonha, café preto quente, flores do campo. Velas amarelas e pretas ou brancas."
  },
  { 
    name: "Ciganos", 
    category: "neutra",
    polarity: "Linhas Neutras · Povo do Oriente",
    color: "#C026D3", 
    icon: Spade,
    shortRole: "Intuição, liberdade criativa, prosperidade e cura pelas essências",
    atuacao: "Trabalham as linhas da intuição, da abertura de caminhos comerciais e afetivos e da cura vibratória por cristais, fogo e perfumes.",
    mitologia: "O povo livre que celebra a existência, guardião dos saberes nômades, da alegria e da leitura espiritual dos caminhos.",
    efeito: "Libertam do medo da mudança, estimulam o senso de merecimento e despertam a alegria de viver.",
    elementos: "Frutas doces e perfumadas (maçãs, uvas, pêssegos), vinho ou suco de uva, mel, rosas vermelhas, incensos e velas coloridas."
  },
  { 
    name: "Médicos", 
    subtitle: "Orientais / Cura",
    category: "neutra",
    polarity: "Linhas Neutras · Medicina Astral",
    color: "#7C3AED", 
    icon: Activity,
    shortRole: "Reestruturação celular fluídica, alinhamento de chakras e paz mental",
    atuacao: "Atuam na remoção sutil de miasmas incrustados no perispírito, desobstrução de meridianos energéticos e passes cirúrgicos espirituais.",
    mitologia: "Médicos e sábios orientais/ocidentais que aliaram a ciência curativa à manipulação fluídica do plano espiritual.",
    efeito: "Induzem profunda paz, centramento, relaxamento do corpo astral e silenciamento do ruído mental crônico.",
    elementos: "Água mineral pura, flores brancas ou violetas, incensos de sândalo ou lótus e velas brancas."
  },
  { 
    name: "Simiromba", 
    subtitle: "Monges / Franciscanos",
    category: "neutra",
    polarity: "Linhas Neutras · Fraternidade Cristã",
    color: "#64748B", 
    icon: Cross,
    shortRole: "Desapego da vaidade, oração silenciosa e elevação coletiva",
    atuacao: "Trabalham em altíssima oitava vibracional ligada à Caridade Universal, à prece silenciosa e à elevação moral do grupo.",
    mitologia: "Monges franciscanos e velhos frades que simbolizam a simplicidade última da fé e o serviço despido de vaidade.",
    efeito: "Desarmam o materialismo e o orgulho, convidando à fraternidade sincera e à serenidade interior.",
    elementos: "Pão repartido, quartzo branco, água pura, incenso de olíbano e velas brancas simples."
  },
  { 
    name: "Exus e Pombagiras", 
    subtitle: "Guardiões da Esquerda",
    category: "esquerda",
    polarity: "Linha de Esquerda · Guardiões da Lei e Vitalidade",
    color: "#991B1B", 
    icon: Flame,
    shortRole: "Defesa da tronqueira, quebra de demandas, autoestima e verdade sem máscaras",
    atuacao: "Executores da Lei e guardiões da vitalidade. Desmancham magias negativas, rompem demandas, abrem caminhos terrenos e protegem o terreiro.",
    mitologia: "Espíritos francos e libertos da hipocrisia humana que atuam nas encruzilhadas e na escuridão para defender a luz e a verdade.",
    efeito: "Curam a baixa autoestima, a apatia depressiva e as ilusões afetivas, ensinando limites claros e empoderamento real.",
    elementos: "Padê (farofa), bebidas rituais, charutos/cigarrilhas, maçãs vermelhas, rosas vermelhas e velas pretas e vermelhas."
  }
];

export default function App() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeView, setActiveView] = useState<ViewId>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Modals & Interactive States
  const [selectedEntity, setSelectedEntity] = useState<any | null>(null);
  const [orixaFilter, setOrixaFilter] = useState<'all' | 'orixa' | 'direita' | 'neutra' | 'esquerda'>('all');
  const [orixaSearch, setOrixaSearch] = useState('');
  const [expandedServiceIndex, setExpandedServiceIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Copy states
  const [copiedPix, setCopiedPix] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Visitor & Medium interactive checklists
  const [visitorStepIndex, setVisitorStepIndex] = useState(0);
  const [mediumStepsExpandedAll, setMediumStepsExpandedAll] = useState(false);
  const [openMediumSteps, setOpenMediumSteps] = useState<Record<number, boolean>>({ 0: true });
  const [completedMediumSteps, setCompletedMediumSteps] = useState<Record<number, boolean>>({});
  const [hoveredHomeTimelineIdx, setHoveredHomeTimelineIdx] = useState<number>(6);

  useEffect(() => {
    setIsScrolled(false);
    setOpenDropdownId(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
    const containers = document.querySelectorAll('.overflow-y-auto');
    containers.forEach(container => {
      container.scrollTop = 0;
    });
  }, [activeView]);

  // Keyboard shortcut Ctrl+K / Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setOpenDropdownId(null);
        setSelectedEntity(null);
        setExpandedServiceIndex(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavClick = (viewId: string, sectionId?: string) => {
    setOpenDropdownId(null);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);

    if (activeView === viewId) {
      if (sectionId) {
        setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 60);
      } else {
        const containers = document.querySelectorAll('.overflow-y-auto');
        containers.forEach(container => {
          container.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    } else {
      setActiveView(viewId as ViewId);
      if (sectionId) {
        setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 150);
      }
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScroll = e.currentTarget.scrollTop;
    if (currentScroll > 20 && !isScrolled) {
      setIsScrolled(true);
    } else if (currentScroll <= 20 && isScrolled) {
      setIsScrolled(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus('error');
      return;
    }
    setTimeout(() => {
      setFormStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 600);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('correntedeakuan@gmail.com');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('Av. Prefeito Maurício Fruet, 1230 - Jardim Botânico, Curitiba - PR');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  const allEntitiesCombined = useMemo(() => [...ORIXAS_DATA, ...LINHAS_TRABALHO_DATA], []);

  const filteredOrixas = useMemo(() => {
    if (orixaFilter !== 'all' && orixaFilter !== 'orixa') return [];
    const q = orixaSearch.trim().toLowerCase();
    if (!q) return ORIXAS_DATA;
    return ORIXAS_DATA.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.shortRole.toLowerCase().includes(q) ||
        item.atuacao.toLowerCase().includes(q) ||
        item.elementos.toLowerCase().includes(q)
    );
  }, [orixaFilter, orixaSearch]);

  const filteredLinhas = useMemo(() => {
    if (orixaFilter === 'orixa') return [];
    const q = orixaSearch.trim().toLowerCase();
    return LINHAS_TRABALHO_DATA.filter((item) => {
      if (orixaFilter !== 'all' && item.category !== orixaFilter) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.shortRole.toLowerCase().includes(q) ||
        item.atuacao.toLowerCase().includes(q) ||
        item.elementos.toLowerCase().includes(q)
      );
    });
  }, [orixaFilter, orixaSearch]);

  const selectedEntityIndex = useMemo(() => {
    if (!selectedEntity) return -1;
    return allEntitiesCombined.findIndex((e) => e.name === selectedEntity.name);
  }, [selectedEntity, allEntitiesCombined]);

  const globalSearchResults = useMemo(() => {
    const q = globalSearchQuery.trim().toLowerCase();
    if (!q) return QUICK_SEARCH_INDEX;
    return QUICK_SEARCH_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );
  }, [globalSearchQuery]);

  const toggleMediumStep = (idx: number) => {
    setOpenMediumSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleToggleAllMediumSteps = () => {
    const nextState = !mediumStepsExpandedAll;
    setMediumStepsExpandedAll(nextState);
    if (nextState) {
      setOpenMediumSteps({ 0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true });
    } else {
      setOpenMediumSteps({ 0: true });
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full selection:bg-vinho selection:text-white overflow-hidden bg-[#FBF9F5]">
      {/* =================================================================
          TOP NAVIGATION BAR IN LIQUID CRYSTAL (3 ZONES, GROUPED CATEGORIES)
          ================================================================= */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center gap-8 px-6 md:px-12 transition-all duration-300 crystal-pill border-b border-vinho/10 ${
          isScrolled ? 'h-16 md:h-20 shadow-sm' : 'h-20 md:h-24'
        }`}
      >
        {/* Zone 1: Brand Wordmark */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center h-full py-2.5 cursor-pointer group gap-3.5 whitespace-nowrap shrink-0 text-left"
        >
          <div className="h-11 w-11 md:h-12 md:w-12 relative flex items-center justify-center rounded-full overflow-hidden border border-vinho/15 bg-white p-0.5 shrink-0 shadow-xs">
            <img 
              src="/Logos/logotransparente.png" 
              alt="Logo CUCA" 
              className="h-full w-full object-contain rounded-full group-hover:scale-105 transition-transform" 
            />
          </div>
          <div className="hidden sm:flex h-11 items-center">
            <img 
              src="/Logos/Textoheader.png" 
              alt="Casa de Umbanda Corrente de Akuan" 
              className="h-full w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity" 
            />
          </div>
        </button>
        
        {/* Zone 2: Grouped Navigation Links (4 concise items) */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-bold text-charcoal">
          <button
            onClick={() => handleNavClick('home')}
            className={`py-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 relative ${
              activeView === 'home' ? 'text-vinho' : 'text-charcoal/75 hover:text-vinho'
            }`}
          >
            Início
            {activeView === 'home' && (
              <motion.span
                layoutId="topNavActiveUnderline"
                transition={SPRING_TRANSITION}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-vinho"
              />
            )}
          </button>

          {NAV_GROUPS.map((group) => {
            const isGroupActive = group.items.some((item) => item.id === activeView);
            const isOpen = openDropdownId === group.id;
            const activeSubItem = group.items.find((item) => item.id === activeView);

            return (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => setOpenDropdownId(group.id)}
                onMouseLeave={() => setOpenDropdownId(null)}
              >
                <button
                  onClick={() => setOpenDropdownId(isOpen ? null : group.id)}
                  className={`flex items-center gap-1.5 py-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 relative ${
                    isGroupActive ? 'text-vinho' : 'text-charcoal/75 hover:text-vinho'
                  }`}
                >
                  <span>{activeSubItem ? `${group.label} · ${activeSubItem.label}` : group.label}</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-vinho' : ''}`} />
                  {isGroupActive && (
                    <motion.span
                      layoutId="topNavActiveUnderline"
                      transition={SPRING_TRANSITION}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-vinho"
                    />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={SPRING_TRANSITION}
                      className="absolute left-0 top-full pt-2 w-80 z-50"
                    >
                      <div className="crystal-pill rounded-2xl p-2.5 space-y-1">
                        {group.items.map((sub) => {
                          const isSubActive = activeView === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleNavClick(sub.id)}
                              className={`w-full text-left p-3 rounded-xl transition-colors cursor-pointer flex items-start justify-between gap-3 group/item ${
                                isSubActive
                                  ? 'bg-vinho text-white'
                                  : 'hover:bg-[#F3EFE6]/80 text-charcoal'
                              }`}
                            >
                              <div className="space-y-1">
                                <span className={`block text-xs uppercase tracking-[0.18em] font-bold ${
                                  isSubActive ? 'text-white' : 'text-charcoal group-hover/item:text-vinho'
                                }`}>
                                  {sub.label}
                                </span>
                                <span className={`block text-[11px] normal-case tracking-normal font-normal leading-snug ${
                                  isSubActive ? 'text-white/80' : 'text-charcoal/65'
                                }`}>
                                  {sub.desc}
                                </span>
                              </div>
                              <ChevronRight size={14} className={`shrink-0 mt-0.5 ${isSubActive ? 'text-[#C0A080]' : 'text-vinho/40 group-hover/item:text-vinho'}`} />
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <button
            onClick={() => setIsSearchOpen(true)}
            className="inline-flex items-center gap-1.5 text-charcoal/70 hover:text-vinho transition-colors py-2 cursor-pointer whitespace-nowrap shrink-0"
            title="Buscar no site (Ctrl+K)"
          >
            <Search size={15} />
            <span>Buscar</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => handleNavClick('home', 'contato')} 
            className="hidden lg:inline-flex items-center gap-2 bg-vinho hover:bg-[#851414] text-white px-6 py-3 rounded-xl text-xs uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
          >
            Visitar / Contato
          </button>

          {/* Mobile Search & Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-charcoal hover:bg-vinho/5 rounded-full transition-colors cursor-pointer"
              aria-label="Buscar no site"
            >
              <Search size={20} />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-charcoal p-2.5 hover:bg-vinho/5 rounded-full transition-colors relative z-[60] cursor-pointer"
              aria-label="Abrir Menu"
            >
              {isMobileMenuOpen ? <X size={26} strokeWidth={1.75} /> : <Menu size={26} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </header>

      {/* =================================================================
          GLOBAL SEARCH MODAL IN CRYSTAL (BUSCA RÁPIDA EM TODO O PORTAL)
          ================================================================= */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 z-[90] bg-[#1C1917]/75 backdrop-blur-md flex items-start justify-center pt-24 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={SPRING_TRANSITION}
              onClick={(e) => e.stopPropagation()}
              className="crystal-pill w-full max-w-2xl rounded-3xl overflow-hidden"
            >
              <div className="p-4 border-b border-charcoal/10 flex items-center gap-3 bg-white/80">
                <Search size={18} className="text-vinho shrink-0 ml-2" />
                <input
                  type="text"
                  autoFocus
                  value={globalSearchQuery}
                  onChange={(e) => setGlobalSearchQuery(e.target.value)}
                  placeholder="O que você procura? (Ex: Primeira vez, Arruda, Caboclo Akuan, PIX, Horário...)"
                  className="w-full py-2 text-sm md:text-base text-charcoal placeholder:text-charcoal/45 focus:outline-none bg-transparent"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1.5 text-charcoal/50 hover:text-charcoal rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[65vh] overflow-y-auto p-3 space-y-1.5">
                {globalSearchResults.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleNavClick(item.view, item.sectionId)}
                    className="w-full text-left p-3.5 rounded-2xl hover:bg-[#F3EFE6]/85 transition-colors flex items-center justify-between gap-4 group cursor-pointer"
                  >
                    <div>
                      <h4 className="font-serif text-lg text-charcoal group-hover:text-vinho font-medium">
                        {item.title}
                      </h4>
                      <p className="text-xs text-charcoal/65 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-vinho/40 group-hover:text-vinho group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================================
          MOBILE MENU OVERLAY IN CRYSTAL
          ================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={SPRING_TRANSITION}
            className="fixed inset-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-xl pt-24 pb-10 px-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="space-y-8">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left font-serif text-2xl pb-3 border-b border-vinho/10 flex items-center justify-between ${
                  activeView === 'home' ? 'text-vinho font-medium' : 'text-charcoal'
                }`}
              >
                <span>Início & Agenda</span>
                <ArrowRight size={18} />
              </button>

              {NAV_GROUPS.map((group) => (
                <div key={group.id} className="space-y-3">
                  <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-vinho block">
                    {group.label}
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {group.items.map((item) => {
                      const active = activeView === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full text-left p-4 rounded-2xl transition-all ${
                            active
                              ? 'bg-vinho text-white shadow-md'
                              : 'crystal-card text-charcoal'
                          }`}
                        >
                          <div className="font-serif text-lg">{item.label}</div>
                          <div className={`text-xs mt-0.5 ${active ? 'text-white/80' : 'text-charcoal/65'}`}>
                            {item.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  onClick={() => handleNavClick('visitor')} 
                  className="w-full text-center text-xs uppercase font-bold tracking-[0.2em] crystal-card py-4 rounded-xl text-vinho"
                >
                  Primeira Vez?
                </button>
                <button 
                  onClick={() => handleNavClick('home', 'contato')} 
                  className="w-full text-center text-xs uppercase font-bold tracking-[0.2em] bg-vinho text-white py-4 rounded-xl shadow-md"
                >
                  Visitar / Contato
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================================
          MAIN CONTENT AREA
          ================================================================= */}
      <main className="flex-1 flex flex-col relative w-full h-full overflow-hidden bg-[#FBF9F5]">
        <AnimatePresence mode="wait">
          {/* --- VIEW: GUIAS DIRIGENTES --- */}
          {activeView === 'guias' && (
            <GuiasDirigentesView 
              key="guias" 
              onBack={() => handleNavClick('history')} 
              onNavigate={handleNavClick}
            />
          )}

          {/* --- VIEW: HISTORY (COM LINHA DO TEMPO INTERATIVA DA FUNDAÇÃO) --- */}
          {activeView === 'history' && (
            <HistoryView 
              handleScroll={handleScroll} 
              onNavigateAkuan={() => handleNavClick('guias')} 
              onNavigate={handleNavClick}
            />
          )}

          {/* --- VIEW: ERVAS (MAGIA BOTÂNICA) --- */}
          {activeView === 'ervas' && (
            <ErvasView 
              onScroll={handleScroll} 
              onNavigate={handleNavClick}
            />
          )}

          {/* --- VIEW: GUIDE (REGIMENTO E DOCUMENTOS) --- */}
          {activeView === 'guide' && (
            <GuideView 
              key="guide" 
              onScroll={handleScroll} 
              onNavigate={handleNavClick}
            />
          )}

          {/* --- VIEW: HOME (INÍCIO) --- */}
          {activeView === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={SPRING_TRANSITION}
              onScroll={handleScroll}
              className="w-full h-full flex flex-col overflow-y-auto overscroll-none bg-[#FBF9F5]"
            >
              {/* HERO SECTION */}
              <section className="relative flex flex-col min-h-[720px] border-b border-vinho/10 overflow-hidden bg-[#FBF9F5]">
                <div className="absolute inset-0 z-0 flex pointer-events-none">
                  {/* Left Side: Video */}
                  <div className="absolute left-0 top-0 w-full md:w-1/2 h-full overflow-hidden">
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover grayscale opacity-65"
                    >
                      <source src="/Videos/M%C3%A3osdadas.webm" type="video/webm" />
                      <source src="/Videos/Mãosdadas.webm" type="video/webm" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FBF9F5]/60 to-[#FBF9F5]"></div>
                  </div>
                  
                  {/* Right Side: Logo */}
                  <div className="absolute right-0 top-0 hidden md:flex w-1/2 h-full items-center justify-center overflow-hidden bg-[#FBF9F5]">
                     <img src="/Logos/logotransparente.png" alt="" className="w-[55%] h-auto max-w-lg object-contain opacity-15 transform translate-x-8" />
                     <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#FBF9F5]/50 to-[#FBF9F5]"></div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-b from-[#FBF9F5]/20 via-[#FBF9F5]/55 to-[#FBF9F5]"></div>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center text-center px-6 md:px-12 z-10 pt-36 pb-16 relative max-w-5xl mx-auto">
                  <motion.div 
                    initial={{ y: 24, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={SPRING_TRANSITION}
                    className="flex flex-col items-center justify-center mb-10"
                  >
                    <span className="inline-block font-sans font-bold text-xs uppercase tracking-[0.28em] text-vinho mb-8">
                      Casa de Umbanda Corrente de Akuan · Curitiba, PR
                    </span>
                    <h1 className="font-ailerons font-light text-7xl sm:text-9xl md:text-[9.5rem] lg:text-[11rem] text-charcoal leading-none tracking-widest -my-6 ml-3">
                      CUCA
                    </h1>
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ ...SPRING_TRANSITION, delay: 0.12 }}
                    className="text-lg md:text-2xl max-w-3xl mx-auto mb-10 font-serif text-charcoal/85 leading-relaxed font-light"
                  >
                    A Casa de Umbanda Corrente de Akuan é, antes de tudo, um lar. Um refúgio para os desamparados e um abrigo para quem anseia beber do Sagrado. Acreditamos em uma Umbanda que é ponte entre mundos, alento do enfermo e escola viva de fraternidade.
                  </motion.p>

                  {/* Hero Quick Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...SPRING_TRANSITION, delay: 0.22 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                  >
                    <button
                      onClick={() => handleNavClick('visitor')}
                      className="px-7 py-4 bg-vinho hover:bg-[#851414] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2.5"
                    >
                      <span>Sua Primeira Vez? Comece Aqui</span>
                      <ArrowRight size={15} />
                    </button>
                    <button
                      onClick={() => handleNavClick('home', 'calendario')}
                      className="px-7 py-4 crystal-card text-charcoal text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Ver Calendário de Giras
                    </button>
                  </motion.div>
                </div>

                {/* Operational Utility Ribbon */}
                <div className="relative z-10 bg-[#1C1917] text-[#FBF9F5] border-t border-[#C0A080]/25 px-6 py-4">
                  <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <span className="inline-flex items-center gap-2">
                        <Clock size={14} className="text-[#C0A080]" />
                        <span><strong className="text-white">Giras de Atendimento:</strong> Segundas-feiras às 19h30</span>
                      </span>
                      <span className="hidden md:inline text-white/30">·</span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin size={14} className="text-[#C0A080]" />
                        <span>Av. Pref. Maurício Fruet, 1230 · Jardim Botânico</span>
                      </span>
                      <span className="hidden lg:inline text-white/30">·</span>
                      <span className="inline-flex items-center gap-2 text-[#C0A080] font-medium">
                        <Heart size={14} />
                        <span>Passes e Consultas 100% Gratuitos</span>
                      </span>
                    </div>
                    <button
                      onClick={() => handleNavClick('home', 'contato')}
                      className="text-[#C0A080] hover:text-white uppercase tracking-widest font-bold cursor-pointer underline underline-offset-4"
                    >
                      Como Chegar →
                    </button>
                  </div>
                </div>
              </section>

              {/* PORTAL DE ACESSO RÁPIDO EM CRISTAL */}
              <section className="py-20 px-6 md:px-12 bg-[#F3EFE6] border-b border-vinho/10">
                <div className="max-w-6xl mx-auto space-y-10">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase tracking-[0.25em] text-vinho font-bold block mb-2">
                        Guia de Navegação Rápida
                      </span>
                      <h2 className="text-3xl md:text-4xl font-serif text-charcoal">
                        O que você deseja conhecer hoje?
                      </h2>
                    </div>
                    <p className="text-sm text-charcoal/70 max-w-md">
                      Explore nossos guias práticos para visitantes, o herbário de folhas sagradas, os fundamentos dos Orixás e a história da nossa linhagem.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        id: 'visitor' as ViewId,
                        kicker: 'Para Consulentes',
                        title: 'Primeira Vez no Terreiro?',
                        desc: 'O que vestir, como funciona o passe, a consulta no toco e nossas orientações de ouro.',
                        cta: 'Ver Guia do Visitante'
                      },
                      {
                        id: 'ervas' as ViewId,
                        kicker: 'Herbário Interativo',
                        title: 'Ervas Sagradas & Banhos',
                        desc: 'Catálogo ilustrado dos 4 elementos com fotos ao lado de cada erva, cores e preparo.',
                        cta: 'Explorar as 16 Ervas'
                      },
                      {
                        id: 'orixas' as ViewId,
                        kicker: 'Forças da Natureza',
                        title: 'Orixás e Linhas de Trabalho',
                        desc: 'Compreenda como atuam os 9 Orixás e as 10 linhas de entidades em nossa casa.',
                        cta: 'Conhecer Orixás'
                      },
                      {
                        id: 'guias' as ViewId,
                        kicker: 'A Corrente Espiritual',
                        title: 'Caboclo Akuan & Mentores',
                        desc: 'Conheça o patrono geral da CUCA e os 12 Guias Dirigentes das nossas giras.',
                        cta: 'Conhecer os Guias'
                      }
                    ].map((card) => (
                      <motion.div
                        key={card.id}
                        whileHover={{ y: -5 }}
                        transition={SPRING_TRANSITION}
                        onClick={() => handleNavClick(card.id)}
                        className="crystal-card p-6 rounded-3xl cursor-pointer flex flex-col justify-between gap-6 group"
                      >
                        <div className="space-y-2.5">
                          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-vinho">
                            {card.kicker}
                          </span>
                          <h3 className="text-xl font-serif text-charcoal group-hover:text-vinho transition-colors">
                            {card.title}
                          </h3>
                          <p className="text-xs md:text-sm text-charcoal/75 leading-relaxed">
                            {card.desc}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-charcoal/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-vinho">
                          <span>{card.cta}</span>
                          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* NOSSAS RAÍZES (3 TRONCOS DA LINHAGEM + LINHA DO TEMPO INTERATIVA) */}
              <section className="py-24 px-6 md:px-12 bg-[#FBF9F5] relative overflow-hidden border-b border-vinho/10">
                <div className="max-w-6xl mx-auto space-y-16 relative z-10">
                  <div className="text-center max-w-3xl mx-auto space-y-3">
                    <span className="text-xs uppercase tracking-[0.28em] text-vinho font-bold block">
                      Nossa Jornada & Ancestralidade
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-charcoal">
                      Três gerações de uma Umbanda Pés no Chão
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {[
                      { 
                        step: "01 · A Semente (1987)",
                        title: "Pai Fernando de Ogum", 
                        subtitle: "Terreiro do Pai Maneco",
                        desc: "Fundador do Terreiro do Pai Maneco, plantou a semente de uma Umbanda pé no chão, simples, fraterna e sem mistificações.",
                        img: "/Untitled image(2).png",
                        imgClass: "right-0 bottom-0 w-[130%] h-[92%]"
                      },
                      { 
                        step: "02 · O Crescimento (2017)",
                        title: "Pai Léo de Oxóssi", 
                        subtitle: "Terreiro Filhos do Sol",
                        desc: "Nutriu e expandiu essa herança espiritual no Terreiro Filhos do Sol com sabedoria, dinamismo e disciplina mediúnica.",
                        img: "/Untitled image(4).png",
                        imgClass: "-right-[55px] bottom-[12%] w-[260%] h-[195%]"
                      },
                      { 
                        step: "03 · O Legado (2025)",
                        title: "Pai João Lucas de Ogum", 
                        subtitle: "Casa de Umbanda Corrente de Akuan",
                        desc: "Sob a luz e regência direta do Caboclo Akuan, ergue a CUCA como um novo tronco de caridade, acolhimento e estudo.",
                        img: "/paijoao.png",
                        imgClass: "-right-[12%] -bottom-[5%] w-[140%] h-[92%]"
                      }
                    ].map((root, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ y: 24, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        whileHover={{ y: -5 }}
                        viewport={{ once: true }}
                        transition={{ ...SPRING_TRANSITION, delay: i * 0.08 }}
                        onClick={() => handleNavClick('history')}
                        className="flex flex-col justify-between min-h-[480px] relative overflow-hidden group cursor-pointer crystal-card rounded-3xl p-7"
                      >
                        {root.img && (
                          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-multiply opacity-80">
                            <img 
                              src={root.img} 
                              className={`absolute ${root.imgClass} object-contain object-right-bottom transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105 origin-bottom-right`} 
                              alt={root.title} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
                          </div>
                        )}
                        <div className="relative z-10 space-y-1">
                          <span className="text-xs text-vinho font-bold uppercase tracking-[0.2em] block">
                            {root.step}
                          </span>
                          <h3 className="font-serif text-2xl md:text-3xl text-charcoal">
                            {root.title}
                          </h3>
                          <p className="text-xs uppercase tracking-widest text-charcoal/55 font-semibold">
                            {root.subtitle}
                          </p>
                        </div>

                        <div className="text-sm md:text-base text-charcoal/85 leading-relaxed mt-auto relative z-10 crystal-pill p-5 rounded-2xl">
                          {root.desc}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Interactive Mini-Preview of the Foundation Timeline (Mouse & Click Responsive) */}
                  <div className="crystal-panel p-6 md:p-8 rounded-3xl space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-vinho block">
                          Linha do Tempo Interativa da Fundação (1987 — 2025)
                        </span>
                        <h3 className="text-2xl font-serif text-charcoal">
                          Passe o mouse pelas 7 etapas ou explore a linha do tempo completa
                        </h3>
                      </div>
                      <button
                        onClick={() => handleNavClick('history')}
                        className="px-6 py-3 bg-vinho hover:bg-[#851414] text-white uppercase tracking-[0.2em] text-xs font-bold rounded-xl transition-colors shadow-sm inline-flex items-center gap-2.5 group cursor-pointer self-start md:self-auto shrink-0"
                      >
                        <span>Abrir Linha do Tempo Completa</span>
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                      {[
                        { year: "1987", label: "Pai Maneco", detail: "Pai Fernando de Ogum e o Caboclo Akuan fundam o Terreiro do Pai Maneco." },
                        { year: "2009", label: "Iniciação", detail: "Pai João realiza seu Amaci aos 15 anos na gira de segunda-feira." },
                        { year: "2017", label: "Filhos do Sol", detail: "Abertura do Terreiro Filhos do Sol sob direção de Pai Léo de Oxóssi." },
                        { year: "2022", label: "Coroação", detail: "Pai João é coroado Pai Pequeno e inicia a condução da Gira de Segunda." },
                        { year: "Maio 2025", label: "A Profecia", detail: "Pai Joaquim de Angola anuncia que a nova casa nasceria junto a uma Aroeira." },
                        { year: "Jun 2025", label: "A Aroeira", detail: "O imóvel com a Aroeira plantada na frente é encontrado em menos de 24 horas." },
                        { year: "01 Set 2025", label: "Inauguração", detail: "A CUCA abre suas portas no exato dia do aniversário de Pai Fernando de Ogum." },
                      ].map((m, idx) => {
                        const isHovered = hoveredHomeTimelineIdx === idx;
                        return (
                          <button
                            key={m.year}
                            onMouseEnter={() => setHoveredHomeTimelineIdx(idx)}
                            onClick={() => handleNavClick('history')}
                            className={`relative p-3.5 rounded-2xl text-left transition-all cursor-pointer ${
                              isHovered
                                ? 'text-white shadow-md'
                                : 'crystal-card text-charcoal hover:text-vinho'
                            }`}
                          >
                            {isHovered && (
                              <motion.span
                                layoutId="homeTimelinePreviewPill"
                                transition={SPRING_TRANSITION}
                                className="absolute inset-0 rounded-2xl bg-vinho"
                              />
                            )}
                            <span className={`relative z-10 font-mono text-[11px] font-bold block ${isHovered ? 'text-[#C0A080]' : 'text-vinho'}`}>
                              {m.year}
                            </span>
                            <span className="relative z-10 font-serif text-base font-medium block mt-0.5 truncate">
                              {m.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="crystal-card p-4 md:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <p className="text-sm md:text-base font-serif text-charcoal/90">
                        <strong className="text-vinho font-sans text-xs uppercase tracking-widest mr-2">
                          Marco 0{hoveredHomeTimelineIdx + 1}:
                        </strong>
                        {[
                          "Pai Fernando de Ogum e o Caboclo Akuan fundam o Terreiro do Pai Maneco, plantando a semente da caridade sem mistificações.",
                          "Pai João realiza seu Amaci aos 15 anos na gira de segunda-feira, iniciando sua caminhada mediúnica.",
                          "Abertura do Terreiro Filhos do Sol sob direção de Pai Léo de Oxóssi, expandindo nossa árvore espiritual.",
                          "Pai João é coroado Pai Pequeno e inicia a condução da Gira de Segunda sob a luz direta do Caboclo Akuan.",
                          "Pai Joaquim de Angola anuncia em terra que a nova casa nasceria sob a proteção de uma árvore Aroeira.",
                          "O imóvel atual com a Aroeira plantada bem na entrada é encontrado em menos de 24 horas após o anúncio.",
                          "Em 1º de setembro de 2025 — aniversário de Pai Fernando de Ogum — a CUCA realiza sua gira inaugural."
                        ][hoveredHomeTimelineIdx]}
                      </p>
                      <button
                        onClick={() => handleNavClick('history')}
                        className="text-xs uppercase tracking-widest font-bold text-vinho hover:underline shrink-0 cursor-pointer"
                      >
                        Ver na Linha do Tempo →
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* MISSÃO E VALORES EM CRISTAL */}
              <section className="py-20 px-6 md:px-12 bg-[#F3EFE6] border-b border-vinho/10">
                <div className="max-w-6xl mx-auto space-y-14">
                  <div className="text-center max-w-3xl mx-auto space-y-3">
                    <span className="text-xs uppercase tracking-[0.28em] text-vinho font-bold block">
                      Missão e Valores
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-charcoal">
                      Uma Umbanda simples, acolhedora e profunda
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { title: "Caridade", subtitle: "A Pureza do Erê", desc: "Atendimento totalmente gratuito, ouvido atento e gesto solidário a quem bate à nossa porta." },
                      { title: "Disciplina", subtitle: "A Retidão do Caboclo", desc: "Zelo, pontualidade e respeito absoluto ao fundamento. Onde há ordem, a espiritualidade flui sem barreiras." },
                      { title: "Ética", subtitle: "A Sabedoria do Preto-Velho", desc: "Sigilo absoluto, transparência e respeito às diferenças. Nossa fé é ponte, jamais muro." }
                    ].map((value, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -4 }}
                        transition={SPRING_TRANSITION}
                        className="crystal-card p-8 rounded-3xl space-y-4 text-center"
                      >
                        <span className="text-xs uppercase tracking-[0.22em] font-bold text-vinho block">
                          {value.subtitle}
                        </span>
                        <h3 className="text-2xl font-serif text-charcoal">
                          {value.title}
                        </h3>
                        <div className="w-12 h-px bg-vinho/25 mx-auto"></div>
                        <p className="text-sm md:text-base text-charcoal/80 leading-relaxed font-serif">
                          {value.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CALENDÁRIO DE GIRAS */}
              <section id="calendario" className="scroll-mt-24 py-20 px-6 md:px-12 bg-[#FBF9F5]">
                <div className="max-w-6xl mx-auto space-y-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase tracking-[0.28em] text-vinho font-bold block mb-2">
                        Programação Oficial
                      </span>
                      <h2 className="text-3xl md:text-4xl font-serif text-charcoal">
                        Calendário de Giras e Trabalhos
                      </h2>
                    </div>
                    <p className="text-sm text-charcoal/70">
                      Nossas giras regulares de atendimento ocorrem às <strong>segundas-feiras, às 19h30</strong>.
                    </p>
                  </div>
                  <CalendarEmbed />
                </div>
              </section>

              {/* MEDIA & INSTAGRAM */}
              <MediaSection />

              {/* VISITAÇÃO, DOAÇÕES (PIX INTERATIVO) E CONTATO EM CRISTAL */}
              <section id="contato" className="scroll-mt-24 py-24 bg-[#FBF9F5] relative">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 px-6 md:px-12 relative z-10">
                  <div className="lg:col-span-6 space-y-10">
                    <div className="space-y-3">
                      <span className="text-xs uppercase tracking-[0.28em] text-vinho font-bold block">
                        Portas Abertas
                      </span>
                      <h2 className="text-4xl md:text-6xl font-serif font-normal text-charcoal">
                        Venha nos Visitar
                      </h2>
                      <p className="text-base md:text-lg text-charcoal/75 leading-relaxed">
                        Nossa gira acontece em um espaço de paz, aberto a todos que buscam o axé, o passe e o conselho amigo dos guias.
                      </p>
                    </div>

                    {/* Cards de Endereço e Horário em Cristal com Ações Rápidas */}
                    <div className="space-y-4">
                      <div className="crystal-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-vinho/10 flex items-center justify-center text-vinho shrink-0">
                            <MapPin size={22} />
                          </div>
                          <div>
                            <h3 className="font-bold uppercase tracking-widest text-xs text-vinho mb-1">Endereço do Templo</h3>
                            <p className="text-base font-medium text-charcoal">
                              Av. Prefeito Maurício Fruet, 1230
                            </p>
                            <p className="text-sm text-charcoal/65">Jardim Botânico · Curitiba, PR · 82900-010</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={handleCopyAddress}
                            className="px-3.5 py-2 rounded-lg border border-charcoal/15 hover:border-vinho text-xs font-semibold text-charcoal flex items-center gap-1.5 cursor-pointer transition-colors"
                          >
                            {copiedAddress ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
                            <span>{copiedAddress ? "Copiado!" : "Copiar"}</span>
                          </button>
                          <a
                            href="https://www.google.com/maps/place/Casa+de+Umbanda+Corrente+de+Akuan/@-25.4410897,-49.2329611,17z"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-lg bg-charcoal hover:bg-vinho text-white text-xs font-semibold transition-colors"
                          >
                            Abrir Mapa →
                          </a>
                        </div>
                      </div>

                      <div className="crystal-card p-6 rounded-2xl flex items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-vinho/10 flex items-center justify-center text-vinho shrink-0">
                            <Calendar size={22} />
                          </div>
                          <div>
                            <h3 className="font-bold uppercase tracking-widest text-xs text-vinho mb-1">Giras de Atendimento</h3>
                            <p className="text-base font-medium text-charcoal">Segundas-feiras às 19h30</p>
                            <p className="text-sm text-charcoal/65">Recomendamos chegar com 15 minutos de antecedência</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Cartão de Doações em Cristal Vinho com Botão Copiar Chave PIX */}
                    <div className="p-8 crystal-vinho text-white rounded-3xl space-y-5 relative overflow-hidden">
                      <div className="space-y-2">
                        <span className="text-[11px] uppercase tracking-[0.25em] text-[#C0A080] font-bold">
                          Manutenção Coletiva do Templo
                        </span>
                        <h3 className="text-2xl md:text-3xl font-serif font-normal">
                          Apoie a Casa com Doações
                        </h3>
                        <p className="text-sm md:text-base text-white/80 leading-relaxed">
                          A caridade espiritual é rigorosamente gratuita, mas a manutenção física do templo (velas, ervas, aluguel e zeladoria) é coletiva.
                        </p>
                      </div>
                      <div className="bg-black/25 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold">
                            Chave PIX (E-mail Oficial)
                          </p>
                          <p className="font-mono text-sm md:text-base font-bold tracking-tight select-all mt-0.5">
                            correntedeakuan@gmail.com
                          </p>
                        </div>
                        <button
                          onClick={handleCopyPix}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-vinho hover:bg-[#F3EFE6] text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer shrink-0"
                        >
                          {copiedPix ? <Check size={15} className="text-emerald-700" /> : <Copy size={15} />}
                          <span>{copiedPix ? "Chave Copiada!" : "Copiar Chave PIX"}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form in Crystal */}
                  <div className="lg:col-span-6 crystal-card p-8 md:p-12 rounded-3xl flex flex-col justify-between">
                    <div className="space-y-8">
                      <div>
                        <span className="text-xs uppercase tracking-[0.25em] text-vinho font-bold block mb-2">
                          Canal Direto
                        </span>
                        <h3 className="text-2xl md:text-3xl font-serif text-charcoal">
                          Envie uma Mensagem
                        </h3>
                        <p className="text-sm text-charcoal/65 mt-1">
                          Dúvidas sobre sua primeira visita, trabalhos espirituais ou ingresso na corrente.
                        </p>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-widest font-bold text-charcoal/70 block">
                            Seu Nome *
                          </label>
                          <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            placeholder="Como podemos lhe chamar?"
                            className="w-full bg-[#FBF9F5]/85 border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal outline-none focus:border-vinho transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-widest font-bold text-charcoal/70 block">
                            Seu E-mail ou WhatsApp *
                          </label>
                          <input
                            type="text"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            placeholder="seuemail@exemplo.com ou (41) 99999-9999"
                            className="w-full bg-[#FBF9F5]/85 border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal outline-none focus:border-vinho transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-widest font-bold text-charcoal/70 block">
                            Mensagem *
                          </label>
                          <textarea
                            required
                            value={formState.message}
                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            placeholder="Escreva sua dúvida ou mensagem para a secretaria da casa..."
                            className="w-full bg-[#FBF9F5]/85 border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal outline-none focus:border-vinho transition-colors min-h-[140px] resize-none"
                          />
                        </div>

                        {formStatus === 'error' && (
                          <p className="text-xs text-red-700 font-medium">
                            Por favor, preencha todos os campos obrigatórios antes de enviar.
                          </p>
                        )}

                        {formStatus === 'success' && (
                          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-center gap-2.5">
                            <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
                            <span>Mensagem enviada com sucesso! Que o Caboclo Akuan abençoe seus caminhos.</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={formStatus === 'success'}
                          className="w-full py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold text-white bg-charcoal hover:bg-vinho transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          {formStatus === 'success' ? 'Mensagem Recebida' : 'Enviar Mensagem'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </section>

              <InstitutionalFooter
                onNavigate={handleNavClick}
                nextReading={{
                  kicker: "Vai visitar a CUCA pela primeira vez?",
                  title: "Guia Prático de Primeira Visita",
                  description: "Saiba exatamente o que esperar ao chegar, como funcionam os passes, as consultas no toco e nossas orientações de ouro.",
                  buttonLabel: "Ler Guia Primeira Vez",
                  onNavigate: () => handleNavClick('visitor')
                }}
              />
            </motion.div>
          )}

          {/* --- VIEW: VISITOR (PRIMEIRA VEZ?) --- */}
          {activeView === 'visitor' && (
            <motion.div 
              key="visitor" 
              initial={{ opacity: 0, y: 14 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -14 }} 
              transition={SPRING_TRANSITION}
              onScroll={handleScroll} 
              className="w-full h-full flex flex-col overflow-y-auto relative bg-[#FBF9F5] overscroll-none"
            >
              <FloatingReadingIndex
                title="Guia do Visitante"
                chapters={[
                  { id: 'vis-jornada', number: '01', label: 'Passo a Passo da Visita' },
                  { id: 'vis-frentes', number: '02', label: 'Frentes de Atendimento' },
                  { id: 'vis-orientacoes', number: '03', label: 'Orientações de Ouro' },
                  { id: 'vis-limites', number: '04', label: 'O Que Não Fazemos' },
                ]}
              />

              <PageHeader 
                kicker="Acolhimento & Orientação ao Consulente"
                meta="Atendimento 100% Gratuito"
                title="Primeira Vez na CUCA?"
                subtitle="Tudo o que você precisa saber para se sentir em casa, compreender nossos passes e viver um atendimento sereno."
                imageSrc="/Header/header primeira vez.webp"
                containerBg="bg-[#FBF9F5]"
              />

              <div className="max-w-5xl mx-auto relative z-10 w-full px-6 md:px-12 pb-28 space-y-24">
                
                {/* SEÇÃO 1: JORNADA PASSO A PASSO DO VISITANTE EM CRISTAL */}
                <section id="vis-jornada" className="scroll-mt-28 space-y-8 pt-4">
                  <div className="max-w-3xl mx-auto text-center space-y-3">
                    <span className="text-xs uppercase tracking-[0.28em] font-bold text-vinho block">
                      01 · Sua Visita em 4 Passos Simples
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-charcoal">
                      O que acontece desde a sua chegada?
                    </h2>
                    <p className="text-base md:text-lg text-charcoal/80 prose-editorial">
                      Na CUCA praticamos uma espiritualidade acolhedora, transparente e direta. Todo auxílio mediúnico é <strong>caridade gratuita</strong>. Clique em cada etapa abaixo para ver como funciona:
                    </p>
                  </div>

                  {/* Interactive 4-Step Visitor Journey */}
                  <div className="crystal-panel p-6 md:p-8 rounded-3xl space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        {
                          step: "01",
                          title: "Antes de Ir",
                          subtitle: "Roupa & Preparo",
                        },
                        {
                          step: "02",
                          title: "Ao Chegar",
                          subtitle: "Portão & Senha",
                        },
                        {
                          step: "03",
                          title: "O Atendimento",
                          subtitle: "Passe & Consulta",
                        },
                        {
                          step: "04",
                          title: "Após a Gira",
                          subtitle: "Prática & Reforma",
                        }
                      ].map((s, idx) => {
                        const active = visitorStepIndex === idx;
                        return (
                          <button
                            key={s.step}
                            onClick={() => setVisitorStepIndex(idx)}
                            className={`relative p-4 rounded-2xl text-left transition-all cursor-pointer ${
                              active
                                ? 'text-white shadow-md'
                                : 'crystal-card text-charcoal'
                            }`}
                          >
                            {active && (
                              <motion.span
                                layoutId="visitorStepActivePill"
                                transition={SPRING_TRANSITION}
                                className="absolute inset-0 rounded-2xl bg-vinho"
                              />
                            )}
                            <span className={`relative z-10 font-mono text-xs font-bold block ${active ? 'text-[#C0A080]' : 'text-vinho'}`}>
                              Passo {s.step}
                            </span>
                            <span className="relative z-10 font-serif text-lg font-medium block mt-0.5">
                              {s.title}
                            </span>
                            <span className={`relative z-10 text-xs block ${active ? 'text-white/80' : 'text-charcoal/60'}`}>
                              {s.subtitle}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="crystal-card p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-[0.2em] font-bold text-vinho">
                          Etapa 0{visitorStepIndex + 1} de 04
                        </span>
                        <p className="text-base md:text-lg text-charcoal/90 leading-relaxed font-serif">
                          {[
                            "Vista roupas confortáveis e discretas (preferencialmente claras, evitando roupas muito curtas, decotadas ou transparentes). Venha alimentado de forma leve e com o coração aberto.",
                            "Ao entrar, cumprimente a Tronqueira com respeito silencioso. Receba sua senha gratuita na recepção com nossos cambones e sente-se na assistência mantendo silêncio e oração.",
                            "Quando sua senha for chamada, o cambone conduzirá você até a entidade ou ao passe energético. Tire os calçados se orientado, descruze braços e pernas e fale com sinceridade.",
                            "Anote os banhos de ervas ou orientações recebidas. A verdadeira magia acontece quando você coloca os conselhos da entidade em prática na sua semana."
                          ][visitorStepIndex]}
                        </p>
                      </div>
                      <button
                        onClick={() => setVisitorStepIndex((visitorStepIndex + 1) % 4)}
                        className="px-5 py-3 bg-charcoal hover:bg-vinho text-white text-xs uppercase tracking-widest font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
                      >
                        Próximo Passo →
                      </button>
                    </div>
                  </div>
                </section>

                {/* SEÇÃO 2: AS 4 FRENTES DE ATENDIMENTO EM CRISTAL */}
                <section id="vis-frentes" className="scroll-mt-28 space-y-8">
                  <div className="text-center max-w-3xl mx-auto space-y-2">
                    <span className="text-xs uppercase tracking-[0.28em] text-vinho font-bold block">
                      02 · Como Trabalhamos na Gira
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-charcoal">
                      As Quatro Frentes de Atendimento Espiritual
                    </h2>
                    <p className="text-sm text-charcoal/70">
                      Clique em qualquer frente abaixo para ler em detalhes como ela funciona.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {FRENTES_DE_ATENDIMENTO.map((item, i) => {
                      const IconComp = item.icon;
                      return (
                        <motion.article
                          key={i}
                          whileHover={{ y: -4 }}
                          transition={SPRING_TRANSITION}
                          onClick={() => setExpandedServiceIndex(i)}
                          className="group cursor-pointer crystal-card rounded-3xl overflow-hidden flex flex-col justify-between"
                        >
                          <div className="h-44 relative overflow-hidden bg-charcoal">
                            <img
                              src={item.imageSrc}
                              alt={item.title}
                              className="w-full h-full object-cover opacity-55 group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/30 to-transparent" />
                            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                              <div>
                                <span className="text-[10px] uppercase tracking-[0.22em] text-[#C0A080] font-bold block">
                                  {item.subtitle}
                                </span>
                                <h3 className="text-2xl font-serif">{item.title}</h3>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-vinho/90 flex items-center justify-center text-white shadow-md">
                                <IconComp size={18} />
                              </div>
                            </div>
                          </div>

                          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                            <p className="text-sm text-charcoal/80 leading-relaxed">
                              {item.summary}
                            </p>
                            <div className="pt-3 border-t border-charcoal/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-vinho">
                              <span>Entender como funciona</span>
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>

                  {/* Modal das Frentes de Atendimento em Cristal */}
                  <AnimatePresence>
                    {expandedServiceIndex !== null && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setExpandedServiceIndex(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#1C1917]/80 backdrop-blur-md"
                      >
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.96, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.96, y: 15 }}
                          transition={SPRING_TRANSITION}
                          onClick={(e) => e.stopPropagation()}
                          className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl crystal-pill p-6 sm:p-10 space-y-6"
                        >
                          <div className="flex items-start justify-between gap-4 border-b border-charcoal/10 pb-5">
                            <div>
                              <span className="text-xs uppercase tracking-[0.22em] font-bold text-vinho">
                                {FRENTES_DE_ATENDIMENTO[expandedServiceIndex].subtitle}
                              </span>
                              <h3 className="text-3xl md:text-4xl font-serif text-charcoal mt-1">
                                {FRENTES_DE_ATENDIMENTO[expandedServiceIndex].title}
                              </h3>
                            </div>
                            <button 
                              onClick={() => setExpandedServiceIndex(null)} 
                              className="p-2 rounded-full bg-charcoal/5 hover:bg-vinho hover:text-white text-charcoal transition-colors cursor-pointer"
                            >
                              <X size={20} />
                            </button>
                          </div>

                          <p className="text-base md:text-lg font-serif text-charcoal/85 leading-relaxed">
                            {FRENTES_DE_ATENDIMENTO[expandedServiceIndex].summary}
                          </p>

                          <div className="space-y-4">
                            {FRENTES_DE_ATENDIMENTO[expandedServiceIndex].points.map((pt, idx) => (
                              <div key={idx} className="crystal-card p-5 rounded-2xl space-y-1.5">
                                <span className="text-xs uppercase tracking-[0.2em] font-bold text-vinho block">
                                  {pt.label}
                                </span>
                                <p className="text-sm md:text-base text-charcoal/85 leading-relaxed">
                                  {pt.text}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="pt-4 border-t border-charcoal/10 flex items-center justify-between">
                            <button
                              onClick={() => setExpandedServiceIndex((expandedServiceIndex - 1 + FRENTES_DE_ATENDIMENTO.length) % FRENTES_DE_ATENDIMENTO.length)}
                              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-charcoal/70 hover:text-vinho cursor-pointer"
                            >
                              <ChevronLeft size={15} />
                              <span>Anterior</span>
                            </button>
                            <span className="text-xs font-mono text-charcoal/45">
                              {expandedServiceIndex + 1} / {FRENTES_DE_ATENDIMENTO.length}
                            </span>
                            <button
                              onClick={() => setExpandedServiceIndex((expandedServiceIndex + 1) % FRENTES_DE_ATENDIMENTO.length)}
                              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-charcoal/70 hover:text-vinho cursor-pointer"
                            >
                              <span>Próxima</span>
                              <ChevronRight size={15} />
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>

                {/* SEÇÃO 3: ORIENTAÇÕES DE OURO EM CRISTAL */}
                <section id="vis-orientacoes" className="scroll-mt-28 crystal-panel rounded-3xl p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.25em] font-bold text-vinho">
                      03 · Para Quem Vai Passar por Atendimento
                    </span>
                    <h2 className="text-2xl md:text-4xl font-serif text-charcoal">
                      Quatro Orientações de Ouro
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: "1. Fale com clareza e verdade", desc: "Ao conversar com a entidade no toco (local de consulta individual), seja honesto. Não tente 'testar' o guia. Vá com o coração aberto." },
                      { title: "2. Avise sobre alergias a ervas", desc: "Se a entidade lhe receitar um banho de ervas ou chá, e você for alérgico ou intolerante a algum componente, comunique imediatamente." },
                      { title: "3. Respeite os limites éticos", desc: "Não peça amarrações, previsões do futuro ou qualquer trabalho que prejudique outra pessoa. A Umbanda atua nas leis do amor e da caridade." },
                      { title: "4. O passe começa na assistência", desc: "Cada palavra ou atitude é amplificada dentro do terreiro. Cuide dos seus pensamentos enquanto aguarda seu atendimento. Sua melhora começa na sua intenção." }
                    ].map((item, i) => (
                      <div key={i} className="crystal-card p-6 rounded-2xl space-y-2">
                        <h3 className="font-serif text-xl text-vinho font-medium">{item.title}</h3>
                        <p className="text-sm text-charcoal/80 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SEÇÃO 4: O QUE NÃO FAZEMOS EM CRISTAL ESCURO */}
                <section id="vis-limites" className="scroll-mt-28 crystal-dark text-white p-8 md:p-14 rounded-3xl relative overflow-hidden space-y-8">
                  <div className="space-y-3 max-w-3xl">
                    <span className="text-xs uppercase tracking-[0.28em] text-[#C0A080] font-bold">
                      04 · Nossos Limites Inegociáveis
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-white">
                      O Que Não Fazemos na CUCA
                    </h2>
                    <p className="text-white/75 text-sm md:text-base leading-relaxed">
                      A CUCA preza por um ambiente energeticamente limpo e pautado na moralidade, no respeito e no Evangelho. Clique nos tópicos abaixo para compreender nossos limites éticos:
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-2">
                    {[
                      { title: "Não fazemos amarrações ou simpatias amorosas", desc: "A Umbanda atua sob a lei suprema do livre-arbítrio. Não realizamos amarrações amorosas, adoçamentos forçados ou qualquer trabalho que vise manipular a vontade de outra pessoa." },
                      { title: "Não fazemos adivinhações do futuro", desc: "Nossos guias não são oráculos para saciar curiosidades. A missão da espiritualidade é oferecer aconselhamento moral e fortalecimento para que você construa seu amanhã com consciência." },
                      { title: "Não acolhemos fofocas ou pedidos de vingança", desc: "O terreiro é um hospital de almas. Não acolhemos pedidos para prejudicar terceiros nem admitimos maledicências que diminuam qualquer irmão." },
                      { title: "Não cobramos nem aceitamos pagamentos", desc: "A base incontestável da nossa religião é a caridade. Nenhum trabalho espiritual, passe ou consulta tem preço. A espiritualidade jamais é mercadoria." }
                    ].map((item, i) => (
                      <AccordionItem key={i} title={item.title} desc={item.desc} defaultOpen={i < 2} />
                    ))}
                  </div>
                </section>
              </div>

              <InstitutionalFooter
                onNavigate={handleNavClick}
                nextReading={{
                  kicker: "Próximo Passo Recomendado",
                  title: "Rituais e Preceitos no Dia a Dia",
                  description: "Aprenda como firmar sua vela para o Anjo da Guarda em casa, como funciona o preceito e como preparar um banho de ervas.",
                  buttonLabel: "Conhecer os 4 Rituais",
                  onNavigate: () => handleNavClick('rituals')
                }}
              />
            </motion.div>
          )}

          {/* --- VIEW: RITUALS (RITUAIS E PRECEITOS) --- */}
          {activeView === 'rituals' && (
            <motion.div 
              key="rituals" 
              initial={{ opacity: 0, y: 14 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -14 }} 
              transition={SPRING_TRANSITION}
              onScroll={handleScroll} 
              className="w-full h-full flex flex-col overflow-y-auto bg-[#FBF9F5] overscroll-none"
            >
              <FloatingReadingIndex
                title="Os 4 Pilares"
                chapters={[
                  { id: 'rit-intro', number: '00', label: 'Visão Geral' },
                  { id: 'rit-preceito', number: '01', label: 'O Preceito' },
                  { id: 'rit-vela', number: '02', label: 'A Vela e a Oração' },
                  { id: 'rit-amala', number: '03', label: 'O Amalá' },
                  { id: 'rit-banho', number: '04', label: 'O Banho de Ervas' },
                ]}
              />

              <PageHeader 
                kicker="Prática Diária & Fundamento"
                meta="Os 4 Pilares Umbandistas"
                title="Rituais e Preceitos"
                subtitle="O sagrado vivenciado no nosso dia a dia através do Preceito, da Vela com Oração, do Amalá e do Banho de Ervas."
                imageSrc="/Header/Generated.webp"
              />

              <div className="max-w-5xl mx-auto space-y-24 px-6 md:px-12 pb-28">
                {/* Intro Overview Cards in Crystal */}
                <section id="rit-intro" className="scroll-mt-28 space-y-8 pt-4">
                  <div className="text-center max-w-3xl mx-auto space-y-4">
                    <p className="text-lg md:text-xl text-charcoal/85 leading-relaxed prose-editorial">
                      Na Umbanda, o sagrado não é algo distante: a folha, a água, a vela e a própria mente são manifestações de energia vital. Sustentamos nosso equilíbrio através de <strong>quatro práticas fundamentais</strong>:
                    </p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { id: 'rit-preceito', num: '01', title: 'O Preceito', desc: 'Alinhamento do corpo e da mente antes e depois da gira' },
                      { id: 'rit-vela', num: '02', title: 'Vela & Oração', desc: 'Ponto de firmeza e conexão com o Anjo da Guarda' },
                      { id: 'rit-amala', num: '03', title: 'O Amalá', desc: 'Oferenda sagrada de gratidão aos Orixás e Guias' },
                      { id: 'rit-banho', num: '04', title: 'Banho de Ervas', desc: 'Assepsia energética e reequilíbrio pelos 4 elementos' },
                    ].map((p) => (
                      <motion.button
                        key={p.id}
                        whileHover={{ y: -4 }}
                        transition={SPRING_TRANSITION}
                        onClick={() => document.getElementById(p.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        className="crystal-card p-5 rounded-2xl text-left cursor-pointer space-y-2"
                      >
                        <span className="font-mono text-xs font-bold text-vinho">{p.num}</span>
                        <h3 className="font-serif text-xl text-charcoal">{p.title}</h3>
                        <p className="text-xs text-charcoal/70 leading-relaxed">{p.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </section>

                {/* PILAR 1: O PRECEITO */}
                <section id="rit-preceito" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-vinho/10 pt-16">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <span className="text-xs uppercase tracking-[0.25em] text-vinho font-bold block mb-2">
                        Pilar 01 · Alinhamento Vibratório
                      </span>
                      <h2 className="text-3xl md:text-5xl font-serif text-charcoal">O Preceito</h2>
                    </div>
                    <p className="text-base md:text-lg text-charcoal/85 leading-relaxed prose-editorial">
                      O preceito é o preparo pelo qual alinhamos nossa energia antes, durante e depois dos trabalhos espirituais. Não é um castigo, mas responsabilidade: assim como um artesão precisa de ferramentas limpas, os guias precisam de um instrumento em equilíbrio.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {[
                        { title: "Zero Álcool e Ilícitos", desc: "Abstinência total: substâncias que alteram a consciência rompem a proteção áurica e atraem baixa vibração." },
                        { title: "Alimentação Leve", desc: "Nos dias de gira, evite carnes vermelhas, comidas pesadas e excessos que sobrecarregam o corpo." },
                        { title: "Reserva de Energia Vital", desc: "Resguarde sua energia vital e mantenha o recolhimento interior antes dos trabalhos." },
                        { title: "Vigilância Emocional", desc: "Evite discussões, raiva ou fofocas. Emoções densas atuam como ruídos na sintonia espiritual." }
                      ].map((item, i) => (
                        <div key={i} className="crystal-card p-5 rounded-2xl space-y-1.5">
                          <h4 className="font-bold text-vinho text-xs uppercase tracking-wider">{item.title}</h4>
                          <p className="text-xs md:text-sm text-charcoal/75 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                    <img src="/Header/preceito.webp" className="w-full h-full object-cover" alt="O Preceito" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-white text-lg font-serif italic leading-snug">
                        “Como um artesão precisa de ferramentas limpas e afiadas, os guias precisam de um médium em equilíbrio.”
                      </p>
                    </div>
                  </div>
                </section>

                {/* PILAR 2: A VELA E A ORAÇÃO */}
                <section id="rit-vela" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-vinho/10 pt-16">
                  <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
                    <img src="/Header/Generated (1).webp" className="w-full h-full object-cover" alt="Vela e Oração" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-white text-lg font-serif italic leading-snug">
                        “A vela e a água formam um portal de luz, proteção e divina conexão em sua morada.”
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                    <div>
                      <span className="text-xs uppercase tracking-[0.25em] text-vinho font-bold block mb-2">
                        Pilar 02 · O Portal Energético Doméstico
                      </span>
                      <h2 className="text-3xl md:text-5xl font-serif text-charcoal">A Vela e a Oração</h2>
                    </div>
                    <p className="text-base md:text-lg text-charcoal/85 leading-relaxed prose-editorial">
                      A chama da vela representa a consciência desperta e a fé viva; o copo com água pura ao lado atua como espelho e filtro condensador de boas energias, conectando você ao seu Anjo da Guarda.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {[
                        { title: "01. Local Seguro e Limpo", desc: "Acenda em local tranquilo e longe de inflamáveis, mantendo postura de silêncio e prece." },
                        { title: "02. Sempre Vela Branca", desc: "Em casa, utilize a vela branca (salvo recomendação expressa do guia), símbolo de pureza universal." },
                        { title: "03. Copo com Água ao Lado", desc: "Coloque sempre um copo com água limpa ao lado da vela para filtrar e conduzir o axé." },
                        { title: "04. Descarte Respeitoso", desc: "Ao final da queima, descarte a água em uma planta ou em água corrente com gratidão." }
                      ].map((item, i) => (
                        <div key={i} className="crystal-card p-5 rounded-2xl space-y-1.5">
                          <h4 className="font-bold text-vinho text-xs uppercase tracking-wider">{item.title}</h4>
                          <p className="text-xs md:text-sm text-charcoal/75 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* PILAR 3: O AMALÁ */}
                <section id="rit-amala" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-vinho/10 pt-16">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <span className="text-xs uppercase tracking-[0.25em] text-vinho font-bold block mb-2">
                        Pilar 03 · Gratidão & Consagração
                      </span>
                      <h2 className="text-3xl md:text-5xl font-serif text-charcoal">O Amalá</h2>
                    </div>
                    <p className="text-base md:text-lg text-charcoal/85 leading-relaxed prose-editorial">
                      Na CUCA, o Amalá é a oferenda ritualística montada com elementos naturais (frutas, flores, grãos e velas). Jamais é um "pagamento" ou barganha, mas um ato de amor, sintonia e gratidão às forças da natureza.
                    </p>

                    <div className="space-y-3 pt-2">
                      {[
                        { title: "Composição Mandálica", desc: "Montado no Jardim dos Orixás com flores, frutas frescas, líquidos em coité e velas em números ímpares." },
                        { title: "Zelo Ecológico e Sagrado", desc: "O Jardim é solo sagrado: nunca deixamos plásticos, lixo ou fósforos queimados nos alguidares." },
                        { title: "A Regra de Ouro", desc: "'Sem intenção não há axé.' A beleza externa da oferenda reflete a sinceridade da oração interior." }
                      ].map((item, i) => (
                        <div key={i} className="crystal-card p-5 rounded-2xl">
                          <h4 className="font-bold text-vinho text-xs uppercase tracking-wider mb-1">{item.title}</h4>
                          <p className="text-sm text-charcoal/80 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                    <img src="/Header/Generated.webp" className="w-full h-full object-cover" alt="O Amalá" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-white text-lg font-serif italic leading-snug">
                        “A beleza física da oferenda deve ser o reflexo da sinceridade da sua oração interior.”
                      </p>
                    </div>
                  </div>
                </section>

                {/* PILAR 4: O BANHO DE ERVAS EM CRISTAL ESCURO */}
                <section 
                  id="rit-banho"
                  className="scroll-mt-28 relative overflow-hidden p-8 md:p-14 rounded-3xl crystal-dark text-white space-y-8"
                >
                  <div className="max-w-3xl space-y-4">
                    <span className="text-xs uppercase tracking-[0.28em] text-[#C0A080] font-bold block">
                      Pilar 04 · Assepsia e Reequilíbrio Fitoenergético
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-normal text-white">
                      O Banho de Ervas
                    </h2>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      O banho ritual não é um ato comum de higiene, mas um mergulho energético que purifica a aura e atua por compensação: acalma o que está inflamado e desperta vigor onde há esgotamento.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { step: "01", title: "A Escolha", desc: "Peça licença à natureza. Escolha a erva conforme o elemento necessário (Ar, Fogo, Terra ou Água)." },
                      { step: "02", title: "O Preparo", desc: "Maceração em água fria para folhas frescas; infusão abafada para flores secas ou cascas." },
                      { step: "03", title: "A Aplicação", desc: "Após o banho higiênico, despeje lentamente em oração, respeitando se a erva vai ou não na coroa." },
                      { step: "04", title: "O Retorno", desc: "Deixe secar suavemente e devolva as folhas coadas à terra, agradecendo pelo axé recebido." }
                    ].map((item) => (
                      <div key={item.step} className="p-5 rounded-2xl crystal-dark-subcard space-y-2">
                        <span className="text-xl font-serif italic text-[#C0A080] block">{item.step}</span>
                        <h3 className="font-bold text-white text-xs uppercase tracking-widest">{item.title}</h3>
                        <p className="text-xs text-white/70 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => handleNavClick('ervas')}
                      className="inline-flex items-center gap-3 bg-vinho hover:bg-[#851414] text-white px-7 py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer"
                    >
                      <span>Abrir Herbário Interativo de Ervas Sagradas</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </section>
              </div>

              <InstitutionalFooter
                onNavigate={handleNavClick}
                nextReading={{
                  kicker: "Estude as Folhas em Detalhes",
                  title: "Herbário das 16 Ervas Sagradas",
                  description: "Veja as fotos de cada planta, o código de cores dos 4 elementos e qual banho é indicado para cada momento.",
                  buttonLabel: "Explorar Ervas Sagradas",
                  onNavigate: () => handleNavClick('ervas')
                }}
              />
            </motion.div>
          )}

          {/* --- VIEW: ORIXAS (NOSSOS ORIXÁS E LINHAS DE TRABALHO) --- */}
          {activeView === 'orixas' && (
            <motion.div 
              key="orixas" 
              initial={{ opacity: 0, y: 14 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -14 }} 
              transition={SPRING_TRANSITION}
              onScroll={handleScroll} 
              className="w-full h-full flex flex-col overflow-y-auto bg-[#FBF9F5] overscroll-none"
            >
              <PageHeader 
                kicker="Teologia & Arquétipos da Umbanda"
                meta="9 Orixás · 10 Linhas de Trabalho"
                title="Orixás e Linhas de Trabalho"
                subtitle="As matrizes divinas da natureza que regem nossa coroa e as falanges de espíritos que trabalham na caridade."
                imageSrc="/Header/header.webp"
              />

              <div className="max-w-6xl mx-auto space-y-16 px-6 md:px-12 pb-28">
                {/* Intro Digestible Comparison in Crystal: O que é Orixá vs O que é Guia */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="crystal-card p-7 rounded-3xl space-y-3">
                    <span className="text-xs uppercase tracking-[0.22em] font-bold text-vinho">
                      1 · As Matrizes Divinas
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif text-charcoal">
                      O que é um Orixá?
                    </h2>
                    <p className="text-sm md:text-base text-charcoal/80 leading-relaxed">
                      O Orixá é uma "fração de Deus", uma força pura da natureza ligada ao nosso Ori (cabeça e essência). Para Pierre Verger, é o axé dos elementos primordiais; para Luiz Antonio Simas, é "o mundo se encantando nos corpos".
                    </p>
                  </div>

                  <div className="crystal-dark text-white p-7 rounded-3xl space-y-3">
                    <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#C0A080]">
                      2 · Os Mensageiros do Astral
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif text-white">
                      O que são as Linhas de Guias?
                    </h2>
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      Se os Orixás são as forças cósmicas puras, os Guias (Caboclos, Pretos Velhos, Erês, Baianos, Exus...) são os espíritos trabalhadores que incorporam nos médiuns e conversam conosco, integrando e curando nossa psique.
                    </p>
                  </div>
                </section>

                {/* Barra de Busca e Filtro Rápido em Cristal */}
                <section className="sticky top-20 z-20 crystal-pill p-4 md:p-5 rounded-2xl flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                  <div className="relative flex-1">
                    <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/45" />
                    <input
                      type="text"
                      value={orixaSearch}
                      onChange={(e) => setOrixaSearch(e.target.value)}
                      placeholder="Buscar Orixá ou Linha por nome, atuação emocional ou elemento de amalá..."
                      className="w-full pl-11 pr-9 py-2.5 bg-white/85 backdrop-blur-sm border border-charcoal/15 rounded-xl text-sm text-charcoal placeholder:text-charcoal/45 focus:outline-none focus:border-vinho"
                    />
                    {orixaSearch && (
                      <button
                        onClick={() => setOrixaSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/45 hover:text-charcoal"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { id: 'all' as const, label: 'Todos (19)' },
                      { id: 'orixa' as const, label: 'Orixás (9)' },
                      { id: 'direita' as const, label: 'Linhas da Direita' },
                      { id: 'neutra' as const, label: 'Linhas Neutras' },
                      { id: 'esquerda' as const, label: 'Esquerda / Guardiões' },
                    ].map((tab) => {
                      const active = orixaFilter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setOrixaFilter(tab.id)}
                          className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                            active
                              ? 'text-white'
                              : 'bg-white/75 text-charcoal/75 border border-charcoal/10 hover:text-charcoal'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="orixaFilterActivePill"
                              transition={SPRING_TRANSITION}
                              className="absolute inset-0 rounded-xl bg-vinho shadow-sm"
                            />
                          )}
                          <span className="relative z-10">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* GRADE 1: NOSSOS ORIXÁS EM CRISTAL */}
                {filteredOrixas.length > 0 && (
                  <section className="space-y-8">
                    <div className="border-b border-vinho/15 pb-4 flex items-center justify-between">
                      <div>
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-vinho block">
                          As Matrizes Sagradas
                        </span>
                        <h3 className="text-3xl font-serif text-charcoal">
                          Os 9 Orixás Cultuados na CUCA
                        </h3>
                      </div>
                      <span className="text-xs text-charcoal/60 hidden sm:inline">
                        Clique em qualquer Orixá para ver Atuação, Arquétipo e Elementos do Amalá
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredOrixas.map((orixa) => {
                        const IconComp = orixa.icon;
                        return (
                          <motion.article
                            key={orixa.name}
                            whileHover={{ y: -4 }}
                            transition={SPRING_TRANSITION}
                            onClick={() => setSelectedEntity(orixa)}
                            className="crystal-card rounded-3xl p-6 cursor-pointer flex flex-col justify-between gap-5 group"
                          >
                            <div className="space-y-4">
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3.5">
                                  <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: `${orixa.color}15`, color: orixa.color }}
                                  >
                                    <IconComp size={24} strokeWidth={1.75} />
                                  </div>
                                  <div>
                                    <h4 className="font-serif text-2xl text-charcoal group-hover:text-vinho transition-colors">
                                      {orixa.name} {orixa.subtitle && <span className="text-base italic text-charcoal/60">({orixa.subtitle})</span>}
                                    </h4>
                                    <span className="text-[11px] text-charcoal/55 block">
                                      {orixa.polarity}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F3EFE6]/90 text-charcoal/90">
                                {orixa.shortRole}
                              </p>

                              <p className="text-sm text-charcoal/75 line-clamp-3 leading-relaxed">
                                {orixa.atuacao}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-charcoal/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-vinho">
                              <span>Ver Amalá e Detalhes</span>
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          </motion.article>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* GRADE 2: LINHAS DE TRABALHO EM CRISTAL ESCURO */}
                {filteredLinhas.length > 0 && (
                  <section className="space-y-8 crystal-dark text-white p-8 md:p-12 rounded-3xl">
                    <div className="border-b border-white/15 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C0A080] block">
                          Arquétipos & Falanges
                        </span>
                        <h3 className="text-3xl font-serif text-white mt-1">
                          As 10 Linhas de Trabalho da CUCA
                        </h3>
                      </div>
                      <button
                        onClick={() => handleNavClick('guias')}
                        className="text-xs uppercase tracking-widest text-[#C0A080] hover:text-white font-bold underline underline-offset-4 cursor-pointer"
                      >
                        Conhecer Nossos 12 Guias Chefes →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {filteredLinhas.map((entidade) => {
                        const IconComp = entidade.icon;
                        return (
                          <motion.article
                            key={entidade.name}
                            whileHover={{ y: -4 }}
                            transition={SPRING_TRANSITION}
                            onClick={() => setSelectedEntity(entidade)}
                            className="crystal-dark-subcard rounded-2xl p-6 cursor-pointer flex flex-col justify-between gap-4 group"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center gap-3.5">
                                <div
                                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-white/10"
                                  style={{ color: entidade.color }}
                                >
                                  <IconComp size={24} strokeWidth={1.75} />
                                </div>
                                <div>
                                  <h4 className="font-serif text-xl text-white group-hover:text-[#C0A080] transition-colors">
                                    {entidade.name}
                                  </h4>
                                  <span className="text-[11px] text-white/55 block">
                                    {entidade.polarity}
                                  </span>
                                </div>
                              </div>

                              <p className="text-xs font-medium text-[#C0A080]">
                                {entidade.shortRole}
                              </p>

                              <p className="text-xs md:text-sm text-white/75 line-clamp-3 leading-relaxed">
                                {entidade.atuacao}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#C0A080]">
                              <span>Abrir Ficha da Linha</span>
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          </motion.article>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Modal de Detalhes do Orixá ou Linha em Cristal */}
                <AnimatePresence>
                  {selectedEntity && (
                    <motion.div 
                      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#1C1917]/80 backdrop-blur-md overflow-y-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedEntity(null)}
                    >
                      <motion.div 
                        className="crystal-pill w-full max-w-4xl p-6 sm:p-10 md:p-12 rounded-3xl relative shadow-2xl my-auto space-y-8"
                        initial={{ scale: 0.96, y: 15, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.96, y: 15, opacity: 0 }}
                        transition={SPRING_TRANSITION}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button 
                          onClick={() => setSelectedEntity(null)}
                          className="absolute top-6 right-6 p-2 rounded-full bg-charcoal/5 text-charcoal hover:bg-vinho hover:text-white transition-colors cursor-pointer"
                        >
                          <X size={22} />
                        </button>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-charcoal/10 pb-6">
                          <div 
                            className="w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center shadow-sm"
                            style={{ backgroundColor: `${selectedEntity.color}18`, color: selectedEntity.color }}
                          >
                            <selectedEntity.icon size={40} strokeWidth={1.5} />
                          </div>
                          <div>
                            <span className="text-xs uppercase tracking-[0.22em] font-bold text-vinho">
                              {selectedEntity.polarity}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif text-charcoal mt-1">
                              {selectedEntity.name} {selectedEntity.subtitle && <span className="text-2xl italic text-charcoal/60">({selectedEntity.subtitle})</span>}
                            </h2>
                            <p className="text-sm text-charcoal/70 mt-1">{selectedEntity.shortRole}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="crystal-card p-6 rounded-2xl space-y-2">
                            <h3 className="text-xs uppercase tracking-[0.22em] font-bold text-vinho">
                              1. Atuação Espiritual
                            </h3>
                            <p className="text-sm md:text-base leading-relaxed text-charcoal/85">
                              {selectedEntity.atuacao}
                            </p>
                          </div>
                          <div className="crystal-card p-6 rounded-2xl space-y-2">
                            <h3 className="text-xs uppercase tracking-[0.22em] font-bold text-vinho">
                              2. Mitologia & Arquétipo
                            </h3>
                            <p className="text-sm md:text-base leading-relaxed text-charcoal/85">
                              {selectedEntity.mitologia}
                            </p>
                          </div>
                          <div className="crystal-card p-6 rounded-2xl space-y-2">
                            <h3 className="text-xs uppercase tracking-[0.22em] font-bold text-vinho">
                              3. Efeito no Psiquismo e Emoções
                            </h3>
                            <p className="text-sm md:text-base leading-relaxed text-charcoal/85">
                              {selectedEntity.efeito}
                            </p>
                          </div>
                          <div className="crystal-panel p-6 rounded-2xl space-y-2">
                            <h3 className="text-xs uppercase tracking-[0.22em] font-bold text-vinho">
                              4. Elementos Tradicionais do Amalá
                            </h3>
                            <p className="text-sm md:text-base leading-relaxed text-charcoal/85">
                              {selectedEntity.elementos}
                            </p>
                          </div>
                        </div>

                        {/* Modal Prev / Next Navigation */}
                        <div className="pt-4 border-t border-charcoal/10 flex items-center justify-between">
                          <button
                            onClick={() => {
                              const prevIdx = (selectedEntityIndex - 1 + allEntitiesCombined.length) % allEntitiesCombined.length;
                              setSelectedEntity(allEntitiesCombined[prevIdx]);
                            }}
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-charcoal/70 hover:text-vinho cursor-pointer"
                          >
                            <ChevronLeft size={16} />
                            <span>{allEntitiesCombined[(selectedEntityIndex - 1 + allEntitiesCombined.length) % allEntitiesCombined.length]?.name}</span>
                          </button>

                          <span className="text-xs font-mono text-charcoal/45">
                            {selectedEntityIndex + 1} / {allEntitiesCombined.length}
                          </span>

                          <button
                            onClick={() => {
                              const nextIdx = (selectedEntityIndex + 1) % allEntitiesCombined.length;
                              setSelectedEntity(allEntitiesCombined[nextIdx]);
                            }}
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-charcoal/70 hover:text-vinho cursor-pointer"
                          >
                            <span>{allEntitiesCombined[(selectedEntityIndex + 1) % allEntitiesCombined.length]?.name}</span>
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <InstitutionalFooter
                onNavigate={handleNavClick}
                nextReading={{
                  kicker: "Conheça os Mentores da Casa",
                  title: "Caboclo Akuan e os 12 Guias Dirigentes",
                  description: "Descubra a história e os ensinamentos específicos dos espíritos chefes que conduzem os trabalhos da CUCA.",
                  buttonLabel: "Ver Guias Dirigentes",
                  onNavigate: () => handleNavClick('guias')
                }}
              />
            </motion.div>
          )}

          {/* --- VIEW: MEDIUM (QUERO SER MÉDIUM) --- */}
          {activeView === 'medium' && (
            <motion.div 
              key="medium" 
              initial={{ opacity: 0, y: 14 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -14 }} 
              transition={SPRING_TRANSITION}
              onScroll={handleScroll} 
              className="w-full h-full flex flex-col overflow-y-auto bg-[#FBF9F5] overscroll-none"
            >
              <FloatingReadingIndex
                title="Caminho do Médium"
                chapters={[
                  { id: 'med-autodescobrimento', number: '01', label: 'Autodescobrimento' },
                  { id: 'med-passos', number: '02', label: 'Os 7 Passos de Ingresso' },
                  { id: 'med-dicas', number: '03', label: 'Dicas de Ouro' },
                  { id: 'med-deveres', number: '04', label: 'Pilares e Deveres' },
                  { id: 'med-tipos', number: '05', label: 'Tipos de Médiuns' },
                ]}
              />

              <PageHeader 
                kicker="Vocação, Estudo & Disciplina"
                meta="A Corrente de Aço"
                title={<>O Caminho do <span className="italic text-[#C0A080]">Médium</span> na CUCA</>}
                subtitle="Entrar para a corrente mediúnica é um chamado ao labor espiritual, ao autoconhecimento e ao serviço fraterno."
                imageSrc="/Carrosel/CUCA-127.webp"
              />

              <div className="max-w-5xl mx-auto px-6 md:px-12 w-full space-y-24 pb-28">
                
                {/* Quote Banner in Dark Crystal */}
                <div className="crystal-dark text-white p-8 md:p-12 rounded-3xl text-center space-y-3">
                  <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#FBF9F5]">
                    “Uma corrente que una a disciplina com o amor será, verdadeiramente, uma corrente de aço.”
                  </p>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#C0A080] font-bold">
                    — Caboclo Akuan
                  </p>
                </div>

                {/* SEÇÃO 1: A MEDIUNIDADE COMO AUTODESCOBRIMENTO */}
                <section id="med-autodescobrimento" className="scroll-mt-28 space-y-8">
                  <div className="text-center max-w-3xl mx-auto space-y-3">
                    <span className="text-xs uppercase tracking-[0.28em] font-bold text-vinho block">
                      01 · Psicologia & Espiritualidade
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-charcoal">
                      A Mediunidade como Autodescobrimento
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="crystal-card p-6 rounded-2xl space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-vinho">Não é passividade</span>
                      <h3 className="font-serif text-xl text-charcoal">O Médium como Instrumento Vivo</h3>
                      <p className="text-sm text-charcoal/80 leading-relaxed">
                        A mediunidade não é um passe de mágica em que o indivíduo atua como gravador passivo. O guia utiliza o repertório emocional e moral do médium para veicular sua mensagem.
                      </p>
                    </div>

                    <div className="crystal-panel p-6 rounded-2xl space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-vinho">Princípio de Carl Jung</span>
                      <h3 className="font-serif text-xl text-charcoal">“Só vamos com o outro até onde fomos conosco”</h3>
                      <p className="text-sm text-charcoal/80 leading-relaxed">
                        Como um médium poderá amparar a dor profunda de um consulente se foge de encarar e curar suas próprias sombras internas?
                      </p>
                    </div>

                    <div className="crystal-card p-6 rounded-2xl space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-vinho">Sem Teatro</span>
                      <h3 className="font-serif text-xl text-charcoal">Afinar o Caráter</h3>
                      <p className="text-sm text-charcoal/80 leading-relaxed">
                        Quando falta bagagem moral, o vazio é preenchido pelo ego e por performances vazias. A espiritualidade verdadeira não precisa de espetáculo, precisa de instrumentos afinados.
                      </p>
                    </div>
                  </div>
                </section>

                {/* SEÇÃO 2: TRILHA INTERATIVA DOS 7 PASSOS DE INGRESSO EM CRISTAL */}
                <section id="med-passos" className="scroll-mt-28 space-y-8 border-t border-vinho/10 pt-16">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2 max-w-2xl">
                      <span className="text-xs uppercase tracking-[0.28em] font-bold text-vinho block">
                        02 · Jornada de Admissão
                      </span>
                      <h2 className="text-3xl md:text-5xl font-serif text-charcoal">
                        Os 7 Passos para Ingressar na Corrente
                      </h2>
                      <p className="text-sm md:text-base text-charcoal/75">
                        O ingresso na CUCA não acontece de imediato: exige vivência, confirmação espiritual e preparo. Clique nas etapas abaixo ou marque as que já leu:
                      </p>
                    </div>
                    <button
                      onClick={handleToggleAllMediumSteps}
                      className="px-4 py-2.5 rounded-xl crystal-panel hover:bg-vinho hover:text-white text-xs uppercase tracking-wider font-bold text-vinho transition-colors cursor-pointer self-start md:self-auto shrink-0"
                    >
                      {mediumStepsExpandedAll ? "Recolher Etapas" : "Expandir Todas as 7 Etapas"}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {[
                      { 
                        title: "Vivência como Consulente (Mínimo de 5 Giras)", 
                        desc: "Todo médium começa na assistência como consulente. Para manifestar interesse em ingressar e participar da Tiragem do Obi (Oráculo), o visitante deve participar de, no mínimo, 5 giras para se afinizar com a energia e a disciplina do terreiro." 
                      },
                      { 
                        title: "Consulta com o Caboclo Akuan ou Guia Chefe", 
                        desc: "O processo inicia-se em uma consulta individual com nosso Espírito Dirigente (ou chefe da gira). É nesta conexão que a entidade avalia a afinidade energética e autoriza ou não a caminhada do aspirante." 
                      },
                      { 
                        title: "Desligamento de Outras Egrégoras", 
                        desc: "A CUCA não permite que o médium trabalhe em mais de um centro espiritual simultaneamente. Se vier de outra casa, deverá realizar com respeito o ritual de desligamento (levantamento do Amaci anterior)." 
                      },
                      { 
                        title: "Validação do Pai de Santo (Dirigente Material)", 
                        desc: "Após o aval do Guia, o Pai de Santo revisa a ordem espiritual, apresenta o regimento interno e alinha os deveres éticos, materiais e de assiduidade da casa." 
                      },
                      { 
                        title: "Período de Preparação Energética", 
                        desc: "Uma vez aprovado, inicia-se um período de preparação com banhos de ervas, estudo dos pontos cantados e preceitos para sintonizar corpo, mente e espírito com a vibração da CUCA." 
                      },
                      { 
                        title: "Reconsulta e Tiragem do Obi (Confirmação)", 
                        desc: "Após o período de adequação, ocorre uma reconsulta definitiva e a tiragem ritual do Obi para a confirmação do Orixá de Cabeça." 
                      },
                      { 
                        title: "O Ritual do Amaci (Selo de Pertencimento)", 
                        desc: "A lavagem de cabeça com ervas sagradas introduz as vibrações divinas no Ori do médium, ligando-o oficialmente à corrente da CUCA. Sem o Amaci, o médium não atua como trabalhador." 
                      }
                    ].map((step, i) => {
                      const isOpen = !!openMediumSteps[i];
                      const isDone = !!completedMediumSteps[i];
                      return (
                        <div
                          key={i}
                          className={`rounded-2xl transition-all overflow-hidden ${
                            isDone
                              ? 'bg-[#F3F7F2]/90 backdrop-blur-md border border-emerald-700/25'
                              : 'crystal-card'
                          }`}
                        >
                          <div
                            onClick={() => toggleMediumStep(i)}
                            className="p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer"
                          >
                            <div className="flex items-center gap-4">
                              <span className="w-9 h-9 rounded-xl bg-vinho/10 text-vinho font-mono text-xs font-bold flex items-center justify-center shrink-0">
                                0{i + 1}
                              </span>
                              <h3 className="font-serif text-lg md:text-2xl text-charcoal">
                                {step.title}
                              </h3>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCompletedMediumSteps((prev) => ({ ...prev, [i]: !prev[i] }));
                                }}
                                className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                                  isDone
                                    ? 'bg-emerald-700 text-white border-emerald-700'
                                    : 'bg-[#FBF9F5] text-charcoal/60 border-charcoal/15 hover:text-charcoal'
                                }`}
                              >
                                {isDone ? "Compreendido ✓" : "Marcar leitura"}
                              </button>
                              <span className="text-vinho font-sans text-xl w-6 text-center">
                                {isOpen ? '—' : '+'}
                              </span>
                            </div>
                          </div>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={SPRING_TRANSITION}
                                className="overflow-hidden border-t border-charcoal/10"
                              >
                                <p className="p-5 md:p-6 pt-4 text-sm md:text-base text-charcoal/85 leading-relaxed bg-[#FBF9F5]/80">
                                  {step.desc}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* SEÇÃO 3: DICAS DE OURO EM CRISTAL ESCURO */}
                <section id="med-dicas" className="scroll-mt-28 crystal-dark text-white rounded-3xl p-8 md:p-14 space-y-10">
                  <div className="text-center max-w-3xl mx-auto space-y-2">
                    <span className="text-xs uppercase tracking-[0.28em] font-bold text-[#C0A080]">
                      03 · Sabedoria Prática de Terreiro
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-normal">
                      6 Dicas de Ouro para o Médium da CUCA
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: "1. Seja o consulente de si mesmo", desc: "Tome sempre para si os ensinamentos que lhe atravessarem. A entidade não é sua propriedade, nem você dela." },
                      { title: "2. Não espere ser convocado", desc: "A ordem externa reflete a interna. Ofereça-se voluntariamente para contribuir com a limpeza, organização e zelo pelo templo." },
                      { title: "3. Juntos somos mais fortes", desc: "Não tarde em cuidar do irmão ao lado. Se perceber que um colega está em dificuldade, estenda a mão com fraternidade." },
                      { title: "4. O combinado não sai caro", desc: "Estabeleça compromissos com a casa e cumpra-os com transparência: assiduidade, pontualidade e manutenção coletiva." },
                      { title: "5. A Umbanda exige diálogo", desc: "Se algo causar desconforto ou dúvida, procure a hierarquia da casa com franqueza e humildade, jamais alimentando corredores." },
                      { title: "6. Silêncio também é axé", desc: "Não tenha pressa em falar. Antes de toda palavra sábia existe um silêncio firme e cheio de força espiritual." }
                    ].map((tip, i) => (
                      <div key={i} className="crystal-dark-subcard p-6 rounded-2xl space-y-2">
                        <h3 className="font-serif text-xl text-[#C0A080]">{tip.title}</h3>
                        <p className="text-sm text-white/75 leading-relaxed font-light">{tip.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SEÇÃO 4: PILARES E DEVERES EM CRISTAL */}
                <section id="med-deveres" className="scroll-mt-28 space-y-8">
                  <div className="text-center max-w-3xl mx-auto space-y-2">
                    <span className="text-xs uppercase tracking-[0.28em] font-bold text-vinho">
                      04 · Ética & Compromisso
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-charcoal">
                      Pilares e Deveres da Corrente
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: "Disciplina e Conduta Moral", desc: "Cultivar a retidão de caráter dentro e fora do terreiro, honrando o branco que veste." },
                      { title: "Zero Álcool e Drogas Ilícitas", desc: "O uso abusivo de álcool e drogas ilícitas é incompatível com o exercício mediúnico. A mediunidade exige lucidez." },
                      { title: "Assiduidade e Zelo pelo Templo", desc: "Participação ativa nas giras, escalas de limpeza e preparo. Na Umbanda, varrer o chão é tão sagrado quanto dar passe." },
                      { title: "Respeito à Hierarquia e ao Preceito", desc: "Seguir as orientações do Pai de Santo, Capitães, Cambones e Ogãs, mantendo o preceito e os banhos em dia." }
                    ].map((duty, i) => (
                      <div key={i} className="crystal-card p-6 rounded-2xl space-y-2">
                        <h3 className="font-serif text-xl text-vinho font-medium">{duty.title}</h3>
                        <p className="text-sm text-charcoal/80 leading-relaxed">{duty.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SEÇÃO 5: TIPOS DE MÉDIUNS EM CRISTAL */}
                <section id="med-tipos" className="scroll-mt-28 crystal-panel p-8 md:p-14 rounded-3xl space-y-10">
                  <div className="text-center max-w-3xl mx-auto space-y-2">
                    <span className="text-xs uppercase tracking-[0.28em] font-bold text-vinho">
                      05 · Todas as Funções São Sagradas
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-charcoal">
                      Funções Mediúnicas na CUCA
                    </h2>
                    <p className="text-sm md:text-base text-charcoal/75">
                      Não há médium privilegiado: somos todos engrenagens indispensáveis de um único trabalho espiritual.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="crystal-card p-7 rounded-2xl space-y-5">
                      <h3 className="text-2xl font-serif italic text-vinho border-b border-vinho/15 pb-3">
                        Médiuns Incorporantes
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-serif text-lg font-medium text-charcoal">1. Médiuns de Toco</h4>
                          <p className="text-sm text-charcoal/75 leading-relaxed">Atendem diretamente o público em consulta sob a roupagem das entidades, prezando pelo sigilo, simplicidade e ausência de vaidade.</p>
                        </div>
                        <div>
                          <h4 className="font-serif text-lg font-medium text-charcoal">2. Médiuns de Passe (ou de Meio)</h4>
                          <p className="text-sm text-charcoal/75 leading-relaxed">Trabalham incorporados aplicando passes magnéticos e curas silenciosas no centro do gongá.</p>
                        </div>
                        <div>
                          <h4 className="font-serif text-lg font-medium text-charcoal">3. Médiuns de Transporte</h4>
                          <p className="text-sm text-charcoal/75 leading-relaxed">Exercem a nobre função de servir de ponte segura para encaminhar espíritos sofredores à luz, sob comando do guia dirigente.</p>
                        </div>
                      </div>
                    </div>

                    <div className="crystal-card p-7 rounded-2xl space-y-5">
                      <h3 className="text-2xl font-serif italic text-vinho border-b border-vinho/15 pb-3">
                        Médiuns Não Incorporantes
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-serif text-lg font-medium text-charcoal">1. Sustentação (A Base do Templo)</h4>
                          <p className="text-sm text-charcoal/75 leading-relaxed">Médiuns que doam ectoplasma, prece e foco mental, mantendo a frequência da gira firme. Sem eles, o trabalho não acontece.</p>
                        </div>
                        <div>
                          <h4 className="font-serif text-lg font-medium text-charcoal">2. Cambones (A Maior Escola da Umbanda)</h4>
                          <p className="text-sm text-charcoal/75 leading-relaxed">Auxiliam diretamente as entidades e os consulentes, traduzindo orientações e zelando pela ordem com prontidão e alegria.</p>
                        </div>
                        <div>
                          <h4 className="font-serif text-lg font-medium text-charcoal">3. Curimba (Ogãs, Atabaqueiros e Sambas)</h4>
                          <p className="text-sm text-charcoal/75 leading-relaxed">O coração pulsante da gira. A musicalidade no terreiro é oração cantada que evoca e sustenta a força ancestral.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <InstitutionalFooter
                onNavigate={handleNavClick}
                nextReading={{
                  kicker: "Acervo de Estudo da Corrente",
                  title: "Manual de Médiuns e Pontos Cantados",
                  description: "Consulte ou baixe em PDF o Regimento Interno da CUCA, o Livro de Pontos Cantados e o Ritual de Abertura.",
                  buttonLabel: "Acessar Documentos PDF",
                  onNavigate: () => handleNavClick('guide')
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
