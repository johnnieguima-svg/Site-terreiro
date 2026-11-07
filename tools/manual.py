"""Conteúdo acrescentado a partir do Guia do Médium (Pai João Lucas de Ogum e Hierarquia, 2025).
Usado por tools/paginas.py. Texto revisado: sem travessões, linguagem direta."""

# ---------- Vídeos dos Orixás no Instagram (@cuca_terreirodeumbanda) ----------
# Cole o link de cada reel. Xangô e Oxalá ainda não têm vídeo. Ficha sem link não mostra o botão.
ORIXA_VIDEOS = {
    'Ogum': '',
    'Oxóssi': '',
    'Omulu': '',
    'Iansã': '',
    'Oxum': '',
    'Iemanjá': '',
    'Nanã': '',
}

# ---------- Amalás por Orixá e por linha (capítulo "Amalás (Entregas)") ----------
AMALA = {
    'Ogum': 'Comida: frutas vermelhas (melancia, goiaba, romã, manga espada), evitando as muito ácidas, e amendoim com casca. Bebida: cerveja branca. Flores: antúrio, flor do campo vermelha, cravo vermelho, gerânio e mini espada de São Jorge. Velas: vermelha e branca.',
    'Oxum': 'Comida: frutas aquosas e doces (melão, pera, manga palmer), mel, flores comestíveis e canjica amarela. Bebida: água mineral. Flores: rosas amarelas, girassol, margarida e amarílis. Velas: amarela, ou amarela e branca.',
    'Iansã': 'Comida: frutas alaranjadas e intensas (laranja, mamão, tangerina, caqui), acarajé de feijão fradinho, milho em espiga ou canjica amarela. Bebida: suco de laranja ou de tangerina sem açúcar, ou água mineral. Flores: hibisco vermelho, cravos vermelhos, astromélias, gérberas e gerânio. Velas: laranja, ou laranja e branca.',
    'Oxóssi': 'Comida: frutas verdes (abacate, limão, kiwi, carambola, maracujá), milho cozido, coco e moranga. Bebida: suco de frutas ou cerveja branca. Flores: folhas e ervas, samambaia, folha de bananeira, capim santo e flores do campo. Velas: verde, ou verde e branca.',
    'Xangô': 'Comida: frutas terrosas e intensas (abacaxi, caqui, banana da terra), coco seco e quiabo frito. Bebida: suco de abacaxi ou cerveja preta. Flores: cravos vinho, begônias, crisântemos avermelhados e flores do campo. Velas: marrom, ou marrom e branca.',
    'Iemanjá': 'Comida: manjar de coco sem calda, canjica branca, uvas, peras, maçã verde e nectarina. Bebida: água mineral ou leite de coco. Flores: rosas brancas e azul claras, lírios brancos, cravos brancos, jasmins, crisântemos brancos e íris azuis. Velas: azul, ou azul e branca.',
    'Oxalá': 'Comida: canjica branca, arroz doce só com açúcar, nectarina, uvas brancas, pão e polpa de coco seco. Bebida: água mineral ou suco de uva branca. Flores: ramos de trigo, rosas brancas, lírios brancos, jasmins, margaridas e crisântemos brancos. Velas: branca.',
    'Nanã': 'Comida: raízes, frutas roxas e vegetais (batata doce cozida, berinjela, beterraba, inhame cozido, figo, repolho roxo). Bebida: água de chuva ou suco de beterraba. Flores: violetas, lavandas, hortênsias roxas, lírios roxos e flores do campo lilases. Velas: lilás, ou lilás e branca.',
    'Omulu': 'Comida: pipoca sem sal (o deburu), inhame, mandioca, gengibre, coco seco, feijão preto cozido sem tempero e milho branco torrado. Bebida: cauim, cachaça com água ou cerveja preta. Flores: palhas e espigas de milho, cravos brancos, crisântemos brancos, sempre-vivas e margaridas brancas. Velas: preta.',
    'Pretos(as) Velhos(as)': 'Comida: café preto, cocada, doces de coco, tutu de feijão e rapadura. Bebida: café, batida de coco, suco de milho ou água. Com cigarro de palha. Flores: cravos brancos, margaridas e flores do campo brancas, folhas de bananeira e espigas de milho. Velas: brancas, ou brancas e pretas.',
    'Erês': 'Comida: doces caseiros, bolos simples e balas de banana, de preferência feitos por quem oferece. Bebida: sucos de fruta feitos em casa. Flores: ornamentais e coloridas, em especial margaridas. Velas: brancas, azuis e rosas.',
    'Baianos': 'Comida: petiscos de bar como amendoim, aipim frito e azeitonas, sem nenhuma proteína animal. Bebida: cachaça ou cerveja clara. Flores: rosas vermelhas e brancas. Velas: brancas.',
    'Marinheiros': 'Comida: frutas aquosas e claras, como uvas e peras. Bebida: cachaça, rum ou água. Flores: rosas brancas ou flores azuis. Velas: azuis, brancas ou misturadas.',
    'Boiadeiros': 'Comida: doces e salgados da roça, como broa de milho, curau e pamonha. Bebida: cachaça ou café. Flores: cravos ou flores simples do campo. Velas: amarelas e pretas.',
    'Ciganos': 'Comida: frutas doces, como pêssegos, damascos e tâmaras. Bebida: vinho. Flores: rosas e cravos vermelhos, flores coloridas e incensos. Velas: coloridas, roxas ou amarelas.',
    'Exus e Pombagiras': 'Exus: farofa de milho flocado com dendê e pimentas, com cachaça, uísque ou conhaque, charutos e velas pretas, vermelhas ou pretas e vermelhas, sempre em número ímpar. Flores: antúrios, folhas de pimenta ou pimentas. Pombagiras: a mesma farofa com frutas caramelizadas, champanhe ou espumante, rosas vermelhas, cigarrilhas e velas vermelhas ou pretas e vermelhas, também em número ímpar.',
}


