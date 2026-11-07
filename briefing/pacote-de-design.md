# Pacote de Design: site da CUCA

Versão 2: abertura com vídeo real da casa (decisão do cliente).
Fontes: Guia do Médium (Pai João Lucas de Ogum, 2025), entrevista com o dirigente, acervo de fotos do Drive (FOTOS CUCA) e pesquisa sobre quem vai a um terreiro pela primeira vez.

Regra deste documento: todo texto entre aspas vai para o site exatamente como está escrito.

---

## 0. Produtor: escopo, custo e decisões

| Item | Decisão |
|---|---|
| Abertura | **Vídeo real da casa** (pasta Header): a curimba tocando e a gira no salão, 15 s, em loop, sem som, com o texto de boas-vindas por cima. Decisão do cliente: substitui o vídeo gerado por IA |
| Vídeo gerado | Cancelado. Nenhum crédito gasto em vídeo (saldo segue 40,5). O quadro inicial v3 fica arquivado |
| Tratamento | Original em 4K HDR (Dolby Vision) convertido para cor padrão da web, com entrada e saída suaves para o loop não dar pulo. Arquivos: 1080p (cerca de 5 MB) e 720p para telas pequenas (cerca de 3,4 MB), mais um pôster |
| Imagens de apoio | Nenhuma gerada. As seções usam **fotos reais** da casa (autorizadas) |
| Celular | O vídeo de 720p também roda no celular. Com economia de dados ou movimento reduzido, fica só o pôster |
| Rostos | O vídeo é da própria casa, com a corrente e a curimba autorizadas pelo dirigente |
| Dirigente | Quase invisível: aparece só pelo nome, na linhagem |
| Formulário | Nenhum. A ação final é o WhatsApp com mensagem pronta |

**Estrutura definida pelo cliente:** o site segue a arquitetura do protótipo feito no AI Studio a partir do Guia do Médium. São 9 páginas em 4 grupos de menu (mapa completo na seção 6A). Isso substitui a ideia anterior de "site enxuto + área da corrente".

**Desvio declarado da skill (avisado ao cliente):** a skill pede uma página única. Aqui serão 9 páginas estáticas em HTML, CSS e JavaScript puros, sem framework e sem build. A abertura com vídeo fica só no Início. Em vez do vídeo que avança com a rolagem, a abertura usa o vídeo real em loop, a pedido do cliente. As páginas internas usam o mesmo sistema visual, com aberturas de foto real.

**Painel simples de edição:** sem servidor e sem build, a edição pelo próprio pessoal da casa funciona assim:
- **Agenda:** uma Google Agenda da CUCA, mostrada no site automaticamente.
- **Avisos:** uma Planilha Google com avisos curtos (gira cancelada, festa, campanha), lida pelo site.

Quem sabe usar o Google Agenda e uma planilha já sabe editar o site.

---

## 1. A premissa da marca

**A ideia: CORRENTE.**

O nome foi pedido pelo próprio Caboclo Akuan: **Casa** e **Corrente**.
- **Casa** é lugar de descanso e resguardo: "Somos lar antes de sermos templo".
- **Corrente** é feita de elos, e quanto melhor cada elo, mais forte ela fica. É a "corrente de ferro e de aço".

O site ensina isso a quem nunca foi a um terreiro. A CUCA acolhe como uma casa e se organiza como uma corrente: disciplina com amor. Cada seção é um elo, numerada como tal, e a página inteira é uma corrente que leva a uma única ação: **vir na segunda-feira**.

A frase que fecha a abertura é do próprio Caboclo Akuan, tirada do manual:

> "Uma corrente que una a disciplina com o amor será, verdadeiramente, uma corrente de aço."

---

## 2. A paleta (tokens CSS)

Tirada do mundo real das fotos:
- o céu anil do entardecer de Curitiba;
- o barro do telhado;
- a madeira do salão;
- o algodão branco das roupas;
- o vinho da marca CUCA;
- o verde da Aroeira.

