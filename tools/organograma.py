"""Organograma das linhas de trabalho (página orixas.html).
Raiz, três ramos (Direita, Neutras, Esquerda) e as linhas, com ícones próprios
desenhados em SVG, cada um com um gesto quando o cursor passa. Cada linha abre a ficha."""

import manual as M

# slug, nome no JSON, cor para fundo escuro, ícone, animação
LINHAS = [
    ('caboclos', 'Caboclos(as)', '#45C473', 'cocar', 'leque'),
    ('pretos-velhos', 'Pretos(as) Velhos(as)', '#C08A55', 'cachimbo', 'fumaca'),
    ('eres', 'Erês', '#34C9B8', 'pirulito', 'gira'),
    ('baianos', 'Baianos', '#F2A63C', 'coqueiro', 'balanca'),
    ('marinheiros', 'Marinheiros', '#5B95F7', 'ancora', 'pendulo'),
    ('boiadeiros', 'Boiadeiros', '#D9934A', 'chapeu', 'inclina'),
    ('ciganos', 'Ciganos', '#DA62EA', 'lua', 'brilho'),
    ('medicos', 'Médicos', '#A487F7', 'caduceu', 'pulso'),
    ('simiromba', 'Simiromba', '#B3BDCB', 'vela', 'chama'),
    ('exus', 'Exus e Pombagiras', '#E5484D', 'tridente', 'sobe'),
    ('exus-mirins', 'Exus Mirins', '#F07A4A', 'piao', 'bambole'),
]
# linha que não está no conteúdo original do protótipo (texto a revisar pela casa)
EXTRAS = [{
    'name': 'Exus Mirins', 'color': '#F07A4A',
    'polarity': 'Linha de Esquerda · Guardiões Mirins',
    'shortRole': 'Desmanche de demandas, rapidez e verdade dita sem rodeios',
    'atuacao': 'Trabalham junto aos Exus e Pombagiras no desmanche de demandas e na limpeza de energias pesadas. São rápidos e diretos: cortam o que está preso e trazem à luz o que está escondido.',
    'mitologia': 'A criança da esquerda: esperta, irreverente e brincalhona, mas firme na Lei. Lembra que a seriedade do trabalho espiritual também convive com a alegria.',
    'efeito': 'Desfaz máscaras e hipocrisias. Ajuda a pessoa a encarar com leveza e coragem aquilo que vinha escondendo de si mesma.',
    'elementos': 'O amalá dos Exus Mirins é orientado diretamente pela casa.',
}]
RAMOS = [
    ('esquerda', 'Esquerda', 'Guardiões da Lei e da casa', '#E5484D', ['exus', 'exus-mirins']),
    ('neutras', 'Neutras', 'Jogo de cintura, viagem e trabalho', '#E8B925', ['baianos', 'marinheiros', 'boiadeiros', 'ciganos', 'medicos', 'simiromba']),
    ('direita', 'Direita', 'Doutrina, cura e acolhimento', '#F1EEE8', ['caboclos', 'pretos-velhos', 'eres']),
]
# guias chefes da casa em cada linha (ids das fichas em guias.html)
GUIAS_LINHA = {
    'caboclos': ['akuan', 'itaquaratira', 'urubata'],
    'pretos-velhos': ['joaquim', 'anacleto', 'anastacia'],
    'eres': ['juninho'],
    'marinheiros': ['zoio'],
    'boiadeiros': ['antonio'],
    'ciganos': ['ramon'],
    'exus': ['trancarua', 'mariapadilha'],
}

# ícones de traço numa caixa de -32 a 32; as classes marcam a parte que se move
def _penas():
    out = []
    for a in range(-70, 71, 20):
        out.append('<path transform="rotate(%d 0 16)" d="M0 10C5 2 5-10 0-18-5-10-5 2 0 10z"/><path transform="rotate(%d 0 16)" d="M0 8v-20"/>' % (a, a))
    return ''.join(out)