def historia_umbanda(H):
    return H['chapter']('umbanda', 'Antes da casa', 'A Umbanda.',
        '<div class="prose">'
        '<h3>Origem: o caminho é uma encruzilhada</h3>'
        '<p>Os registros mais aceitos situam a fundação oficial da Umbanda em 15 de novembro de 1908, em Niterói (RJ). Naquela tarde, o jovem médium Zélio Fernandino de Moraes, então com 17 anos, deu passagem ao Caboclo das Sete Encruzilhadas durante uma sessão kardecista. O Caboclo anunciou um culto “onde pretos-velhos e caboclos trabalhariam pela caridade, sem discriminação alguma”.</p>'
        '<p>Por essa leitura, a Umbanda nasce com traços próprios: vestes brancas, atendimento gratuito, nenhum sacrifício animal, uso contido dos atabaques e diálogo forte com o Evangelho.</p>'
        '<h3>Raízes muito antes de 1908</h3>'
        '<p>A mesma história tem vozes que contestam a ideia de um fundador único. Pesquisas descrevem terreiros chamados de “umbanda” ou “cabula” já no século XIX, nos subúrbios cariocas e baianos. Para esses estudiosos, Niterói consolidou, sem necessariamente inaugurar, uma religiosidade negra e indígena que já existia.</p>'
        '<h3>Uma encruzilhada viva</h3>'
        '<p>Hoje convivem a Umbanda Popular, Traçada, Omolocô, Angola, Esotérica, de Raiz, das Almas e tantas outras. Todas carregam o mesmo princípio: caridade como fundamento, diversidade como riqueza. A palavra Umbanda é ligada por muitos ao quimbundo “mbanda”: a arte do curandeiro.</p>'
        '<h3>Um retrato do Brasil</h3>'
        '<p>A Umbanda traz no próprio couro as listras da terra onde nasceu. Não tem doutrina fixa, livro sagrado nem grão-mestre. Tem liberdade responsável para cantar, bater cabeça, tocar atabaque e vestir guias, desde que se preserve a tríade: amor, disciplina e respeito.</p>'
        '%s</div>' % H['pull']('A Umbanda segue sendo ponte entre mundos, voz do exilado, alento do enfermo e escola viva de fraternidade.', 'Guia do Médium'))