**Desvio declarado:** fundo escuro com luz quente é um visual que a skill evita por ser clichê de IA. Aqui ele é o próprio mundo do assunto, uma gira à noite em salão de madeira. Para não cair no clichê, o acento é **vinho**, não âmbar, e as seções claras são de algodão, não creme.

```css
:root{
  --canvas:#150D10;        /* noite do salão, tingida de vinho; nunca preto puro */
  --canvas-light:#F1EEE8;  /* algodão das roupas de gira; seções de leitura */
  --panel:#22171A;         /* cartões sobre o escuro */
  --panel-light:#E6E1D8;   /* cartões sobre o claro */
  --accent:#8E1B26;        /* vinho CUCA: só no botão principal, foco e 1 ou 2 ênfases */
  --accent-hover:#A82432;
  --accent-muted:#5A2A2E;  /* elos, bordas e brilhos em nível de sussurro */
  --aroeira:#6E7A45;       /* verde da Aroeira: detalhes da linhagem e das ervas */
  --anil:#2A3150;          /* céu do entardecer: só no início da abertura */
  --text-primary:#F1EEE8;  /* sobre o escuro */
  --text-secondary:#B9ADA6;
  --ink:#241A17;           /* texto sobre o algodão */
  --ink-secondary:#5E524C;
}
```

Os contrastes serão medidos na construção, sem chute. Metas: 4,5:1 para o corpo do texto e 3:1 para textos grandes.

---

## 3. As fontes

| Papel | Fonte | Pesos | Por quê |
|---|---|---|---|
| Títulos | **Big Shoulders Display** | 600, 800 | Condensada, firme, quase forjada: "corrente de aço". Organização e força |
| Texto | **Literata** | 400, 400 itálico, 600 | Serifa de leitura longa, serena: a voz do professor |
| Rótulos | **IBM Plex Mono** | 400, 500 | Números dos elos, horários, endereço |

A logo oficial da CUCA continua como está, nas versões clara e escura.

---

## 4. A abertura: vídeo da curimba com boas-vindas

**Vídeo:** gravação real da casa. Começa na curimba (atabaques com laço vermelho, cantores ao microfone) e abre para o salão com a corrente de branco girando. 15 s, em loop, mudo, sempre por baixo do texto.

**Comportamento:**
- Toca sozinho, sem som, em loop (`autoplay muted loop playsinline`). Primeiro aparece o pôster, depois o vídeo entra com um esmaecimento curto.
- Telas até 900 px de largura recebem a versão de 720p.
- Movimento reduzido ou economia de dados: só o pôster, sem vídeo.
- A página funciona completa sem o vídeo.

**Legibilidade:** o vídeo é claro e cheio de detalhes. O texto fica no terço inferior esquerdo, sobre uma sombra em degradê da cor `--canvas` (de baixo para cima e da esquerda para a direita), mais uma leve sombra no próprio texto. Auditoria de contraste no quadro mais claro do vídeo, mínimo 4,5:1 no texto corrido.

**Texto sobre o vídeo (exato):**
- Rótulo: "Curitiba · Jardim Botânico"
- Título: "Boas-vindas à Casa de Umbanda Corrente de Akuan."
- Frase: "Somos lar antes de sermos templo."
- Linha: "Gira aberta e gratuita toda segunda, às 19h30. Senhas a partir das 19h."
- Botões: "Como é a primeira vez" e "Falar no WhatsApp"

**Entrada:** o texto sobe palavra por palavra em três chegadas (rótulo, título, frase e botões), no ritmo do atabaque. Com movimento reduzido, aparece já assentado.

**Logo após a abertura:** uma faixa curta com a citação "Uma corrente que una a disciplina com o amor será, verdadeiramente, uma corrente de aço." e a assinatura "Caboclo Akuan".

---

## 5. Abertura estática (movimento reduzido e economia de dados)

O mesmo texto da seção 4, sobre o pôster (quadro da curimba aos 4,5 s).

---

## 6A. Mapa do site (estrutura do protótipo AI Studio)

