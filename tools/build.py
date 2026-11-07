#!/usr/bin/env python3
"""Gera as páginas estáticas do site da CUCA em site/.

Uso: python3 tools/build.py
O resultado (site/*.html) é HTML puro: é isso que vai para a hospedagem.
Os textos das páginas internas vêm de tools/conteudo/prototipo.json
(extraído do protótipo do AI Studio) e de tools/paginas.py.
"""
import html, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'site')
SITE_URL = 'https://www.cucacuritiba.com.br'  # ajuste quando o domínio for registrado

WHATS_NUM = '5541997176648'
WHATS_MSG = 'Olá! Quero ir à gira da CUCA pela primeira vez.'
WHATS = 'https://wa.me/%s?text=%s' % (WHATS_NUM, 'Ol%C3%A1!%20Quero%20ir%20%C3%A0%20gira%20da%20CUCA%20pela%20primeira%20vez.')
MAPA = 'https://www.google.com/maps/place/Casa+de+Umbanda+Corrente+de+Akuan/@-25.4410897,-49.2329611,17z'
INSTA = 'https://www.instagram.com/cuca_terreirodeumbanda'
PIX = 'correntedeakuan@gmail.com'
# ---------- Agenda (Google Agenda da CUCA, precisa estar pública) ----------
CAL_ID = 'f5534c610f767d5f956240c38babfe2906187568f61676b90eb921b9d6b5f5e6@group.calendar.google.com'
_CAL_Q = CAL_ID.replace('@', '%40')
_CAL_OPTS = '&ctz=America%2FSao_Paulo&showTitle=0&showPrint=0&showCalendars=0&showTz=0&wkst=2&hl=pt_BR&bgcolor=%23F1EEE8&color=%238E1B26'
AGENDA = 'https://calendar.google.com/calendar/embed?src=%s%s&mode=AGENDA&showTabs=0&showNav=1&showDate=0' % (_CAL_Q, _CAL_OPTS)
AGENDA_MES = 'https://calendar.google.com/calendar/embed?src=%s%s&mode=MONTH&showTabs=1&showNav=1' % (_CAL_Q, _CAL_OPTS)
CAL_ADD = 'https://calendar.google.com/calendar/render?cid=%s' % _CAL_Q
CAL_ICS = 'https://calendar.google.com/calendar/ical/%s/public/basic.ics' % _CAL_Q

# ---------- CucaCast (Spotify) ----------
# Cole aqui o código do programa no Spotify: no link open.spotify.com/show/XXXX, é o XXXX.
SPOTIFY_SHOW_ID = '033EUlO6doYTkHRf19W9SE'
SPOTIFY_LINK = ('https://open.spotify.com/show/%s' % SPOTIFY_SHOW_ID) if SPOTIFY_SHOW_ID else 'https://open.spotify.com/search/cucacast/podcasts'

# ---------- Instagram ----------
# Publicações em destaque (links de posts ou reels). Troque quando quiser.
IG_POSTS = ['https://www.instagram.com/reel/DewOlxGRXII/', 'https://www.instagram.com/reel/DXd_l6AESAd/']

NAV = [
    ('A Casa', [
        ('historia.html', 'História e Linha do Tempo', 'Três gerações de fé até a CUCA.', 'cruzamento-2022'),
        ('guias.html', 'Guias Dirigentes', 'Caboclo Akuan e os mentores que conduzem as giras.', 'guia-akuan'),
    ]),
    ('Fundamentos', [
        ('orixas.html', 'Orixás e Linhas', 'Os 9 Orixás cultuados na casa e as 10 linhas de trabalho.', 'amala-oxala'),
        ('rituais.html', 'Rituais e Preceitos', 'Preceito, vela e oração, amalá e banho de ervas.', 'jardim-orixas'),
        ('ervas.html', 'Ervas Sagradas', 'As 16 ervas da casa, organizadas pelos 4 elementos.', 'axe-folhas'),
    ]),
    ('Vivência', [
        ('primeira-vez.html', 'Primeira Vez?', 'Tudo o que acontece da chegada até a saída.', 'fachada'),
        ('medium.html', 'Quero Ser Médium', 'Os 7 passos para entrar na corrente.', 'corrente'),
        ('documentos.html', 'Documentos e Pontos', 'Guia do Médium, pontos cantados e ritual de abertura.', 'raphael'),
    ]),
]

