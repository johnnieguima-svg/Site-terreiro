import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageHeader } from './PageHeader';
import { FloatingReadingIndex } from './FloatingReadingIndex';
import { InstitutionalFooter } from './InstitutionalFooter';
import { 
  X, 
  Search, 
  Wind, 
  Flame, 
  Mountain, 
  Droplets, 
  Sparkles, 
  HeartPulse, 
  Brain, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  Leaf
} from 'lucide-react';

const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 220,
  damping: 28,
  mass: 0.9
};

export interface HerbItem {
  id: string;
  name: string;
  scientificName: string;
  quickPurpose: string;
  orixas: string;
  applicationPart: string;
  prepMethod: string;
  bodyProperties: string;
  use: string;
  imageSrc: string;
}

export interface HerbCategory {
  id: string;
  title: string;
  subtitle: string;
  element: 'Ar' | 'Fogo' | 'Terra' | 'Água';
  intentKey: 'calma' | 'descarrego' | 'protecao' | 'emocional';
  intentLabel: string;
  temperamentName: string;
  vitalQualities: string;
  applicationRule: string;
  applicationWarning: boolean;
  oneLineSummary: string;
  humanBalanced: string;
  humanExcess: string;
  desc: string;
  biological: string;
  psychological: string;
  spiritual: string;
  // Palatable high-contrast color tokens blended with crystal translucent surfaces
  theme: {
    panelBg: string;
    cardBg: string;
    border: string;
    borderStrong: string;
    headingText: string;
    accentText: string;
    badgeBg: string;
    badgeText: string;
    pillActiveBg: string;
    iconBg: string;
    hex: string;
  };
  herbs: HerbItem[];
}

