"""Hierarquia da casa desenhada como um corpo (página primeira-vez.html, capítulo 04).
O manual descreve: os Pais de Santo são a cabeça do terreiro, os Pais Pequenos os braços
do dirigente e os Capitães as mãos. Sambas e Ogãs sustentam o ritmo: ficam no coração.
Acima, a coroa (o Orixá e o espírito dirigente); embaixo, as pernas e os pés (a corrente)."""

import manual as M

H_DESC = {t: d for t, d in M.HIERARQUIA}

# chave, número, parte do corpo, título, texto, ids das pessoas
PARTES = [
    ('coroa', 'A coroa', 'Orixá e guia dirigente',
     'Tudo começa acima de nós. O fluxo da gira parte do Orixá e do espírito dirigente, Caboclo Akuan, e desce por cada elo da corrente.', []),
    ('cabeca', 'A cabeça', 'Pais e Mães de Santo', H_DESC['Pais e Mães de Santo'], ['joao-lucas', 'hismara']),
    ('bracos', 'Os braços', 'Pais e Mães Pequenos', H_DESC['Pais e Mães Pequenos'], ['claudio', 'mariana', 'patricia']),
    ('maos', 'As mãos', 'Capitães e Capitãs', H_DESC['Capitães e Capitãs'], ['ana-paula', 'elis', 'emily', 'daniel', 'matheus', 'miguel']),
    ('coracao', 'O coração', 'Sambas e Ogãs',
     H_DESC['Sambas e Ogãs'] + ' São o pulso da gira e têm voz de hierarquia, com função parecida com a do capitão.', ['joao-caetano', 'raphael', 'mariane']),
    ('pes', 'As pernas e os pés', 'A corrente mediúnica',
     'Os médiuns da corrente são as pernas e os pés da casa: sustentam a gira de pé e levam a caridade adiante. Cada um é um elo, e é por eles que o trabalho chega a quem precisa.', []),
]

# o corpo, num viewBox 0 0 400 660: traço fino, partes separadas por um respiro
def _esp(d):
    """espelha um caminho absoluto (só M, C, L, Z com pares x y) no eixo x=200"""
    import re
    nums = re.findall(r'[A-Z]|-?[\d.]+', d)
    out, par = [], True
    for t in nums:
        if t.isalpha():
            out.append(t); par = True
        else:
            out.append(('%g' % (400 - float(t))) if par else t)
            par = not par
    return ' '.join(out)

BRACO = 'M134 142 C124 146 120 160 118 180 C114 220 108 260 104 300 L102 318 L114 320 C118 290 124 250 130 214 C134 192 138 168 140 152 Z'
MAO = 'M108 327 C100 331 98 345 102 357 C106 365 114 363 116 353 C118 341 116 331 108 327 Z'
PERNA = 'M156 340 C152 400 157 460 165 520 C169 556 171 580 171 596 L186 596 C186 570 188 540 190 500 C192 450 195 395 197 340 Z'
PE = 'M171 603 C163 605 155 611 157 617 L188 617 C190 609 188 603 186 603 Z'
TRONCO = ('M190 106 C190 117 187 124 179 128 C163 133 151 136 147 146 C142 175 147 215 157 250 C161 275 159 300 155 332 '
          'L245 332 C241 300 239 275 243 250 C253 215 258 175 253 146 C249 136 237 133 221 128 C213 124 210 117 210 106 Z')