def e(s):
    return html.escape(s, quote=True)

def clean(s):
    """Regra de texto: sem travessão. Ajustes leves no texto herdado do protótipo."""
    if not isinstance(s, str):
        return s
    s = re.sub(r'(\d{4})\s*[–—]\s*(\d{4})', r'\1 a \2', s)
    s = s.replace(' — ', ', ').replace('—', ', ').replace(' – ', ', ')
    s = s.replace("'", '"') if s.count("'") >= 2 else s
    for a, b in AJUSTES.items():
        s = s.replace(a, b)
    return s

# Revisão de texto: troca de palavras de estoque no texto herdado do protótipo.
AJUSTES = {
    'ensinando limites claros e empoderamento real': 'ensinando limites claros e amor-próprio',
    'elevam a intuição': 'despertam a intuição',
    'Elevam a sintonia do médium': 'Afinam a sintonia do médium',
    'eleva a mente aos domínios de Oxalá': 'aproxima a mente de Oxalá',
}

# ---------- ícones (SVG desenhado à mão) ----------
LINK_SVG = '<svg viewBox="0 0 38 22" aria-hidden="true"><path d="M13 3a8 8 0 1 0 0 16h4a8 8 0 0 0 0-16h-4z"/><path d="M21 6.5h4a4.5 4.5 0 0 1 0 9h-4" /></svg>'
WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.5 4 3.5 1.5.6 2 .7 2.8.6.4-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2z"/></svg>'
PIN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>'
SEARCH_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>'
BURGER_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>'
SUN_SVG = '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="6"/><path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M6.8 25.2l2.8-2.8M22.4 9.6l2.8-2.8"/></svg>'
LEAF_SVG = '<svg viewBox="0 0 40 20" aria-hidden="true"><path d="M2 10h36M10 10c2-5 6-7 10-7-1 4-5 7-10 7zM20 10c2 5 6 7 10 7-1-4-5-7-10-7zM26 10c1.5-3.5 4.5-5 7.5-5-1 3-4 5-7.5 5z"/></svg>'

def elo(n, label):
    return '<p class="elo-tag">%s<span>Elo %02d · %s</span></p>' % (LINK_SVG, n, e(label))

def img(slug, alt, cls='', sizes='(max-width: 860px) 100vw, 50vw', eager=False, pos=None):
    style = ' style="object-position:%s"' % pos if pos else ''
    return ('<img src="assets/img/%s.webp" srcset="assets/img/%s-sm.webp 820w, assets/img/%s.webp 1800w" sizes="%s" alt="%s"%s%s%s>'
            % (slug, slug, slug, sizes, e(alt), ' class="%s"' % cls if cls else '', '' if eager else ' loading="lazy" decoding="async"', style))

def photo(slug, alt, ratio='ratio-45', cap=None, sizes='(max-width: 860px) 100vw, 50vw', pos=None, extra=''):
    c = '<figcaption>%s</figcaption>' % e(cap) if cap else ''
    return '<figure class="photo %s %s">%s%s</figure>' % (ratio, extra, img(slug, alt, sizes=sizes, pos=pos), c)

# ---------- moldura comum ----------
def head(title, desc, path, og_img='curimba-poster'):
    url = SITE_URL + '/' + ('' if path == 'index.html' else path)
    return '''<!doctype html>
<html lang="pt-BR" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>%(t)s</title>
<meta name="description" content="%(d)s">
<meta name="theme-color" content="#150D10">
<link rel="canonical" href="%(u)s">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="CUCA · Casa de Umbanda Corrente de Akuan">
<meta property="og:title" content="%(t)s">
<meta property="og:description" content="%(d)s">
<meta property="og:url" content="%(u)s">
<meta property="og:image" content="%(s)s/assets/%(o)s">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="assets/img/favicon.png">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/site.css">
</head>
''' % {'t': e(title), 'd': e(desc), 'u': url, 's': SITE_URL,
       'o': ('video/curimba-poster.webp' if og_img == 'curimba-poster' else 'img/%s.webp' % og_img)}

