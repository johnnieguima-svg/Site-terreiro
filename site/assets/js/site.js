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


  /* quebra um texto em palavras animáveis, preservando <strong> e outras marcações */
  function wordify(el,step){
    var i=0,out=document.createDocumentFragment();
    [].slice.call(el.childNodes).forEach(function(n){
      if(n.nodeType===3){n.textContent.split(/(\s+)/).forEach(function(w){
        if(!w)return; if(/^\s+$/.test(w)){out.appendChild(document.createTextNode(' '));return}
        var sp=document.createElement('span');sp.className='word';sp.style.transitionDelay=(i++*step)+'ms';sp.textContent=w;out.appendChild(sp)})}
      else{var sp=document.createElement('span');sp.className='word';sp.style.transitionDelay=(i++*step)+'ms';sp.appendChild(n.cloneNode(true));out.appendChild(sp)}
    });
    el.innerHTML='';el.appendChild(out);
  }

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
    ['Agenda','agenda.html','Giras, festas e eventos da casa'],
    ['Projeto Social Comida de Santo','projeto-social.html','Ações sociais da casa'],
    ['Feijoada de Ogum','projeto-social.html','Cultura e encontros'],
    ['Aulas de Engoma','projeto-social.html','Atabaque e percussão'],
    ['Gira de Leito','agenda.html','Uma sexta-feira por mês'],
    ['Terreiro CECATU','agenda.html','Casa irmã: gira de quarta-feira na CUCA'],
    ['CucaCast','index.html#conheca','O podcast da casa no Spotify'],
    ['Instagram','index.html#conheca','@cuca_terreirodeumbanda'],
    ['Conduta do consulente','primeira-vez.html#conduta','Guia completo para quem visita'],
    ['Congá em casa','rituais.html#conga','Como montar'],
    ['Tiragem do Obi','medium.html#obi','O oráculo do Orixá de cabeça'],
    ['A Umbanda','historia.html#umbanda','Origem e raízes'],
    ['Atabaque e curimba','documentos.html#curimba','Rum, Rumpi e Lé'],
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
    [].forEach.call(hero.querySelectorAll('[data-words]'),function(el){wordify(el,70)});
    var delays=[100,600,1100,1900];
    beats.forEach(function(b,i){setTimeout(function(){b.classList.add('arrive');[].forEach.call(b.querySelectorAll('.word'),function(w){w.classList.add('arrive')})},reduced()?0:(delays[i]||1500+i*300))});
  }

  /* ---------- revelar ao rolar ---------- */
  var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08}):null;
  [].forEach.call(document.querySelectorAll('.reveal,.photo,.draw'),function(el){
    if(el.classList.contains('draw'))[].forEach.call(el.querySelectorAll('path'),function(p){try{p.style.setProperty('--len',Math.ceil(p.getTotalLength()))}catch(e){}});
    if(io)io.observe(el);else el.classList.add('in');
  });

  /* ---------- a corrente de Akuan se formando em câmera lenta ---------- */
  var forge=document.querySelector('.forge-chain');
  if(forge){
    var band=forge.closest('.akuan-band'),N=13,W=1000,rx=46,step=rx*1.42,x0=(W-step*(N-1))/2,d='';
    /* elos entrelaçados: um de frente (oval aberto), o seguinte de perfil (oval achatado e grosso) */
    for(var k=0;k<N;k++){
      var cx=x0+step*k,front=k%2===0;
      d+= front
        ? '<ellipse class="lk" style="--k:'+k+'" cx="'+cx.toFixed(1)+'" cy="50" rx="'+rx+'" ry="24"/>'
        : '<ellipse class="lk side" style="--k:'+k+'" cx="'+cx.toFixed(1)+'" cy="50" rx="'+rx+'" ry="6.5"/>';
    }
    forge.innerHTML=d;
    var q=band.querySelector('[data-slow]');wordify(q,140);
    var start=function(){band.classList.add('play');setTimeout(function(){band.classList.add('quote-in');[].forEach.call(q.querySelectorAll('.word'),function(w){w.classList.add('arrive')})},reduced()?0:N*260+600)};
    if(reduced()||!io){band.classList.add('play','quote-in');[].forEach.call(q.querySelectorAll('.word'),function(w){w.classList.add('arrive')})}
    else{var fo=new IntersectionObserver(function(es){if(es[0].isIntersecting){fo.disconnect();start()}},{threshold:.45});fo.observe(band)}
  }

  /* ---------- linha do tempo viva (História) ---------- */
  var tlive=document.querySelector('.tl-live');
  if(tlive){
    var track=tlive.querySelector('.tl-track'),svgL=tlive.querySelector('.tl-line'),tlRail=svgL.querySelector('.tl-rail'),tlInk=svgL.querySelector('.tl-ink');
    var titems=[].slice.call(tlive.querySelectorAll('.tl-item')),yearEl=tlive.querySelector('.tl-year-num'),barEl=tlive.querySelector('.tl-year-bar');
    var spark=document.createElementNS('http://www.w3.org/2000/svg','circle');spark.setAttribute('r','5');spark.setAttribute('class','tl-spark');svgL.appendChild(spark);
    var L=0,H=0,table=[],nodeY=[],cur='';
    function tlLayout(){
      var w=track.clientWidth;H=track.offsetHeight;var mob=window.matchMedia('(max-width:1000px)').matches;
      var cx=mob?22:w/2,amp=mob?5:26,top=track.getBoundingClientRect().top;
      svgL.setAttribute('viewBox','0 0 '+w+' '+H);
      nodeY=titems.map(function(it){var n=it.querySelector('.tl-node').getBoundingClientRect();return n.top+n.height/2-top});
      var d='M'+cx+',0',py=0,k=0;
      nodeY.concat([H]).forEach(function(y){var my=(py+y)/2,dir=(k++%2?1:-1)*amp;d+=' C'+(cx+dir)+','+(py+(my-py)*.6)+' '+(cx-dir)+','+(y-(y-my)*.6)+' '+cx+','+y;py=y});
      tlRail.setAttribute('d',d);tlInk.setAttribute('d',d);
      L=tlInk.getTotalLength();tlInk.style.strokeDasharray=L;
      table=[];for(var l=0;l<=L;l+=12){table.push([tlInk.getPointAtLength(l).y,l])}
      tlUpdate();
    }
    function lenAt(y){for(var i=0;i<table.length;i++){if(table[i][0]>=y)return table[i][1]}return L}
    function tlUpdate(){
      var r=track.getBoundingClientRect(),head=Math.max(0,Math.min(H,window.innerHeight*.62-r.top));
      if(reduced())head=H;
      var l=lenAt(head);tlInk.style.strokeDashoffset=L-l;
      var p=tlInk.getPointAtLength(l);spark.setAttribute('cx',p.x);spark.setAttribute('cy',p.y);spark.style.opacity=(head>4&&head<H-4)?1:0;
      var act=-1;titems.forEach(function(it,i){var lit=nodeY[i]<=head+2;it.classList.toggle('lit',lit);if(lit)act=i});
      titems.forEach(function(it,i){it.classList.toggle('active',i===act)});
      var y=act>=0?titems[act].dataset.year:titems[0].dataset.year;
      if(y!==cur){cur=y;yearEl.textContent=y;yearEl.classList.remove('roll');void yearEl.offsetWidth;yearEl.classList.add('roll')}
      barEl.style.setProperty('--p',(head/H).toFixed(3));
    }
    var traf=0;window.addEventListener('scroll',function(){if(!traf)traf=requestAnimationFrame(function(){traf=0;tlUpdate()})},{passive:true});
    window.addEventListener('resize',function(){clearTimeout(tlive._t);tlive._t=setTimeout(tlLayout,150)});
    window.addEventListener('load',tlLayout);tlLayout();
    titems.forEach(function(it){
      var btns=[].slice.call(it.querySelectorAll('.tl-node,.tl-toggle'));
      function toggle(){var o=!it.classList.contains('open');it.classList.toggle('open',o);btns.forEach(function(b){b.setAttribute('aria-expanded',String(o))});
        setTimeout(tlLayout,750);
        if(o&&this&&this.classList&&this.classList.contains('tl-node'))it.querySelector('.tl-card').scrollIntoView({behavior:reduced()?'auto':'smooth',block:'center'})}
      btns.forEach(function(b){b.addEventListener('click',toggle)});
    });
  }

  /* ---------- Rituais: as quatro práticas ---------- */
  [].forEach.call(document.querySelectorAll('.praticas'),function(box){
    var tabs=[].slice.call(box.querySelectorAll('.pr-tab'));
    function show(t){tabs.forEach(function(x){var on=x===t;x.classList.toggle('on',on);x.setAttribute('aria-selected',String(on));var p=document.getElementById(x.getAttribute('aria-controls'));p.hidden=!on;p.classList.toggle('on',on)})}
    tabs.forEach(function(t){t.addEventListener('click',function(){show(t)});t.addEventListener('mouseenter',function(){if(window.matchMedia('(hover:hover)').matches)show(t)});t.addEventListener('focus',function(){show(t)})});
  });

  /* ---------- Guias: Caboclo Akuan ---------- */
  var ak=document.querySelector('.akuan-hero');
  if(ak){
    var akImg=ak.querySelector('.ak-figure img');
    if(!reduced()&&window.matchMedia('(hover:hover)').matches){
      ak.addEventListener('mousemove',function(ev){var r=ak.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;
        akImg.style.transform='rotateY('+(x*10).toFixed(2)+'deg) rotateX('+(-y*6).toFixed(2)+'deg) translateY('+(y*-8).toFixed(1)+'px)'});
      ak.addEventListener('mouseleave',function(){akImg.style.transform=''});
    }
    if(!reduced()){var akRaf=0;window.addEventListener('scroll',function(){if(akRaf)return;akRaf=requestAnimationFrame(function(){akRaf=0;var r=ak.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;ak.querySelector('.ak-glow').style.transform='translateX(-50%) translateY('+(r.top*-.12).toFixed(1)+'px) scale('+(1+Math.min(.15,Math.max(0,-r.top/3000))).toFixed(3)+')'})},{passive:true})}
    [].forEach.call(ak.querySelectorAll('.ak-card'),function(c){c.addEventListener('click',function(){var o=!c.classList.contains('open');c.classList.toggle('open',o);c.setAttribute('aria-expanded',String(o))})});
  }

  /* ---------- cartões que viram (o que vestir / se sentir algo forte) ---------- */
  [].forEach.call(document.querySelectorAll('.flip'),function(f){
    f.addEventListener('click',function(){var o=f.getAttribute('aria-expanded')==='true';f.setAttribute('aria-expanded',String(!o))});
  });

  /* ---------- corrente lateral: se forma elo a elo enquanto a página desce ---------- */
  var chainRail=document.querySelector('.chain-rail');
  if(chainRail){
    var chHost=chainRail.parentElement,chSvg=chainRail.querySelector('svg'),chLinks=[],chShown=-1;
    function chBuild(){
      var h=chHost.offsetHeight,html='',y=10,k=0,step=30,hr=chHost.getBoundingClientRect();
      /* a corrente só aparece sobre fundo claro: guarda as faixas das seções escuras */
      var escuro=[].slice.call(chHost.children).filter(function(el){return el.tagName==='SECTION'&&!el.classList.contains('light')})
        .map(function(el){var r=el.getBoundingClientRect();return [r.top-hr.top-12,r.bottom-hr.top+12]});
      for(;y<h-40;y+=step,k++){
        var cy=y+14,fora=escuro.some(function(f){return cy+16>f[0]&&cy-16<f[1]});
        html+= k%2===0
          ? '<ellipse class="cl'+(fora?' oculto':'')+'" cx="13" cy="'+cy+'" rx="8" ry="16"/>'
          : '<ellipse class="cl side'+(fora?' oculto':'')+'" cx="13" cy="'+cy+'" rx="2.6" ry="16"/>';
      }
      chSvg.setAttribute('viewBox','0 0 26 '+h);chSvg.style.height=h+'px';chSvg.innerHTML=html;
      chLinks=[].slice.call(chSvg.querySelectorAll('.cl'));chShown=-1;chDraw();
    }
    function chDraw(){
      if(!chLinks.length)return;
      var r=chHost.getBoundingClientRect(),head=reduced()?r.height:Math.max(0,window.innerHeight*.75-r.top);
      var n=Math.min(chLinks.length,Math.floor(head/30));
      if(n===chShown)return;
      chLinks.forEach(function(l,i){l.classList.toggle('on',i<n)});chShown=n;
    }
    var chRaf=0;window.addEventListener('scroll',function(){if(!chRaf)chRaf=requestAnimationFrame(function(){chRaf=0;chDraw()})},{passive:true});
    window.addEventListener('resize',function(){clearTimeout(chainRail._t);chainRail._t=setTimeout(chBuild,200)});
    window.addEventListener('load',chBuild);
  }

  /* ---------- raízes: a flecha parte de 1987 e acende cada estação até 2025 ---------- */
  var roots=document.querySelector('.roots');
  if(roots){
    var rArrow=roots.querySelector('.roots-arrow'),rInk=roots.querySelector('.roots-ink'),rItems=[].slice.call(roots.querySelectorAll('.timeline li'));
    function rRun(){
      var vert=window.matchMedia('(max-width: 860px)').matches,box=roots.getBoundingClientRect();
      var pts=rItems.map(function(li){var k=li.querySelector('.knot').getBoundingClientRect();return vert?k.top+k.height/2-box.top:k.left+k.width/2-box.left});
      var first=pts[0],last=pts[pts.length-1],dur=reduced()?0:5600,t0=null;
      roots.classList.toggle('vert',vert);
      function frame(ts){
        if(t0===null)t0=ts;var p=dur?Math.min(1,(ts-t0)/dur):1;var e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
        var pos=first+(last-first)*e;
        if(vert){rArrow.style.transform='translate(0,'+pos+'px) rotate(90deg)';rInk.style.height=(pos-first)+'px';rInk.style.top=first+'px'}
        else{rArrow.style.transform='translate('+pos+'px,0)';rInk.style.width=(pos-first)+'px';rInk.style.left=first+'px'}
        rItems.forEach(function(li,i){if(pos>=pts[i]-2)li.classList.add('lit')});
        if(p<1)requestAnimationFrame(frame);else roots.classList.add('done');
      }
      roots.classList.add('run');requestAnimationFrame(frame);
    }
    if(io){var ro=new IntersectionObserver(function(es){if(es[0].isIntersecting){ro.disconnect();setTimeout(rRun,400)}},{threshold:.5});ro.observe(roots)}else rRun();
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

  /* ---------- PIX flutuante ---------- */
  var fab=document.querySelector('.pix-fab'),pop=document.getElementById('pix-pop');
  if(fab){
    fab.addEventListener('click',function(e){e.stopPropagation();var o=fab.getAttribute('aria-expanded')==='true';fab.setAttribute('aria-expanded',String(!o));pop.classList.toggle('open',!o)});
    pop.addEventListener('click',function(e){e.stopPropagation()});
    document.addEventListener('click',function(){fab.setAttribute('aria-expanded','false');pop.classList.remove('open')});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){fab.setAttribute('aria-expanded','false');pop.classList.remove('open')}});
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
      items.forEach(function(it){var okc=cat==='all'||it.dataset.cat.split(' ').indexOf(cat)>-1;var okq=!q||norm(it.textContent+' '+(it.dataset.busca||'')).indexOf(q)>-1;it.hidden=!(okc&&okq);if(!it.hidden)n++});
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

  /* ---------- Instagram: carrega o embed só quando a seção aparece ---------- */
  var ig=document.querySelector('[data-ig]');
  if(ig){
    var loadIG=function(){if(window.instgrm){window.instgrm.Embeds.process();return}
      var sc=document.createElement('script');sc.async=true;sc.src='https://www.instagram.com/embed.js';document.body.appendChild(sc)};
    if('IntersectionObserver' in window){var igo=new IntersectionObserver(function(es){if(es[0].isIntersecting){igo.disconnect();loadIG()}},{rootMargin:'400px'});igo.observe(ig)}else loadIG();
  }

  /* ---------- Agenda: alternar mês / lista ---------- */
  [].forEach.call(document.querySelectorAll('.cal-switch'),function(sw){
    var fr=document.getElementById(sw.getAttribute('data-frame'));
    [].forEach.call(sw.querySelectorAll('button'),function(b){b.addEventListener('click',function(){
      [].forEach.call(sw.querySelectorAll('button'),function(x){x.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed','true');fr.src=b.getAttribute('data-src')})});
    if(window.matchMedia('(max-width: 640px)').matches){var l=sw.querySelector('[data-mobile]');if(l)l.click()}
  });

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

  /* ---------- Árvore da Vida dos Orixás ---------- */
  var arv=document.querySelector('.arvore');
  var oxCard=document.querySelector('.ox-card');
  var lbox=document.querySelector('.lightbox');
  var calmo=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(lbox){
    var lbImg=lbox.querySelector('img'),lbCap=lbox.querySelector('figcaption');
    document.addEventListener('click',function(ev){
      var b=ev.target.closest&&ev.target.closest('.ox-amala,.h-pessoa');if(!b)return;
      lbImg.src=b.getAttribute('data-img');lbImg.alt=b.getAttribute('data-alt')||'';
      lbCap.textContent='';
      if(b.hasAttribute('data-nome')){var nb=document.createElement('b'),ns=document.createElement('span');
        nb.textContent=b.getAttribute('data-nome');ns.textContent=b.getAttribute('data-cargo')||'';lbCap.appendChild(nb);lbCap.appendChild(ns);lbox.classList.add('pessoa')}
      else{lbCap.textContent=b.getAttribute('data-cap')||'';lbox.classList.remove('pessoa')}
      lbCap.hidden=!lbCap.textContent;
      if(lbox.showModal)lbox.showModal();else lbox.setAttribute('open','');
    });
  }
  [].forEach.call(document.querySelectorAll('dialog'),function(d){
    d.addEventListener('click',function(ev){
      if(ev.target===d||(ev.target.closest&&ev.target.closest('[data-fechar]')&&ev.target.closest('dialog')===d)){d.close?d.close():d.removeAttribute('open')}
    });
  });
  if(oxCard){
    var oxNos={},oxFios=arv?[].slice.call(arv.querySelectorAll('.fio')):[],oxLeg=[].slice.call(document.querySelectorAll('.ox-leg'));
    if(arv)[].forEach.call(arv.querySelectorAll('.no'),function(n){oxNos[n.getAttribute('data-slug')]=n});
    var lnodes=[].slice.call(document.querySelectorAll('.lnode'));
    var ordemOx=oxLeg.map(function(b){return b.getAttribute('data-slug')});
    var ordemLi=lnodes.map(function(b){return b.getAttribute('data-slug')});
    var ordemDe=function(s){return ordemLi.indexOf(s)>-1?ordemLi:ordemOx};
    var atual=null,oxBody=oxCard.querySelector('.ox-body'),focoLinha=function(){};
    var foco=function(slug){
      if(!arv)return;
      if(!slug||!oxNos[slug]){arv.classList.remove('foco');oxFios.forEach(function(f){f.classList.remove('on')});
        for(var k in oxNos)oxNos[k].classList.remove('on','perto');oxLeg.forEach(function(b){b.classList.remove('on')});return}
      arv.classList.add('foco');
      for(var k in oxNos)oxNos[k].classList.toggle('on',k===slug),oxNos[k].classList.remove('perto');
      oxFios.forEach(function(f){var a=f.getAttribute('data-a'),b=f.getAttribute('data-b'),on=a===slug||b===slug;
        f.classList.toggle('on',on);if(on){oxNos[a===slug?b:a].classList.add('perto')}});
      oxLeg.forEach(function(b){b.classList.toggle('on',b.getAttribute('data-slug')===slug)});
    };
    var abrir=function(slug,dir){
      var t=document.getElementById('ox-'+slug);if(!t)return;
      atual=slug;oxCard.style.setProperty('--c',t.getAttribute('data-cor'));
      oxBody.innerHTML='';oxBody.appendChild(t.content.cloneNode(true));
      oxBody.classList.remove('troca');void oxBody.offsetWidth;oxBody.style.setProperty('--dir',dir||1);oxBody.classList.add('troca');
      oxCard.scrollTop=0;foco(slug);focoLinha(slug);
      if(!oxCard.open){if(oxCard.showModal)oxCard.showModal();else oxCard.setAttribute('open','')}
    };
    oxCard.addEventListener('close',function(){foco(null);focoLinha(null);
      var n=oxNos[atual]||document.querySelector('.lnode[data-slug="'+atual+'"]');if(n&&document.activeElement===document.body)n.focus()});
    oxCard.addEventListener('click',function(ev){
      var l=ev.target.closest('.ox-lig[data-slug]');
      if(l){var s=l.getAttribute('data-slug'),o=ordemDe(s);abrir(s,o.indexOf(s)>o.indexOf(atual)?1:-1);return}
      var p=ev.target.closest('[data-passo]');
      if(p){var o2=ordemDe(atual),d=+p.getAttribute('data-passo'),i=(o2.indexOf(atual)+d+o2.length)%o2.length;abrir(o2[i],d)}
    });
    var ligar=function(el){var s=el.getAttribute('data-slug');if(s==='olorum')return;
      el.addEventListener('click',function(){abrir(s,1)});
      el.addEventListener('mouseenter',function(){if(!oxCard.open){foco(s);focoLinha(s)}});
      el.addEventListener('mouseleave',function(){if(!oxCard.open){foco(null);focoLinha(null)}});
      el.addEventListener('focus',function(){if(!oxCard.open){foco(s);focoLinha(s)}});
      el.addEventListener('blur',function(){if(!oxCard.open){foco(null);focoLinha(null)}});
      el.addEventListener('keydown',function(ev){if(el.tagName!=='BUTTON'&&(ev.key==='Enter'||ev.key===' ')){ev.preventDefault();abrir(s,1)}});
    };
    for(var k in oxNos)ligar(oxNos[k]);oxLeg.forEach(ligar);lnodes.forEach(ligar);

    /* organograma: fios desenhados a partir da posição real de cada nó */
    var orga=document.querySelector('.orga');
    if(orga){
      var oSvg=orga.querySelector('.orga-fios'),SVGNS='http://www.w3.org/2000/svg',mqO=window.matchMedia('(max-width: 760px)'),oGrupos=[];
      var corDe=function(el){return getComputedStyle(el).getPropertyValue('--c').trim()||'#F3E3B0'};
      var desenhar=function(){
        var R=orga.getBoundingClientRect(),W=R.width,Hh=R.height,defs='',html='';
        oSvg.setAttribute('viewBox','0 0 '+W.toFixed(0)+' '+Hh.toFixed(0));
        var filhos=[].slice.call(orga.querySelectorAll('[data-pai]'));
        filhos.forEach(function(c,i){
          var p=orga.querySelector('[data-no="'+c.getAttribute('data-pai')+'"]');if(!p)return;
          var pr=p.getBoundingClientRect(),cr=(c.querySelector('.l-circ')||c).getBoundingClientRect(),d,len;
          var px,py,cx,cy;
          if(mqO.matches){
            px=pr.left-R.left+22;py=pr.bottom-R.top;cx=cr.left-R.left;cy=cr.top-R.top+cr.height/2;
            if(c.classList.contains('orga-cab')){cx=cr.left-R.left}
            d='M'+px.toFixed(1)+' '+py.toFixed(1)+'V'+(cy-10).toFixed(1)+'Q'+px.toFixed(1)+' '+cy.toFixed(1)+' '+(px+10).toFixed(1)+' '+cy.toFixed(1)+'H'+cx.toFixed(1);
            len=(cy-py)+(cx-px);
          }else{
            px=pr.left-R.left+pr.width/2;py=pr.bottom-R.top;cx=cr.left-R.left+cr.width/2;cy=cr.top-R.top;
            var my=py+(cy-py)/2,dx=cx-px,r=Math.min(12,Math.abs(dx)/2,(cy-py)/4),sg=dx>0?1:-1;
            d=Math.abs(dx)<1?'M'+px.toFixed(1)+' '+py.toFixed(1)+'V'+cy.toFixed(1)
              :'M'+px.toFixed(1)+' '+py.toFixed(1)+'V'+(my-r).toFixed(1)+'Q'+px.toFixed(1)+' '+my.toFixed(1)+' '+(px+sg*r).toFixed(1)+' '+my.toFixed(1)
               +'H'+(cx-sg*r).toFixed(1)+'Q'+cx.toFixed(1)+' '+my.toFixed(1)+' '+cx.toFixed(1)+' '+(my+r).toFixed(1)+'V'+cy.toFixed(1);
            len=(cy-py)+Math.abs(dx);
          }
          var gid='og'+i,c1=corDe(p),c2=corDe(c);
          defs+='<linearGradient id="'+gid+'" gradientUnits="userSpaceOnUse" x1="'+px.toFixed(0)+'" y1="'+py.toFixed(0)+'" x2="'+cx.toFixed(0)+'" y2="'+cy.toFixed(0)+'"><stop offset="0" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></linearGradient>';
          html+='<g data-de="'+(c.getAttribute('data-no'))+'" style="--len:'+Math.ceil(len)+';--atraso:'+(py/Math.max(Hh,1)*1.2).toFixed(2)+'s"><path class="o-base" d="'+d+'" stroke="url(#'+gid+')"/><path class="o-luz" d="'+d+'" stroke="url(#'+gid+')"/></g>';
        });
        oSvg.innerHTML='<defs>'+defs+'</defs>'+html;
        oGrupos=[].slice.call(oSvg.querySelectorAll('g[data-de]'));
      };
      focoLinha=function(slug){
        var n=slug&&orga.querySelector('[data-no="'+slug+'"]');
        lnodes.forEach(function(b){b.classList.toggle('on',!!n&&b===n)});
        if(!n){orga.classList.remove('foco');oGrupos.forEach(function(g){g.classList.remove('on')});return}
        var cadeia=[slug,n.getAttribute('data-pai')];
        orga.classList.add('foco');oGrupos.forEach(function(g){g.classList.toggle('on',cadeia.indexOf(g.getAttribute('data-de'))>-1)});
      };
      [].forEach.call(orga.querySelectorAll('.orga-cab'),function(cb){
        var r=cb.getAttribute('data-no');
        cb.addEventListener('mouseenter',function(){orga.classList.add('foco');oGrupos.forEach(function(g){var el=orga.querySelector('[data-no="'+g.getAttribute('data-de')+'"]');g.classList.toggle('on',g.getAttribute('data-de')===r||(el&&el.getAttribute('data-pai')===r))})});
        cb.addEventListener('mouseleave',function(){focoLinha(null)});
      });
      desenhar();
      var tO;window.addEventListener('resize',function(){clearTimeout(tO);tO=setTimeout(desenhar,150)});
      if(document.fonts&&document.fonts.ready)document.fonts.ready.then(desenhar);
      if(calmo||!('IntersectionObserver' in window))orga.classList.add('acesa');
      else{var oio=new IntersectionObserver(function(es){if(es[0].isIntersecting){oio.disconnect();orga.classList.add('acesa')}},{threshold:.2});oio.observe(orga)}
    }
  }
  if(arv&&oxCard){
    /* acende a árvore de cima para baixo quando ela aparece */
    var acender=function(){
      [].forEach.call(arv.querySelectorAll('.no,.fio'),function(el){
        var y=el.classList.contains('no')?+(el.getAttribute('transform').match(/ ([\d.]+)\)/)||[0,0])[1]
          :Math.min(+el.querySelector('path').getAttribute('d').split(/[ L]/)[1],9999);
        el.style.setProperty('--atraso',(y/1380*1.8).toFixed(2)+'s')});
      arv.classList.add('acesa');
      setTimeout(function(){[].forEach.call(arv.querySelectorAll('.no,.fio'),function(el){el.style.removeProperty('--atraso')})},4200);
    };
    if(calmo||!('IntersectionObserver' in window))arv.classList.add('acesa');
    else{var aio=new IntersectionObserver(function(es){if(es[0].isIntersecting){aio.disconnect();acender()}},{threshold:.15});aio.observe(arv)}

    /* faíscas de luz correndo pelos fios */
    if(!calmo&&window.requestAnimationFrame){
      var gF=arv.querySelector('.faiscas'),NS='http://www.w3.org/2000/svg',fa=[],vis=false,ult=0;
      var dadosFio=oxFios.map(function(f){var d=f.querySelector('path').getAttribute('d').match(/[\d.]+/g).map(Number);
        var stops=f.querySelectorAll('stop');var g=document.getElementById(f.querySelector('path').getAttribute('stroke').slice(5,-1));
        var st=g?g.querySelectorAll('stop'):[];
        return {el:f,x1:d[0],y1:d[1],x2:d[2],y2:d[3],c1:st[0]?st[0].getAttribute('stop-color'):'#fff',c2:st[1]?st[1].getAttribute('stop-color'):'#fff'}});
      var nova=function(){
        var lista=dadosFio;if(arv.classList.contains('foco')){var on=dadosFio.filter(function(f){return f.el.classList.contains('on')});if(on.length&&Math.random()<.8)lista=on}
        var f=lista[Math.floor(Math.random()*lista.length)],g=document.createElementNS(NS,'g');
        var h=document.createElementNS(NS,'circle'),c=document.createElementNS(NS,'circle');
        h.setAttribute('r',16);h.setAttribute('opacity',.25);c.setAttribute('r',4.5);c.setAttribute('fill','#FFF8EE');
        h.setAttribute('fill',f.c1);g.appendChild(h);g.appendChild(c);gF.appendChild(g);
        fa.push({g:g,h:h,f:f,t0:performance.now(),dur:1600+Math.random()*1600,rev:Math.random()<.18});
      };
      var passo=function(now){
        if(!vis){fa.forEach(function(s){s.g.remove()});fa=[];return}
        if(now-ult>(arv.classList.contains('foco')?140:320)&&fa.length<18){ult=now;nova()}
        fa=fa.filter(function(s){var t=(now-s.t0)/s.dur;if(t>=1){s.g.remove();return false}
          var u=s.rev?1-t:t,e2=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2,x=s.f.x1+(s.f.x2-s.f.x1)*e2,y=s.f.y1+(s.f.y2-s.f.y1)*e2;
          s.g.setAttribute('transform','translate('+x.toFixed(1)+' '+y.toFixed(1)+')');s.g.setAttribute('opacity',Math.sin(Math.PI*t).toFixed(2));
          if(t>.5)s.h.setAttribute('fill',s.rev?s.f.c1:s.f.c2);return true});
        requestAnimationFrame(passo);
      };
      if('IntersectionObserver' in window){new IntersectionObserver(function(es){var v=es[0].isIntersecting;if(v&&!vis){vis=true;requestAnimationFrame(passo)}else if(!v)vis=false},{rootMargin:'100px'}).observe(arv)}
    }
  }

  /* ---------- Hierarquia: o corpo da casa ---------- */
  [].forEach.call(document.querySelectorAll('[data-hier]'),function(w){
    var itens=[].slice.call(w.querySelectorAll('.h-item')),partes=[].slice.call(w.querySelectorAll('.h-parte,.h-marca'));
    var ativar=function(k,rolar){
      itens.forEach(function(it){var on=it.getAttribute('data-parte')===k,b=it.querySelector('button');
        it.classList.toggle('ativa',on);b.setAttribute('aria-expanded',on?'true':'false');it.querySelector('.h-corpo-txt').hidden=!on;
        if(on&&rolar&&window.matchMedia('(max-width: 820px)').matches){setTimeout(function(){it.scrollIntoView({block:'nearest',behavior:'smooth'})},60)}});
      partes.forEach(function(p){p.classList.toggle('ativa',p.getAttribute('data-parte')===k)});
    };
    var ver=function(k){partes.forEach(function(p){p.classList.toggle('ver',!!k&&p.getAttribute('data-parte')===k)})};
    itens.forEach(function(it){var k=it.getAttribute('data-parte'),b=it.querySelector('button');
      b.addEventListener('click',function(){ativar(k,false)});
      b.addEventListener('mouseenter',function(){ver(k)});b.addEventListener('mouseleave',function(){ver(null)});
    });
    partes.forEach(function(p){var k=p.getAttribute('data-parte');
      p.addEventListener('click',function(){ativar(k,true)});
      p.addEventListener('mouseenter',function(){ver(k)});p.addEventListener('mouseleave',function(){ver(null)});
    });
    var ini=w.querySelector('.h-item.ativa,.h-item button[aria-expanded="true"]');
    ativar(ini?ini.closest('.h-item').getAttribute('data-parte'):'cabeca',false);
  });

  /* ---------- citações: as palavras surgem uma a uma quando a frase aparece ---------- */
  var quotes=[].slice.call(document.querySelectorAll('blockquote.pull, blockquote:not([class]), .ak-d'));
  if(quotes.length&&!reduced()){
    quotes.forEach(function(q){
      var txt=document.createElement('span');txt.className='q-txt';
      [].slice.call(q.childNodes).forEach(function(n){if(n.nodeName!=='CITE')txt.appendChild(n)});
      q.insertBefore(txt,q.firstChild);wordify(txt,Math.max(28,Math.min(70,2600/Math.max(1,txt.textContent.split(/\s+/).length))));
      var n=txt.querySelectorAll('.word').length,ci=q.querySelector('cite');
      if(ci)ci.style.transitionDelay=Math.min(2.6,.3+n*.06).toFixed(2)+'s';
      q.classList.add('q-anim');
    });
    if('IntersectionObserver' in window){
      var qio=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('arrive');qio.unobserve(en.target)}})},{threshold:.35});
      quotes.forEach(function(q){qio.observe(q)});
    }else quotes.forEach(function(q){q.classList.add('arrive')});
  }
})();
