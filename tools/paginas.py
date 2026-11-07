"""Páginas internas do site da CUCA. Chamado por tools/build.py."""
import json, os, re

def build(g):
    e, clean, img, photo = g['e'], g['clean'], g['img'], g['photo']
    page_hero, invite, write = g['page_hero'], g['invite'], g['write']
    WHATS, WA_SVG, LEAF_SVG = g['WHATS'], g['WA_SVG'], g['LEAF_SVG']
    data = json.load(open(os.path.join(g['ROOT'], 'tools', 'conteudo', 'prototipo.json'), encoding='utf-8'))
    C = lambda s: e(clean(s))

    def chapters(items):
        return '<nav class="chapters" aria-label="Capítulos"><ol>%s</ol></nav>' % ''.join(
            '<li><a href="#%s">%s</a></li>' % (i, e(t)) for i, t in items)

    def chapter(cid, num, title, inner, light=True):
        return '<section class="chapter" id="%s" aria-labelledby="h-%s"><span class="num">%s</span><h2 id="h-%s">%s</h2>%s</section>' % (
            cid, cid, e(num), cid, e(title), inner)

    def tiles(items, cls=''):
        return '<div class="tiles %s">%s</div>' % (cls, ''.join(
            '<div class="tile reveal"><h4>%s</h4><p>%s</p></div>' % (C(t), C(d)) for t, d in items))

    def pull(text, cite=None):
        return '<blockquote class="pull">%s%s</blockquote>' % (C(text), '<cite>%s</cite>' % e(cite) if cite else '')

    def body_with_index(idx, content, dark=False):
        return '<section class="section %s"><div class="wrap with-index">%s<div>%s</div></div></section>' % (
            'dark grain' if dark else 'light', chapters(idx), content)

    import manual as M
    H = {'e': e, 'C': C, 'chapter': chapter, 'tiles': tiles, 'pull': pull, 'photo': photo,
         'page_hero': page_hero, 'invite': invite, 'write': write}

    # ================= HISTÓRIA =================
    tl = ''.join(
        '<li class="reveal"><b>%s</b><span><strong>%s</strong><br>%s</span></li>' % (
            e(t['dateLabel'].replace('Ano de ', '')), C(t['title'].replace(' & ', ' e ')), C(t['summary']))
        for t in data['timeline'])
    hist = page_hero('A Casa', 'História e Linha do Tempo',
                     'Três gerações de fé, de uma garagem em 1987 até a casa da Aroeira, em 2025.',
                     'cruzamento-2022', 'A roda de médiuns de branco no cruzamento de Pai de Santo, em 2022', wide=True)
    idx = [('umbanda', 'A Umbanda'), ('raizes', 'Raízes'), ('forja', 'Caminho de forja'),
           ('promessa', 'A promessa'), ('aroeira', 'O milagre da Aroeira'), ('lar', 'A visão de lar'), ('missao', 'Missão e valores'), ('sorri', 'Uma Umbanda que sorri')]
    content = M.historia_umbanda(H)
    content += chapter('raizes', 'Capítulo 01 · 1987', 'As raízes e Pai Fernando de Ogum.',
        '<div class="fig-side"><div class="prose">'
        '<p>A nossa doutrina começa na família, na figura de Fernando Macedo Guimarães (1937 a 2012), irmão do avô do dirigente, mais conhecido como Pai Fernando de Ogum. Um homem magro, sem cabelos e muito sério. Quando ele entrava num cômodo, todos se juntavam em volta, com respeito e curiosidade.</p>'
        '<p>No dia 2 de fevereiro de 1987, data consagrada a Iemanjá, Fernando abriu a primeira gira de Umbanda na garagem da prima Gilda Máximo, acompanhado de um pequeno grupo de médiuns e do guia chefe Pai Maneco, um Preto Velho. Naquela noite nascia o Terreiro do Pai Maneco.</p>'
        '<p>O terreiro cresceu rápido. Por mais de dez anos funcionou na Faculdade Espírita, até inaugurar sede própria no bairro Santa Cândida, em janeiro de 1999.</p>'
        '%s</div>%s</div>' % (pull('Umbanda simples e sem mistificações, onde prevaleça o respeito mútuo, a caridade e o amor fraterno como formas de evolução humana.', 'Pai Fernando de Ogum'),
                             photo('pai-fernando', 'Pai Fernando de Ogum no início do Terreiro do Pai Maneco', 'ratio-45', 'Pai Fernando de Ogum', sizes='(max-width:860px) 100vw, 40vw', pos='60% 30%')))
    content += chapter('forja', 'Capítulo 02 · 2009 a 2022', 'O caminho de forja.',
        '<div class="fig-side"><div class="prose">'
        '<p>“Nasci e cresci entre atabaques, mas foi em 2009 que ingressei formalmente na Corrente de Aço do Terreiro do Pai Maneco. Naquele mesmo ano, meu pai de sangue, Leonardo Guimarães, Pai Léo de Oxóssi, foi consagrado Pai de Santo pelas mãos de meu avô, Roberto Guimarães, Pai Beco de Oxóssi. Três gerações firmavam ali um elo que me entrelaçaria para sempre à Umbanda.”</p>'
        '<p>“Em 2017, após quase três décadas de serviço no Pai Maneco, meu pai ouviu o chamado de seu guia, o Caboclo Tupinambá, para erguer nova seara: nasceu o Terreiro Filhos do Sol. Foi ali que contemplei uma Umbanda pulsante, dinâmica e vibrante.”</p>'
        '<p>“No dia 18 de abril de 2022, recebi o cruzamento de Pai de Santo pelas mãos do próprio Caboclo Tupinambá e, mais adiante, do Caboclo Akuan. Eu sentia, desde então, que os guias me preparavam para uma travessia decisiva. Desse recolhimento nasceu a inspiração para a Casa de Umbanda Corrente de Akuan.”</p>'
        '<p class="mono" style="color:var(--ink-secondary)">Pai João Lucas de Ogum, no Guia do Médium</p>'
        '</div><div>%s%s</div></div>' % (photo('amaci-2009', 'O amaci de Pai João Lucas em 2009, no Terreiro do Pai Maneco', 'ratio-45', '2009 · Amaci no Pai Maneco', sizes='(max-width:860px) 100vw, 40vw'),
                                          photo('cruzamento-2022', 'A roda do cruzamento de Pai de Santo em 2022', 'ratio-32', '2022 · Cruzamento de Pai de Santo', sizes='(max-width:860px) 100vw, 40vw')))
    content += chapter('promessa', 'Capítulo 03 · 2025', 'A promessa espiritual.',
        '<div class="prose">'
        '<p>Quando saímos em busca da nossa própria casa, muitas incertezas nos acompanhavam. Em busca de orientação, voltamos ao Terreiro do Pai Maneco. Lá, o Caboclo Akuan chamou o grupo e foi direto: tudo já estava resolvido pela espiritualidade, e até setembro de 2025 estaríamos instalados na nossa sede. Mas avisou:</p>'
        '%s%s</div>' % (pull('Vocês devem fazer por onde construir esta casa pelas vias materiais.', 'Caboclo Akuan'),
                        pull('Quem encontrará a casa é você! Será entre o final de junho e começo de julho. A única coisa que peço é que cuidem da aroeira, pois abaixo dela deverá haver o tambor dos Pretos Velhos. Este é o único pedido deles para esta casa.', 'Aviso dos guias, antes de a casa ser encontrada')))
    content += chapter('aroeira', 'Capítulo 04 · Junho de 2025', 'O milagre da Aroeira.',
        '<div class="fig-side"><div class="prose">'
        '<p>Na última semana de junho, dentro do prazo dado pelos guias, encontramos o imóvel no Jardim Botânico. Tudo parecia se encaixar. O único receio era contar à proprietária que ali seria um terreiro de Umbanda.</p>'
        '<p>A resposta veio dias depois, como um abraço: ela aceitou com alegria, e a filha dela contou que tinha sido médium do Terreiro do Pai Maneco. Quando voltamos ao terreno, lá estava uma única árvore imponente. Ao pesquisar a espécie, a confirmação: era uma Aroeira-vermelha. A promessa aos Pretos Velhos estava cumprida.</p>'
        '%s'
        '<p>A data escolhida para a inauguração foi 1º de setembro. Semanas depois veio a constatação: 1º de setembro é o aniversário de Pai Fernando de Ogum, fundador do Pai Maneco. Hoje, junto da Aroeira, fica o tambor prometido aos Pretos Velhos.</p>'
        '</div>%s</div>' % (pull('Seo Akuan, nos abençoa. E, se for pra ser aqui, que esse lugar nos aceite.'),
                            photo('aroeira', 'A Aroeira da CUCA e os tambores do Jardim dos Orixás', 'ratio-34', 'A Aroeira na sede', sizes='(max-width:860px) 100vw, 40vw')))
    content += chapter('lar', 'Capítulo 05 · A CUCA', 'A visão de lar.',
        '<div class="fig-side"><div class="prose">'
        '<p>A CUCA deveria ser, antes de tudo, casa: refúgio para os desamparados, abrigo para quem anseia beber do Sagrado. Não somos apenas um templo erguido sob telhas. Somos lar, lugar onde a cabeça repousa para que corpo, alma e espírito renasçam na alvorada.</p>'
        '<p>O nome foi pedido pelo próprio Caboclo Akuan: Casa, porque é lugar de descanso e resguardo. Corrente, porque cada médium é um elo, e quanto melhor cada elo, mais forte a corrente fica.</p>'
        '%s<p><a class="link-arrow" href="guias.html">Conheça o Caboclo Akuan e os guias da casa</a></p>'
        '</div>%s</div>' % (pull('Uma corrente que una a disciplina com o amor será, verdadeiramente, uma corrente de aço.', 'Caboclo Akuan'),
                            photo('inauguracao', 'A corrente reunida na gira inaugural da CUCA, em 2025', 'ratio-11', '1º de setembro de 2025 · Gira inaugural', sizes='(max-width:860px) 100vw, 40vw')))
    content += M.historia_missao(H) + M.historia_final(H)
    write('historia.html', 'História e Linha do Tempo · CUCA',
          'Três gerações de Umbanda pés no chão: do Terreiro do Pai Maneco, em 1987, à Casa de Umbanda Corrente de Akuan, em 2025.',
          hist + M.linha_viva(H, data['timeline']) + body_with_index(idx, content) + invite(), 'cruzamento-2022')

    # ================= GUIAS =================
    GIMG = {'akuan': 'guia-akuan', 'itaquaratira': 'guia-itacoaratira', 'urubata': 'guia-urubatao', 'joaquim': 'guia-joaquim',
            'anacleto': 'guia-anacleto', 'anastacia': 'guia-anastacia', 'juninho': 'guia-juninho', 'ramon': 'guia-ramon',
            'antonio': 'guia-antonio', 'trancarua': 'guia-trancaruas', 'mariapadilha': 'guia-mariapadilha'}
    CAT = {'caboclo': 'caboclos', 'preto-velho': 'pretos-velhos', 'pretovelho': 'pretos-velhos'}
    fichas = ''
    for gd in data['guias']:
        cat = CAT.get(gd['type'], 'neutras' if 'Neutras' in gd['typeLabel'] else ('esquerda' if 'Esquerda' in gd['typeLabel'] else gd['type']))
        if 'Pretos' in gd['typeLabel']: cat = 'pretos-velhos'
        if 'Caboclos' in gd['typeLabel']: cat = 'caboclos'
        im = GIMG.get(gd['id'])
        ph = ('<figure class="photo tall">%s</figure>' % img(im, 'Ilustração de %s' % gd['name'], sizes='(max-width:600px) 100vw, 33vw', pos='50% 20%')) if im else ''
        fichas += ('<article class="ficha reveal" data-cat="%s">%s<div class="body"><p class="tag"><i></i>%s · %s</p><h3>%s</h3><p class="role">%s</p><p>%s</p>'
                   '<details><summary>Ler a ficha</summary><dl><dt>Quem é</dt><dd>%s</dd><dt>Ensinamento</dt><dd>%s</dd><dt>Palavra do guia</dt><dd><em>“%s”</em></dd></dl></details></div></article>'
                   % (cat, ph, C(gd['typeLabel']), C(gd['line']), C(gd['name']), C(gd['identity']), C(gd['shortDesc']), C(gd['description']), C(gd['teaching']), C(gd['quote'])))
    fichas += ('<article class="ficha reveal" data-cat="neutras"><figure class="photo tall">%s</figure><div class="body"><p class="tag"><i></i>Curimba</p><h3>Ogã Kaian</h3>'
               '<p class="role">Ficha em preparação pela casa.</p></div></article>' % img('guia-kaian', 'Ilustração do Ogã Kaian', sizes='(max-width:600px) 100vw, 33vw', pos='50% 20%'))
    chips = ''.join('<button type="button" class="chip" data-value="%s" aria-pressed="%s">%s</button>' % (v, 'true' if v == 'all' else 'false', t)
                    for v, t in [('all', 'Todos'), ('caboclos', 'Caboclos'), ('pretos-velhos', 'Pretos Velhos'), ('neutras', 'Linhas neutras e Erês'), ('esquerda', 'Guardiões')])
    akuan = data['guias'][0]
    guias = page_hero('A Casa', 'Guias Dirigentes', 'O Caboclo Akuan, patrono da casa, e os mentores que conduzem as nossas giras.',
                      'guia-akuan', 'Ilustração do Caboclo Akuan', pos='50% 15%')
    guias += ('<section class="section light"><div class="wrap"><div class="grid-2 top"><div class="reveal"><span class="mono" style="color:var(--accent)">Patrono geral da CUCA</span>'
              '<h2 style="margin-top:.4em">Caboclo Akuan.</h2><p class="lede">%s</p></div><div class="prose reveal"><p>%s</p>%s<p><strong>Ensinamento.</strong> %s</p></div></div>'
              '<div class="tile reveal" style="margin-top:2.4em"><h4>Sobre as ilustrações</h4><p>As imagens dos guias são ilustrações provisórias, feitas para estudo. Elas serão trocadas pelas ilustrações oficiais da casa.</p></div>'
              '</div></section>') % (C(akuan['line']), C(akuan['description']), pull(akuan['quote'], 'Caboclo Akuan'), C(akuan['teaching']))
    guias += ('<section class="section light" style="padding-top:0"><div class="wrap"><h2 class="reveal">Os mentores da casa.</h2>'
              '<div data-filter-group="lista-guias"><div class="filters">%s</div><div class="find"><label><span class="sr-only">Buscar guia</span><input type="search" placeholder="Buscar pelo nome ou pela linha"></label></div></div>'
              '<div class="fichas" id="lista-guias">%s</div><p class="no-results" hidden>Nenhum guia encontrado.</p></div></section>') % (chips, fichas)
    write('guias.html', 'Guias Dirigentes · CUCA', 'Caboclo Akuan, patrono da CUCA, e os guias que conduzem as giras: Caboclos, Pretos Velhos, Erês, linhas neutras e Guardiões.',
          guias + invite(), 'guia-akuan')

    # ================= ORIXÁS E LINHAS =================
    OIMG = {'Oxalá': 'amala-oxala', 'Ogum': 'amala-ogum', 'Oxóssi': 'amala-oxossi', 'Xangô': 'amala-xango', 'Omulu': 'amala-omulu',
            'Iansã': 'amala-iansa', 'Oxum': 'amala-oxum', 'Iemanjá': 'amala-iemanja', 'Nanã': 'amala-nana',
            'Pretos(as) Velhos(as)': 'amala-pretos-velhos', 'Erês': 'amala-ere', 'Ciganos': 'amala-ciganos', 'Exus e Pombagiras': 'amala-exus'}
    def ficha_ox(o, cat):
        im = OIMG.get(o['name'])
        ph = '<figure class="photo">%s</figure>' % img(im, 'Amalá de %s' % o['name'], sizes='(max-width:600px) 100vw, 33vw') if im else ''
        sub = ' <small class="mono" style="font-size:.7rem">%s</small>' % C(o['subtitle']) if o.get('subtitle') else ''
        return ('<article class="ficha reveal" data-cat="%s" style="--c:%s">%s<div class="body"><p class="tag"><i></i>%s</p><h3>%s%s</h3><p class="role">%s</p>'
                '<details><summary>Atuação e amalá</summary><dl><dt>Atuação</dt><dd>%s</dd><dt>Arquétipo</dt><dd>%s</dd><dt>No emocional</dt><dd>%s</dd><dt>Amalá</dt><dd>%s</dd></dl></details>%s</div></article>'
                % (cat, o['color'], ph, C(o['polarity']), C(o['name']), sub, C(o['shortRole']), C(o['atuacao']), C(o['mitologia']), C(o.get('efeito', '')), C(M.AMALA.get(o['name'], o['elementos'])), video(o['name'])))
    def video(name):
        u = M.ORIXA_VIDEOS.get(name)
        if not u:
            return ''
        return ('<a class="ficha-video" href="%s" target="_blank" rel="noopener"><span aria-hidden="true">▶</span> Vídeo sobre %s no Instagram</a>' % (e(u), e(name)))
    ox = ''.join(ficha_ox(o, 'orixa') for o in data['orixas'])
    li = ''
    for o in data['linhas']:
        p = o['polarity']
        cat = 'direita' if 'Direita' in p else ('esquerda' if 'Esquerda' in p else 'neutras')
        li += ficha_ox(o, cat)
    lchips = ''.join('<button type="button" class="chip" data-value="%s" aria-pressed="%s">%s</button>' % (v, 'true' if v == 'all' else 'false', t)
                     for v, t in [('all', 'Todas'), ('direita', 'Direita'), ('neutras', 'Neutras'), ('esquerda', 'Esquerda')])
    ori = page_hero('Fundamentos', 'Orixás e Linhas', 'As forças da natureza que regem nossa coroa e as falanges de espíritos que trabalham na caridade.',
                    'amala-oxala', 'Amalá de Oxalá, com flores brancas e canjica', wide=True)
    ori += ('<section class="section light"><div class="wrap"><div class="grid-2 top">'
            '<div class="reveal"><span class="num mono" style="color:var(--accent)">As matrizes divinas</span><h2 style="margin-top:.4em">O que é um Orixá?</h2>'
            '<p>O Orixá é uma fração de Deus, uma força pura da natureza ligada ao nosso Ori, a cabeça e a essência de cada um. Para Pierre Verger, é o axé dos elementos primordiais. Para Luiz Antonio Simas, é “o mundo se encantando nos corpos”.</p></div>'
            '<div class="reveal"><span class="num mono" style="color:var(--accent)">Os mensageiros</span><h2 style="margin-top:.4em">E as linhas de guias?</h2>'
            '<p>Se os Orixás são as forças puras, os guias (Caboclos, Pretos Velhos, Erês, Baianos, Exus) são os espíritos trabalhadores que incorporam nos médiuns e conversam conosco, ajudando a curar o que levamos por dentro.</p></div>'
            '</div><p class="reveal" style="margin-top:1.4em;color:var(--ink-secondary)">As fotos são dos amalás montados pela própria casa. Para saber como se monta um amalá, veja <a href="rituais.html#amala">Rituais e Preceitos</a>.</p></div></section>')
    ori += ('<section class="section light" style="padding-top:0" id="orixas-lista"><div class="wrap"><h2 class="reveal">Os 9 Orixás cultuados na CUCA.</h2>'
            '<div class="fichas">%s</div></div></section>') % ox
    ori += ('<section class="section dark grain" id="linhas"><div class="smoke" aria-hidden="true"></div><div class="wrap"><h2 class="reveal">As 10 linhas de trabalho.</h2>'
            '<p class="lede reveal">Da direita à esquerda, cada linha tem seu jeito de trabalhar. A esquerda é tratada com o mesmo respeito: Exus e Pombagiras são os guardiões da casa.</p>'
            '<div data-filter-group="lista-linhas"><div class="filters">%s</div></div><div class="fichas" id="lista-linhas">%s</div>'
            '<p style="margin-top:2em"><a class="link-arrow" href="guias.html">Conheça os guias chefes da casa</a></p></div></section>') % (lchips, li)
    write('orixas.html', 'Orixás e Linhas · CUCA', 'Os 9 Orixás cultuados na CUCA e as 10 linhas de trabalho, com atuação, arquétipo e o amalá de cada um.',
          ori + invite(), 'amala-oxala')

    # ================= RITUAIS =================
    rit = page_hero('Fundamentos', 'Rituais e Preceitos', 'O sagrado no dia a dia: preceito, vela e oração, amalá e banho de ervas.',
                    'jardim-orixas', 'O Jardim dos Orixás, com os tambores das entregas e os oratórios de madeira')
    idx = [('visao', 'Visão geral'), ('preceito', 'O preceito'), ('vela', 'A vela e a oração'), ('amala', 'O amalá'), ('banho', 'O banho de ervas'), ('conga', 'O Congá em casa')]
    content = chapter('visao', 'Visão geral', 'Quatro práticas que sustentam o equilíbrio.',
        '<div class="prose"><p>Na Umbanda, o sagrado não é algo distante: a folha, a água, a vela e a própria mente são manifestações de energia vital. Sustentamos nosso equilíbrio com quatro práticas fundamentais.</p></div>'
        + tiles([('O preceito', 'Alinhamento do corpo e da mente antes e depois da gira.'), ('A vela e a oração', 'Ponto de firmeza e conexão com o Anjo da Guarda.'),
                 ('O amalá', 'Oferenda de gratidão aos Orixás e aos guias.'), ('O banho de ervas', 'Limpeza e reequilíbrio pelos 4 elementos.')]))
    content += chapter('preceito', 'Pilar 01', 'O preceito.',
        '<div class="prose"><p>O preceito é o preparo pelo qual alinhamos nossa energia antes, durante e depois dos trabalhos espirituais. Não é castigo, é responsabilidade.</p>%s</div>' %
        pull('Como um artesão precisa de ferramentas limpas e afiadas, os guias precisam de um médium em equilíbrio.')
        + tiles([('Zero álcool e ilícitos', 'Substâncias que alteram a consciência rompem a proteção e atraem baixa vibração.'),
                 ('Alimentação leve', 'Nos dias de gira, evite carnes vermelhas, comidas pesadas e excessos que sobrecarregam o corpo.'),
                 ('Reserva de energia vital', 'Resguarde sua energia vital e mantenha o recolhimento interior antes dos trabalhos.'),
                 ('Vigilância emocional', 'Evite discussões, raiva ou fofocas. Emoções densas atuam como ruídos na sintonia espiritual.')]) + M.rituais_preceito_extra(H))
    content += chapter('vela', 'Pilar 02', 'A vela e a oração.',
        '<div class="prose"><p>A chama da vela representa a consciência desperta e a fé viva. O copo com água pura ao lado funciona como espelho e filtro das boas energias, conectando você ao seu Anjo da Guarda.</p>%s</div>' %
        pull('A vela e a água formam um portal de luz, proteção e conexão em sua morada.')
        + tiles([('01 · Local seguro e limpo', 'Acenda em local tranquilo e longe de inflamáveis, em silêncio e prece.'),
                 ('02 · Sempre vela branca', 'Em casa, use vela branca, salvo recomendação do guia. Ela é símbolo de pureza.'),
                 ('03 · Copo com água ao lado', 'Coloque sempre um copo com água limpa ao lado da vela.'),
                 ('04 · Descarte respeitoso', 'Ao final da queima, despeje a água numa planta ou em água corrente, com gratidão.')]) + M.rituais_vela_extra(H))
    gal = ''.join('<div>%s</div>' % photo(s, a, 'ratio-34', sizes='(max-width:860px) 50vw, 25vw') for s, a in [
        ('amala-ogum', 'Amalá de Ogum'), ('amala-oxum', 'Amalá de Oxum'), ('amala-pretos-velhos', 'Amalá dos Pretos Velhos'), ('amala-nana', 'Amalá de Nanã')])
    content += chapter('amala', 'Pilar 03', 'O amalá.',
        '<div class="fig-side"><div class="prose"><p>Na CUCA, o amalá é a oferenda montada com elementos naturais: frutas, flores, grãos e velas. Nunca é pagamento nem barganha. É um ato de amor, sintonia e gratidão às forças da natureza.</p>'
        '<p>Os amalás e as entregas são montados no Jardim dos Orixás, ao lado dos tambores e dos oratórios de madeira.</p>%s</div>%s</div>' % (
            pull('A beleza física da oferenda deve ser o reflexo da sinceridade da sua oração interior.'),
            photo('jardim-orixas', 'Os tambores das entregas no Jardim dos Orixás', 'ratio-34', 'O Jardim dos Orixás', sizes='(max-width:860px) 100vw, 40vw'))
        + tiles([('Composição', 'Montado no Jardim dos Orixás com flores, frutas frescas, líquidos em coité e velas em números ímpares.'),
                 ('Zelo com o Jardim', 'O Jardim é solo sagrado: nunca deixamos plásticos, lixo ou fósforos queimados nos alguidares.'),
                 ('A regra de ouro', 'Sem intenção não há axé. A beleza da oferenda reflete a sinceridade da oração.')])
        + '<div class="grid-4" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-top:2em">%s</div>'
          '<p style="margin-top:1.4em"><a class="link-arrow" href="orixas.html">O amalá de cada Orixá e de cada linha</a></p>' % gal + M.rituais_amala_extra(H))
    content += chapter('banho', 'Pilar 04', 'O banho de ervas.',
        '<div class="fig-side"><div class="prose"><p>O banho de ervas não é um ato comum de higiene. Ele limpa o campo espiritual e age por compensação: acalma o que está inflamado e desperta vigor onde há cansaço.</p>'
        '<ol class="steps"><li><b>A escolha</b><span>Peça licença à natureza. Escolha a erva conforme o elemento necessário: Ar, Fogo, Terra ou Água.</span></li>'
        '<li><b>O preparo</b><span>Maceração em água fria para folhas frescas. Infusão abafada para flores secas ou cascas.</span></li>'
        '<li><b>A aplicação</b><span>Depois do banho de higiene, despeje devagar, em oração, respeitando se a erva vai ou não na cabeça.</span></li>'
        '<li><b>O retorno</b><span>Deixe secar naturalmente e devolva as folhas coadas à terra, agradecendo.</span></li></ol>'
        '<p><a class="link-arrow" href="ervas.html">As 16 ervas sagradas da casa</a></p></div>%s</div>' %
        photo('banho-ervas', 'Mãos macerando folhas numa bacia para o banho de ervas', 'ratio-34', 'Preparo do banho', sizes='(max-width:860px) 100vw, 40vw') + M.rituais_banho_full(H))
    content += M.rituais_conga(H)
    write('rituais.html', 'Rituais e Preceitos · CUCA', 'Preceito, vela e oração, amalá e banho de ervas: como a CUCA vive o sagrado no dia a dia.',
          rit + body_with_index(idx, content) + invite(), 'jardim-orixas')

    # ================= ERVAS =================
    EL = {'Ar': 'el-ar', 'Fogo': 'el-fogo', 'Terra': 'el-terra', 'Água': 'el-agua'}
    leaf = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z"/><path d="M5 19l8-8"/></svg>'
    els, herbs = '', ''
    for c in data['ervas']:
        k = EL[c['element']]
        els += ('<article class="tile reveal %s"><div class="element-head"><span class="badge">%s</span><div><h3 style="margin:0">%s</h3><p class="mono" style="margin:0;color:var(--ink-secondary)">%s</p></div></div>'
                '<p style="margin-top:1em">%s</p><p><strong>Onde aplicar.</strong> %s</p>'
                '<details class="ficha-d"><summary class="link-arrow" style="cursor:pointer">Corpo, mente e espírito</summary><dl class="mini"><dt>No corpo</dt><dd>%s</dd><dt>Na mente</dt><dd>%s</dd><dt>No espírito</dt><dd>%s</dd><dt>Em equilíbrio</dt><dd>%s</dd><dt>Em excesso</dt><dd>%s</dd></dl></details></article>'
                % (k, e(c['element']), C(c['title']), C(c['intentLabel'].replace(' & ', ' e ')), C(c['oneLineSummary']), C(c['applicationRule']),
                   C(c['biological']), C(c['psychological']), C(c['spiritual']), C(c['humanBalanced']), C(c['humanExcess'])))
        for h in c['herbs']:
            herbs += ('<article class="ficha reveal %s" data-cat="%s"><div class="body"><span class="herb-mark">%s</span><p class="tag"><i style="background:var(--c)"></i>%s</p>'
                      '<h3>%s</h3><p class="role"><em>%s</em></p><p>%s</p><details><summary>Preparo e uso</summary><dl><dt>Uso</dt><dd>%s</dd><dt>Orixás</dt><dd>%s</dd>'
                      '<dt>Onde aplicar</dt><dd>%s</dd><dt>Preparo</dt><dd>%s</dd><dt>No corpo</dt><dd>%s</dd></dl></details></div></article>'
                      % (k, k, leaf, 'Ervas de ' + e(c['element']), C(h['name']), C(h['scientificName']), C(h['quickPurpose']), C(h['use']), C(h['orixas']),
                         C(h['applicationPart']), C(h['prepMethod']), C(h['bodyProperties'])))
    echips = ''.join('<button type="button" class="chip" data-value="%s" aria-pressed="%s">%s</button>' % (v, 'true' if v == 'all' else 'false', t)
                     for v, t in [('all', 'Todas'), ('el-ar', 'Ar'), ('el-fogo', 'Fogo'), ('el-terra', 'Terra'), ('el-agua', 'Água')])
    erv = page_hero('Fundamentos', 'Ervas Sagradas', 'Antes de escolher uma erva, pense na sua intenção. A mesma planta revela forças diferentes conforme o preparo e a finalidade.',
                    'axe-folhas', 'Médiuns segurando ramos de folhas durante a gira')
    erv += ('<section class="section light"><div class="wrap"><div class="grid-2 top"><div class="reveal"><span class="mono" style="color:var(--accent)">Como funcionam</span>'
            '<h2 style="margin-top:.4em">Cura, proteção e equilíbrio.</h2></div><div class="prose reveal">'
            '<p>As ervas acompanham a humanidade desde tempos ancestrais. Para o cuidado do corpo, elas aparecem em chás, infusões e xaropes. Para o cuidado espiritual, em banhos, defumações, escalda-pés e benzimentos: aí a planta faz a ponte entre o mundo material e as forças sutis.</p>'
            '<p>Na CUCA, organizamos as ervas pelos quatro elementos da natureza. Fogo estimula ação e coragem. Água favorece a cura emocional e a intuição. Ar inspira clareza. Terra dá firmeza e proteção.</p>'
            '<p style="color:var(--ink-secondary)">Se a entidade receitar um banho e você tiver alergia a alguma erva, avise. As ervas não substituem tratamento médico.</p>'
            '</div></div><div class="tiles" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">%s</div></div></section>') % els
    erv += ('<section class="section light" style="padding-top:0"><div class="wrap"><h2 class="reveal">As 16 ervas da casa.</h2>'
            '<div data-filter-group="lista-ervas"><div class="filters">%s</div><div class="find"><label><span class="sr-only">Buscar erva</span><input type="search" placeholder="Buscar: arruda, calma, Oxóssi"></label></div></div>'
            '<div class="fichas" id="lista-ervas">%s</div><p class="no-results" hidden>Nenhuma erva encontrada.</p></div></section>') % (echips, herbs)
    write('ervas.html', 'Ervas Sagradas · CUCA', 'As 16 ervas da CUCA organizadas pelos 4 elementos: Ar, Fogo, Terra e Água. Uso, preparo, Orixás e onde aplicar.',
          erv + invite(), 'axe-folhas')

    # ================= PRIMEIRA VEZ =================
    FIMG = {'Passe Energético': ('passe', 'Mãos de médium aplicando passe', None), 'Descarrego': ('descarrego', 'Médium com folhas grandes durante um descarrego', None),
            'Cura Espiritual': ('cura', 'Médium em trabalho de cura sobre a maca', None), 'Consultas no Toco': ('consulta', 'Médium incorporado em consulta, sentado no toco', '35% 50%')}
    fr = ''
    for f in data['frentes']:
        s, a, pos = FIMG[f['title']]
        pts = ''.join('<dt>%s</dt><dd>%s</dd>' % (C(p['label']), C(p['text'])) for p in f['points'])
        fr += ('<article class="ficha reveal" data-cat="x"><figure class="photo tall">%s</figure><div class="body"><p class="tag"><i></i>%s</p><h3>%s</h3><p>%s</p>'
               '<details><summary>Como funciona</summary><dl>%s</dl></details></div></article>' % (img(s, a, sizes='(max-width:600px) 100vw, 25vw', pos=pos), C(f['subtitle'].replace(' & ', ' e ')), C(f['title']), C(f['summary']), pts))
    LEAD = [('joao-lucas', 'Pai João Lucas de Ogum', 'Pai de Santo · Dirigente'), ('hismara', 'Hismara', 'Mãe de Santo'), ('patricia', 'Patrícia', 'Mãe Pequena')]
    TEAM = [('joao-caetano', 'João Caetano', 'Ogã Chefe'), ('raphael', 'Raphael', 'Samba Chefe'), ('mariane', 'Mariane', 'Ogã'),
            ('ana-paula', 'Ana Paula', 'Capitã'), ('elis', 'Elis', 'Capitã'), ('emily', 'Emily', 'Capitã'),
            ('daniel', 'Daniel', 'Capitão'), ('matheus', 'Matheus', 'Capitão'), ('miguel', 'Miguel', 'Capitão')]
    POS = {'daniel': '50% 30%', 'matheus': '50% 20%'}
    person = lambda s, n, r: '<figure class="person reveal">%s<figcaption><b>%s</b><span>%s</span></figcaption></figure>' % (
        '<div class="photo">%s</div>' % img(s, '%s, %s da CUCA' % (n, r.split(' · ')[0]), sizes='(max-width:600px) 50vw, 20vw', pos=POS.get(s, '50% 22%')), e(n), e(r))
    pv = page_hero('Vivência', 'Primeira vez?', 'Tudo o que acontece da chegada até a saída, para você vir tranquilo.',
                   'fachada', 'A casa da CUCA ao entardecer, com médiuns de branco na varanda', wide=True)
    idx = [('passos', 'Passo a passo'), ('conduta', 'Guia de conduta'), ('frentes', 'Frentes de atendimento'), ('hierarquia', 'Quem cuida da casa'), ('orientacoes', 'Orientações de ouro'), ('limites', 'O que não fazemos')]
    content = chapter('passos', '01 · Sua visita', 'Passo a passo.',
        '<div class="fig-side"><div><ol class="steps">'
        '<li><b>Chegue às 19h.</b><span>As senhas são distribuídas por ordem de chegada. A gira começa às 19h30.</span></li>'
        '<li><b>Peça licença na entrada.</b><span>À esquerda do portão fica a Tronqueira, a casinha dos guardiões da casa. Quem recebe você mostra como saudar.</span></li>'
        '<li><b>Tire os calçados.</b><span>Ao entrar no salão, deixamos o mundo lá fora. Celular no silencioso.</span></li>'
        '<li><b>Acompanhe a abertura.</b><span>Os pontos cantados e o atabaque abrem a gira. Você assiste sentado, em silêncio.</span></li>'
        '<li><b>Receba o atendimento.</b><span>Quando sua senha for chamada, você recebe passe ou consulta com uma entidade. Uma consulta por gira.</span></li>'
        '<li><b>Agradeça e siga em paz.</b><span>Ao sair, agradeça ao Congá. Se receber orientação de banho ou prece, siga com calma.</span></li></ol></div>'
        '<div>%s</div></div>' % photo('conga', 'O Congá da CUCA', 'ratio-32', 'O Congá', sizes='(max-width:860px) 100vw, 40vw')
        + tiles([('O que vestir', 'Roupa limpa e discreta, de qualquer cor. Evite perfume forte e bebida alcoólica no dia.'),
                 ('Se sentir algo forte', 'Choro, arrepio ou emoção forte acontecem. Avise com discrição alguém da casa. Você não fica sozinho.'),
                 ('Estacionamento', 'Tem, no local, por R$ 12,00. Estacione onde a equipe indicar.'),
                 ('Prioridade', 'Pessoas idosas, gestantes e pessoas com condição especial têm prioridade. Avise na chegada.'),
                 ('Crianças', 'Podem vir, sempre acompanhadas de um responsável e em silêncio respeitoso.'),
                 ('Fotos e vídeos', 'Não, sem autorização da casa. O que acontece na gira é sagrado e confidencial.')]))
    content += M.conduta(H)
    content += chapter('frentes', '03 · Como trabalhamos na gira', 'As quatro frentes de atendimento.',
        '<p class="prose">Todo auxílio mediúnico é caridade gratuita. Na gira, você pode receber uma destas quatro formas de atendimento.</p><div class="fichas" style="grid-template-columns:repeat(auto-fill,minmax(230px,1fr))">%s</div>' % fr)
    content += chapter('hierarquia', '04 · Falando da casa', 'Quem cuida da casa.',
        '<div class="prose"><p>Na gira, cada pessoa tem uma função, e a hierarquia é a sua referência dentro da casa. Estes são os nomes que você vai ouvir e as pessoas que vão te receber. Se tiver qualquer dúvida, procure uma delas.</p></div>'
        '%s<div class="people lead">%s</div><div class="people">%s</div>' % (
            photo('hierarquia', 'A corrente da CUCA reunida no salão', 'ratio-169', 'A corrente da CUCA', sizes='(max-width:1000px) 100vw, 70vw', pos='50% 40%'),
            ''.join(person(*p) for p in LEAD), ''.join(person(*p) for p in TEAM))
        + tiles(M.HIERARQUIA))
    content += chapter('orientacoes', '05 · Para quem vai passar por atendimento', 'Quatro orientações de ouro.',
        tiles([('1. Fale com clareza e verdade', 'Ao conversar com a entidade no toco, o lugar da consulta individual, seja honesto. Não tente testar o guia. Vá com o coração aberto.'),
               ('2. Avise sobre alergias a ervas', 'Se a entidade receitar um banho de ervas ou chá e você for alérgico a algum componente, avise na hora.'),
               ('3. Respeite os limites éticos', 'Não peça amarrações, previsões do futuro ou qualquer trabalho que prejudique outra pessoa. A Umbanda atua nas leis do amor e da caridade.'),
               ('4. O passe começa na assistência', 'Cuide dos seus pensamentos enquanto espera o atendimento. Sua melhora começa na sua intenção.')]))
    content += chapter('limites', '06 · Nossos limites', 'O que não fazemos.',
        '<ul class="nots">'
        '<li><b>Não fazemos amarrações nem simpatias amorosas.</b><span>A Umbanda respeita o livre-arbítrio. Não fazemos nenhum trabalho para manipular a vontade de outra pessoa.</span></li>'
        '<li><b>Não fazemos adivinhação do futuro.</b><span>Os guias não são oráculos. A missão da espiritualidade é aconselhar e fortalecer você para construir o amanhã com consciência.</span></li>'
        '<li><b>Não acolhemos fofocas nem pedidos de vingança.</b><span>O terreiro é um hospital de almas. Não aceitamos pedidos para prejudicar ninguém.</span></li>'
        '<li><b>Não recebemos bonificações nem vantagens pessoais.</b><span>Médiuns e dirigentes não se beneficiam materialmente do trabalho espiritual. O que fazemos é por amor e compromisso com a caridade.</span></li>'
        '<li><b>Não cobramos nem aceitamos pagamento.</b><span>Nenhum trabalho espiritual, passe ou consulta tem preço. A espiritualidade nunca é mercadoria.</span></li></ul>')
    write('primeira-vez.html', 'Primeira vez? · CUCA', 'Como é a primeira visita à CUCA: horário, senhas, o que vestir, as frentes de atendimento e quem cuida da casa.',
          pv + body_with_index(idx, content) + invite(), 'fachada')

    # ================= MÉDIUM =================
    passos = [
        ('Vivência como consulente', 'Todo médium começa na assistência. Para manifestar interesse em ingressar e participar da Tiragem do Obi, é preciso participar de, no mínimo, 5 giras, para se afinar com a energia e a disciplina do terreiro.'),
        ('Consulta com o Caboclo Akuan ou o guia chefe', 'O processo começa numa consulta individual com o Espírito Dirigente ou o chefe da gira. É nessa conversa que a entidade avalia a afinidade e autoriza, ou não, a caminhada.'),
        ('Desligamento de outras casas', 'A CUCA não permite que o médium trabalhe em mais de um centro ao mesmo tempo. Quem vem de outra casa faz, com respeito, o ritual de desligamento: o levantamento do Amaci anterior.'),
        ('Validação do Pai de Santo', 'Depois do aval do guia, o Pai de Santo revisa a ordem espiritual, apresenta o regimento interno e alinha os deveres éticos, materiais e de presença.'),
        ('Período de preparação', 'Aprovado, começa a preparação: banhos de ervas, estudo dos pontos cantados e preceitos para sintonizar corpo, mente e espírito com a CUCA.'),
        ('Reconsulta e Tiragem do Obi', 'Depois da preparação, uma reconsulta definitiva e a tiragem do Obi confirmam o Orixá de cabeça.'),
        ('O Amaci', 'A lavagem de cabeça com ervas sagradas liga o médium oficialmente à corrente da CUCA. Sem o Amaci, o médium não atua como trabalhador.'),
    ]
    med = page_hero('Vivência', 'Quero ser médium', 'Entrar para a corrente mediúnica é um chamado ao trabalho espiritual, ao autoconhecimento e ao serviço fraterno.',
                    'corrente', 'A corrente de médiuns de branco cantando no salão', wide=True)
    idx = [('aco', 'A corrente de aço'), ('autodescobrimento', 'Autodescobrimento'), ('passos', 'Os 7 passos'), ('obi', 'Tiragem do Obi'), ('amaci', 'O Amaci'), ('menores', 'Menores de idade'),
           ('direitos', 'Direitos e deveres'), ('caminhada', 'O começo da caminhada'), ('dicas', 'Dicas de ouro'), ('deveres', 'Pilares'), ('funcoes', 'Funções mediúnicas')]
    content = chapter('aco', 'O caminho do médium', 'A corrente de aço.',
        '<div class="prose">%s<p>O ingresso na CUCA não acontece de imediato. Exige vivência, confirmação espiritual e preparo. Leia com calma os passos abaixo e, se sentir o chamado, comece pela assistência, numa segunda-feira.</p></div>' %
        (pull('Uma corrente que una a disciplina com o amor será, verdadeiramente, uma corrente de aço.', 'Caboclo Akuan')
         + pull('Não quero os melhores médiuns, sensíveis e sensitivos. Quero comigo os melhores umbandistas!', 'Caboclo Akuan')
         + pull('Você tem disciplina? Transparência? E amor? Então Akuan lhe receberá em sua corrente. Mas prepare-se bem, pois o caminho do serviço espiritual é lento, longo e exigente, mas é também belo e recompensador.', 'Exu Tranca Ruas das Almas')))
    content += chapter('autodescobrimento', '01 · Psicologia e espiritualidade', 'A mediunidade como autodescobrimento.',
        tiles([('O médium como instrumento vivo', 'A mediunidade não é um passe de mágica em que a pessoa funciona como um gravador. O guia usa o repertório emocional e moral do médium para passar a mensagem.'),
               ('“Só vamos com o outro até onde fomos conosco”', 'O princípio de Carl Jung vale aqui: como amparar a dor de um consulente se fugimos de encarar as nossas próprias sombras?'),
               ('Afinar o caráter', 'Quando falta bagagem moral, o vazio é preenchido pelo ego. A espiritualidade verdadeira não precisa de espetáculo, precisa de instrumentos afinados.')]))
    content += chapter('passos', '02 · Jornada de admissão', 'Os 7 passos para ingressar na corrente.',
        '<div class="faq">%s</div>' % ''.join('<details%s><summary>%d. %s</summary><div class="ans"><p>%s</p></div></details>' % (' open' if i == 0 else '', i + 1, e(t), e(d)) for i, (t, d) in enumerate(passos)))
    content += M.medium_extras(H)
    content += chapter('dicas', '03 · Sabedoria de terreiro', 'Seis dicas de ouro para o médium.',
        tiles([('1. Seja o consulente de si mesmo', 'Tome para si os ensinamentos que te atravessarem. A entidade não é sua propriedade, nem você dela.'),
               ('2. Não espere ser convocado', 'A ordem de fora reflete a de dentro. Ofereça-se para ajudar na limpeza, na organização e no zelo pelo templo.'),
               ('3. Juntos somos mais fortes', 'Se perceber que um irmão está em dificuldade, estenda a mão.'),
               ('4. O combinado não sai caro', 'Assuma compromissos com a casa e cumpra: presença, pontualidade e manutenção coletiva.'),
               ('5. A Umbanda exige diálogo', 'Se algo causar desconforto ou dúvida, procure a hierarquia da casa com franqueza e humildade, nunca pelos corredores.'),
               ('6. Silêncio também é axé', 'Não tenha pressa em falar. Antes de toda palavra sábia existe um silêncio firme.')]))
    content += chapter('deveres', '04 · Ética e compromisso', 'Pilares e deveres da corrente.',
        tiles([('Disciplina e conduta moral', 'Cultivar a retidão de caráter dentro e fora do terreiro, honrando o branco que veste.'),
               ('Zero álcool e drogas ilícitas', 'O uso abusivo de álcool e drogas ilícitas é incompatível com o trabalho mediúnico. A mediunidade exige lucidez.'),
               ('Presença e zelo pelo templo', 'Participação ativa nas giras, nas escalas de limpeza e no preparo. Na Umbanda, varrer o chão é tão sagrado quanto dar passe.'),
               ('Respeito à hierarquia e ao preceito', 'Seguir as orientações do Pai de Santo, dos Capitães, Cambones e Ogãs, com o preceito e os banhos em dia.')]))
    content += chapter('funcoes', '05 · Todas as funções são sagradas', 'Funções mediúnicas na CUCA.',
        '<p class="prose">Não há médium privilegiado: somos todos partes indispensáveis de um único trabalho espiritual.</p><div class="grid-2 top" style="margin-top:1.4em">'
        '<div><h3>Médiuns incorporantes</h3>%s</div><div><h3>Médiuns não incorporantes</h3>%s</div></div>' % (
            tiles([('De toco', 'Atendem o público em consulta, com as entidades, prezando pelo sigilo, pela simplicidade e pela ausência de vaidade.'),
                   ('De passe', 'Trabalham incorporados aplicando passes e curas silenciosas no centro do salão.'),
                   ('De transporte', 'Servem de ponte segura para encaminhar espíritos sofredores à luz, sob o comando do guia dirigente.')]),
            tiles([('Sustentação', 'Doam prece e foco, mantendo a frequência da gira firme. Sem eles, o trabalho não acontece.'),
                   ('Cambones', 'A maior escola da Umbanda. Auxiliam as entidades e os consulentes, traduzindo orientações e zelando pela ordem.'),
                   ('Curimba', 'Ogãs, atabaqueiros e sambas: o coração da gira. A música no terreiro é oração cantada.')])))
    write('medium.html', 'Quero Ser Médium · CUCA', 'Os 7 passos para ingressar na corrente mediúnica da CUCA, as dicas de ouro, os deveres e as funções de cada médium.',
          med + body_with_index(idx, content) + invite(), 'corrente')

    # ================= DOCUMENTOS =================
    docs = [
        ('Guia do Médium', 'O manual da casa: a história, a missão, o regimento e os fundamentos da CUCA, escrito por Pai João Lucas de Ogum.', 'assets/docs/guia-do-medium-cuca.pdf'),
        ('Ritual de Abertura', 'A ordem da abertura da gira, para estudo da corrente.', 'assets/docs/ritual-de-abertura.pdf'),
        ('Livro de Pontos Cantados', 'Os pontos cantados da casa, organizados por linha.', None),
    ]
    dh = ''
    for t, d, f in docs:
        if f:
            dh += ('<article class="doc reveal"><span class="state">Disponível em PDF</span><h3>%s</h3><p>%s</p><div class="actions">'
                   '<a class="btn btn-primary" href="%s" target="_blank" rel="noopener">Ler</a><a class="btn btn-ghost" href="%s" download>Baixar</a></div></article>' % (e(t), e(d), f, f))
        else:
            dh += '<article class="doc reveal"><span class="state soon">Em breve</span><h3>%s</h3><p>%s</p></article>' % (e(t), e(d))
    doc = page_hero('Vivência', 'Documentos e Pontos', 'O acervo de estudo da corrente: leia no site ou baixe em PDF.',
                    'raphael', 'Raphael, Samba Chefe, cantando um ponto na curimba')
    doc += ('<section class="section dark grain"><div class="smoke" aria-hidden="true"></div><div class="wrap"><h2 class="reveal">Acervo de estudo.</h2>'
            '<p class="lede reveal">Material da casa para médiuns e para quem quer conhecer a CUCA a fundo.</p><div class="docs">%s</div></div></section>') % dh
    write('documentos.html', 'Documentos e Pontos · CUCA', 'Guia do Médium, Ritual de Abertura e Livro de Pontos Cantados da CUCA, para leitura e download.',
          doc + M.curimba(H) + '<section class="section dark grain" id="cucacast"><div class="wrap"><div class="midia">%s%s</div></div></section>' % (g['podcast_block'](), g['instagram_block']()) + invite(), 'raphael')
    M.agenda_page(H, g)
