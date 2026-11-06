import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Compass, 
  Flame, 
  ShieldAlert, 
  Waves, 
  Heart, 
  Sun, 
  FlameKindling, 
  Users, 
  ArrowRight, 
  Search, 
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { InstitutionalFooter } from "./InstitutionalFooter";

const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 220,
  damping: 28,
  mass: 0.9
};

const images = {
  hero: "/Header/corrente.webp",
  altar: "/Guias/Generated Image May 22, 2026 - 1_09AM.jpg",
  guias_fallback: "/Guias/Generated Image May 22, 2026 - 1_13AM.jpg",
  guerreiro: "/Header/IMG_4660.webp",
  desenho_akuan: "/Guias/cab_akuan.jpg",
  caminho: "/Header/header.webp",
  espada: "/Header/cruzamento.webp"
};

interface Guide {
  id: string;
  name: string;
  type: "caboclo" | "pretovelho" | "ere" | "outros" | "esquerda";
  typeLabel: string;
  line: string;
  shortDesc: string;
  bgImage: string;
  icon: any;
  quote: string;
  identity: string;
  description: string;
  teaching: string;
}

const ALL_GUIDES: Guide[] = [
  {
    id: "akuan",
    name: "Caboclo Akuan",
    type: "caboclo",
    typeLabel: "Caboclos",
    line: "Mensageiro de Ogum e Oxalá",
    shortDesc: "Patrono e mentor chefe da casa, símbolo de retidão, força e disciplina moderada pelo afeto.",
    bgImage: images.hero,
    icon: Compass,
    quote: "O equilíbrio entre amor e disciplina é a maior das virtudes. A força aliada ao respeito ergue templos inabaláveis.",
    identity: "Patrono Geral da CUCA",
    description: "O patrono espiritual que orienta com régua reta os passos de nossa casa. Uma energia indomável de retidão, simbolizado pela águia dourada no alto e guardado pelas sublimes panteras negras da egrégora de defensores astrais.",
    teaching: "Cultivar uma integridade irrepreensível, falar com verdade reta e estender a mão aos aflitos sem com isso retirar-lhes os aprendizados necessários de sua própria caminhada espiritual."
  },
  {
    id: "itaquaratira",
    name: "Caboclo Itaquaratira",
    type: "caboclo",
    typeLabel: "Caboclos",
    line: "Vibração de Oxóssi",
    shortDesc: "Guia refinado da cura pelas matas sagradas, guardião das folhas secretas e mestre do silêncio medicinal.",
    bgImage: "/Guias/cab_itaquaratira.jpg",
    icon: Compass,
    quote: "A mata fala com quem sabe escutar em silêncio. A cura divina está na folha e a paz na mente que sossega.",
    identity: "Doutrinador e Curador das Matas",
    description: "Espírito imponente de vasta sabedoria botânica astral. Atua diretamente na fluidificação e higienização psicoemocional, curando dores físicas e desatando amarras espirituais com o passe de folhas verdes e a seiva pura da mata.",
    teaching: "Aprender a calar os ruídos externos para ouvir a instrução sutil do Criador. A reverência à natureza e o autorrespeito restabelecem o equilíbrio vital."
  },
  {
    id: "urubata",
    name: "Caboclo Urubatã da Guia",
    type: "caboclo",
    typeLabel: "Caboclos",
    line: "Vibração de Oxalá",
    shortDesc: "Eminente mentor de altíssima evolução espiritual, conselheiro-mor e pilar de justiça inabalável.",
    bgImage: "/Header/corrente.webp",
    icon: Compass,
    quote: "Onde habita a retidão, nenhuma treva permanece. Caminhai sob a luz da paciência primordial.",
    identity: "Conselheiro e Doutrinador Geral",
    description: "Um ancião de sublime presença espiritual. Apresenta-se com cabelos cor de neve e cocar alvo, emanando uma paz indescritível que desintegra pensamentos caóticos. É o guardião da integridade iniciática e ritualística do terreiro.",
    teaching: "A elevação espiritual requer o sacrifício do próprio ego. Agir com moderação, paciência e retidão é o escudo mais impenetrável que o médium possui."
  },
  {
    id: "joaquim",
    name: "Pai Joaquim de Angola",
    type: "pretovelho",
    typeLabel: "Pretos Velhos",
    line: "Linha das Almas",
    shortDesc: "Vovô acolhedor de sabedoria secular, mestre da paciência curadora e do afeto infinito que liberta.",
    bgImage: "/Guias/Generated Image May 22, 2026 - 1_09AM.jpg",
    icon: FlameKindling,
    quote: "O terço que o preto reza cura mais que mil discursos de orgulho. Humildade é a chave de ouro deste mundo.",
    identity: "Preto Velho de Sustentação",
    description: "Um comovente exemplo de humildade e amor espiritual. Com seu cachimbo purificador, o terço de contas naturais e seu olhar que enxerga o fundo da alma, afasta as obsessões espirituais e derrama bálsamo de esperança sobre os aflitos.",
    teaching: "A aceitação consciente não é covardia: é a inteligência de plantar o bem hoje com doçura para colher a libertação de amanhã. Caminhar com simplicidade descomplica a alma."
  },
  {
    id: "anacleto",
    name: "Pai Anacleto de Xangô",
    type: "pretovelho",
    typeLabel: "Pretos Velhos",
    line: "Preto Velho sob a Lei de Xangô",
    shortDesc: "A sabedoria ancestral aliada à justiça cármica, equilibrando as mentes e restabelecendo a Lei Divina.",
    bgImage: "/Header/obi.webp",
    icon: FlameKindling,
    quote: "A balança da Lei Espiritual não erra de prato. Faça a sua parte com retidão e confie o resto ao Criador.",
    identity: "Guardião da Justiça Doutrinária",
    description: "Firme e bondoso, Pai Anacleto manipula as forças consolidadoras da mente através da vibração das pedreiras de Xangô. É o espírito que acalma as revoltas interiores e ensina as leis do carma com doçura, mas absoluta firmeza.",
    teaching: "Toda ação gera uma reverberação eterna no tecido cósmico. Decidir pelo correto, mesmo quando difícil, é o que liberta a consciência do peso da culpa."
  },
  {
    id: "anastacia",
    name: "Vó Anastácia",
    type: "pretovelho",
    typeLabel: "Pretos Velhos",
    line: "Linha da Caridade e Cura Espiritual",
    shortDesc: "Alma acolhedora de aconchego materno incomparável, curadora de enfermidades sutis e aflições domésticas.",
    bgImage: "/Header/Generated (1).webp",
    icon: Heart,
    quote: "A maior reza vem do silêncio do coração que ama sem pedir nada em troca.",
    identity: "Preta Velha Curadora",
    description: "A vovó que ouve com doçura indizível e cura através do amor fraternal. Com cheiro de erva-doce e flores do campo, recolhe as dores e tristezas do consulente, acalentando corações feridos e limpando miasmas espirituais do âmbito familiar.",
    teaching: "O amor incondicional dissolve qualquer amargura. Ser paciente com as imperfeições alheias é o caminho definitivo para pacificar a si mesmo."
  },
  {
    id: "juninho",
    name: "Erê Juninho",
    type: "ere",
    typeLabel: "Linhas Neutras & Erês",
    line: "Linha de Ibeji (Crianças)",
    shortDesc: "Pureza infantil transbordante de luz, alegria pura que desintegra o mal com riso franco e renovação sagrada.",
    bgImage: "/Header/Generated.webp",
    icon: Sun,
    quote: "Quem sorri pro mundo de coração aberto não dá espaço pra sombra fazer ninho na cabeça.",
    identity: "Energia da Alegria e Renovação",
    description: "Uma força espiritual dotada de inocência avassaladora. Com suas risadas, brincadeiras de pés descalços e amor puro, atua na higienização rápida da egrégora do terreiro, desarmando feitiçarias e transmutando pesos de depressão em centelhas de vida.",
    teaching: "Reconectar-se com a sua criança interna e manter a vida leve. O riso verdadeiro e descompromissado é uma das ferramentas espirituais mais potentes de defesa."
  },
  {
    id: "zoio",
    name: "Marinheiro Zóio",
    type: "outros",
    typeLabel: "Linhas Neutras",
    line: "Povo da Água · Marinheiros",
    shortDesc: "Espírito valente das marés que equilibra nossas tormentas emocionais e limpa as águas da alma.",
    bgImage: "/Header/amacimeu.webp",
    icon: Waves,
    quote: "O mar é balanço que limpa! Deixa as ondas levarem embora o que o peito não precisa mais guardar.",
    identity: "Guardião dos Oceanos e Limpeza Emocional",
    description: "Exímio limpador psíquico que atua descarregando mágoas, ressentimentos e culpas nas profundezas da calunga grande (o mar). Traz o balanço rítmico das ondas e a força revigorante do sal astral para renovar o ânimo dos consulentes.",
    teaching: "A correnteza da vida é mutável, mas o leme deve se apoiar na retidão moral. Não tema as tormentas passageiras: elas apenas limpam o convés para novas conquistas."
  },
  {
    id: "ramon",
    name: "Cigano Ramon",
    type: "outros",
    typeLabel: "Linhas Neutras",
    line: "Povo do Oriente · Ciganos",
    shortDesc: "Guia carismático de caminhos abertos, estimulador da prosperidade moral, liberdade e progresso criativo.",
    bgImage: "/Carrosel/CUCA-126.webp",
    icon: Users,
    quote: "Caminhar sob as estrelas é saber que o mundo é grande e a alma é livre para criar o seu próprio rumo dourado.",
    identity: "Orientador de Caminhos e Prosperidade",
    description: "Elegante e magnético, Ramon atua quebrando amarras de estagnação material e intelectual. Estimula a autoestima positiva, clareia escolhas de carreira e nos ensina o desapego saudável dos fardos supérfluos da jornada terrena.",
    teaching: "A verdadeira riqueza espiritual consiste em não temer recomeçar. Ser dono do próprio livre-arbítrio com responsabilidade abre caminhos em qualquer terreno difícil."
  },
  {
    id: "antonio",
    name: "Boiadeiro Antônio Matogrosso",
    type: "outros",
    typeLabel: "Linhas Neutras",
    line: "Linha de Boiadeiros",
    shortDesc: "Laçador audaz de energias densas, combatente implacável da inveja que resguarda o solo com bravura sagrada.",
    bgImage: "/Carrosel/CUCA-127.webp",
    icon: Users,
    quote: "Boi que desgarra na mata escura o boiadeiro laça e traz de volta pro pasto limpo. Firmeza na rédea, meu irmão!",
    identity: "Defensor das Fronteiras Espirituais",
    description: "Firme, intrépido e vigoroso. Boiadeiro Antônio estala seu laço no astral para isolar perturbações, recolher obsessores recalcitrantes e proteger o terreiro e seus médiuns de investidas de inveja crônica ou desequilíbrios psíquicos coletivos.",
    teaching: "Ter pés plantados firmes no chão, coragem para encarar as provações cotidianas e manter guarda severa sobre suas próprias companhias e pensamentos."
  },
  {
    id: "trancarua",
    name: "Exú Tranca Ruas das Almas",
    type: "esquerda",
    typeLabel: "Guardiões (Esquerda)",
    line: "Linha dos Guardiões · Esquerda",
    shortDesc: "Grande sentinela do terreiro, executor da lei cármica nas encruzilhadas, trancando o mal e abrindo luz.",
    bgImage: "/Header/cruzamento.webp",
    icon: ShieldAlert,
    quote: "Eu tranco o mal que tenta entrar, mas abro o caminho de quem anda com verdade eterna nos pés.",
    identity: "Grande Guardião de Frente e Tronqueira",
    description: "Com uma dignidade nobre e elegância austera, reina nas fronteiras invisíveis do bem e da retidão. Tranca Ruas atua na purificação energética pesada, vigia a tronqueira da casa contra intromissões caóticas e corrige o engano e a hipocrisia espiritual.",
    teaching: "O respeito absoluto às leis espirituais é inegociável. Não há atalho oculto: apenas o esforço virtuoso sincero garante a verdadeira proteção espiritual."
  },
  {
    id: "mariapadilha",
    name: "Pomba-Gira Maria Padilha das Almas",
    type: "esquerda",
    typeLabel: "Guardiões (Esquerda)",
    line: "Linha de Esquerda · Equilíbrio Magnético",
    shortDesc: "Guardiã de altíssimo magnetismo sutil, purificadora do subconsciente e destruidora de ilusões tóxicas.",
    bgImage: "/Header/preceito.webp",
    icon: Flame,
    quote: "A gargalhada da Padilha quebra espelho de ilusão e ergue a cabeça do humilhado com dignidade e amor.",
    identity: "Sentinela de Equilíbrio das Linhas do Amor",
    description: "Dona de um poder magnético purificador, ela age diluindo obsessões ligadas a orgulhos, paixões destrutivas, medos secretos e baixa autoestima crônica. Sua gargalhada límpida e elegante desmancha energias nocivas e limpa o ego de ilusões dolorosas.",
    teaching: "Olhar para as próprias fraquezas com coragem absoluta de transformá-las. Amar a si mesmo divinamente para que possa respeitar o sagrado que habita nos demais."
  }
];

