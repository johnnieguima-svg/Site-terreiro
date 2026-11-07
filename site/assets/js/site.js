/* CUCA · comportamento do site. JavaScript puro, sem dependências. */
(function(){
  'use strict';
  var doc=document.documentElement;
  doc.classList.remove('no-js');
  var mqReduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  function reduced(){return mqReduce.matches}

  /* ---------- AJUSTES DA CASA ----------
     AVISOS_PLANILHA: link "Publicar na Web" em formato CSV de uma Planilha Google.
     Coluna A: texto do aviso. Coluna B: data final (AAAA-MM-DD), opcional.
     Deixe vazio para não mostrar a faixa de avisos. */
  var AVISOS_PLANILHA='';

  /* ---------- navegação ---------- */
  var nav=document.querySelector('.nav');
  if(nav && !nav.classList.contains('solid')){
    var onScroll=function(){nav.classList.toggle('scrolled',window.scrollY>40)};
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  }
  var drops=[].slice.call(document.querySelectorAll('.menu [data-drop]'));
  function closeDrops(except){drops.forEach(function(b){if(b!==except){b.setAttribute('aria-expanded','false');document.getElementById(b.getAttribute('aria-controls')).classList.remove('open')}})}
  drops.forEach(function(b){
    var panel=document.getElementById(b.getAttribute('aria-controls'));
    b.addEventListener('click',function(e){e.stopPropagation();var open=b.getAttribute('aria-expanded')==='true';closeDrops(b);b.setAttribute('aria-expanded',String(!open));panel.classList.toggle('open',!open)});
  });
  document.addEventListener('click',function(){closeDrops(null)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeDrops(null);closeSearch();closeMenu()}});

  var burger=document.querySelector('.burger'),panelM=document.querySelector('.mobile-panel');
  function closeMenu(){if(!burger)return;burger.setAttribute('aria-expanded','false');panelM.classList.remove('open');document.body.classList.remove('menu-open')}
  if(burger){burger.addEventListener('click',function(){var o=burger.getAttribute('aria-expanded')==='true';burger.setAttribute('aria-expanded',String(!o));panelM.classList.toggle('open',!o);document.body.classList.toggle('menu-open',!o)});
    panelM.addEventListener('click',function(e){if(e.target.closest('a'))closeMenu()});}

  /* ---------- busca ---------- */
  var INDEX=[
    ['Primeira vez na gira','primeira-vez.html','Passo a passo, senha, horário, o que vestir'],
    ['Horário e endereço','index.html#venha','Segunda, 19h30. Av. Prefeito Maurício Fruet, 1230'],
    ['Estacionamento','index.html#perguntas','No local, R$ 12,00'],
    ['PIX e doações','index.html#venha','correntedeakuan@gmail.com'],
    ['WhatsApp','index.html#venha','(41) 99717-6648'],
    ['Passe','primeira-vez.html#frentes','Frentes de atendimento'],
    ['Descarrego','primeira-vez.html#frentes','Frentes de atendimento'],
    ['Cura espiritual','primeira-vez.html#frentes','Frentes de atendimento'],
    ['Consulta no toco','primeira-vez.html#frentes','Frentes de atendimento'],
    ['Quem cuida da casa','primeira-vez.html#hierarquia','Hierarquia da CUCA'],
    ['O que não fazemos','primeira-vez.html#limites','Nossos limites'],
    ['História e linha do tempo','historia.html','1987 a 2025'],
    ['Pai Fernando de Ogum','historia.html#raizes','Terreiro do Pai Maneco'],
    ['O milagre da Aroeira','historia.html#aroeira','A sede no Jardim Botânico'],
    ['Caboclo Akuan','guias.html','Guia chefe da casa'],
    ['Guias dirigentes','guias.html','Caboclos, Pretos Velhos, Erês, Guardiões'],
    ['Orixás','orixas.html','Os 9 Orixás cultuados na CUCA'],
    ['Linhas de trabalho','orixas.html#linhas','As 10 linhas'],
    ['Exus e Pombagiras','orixas.html#linhas','Guardiões da esquerda'],
    ['Preceito','rituais.html#preceito','Antes e depois da gira'],
    ['Vela e oração','rituais.html#vela','Anjo da Guarda'],
    ['Amalá','rituais.html#amala','Oferenda no Jardim dos Orixás'],
    ['Banho de ervas','rituais.html#banho','Como preparar'],
    ['Ervas sagradas','ervas.html','As 16 ervas e os 4 elementos'],
    ['Arruda','ervas.html','Ervas de Fogo'],['Alecrim','ervas.html','Ervas de Ar'],['Guiné','ervas.html','Ervas de Terra'],['Manjericão','ervas.html','Ervas de Água'],
    ['Quero ser médium','medium.html','Os 7 passos de ingresso'],
    ['Amaci','medium.html#passos','Selo de pertencimento'],
    ['Tipos de médiuns','medium.html#funcoes','Toco, passe, transporte, sustentação, cambones, curimba'],
    ['Guia do Médium (PDF)','documentos.html','Leitura e download'],
    ['Pontos cantados','documentos.html','Livro de pontos'],
    ['Ritual de abertura','documentos.html','Leitura e download']
  ];
  var search=document.querySelector('.search'),sInput,sList;
  function norm(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
  function renderSearch(q){
    var n=norm(q.trim()),hits=INDEX.filter(function(r){return !n||norm(r[0]+' '+r[2]).indexOf(n)>-1}).slice(0,10);
    sList.innerHTML=hits.length?hits.map(function(r){return '<li><a href="'+r[1]+'"><b>'+r[0]+'</b><small>'+r[2]+'</small></a></li>'}).join(''):'<li class="search-empty">Nada encontrado. Tente outra palavra.</li>';
  }
  function openSearch(){if(!search)return;search.classList.add('open');renderSearch(sInput.value);setTimeout(function(){sInput.focus()},30)}
  function closeSearch(){if(search&&search.classList.contains('open')){search.classList.remove('open')}}
  if(search){
    sInput=search.querySelector('input');sList=search.querySelector('.search-results');
    sInput.addEventListener('input',function(){renderSearch(sInput.value)});
    search.addEventListener('click',function(e){if(e.target===search)closeSearch()});
    [].forEach.call(document.querySelectorAll('[data-search]'),function(b){b.addEventListener('click',function(e){e.preventDefault();closeMenu();openSearch()})});
    document.addEventListener('keydown',function(e){if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}});
    search.addEventListener('click',function(e){if(e.target.closest('a'))closeSearch()});
  }

  /* ---------- abertura: vídeo da curimba ---------- */
  var hero=document.querySelector('.hero');
  if(hero){
    var media=hero.querySelector('.hero-media'),video=null;
    var conn=navigator.connection||{};
    function wantVideo(){return !reduced() && !conn.saveData}
    function mountVideo(){
      if(video||!wantVideo())return;
      var small=window.matchMedia('(max-width: 900px)').matches;
      video=document.createElement('video');
      video.muted=true;video.loop=true;video.playsInline=true;video.setAttribute('playsinline','');video.setAttribute('muted','');
      video.setAttribute('aria-hidden','true');video.preload='auto';
      video.src=small?media.dataset.srcSm:media.dataset.src;
      video.addEventListener('playing',function(){video.classList.add('ready')},{once:true});
      video.addEventListener('error',function(){video.remove();video=null});
      media.appendChild(video);
      var p=video.play(); if(p&&p.catch)p.catch(function(){/* autoplay bloqueado: o pôster fica */});
    }
    function unmountVideo(){if(video){video.pause();video.remove();video=null}}
    if(wantVideo()){if(document.readyState==='complete')mountVideo();else window.addEventListener('load',mountVideo)}
    mqReduce.addEventListener&&mqReduce.addEventListener('change',function(){reduced()?unmountVideo():mountVideo()});
    document.addEventListener('visibilitychange',function(){if(!video)return;document.hidden?video.pause():video.play().catch(function(){})});
    /* entrada do texto em três chegadas */
    var beats=[].slice.call(hero.querySelectorAll('.beat'));
    [].forEach.call(hero.querySelectorAll('[data-words]'),function(el){
      el.innerHTML=el.textContent.trim().split(/\s+/).map(function(w,i){return '<span class="word" style="transition-delay:'+(i*70)+'ms">'+w+'</span>'}).join(' ');
    });
    var delays=[150,700,1500];
    beats.forEach(function(b,i){setTimeout(function(){b.classList.add('arrive');[].forEach.call(b.querySelectorAll('.word'),function(w){w.classList.add('arrive')})},reduced()?0:(delays[i]||1500+i*300))});
  }

  /* ---------- revelar ao rolar ---------- */
  var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08}):null;
  [].forEach.call(document.querySelectorAll('.reveal,.photo,.draw'),function(el){
    if(el.classList.contains('draw'))[].forEach.call(el.querySelectorAll('path'),function(p){try{p.style.setProperty('--len',Math.ceil(p.getTotalLength()))}catch(e){}});
    if(io)io.observe(el);else el.classList.add('in');
  });

  /* ---------- corrente lateral que se traça com a rolagem ---------- */
  var rail=document.querySelector('.chain-rail');
  if(rail){
    var host=rail.parentElement,svg=rail.querySelector('svg'),path;
    function buildRail(){
      var h=host.offsetHeight,d='',y=8;
      /* elos alternados: um de frente (oval), um de perfil (traço) */
      for(;y<h-40;y+=36){d+='M11,'+y+' a6,12 0 1,0 0,24 a6,12 0 1,0 0,-24 ';d+='M11,'+(y+17)+' v26 ';}
      svg.setAttribute('viewBox','0 0 22 '+h);svg.innerHTML='<path d="'+d+'"/>';path=svg.firstChild;
      var len=path.getTotalLength();path.style.strokeDasharray=len;path.style.strokeDashoffset=len;path.dataset.len=len;drawRail();
    }
    function drawRail(){
      if(!path)return;var r=host.getBoundingClientRect(),vh=window.innerHeight;
      var p=Math.min(1,Math.max(0,(vh*0.7-r.top)/r.height));
      path.style.strokeDashoffset=reduced()?0:(1-p)*path.dataset.len;
    }
    var raf=0;window.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(function(){raf=0;drawRail()})},{passive:true});
    window.addEventListener('resize',function(){clearTimeout(rail._t);rail._t=setTimeout(buildRail,200)});
    window.addEventListener('load',buildRail);
  }

  /* ---------- momento interativo: segure para formar a corrente ---------- */
  var hold=document.querySelector('.hold');
  if(hold){
    var ring=hold.querySelector('.hold-ring'),btn=hold.querySelector('.hold-btn'),msg=hold.querySelector('.hold-msg');
    var N=12,R=56,links='';
    for(var i=0;i<N;i++){var a=i/N*360;links+='<ellipse class="lk" cx="75" cy="'+(75-R)+'" rx="9" ry="14" transform="rotate('+a+' 75 75) rotate(90 75 '+(75-R)+')"/>'}
    ring.innerHTML=links;
    var els=[].slice.call(ring.querySelectorAll('.lk')),lit=0,timer=null,decay=null,done=false;
    var idle=msg.textContent;
    function paint(){els.forEach(function(e,i){e.classList.toggle('on',i<lit)})}
    function finish(){done=true;clearInterval(timer);hold.classList.add('done');ring.classList.add('done');msg.textContent=hold.dataset.done;btn.textContent='A corrente está formada';btn.disabled=true}
    function start(e){if(done)return;if(e)e.preventDefault();clearInterval(decay);clearInterval(timer);msg.textContent='Continue segurando…';
      timer=setInterval(function(){lit++;paint();if(lit>=N)finish()},reduced()?60:160)}
    function stop(){if(done)return;clearInterval(timer);if(lit>0)msg.textContent='A roda se desfez. Segure até o fim.';
      decay=setInterval(function(){lit--;paint();if(lit<=0){clearInterval(decay);lit=0;msg.textContent=idle}},120)}
    btn.addEventListener('pointerdown',start);
    ['pointerup','pointerleave','pointercancel'].forEach(function(t){btn.addEventListener(t,stop)});
    btn.addEventListener('keydown',function(e){if((e.key===' '||e.key==='Enter')&&!e.repeat)start(e)});
    btn.addEventListener('keyup',function(e){if(e.key===' '||e.key==='Enter')stop()});
    btn.addEventListener('contextmenu',function(e){e.preventDefault()});
  }

  /* ---------- copiar chave PIX ---------- */
  [].forEach.call(document.querySelectorAll('[data-copy]'),function(b){
    b.addEventListener('click',function(){
      var v=b.getAttribute('data-copy'),out=document.getElementById(b.getAttribute('aria-describedby'));
      function ok(){if(out)out.textContent='Chave copiada.'}
      if(navigator.clipboard)navigator.clipboard.writeText(v).then(ok,function(){fallback()});else fallback();
      function fallback(){var t=document.createElement('textarea');t.value=v;document.body.appendChild(t);t.select();try{document.execCommand('copy');ok()}catch(e){if(out)out.textContent='Copie a chave acima.'}t.remove()}
    });
  });

  /* ---------- filtros e busca das fichas ---------- */
  [].forEach.call(document.querySelectorAll('[data-filter-group]'),function(group){
    var target=document.getElementById(group.getAttribute('data-filter-group'));
    var items=[].slice.call(target.querySelectorAll('[data-cat]'));
    var chips=[].slice.call(group.querySelectorAll('.chip'));
    var input=group.querySelector('input'),empty=group.parentElement.querySelector('.no-results'),cat='all';
    function apply(){var q=input?norm(input.value.trim()):'',n=0;
      items.forEach(function(it){var okc=cat==='all'||it.dataset.cat.split(' ').indexOf(cat)>-1;var okq=!q||norm(it.textContent).indexOf(q)>-1;it.hidden=!(okc&&okq);if(!it.hidden)n++});
      if(empty)empty.hidden=n>0;}
    chips.forEach(function(c){c.addEventListener('click',function(){chips.forEach(function(x){x.setAttribute('aria-pressed','false')});c.setAttribute('aria-pressed','true');cat=c.dataset.value;apply()})});
    if(input)input.addEventListener('input',apply);
  });

  /* ---------- índice de capítulos ---------- */
  var idx=document.querySelector('.chapters');
  if(idx&&io){
    var links2=[].slice.call(idx.querySelectorAll('a'));
    var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links2.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-30% 0px -60% 0px'});
    links2.forEach(function(l){var s=document.querySelector(l.getAttribute('href'));if(s)obs.observe(s)});
  }

  /* ---------- faixa de avisos (Planilha Google) ---------- */
  var aviso=document.querySelector('.aviso');
  if(aviso&&AVISOS_PLANILHA){
    fetch(AVISOS_PLANILHA).then(function(r){return r.text()}).then(function(csv){
      var today=new Date().toISOString().slice(0,10);
      var rows=csv.split(/\r?\n/).map(function(l){var m=l.match(/("([^"]|"")*"|[^,]*)(,|$)/g)||[];return m.map(function(c){return c.replace(/,$/,'').replace(/^"|"$/g,'').replace(/""/g,'"').trim()})});
      var live=rows.filter(function(r){return r[0]&&(!r[1]||r[1]>=today)});
      if(live.length){aviso.querySelector('[data-aviso]').textContent=live[0][0];aviso.classList.add('show')}
    }).catch(function(){});
  }
})();