ICONES = {
    'cocar': '<g class="i-mov">%s</g><path d="M-22 16c12 8 32 8 44 0"/><path d="M-18 21l-3 8M18 21l3 8"/>' % _penas(),
    'cachimbo': '<path class="i-fumo" d="M6-14c-4-4 4-6 0-10s4-6 0-10"/><path d="M-1-8h14v10a7 7 0 0 1-7 7h0a7 7 0 0 1-7-7z"/><path d="M-1 0L-26 8l1 4L0 6"/>',
    'pirulito': '<g class="i-mov"><circle cy="-10" r="15"/><path d="M0-10a3 3 0 0 1 3 3 6 6 0 0 1-6 6 9 9 0 0 1-9-9 12 12 0 0 1 12-12"/></g><path d="M0 5v25"/>',
    'coqueiro': '<path d="M-2 28c3-12 3-22-1-31"/><g class="i-mov"><path d="M-3-3c-8-7-17-6-22 1"/><path d="M-3-3c6-9 15-10 22-5"/><path d="M-3-3c-5-10-2-18 5-22"/><path d="M-3-3c10-3 17 2 20 9"/><path d="M-3-3c-10 0-16 6-17 13"/><circle cx="-6" cy="2" r="2.6"/><circle cx="1" cy="2" r="2.6"/></g><path d="M-16 28h28"/>',
    'ancora': '<g class="i-mov"><circle cy="-22" r="5"/><path d="M0-17v43"/><path d="M-11-8h22"/><path d="M-21 10c2 11 12 16 21 16s19-5 21-16"/><path d="M-21 10l-4 5M-21 10l5 2M21 10l4 5M21 10l-5 2"/></g>',
    'chapeu': '<g class="i-mov"><path d="M-28 8c10 8 46 8 56 0"/><path d="M-14 8c0-12 4-20 14-20s14 8 14 20"/><path d="M-6-11l6 5 6-5"/><path d="M-14 3c9 3 19 3 28 0"/></g><path d="M-18 20c-6 6 4 12 14 9s14-8 6-12"/>',
    'lua': '<path d="M8-24a24 24 0 1 0 0 48 19 19 0 1 1 0-48z"/><path class="i-mov" d="M17-8l2.4 5.6 5.6 2.4-5.6 2.4L17 8l-2.4-5.6L9 0l5.6-2.4z"/>',
    'caduceu': '<path d="M0-26v54"/><path d="M0-20c-8-7-17-7-24-2 7 3 14 5 24 5M0-20c8-7 17-7 24-2-7 3-14 5-24 5"/><path class="i-mov" d="M-7-10c9 0 9 9 0 9s-9 9 0 9 9 9 0 9"/><circle cy="-29" r="3"/>',
    'vela': '<path class="i-mov" d="M0-10c-5-5-3-12 0-17 3 5 5 12 0 17z"/><path d="M0-10v4"/><path d="M-7-6h14v28h-14z"/><path d="M-15 22h30M-11 27h22"/>',
    'tridente': '<g class="i-mov"><path d="M0-14v42"/><path d="M-16-26v10c0 7 7 10 16 10s16-3 16-10v-10"/><path d="M0-30v16"/><path d="M-16-26l-3 5M-16-26l3 5M16-26l-3 5M16-26l3 5M0-30l-3 5M0-30l3 5"/></g>',
    'piao': '<g class="i-mov"><path d="M-3-24h6v8h-6z"/><path d="M-20-12h40c0 14-10 26-20 40-10-14-20-26-20-40z"/><path d="M-16-4h32M-11 8h22"/><path d="M0-30v6M-5-30l5-5 5 5"/></g>',
    'estrela': '<path d="M0-26l6 18h19l-15 11 6 18-16-11-16 11 6-18-15-11h19z"/><circle r="4"/>',
}


def _svg(ico, anim, cls='l-svg'):
    return '<svg class="%s" viewBox="-34 -34 68 68" data-anim="%s" aria-hidden="true">%s</svg>' % (cls, anim, ICONES[ico])