def historia_missao(H):
    return H['chapter']('missao', 'Quem somos', 'Missão, visão e valores.',
        '<div class="prose"><p>Nosso tronco espiritual brota de três gerações de fé: Pai Fernando de Ogum, que plantou a semente; Pai Léo de Oxóssi, que a fez crescer; e esta casa, erguida sob a força do Caboclo Akuan.</p></div>'
        + H['tiles']([('Missão: ser casa e coração', 'Somos lar antes de sermos templo. Aqui a porta fica aberta para o desamparo, o abraço é gratuito e a palavra cura. Amor, caridade e disciplina formam a corrente que sustenta cada gira.'),
                      ('Visão: Umbanda simples, eficaz e profunda', 'Ser referência de Umbanda brasileira: fiel aos cantos dos antigos e corajosa para dialogar com o mundo de hoje. Que cada consulente saia mais desperto e cada médium mais consciente.'),
                      ('Caridade', 'Atendimento gratuito, ouvido atento, gesto solidário.'),
                      ('Disciplina de Caboclo', 'Pontualidade, preparo ritual e estudo contínuo.'),
                      ('Ética de Preto Velho', 'Transparência nas finanças, sigilo nas confidências, respeito nas diferenças.')])
        + '<p class="final-line" style="font-size:1.3rem">Não distinguimos cor, etnia, trajetória espiritual, orientação sexual ou gênero. Respeitamos quem nos respeita.</p>')


def historia_final(H):
    return H['chapter']('sorri', 'Considerações finais', 'Uma Umbanda que sorri.',
        '<div class="prose">'
        '<p>Pai Léo de Oxóssi costuma dizer que a Umbanda é o caminho para as estrelas. Pai Fernando, filho de Ogum de poucas palavras, dizia que a Umbanda é amor. Pai Beco de Oxóssi a definia simplesmente como samba, oração. A Umbanda é tudo isso e muito mais.</p>'
        '<p>A Umbanda que buscamos viver nesta casa é uma Umbanda que sorri. Como numa escola de samba, poucos de fora sabem o esforço para manter instrumentos, ritmos e pessoas em harmonia. Esse esforço tem um único objetivo: acender a luz do espírito até desabrochar num sorriso, sem cor, raça, orientação sexual, partido ou qualquer outro rótulo.</p>'
        '%s'
        '<p class="mono" style="color:var(--ink-secondary)">Saravá, Caboclos! Saravá, Pretos-Velhos! Laroyê, Exu! Saravá à Umbanda!</p></div>'
        % H['pull']('A Umbanda é a cara de Deus, e Ele é a cara do Brasil.', 'Pai João Lucas de Ogum'))