export function GuiasDirigentesView({ 
  onBack,
  onNavigate
}: { 
  onBack: () => void;
  onNavigate?: (viewId: string) => void;
}) {
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const el = document.getElementById("guias-main-container");
    if (el) el.scrollTop = 0;
  }, [selectedGuideId]);

  const currentIndex = useMemo(() => {
    if (!selectedGuideId) return -1;
    return ALL_GUIDES.findIndex((g) => g.id === selectedGuideId);
  }, [selectedGuideId]);

  const selectedGuide = currentIndex >= 0 ? ALL_GUIDES[currentIndex] : undefined;

  const filteredGuides = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_GUIDES.filter((guide) => {
      const matchesType =
        filterType === "all" ||
        (filterType === "caboclo" && guide.type === "caboclo") ||
        (filterType === "pretovelho" && guide.type === "pretovelho") ||
        (filterType === "esquerda" && guide.type === "esquerda") ||
        (filterType === "outros" && (guide.type === "outros" || guide.type === "ere"));

      if (!matchesType) return false;
      if (!q) return true;

      return (
        guide.name.toLowerCase().includes(q) ||
        guide.line.toLowerCase().includes(q) ||
        guide.shortDesc.toLowerCase().includes(q) ||
        guide.teaching.toLowerCase().includes(q)
      );
    });
  }, [filterType, searchQuery]);

  const prevGuide = currentIndex >= 0 ? ALL_GUIDES[(currentIndex - 1 + ALL_GUIDES.length) % ALL_GUIDES.length] : null;
  const nextGuide = currentIndex >= 0 ? ALL_GUIDES[(currentIndex + 1) % ALL_GUIDES.length] : null;

  return (
    <div 
      id="guias-main-container"
      className="w-full h-full flex flex-col bg-[#FBF9F5] text-charcoal overflow-y-auto overscroll-none"
    >
      <AnimatePresence mode="wait">
        {!selectedGuideId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={SPRING_TRANSITION}
            className="flex-1 w-full flex flex-col"
          >
            {/* Header Section */}
            <section className="relative w-full pt-32 pb-20 md:pt-36 md:pb-24 px-6 bg-[#1C1917] text-[#FBF9F5] flex flex-col items-center justify-center text-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
                <img src="/Header/header.webp" alt="" className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/60 to-transparent" />
              </div>
              
              <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-[#C0A080] font-semibold">
                  <span className="h-px w-8 bg-[#C0A080]/50" />
                  <span>A Corrente Espiritual · 12 Mentores</span>
                  <span className="h-px w-8 bg-[#C0A080]/50" />
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-tight text-white">
                  Nossos <span className="italic text-[#C0A080]">Guias Dirigentes</span>
                </h1>

                <p className="text-white/80 font-serif font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                  As egrégoras de amor, proteção e evolução que amparam nossos consulentes e governam as giras sagradas sob a regência do Caboclo Akuan.
                </p>

                <div className="pt-2">
                  <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 border border-white/20 hover:border-[#C0A080] text-white/80 hover:text-white px-6 py-3 rounded-xl uppercase text-xs tracking-widest font-semibold transition-all cursor-pointer backdrop-blur-sm bg-white/5"
                  >
                    <ArrowLeft size={15} /> Voltar para História da Casa
                  </button>
                </div>
              </div>
            </section>

            {/* SEARCH & FILTER BAR IN CRYSTAL */}
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mt-12 pb-24 flex-1">
              <div className="crystal-panel p-4 md:p-6 rounded-2xl mb-12 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1">
                  <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/45" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar guia por nome, linha de trabalho ou ensinamento..."
                    className="w-full pl-11 pr-9 py-3 bg-white/85 backdrop-blur-sm border border-charcoal/15 rounded-xl text-sm text-charcoal placeholder:text-charcoal/45 focus:outline-none focus:border-vinho"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/45 hover:text-charcoal"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 crystal-card p-1.5 rounded-xl">
                  {[
                    { id: "all", label: "Todos (12)" },
                    { id: "caboclo", label: "Caboclos" },
                    { id: "pretovelho", label: "Pretos Velhos" },
                    { id: "outros", label: "Linhas Neutras & Erês" },
                    { id: "esquerda", label: "Guardiões (Esquerda)" }
                  ].map((tab) => {
                    const active = filterType === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setFilterType(tab.id)}
                        className={`relative px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          active
                            ? 'text-white'
                            : 'text-charcoal/70 hover:text-charcoal'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="guideFilterActivePill"
                            transition={SPRING_TRANSITION}
                            className="absolute inset-0 rounded-lg bg-vinho shadow-sm"
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* GRID OF GUIDES */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredGuides.map((guide) => {
                  const IconComp = guide.icon;
                  const isPatron = guide.id === "akuan";
                  return (
                    <motion.article
                      key={guide.id}
                      whileHover={{ y: -5 }}
                      transition={SPRING_TRANSITION}
                      onClick={() => setSelectedGuideId(guide.id)}
                      className={`group cursor-pointer rounded-3xl overflow-hidden transition-all flex flex-col justify-between p-7 md:p-8 relative ${
                        isPatron
                          ? "md:col-span-2 crystal-dark text-[#FBF9F5]"
                          : "crystal-card text-charcoal"
                      }`}
                    >
                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-xs uppercase tracking-[0.2em] font-bold ${isPatron ? "text-[#C0A080]" : "text-vinho"}`}>
                            {guide.line}
                          </span>
                          <div className={`p-2.5 rounded-full transition-colors ${
                            isPatron
                              ? "bg-[#C0A080]/20 text-[#C0A080] group-hover:bg-[#C0A080] group-hover:text-[#1C1917]"
                              : "bg-vinho/10 text-vinho group-hover:bg-vinho group-hover:text-white"
                          }`}>
                            <IconComp size={16} strokeWidth={1.75} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h2 className={`font-serif text-2xl md:text-3xl font-normal ${isPatron ? "text-white" : "text-charcoal group-hover:text-vinho"} transition-colors`}>
                            {guide.name}
                          </h2>
                          <p className={`text-sm md:text-base leading-relaxed ${isPatron ? "text-white/80 max-w-2xl" : "text-charcoal/75"}`}>
                            {guide.shortDesc}
                          </p>
                        </div>

                        <div className={`p-4 rounded-xl text-xs italic font-serif ${isPatron ? "crystal-dark-subcard text-[#C0A080]" : "crystal-panel text-charcoal/80"}`}>
                          “{guide.quote}”
                        </div>
                      </div>

                      <div className={`relative z-10 pt-5 mt-6 border-t flex items-center justify-between text-xs font-bold uppercase tracking-widest ${
                        isPatron ? "border-white/15 text-[#C0A080]" : "border-charcoal/10 text-vinho"
                      }`}>
                        <span>{isPatron ? "Ler História Completa do Patrono" : "Conhecer Doutrina e Ensinamento"}</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>

            <InstitutionalFooter onNavigate={onNavigate} />
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING_TRANSITION}
            className="flex-1 w-full bg-[#FBF9F5] relative flex flex-col"
          >
            {/* Top Sticky Back & Guide Switcher Crystal Bar */}
            <div className="sticky top-20 z-30 crystal-pill border-b border-vinho/15 px-6 md:px-12 py-3 flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedGuideId(null)}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-vinho hover:underline cursor-pointer"
              >
                <ArrowLeft size={15} />
                <span>Todos os Guias (12)</span>
              </button>

              <div className="flex items-center gap-4 text-xs">
                {prevGuide && (
                  <button
                    onClick={() => setSelectedGuideId(prevGuide.id)}
                    className="inline-flex items-center gap-1.5 text-charcoal/70 hover:text-vinho font-medium cursor-pointer"
                    title={`Anterior: ${prevGuide.name}`}
                  >
                    <ChevronLeft size={15} />
                    <span className="hidden sm:inline">{prevGuide.name}</span>
                  </button>
                )}
                <span className="text-charcoal/30">|</span>
                {nextGuide && (
                  <button
                    onClick={() => setSelectedGuideId(nextGuide.id)}
                    className="inline-flex items-center gap-1.5 text-charcoal/70 hover:text-vinho font-medium cursor-pointer"
                    title={`Próximo: ${nextGuide.name}`}
                  >
                    <span className="hidden sm:inline">{nextGuide.name}</span>
                    <ChevronRight size={15} />
                  </button>
                )}
              </div>
            </div>

            {selectedGuideId === "akuan" ? (
              <div className="w-full flex flex-col">
                {/* Section 1: Hero */}
                <section className="relative w-full min-h-[65svh] flex items-center justify-center overflow-hidden bg-[#1C1917]">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={images.hero}
                      alt="Caboclo Akuan" 
                      className="w-full h-full object-cover opacity-35 grayscale-[30%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1C1917]/80 via-[#1C1917]/60 to-[#FBF9F5]"></div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto pt-24 pb-20 space-y-6">
                    <span className="text-[#C0A080] uppercase tracking-[0.35em] font-semibold text-xs">
                      Patrono Geral da CUCA · Mensageiro de Ogum e Oxalá
                    </span>
                    <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-white font-normal tracking-tight leading-none drop-shadow-md">
                      O Caboclo <span className="italic text-[#C0A080]">Akuan</span>
                    </h1>
                    <p className="text-white/85 font-serif italic text-lg md:text-xl max-w-2xl mx-auto">
                      Narrado por Pai João de Ogum, dirigente da Casa de Umbanda Corrente de Akuan
                    </p>
                  </div>
                </section>

                {/* Section 2: Raízes Familiares */}
                <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-[#FBF9F5]">
                  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
                    <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl aspect-[4/5] bg-charcoal">
                      <img 
                        src={images.altar} 
                        alt="Altar e luzes de velas" 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="lg:col-span-7 space-y-8">
                      <div className="space-y-4">
                        <span className="text-xs uppercase tracking-[0.25em] font-bold text-vinho">
                          01 · Herança Espiritual
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">
                          Uma presença familiar <span className="italic text-vinho font-normal">desde a infância</span>
                        </h2>
                        <p className="text-charcoal/85 text-base md:text-lg leading-relaxed prose-editorial">
                          Na família onde o dirigente cresceu, o nome <strong>Akuan</strong> não era raro de se ouvir nas mesas de domingo. Simbolizava força, altivez e liderança: era o caboclo cujo médium era seu tio-avô, <strong>Pai Fernando de Ogum</strong>, fundador do Terreiro do Pai Maneco.
                        </p>
                      </div>
                      
                      <div className="crystal-panel p-6 md:p-8 rounded-2xl space-y-3">
                        <h3 className="text-lg font-serif text-vinho font-medium">
                          O início da jornada mediúnica (2009)
                        </h3>
                        <p className="text-charcoal/85 text-sm md:text-base leading-relaxed">
                          O dirigente fez seu amaci em 2009 e iniciou o trabalho espiritual antes mesmo da maioridade, servindo de instrumento para que o Caboclo Akuan e o Caboclo Tupinambá fundamentassem o axé da gira de Ogum às segundas-feiras.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 3: O Encontro */}
                <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-[#1C1917] text-[#FBF9F5]">
                  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
                    <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
                      <span className="text-[#C0A080] uppercase tracking-[0.3em] font-semibold text-xs">
                        02 · O Chamado de Cabeça
                      </span>
                      <h2 className="text-3xl md:text-5xl font-serif leading-tight text-white">
                        A chegada — sem estrondo, <span className="italic text-[#C0A080]">com familiaridade</span>
                      </h2>
                      <div className="space-y-4 text-white/80 text-base md:text-lg leading-relaxed prose-editorial">
                        <p>
                          Como médium jovem, esperava um impacto estrondoso. Mas o Caboclo Akuan apresentou-se com naturalidade serena. A adequação ocorreu de forma gradual: as guias antigas foram dando lugar a sementes, contas naturais e dentes.
                        </p>
                        <p>
                          Aos poucos, compreendeu que aquele espírito assumiria definitivamente o lugar de seu pai de cabeça, consolidando sua presença e sua verdade na condução da nova casa.
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-5 aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl order-1 lg:order-2 border border-white/15">
                      <img 
                        src={images.guias_fallback} 
                        alt="Guia de sementes e contas naturais" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </section>

                {/* Section 4: A Identidade do Espírito */}
                <section className="w-full bg-[#FBF9F5] py-20 px-6 md:px-12 lg:px-24 border-t border-vinho/10">
                  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
                    <div className="lg:col-span-7 space-y-6">
                      <span className="text-xs uppercase tracking-[0.25em] font-bold text-vinho">
                        03 · Iconografia & Falange
                      </span>
                      <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">
                        A Identidade do Espírito
                      </h2>
                      <div className="space-y-4 text-charcoal/85 text-base md:text-lg leading-relaxed prose-editorial">
                        <p>
                          Ao longo da caminhada, revelaram-se suas múltiplas faces: do <strong>vermelho de Ogum</strong>, sua cor principal, passando pelo laranja, pelo preto e chegando ao <strong>branco de Oxalá</strong>.
                        </p>
                        <p>
                          É acompanhado por uma <strong className="text-vinho">águia dourada</strong> e é patrono de uma falange de <strong className="text-charcoal">panteras negras</strong> — guardiães espirituais que atuam na interceptação de forças densas e na defesa do terreiro.
                        </p>
                        <p>
                          Apresenta-se como um indígena firme, alto, de olhar penetrante e marcas da iconografia do Centro-Oeste brasileiro, empunhando sua lança com retidão e equilíbrio.
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                      <figure className="w-full max-w-[380px] crystal-card p-4 rounded-2xl">
                        <img 
                          src={images.desenho_akuan} 
                          alt="Retrato do Caboclo Akuan com a Águia Dourada" 
                          className="w-full h-auto object-contain rounded-xl"
                        />
                        <figcaption className="mt-3 text-center text-xs font-serif italic text-charcoal/65">
                          Caboclo Akuan e a Águia Dourada — Acervo CUCA
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </section>

                {/* Section 5: Ensinamento Central */}
                <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-[#F3EFE6]">
                  <div className="max-w-4xl mx-auto text-center space-y-8">
                    <span className="text-xs uppercase tracking-[0.25em] font-bold text-vinho">
                      04 · O Ensinamento Central
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-charcoal">
                      Liderança com Amor e Disciplina
                    </h2>
                    <p className="text-base md:text-lg text-charcoal/85 leading-relaxed prose-editorial">
                      Suas palavras são retas e diretas, sem curvas; mas seu abraço é largo e acolhedor. É pai que orienta, limita, reconduz, recupera e acredita. A mensagem que deixa é cultivar uma vida honesta, em que se estende a mão para amparar sem jamais retirar do outro a responsabilidade pelo próprio aprendizado.
                    </p>
                    <div className="crystal-card p-8 md:p-10 rounded-3xl">
                      <p className="text-xl md:text-2xl text-charcoal font-serif italic leading-relaxed">
                        “Pai Akuan ensinou que o equilíbrio entre amor e disciplina é a maior das virtudes, e que a força aliada ao respeito é capaz de erguer casas e entrelaçar correntes na grande obra espiritual.”
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              /* OTHER 11 GUIDES DETAIL VIEW IN CRYSTAL */
              <div className="w-full flex flex-col">
                <section className="relative w-full py-24 md:py-28 px-6 bg-[#1C1917] text-[#FBF9F5] text-center overflow-hidden">
                  <div className="absolute inset-0 z-0 opacity-30">
                    <img 
                      src={selectedGuide?.bgImage}
                      alt={selectedGuide?.name} 
                      className="w-full h-full object-cover grayscale-[20%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/70 to-[#1C1917]/40"></div>
                  </div>

                  <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                    <span className="text-[#C0A080] uppercase tracking-[0.3em] font-semibold text-xs block">
                      {selectedGuide?.line} · {selectedGuide?.identity}
                    </span>
                    <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal">
                      {selectedGuide?.name}
                    </h1>
                  </div>
                </section>

                <section className="w-full py-16 md:py-20 px-6 md:px-12 max-w-5xl mx-auto space-y-12">
                  {/* Quote Highlight */}
                  <div className="crystal-panel p-8 md:p-10 rounded-3xl text-center space-y-3">
                    <p className="font-serif italic text-2xl md:text-3xl text-charcoal leading-relaxed">
                      “{selectedGuide?.quote}”
                    </p>
                    <span className="block text-xs uppercase tracking-[0.25em] text-vinho font-bold">
                      — {selectedGuide?.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="crystal-card p-8 rounded-3xl space-y-3">
                      <h2 className="text-xs uppercase tracking-[0.22em] font-bold text-vinho">
                        Presença e Atuação na Gira
                      </h2>
                      <p className="text-base md:text-lg text-charcoal/85 leading-relaxed prose-editorial">
                        {selectedGuide?.description}
                      </p>
                    </div>

                    <div className="crystal-card p-8 rounded-3xl space-y-3">
                      <h2 className="text-xs uppercase tracking-[0.22em] font-bold text-vinho">
                        Ensinamento Moral e Espiritual
                      </h2>
                      <p className="text-base md:text-lg text-charcoal/85 leading-relaxed prose-editorial">
                        {selectedGuide?.teaching}
                      </p>
                    </div>
                  </div>

                  {/* Next / Prev Guide Cards */}
                  <div className="pt-8 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {prevGuide && (
                      <button
                        onClick={() => setSelectedGuideId(prevGuide.id)}
                        className="w-full sm:w-auto flex items-center gap-3 px-6 py-4 crystal-card rounded-2xl text-left cursor-pointer"
                      >
                        <ChevronLeft size={18} className="text-vinho shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-charcoal/50 block">Guia Anterior</span>
                          <span className="font-serif text-base text-charcoal font-medium">{prevGuide.name}</span>
                        </div>
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedGuideId(null)}
                      className="px-6 py-3 text-xs uppercase tracking-widest font-bold text-vinho hover:underline cursor-pointer"
                    >
                      Ver Todos os 12 Guias
                    </button>

                    {nextGuide && (
                      <button
                        onClick={() => setSelectedGuideId(nextGuide.id)}
                        className="w-full sm:w-auto flex items-center justify-end gap-3 px-6 py-4 crystal-card rounded-2xl text-right cursor-pointer"
                      >
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-charcoal/50 block">Próximo Guia</span>
                          <span className="font-serif text-base text-charcoal font-medium">{nextGuide.name}</span>
                        </div>
                        <ChevronRight size={18} className="text-vinho shrink-0" />
                      </button>
                    )}
                  </div>
                </section>
              </div>
            )}

            <InstitutionalFooter onNavigate={onNavigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