| Menu | Página | Arquivo | Seções (do protótipo, conteúdo do Guia do Médium) |
|---|---|---|---|
| Início | Início | `index.html` | abertura com vídeo, faixa de horário e endereço, elos 01 a 08 abaixo |
| A Casa | História e Linha do Tempo | `historia.html` | linha do tempo (1987 a 2025), Raízes e Pai Fernando, Caminho de Forja, A Promessa Espiritual, O Milagre da Aroeira, Convite ao Caboclo Akuan |
| A Casa | Guias Dirigentes | `guias.html` | Caboclo Akuan e os mentores da casa, busca e filtro, página de cada guia (raízes, o encontro, identidade, ensinamento) |
| Fundamentos | Orixás e Linhas | `orixas.html` | Orixá e guia (a diferença), busca e filtro, os 9 Orixás, as linhas de trabalho (direita, neutras, esquerda tratada com cuidado), ficha de cada um |
| Fundamentos | Rituais e Preceitos | `rituais.html` | visão geral, O Preceito, A Vela e a Oração, O Amalá, O Banho de Ervas |
| Fundamentos | Ervas Sagradas | `ervas.html` | como funcionam, busca e intenção, Ar, Fogo, Terra e Água, ficha de cada erva com foto |
| Vivência | Primeira Vez? | `primeira-vez.html` | passo a passo da visita, frentes de atendimento (passe, descarrego, cura, consulta), Quem cuida da casa (a hierarquia, com foto, nome e cargo, como referência para quem visita), orientações de ouro, o que não fazemos |
| Vivência | Quero Ser Médium | `medium.html` | mediunidade como autodescobrimento, os passos de ingresso, dicas de ouro, pilares e deveres, tipos de médiuns |
| Vivência | Documentos e Pontos | `documentos.html` | Guia do Médium, Livro de Pontos Cantados, Ritual de Abertura (leitura e download) |
| A Casa | Projeto Social Comida de Santo | a definir | reservado: fotos e texto chegam do dirigente |
| Botão fixo | Visitar / Contato | âncora `index.html#venha` | endereço, horário, mapa, WhatsApp, agenda, PIX |

Regras comuns a todas as páginas internas:
- Abertura com uma foto real da casa, título, uma frase de síntese e o rótulo do grupo.
- Índice flutuante de capítulos nas páginas longas (História, Rituais, Ervas, Primeira Vez, Médium), como no protótipo.
- No fim de toda página, o mesmo convite: "Te esperamos na segunda." e o botão "Falar no WhatsApp".
- A busca geral do protótipo continua, agora como lista estática pesquisável, sem servidor.
- O texto de cada página vem do protótipo, revisado contra o Guia do Médium e passado pela regra de texto da seção 9.
- O formulário de contato do protótipo sai. Ele não enviava mensagens para lugar nenhum. Entra o WhatsApp.

## 6B. Mapa de imagens (fotos reais, pasta do Drive organizada por tema)

Fonte: ensaio fotográfico da casa, amalás, ilustrações dos guias e acervo histórico. Cópias de trabalho em 2800 px. Toda pessoa da Hierarquia autorizou foto, nome e cargo (confirmado pelo dirigente). Consulentes nunca aparecem de rosto: corte ou desfoque. Placas de carro sempre desfocadas.