def nav(current, solid=False):
    items = ['<li><a href="index.html"%s>Início</a></li>' % (' aria-current="page"' if current == 'index.html' else ''),
             '<li><a href="agenda.html"%s>Agenda</a></li>' % (' aria-current="page"' if current == 'agenda.html' else '')]
    mob = ['<a href="index.html">Início</a>', '<a href="agenda.html">Agenda</a>']
    for i, (grp, pages) in enumerate(NAV):
        sub = ''.join('<li><a href="%s"%s><span>%s</span><small>%s</small></a></li>'
                      % (h, ' aria-current="page"' if h == current else '', e(t), e(s)) for h, t, s, _ in pages)
        items.append('<li><button type="button" data-drop aria-expanded="false" aria-controls="drop-%d">%s</button>'
                     '<ul class="drop" id="drop-%d">%s</ul></li>' % (i, e(grp), i, sub))
        mob.append('<h4>%s</h4>' % e(grp) + ''.join('<a href="%s">%s</a>' % (h, e(t)) for h, t, _, _ in pages))
    return '''<body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<div class="aviso" role="status"><div class="wrap"><span class="mono">Aviso</span><span data-aviso></span></div></div>
<header class="nav%(solid)s">
 <div class="wrap">
  <a class="brand" href="index.html" aria-label="CUCA, página inicial">
   <img src="assets/img/logo-branco-sm.png" width="42" height="42" alt="">
   <span><b>CUCA</b><small>Corrente de Akuan</small></span>
  </a>
  <nav aria-label="Principal"><ul class="menu">%(items)s</ul></nav>
  <div class="nav-cta">
   <button class="icon-btn" type="button" data-search aria-label="Buscar no site">%(search)s</button>
   <a class="btn btn-primary btn-visit" href="index.html#venha">Visitar</a>
   <button class="icon-btn burger" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu-movel">%(burger)s</button>
  </div>
 </div>
</header>
<div class="mobile-panel" id="menu-movel">%(mob)s<a class="btn btn-primary" href="%(wa)s" target="_blank" rel="noopener">%(wasvg)s Falar no WhatsApp</a></div>
<div class="search" role="dialog" aria-modal="true" aria-label="Buscar no site">
 <div class="search-box">
  <label><span class="sr-only">O que você procura?</span><input type="search" placeholder="O que você procura? Ex.: primeira vez, arruda, PIX" autocomplete="off"></label>
  <ul class="search-results"></ul>
 </div>
</div>
''' % {'solid': ' solid' if solid else '', 'items': ''.join(items), 'search': SEARCH_SVG, 'burger': BURGER_SVG,
       'mob': ''.join(mob), 'wa': WHATS, 'wasvg': WA_SVG}

def footer():
    cols = ''.join('<div><h4>%s</h4><ul>%s</ul></div>' % (e(g), ''.join('<li><a href="%s">%s</a></li>' % (h, e(t)) for h, t, _, _ in p)) for g, p in NAV)
    return '''<footer class="footer">
 <div class="wrap">
  <div class="cols">
   <div>
    <a class="brand" href="index.html"><img src="assets/img/logo-branco-sm.png" width="42" height="42" alt=""><span><b>CUCA</b><small>Corrente de Akuan</small></span></a>
    <p>CUCA · Casa de Umbanda Corrente de Akuan · Curitiba, PR</p>
    <p>Av. Prefeito Maurício Fruet, 1230 · Jardim Botânico<br>Gira aberta toda segunda, às 19h30.</p>
    <p><a href="agenda.html">Agenda da casa</a><br><a href="%(insta)s" target="_blank" rel="noopener">Instagram @cuca_terreirodeumbanda</a><br><a href="%(spot)s" target="_blank" rel="noopener">CucaCast no Spotify</a></p>
   </div>
   %(cols)s
  </div>
  <div class="legal"><span>CUCA · Casa de Umbanda Corrente de Akuan</span><span>Passes e consultas gratuitos</span></div>
 </div>
</footer>
<script src="assets/js/site.js" defer></script>
</body>
</html>
''' % {'insta': INSTA, 'cols': cols, 'spot': SPOTIFY_LINK}