CONDUTA = [
    ('Disposição interna', ['Chegue com respeito, humildade e abertura para aprender.', 'Não teste as entidades. Leve perguntas sinceras e objetivas.', 'Aceite que a cura é um processo: sem pressa e sem barganha.']),
    ('Antes da gira', ['Evite álcool, drogas e excessos no dia do trabalho.', 'Coma leve e evite perfume forte.', 'Vista roupa limpa e discreta, com poucos adereços.']),
    ('Ao chegar', ['Trate o espaço como sagrado desde o portão.', 'Siga as orientações de quem está na recepção.', 'Estacione onde for indicado e acerte antes o valor do estacionamento. Por segurança, evite circular pelo estacionamento.']),
    ('No salão', ['Silêncio e celular desligado ou no silencioso.', 'Concentre-se nos cantos e nas orações, sem conversas paralelas.', 'Não toque em objetos rituais sem permissão.', 'Tire os calçados: é o gesto de deixar o mundo lá fora e pisar em solo sagrado.', 'Respeite filas, lugares marcados e os limites do espaço de trabalho.']),
    ('Na consulta', ['Uma consulta por gira. Se você já foi atendido, o trabalho está em curso.', 'Fale com clareza e responda com honestidade.', 'Não peça provas. Aceite a orientação recebida.', 'Se receber receita de banho ou chá, avise se tiver alergia a algum item.']),
    ('Com a hierarquia', ['Siga as instruções dos membros da corrente: elas existem para a sua segurança.', 'Dúvidas e necessidades: procure alguém da hierarquia, sem interromper a gira.', 'Não interfira no trabalho dos médiuns.']),
    ('Privacidade e ética', ['O que é tratado na consulta é confidencial: não exponha consultas alheias nem a identidade dos médiuns.', 'Não filme nem fotografe sem autorização da casa.', 'Evite comparações entre entidades e médiuns.', 'Dê preferência a pessoas idosas, gestantes ou com condição especial.']),
    ('Doações', ['Toda contribuição é voluntária e transparente.', 'Ajuda espiritual nunca depende de pagamento: Umbanda é caridade.', 'Qualquer entrega ou oferenda é combinada com a casa.']),
    ('Situações especiais', ['Crianças sempre acompanhadas de um responsável.', 'Gestantes, pessoas medicadas ou sensíveis: avisem a hierarquia, a prioridade é de vocês.', 'Se sentir tontura, choro ou emoção intensa, sinalize com discrição a alguém da casa.']),
    ('Ao sair', ['Agradeça e peça licença ao Congá.', 'Siga para casa logo depois da gira, para preservar a boa vibração.', 'Cumpra sem demora as recomendações recebidas: banhos, preces e cuidados.']),
]

ZELO = ['Jogar lixo fora do lugar', 'Desperdiçar água, papel ou luz', 'Tirar ervas e plantas do Jardim dos Orixás',
        'Ocupar mais de uma vaga no estacionamento', 'Ocupar espaço demais no banco da assistência', 'Usar aparelhos que façam som ou luz durante os trabalhos']


def conduta(H):
    e = H['e']
    items = ''.join('<details%s><summary>%02d. %s</summary><div class="ans"><ul class="dash">%s</ul></div></details>' % (
        ' open' if i == 0 else '', i + 1, e(t), ''.join('<li>%s</li>' % e(x) for x in xs)) for i, (t, xs) in enumerate(CONDUTA))
    return H['chapter']('conduta', '02 · O rito do consulente', 'Guia completo de conduta.',
        '<div class="prose">%s<p>Todo o espaço do terreiro é sagrado. Ao cruzar o portão, já entramos numa egrégora espiritual, e cada atitude ajuda ou atrapalha o trabalho de todos. Na hora de chegar, saudamos a Tronqueira, a casinha à esquerda de quem entra, pedindo licença aos Exus e Pombagiras que guardam a casa.</p></div>'
        '<div class="faq">%s</div>'
        '<div class="tile" style="margin-top:1.6em"><h4>Para cuidar do espaço, evite</h4><ul class="dash">%s</ul></div>'
        '<p style="margin-top:1.2em;color:var(--ink-secondary)"><strong>Dica de ouro:</strong> respeito, participação atenta, concentração e seriedade. Isso sustenta o trabalho, protege quem serve e acolhe quem busca. O terreiro não se responsabiliza por perda ou dano de pertences pessoais.</p>'
        % (H['pull']('Nada do que acontece em um terreiro é por acaso. Cada palavra, atitude ou pensamento é amplificado dentro de um terreiro. Vigiem as palavras, as atitudes e os pensamentos, pois tudo ecoará com mais intensidade.', 'Caboclo Akuan'),
           items, ''.join('<li>%s</li>' % e(z) for z in ZELO)))