| Lugar | Foto |
|---|---|
| Início · Elo 01 Nossa Umbanda | Adejás na gira |
| Início · abertura | vídeo Header página (curimba e gira) |
| Início · Elo 02 Sua primeira vez | só o Congá (pasta Estrutura) |
| Início · Elo 04 atabaque | Mariane, Ogã |
| Início · Elo 04 corrente | Hierarquia (foto do grupo) |
| Início · Elo 04 guardiões | Amalá da Linha de Exus e Pombagiras |
| Início · Elo 05 1987 | Pai Fernando no início do Terreiro Pai Maneco |
| Início · Elo 05 2009 | Amaci de Pai João Lucas |
| Início · Elo 05 2017 | FALTA foto do Filhos do Sol (usa ícone) |
| Início · Elo 05 2022 | Cruzamento de Pai de Santo |
| Início · Elo 05 2025 | Inauguração da sede (sem a faixa de texto da imagem) |
| Início · Elo 08 Venha | Placa de Fachada ao entardecer |
| Capa · História | Cruzamento de Pai de Santo (roda de branco, horizontal) |
| História · capítulos | Pai Fernando, Amaci, Aroeira da CUCA na sede, Inauguração |
| Capa · Guias Dirigentes | Caboclo Akuan (ilustração provisória) |
| Guias · fichas | 13 ilustrações: Akuan, Itacoaratira, Urubatão da Guia, Pai Joaquim de Angola, Pai Anacleto, Vó Anastácia, Boiadeiro Antônio Matogrosso, Cigano Ramon, Erê Juninho, Exu Tranca Ruas das Almas, Maria Padilha das Almas, Ogã Kaian |
| Capa · Orixás e Linhas | Amalá de Oxalá (horizontal, branco) |
| Orixás · fichas | um amalá por Orixá: Oxalá, Ogum, Oxóssi, Xangô, Yansã, Oxum, Yemanjá, Nanã, Omulu |
| Orixás · linhas | amalás de Erê, Pretos-Velhos, Povo Cigano, Exus e Pombagiras |
| Capa · Rituais e Preceitos | Tambores para entregas (Jardim dos Orixás com oratórios) |
| Rituais · Banho de Ervas | Banho de Ervas |
| Capa · Ervas Sagradas | Axé com as Folhas |
| Ervas · fichas | imagens do Manual Herbal da CUCA (26 imagens no arquivo) |
| Capa · Primeira Vez | Fachada da Casa |
| Primeira Vez · frentes | Passe Fluídico, Descarrego, Cura, Consulta |
| Primeira Vez · Quem cuida da casa | abre com Hierarquia (grupo); fichas: João Lucas, Hismara (Mãe de Santo), Patrícia (Mãe Pequena), João Caetano (Ogã Chefe), Raphael (Samba Chefe), Mariane (Ogã), Ana Paula, Elis e Emily (Capitãs), Daniel, Matheus e Miguel (Capitães) |
| Capa · Quero Ser Médium | Corrente |
| Capa · Documentos e Pontos | Raphael, Samba Chefe, cantando |
| Projeto Social | aguardando fotos e texto |

Quase todas as fotos são verticais. Nas capas internas a composição é dividida no computador (texto de um lado, foto vertical inteira do outro) e a foto ocupa a tela toda no celular, com o texto embaixo.

## 6. O Início, abaixo da abertura

Cada seção é um elo numerado. Uma linha de corrente desenhada liga os elos enquanto a pessoa rola.

### Elo 01 · Nossa Umbanda (fundo algodão)

Título: "Umbanda pés no chão."

Texto: "Assim Pai Fernando de Ogum chamou o jeito de fazer Umbanda que herdamos: simples e sem mistificações, onde prevaleça o respeito mútuo, a caridade e o amor fraterno."

Cinco princípios, em cartões curtos:
- "Acesso universal" · "Consultas e passes gratuitos, para todas as pessoas."
- "Estudo" · "Cursos, apostilas e rodas de leitura para médiuns e visitantes."
- "Rigor ético" · "Transparência, respeito e combate à intolerância religiosa."
- "Cultura e família" · "Eventos que aproximam gerações e desfazem preconceitos."
- "Menos é mais" · "Ritos simples, discrição e eficácia."

Fecho: "Umbanda simples, eficaz e profunda: fiel aos cantos dos antigos e corajosa para dialogar com o mundo de hoje."

### Elo 02 · Sua primeira vez (fundo escuro) · aqui vive o momento interativo

Título: "Nunca foi a um terreiro? Comece por aqui."

Abertura: "É normal chegar com dúvida, ou até com um pouco de medo. Na CUCA tudo tem ordem, e alguém da casa vai te orientar desde o portão."