const HERB_CATEGORIES: HerbCategory[] = [
  {
    id: "ervas-aeradas",
    title: "Ervas Aeradas",
    subtitle: "O Sussurro do Céu e a Sublimação",
    element: "Ar",
    intentKey: "calma",
    intentLabel: "Paz Mental, Intuição & Amaci",
    temperamentName: "Sanguíneo",
    vitalQualities: "Quente e Úmido",
    applicationRule: "Liberadas para a Coroa (Amaci) e corpo todo",
    applicationWarning: false,
    oneLineSummary: "Flores e folhas aromáticas sutis que acalmam pensamentos acelerados, elevam a intuição e conectam a coroa aos Guias e Orixás.",
    humanBalanced: "Pessoas comunicativas, alegres, expansivas e de mente ágil — o calor da vida pulsante.",
    humanExcess: "Dispersão, ansiedade constante, pensamentos agitados e sensação de viver 'com a cabeça nas nuvens'.",
    desc: "Sutis, florais e delicadas, as Ervas Aeradas carregam o princípio de elevar a vibração. Seus aromas voláteis atuam rapidamente nas sinapses nervosas, limpando a confusão mental e trazendo leveza imediata.",
    biological: "Ricas em flavonoides e óleos essenciais finos. Atuam como neuromoduladores suaves, antiespasmódicos e calmantes naturais do sistema nervoso e digestório.",
    psychological: "Dissipam a nuvem da ansiedade, restauram a serenidade mental, despertam a criatividade e aliviam o peso emocional.",
    spiritual: "Ideais para lavar a coroa (Ori) e preparar Amacis. Elevam a sintonia do médium para a conexão sutil com o Anjo da Guarda e Guias de Luz.",
    theme: {
      panelBg: "bg-[#FCF8EE]/80 backdrop-blur-xl",
      cardBg: "crystal-card",
      border: "border-[#D97706]/20",
      borderStrong: "border-[#D97706]/45",
      headingText: "text-[#78350F]",
      accentText: "text-[#92400E]",
      badgeBg: "bg-[#FEF3C7]/90 backdrop-blur-sm",
      badgeText: "text-[#92400E]",
      pillActiveBg: "bg-[#92400E] text-white",
      iconBg: "bg-[#FEF3C7] text-[#92400E]",
      hex: "#B45309"
    },
    herbs: [
      {
        id: "camomila",
        name: "Camomila",
        scientificName: "Matricaria chamomilla",
        quickPurpose: "Paz profunda e alívio da ansiedade",
        orixas: "Oxalá · Oxum · Ibeji (Erês)",
        applicationPart: "Coroa e corpo todo",
        prepMethod: "Infusão morna (flores secas) ou maceração suave",
        bodyProperties: "Calmante, sedativo leve, espasmolítico e anti-inflamatório natural do sistema digestório.",
        imageSrc: "https://images.unsplash.com/photo-1605330836561-12502847b3ed?w=600&q=80",
        use: "Suas flores douradas promovem profunda paz de espírito, serenam o coração aflito e abrem conexão com as Linhas de Cura e Crianças."
      },
      {
        id: "alecrim",
        name: "Alecrim",
        scientificName: "Rosmarinus officinalis",
        quickPurpose: "Clareza mental, foco e alegria",
        orixas: "Oxalá · Oxóssi",
        applicationPart: "Coroa e corpo todo",
        prepMethod: "Maceração das folhas frescas em água fresca",
        bodyProperties: "Estimulante cognitivo, tônico revigorante, antioxidante potente e auxiliar da memória.",
        imageSrc: "https://images.unsplash.com/photo-1596500474668-cb86c2eac694?w=600&q=80",
        use: "De aroma volátil e luminoso, clareia a intuição, afasta a tristeza mental e 'abre o ar' para o pensamento elevado."
      },
      {
        id: "rosa-branca",
        name: "Rosa Branca",
        scientificName: "Rosa alba",
        quickPurpose: "Harmonia espiritual e elevação do Ori",
        orixas: "Oxalá · Iemanjá · Pretos Velhos",
        applicationPart: "Coroa (Amaci) e corpo todo",
        prepMethod: "Maceração delicada das pétalas em água mineral",
        bodyProperties: "Ação adstringente suave, propriedades calmantes para a pele e efeito relaxante sensorial.",
        imageSrc: "https://images.unsplash.com/photo-1518701005037-d53b1f67bb1c?w=600&q=80",
        use: "Símbolo maior de pureza na Umbanda; pacifica o espírito, harmoniza o lar e eleva a mente aos domínios de Oxalá."
      },
      {
        id: "macela",
        name: "Macela",
        scientificName: "Achyrocline satureioides",
        quickPurpose: "Sono tranquilo e consolo da alma",
        orixas: "Oxalá · Nanã · Pretos Velhos",
        applicationPart: "Coroa e corpo todo",
        prepMethod: "Infusão suave das inflorescências",
        bodyProperties: "Antiespasmódica, relaxante muscular suave, anti-inflamatória e protetora gástrica.",
        imageSrc: "https://images.unsplash.com/photo-1508344928928-7137b29de272?w=600&q=80",
        use: "Suas flores minúsculas acalmam tempestades mentais, acolhem o choro contido e trazem a paz serena dos Pretos Velhos."
      }
    ]
  },
  {
    id: "ervas-picantes",
    title: "Ervas Picantes",
    subtitle: "O Calor da Transmutação e a Calcinação",
    element: "Fogo",
    intentKey: "descarrego",
    intentLabel: "Descarrego Pesado, Coragem & Corte",
    temperamentName: "Colérico",
    vitalQualities: "Quente e Seco",
    applicationRule: "Apenas do pescoço para baixo (Nunca na coroa)",
    applicationWarning: true,
    oneLineSummary: "Plantas quentes e incisivas que queimam larvas astrais, cortam demandas e despertam a força de vontade e o movimento.",
    humanBalanced: "Liderança, coragem, atitude decidida e forte ímpeto realizador diante dos desafios.",
    humanExcess: "Irritabilidade, impaciência, autoritarismo, explosões de raiva e desgaste energético por tensão.",
    desc: "Guardiãs do elemento Fogo, são forjadas sob a vibração do Quente e Seco. Espiritualmente, agem como uma lâmina luminosa: queimam miasmas, cortam laços estagnados e despertam os centros vitais quando há apatia.",
    biological: "Ricas em alcaloides, capsaicina e compostos aromáticos intensos. São termogênicas, vasodilatadoras e potentes bactericidas e fungicidas naturais.",
    psychological: "Destroem a apatia e a inércia. Cortam pensamentos obsessivos ou derrotistas, devolvendo coragem visceral e foco ativo.",
    spiritual: "Banhos de descarrego pesado e defumações de limpeza. Queimam formas-pensamento densas e quebram feitiços. Jamais devem ser jogadas na cabeça.",
    theme: {
      panelBg: "bg-[#FDF3F2]/80 backdrop-blur-xl",
      cardBg: "crystal-card",
      border: "border-[#B91C1C]/20",
      borderStrong: "border-[#B91C1C]/45",
      headingText: "text-[#7F1D1D]",
      accentText: "text-[#991B1B]",
      badgeBg: "bg-[#FEE2E2]/90 backdrop-blur-sm",
      badgeText: "text-[#991B1B]",
      pillActiveBg: "bg-[#991B1B] text-white",
      iconBg: "bg-[#FEE2E2] text-[#991B1B]",
      hex: "#991B1B"
    },
    herbs: [
      {
        id: "arruda",
        name: "Arruda",
        scientificName: "Ruta graveolens",
        quickPurpose: "Quebra imediata de inveja e mau-olhado",
        orixas: "Ogum · Exu · Pretos Velhos",
        applicationPart: "Apenas do pescoço para baixo / Benzimento",
        prepMethod: "Maceração leve ou benzimento com galhos frescos",
        bodyProperties: "Estimulante circulatório e antimicrobiano tópico. Uso estritamente externo em banhos e benzeduras.",
        imageSrc: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80",
        use: "No aroma forte de suas folhas reside a fogueira purificadora que desagrega miasmas, inveja e fluidos pesados."
      },
      {
        id: "aroeira-pimenta",
        name: "Aroeira Vermelha e Pimentas",
        scientificName: "Schinus terebinthifolia / Capsicum",
        quickPurpose: "Choque térmico astral e abertura de caminhos",
        orixas: "Ogum · Iansã · Exu",
        applicationPart: "Estritamente do pescoço para baixo (diluído)",
        prepMethod: "Infusão leve e bem coada (cuidado com olhos e mucosas)",
        bodyProperties: "Ação termogênica, vasodilatadora e revigorante periférica. Exige parcimônia para evitar irritação na pele.",
        imageSrc: "https://images.unsplash.com/photo-1589136125016-5627f12e8736?w=600&q=80",
        use: "Despertam o campo áurico instantaneamente, cortam paralisias espirituais e colocam a vida em movimento."
      },
      {
        id: "alho-cebola",
        name: "Cascas de Alho e Cebola",
        scientificName: "Allium sativum / Allium cepa",
        quickPurpose: "Defumação esterilizante de ambientes",
        orixas: "Ogum · Omulu · Guardiões",
        applicationPart: "Defumação do ambiente e do corpo",
        prepMethod: "Queima das cascas secas sobre brasa de carvão vegetal",
        bodyProperties: "Compostos sulfurados bactericidas e fungicidas potentes que purificam o ar do ambiente.",
        imageSrc: "https://images.unsplash.com/photo-1615477209377-a89fa7a909f1?w=600&q=80",
        use: "Tradicionais na defumação de descarrego para esterilizar o ambiente e dissolver formas-pensamento estagnadas."
      },
      {
        id: "canela",
        name: "Canela em Pau",
        scientificName: "Cinnamomum verum",
        quickPurpose: "Vitalidade, magnetismo e prosperidade",
        orixas: "Oxum · Iansã · Povo Cigano",
        applicationPart: "Do pescoço para baixo ou defumação",
        prepMethod: "Decocção (fervura leve das cascas por 5 minutos)",
        bodyProperties: "Termogênica, estimulante metabólica e aquecedora da circulação periférica.",
        imageSrc: "https://images.unsplash.com/photo-1550258169-7de47728cecc?w=600&q=80",
        use: "Aquece o ânimo abatido, atrai movimento próspero e restaura a autoconfiança e o magnetismo pessoal."
      }
    ]
  },
  {
    id: "ervas-fibrosas",
    title: "Ervas Fibrosas",
    subtitle: "A Força da Terra e a Coagulação",
    element: "Terra",
    intentKey: "protecao",
    intentLabel: "Aterramento, Escudo & Firmeza",
    temperamentName: "Melancólico",
    vitalQualities: "Frio e Seco",
    applicationRule: "Do pescoço para baixo · Banhos de Firmeza e Bate-Folha",
    applicationWarning: false,
    oneLineSummary: "Folhas rígidas, cascas e raízes que constroem um escudo protetor, aterram a mediunidade e trazem estrutura emocional.",
    humanBalanced: "Pessoas analíticas, silenciosas, resilientes, fiéis às suas raízes e dotadas de grande senso de dever.",
    humanExcess: "Rigidez excessiva, isolamento, apego a dores do passado e sensação de peso nos ombros.",
    desc: "Cascas firmes, caules lenhosos e fibras resistentes absorvem a força estruturante da Terra. Na Umbanda, são aplicadas quando precisamos 'aterrar' energias dispersas e fechar o corpo contra investidas externas.",
    biological: "Ricas em taninos, sais minerais e compostos adstringentes. Tonificam os tecidos, auxiliam na cicatrização e fortalecem a estrutura física.",
    psychological: "Promovem aterramento imediato ('pés no chão'). Combatem a dissociação mental, estabelecem limites saudáveis e fortalecem a resiliência.",
    spiritual: "Folhas de firmeza e escudo magnético. Criam uma malha protetora ao redor da aura do médium e do consulente, impedindo vazamentos energéticos.",
    theme: {
      panelBg: "bg-[#F3F7F2]/80 backdrop-blur-xl",
      cardBg: "crystal-card",
      border: "border-[#15803D]/20",
      borderStrong: "border-[#15803D]/45",
      headingText: "text-[#14532D]",
      accentText: "text-[#166534]",
      badgeBg: "bg-[#DCFCE7]/90 backdrop-blur-sm",
      badgeText: "text-[#166534]",
      pillActiveBg: "bg-[#166534] text-white",
      iconBg: "bg-[#DCFCE7] text-[#166534]",
      hex: "#166534"
    },
    herbs: [
      {
        id: "espada-sao-jorge",
        name: "Espada de São Jorge",
        scientificName: "Dracaena trifasciata",
        quickPurpose: "Escudo impenetrável e corte de demandas",
        orixas: "Ogum · Oxóssi · Iansã",
        applicationPart: "Do pescoço para baixo ou cruzamento de proteção",
        prepMethod: "Folha cortada em 3 ou 7 partes em água fresca (uso externo)",
        bodyProperties: "Planta purificadora do ar ambiente; de uso exclusivamente externo e ritualístico.",
        imageSrc: "https://images.unsplash.com/photo-1596547609652-9fc5d8d1309b?w=600&q=80",
        use: "Suas fibras retas e inquebráveis concedem a couraça protetora de Ogum, cortando projeções negativas."
      },
      {
        id: "jurema-preta",
        name: "Jurema Preta",
        scientificName: "Mimosa tenuiflora",
        quickPurpose: "Força ancestral e firmeza de Caboclo",
        orixas: "Oxóssi · Caboclos · Boiadeiros",
        applicationPart: "Banhos de firmeza (pescoço para baixo)",
        prepMethod: "Decocção leve das cascas ou maceração das folhas",
        bodyProperties: "Altíssima concentração de taninos com potente ação cicatrizante, adstringente e regeneradora tópica.",
        imageSrc: "https://images.unsplash.com/photo-1611915387288-fd8d1f5f928b?w=600&q=80",
        use: "Árvore sagrada da tradição brasileira; conecta o médium à firmeza inabalável dos Caboclos e mestres da mata."
      },
      {
        id: "aroeira-folha",
        name: "Aroeira (Folhas e Casca)",
        scientificName: "Schinus terebinthifolia",
        quickPurpose: "Limpeza profunda e guarda dos Pretos Velhos",
        orixas: "Ogum · Pretos Velhos · Exu",
        applicationPart: "Apenas do pescoço para baixo / Bate-folha",
        prepMethod: "Maceração ou infusão rápida das folhas",
        bodyProperties: "Adstringente, balsâmica, cicatrizante e antisséptica natural de amplo espectro.",
        imageSrc: "https://images.unsplash.com/photo-1518531933067-c8120fa9b478?w=600&q=80",
        use: "Árvore guardiã da CUCA; suas raízes e folhas varrem densidades da aura e sustentam o fundamento do terreiro."
      },
      {
        id: "guine",
        name: "Guiné",
        scientificName: "Petiveria alliacea",
        quickPurpose: "Ancoragem mediúnica e proteção contra obsessores",
        orixas: "Oxóssi · Ogum · Pretos Velhos",
        applicationPart: "Do pescoço para baixo",
        prepMethod: "Maceração das folhas frescas (uso exclusivamente externo)",
        bodyProperties: "Ação analgésica e anti-inflamatória tópica tradicional (planta de uso externo restrito).",
        imageSrc: "https://images.unsplash.com/photo-1605556209867-0c7f212239f8?w=600&q=80",
        use: "Aterra a mediunidade dispersa, absorve cargas negativas de ambientes pesados e ancora o guia com segurança."
      }
    ]
  },
  {
    id: "ervas-canforadas",
    title: "Ervas Canforadas",
    subtitle: "A Medicina das Águas e a Dissolução",
    element: "Água",
    intentKey: "emocional",
    intentLabel: "Esfriar a Cabeça, Perdão & Alívio Emocional",
    temperamentName: "Fleumático",
    vitalQualities: "Frio e Úmido",
    applicationRule: "Ideais para banhos apaziguadores e equilíbrio do Ori",
    applicationWarning: false,
    oneLineSummary: "Folhas refrescantes e suculentas que 'esfriam cabeças quentes', lavam mágoas guardadas no peito e restauram a fluidez.",
    humanBalanced: "Pessoas pacientes, diplomáticas, acolhedoras e capazes de manter a calma em meio às tormentas.",
    humanExcess: "Estagnação, sentimentos engolidos, nostalgia paralisante e dificuldade de desapegar de mágoas.",
    desc: "Folhas ricas em água celular, mentol e mucilagens espelham a energia receptiva da Água. São o bálsamo que 'esfria cabeças quentes', dissolve rancores calcificados e lava o campo áurico sem agredi-lo.",
    biological: "Ricas em mentol, cânfora e eucaliptol. Descongestionam as vias respiratórias, aliviam dores de cabeça tensionais e refrescam o corpo.",
    psychological: "Dissolvem nós de tristeza no peito, ajudam na liberação de emoções reprimidas e evitam reações impulsivas.",
    spiritual: "Lavam e regeneram a aura após choques emocionais, discussões ou atendimentos intensos, devolvendo frescor e paz ao espírito.",
    theme: {
      panelBg: "bg-[#F1F7FA]/80 backdrop-blur-xl",
      cardBg: "crystal-card",
      border: "border-[#0369A1]/20",
      borderStrong: "border-[#0369A1]/45",
      headingText: "text-[#0C4A6E]",
      accentText: "text-[#075985]",
      badgeBg: "bg-[#E0F2FE]/90 backdrop-blur-sm",
      badgeText: "text-[#075985]",
      pillActiveBg: "bg-[#075985] text-white",
      iconBg: "bg-[#E0F2FE] text-[#075985]",
      hex: "#0369A1"
    },
    herbs: [
      {
        id: "hortela",
        name: "Hortelã",
        scientificName: "Mentha spicata",
        quickPurpose: "Refrescar pensamentos excessivos e cansaço",
        orixas: "Iemanjá · Oxum · Oxóssi",
        applicationPart: "Corpo todo (inclusive têmporas e fronte)",
        prepMethod: "Maceração das folhas frescas em água fria ou morna",
        bodyProperties: "Analgésica suave, digestiva, refrescante e descongestionante natural das vias respiratórias.",
        imageSrc: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=600&q=80",
        use: "Traz o frescor imediato das águas; esfria a mente sobrecarregada e renova o ânimo com suavidade."
      },
      {
        id: "manjericao",
        name: "Manjericão",
        scientificName: "Ocimum basilicum",
        quickPurpose: "Grande apaziguador do Ori (cabeça) e do lar",
        orixas: "Oxalá · Oxum · Iemanjá",
        applicationPart: "Coroa (Amaci) e corpo todo",
        prepMethod: "Maceração das folhas frescas com prece",
        bodyProperties: "Antioxidante, anti-inflamatório, relaxante da tensão nervosa e harmonizador digestivo.",
        imageSrc: "https://images.unsplash.com/photo-1615486171430-8be08adfc3bb?w=600&q=80",
        use: "Uma das folhas mais nobres da Umbanda; pacifica o Ori, reconstrói a aura desgastada e atrai harmonia familiar."
      },
      {
        id: "poejo-levante",
        name: "Poejo e Levante",
        scientificName: "Mentha pulegium / Mentha viridis",
        quickPurpose: "Lavar tristezas do peito e reerguer as forças",
        orixas: "Iemanjá · Nanã · Marinheiros",
        applicationPart: "Coroa e corpo todo",
        prepMethod: "Maceração fresca ou infusão suave",
        bodyProperties: "Expectorante, balsâmica para a respiração e revigorante suave da circulação.",
        imageSrc: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
        use: "Como o próprio nome diz, o Levante 'levanta' o espírito abatido enquanto o Poejo lava as densidades emocionais do coração."
      },
      {
        id: "canfora",
        name: "Cânfora (Folhas)",
        scientificName: "Cinnamomum camphora",
        quickPurpose: "Assepsia fluídica profunda e alívio de dores",
        orixas: "Omulu · Iemanjá · Linha Médica",
        applicationPart: "Do pescoço para baixo",
        prepMethod: "Maceração das folhas frescas em água fresca",
        bodyProperties: "Ação refrescante intensa, antisséptica e aliviadora de dores musculares e tensões físicas.",
        imageSrc: "https://images.unsplash.com/photo-1628154101439-d754ec4dd77f?w=600&q=80",
        use: "Realiza uma limpeza quase cirúrgica no corpo astral, desagregando miasmas persistentes e esfriando processos inflamatórios sutis."
      }
    ]
  }
];