HIERARQUIA = [
    ('Pais e Mães de Santo', 'A cabeça do terreiro. Conduzem a casa e as giras e tomam as decisões finais sobre os trabalhos.'),
    ('Pais e Mães Pequenos', 'Os braços do dirigente. Substituem o Pai ou a Mãe de Santo na condução das giras e acompanham os médiuns em desenvolvimento.'),
    ('Capitães e Capitãs', 'As mãos do dirigente. Cuidam do bom funcionamento da gira e fazem a ponte entre a direção e a corrente.'),
    ('Sambas e Ogãs', 'Sustentam o ritmo e a vibração dos trabalhos: conduzem os pontos cantados e os atabaques.'),
]


def medium_extras(H):
    e, chapter, tiles, pull = H['e'], H['chapter'], H['tiles'], H['pull']
    out = chapter('obi', 'Antes do ingresso', 'A Tiragem do Obi.',
        '<div class="prose"><p>O Obi não é jogo nem curiosidade, como quem procura o próprio signo. É um oráculo sagrado: sementes que revelam o Orixá de cabeça e mostram as forças que nos espelham, nossas dificuldades, nossas facilidades e o que precisamos trabalhar para alcançar equilíbrio.</p>'
        '<p>Quem se identificar com a casa e quiser tirar o Obi participa de, no mínimo, cinco giras. Depois, assina a presença no caderno da hierarquia e recebe uma data marcada para a tiragem.</p></div>')
    out += chapter('amaci', 'O selo de pertencimento', 'O Amaci.',
        '<div class="prose">%s'
        '<p>A Umbanda ensina que a cabeça é o nosso principal receptáculo do sagrado. Na tradição africana ela se chama Ori. A coroa é a energia que vibramos hoje nesse Ori. O Amaci introduz o axé dos Orixás na cabeça espiritual e alinha a coroa com os nossos anseios mais altos.</p>'
        '<p>Depois do Amaci, o alguidar do médium passa a ficar no Roncó da casa, alimentado com vela e ervas o ano inteiro, e o Caboclo pai de cabeça começa a atuar no caminho do médium.</p></div>'
        % pull('Amaci é a lavagem de cabeça com ervas das Linhas de Umbanda que inicia a pessoa na religião de Umbanda e na casa por ela escolhida.', 'Pai Léo de Oxóssi')
        + tiles([('Com a Umbanda', 'Ser umbandista por direito, com conduta condizente e sem fazer parte de outra religião ou casa.'),
                 ('Com o terreiro', 'Seguir as normas, colaborar com a manutenção e estar presente nos trabalhos.'),
                 ('Com a boa conduta', 'Não julgar e respeitar os irmãos.'),
                 ('Com as entidades', 'Respeito, culto e gratidão aos guias que passam a cuidar do caminho.'),
                 ('Com o Pai ou a Mãe de Santo', 'Respeito, lealdade, honestidade e franqueza com quem dirige.'),
                 ('Com a caridade', 'Servir como médium, cambone ou elo de corrente, dentro e fora do terreiro.')]))
    out += chapter('menores', 'Jovens na corrente', 'Médiuns menores de idade.',
        tiles([('Idade mínima: 12 anos', 'Com autorização expressa dos dois responsáveis e sempre acompanhados na consulta e na preparação.'),
               ('Incorporação só a partir dos 16', 'Antes disso o jovem vibra e participa da gira, mas a incorporação exige maturidade que ainda está em formação.'),
               ('Sempre com um responsável', 'Nenhum médium menor de idade frequenta os trabalhos sem um responsável legal ou alguém indicado por ele.')]))
    out += chapter('direitos', 'Médium integrante', 'Direitos e deveres.',
        '<div class="grid-2 top"><div><h3>Direitos</h3><ul class="dash">'
        '<li>Usar os espaços comuns da casa.</li><li>Participar de todas as atividades do terreiro.</li><li>Buscar orientação espiritual com os guias e a direção.</li>'
        '<li>Ter voz nas decisões coletivas, quando a direção convocar.</li><li>Ter acesso a cursos e encontros de formação.</li></ul></div>'
        '<div><h3>Deveres</h3><ul class="dash">'
        '<li>Assiduidade e pontualidade, avisando qualquer falta.</li><li>Zelo pelo espaço: limpeza e organização.</li>'
        '<li>Compromisso financeiro: a CUCA é uma associação mantida pela mensalidade dos médiuns, com valor mínimo e combinados para quem tiver dificuldade.</li>'
        '<li>Disciplina e conduta moral, também nas redes sociais.</li><li>Nada de abuso de álcool nem drogas ilícitas.</li>'
        '<li>Respeito à hierarquia espiritual e humana.</li><li>Cuidado pessoal: preceitos, banhos e saúde em dia.</li></ul></div></div>'
        '%s' % pull('Quando o médium falta à gira, desfalca a caridade.', 'Pai Fernando de Ogum'))
    out += chapter('caminhada', 'O começo da caminhada', 'Cada fase tem seu tempo.',
        '<div class="prose"><p>No começo tudo é novidade: a vibração parece mais forte, a primeira incorporação de cada linha fascina. Essas vivências são um tesouro e merecem atenção. Mas não há plano de carreira na Umbanda. Cambone não é estagiário e médium de toco não é o topo. Cada fase tem seu tempo, e esse tempo é dado pela espiritualidade.</p>'
        '%s<p>Na CUCA, o desenvolvimento mediúnico anda junto com o desenvolvimento da pessoa. Quanto mais o médium conhece de si e do mundo, melhor serve aos guias: cavalo e cavaleiro trabalham juntos.</p>%s</div>'
        % (pull('Cavalo alisado é cavalo estragado.', 'Pai Fernando de Ogum'),
           pull('Tão importante é saber como entrar ou ficar, mas um filho digno tem também de saber como sair.', 'Caboclo Akuan')))
    return out