Ao lado dos passos, uma única foto: o Congá (pasta Estrutura). Os passos ficam só em texto:
1. "Chegue às 19h." · "As senhas são distribuídas por ordem de chegada. A gira começa às 19h30."
2. "Peça licença na entrada." · "À esquerda do portão fica a Tronqueira, a casinha dos guardiões da casa. Quem recebe você mostra como saudar."
3. "Tire os calçados." · "Ao entrar no salão, deixamos o mundo lá fora. Celular no silencioso."
4. "Acompanhe a abertura." · "Os pontos cantados e o atabaque abrem a gira. Você assiste sentado, em silêncio."
5. "Receba o atendimento." · "Quando sua senha for chamada, você recebe passe ou consulta com uma entidade. Uma consulta por gira."
6. "Agradeça e siga em paz." · "Ao sair, agradeça ao Congá. Se receber orientação de banho ou prece, siga com calma."

O que vestir: "Roupa limpa e discreta, de qualquer cor. Evite perfume forte e bebida alcoólica no dia."

Se sentir algo forte: "Choro, arrepio ou emoção forte acontecem. Avise com discrição alguém da casa. Você não fica sozinho."

**Momento interativo:** "Segure para formar a corrente". A pessoa segura um botão e, enquanto segura, elos se unem um a um até fechar uma roda. Se soltar antes, a roda se desfaz devagar. Quando fecha, aparece: "Você também é um elo. Te esperamos na segunda."

### Elo 03 · O que não fazemos (fundo algodão)

Título: "Para você vir tranquilo."

- "Não cobramos trabalhos espirituais." · "Todo auxílio mediúnico é caridade."
- "Não fazemos previsões de futuro nem diagnósticos de doenças." · "Os guias orientam e fortalecem. Não substituem médicos."
- "Não fazemos amarrações nem trabalhos para prejudicar alguém." · "Trabalhamos para o equilíbrio, a cura e o progresso de todos."
- "Não alimentamos vaidades nem disputas." · "Não comparamos casas, médiuns ou entidades."

Linha final: "Não distinguimos cor, etnia, trajetória espiritual, orientação sexual ou gênero. Respeitamos quem nos respeita."

### Elo 04 · A gira por dentro (fundo escuro, fotos reais grandes)

Título: "O coração da gira."

Três quadros:
- O atabaque: "Se a entidade dirigente é o cérebro da gira, o atabaque é o coração. Cada canto é uma oração."
- A corrente: "Médiuns de branco, cada um em sua função: incorporação, passe, sustentação, cambonos, curimba."
- Os guardiões: "Exus e Pombagiras guardam a casa. Por isso, ao chegar, pedimos licença na Tronqueira."

### Elo 05 · Raízes (fundo algodão, linha do tempo em forma de corrente)

Título: "Uma corrente de três gerações."

- "1987" · "Pai Fernando de Ogum abre a primeira gira do Terreiro do Pai Maneco, em Curitiba."
- "2009" · "Pai Léo de Oxóssi é consagrado Pai de Santo. A família firma o elo com a Umbanda."
- "2017" · "Nasce o Terreiro Filhos do Sol, pelo chamado do Caboclo Tupinambá."
- "2022" · "Pai João Lucas de Ogum recebe o cruzamento de Pai de Santo."
- "2025" · "Nasce a CUCA: Casa de Umbanda Corrente de Akuan."

### Elo 06 · Perguntas (fundo escuro)

- "Precisa pagar?" · "Não. Passes e consultas são gratuitos. Se quiser ajudar a manter a casa, existe o PIX, sempre voluntário."
- "Preciso ser umbandista?" · "Não. A porta é aberta a todas as pessoas, de qualquer crença."
- "Posso levar criança?" · "Pode, sempre acompanhada de um responsável e em silêncio respeitoso."
- "Posso filmar ou fotografar?" · "Não, sem autorização da casa. O que acontece na gira é sagrado e confidencial."
- "Tenho prioridade?" · "Pessoas idosas, gestantes e pessoas com condição especial têm prioridade. Avise na chegada."
- "Tem estacionamento?" · "Tem, no local, por R$ 12,00. Estacione onde a equipe indicar."
- "Quero entrar para a corrente. Como faço?" · "O caminho começa como consulente. Veja a página Quero Ser Médium."

