import { useState } from 'react';
import { MapPin, Clock, Copy, Check, ArrowRight, Instagram, Heart } from 'lucide-react';

export interface NextReadingCardProps {
  kicker?: string;
  title: string;
  description: string;
  buttonLabel: string;
  onNavigate: () => void;
}

export function InstitutionalFooter({
  nextReading,
  onNavigate
}: {
  nextReading?: NextReadingCardProps;
  onNavigate?: (viewId: string) => void;
}) {
  const [copiedPix, setCopiedPix] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText('correntedeakuan@gmail.com');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  return (
    <footer className="mt-auto w-full bg-[#1C1917] text-[#FBF9F5] border-t border-[#C0A080]/20">
      {/* Next Recommended Chapter Banner */}
      {nextReading && (
        <div className="border-b border-white/10 bg-[#231F1D]">
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#C0A080] font-semibold block">
                {nextReading.kicker || "Continue sua Jornada na CUCA"}
              </span>
              <h3 className="text-2xl md:text-4xl font-serif font-normal text-white">
                {nextReading.title}
              </h3>
              <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                {nextReading.description}
              </p>
            </div>
            <button
              onClick={nextReading.onNavigate}
              className="inline-flex items-center gap-3 px-7 py-4 bg-vinho hover:bg-[#851414] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer shrink-0 group rounded-lg shadow-lg"
            >
              <span>{nextReading.buttonLabel}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* Main Institutional Footer Directory */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10">
        {/* Col 1: Brand & Essence */}
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/10 p-2 flex items-center justify-center shrink-0">
              <img src="/Logos/logotransparente.png" alt="Logo CUCA" className="w-full h-full object-contain invert opacity-90" />
            </div>
            <div>
              <p className="font-serif text-xl text-white tracking-wide">Casa de Umbanda Corrente de Akuan</p>
              <p className="text-xs uppercase tracking-[0.25em] text-[#C0A080] mt-0.5">Simplicidade · Fé · Caridade</p>
            </div>
          </div>
          <p className="text-sm text-white/65 leading-relaxed max-w-sm">
            Umbanda pés no chão, simples e acolhedora em Curitiba. Todo atendimento espiritual e passe energético é 100% gratuito.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="https://www.instagram.com/cuca_terreirodeumbanda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-white/80 hover:text-[#C0A080] border border-white/15 hover:border-[#C0A080]/50 px-3.5 py-2 rounded-lg transition-colors"
            >
              <Instagram size={14} className="text-[#C0A080]" />
              <span>@cuca_terreirodeumbanda</span>
            </a>
            <button
              onClick={handleCopyPix}
              className="inline-flex items-center gap-2 text-xs text-white/85 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              title="Copiar chave PIX para apoiar a manutenção do templo"
            >
              {copiedPix ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-[#C0A080]" />}
              <span>{copiedPix ? "PIX Copiado!" : "PIX: correntedeakuan@gmail.com"}</span>
            </button>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        {onNavigate && (
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2.5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#C0A080] font-semibold mb-3">A Casa & Saberes</p>
              <button onClick={() => onNavigate('home')} className="block text-white/70 hover:text-white transition-colors cursor-pointer text-left">Início & Agenda</button>
              <button onClick={() => onNavigate('history')} className="block text-white/70 hover:text-white transition-colors cursor-pointer text-left">História da Casa</button>
              <button onClick={() => onNavigate('guias')} className="block text-white/70 hover:text-white transition-colors cursor-pointer text-left">Guias Dirigentes</button>
              <button onClick={() => onNavigate('orixas')} className="block text-white/70 hover:text-white transition-colors cursor-pointer text-left">Orixás e Linhas</button>
              <button onClick={() => onNavigate('ervas')} className="block text-white/70 hover:text-white transition-colors cursor-pointer text-left">Ervas Sagradas</button>
            </div>
            <div className="space-y-2.5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#C0A080] font-semibold mb-3">Vivência & Estudo</p>
              <button onClick={() => onNavigate('visitor')} className="block text-white/70 hover:text-white transition-colors cursor-pointer text-left">Primeira Vez?</button>
              <button onClick={() => onNavigate('rituals')} className="block text-white/70 hover:text-white transition-colors cursor-pointer text-left">Rituais e Preceitos</button>
              <button onClick={() => onNavigate('medium')} className="block text-white/70 hover:text-white transition-colors cursor-pointer text-left">Quero Ser Médium</button>
              <button onClick={() => onNavigate('guide')} className="block text-white/70 hover:text-white transition-colors cursor-pointer text-left">Documentos & Pontos</button>
            </div>
          </div>
        )}

        {/* Col 3: Visit Info */}
        <div className="md:col-span-3 space-y-4 text-sm">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#C0A080] font-semibold">Visitação & Giras</p>
          <div className="flex items-start gap-2.5 text-white/75">
            <Clock size={16} className="text-[#C0A080] shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-white">Segundas-feiras às 19h30</p>
              <p className="text-xs text-white/55">Portões abertos a todos que buscam o axé</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-white/75">
            <MapPin size={16} className="text-[#C0A080] shrink-0 mt-0.5" />
            <div>
              <p className="text-white">Av. Pref. Maurício Fruet, 1230</p>
              <p className="text-xs text-white/55">Jardim Botânico · Curitiba, PR</p>
              <a
                href="https://www.google.com/maps/place/Casa+de+Umbanda+Corrente+de+Akuan/@-25.4410897,-49.2329611,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs text-[#C0A080] hover:underline mt-1"
              >
                Abrir rota no Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/45">
        <span>© {new Date().getFullYear()} Casa de Umbanda Corrente de Akuan (CUCA) · Curitiba, Paraná</span>
        <span className="flex items-center gap-1.5">
          <Heart size={12} className="text-vinho" /> Caridade gratuita, respeito e fundamento
        </span>
      </div>
    </footer>
  );
}