def invite():
    return '''<section class="section tight dark grain invite" aria-labelledby="convite">
 <div class="smoke" aria-hidden="true"></div>
 <div class="wrap narrow">
  <div class="leaf-rule" aria-hidden="true">%s</div>
  <h2 id="convite" style="margin-top:.6em">Te esperamos na segunda.</h2>
  <p>Gira aberta toda segunda-feira, às 19h30. Senhas a partir das 19h.</p>
  <div class="actions"><a class="btn btn-primary" href="%s" target="_blank" rel="noopener">%s Falar no WhatsApp</a><a class="btn btn-ghost" href="index.html#venha">Como chegar</a></div>
 </div>
</section>''' % (LEAF_SVG, WHATS, WA_SVG)

def page_hero(group, title, lede, slug, alt, wide=False, pos=None):
    return '''<section class="page-hero dark grain">
 <div class="smoke" aria-hidden="true"></div>
 <div class="wrap grid-2">
  <div class="reveal">
   <p class="crumb"><a href="index.html">Início</a><span aria-hidden="true">/</span><span>%s</span></p>
   <h1>%s</h1>
   <p class="lede">%s</p>
  </div>
  <figure class="photo %s">%s</figure>
 </div>
</section>''' % (e(group), e(title), e(lede), 'wide' if wide else '', img(slug, alt, eager=True, pos=pos))

def write(path, title, desc, body, og='curimba-poster', solid=True):
    doc = head(title, desc, path, og) + nav(path, solid) + '<main id="conteudo">' + body + '</main>' + footer()
    with open(os.path.join(OUT, path), 'w', encoding='utf-8') as f:
        f.write(doc)
    print('ok', path, len(doc))

SPOTIFY_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.4a.62.62 0 0 1-.86.2c-2.35-1.43-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.21c3.81-.87 7.08-.5 9.72 1.11.3.18.39.56.21.86zm1.22-2.73a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 1 1-.45-1.49c3.63-1.1 8.15-.57 11.24 1.33.36.22.48.7.25 1.07zm.1-2.84C14.7 8.92 9.36 8.74 6.27 9.68a.94.94 0 1 1-.54-1.8c3.55-1.08 9.45-.87 13.17 1.34a.94.94 0 0 1-.97 1.61z"/></svg>'
IG_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>'

def podcast_block(compact=False):
    if SPOTIFY_SHOW_ID:
        player = ('<iframe class="spotify-frame" src="https://open.spotify.com/embed/show/%s?utm_source=generator&amp;theme=0" '
                  'title="CucaCast no Spotify" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>' % SPOTIFY_SHOW_ID)
    else:
        player = ''
    return '''<article class="media-card podcast reveal">
 <p class="mono"><span class="dot"></span>Podcast</p>
 <h3>CucaCast</h3>
 <p>O podcast da casa: conversas sobre Umbanda, fundamentos e o dia a dia da corrente, para ouvir onde você estiver.</p>
 %s
 <a class="btn btn-primary btn-spotify" href="%s" target="_blank" rel="noopener">%s Ouvir no Spotify</a>
</article>''' % (player, SPOTIFY_LINK, SPOTIFY_SVG)

