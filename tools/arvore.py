"""Árvore da Vida dos Orixás (página orixas.html).
Olorum no alto e os 9 Orixás da CUCA dispostos como na árvore da Cabala,
ligados por fios de luz nas cores de cada um. Cada nó abre a ficha do Orixá."""

import math

import manual as M

# posição no viewBox 0 0 1000 1360, cor da vela, palavra-chave, saudação, ícone
NOS = [
    ('olorum', 'Olorum', 500, 160, '#F3E3B0', 'A energia una de Deus', '', 'sol'),
    ('nana', 'Nanã', 250, 356, '#A07CD6', 'Ancestralidade', 'Saluba Nanã!', 'ibiri'),
    ('oxala', 'Oxalá', 750, 356, '#F4F1EA', 'Fé', 'Epa Babá!', 'pomba'),
    ('oxossi', 'Oxóssi', 232, 616, '#3FA96B', 'Conhecimento', 'Okê Arô!', 'ofa'),
    ('iemanja', 'Iemanjá', 768, 616, '#7CC4EA', 'Geração', 'Odoiá!', 'ondas'),
    ('oxum', 'Oxum', 500, 770, '#F2C230', 'Amor', 'Ora iê iê ô!', 'abebe'),
    ('ogum', 'Ogum', 250, 940, '#E0393E', 'Lei e caminhos', 'Ogunhê!', 'espada'),
    ('xango', 'Xangô', 750, 940, '#C07A3A', 'Justiça', 'Kaô Kabecilê!', 'oxe'),
    ('iansa', 'Iansã', 500, 1090, '#F48A3C', 'Movimento', 'Eparrei!', 'raio'),
    ('omulu', 'Omulu', 500, 1250, '#CDB98A', 'Cura e passagem', 'Atotô!', 'xaxara'),
]
NOME = {'Oxalá': 'oxala', 'Ogum': 'ogum', 'Oxóssi': 'oxossi', 'Xangô': 'xango', 'Omulu': 'omulu',
        'Iansã': 'iansa', 'Oxum': 'oxum', 'Iemanjá': 'iemanja', 'Nanã': 'nana'}

FIOS = [('olorum', 'nana'), ('olorum', 'oxala'), ('olorum', 'oxum'), ('nana', 'oxala'), ('nana', 'oxossi'), ('nana', 'oxum'),
        ('oxala', 'iemanja'), ('oxala', 'oxum'), ('oxossi', 'iemanja'), ('oxossi', 'oxum'), ('iemanja', 'oxum'),
        ('oxossi', 'ogum'), ('iemanja', 'xango'), ('oxum', 'ogum'), ('oxum', 'xango'), ('oxum', 'iansa'),
        ('ogum', 'xango'), ('ogum', 'iansa'), ('xango', 'iansa'), ('ogum', 'omulu'), ('xango', 'omulu'), ('iansa', 'omulu')]

# ícones de traço, desenhados numa caixa de -24 a 24
ICONES = {
    'sol': '<circle r="9"/><path d="M0-20v-5M0 20v5M-20 0h-5M20 0h5M-14-14l-3.5-3.5M14 14l3.5 3.5M-14 14l-3.5 3.5M14-14l3.5-3.5"/>',
    'ibiri': '<path d="M-6 22C-6 4-2-10 8-16c7-4 12 3 7 8-4 4-11 3-13-1"/><path d="M-12 22h14"/><circle cx="-1" cy="2" r="1.6"/><circle cx="1" cy="-6" r="1.6"/>',
    'pomba': '<path d="M-20 4c8 1 14-2 18-8 3-5 9-8 14-6l6 3-6 2c-1 8-6 14-14 16-6 1-12-1-18-7z"/><path d="M-4-4c-4-6-4-12 0-16 3 5 5 10 4 15"/>',
    'ofa': '<path d="M-14-20c16 6 16 34 0 40"/><path d="M-14-20v40"/><path d="M-20 0h40M14-5l6 5-6 5"/><path d="M-20 0l-4-4M-20 0l-4 4"/>',
    'ondas': '<path d="M-22-8c5-6 10-6 15 0s10 6 15 0 10-6 14 0"/><path d="M-22 2c5-6 10-6 15 0s10 6 15 0 10-6 14 0"/><path d="M-22 12c5-6 10-6 15 0s10 6 15 0 10-6 14 0"/>',
    'abebe': '<circle cy="-7" r="13"/><circle cy="-7" r="6"/><path d="M0 6v18M-6 24h12"/><path d="M-18-7h-4M18-7h4M0-25v-2"/>',
    'espada': '<path d="M14-22L-8 0"/><path d="M18-24l-4 2-22 22 4 4 22-22z"/><path d="M-14-6l12 12M-8 6l-12 12"/>',
    'oxe': '<path d="M0-16v40"/><path d="M0-16l-16-8v16zM0-16l16-8v16z"/>',
    'raio': '<path d="M6-24L-12 4h12l-6 20L14-6H2z"/>',
    'xaxara': '<path d="M0-24L-14 18h28z"/><path d="M-6 18l2 6M0 18v7M6 18l-2 6M-5-2h10M-8 8h16"/>',
}