function ElementIcon({ element, size = 20 }: { element: HerbCategory['element']; size?: number }) {
  switch (element) {
    case 'Ar':
      return <Wind size={size} strokeWidth={1.75} />;
    case 'Fogo':
      return <Flame size={size} strokeWidth={1.75} />;
    case 'Terra':
      return <Mountain size={size} strokeWidth={1.75} />;
    case 'Água':
      return <Droplets size={size} strokeWidth={1.75} />;
  }
}

function HerbImageWithFallback({
  src,
  alt,
  element,
  accentHex,
  className = ""
}: {
  src: string;
  alt: string;
  element: HerbCategory['element'];
  accentHex: string;
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${accentHex}22, ${accentHex}08)`
        }}
      >
        <Leaf size={28} style={{ color: accentHex }} strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-widest mt-2 font-semibold" style={{ color: accentHex }}>
          {alt} · {element}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className={className}
      loading="lazy"
    />
  );
}

export function ErvasView({
  onScroll,
  onNavigate
}: {
  onScroll?: (e: any) => void;
  onNavigate?: (viewId: string) => void;
}) {
  const [selectedElement, setSelectedElement] = useState<'all' | HerbCategory['element']>('all');
  const [selectedIntent, setSelectedIntent] = useState<'all' | HerbCategory['intentKey']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalHerbId, setActiveModalHerbId] = useState<string | null>(null);
  const [showPrepGuide, setShowPrepGuide] = useState(false);

  // Flatten all herbs for modal navigation
  const allHerbsFlat = useMemo(() => {
    return HERB_CATEGORIES.flatMap((cat) =>
      cat.herbs.map((herb) => ({ herb, category: cat }))
    );
  }, []);

  const currentModalIndex = useMemo(() => {
    if (!activeModalHerbId) return -1;
    return allHerbsFlat.findIndex((item) => item.herb.id === activeModalHerbId);
  }, [activeModalHerbId, allHerbsFlat]);

  const currentModalData = currentModalIndex >= 0 ? allHerbsFlat[currentModalIndex] : null;

  // Filter categories and herbs
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return HERB_CATEGORIES.filter((cat) => {
      if (selectedElement !== 'all' && cat.element !== selectedElement) return false;
      if (selectedIntent !== 'all' && cat.intentKey !== selectedIntent) return false;
      return true;
    })
      .map((cat) => {
        if (!q) return cat;
        const matchingHerbs = cat.herbs.filter(
          (h) =>
            h.name.toLowerCase().includes(q) ||
            h.scientificName.toLowerCase().includes(q) ||
            h.quickPurpose.toLowerCase().includes(q) ||
            h.use.toLowerCase().includes(q) ||
            h.bodyProperties.toLowerCase().includes(q) ||
            h.orixas.toLowerCase().includes(q) ||
            cat.title.toLowerCase().includes(q) ||
            cat.element.toLowerCase().includes(q)
        );
        return { ...cat, herbs: matchingHerbs };
      })
      .filter((cat) => cat.herbs.length > 0);
  }, [selectedElement, selectedIntent, searchQuery]);

  const chapters = [
    { id: 'ervas-fundamento', number: '01', label: 'Como Funcionam' },
    { id: 'ervas-bussola', number: '02', label: 'Busca & Filtro' },
    { id: 'ervas-aeradas', number: '03', label: 'Ar · Aeradas' },
    { id: 'ervas-picantes', number: '04', label: 'Fogo · Picantes' },
    { id: 'ervas-fibrosas', number: '05', label: 'Terra · Fibrosas' },
    { id: 'ervas-canforadas', number: '06', label: 'Água · Canforadas' },
  ];

  const handleIntentClick = (intent: 'all' | HerbCategory['intentKey']) => {
    setSelectedIntent(intent === selectedIntent ? 'all' : intent);
    setSelectedElement('all');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={SPRING_TRANSITION}
      onScroll={onScroll}
      className="flex-1 flex flex-col bg-[#FBF9F5] overflow-y-auto overscroll-none"
    >
      <FloatingReadingIndex chapters={chapters} title="Herbário CUCA" />

      <PageHeader
        kicker="Magia Botânica & Fitoenergética"
        meta="4 Elementos · 16 Plantas Sagradas"
        title="Ervas Sagradas"
        subtitle={
          <>
            "Sem folha não há Orixá, sem erva não há Umbanda." <br className="hidden sm:inline" />
            Um guia visual e prático para compreender o elemento, o temperamento e o uso de cada planta.
          </>
        }
        imageSrc="/Header/header.webp"
      />

      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 pb-28 space-y-20">
        {/* =========================================================
            SEÇÃO 1: ESTRUTURA DE TEXTO PALATÁVEL E ESCANEÁVEL EM CRISTAL
            ========================================================= */}
        <section id="ervas-fundamento" className="scroll-mt-28 space-y-12 pt-4">
          {/* Síntese Central */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.28em] font-bold text-vinho block">
              01 · A Ciência Sagrada das Folhas
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">
              Por que cada planta age de um jeito no corpo e na alma?
            </h2>
            <p className="text-base md:text-lg text-charcoal/80 leading-relaxed prose-editorial">
              Antes da química moderna, Hipócrates e Cláudio Galeno descobriram que a natureza e o ser humano são regidos por <strong>quatro qualidades vitais</strong> que formam os <strong>Quatro Elementos</strong>. Na Umbanda, escolhemos a folha certa observando a temperatura energética da planta e a necessidade de quem vai tomar o banho.
            </p>
          </div>

          {/* Matriz Visual Rápida das 4 Qualidades -> 4 Elementos */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {HERB_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ y: -4 }}
                transition={SPRING_TRANSITION}
                onClick={() => {
                  const el = document.getElementById(cat.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`text-left p-5 rounded-2xl border ${cat.theme.panelBg} ${cat.theme.border} hover:${cat.theme.borderStrong} shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between gap-4`}
              >
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${cat.theme.badgeBg} ${cat.theme.badgeText}`}>
                    <ElementIcon element={cat.element} size={14} />
                    {cat.element}
                  </span>
                  <span className="text-xs font-medium text-charcoal/60">
                    {cat.vitalQualities}
                  </span>
                </div>
                <div>
                  <h3 className={`text-xl font-serif font-medium ${cat.theme.headingText} group-hover:underline`}>
                    {cat.title}
                  </h3>
                  <p className="text-xs text-charcoal/75 mt-1 leading-relaxed">
                    {cat.intentLabel}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* As 2 Leis Práticas em Caixas de Cristal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 crystal-panel p-6 md:p-8 rounded-3xl">
            <div className="crystal-card p-6 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#075985]">
                  1ª Lei · Cura pelos Opostos
                </span>
                <span className="text-xs text-charcoal/50 font-medium">Para Acalmar e Equilibrar</span>
              </div>
              <h3 className="text-xl font-serif text-charcoal">
                Quando há excesso de calor, usamos o frescor
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                Se a pessoa está com a <strong>mente fervendo, ansiosa, irritada ou após uma briga</strong> (excesso de fogo/calor), aplicamos ervas <strong>Frias ou Aeradas</strong> (como Hortelã, Manjericão ou Camomila) para esfriar a cabeça e devolver a paz.
              </p>
            </div>

            <div className="crystal-card p-6 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#991B1B]">
                  2ª Lei · Estímulo pelos Semelhantes
                </span>
                <span className="text-xs text-charcoal/50 font-medium">Para Despertar e Cortar</span>
              </div>
              <h3 className="text-xl font-serif text-charcoal">
                Quando há apatia ou peso, ativamos o fogo
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                Se a pessoa está <strong>sem forças, estagnada ou carregada de inveja/demanda</strong> (frieza e paralisia), aplicamos ervas <strong>Quentes ou Fibrosas</strong> (como Arruda, Aroeira, Canela ou Espada) para queimar o miasma e despertar o vigor.
              </p>
            </div>
          </div>

          {/* Botão expansível para o Guia Rápido de Preparo em 4 Passos */}
          <div className="crystal-card rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowPrepGuide(!showPrepGuide)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#F3EFE6]/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-vinho shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-charcoal block">
                    Como preparar e tomar seu Banho de Ervas corretamente?
                  </span>
                  <span className="text-xs text-charcoal/60">
                    Clique para ver os 4 passos práticos (Maceração, Infusão, Aplicação e Descarte)
                  </span>
                </div>
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-vinho shrink-0 ml-4">
                {showPrepGuide ? 'Ocultar ↑' : 'Ver Guia ↓'}
              </span>
            </button>

            <AnimatePresence>
              {showPrepGuide && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={SPRING_TRANSITION}
                  className="overflow-hidden border-t border-vinho/10"
                >
                  <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#FBF9F5]/70">
                    {[
                      {
                        step: "01",
                        title: "Pedido de Licença",
                        desc: "Retire as folhas com respeito e oração. Lave-as em água corrente para retirar impurezas físicas antes de iniciar."
                      },
                      {
                        step: "02",
                        title: "Maceração ou Infusão",
                        desc: "Ervas frescas: quine (amasse) com as mãos na água fria cantando ou rezando, depois morne. Ervas secas ou cascas: abafe em água quente."
                      },
                      {
                        step: "03",
                        title: "Hora do Banho",
                        desc: "Após seu banho de higiene normal, despeje o banho coado devagar. Ervas quentes/picantes vão apenas do pescoço para baixo."
                      },
                      {
                        step: "04",
                        title: "Secagem e Retorno",
                        desc: "Seque-se apenas dando leves toques com a toalha. Devolva as ervas coadas à terra ou em um jardim, agradecendo à natureza."
                      }
                    ].map((s) => (
                      <div key={s.step} className="crystal-card p-5 rounded-xl space-y-2">
                        <span className="font-mono text-xs font-bold text-vinho">{s.step}</span>
                        <h4 className="font-serif text-lg text-charcoal font-medium">{s.title}</h4>
                        <p className="text-xs text-charcoal/75 leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* =========================================================
            SEÇÃO 2: BÚSSOLA INTERATIVA DE BUSCA E FILTRO EM CRISTAL
            ========================================================= */}
        <section
          id="ervas-bussola"
          className="scroll-mt-28 sticky top-20 z-20 crystal-pill p-4 md:p-6 rounded-2xl space-y-4"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search input */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/45" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por erva (ex: alecrim, arruda), Orixá ou necessidade (ex: ansiedade, descarrego)..."
                className="w-full pl-11 pr-10 py-3 bg-white/85 backdrop-blur-sm border border-charcoal/15 rounded-xl text-sm text-charcoal placeholder:text-charcoal/45 focus:outline-none focus:border-vinho transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal p-1"
                  title="Limpar busca"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Element Color-Coded Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => {
                  setSelectedElement('all');
                  setSelectedIntent('all');
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedElement === 'all' && selectedIntent === 'all'
                    ? 'bg-charcoal text-white shadow-sm'
                    : 'bg-white/80 text-charcoal/75 border border-charcoal/10 hover:text-charcoal'
                }`}
              >
                Todas (16)
              </button>

              {HERB_CATEGORIES.map((cat) => {
                const isActive = selectedElement === cat.element;
                return (
                  <button
                    key={cat.element}
                    onClick={() => {
                      setSelectedElement(isActive ? 'all' : cat.element);
                      setSelectedIntent('all');
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? `${cat.theme.pillActiveBg} border-transparent shadow-sm`
                        : `${cat.theme.badgeBg} ${cat.theme.badgeText} ${cat.theme.border} hover:opacity-90`
                    }`}
                  >
                    <ElementIcon element={cat.element} size={14} />
                    <span>{cat.element} · {cat.title.replace('Ervas ', '')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Intent Selector Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-charcoal/5 text-xs">
            <span className="text-charcoal/55 font-medium mr-1">O que você precisa hoje?</span>
            {[
              { key: 'calma' as const, label: 'Acalmar a Mente & Coroa' },
              { key: 'descarrego' as const, label: 'Descarrego & Quebrar Demanda' },
              { key: 'protecao' as const, label: 'Escudo & Aterramento' },
              { key: 'emocional' as const, label: 'Esfriar Cabeça & Curar Mágoas' }
            ].map((intent) => {
              const active = selectedIntent === intent.key;
              return (
                <button
                  key={intent.key}
                  onClick={() => handleIntentClick(intent.key)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-vinho text-white'
                      : 'bg-[#F3EFE6]/90 text-charcoal/80 hover:bg-vinho/10 hover:text-vinho'
                  }`}
                >
                  {intent.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            SEÇÃO 3: CATEGORIAS ELEMENTAIS E CARTÕES COM FOTO AO LADO
            ========================================================= */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 crystal-card rounded-3xl p-8 space-y-4">
            <p className="text-xl font-serif text-charcoal">
              Nenhuma erva encontrada para "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedElement('all');
                setSelectedIntent('all');
              }}
              className="px-5 py-2.5 bg-vinho text-white text-xs uppercase tracking-widest font-semibold rounded-lg cursor-pointer"
            >
              Mostrar todas as 16 ervas
            </button>
          </div>
        ) : (
          <div className="space-y-20">
            {filteredCategories.map((category) => (
              <motion.section
                key={category.id}
                id={category.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={SPRING_TRANSITION}
                className={`scroll-mt-36 rounded-3xl p-6 sm:p-8 md:p-12 border ${category.theme.panelBg} ${category.theme.border} space-y-10 shadow-[0_12px_36px_-10px_rgba(28,25,23,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)]`}
              >
                {/* 1. CABEÇALHO DO ELEMENTO COM CÓDIGO DE CORES DE FÁCIL LEITURA */}
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal/10 pb-5">
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
                      <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg ${category.theme.pillActiveBg} shadow-sm`}>
                        <ElementIcon element={category.element} size={15} />
                        <span>Elemento {category.element}</span>
                      </span>
                      <span className={`px-3 py-1.5 rounded-lg border ${category.theme.badgeBg} ${category.theme.badgeText} ${category.theme.border}`}>
                        Temperamento {category.temperamentName} ({category.vitalQualities})
                      </span>
                    </div>

                    {/* Regra de aplicação clara com ícone de segurança */}
                    <div
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
                        category.applicationWarning
                          ? 'bg-[#FEE2E2]/90 text-[#991B1B] border border-[#EF4444]/30'
                          : 'crystal-card text-charcoal'
                      }`}
                    >
                      {category.applicationWarning ? (
                        <AlertTriangle size={14} className="shrink-0 text-[#991B1B]" />
                      ) : (
                        <CheckCircle2 size={14} className="shrink-0 text-emerald-700" />
                      )}
                      <span>{category.applicationRule}</span>
                    </div>
                  </div>

                  {/* Título e Síntese de 1 Frase */}
                  <div className="max-w-4xl space-y-3">
                    <div className="text-xs uppercase tracking-[0.22em] font-bold opacity-75" style={{ color: category.theme.hex }}>
                      {category.subtitle}
                    </div>
                    <h3 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-normal ${category.theme.headingText}`}>
                      {category.title}
                    </h3>
                    <p className="text-lg md:text-xl font-serif text-charcoal leading-relaxed">
                      {category.oneLineSummary}
                    </p>
                  </div>

                  {/* Quadro Escaneável: Como age no Corpo, na Mente e no Espírito */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className={`${category.theme.cardBg} p-5 rounded-2xl border ${category.theme.border} space-y-2`}>
                      <div className={`flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold ${category.theme.accentText}`}>
                        <HeartPulse size={15} />
                        <span>1. No Corpo Físico</span>
                      </div>
                      <p className="text-sm text-charcoal/85 leading-relaxed">
                        {category.biological}
                      </p>
                    </div>

                    <div className={`${category.theme.cardBg} p-5 rounded-2xl border ${category.theme.border} space-y-2`}>
                      <div className={`flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold ${category.theme.accentText}`}>
                        <Brain size={15} />
                        <span>2. Na Mente e Emoções</span>
                      </div>
                      <p className="text-sm text-charcoal/85 leading-relaxed">
                        {category.psychological}
                      </p>
                    </div>

                    <div className={`${category.theme.cardBg} p-5 rounded-2xl border ${category.theme.border} space-y-2`}>
                      <div className={`flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold ${category.theme.accentText}`}>
                        <ShieldCheck size={15} />
                        <span>3. No Ritual e Espírito</span>
                      </div>
                      <p className="text-sm text-charcoal/85 leading-relaxed">
                        {category.spiritual}
                      </p>
                    </div>
                  </div>

                  {/* Temperamento Humano Resumido em Duas Colunas Fáceis */}
                  <div className={`${category.theme.cardBg} p-5 rounded-2xl border ${category.theme.border} grid grid-cols-1 md:grid-cols-12 gap-4 items-center`}>
                    <div className="md:col-span-4 space-y-1">
                      <span className={`text-[11px] uppercase tracking-[0.2em] font-bold ${category.theme.accentText}`}>
                        Arquétipo Humano ({category.temperamentName})
                      </span>
                      <p className="text-xs text-charcoal/70 leading-relaxed">
                        {category.desc}
                      </p>
                    </div>
                    <div className="md:col-span-4 bg-[#FBF9F5]/80 p-3.5 rounded-xl border border-charcoal/10">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                        Em Equilíbrio
                      </span>
                      <p className="text-xs text-charcoal/80 leading-relaxed">
                        {category.humanBalanced}
                      </p>
                    </div>
                    <div className="md:col-span-4 bg-[#FBF9F5]/80 p-3.5 rounded-xl border border-charcoal/10">
                      <span className="text-[11px] font-bold text-[#991B1B] uppercase tracking-wider block mb-1">
                        Em Desequilíbrio (Quando usar)
                      </span>
                      <p className="text-xs text-charcoal/80 leading-relaxed">
                        {category.humanExcess}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. GRADE DE CARTÕES DAS ERVAS COM FOTOGRAFIA AO LADO DE CADA ERVA */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs uppercase tracking-[0.25em] font-bold ${category.theme.accentText}`}>
                      Plantas Sagradas deste Elemento ({category.herbs.length})
                    </h4>
                    <span className="text-xs text-charcoal/55 hidden sm:inline">
                      Clique em qualquer planta para abrir a ficha completa de preparo
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {category.herbs.map((herb) => (
                      <motion.article
                        key={herb.id}
                        whileHover={{ y: -4 }}
                        transition={SPRING_TRANSITION}
                        onClick={() => setActiveModalHerbId(herb.id)}
                        className={`group cursor-pointer rounded-2xl ${category.theme.cardBg} border ${category.theme.border} hover:${category.theme.borderStrong} overflow-hidden flex flex-col sm:flex-row items-stretch`}
                      >
                        {/* IMAGEM BOTÂNICA AO LADO DA ERVA */}
                        <div className="sm:w-44 md:w-48 h-48 sm:h-auto shrink-0 relative overflow-hidden bg-charcoal/5 border-b sm:border-b-0 sm:border-r border-charcoal/10">
                          <HerbImageWithFallback
                            src={herb.imageSrc}
                            alt={herb.name}
                            element={category.element}
                            accentHex={category.theme.hex}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:hidden pointer-events-none" />
                          <span
                            className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm ${category.theme.badgeBg} ${category.theme.badgeText}`}
                          >
                            {category.element}
                          </span>
                        </div>

                        {/* CONTEÚDO ESTRUTURADO E PALATÁVEL AO LADO DA IMAGEM */}
                        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h5 className={`font-serif text-2xl font-medium ${category.theme.headingText} group-hover:underline leading-tight`}>
                                  {herb.name}
                                </h5>
                                <p className="text-xs italic font-serif text-charcoal/60">
                                  {herb.scientificName} · <span className="not-italic font-sans text-charcoal/70">{herb.orixas}</span>
                                </p>
                              </div>
                            </div>

                            {/* Destaque Rápido: Para que serve */}
                            <div className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${category.theme.badgeBg} ${category.theme.badgeText}`}>
                              {herb.quickPurpose}
                            </div>

                            {/* Duas linhas claras: Uso Espiritual + Corpo */}
                            <div className="space-y-1.5 pt-1 text-xs md:text-sm text-charcoal/85 leading-relaxed">
                              <p>
                                <strong className={`font-semibold ${category.theme.accentText}`}>No Axé: </strong>
                                {herb.use}
                              </p>
                              <p className="text-xs text-charcoal/70">
                                <strong className="font-semibold text-charcoal/85">No Corpo: </strong>
                                {herb.bodyProperties}
                              </p>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-charcoal/10 flex items-center justify-between text-xs">
                            <span className="text-charcoal/60 font-medium truncate">
                              Uso: <strong className="text-charcoal/85">{herb.applicationPart}</strong>
                            </span>
                            <span className={`font-bold uppercase tracking-wider ${category.theme.accentText} group-hover:translate-x-1 transition-transform shrink-0 ml-2`}>
                              Ficha & Preparo →
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        )}

        {/* Aviso de Sabedoria no Final em Cristal */}
        <div className="crystal-panel rounded-3xl p-8 md:p-10 max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-12 h-12 rounded-full bg-vinho/10 text-vinho flex items-center justify-center shrink-0">
            <Info size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-[0.25em] text-vinho font-bold">
              Sabedoria dos Antigos · "Erva sem reza é apenas mato"
            </h4>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              A manipulação sagrada das folhas exige respeito ao Oró (o fundamento botânico do ritual) e uma prece sincera. Lembre-se sempre: o banho de ervas atua no campo energético e emocional como amparo espiritual, mas <strong>jamais substitui o diagnóstico ou tratamento médico</strong>. Se você possui alergia a alguma planta, informe imediatamente a entidade durante a consulta.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          MODAL DETALHADO DA ERVA EM CRISTAL COM NAVEGAÇÃO ANTERIOR / PRÓXIMA
          ========================================================= */}
      <AnimatePresence>
        {currentModalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalHerbId(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1917]/80 backdrop-blur-md p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={SPRING_TRANSITION}
              onClick={(e) => e.stopPropagation()}
              className="crystal-pill max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative my-auto"
            >
              <button
                onClick={() => setActiveModalHerbId(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 text-white hover:bg-vinho transition-colors cursor-pointer"
                aria-label="Fechar ficha da erva"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Coluna Esquerda: Imagem + Resumo Elemental */}
              <div className="md:w-2/5 relative flex flex-col bg-[#1C1917] text-white">
                <div className="h-64 md:h-full min-h-[280px] relative overflow-hidden">
                  <HerbImageWithFallback
                    src={currentModalData.herb.imageSrc}
                    alt={currentModalData.herb.name}
                    element={currentModalData.category.element}
                    accentHex={currentModalData.category.theme.hex}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/30 to-transparent" />
                </div>

                <div className="p-6 space-y-3 relative z-10 -mt-16">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${currentModalData.category.theme.badgeBg} ${currentModalData.category.theme.badgeText}`}
                  >
                    <ElementIcon element={currentModalData.category.element} size={13} />
                    Elemento {currentModalData.category.element} · {currentModalData.category.vitalQualities}
                  </span>
                  <div className="text-xs text-white/80 space-y-1 pt-2 border-t border-white/15">
                    <p><strong className="text-[#C0A080]">Vibração / Orixás:</strong> {currentModalData.herb.orixas}</p>
                    <p><strong className="text-[#C0A080]">Onde aplicar:</strong> {currentModalData.herb.applicationPart}</p>
                    <p><strong className="text-[#C0A080]">Preparo indicado:</strong> {currentModalData.herb.prepMethod}</p>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Ficha Completa */}
              <div className="md:w-3/5 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div>
                    <span className={`text-xs uppercase tracking-[0.2em] font-bold ${currentModalData.category.theme.accentText}`}>
                      {currentModalData.category.title} · {currentModalData.herb.quickPurpose}
                    </span>
                    <h3 className="font-serif text-3xl md:text-5xl text-charcoal font-normal mt-1">
                      {currentModalData.herb.name}
                    </h3>
                    <p className="text-charcoal/60 italic font-serif text-base mt-1">
                      {currentModalData.herb.scientificName}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${currentModalData.category.theme.panelBg} ${currentModalData.category.theme.border} space-y-1.5`}>
                    <h4 className={`text-xs uppercase tracking-[0.2em] font-bold ${currentModalData.category.theme.accentText}`}>
                      Uso Espiritual e Energético na Umbanda
                    </h4>
                    <p className="text-sm md:text-base text-charcoal/90 leading-relaxed">
                      {currentModalData.herb.use}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl crystal-card space-y-1.5">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-charcoal/60">
                      Propriedades no Corpo Físico (Fitoterapia)
                    </h4>
                    <p className="text-sm md:text-base text-charcoal/85 leading-relaxed">
                      {currentModalData.herb.bodyProperties}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl crystal-panel space-y-1">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-vinho">
                      Como preparar esta erva ({currentModalData.herb.prepMethod})
                    </h4>
                    <p className="text-xs text-charcoal/80 leading-relaxed">
                      Acenda uma vela branca para seu Anjo da Guarda se desejar, firme seu pensamento e faça a {currentModalData.herb.prepMethod.toLowerCase()}. Coe antes de levar ao banheiro e despeje conforme a regra ({currentModalData.herb.applicationPart.toLowerCase()}).
                    </p>
                  </div>
                </div>

                {/* Navegação Anterior / Próxima Erva */}
                <div className="pt-4 border-t border-charcoal/10 flex items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      const prevIndex = (currentModalIndex - 1 + allHerbsFlat.length) % allHerbsFlat.length;
                      setActiveModalHerbId(allHerbsFlat[prevIndex].herb.id);
                    }}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-charcoal/70 hover:text-vinho transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                    <span>{allHerbsFlat[(currentModalIndex - 1 + allHerbsFlat.length) % allHerbsFlat.length].herb.name}</span>
                  </button>

                  <span className="text-xs font-mono tabular-nums text-charcoal/45">
                    {currentModalIndex + 1} / {allHerbsFlat.length}
                  </span>

                  <button
                    onClick={() => {
                      const nextIndex = (currentModalIndex + 1) % allHerbsFlat.length;
                      setActiveModalHerbId(allHerbsFlat[nextIndex].herb.id);
                    }}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-charcoal/70 hover:text-vinho transition-colors cursor-pointer"
                  >
                    <span>{allHerbsFlat[(currentModalIndex + 1) % allHerbsFlat.length].herb.name}</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <InstitutionalFooter
        onNavigate={onNavigate}
        nextReading={
          onNavigate
            ? {
                kicker: "Próximo Capítulo Recomendado",
                title: "Orixás e Linhas de Trabalho",
                description: "Agora que você conhece a força sagrada das folhas, descubra as vibrações dos Orixás e as falanges de Guias que regem os trabalhos da CUCA.",
                buttonLabel: "Conhecer Orixás e Guias",
                onNavigate: () => onNavigate('orixas')
              }
            : undefined
        }
      />
    </motion.div>
  );
}