def instagram_block():
    posts = ''.join('<blockquote class="instagram-media" data-instgrm-permalink="%s?utm_source=ig_embed" data-instgrm-version="14">'
                    '<a href="%s" target="_blank" rel="noopener">Ver esta publicação no Instagram</a></blockquote>' % (u, u) for u in IG_POSTS)
    return '''<article class="media-card insta-card reveal">
 <p class="mono"><span class="dot"></span>Instagram</p>
 <h3>@cuca_terreirodeumbanda</h3>
 <p>Giras, festas, avisos e o dia a dia da casa.</p>
 <div class="ig-posts" data-ig>%s</div>
 <a class="btn btn-ghost" href="%s" target="_blank" rel="noopener">%s Seguir no Instagram</a>
</article>''' % (posts, INSTA, IG_SVG)

# ---------- Início ----------
def index():
    cards = ''
    for g, pages in NAV:
        for h, t, s, slug in pages:
            cards += ('<a class="card reveal" href="%s">%s<div class="body"><span class="grp">%s</span><h3>%s</h3><p>%s</p></div></a>'
                      % (h, '<figure class="photo">%s</figure>' % img(slug, '', sizes='(max-width:520px) 100vw, (max-width:1080px) 50vw, 25vw'), e(g), e(t), e(s)))
    faq = [
        ('Precisa pagar?', 'Não. Passes e consultas são gratuitos. Se quiser ajudar a manter a casa, existe o PIX, sempre voluntário.'),
        ('Preciso ser umbandista?', 'Não. A porta é aberta a todas as pessoas, de qualquer crença.'),
        ('Posso levar criança?', 'Pode, sempre acompanhada de um responsável e em silêncio respeitoso.'),
        ('Posso filmar ou fotografar?', 'Não, sem autorização da casa. O que acontece na gira é sagrado e confidencial.'),
        ('Tenho prioridade?', 'Pessoas idosas, gestantes e pessoas com condição especial têm prioridade. Avise na chegada.'),
        ('Tem estacionamento?', 'Tem, no local, por R$ 12,00. Estacione onde a equipe indicar.'),
    ]
    faq_html = ''.join('<details><summary>%s</summary><div class="ans"><p>%s</p></div></details>' % (e(q), e(a)) for q, a in faq)
    faq_html += ('<details><summary>Quero entrar para a corrente. Como faço?</summary><div class="ans"><p>O caminho começa como consulente. '
                 'Veja a página <a href="medium.html">Quero Ser Médium</a>.</p></div></details>')
    tl = [
        ('1987', 'Pai Fernando de Ogum abre a primeira gira do Terreiro do Pai Maneco, em Curitiba.', 'pai-fernando', 'Pai Fernando de Ogum'),
        ('2009', 'Pai Léo de Oxóssi é consagrado Pai de Santo. A família firma o elo com a Umbanda.', 'amaci-2009', 'Amaci de Pai João Lucas em 2009, no Terreiro do Pai Maneco'),
        ('2017', 'Nasce o Terreiro Filhos do Sol, pelo chamado do Caboclo Tupinambá.', None, ''),
        ('2022', 'Pai João Lucas de Ogum recebe o cruzamento de Pai de Santo.', 'cruzamento-2022', 'A roda no cruzamento de Pai de Santo, em 2022'),
        ('2025', 'Nasce a CUCA: Casa de Umbanda Corrente de Akuan.', 'inauguracao', 'A gira inaugural da CUCA, em 2025'),
    ]
    tl_html = ''
    for y, t, slug, alt in tl:
        knot = ('<img src="assets/img/%s-sm.webp" alt="%s" loading="lazy" width="68" height="68">' % (slug, e(alt))) if slug else SUN_SVG
        tl_html += '<li class="reveal"><span class="knot">%s</span><b>%s</b><span>%s</span></li>' % (knot, y, e(t))

    body = '''
<section class="hero dark" aria-label="Boas-vindas">
 <div class="hero-media" data-src="assets/video/curimba-1080.mp4" data-src-sm="assets/video/curimba-720.mp4">
  <picture><source media="(max-width: 900px)" srcset="assets/video/curimba-poster-sm.webp"><img src="assets/video/curimba-poster.webp" alt="A curimba da CUCA tocando os atabaques durante a gira" fetchpriority="high"></picture>
 </div>
 <div class="hero-scrim" aria-hidden="true"></div>
 <div class="wrap hero-copy">
  <div class="inner">
   <p class="eyebrow beat">Curitiba · Jardim Botânico</p>
   <h1 class="beat" data-words>Boas-vindas à Casa de Umbanda Corrente de Akuan.</h1>
   <div class="beat">
    <p class="phrase">Somos lar antes de sermos templo.</p>
    <p class="when">Gira aberta e gratuita toda segunda, às 19h30. Senhas a partir das 19h.</p>
    <div class="actions"><a class="btn btn-primary" href="primeira-vez.html">Como é a primeira vez</a><a class="btn btn-ghost" href="%(wa)s" target="_blank" rel="noopener">%(wasvg)s Falar no WhatsApp</a></div>
   </div>
  </div>
 </div>
 <span class="scroll-cue" aria-hidden="true">Role</span>
</section>

<section class="quote-band dark grain" aria-label="Palavra do Caboclo Akuan">
 <div class="smoke" aria-hidden="true"></div>
 <blockquote class="reveal glow">“Uma corrente que una a disciplina com o amor será, verdadeiramente, uma corrente de aço.”<cite>Caboclo Akuan</cite></blockquote>
</section>

<div class="elos" style="position:relative">
<div class="chain-rail" aria-hidden="true"><svg></svg></div>

<section class="section light" id="nossa-umbanda" aria-labelledby="t1">
 <div class="wrap grid-2">
  <div class="reveal">
   %(e1)s
   <h2 id="t1">Umbanda pés no chão.</h2>
   <p class="lede">Assim Pai Fernando de Ogum chamou o jeito de fazer Umbanda que herdamos: simples e sem mistificações, onde prevaleça o respeito mútuo, a caridade e o amor fraterno.</p>
  </div>
  %(p1)s
 </div>
 <div class="wrap">
  <ul class="principles reveal">
   <li><b>Acesso universal</b><span>Consultas e passes gratuitos, para todas as pessoas.</span></li>
   <li><b>Estudo</b><span>Cursos, apostilas e rodas de leitura para médiuns e visitantes.</span></li>
   <li><b>Rigor ético</b><span>Transparência, respeito e combate à intolerância religiosa.</span></li>
   <li><b>Cultura e família</b><span>Eventos que aproximam gerações e desfazem preconceitos.</span></li>
   <li><b>Menos é mais</b><span>Ritos simples, discrição e eficácia.</span></li>
  </ul>
  <p class="closing reveal">Umbanda simples, eficaz e profunda: fiel aos cantos dos antigos e corajosa para dialogar com o mundo de hoje.</p>
 </div>
</section>

<section class="section dark grain" id="primeira-vez" aria-labelledby="t2">
 <div class="smoke" aria-hidden="true"></div>
 <div class="wrap grid-2 top">
  <div>
   <div class="reveal">
    %(e2)s
    <h2 id="t2">Nunca foi a um terreiro? Comece por aqui.</h2>
    <p class="lede">É normal chegar com dúvida, ou até com um pouco de medo. Na CUCA tudo tem ordem, e alguém da casa vai te orientar desde o portão.</p>
   </div>
   <ol class="steps reveal">
    <li><b>Chegue às 19h.</b><span>As senhas são distribuídas por ordem de chegada. A gira começa às 19h30.</span></li>
    <li><b>Peça licença na entrada.</b><span>À esquerda do portão fica a Tronqueira, a casinha dos guardiões da casa. Quem recebe você mostra como saudar.</span></li>
    <li><b>Tire os calçados.</b><span>Ao entrar no salão, deixamos o mundo lá fora. Celular no silencioso.</span></li>
    <li><b>Acompanhe a abertura.</b><span>Os pontos cantados e o atabaque abrem a gira. Você assiste sentado, em silêncio.</span></li>
    <li><b>Receba o atendimento.</b><span>Quando sua senha for chamada, você recebe passe ou consulta com uma entidade. Uma consulta por gira.</span></li>
    <li><b>Agradeça e siga em paz.</b><span>Ao sair, agradeça ao Congá. Se receber orientação de banho ou prece, siga com calma.</span></li>
   </ol>
  </div>
  <div style="position:sticky;top:calc(var(--nav-h) + 24px)">
   %(p2)s
   <div class="note-pair reveal">
    <div class="note"><h4>O que vestir</h4><p>Roupa limpa e discreta, de qualquer cor. Evite perfume forte e bebida alcoólica no dia.</p></div>
    <div class="note"><h4>Se sentir algo forte</h4><p>Choro, arrepio ou emoção forte acontecem. Avise com discrição alguém da casa. Você não fica sozinho.</p></div>
   </div>
  </div>
 </div>
 <div class="wrap">
  <div class="hold reveal" data-done="Você também é um elo. Te esperamos na segunda.">
   <svg class="hold-ring" viewBox="0 0 150 150" role="img" aria-label="Roda de elos"></svg>
   <div>
    <button type="button" class="btn btn-primary hold-btn">Segure para formar a corrente</button>
    <p class="hold-msg" aria-live="polite">Cada pessoa é um elo. Segure o botão e veja a roda se fechar.</p>
   </div>
  </div>
 </div>
</section>

<section class="section light" id="o-que-nao-fazemos" aria-labelledby="t3">
 <div class="wrap narrow">
  <div class="reveal">%(e3)s<h2 id="t3">Para você vir tranquilo.</h2></div>
  <ul class="nots reveal">
   <li><b>Não cobramos trabalhos espirituais.</b><span>Todo auxílio mediúnico é caridade.</span></li>
   <li><b>Não fazemos previsões de futuro nem diagnósticos de doenças.</b><span>Os guias orientam e fortalecem. Não substituem médicos.</span></li>
   <li><b>Não fazemos amarrações nem trabalhos para prejudicar alguém.</b><span>Trabalhamos para o equilíbrio, a cura e o progresso de todos.</span></li>
   <li><b>Não alimentamos vaidades nem disputas.</b><span>Não comparamos casas, médiuns ou entidades.</span></li>
  </ul>
  <p class="final-line reveal">Não distinguimos cor, etnia, trajetória espiritual, orientação sexual ou gênero. Respeitamos quem nos respeita.</p>
 </div>
</section>

<section class="section dark grain" id="gira" aria-labelledby="t4">
 <div class="smoke" aria-hidden="true"></div>
 <div class="wrap">
  <div class="reveal">%(e4)s<h2 id="t4">O coração da gira.</h2></div>
  <div class="trio">
   <article class="reveal">%(p4a)s<h3>O atabaque</h3><p>Se a entidade dirigente é o cérebro da gira, o atabaque é o coração. Cada canto é uma oração.</p></article>
   <article class="reveal">%(p4b)s<h3>A corrente</h3><p>Médiuns de branco, cada um em sua função: incorporação, passe, sustentação, cambonos, curimba.</p></article>
   <article class="reveal">%(p4c)s<h3>Os guardiões</h3><p>Exus e Pombagiras guardam a casa. Por isso, ao chegar, pedimos licença na Tronqueira.</p></article>
  </div>
 </div>
</section>

<section class="section light" id="raizes" aria-labelledby="t5">
 <div class="wrap">
  <div class="reveal">%(e5)s<h2 id="t5">Uma corrente de três gerações.</h2></div>
  <ol class="timeline">%(tl)s</ol>
  <p style="margin-top:2.4em"><a class="link-arrow" href="historia.html">A história completa</a></p>
 </div>
</section>

<section class="section dark grain" id="perguntas" aria-labelledby="t6">
 <div class="smoke" aria-hidden="true"></div>
 <div class="wrap narrow">
  <div class="reveal">%(e6)s<h2 id="t6">Perguntas de quem vem pela primeira vez.</h2></div>
  <div class="faq reveal">%(faq)s</div>
 </div>
</section>

<section class="section light" id="conheca" aria-labelledby="t7">
 <div class="wrap">
  <div class="reveal">%(e7)s<h2 id="t7">Para estudar e conhecer a fundo.</h2></div>
  <div class="cards">%(cards)s</div>
  <div class="midia">%(podcast)s%(instagram)s</div>
 </div>
</section>

<section class="section dark venha" id="venha" aria-labelledby="t8">
 <div class="venha-bg" aria-hidden="true">%(p8)s</div>
 <div class="wrap grid-2 top">
  <div class="reveal">
   %(e8)s
   <h2 id="t8">Te esperamos na segunda.</h2>
   <ul class="facts">
    <li>Gira aberta toda segunda-feira, às 19h30.</li>
    <li>Senhas a partir das 19h.</li>
    <li>Av. Prefeito Maurício Fruet, 1230 · Jardim Botânico · Curitiba</li>
   </ul>
   <div class="actions">
    <a class="btn btn-primary" href="%(wa)s" target="_blank" rel="noopener">%(wasvg)s Falar no WhatsApp</a>
    <a class="btn btn-ghost" href="%(mapa)s" target="_blank" rel="noopener">%(pin)s Abrir no mapa</a>
   </div>
  </div>
  <div class="venha-side reveal">
   <div class="boxed">
    <h3>Próximas datas</h3>
    <iframe class="agenda-frame" src="%(agenda)s" title="Próximas datas da agenda da CUCA" loading="lazy"></iframe>
    <p style="margin:.9em 0 0"><a class="link-arrow" href="agenda.html">Agenda completa</a></p>
   </div>
   <div class="boxed">
    <h3>Apoie a casa</h3>
    <p>A CUCA se mantém com a ajuda de quem acredita nela.</p>
    <div class="pix"><code>%(pix)s</code><button type="button" class="btn btn-ghost" data-copy="%(pix)s" aria-describedby="pix-ok">Copiar chave</button></div>
    <p class="copied" id="pix-ok" aria-live="polite"></p>
   </div>
  </div>
 </div>
</section>
</div>
''' % {
        'wa': WHATS, 'wasvg': WA_SVG, 'pin': PIN_SVG, 'mapa': MAPA, 'insta': INSTA, 'pix': PIX, 'agenda': e(AGENDA),
        'e1': elo(1, 'Nossa Umbanda'), 'e2': elo(2, 'Sua primeira vez'), 'e3': elo(3, 'O que não fazemos'),
        'e4': elo(4, 'A gira por dentro'), 'e5': elo(5, 'Raízes'), 'e6': elo(6, 'Perguntas'),
        'e7': elo(7, 'Conheça a casa'), 'e8': elo(8, 'Venha'),
        'p1': photo('adejas', 'Médiuns de branco tocando o adjá durante a gira', 'ratio-45', extra='reveal'),
        'p2': photo('conga', 'O Congá da CUCA, com as imagens dos Orixás e dos guias', 'ratio-32', extra='reveal'),
        'p4a': photo('mariane', 'Mariane, Ogã da casa, no atabaque', 'ratio-34', sizes='(max-width:860px) 100vw, 33vw'),
        'p4b': photo('hierarquia', 'A corrente de médiuns vestidos de branco, com faixas coloridas', 'ratio-34', sizes='(max-width:860px) 100vw, 33vw'),
        'p4c': photo('amala-exus', 'Amalá da linha de Exus e Pombagiras, com velas vermelhas e pimentas', 'ratio-34', sizes='(max-width:860px) 100vw, 33vw'),
        'p8': img('placa', '', sizes='100vw'),
        'tl': tl_html, 'faq': faq_html, 'cards': cards, 'podcast': podcast_block(), 'instagram': instagram_block(),
    }
    write('index.html', 'CUCA · Casa de Umbanda Corrente de Akuan · Curitiba',
          'Terreiro de Umbanda no Jardim Botânico, em Curitiba. Gira aberta e gratuita toda segunda, às 19h30. Somos lar antes de sermos templo.',
          body, solid=False)

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    index()
    try:
        import paginas
    except ImportError:
        paginas = None
    if paginas:
        paginas.build(globals())