### Elo 07 · Conheça a casa (fundo algodão, acesso rápido às páginas)

Título: "Para estudar e conhecer a fundo."

Oito cartões com foto real, um por página: História, Guias Dirigentes, Orixás e Linhas, Rituais e Preceitos, Ervas Sagradas, Primeira Vez?, Quero Ser Médium, Documentos e Pontos. Cada um com a frase de síntese da página.

Ao lado: os momentos recentes do Instagram @cuca_terreirodeumbanda, como no protótipo.

### Elo 08 · Venha (fundo escuro, chamada final)

Título: "Te esperamos na segunda."

Linhas:
- "Gira aberta toda segunda-feira, às 19h30."
- "Senhas a partir das 19h."
- "Av. Prefeito Maurício Fruet, 1230 · Jardim Botânico · Curitiba"

Botões:
- principal: "Falar no WhatsApp" (abre conversa com o número (41) 99717-6648 e a mensagem pronta "Olá! Quero ir à gira da CUCA pela primeira vez.")
- secundário: "Abrir no mapa"

Agenda: próximos eventos, lidos da Google Agenda da CUCA.

Apoie a casa: "A CUCA se mantém com a ajuda de quem acredita nela." · chave PIX "correntedeakuan@gmail.com" com botão "Copiar chave".

### Rodapé

"CUCA · Casa de Umbanda Corrente de Akuan · Curitiba, PR" · Instagram @cuca_terreirodeumbanda · links para as 9 páginas, organizados nos 4 grupos do menu.

---

## 7. Camada de desenho (SVG feito à mão)

- **Elemento assinatura: a corrente.** Uma linha de elos desenhada à mão desce pela lateral da página e se traça sozinha conforme a rolagem. No Início, cada seção começa num elo numerado (01 a 08). No final, os elos fecham uma roda, a mesma forma da gira vista de cima no vídeo.
- **Folhas de Aroeira** em traço fino, como divisórias raras.
- **Ambiente de fundo:** grão de papel e uma fumaça de defumação muito lenta (ciclo de 60 s ou mais) nas seções escuras.
- Nada de pontos riscados desenhados: são fundamento da casa.
- Com movimento reduzido ligado, tudo aparece já no estado final e as animações param.

---

## 8. Lista de engenharia (da skill, completa)

- Vídeo baixado como Blob, com anel de carregamento.
- Interpolação suave normalizada por tempo de quadro.
- Seeks travados.
- Escritas no DOM só quando algo muda.
- Faixas medidas em distância de rolagem, validadas pelo teste de flick.
- Legibilidade em quatro camadas, com auditoria do pior quadro (contraste de 3,5:1 ou mais).
- Cinco portões da abertura estática, vivos (mudam ao girar o aparelho).
- Página completa mesmo sem o vídeo.
- Piso de qualidade: acessibilidade, foco, alvos de toque de 44 px, meta tags, favicon e og tags no passo de publicação.
- Animação em toda a página, sem exagero.

---

## 9. Regra do texto

Todo texto acima vai para o site exatamente como está. A página construída precisa passar a revisão de texto da skill antes de alguém ver:
- zero travessões;
- zero palavras de estoque;
- varredura de sinais de texto de IA.

Recursos de estilo deliberados deste pacote ficam. Exemplo: o trio "Casa. Corrente. Caridade.", se aparecer.

---

## Confirmado pelo dirigente

1. Endereço: Av. Prefeito Maurício Fruet, 1230 · Jardim Botânico · Curitiba. Confirmado.
2. Estacionamento: pago, R$ 12,00. Entra no Elo 06 e na página Primeira Vez.
3. Chave PIX: correntedeakuan@gmail.com. Confirmado.
4. Os rituais ficam abertos e disponíveis ao público: preceito, vela e oração, amalás e entregas (incluindo as listas por Orixá e por linha), banho de ervas e Jardim dos Orixás entram na página Rituais e Preceitos. Continua fora do site só o que o próprio manual protege: o conteúdo das consultas, a identidade de quem foi atendido e fotos ou vídeos da gira sem autorização da casa.