def rituais_conga(H):
    return H['chapter']('conga', 'Em casa', 'O Congá em casa.',
        '<div class="fig-side"><div class="prose"><p>O Congá é o altar sagrado da Umbanda, espaço de firmeza, devoção e concentração. Em casa, ele pode ser montado de forma discreta e respeitosa. Não é lugar de exibição, é lugar de recolhimento e fé.</p>'
        '<p>Uma vez por ano, os itens do Congá pessoal são levados à gira para serem reenergizados, normalmente na última gira do ano.</p></div>%s</div>'
        % H['photo']('conga', 'O Congá da CUCA', 'ratio-32', 'O Congá da casa', sizes='(max-width:860px) 100vw, 40vw')
        + H['tiles']([('Discrição', 'Imagens pequenas, sem ostentação.'), ('Pureza simbólica', 'Não misture com imagens de outras tradições.'),
                      ('Local adequado', 'Limpo, reservado e com pouca circulação de pessoas.'), ('Luz e natureza', 'Prefira luz natural. Pedras e minerais devem ser recarregados ao sol.'),
                      ('Consagração', 'As imagens são cruzadas pela entidade dirigente da casa.')]))


def rituais_preceito_extra(H):
    return ('<div class="prose" style="margin-top:1.6em"><h3>Por que o preceito existe</h3><p>O preceito não é repressão, é responsabilidade espiritual. Ele mantém a energia limpa e estável, facilita a sintonia com os guias e protege o médium de interferências e desgastes. Nos dias de gira, a casa também pede resguardo nas relações sexuais, porque elas mexem intensamente com a energia vital, e cuidado com açúcar em excesso e energéticos, que geram picos e quedas de energia.</p></div>')