def _fio_id(a, b):
    return 'f-%s-%s' % (a, b)


def arvore_orixas(H, orixas, OIMG, img):
    e, C = H['e'], H['C']
    pos = {n[0]: n for n in NOS}
    viz = {n[0]: [] for n in NOS}
    for a, b in FIOS:
        viz[a].append(b)
        viz[b].append(a)

    # --- gradientes e fios ---
    defs, fios = [], []
    for a, b in FIOS:
        A, B = pos[a], pos[b]
        gid = 'g-%s-%s' % (a, b)
        defs.append('<linearGradient id="%s" gradientUnits="userSpaceOnUse" x1="%d" y1="%d" x2="%d" y2="%d">'
                    '<stop offset="0" stop-color="%s"/><stop offset="1" stop-color="%s"/></linearGradient>' % (gid, A[2], A[3], B[2], B[3], A[4], B[4]))
        L = math.hypot(B[2] - A[2], B[3] - A[3])
        fios.append('<g class="fio" data-a="%s" data-b="%s" style="--len:%d">'
                    '<path class="f-halo" id="%s" d="M%d %dL%d %d" stroke="url(#%s)"/>'
                    '<path class="f-base" d="M%d %dL%d %d" stroke="url(#%s)"/>'
                    '<path class="f-luz" d="M%d %dL%d %d" stroke="url(#%s)"/></g>'
                    % (a, b, L, _fio_id(a, b), A[2], A[3], B[2], B[3], gid, A[2], A[3], B[2], B[3], gid, A[2], A[3], B[2], B[3], gid))
    for slug, nome, x, y, cor, *_ in NOS:
        defs.append('<radialGradient id="h-%s"><stop offset="0" stop-color="%s" stop-opacity=".75"/><stop offset=".45" stop-color="%s" stop-opacity=".22"/>'
                    '<stop offset="1" stop-color="%s" stop-opacity="0"/></radialGradient>' % (slug, cor, cor, cor))

    # --- nós ---
    nos = []
    for i, (slug, nome, x, y, cor, chave, sauda, ico) in enumerate(NOS):
        r = 84 if slug == 'olorum' else 62
        escuro = slug in ('oxala', 'olorum')
        core = '#2A1D22' if slug == 'omulu' else cor
        tinta = '#2A1D22' if escuro or slug in ('oxum', 'iemanja') else '#FFF8EE'
        if slug == 'olorum':
            attrs = ' class="no olorum" data-slug="olorum" aria-hidden="true"'
        else:
            attrs = (' class="no" data-slug="%s" role="button" tabindex="0" aria-haspopup="dialog" aria-label="%s, %s. Abrir a ficha."'
                     % (slug, e(nome), e(chave)))
        nos.append(
            '<g%s style="--c:%s;--d:%.1fs" transform="translate(%d %d)">'
            '<circle class="n-aura" r="%d" fill="url(#h-%s)"/>'
            '<circle class="n-orbita" r="%d"/>'
            '<circle class="n-core" r="%d" fill="%s"/>'
            '<circle class="n-aro" r="%d"/>'
            '<g class="n-ico" stroke="%s" transform="scale(%.2f)">%s</g>'
            '<text class="n-nome" y="%d">%s</text><text class="n-chave" y="%d">%s</text></g>'
            % (attrs, cor, (i * 0.37) % 3, x, y, r * 2.3, slug, r + 14, r, core, r, tinta, r / 34, ICONES[ico],
               r + 46, e(nome.upper()), r + 76, e(chave)))

    svg = ('<svg class="arvore" viewBox="0 0 1000 1380" role="group" aria-label="Árvore da Vida dos Orixás: Olorum no alto e os nove Orixás ligados por fios de luz">'
           '<defs>%s</defs><g class="fios">%s</g><g class="faiscas" aria-hidden="true"></g><g class="nos">%s</g></svg>'
           % (''.join(defs), ''.join(fios), ''.join(nos)))

    # --- legenda acessível (também serve de atalho) ---
    leg = ''.join('<li><button type="button" class="ox-leg" data-slug="%s" style="--c:%s"><i></i><b>%s</b><span>%s</span></button></li>'
                  % (n[0], n[4], e(n[1]), e(n[5])) for n in NOS if n[0] != 'olorum')

    # --- fichas (templates) ---
    porslug = {NOME[o['name']]: o for o in orixas}
    tpls = []
    for slug, nome, x, y, cor, chave, sauda, ico in NOS:
        if slug == 'olorum':
            continue
        o = porslug[slug]
        lig = ''.join('<button type="button" class="ox-lig" data-slug="%s" style="--c:%s">%s</button>' % (v, pos[v][4], e(pos[v][1]))
                      for v in viz[slug] if v != 'olorum')
        if 'olorum' in viz[slug]:
            lig = '<span class="ox-lig fixo" style="--c:%s">Olorum</span>' % pos['olorum'][4] + lig
        im = OIMG.get(o['name'])
        amala = ''
        if im:
            amala = ('<button type="button" class="ox-amala" data-img="assets/img/%s.webp" data-alt="Amalá de %s montado pela CUCA" data-cap="%s">'
                     '<span class="ox-thumb">%s</span><span class="ox-amala-txt"><span class="mono">Amalá</span><b>Ver a foto do amalá</b><span>%s</span></span>'
                     '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5"/></svg></button>'
                     % (im, e(nome), e(C(M.AMALA.get(nome, o['elementos']))),
                        img(im, '', sizes='120px'), C(M.AMALA.get(nome, o['elementos']))))
        vid = M.ORIXA_VIDEOS.get(nome)
        vid = ('<a class="ficha-video" href="%s" target="_blank" rel="noopener"><span aria-hidden="true">▶</span> Vídeo sobre %s no Instagram</a>' % (e(vid), e(nome))) if vid else ''
        tpls.append(
            '<template id="ox-%s" data-cor="%s" data-nome="%s">'
            '<header class="ox-head"><svg class="ox-ico" viewBox="-30 -30 60 60" aria-hidden="true"><g stroke="currentColor">%s</g></svg>'
            '<div><p class="ox-pol mono">%s</p><h2 id="ox-titulo">%s</h2><p class="ox-chave">%s</p>%s</div></header>'
            '<p class="ox-role">%s</p>'
            '<dl class="ox-dl"><dt>Atuação</dt><dd>%s</dd><dt>Arquétipo</dt><dd>%s</dd><dt>No emocional</dt><dd>%s</dd></dl>'
            '%s%s'
            '<div class="ox-ligacoes"><p class="mono">Fios de luz na árvore</p><div>%s</div></div>'
            '</template>'
            % (slug, cor, e(nome), ICONES[ico], C(o['polarity']), e(nome), e(chave),
               '<p class="ox-sauda">%s</p>' % e(sauda) if sauda else '', C(o['shortRole']), C(o['atuacao']), C(o['mitologia']),
               C(o.get('efeito', '')), amala, vid, lig))

    card = ('<dialog class="ox-card" aria-labelledby="ox-titulo"><div class="ox-glow" aria-hidden="true"></div>'
            '<button type="button" class="ox-x" data-fechar aria-label="Fechar a ficha">×</button>'
            '<div class="ox-body"></div>'
            '<nav class="ox-nav"><button type="button" data-passo="-1"><span aria-hidden="true">←</span> Anterior</button>'
            '<button type="button" data-passo="1">Próximo <span aria-hidden="true">→</span></button></nav></dialog>'
            '<dialog class="lightbox" aria-label="Foto do amalá"><button type="button" class="ox-x" data-fechar aria-label="Fechar a foto">×</button>'
            '<figure><img alt=""><figcaption></figcaption></figure></dialog>')

    return ('<section class="section dark grain arvore-sec" id="orixas-lista"><div class="smoke" aria-hidden="true"></div>'
            '<div class="wrap arvore-grid">'
            '<div class="arvore-copy"><span class="num mono" style="color:var(--accent-on-dark)">A Árvore da Vida</span>'
            '<h2>Os 9 Orixás cultuados na CUCA.</h2>'
            '<p class="lede">Como na árvore da Cabala, tudo nasce de uma única fonte. No alto está Olorum, a energia una de Deus. '
            'Dele descem as forças que regem nossa coroa, ligadas umas às outras por fios de luz. Nenhum Orixá trabalha sozinho.</p>'
            '<p class="arvore-dica"><span aria-hidden="true">✦</span> Passe o cursor ou toque num Orixá para ver seus fios. Clique para abrir a ficha.</p>'
            '<ul class="ox-legenda">%s</ul></div>'
            '<div class="arvore-palco">%s</div></div>%s%s</section>') % (leg, svg, ''.join(tpls), card)