def organograma(H, linhas, OIMG, img, nomes_guias):
    e, C = H['e'], H['C']
    porjson = {o['name']: o for o in list(linhas) + EXTRAS}
    info = {l[0]: l for l in LINHAS}
    ramo_de = {s: r for r in RAMOS for s in r[4]}

    ramos = ''
    for rs, rn, rd, rc, filhos in RAMOS:
        li = ''
        for s in filhos:
            _, jn, cor, ico, anim = info[s]
            o = porjson[jn]
            nome = jn.replace('(as)', '').replace('(as)', '').strip()
            sub = o['polarity'].split('·')[-1].strip()
            li += ('<li><button type="button" class="lnode" data-slug="l-%s" data-no="l-%s" data-pai="%s" style="--c:%s" aria-haspopup="dialog">'
                   '<span class="l-circ">%s</span><b>%s</b><small>%s</small></button></li>'
                   % (s, s, rs, cor, _svg(ico, anim), e(nome), e(sub)))
        ramos += ('<div class="orga-ramo" data-ramo="%s" style="--c:%s;--n:%d">'
                  '<p class="orga-cab" data-no="%s" data-pai="raiz"><b>%s</b><span>%s</span></p>'
                  '<ul class="orga-filhos">%s</ul></div>' % (rs, rc, len(filhos), rs, rn, e(rd), li))

    # fichas
    tpls = ''
    ordem = [x for r in RAMOS for x in r[4]]
    for s, jn, cor, ico, anim in sorted(LINHAS, key=lambda l: ordem.index(l[0])):
        o = porjson[jn]
        nome = jn.replace('(as)', '').strip()
        am = C(M.AMALA.get(jn, o['elementos']))
        im = OIMG.get(jn)
        if im:
            amala = ('<button type="button" class="ox-amala" data-img="assets/img/%s.webp" data-alt="Amalá de %s montado pela CUCA" data-cap="%s">'
                     '<span class="ox-thumb">%s</span><span class="ox-amala-txt"><span class="mono">Amalá</span><b>Ver a foto do amalá</b><span>%s</span></span>'
                     '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5"/></svg></button>'
                     % (im, e(nome), e(am), img(im, '', sizes='120px'), am))
            dd_am = ''
        else:
            amala = ''
            dd_am = '<dt>Amalá</dt><dd>%s</dd>' % am
        gs = GUIAS_LINHA.get(s, [])
        guias = ''
        if gs:
            guias = ('<div class="ox-ligacoes"><p class="mono">Guias chefes da casa nesta linha</p><div>%s</div></div>'
                     % ''.join('<a class="ox-lig" style="--c:%s" href="guias.html#guia-%s">%s</a>' % (cor, g, e(nomes_guias.get(g, g))) for g in gs))
        irmas = [x for x in ramo_de[s][4] if x != s]
        lig = ''
        if irmas:
            lig = ('<div class="ox-ligacoes"><p class="mono">Na mesma corrente: %s</p><div>%s</div></div>'
                   % (e(ramo_de[s][1]), ''.join('<button type="button" class="ox-lig" data-slug="l-%s" style="--c:%s">%s</button>'
                                               % (x, info[x][2], e(info[x][1].replace('(as)', '').strip())) for x in irmas)))
        subt = (' <small class="mono">%s</small>' % C(o['subtitle'])) if o.get('subtitle') else ''
        tpls += ('<template id="ox-l-%s" data-cor="%s" data-nome="%s">'
                 '<header class="ox-head">%s'
                 '<div><p class="ox-pol mono">%s</p><h2 id="ox-titulo">%s</h2>%s</div></header>'
                 '<p class="ox-role">%s</p>'
                 '<dl class="ox-dl"><dt>Atuação</dt><dd>%s</dd><dt>Arquétipo</dt><dd>%s</dd><dt>No emocional</dt><dd>%s</dd>%s</dl>'
                 '%s%s%s</template>'
                 % (s, cor, e(nome), _svg(ico, anim, 'ox-ico l-ico-card'), C(o['polarity']), e(nome),
                    '<p class="ox-chave">%s</p>' % subt.strip() if subt else '',
                    C(o['shortRole']), C(o['atuacao']), C(o['mitologia']), C(o.get('efeito', '')), dd_am, amala, guias, lig))

    raiz = ('<div class="orga-raiz"><p class="orga-no-raiz" data-no="raiz">%s<b>As linhas de trabalho</b><span>Falanges de espíritos que trabalham na caridade</span></p></div>'
            % _svg('estrela', 'brilho', 'l-svg raiz-svg'))
    return ('<section class="section dark grain orga-sec" id="linhas"><div class="smoke" aria-hidden="true"></div><div class="wrap">'
            '<span class="num mono" style="color:var(--accent-on-dark)">O organograma</span>'
            '<h2>As linhas de trabalho.</h2>'
            '<p class="lede">Se os Orixás são as forças, as linhas são as falanges de espíritos que descem para trabalhar. '
            'Da esquerda à direita, cada uma tem seu jeito. A esquerda é tratada com o mesmo respeito: Exus, Pombagiras e Exus Mirins são os guardiões da casa.</p>'
            '<p class="arvore-dica"><span aria-hidden="true">✦</span> Passe o cursor sobre uma linha para ver o seu gesto. Clique para abrir a ficha.</p>'
            '<div class="orga"><svg class="orga-fios" aria-hidden="true"><defs></defs></svg>%s<div class="orga-ramos">%s</div></div>'
            '<p style="margin-top:2.4em"><a class="link-arrow" href="guias.html">Conheça os guias chefes da casa</a></p></div>%s</section>'
            % (raiz, ramos, tpls))