def rituais_vela_extra(H):
    return H['tiles']([('A responsabilidade do portal', 'Nunca pragueje diante de uma vela acesa: o portal não escolhe intenções, só conduz energias. Mantenha a prece, o silêncio ou o pensamento positivo.'),
                       ('No dia a dia', 'Acenda regularmente, não só em dia de gira, pedindo luz, proteção e equilíbrio ao Anjo da Guarda, que é o nosso próprio espírito.'),
                       ('Vela de 7 dias', 'Só com autorização prévia do espírito dirigente da gira.'),
                       ('Base segura', 'Use base de cerâmica ou domo de vidro, longe de madeira e de itens inflamáveis. Troque a água quando a vela acabar.')])


def rituais_amala_extra(H):
    return ('<div class="prose" style="margin-top:1.6em"><p>Na CUCA, a palavra amalá é usada para qualquer entrega. No Candomblé, amalá é a comida específica de Xangô. Cada elemento reflete a cor, o símbolo e a tradição de quem recebe: Iemanjá recebe manjar de coco, que fala do seu lado materno, e Omulu recebe pipoca, o deburu da tradição.</p>'
            '<p>As entregas seguem uma lógica de mandala: elementos em círculo, flores e folhas, frutas abertas, velas em número ímpar e um elemento líquido, como água ou cerveja, de preferência num coité, a cuia feita do coco seco.</p></div>'
            + H['tiles']([('Regras do Jardim dos Orixás', 'Não jogar lixo, não tirar plantas, colocar os fósforos usados nos alguidares, não deixar objetos cortantes nos tambores, não tocar nas imagens e não subir na árvore.'),
                          ('Sem intenção não há axé', 'Ao usar o Jardim, faça silêncio e cuide de cada passo: da montagem, da reza e da intenção. Cuide para ser cuidado.')]))


def rituais_banho_full(H):
    e = H['e']
    fases = [
        ('Escolha e colheita', ['Saiba a intenção antes de colher: limpeza, proteção, calma, abertura de caminhos.', 'Colha de manhã. Ervas femininas, de natureza lunar, se colhem à noite; as masculinas, solares, de dia.', 'Peça licença à natureza e ao Orixá da erva.', 'Use tesoura ou faca limpa, colha só o necessário e agradeça.']),
        ('Preparo', ['Lave as folhas em água corrente.', 'Maceração, a mais indicada para erva fresca: esmague as folhas com as mãos em água fria, depois junte água quente e coe.', 'Infusão, para erva seca: aqueça a água quase até ferver e deixe as ervas descansarem nela.', 'Prepare em silêncio ou em prece, com vela branca, num recipiente só para isso, nunca uma panela da cozinha.']),
        ('Ambiente', ['Lugar calmo, sem telefone e sem conversa: é um momento íntimo.', 'Mente tranquila, sem reclamação.', 'Descalço, quando possível.']),
        ('Aplicação', ['Primeiro o banho de higiene.', 'Depois despeje o banho de ervas do pescoço para baixo. Na cabeça, só com orientação da casa ou da entidade.', 'Despeje devagar, mentalizando o propósito, em oração, silêncio ou canto.']),
        ('Depois do banho', ['Deixe o corpo secar naturalmente, sem toalha, se possível.', 'Fique alguns minutos em recolhimento.', 'Devolva as folhas à natureza (jardim, pé de árvore), não ao lixo comum.', 'Termine com uma oração de agradecimento.']),
    ]
    return '<div class="faq" style="margin-top:1.6em">%s</div>' % ''.join(
        '<details><summary>%s</summary><div class="ans"><ul class="dash">%s</ul></div></details>' % (e(t), ''.join('<li>%s</li>' % e(x) for x in xs)) for t, xs in fases)


