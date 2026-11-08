"""Hierarquia da casa desenhada como um corpo (página primeira-vez.html, capítulo 04).
O manual descreve: os Pais de Santo são a cabeça do terreiro, os Pais Pequenos os braços
do dirigente e os Capitães as mãos. Sambas e Ogãs sustentam o ritmo: ficam no coração.
Acima, a coroa (o Orixá e o espírito dirigente); embaixo, os pés (a corrente)."""

import manual as M

H_DESC = {t: d for t, d in M.HIERARQUIA}

# chave, número, parte do corpo, título, texto, ids das pessoas
PARTES = [
    ('coroa', 'A coroa', 'Orixá e guia dirigente',
     'Tudo começa acima de nós. O fluxo da gira parte do Orixá e do espírito dirigente, Caboclo Akuan, e desce por cada elo da corrente.', []),
    ('cabeca', 'A cabeça', 'Pais e Mães de Santo', H_DESC['Pais e Mães de Santo'], ['joao-lucas', 'hismara']),
    ('bracos', 'Os braços', 'Pais e Mães Pequenos', H_DESC['Pais e Mães Pequenos'], ['patricia']),
    ('maos', 'As mãos', 'Capitães e Capitãs', H_DESC['Capitães e Capitãs'], ['ana-paula', 'elis', 'emily', 'daniel', 'matheus', 'miguel']),
    ('coracao', 'O coração', 'Sambas e Ogãs',
     H_DESC['Sambas e Ogãs'] + ' São o pulso da gira e têm voz de hierarquia, com função parecida com a do capitão.', ['joao-caetano', 'raphael', 'mariane']),
    ('pes', 'Os pés', 'A corrente mediúnica',
     'Os médiuns da corrente são os pés que sustentam a casa e levam a caridade adiante. Cada um é um elo, e é por eles que a gira chega a quem precisa.', []),
]

# o corpo, num viewBox 0 0 400 660. Membros são traços grossos com contorno.
def _membro(d, w):
    return '<path class="h-contorno" d="%s" stroke-width="%d"/><path class="h-miolo" d="%s" stroke-width="%d"/>' % (d, w + 4, d, w)

def _espelho(pts):
    return [(400 - x, y) for x, y in pts]

def _linha(pts):
    return 'M' + ' L'.join('%d %d' % p for p in pts)

BRACO = [(141, 172), (102, 262), (76, 338)]
PERNA = [(180, 360), (174, 480), (171, 590)]

SVG_CORPO = (
    '<g class="h-parte" data-parte="coroa">'
    '<circle class="h-aura" cx="200" cy="96" r="70"/>'
    '<path class="h-raios" d="M200 6v18M146 26l10 14M254 26l-10 14M112 64l15 7M288 64l-15 7M168 12l4 17M232 12l-4 17"/>'
    '</g>'
    '<g class="h-parte" data-parte="pes">%s%s'
    '<ellipse class="h-forma" cx="160" cy="606" rx="22" ry="10"/><ellipse class="h-forma" cx="240" cy="606" rx="22" ry="10"/></g>'
    '<g class="h-parte" data-parte="bracos">%s%s</g>'
    '<g class="h-parte" data-parte="maos"><ellipse class="h-forma" cx="70" cy="356" rx="14" ry="20" transform="rotate(20 70 356)"/>'
    '<ellipse class="h-forma" cx="330" cy="356" rx="14" ry="20" transform="rotate(-20 330 356)"/></g>'
    '<g class="h-tronco"><path class="h-forma" d="M188 126h24v30h-24z"/>'
    '<path class="h-forma" d="M150 156Q200 142 250 156L263 176Q259 262 241 330L245 368H155L159 330Q141 262 137 176Z"/></g>'
    '<g class="h-parte" data-parte="cabeca"><circle class="h-forma" cx="200" cy="96" r="34"/></g>'
    '<g class="h-parte" data-parte="coracao"><path class="h-forma h-cor" d="M222 214c-6-10-22-8-22 4 0 10 14 18 22 26 8-8 22-16 22-26 0-12-16-14-22-4z"/></g>'
    '<path class="h-fluxo" d="M200 20V96M200 130V230M200 230L222 228M200 170L141 172L102 262L72 350M200 170L259 172L298 262L328 350M200 250V368L177 480L162 604M200 368L223 480L238 604"/>'
) % (_membro(_linha(PERNA), 34), _membro(_linha(_espelho(PERNA)), 34),
     _membro(_linha(BRACO), 26), _membro(_linha(_espelho(BRACO)), 26))

# marcadores numerados ao lado de cada parte
MARCAS = {'coroa': (200, 6), 'cabeca': (246, 74), 'bracos': (300, 238), 'maos': (352, 388), 'coracao': (262, 214), 'pes': (284, 600)}


def hierarquia_corpo(H, img, pessoas):
    e = H['e']
    marcas = ''.join('<g class="h-marca" data-parte="%s" transform="translate(%d %d)"><circle r="15"/><text dy="5">%d</text></g>'
                     % (k, MARCAS[k][0], MARCAS[k][1], i + 1) for i, (k, *_r) in enumerate(PARTES))
    svg = ('<svg class="h-corpo" viewBox="-10 -14 420 650" role="img" aria-label="Silhueta humana: a coroa é o Orixá e o guia dirigente, '
           'a cabeça são os Pais de Santo, os braços os Pais Pequenos, as mãos os Capitães, o coração os Sambas e Ogãs e os pés a corrente">%s%s</svg>' % (SVG_CORPO, marcas))
    itens = ''
    for i, (k, parte, titulo, texto, ids) in enumerate(PARTES):
        gente = ''
        if ids:
            gente = '<ul class="h-gente">%s</ul>' % ''.join(
                '<li>%s<span><b>%s</b>%s</span></li>' % (
                    '<span class="h-foto">%s</span>' % img(s, '', sizes='56px', pos='50% 22%'),
                    e(pessoas[s][0]), e(pessoas[s][1])) for s in ids)
        itens += ('<li class="h-item" data-parte="%s"><button type="button" aria-expanded="%s" aria-controls="h-%s">'
                  '<span class="h-num">%d</span><span class="h-tit"><small>%s</small><b>%s</b></span></button>'
                  '<div class="h-corpo-txt" id="h-%s"%s><p>%s</p>%s</div></li>'
                  % (k, 'true' if i == 1 else 'false', k, i + 1, e(parte), e(titulo), k, '' if i == 1 else ' hidden', e(texto), gente))
    return ('<div class="h-wrap" data-hier><div class="h-figura">%s<p class="h-dica mono">Toque numa parte do corpo</p></div>'
            '<ol class="h-lista">%s</ol></div>') % (svg, itens)