SVG_CORPO = (
    '<path class="h-fluxo" d="M200 6V610"/>'
    '<g class="h-parte" data-parte="coroa"><path class="h-forma h-linha" d="M158 44 A50 50 0 0 1 242 44"/>'
    '<path class="h-forma h-linha" d="M170 18 A40 40 0 0 1 230 18" opacity=".55"/>'
    '<circle class="h-ponto" cx="200" cy="4" r="3"/></g>'
    '<g class="h-parte" data-parte="cabeca"><ellipse class="h-forma" cx="200" cy="72" rx="25" ry="30"/></g>'
    '<g class="h-tronco"><path class="h-forma" d="%s"/></g>'
    '<g class="h-parte" data-parte="bracos"><path class="h-forma" d="%s"/><path class="h-forma" d="%s"/></g>'
    '<g class="h-parte" data-parte="maos"><path class="h-forma" d="%s"/><path class="h-forma" d="%s"/></g>'
    '<g class="h-parte" data-parte="pes"><path class="h-forma" d="%s"/><path class="h-forma" d="%s"/><path class="h-forma" d="%s"/><path class="h-forma" d="%s"/></g>'
    '<g class="h-parte" data-parte="coracao"><path class="h-forma h-cor" d="M214 196c-3-6-13-5-13 2 0 6 8 11 13 15 5-4 13-9 13-15 0-7-10-8-13-2z"/></g>'
) % (TRONCO, BRACO, _esp(BRACO), MAO, _esp(MAO), PERNA, _esp(PERNA), PE, _esp(PE))

# marcadores numerados ao lado de cada parte
MARCAS = {'coroa': (262, 22), 'cabeca': (250, 64), 'bracos': (312, 232), 'maos': (326, 372), 'coracao': (246, 188), 'pes': (264, 474)}


LUPA = ('<svg class="lupa" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21M10.5 7.5v6M7.5 10.5h6"/></svg>')
ZOOM = ('<dialog class="lightbox h-zoom" aria-label="Foto ampliada"><button type="button" class="ox-x" data-fechar aria-label="Fechar a foto">×</button>'
        '<figure><img alt=""><figcaption></figcaption></figure></dialog>')


def hierarquia_corpo(H, img, pessoas):
    e = H['e']
    marcas = ''.join('<g class="h-marca" data-parte="%s" transform="translate(%d %d)"><circle r="11"/><text dy="4">%d</text></g>'
                     % (k, MARCAS[k][0], MARCAS[k][1], i + 1) for i, (k, *_r) in enumerate(PARTES))
    svg = ('<svg class="h-corpo" viewBox="20 -14 360 650" role="img" aria-label="Silhueta humana: a coroa é o Orixá e o guia dirigente, '
           'a cabeça são os Pais de Santo, os braços os Pais Pequenos, as mãos os Capitães, o coração os Sambas e Ogãs e as pernas e os pés a corrente">%s%s</svg>' % (SVG_CORPO, marcas))
    itens = ''
    for i, (k, parte, titulo, texto, ids) in enumerate(PARTES):
        gente = ''
        if ids:
            gente = '<ul class="h-gente">%s</ul>' % ''.join(
                '<li><button type="button" class="h-pessoa" data-img="assets/img/%s.webp" data-alt="%s, %s da CUCA" data-nome="%s" data-cargo="%s" aria-label="Ampliar a foto de %s">'
                '<span class="h-foto">%s</span><span><b>%s %s</b>%s</span></button></li>' % (
                    s, e(pessoas[s][0]), e(pessoas[s][1].split(' · ')[0]), e(pessoas[s][0]), e(pessoas[s][1]), e(pessoas[s][0]),
                    img(s, '', sizes='56px', pos='50% 22%'), e(pessoas[s][0]), LUPA, e(pessoas[s][1])) for s in ids)
        itens += ('<li class="h-item" data-parte="%s"><button type="button" aria-expanded="%s" aria-controls="h-%s">'
                  '<span class="h-num">%d</span><span class="h-tit"><small>%s</small><b>%s</b></span></button>'
                  '<div class="h-corpo-txt" id="h-%s"%s><p>%s</p>%s</div></li>'
                  % (k, 'true' if i == 1 else 'false', k, i + 1, e(parte), e(titulo), k, '' if i == 1 else ' hidden', e(texto), gente))
    return ('<div class="h-wrap" data-hier><div class="h-figura">%s<p class="h-dica mono">Toque numa parte do corpo</p></div>'
            '<ol class="h-lista">%s</ol></div>') % (svg, itens)