def curimba(H):
    return ('<section class="section light" id="curimba" aria-labelledby="h-curimba"><div class="wrap"><div class="grid-2 top">'
            '<div class="reveal"><span class="mono" style="color:var(--accent)">Atabaque, engoma e curimba</span><h2 id="h-curimba" style="margin-top:.4em">O coração da gira.</h2>'
            '<p class="lede">Se o toco da entidade dirigente é o cérebro da gira, o atabaque é o seu coração.</p>%s</div>'
            '<div class="prose reveal">'
            '<p>De origem árabe, espalhado pela África e trazido ao Brasil, o atabaque se enraizou nas religiões afro-brasileiras. Nos ritos aparece em trio: o <strong>Rum</strong>, maior e grave, coordena a base e o tempo; o <strong>Lé</strong>, menor e agudo, cria variações e repiques; o <strong>Rumpi</strong>, médio, une os dois. Juntos formam a <strong>engoma</strong>. Com o coro de vozes, fazem a <strong>curimba</strong>.</p>'
            '<p>Na tradição, cada tambor se liga a um arquétipo: Rum a Ogum, Rumpi a Xangô e Lé a Oxóssi. Cada toque é energia ordenada que bombeia força vital para o terreiro.</p>'
            '<p>Canto e tambor caminham juntos. O ponto cantado é oração: chama, louva, descarrega, cura e ensina. O Samba é o médium que conduz os pontos e mantém a corrente firme. Na gira não se busca performance, e sim entrega: fé, vontade e sinceridade.</p>'
            '<p>Tocar também é resistência. Por séculos os tambores foram perseguidos e silenciados, e nunca deixaram de ecoar.</p>'
            '%s</div></div></div></section>'
            % (H['photo']('joao-caetano', 'João Caetano, Ogã Chefe, tocando o atabaque', 'ratio-45', 'João Caetano, Ogã Chefe', sizes='(max-width:860px) 100vw, 45vw'),
               H['pull']('O Ogã é o guardião do atabaque, servo do couro sagrado e da ancestralidade africana e indígena.', 'Guia do Médium')))


def agenda_page(H, g):
    e = H['e']
    hero = H['page_hero']('Vivência', 'Agenda', 'Giras, festas, cursos e datas especiais da casa, direto da agenda da CUCA.',
                          'adejas', 'Médiuns de branco durante a gira', pos='50% 50%')
    body = ('<section class="section light"><div class="wrap">'
            '<div class="grid-2 top"><div class="reveal"><h2>Toda segunda tem gira.</h2>'
            '<div class="weekly"><b>19h30</b><span>Segunda-feira · gira aberta e gratuita</span><small>Senhas a partir das 19h. Av. Prefeito Maurício Fruet, 1230 · Jardim Botânico</small></div></div>'
            '<div class="reveal"><p class="lede">As outras datas (festas, giras especiais, amacis, cursos e avisos) aparecem abaixo e são atualizadas pela própria casa na Google Agenda.</p>'
            '<div class="actions" style="margin-top:1.4em"><a class="btn btn-primary" href="%(add)s" target="_blank" rel="noopener">Adicionar à minha Google Agenda</a>'
            '<a class="btn btn-ghost" href="%(ics)s">Assinar no celular (iCal)</a></div></div></div>'
            '<div class="cal-switch" data-frame="cal" role="group" aria-label="Visualização da agenda">'
            '<button type="button" aria-pressed="true" data-src="%(mes)s">Mês</button><button type="button" aria-pressed="false" data-src="%(lista)s" data-mobile>Lista</button></div>'
            '<iframe id="cal" class="cal-frame reveal" src="%(mes)s" title="Agenda da CUCA" loading="lazy"></iframe>'
            '<p style="margin-top:1em;color:var(--ink-secondary);font-size:.92rem">Não conseguiu ver a agenda? <a href="%(open)s" target="_blank" rel="noopener">Abra direto no Google Agenda</a>.</p>'
            '</div></section>') % {'add': e(g['CAL_ADD']), 'ics': e(g['CAL_ICS']), 'mes': e(g['AGENDA_MES']), 'lista': e(g['AGENDA']), 'open': e(g['AGENDA_MES'])}
    H['write']('agenda.html', 'Agenda · CUCA', 'Agenda da Casa de Umbanda Corrente de Akuan: gira toda segunda às 19h30, festas, giras especiais e eventos.',
               hero + body + H['invite'](), 'adejas')
