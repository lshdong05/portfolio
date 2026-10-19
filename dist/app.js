(() => {
  'use strict';
  const data = window.PORTFOLIO || {};
  const page = document.body.dataset.page || 'home';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const safeUrl = value => { if (!value) return ''; try { const u=new URL(value,location.href); return ['http:','https:'].includes(u.protocol) ? u.href : ''; } catch {return '';} };
  const user = /^[a-z\d][a-z\d-]{0,38}$/i.test(data.githubUsername || '') ? data.githubUsername : '';
  const profile = user ? 'https://github.com/' + user : '';
  const name = data.name || 'PORTFOLIO';
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const titleOf = (p,i) => p.title || '项目 ' + (p.id || String(i+1).padStart(2,'0'));
  const hrefOf = p => './project.html?id=' + encodeURIComponent(p.id);
  const arrow = '<span aria-hidden="true">↗</span>';
  const button = (href, label, secondary=false) => '<a class="button'+(secondary?' button-light':'')+'" href="'+esc(href)+'"><span>'+label+'</span>'+arrow+'</a>';
  const crumbs = list => '<nav class="breadcrumbs" aria-label="当前位置"><a href="./index.html">首页</a>'+list.map(([label,href])=>'<span aria-hidden="true">/</span>'+(href?'<a href="'+esc(href)+'">'+esc(label)+'</a>':'<span aria-current="page">'+esc(label)+'</span>')).join('')+'</nav>';
  const routes = [['home','./index.html','首页'],['works','./works.html','作品'],['about','./about.html','关于'],['contact','./contact.html','联系']];
  const main = document.getElementById('main');
  document.getElementById('site-header').innerHTML = '<header class="site-header"><a class="brand" href="./index.html" aria-label="'+esc(name)+' 首页"><span class="brand-symbol" aria-hidden="true"><i></i><i></i><i></i></span><span>'+esc(name)+'</span><small>PERSONAL / ARCHIVE</small></a><nav class="main-nav" aria-label="主导航">'+routes.map(([key,href,label])=>'<a href="'+href+'"'+((page===key || page==='project'&&key==='works')?' aria-current="page"':'')+'>'+label+'</a>').join('')+'</nav><span class="header-note">ART · DESIGN · EXPLORATION</span></header>';
  document.getElementById('site-footer').innerHTML = '<footer class="site-footer"><a class="footer-brand" href="./index.html">'+esc(name)+'<span>个人作品集</span></a><p>© '+new Date().getFullYear()+'<span class="footer-rule"></span>A SPACE FOR IDEAS.</p><a href="./contact.html">保持联系 '+arrow+'</a></footer>';
  const art = (p, full=false) => {
    const url=safeUrl(p.image);
    if(url) return '<div class="artwork custom-art"><img src="'+esc(url)+'" alt="'+esc(p.title||'作品图片')+'" loading="lazy"></div>';
    const kind=['sculpture','blue','fold','coral'].includes(p.art) ? p.art : 'fold';
    return '<div class="artwork art-'+kind+(full?' art-large':'')+'" role="img" aria-label="抽象艺术封面示意">'+(kind==='sculpture'?'<img src="./assets/hero-gallery.webp" alt="" loading="lazy">':kind==='blue'?'<span class="blue-portal"></span><span class="blue-orb"></span><span class="art-caption">DIGITAL<br>MATTER.</span>':kind==='fold'?'<span class="fold-sheet sheet-back"></span><span class="fold-sheet sheet-front"></span><span class="fold-dot"></span><span class="art-caption">A STUDY<br>IN FORM.</span>':'<span class="coral-disc"></span><span class="coral-arch"></span><span class="coral-pin"></span><span class="art-caption">PLAY /<br>IN PROGRESS.</span>')+'<span class="art-note">视觉示意 · 作品待补充</span></div>';
  };
  const card = (p,i) => '<article class="project-card" data-category="'+esc(p.category)+'"><a href="'+esc(hrefOf(p))+'" class="project-link" aria-label="进入'+esc(titleOf(p,i))+'详情"><div class="project-art-wrap">'+art(p)+'<span class="open-project">进入项目 '+arrow+'</span></div><div class="project-meta"><span class="project-number">'+esc(p.id||String(i+1).padStart(2,'0'))+'</span><div><h2>'+esc(titleOf(p,i))+'</h2><p>'+esc(p.category)+' / '+esc(p.year||'内容待补充')+'</p></div><span class="meta-arrow" aria-hidden="true">↗</span></div></a></article>';
  function home() {
    main.innerHTML = '<section class="home-hero"><div class="hero-eyebrow"><span><i></i> A PERSONAL COLLECTION</span><span>INDEX / '+new Date().getFullYear()+'</span></div><div class="hero-layout"><div class="hero-copy"><p class="micro-title">观察 / 构想 / 表达</p><h1>Ideas<br>take <em>shape.</em><span class="title-dot">●</span></h1><p class="hero-cn">'+esc(data.tagline||'创作的可能，不止一面。')+'</p><p class="hero-description">'+esc(data.intro||'一个关于视觉、数字与自由探索的空间。\\n推开一扇门，看见想法的另一面。').replace(/\\n|\r?\n/g,'<br>')+'</p>'+button('./works.html','进入作品展厅')+'<div class="hero-index"><span>01 — 03</span><span class="index-line"></span><span>EXPLORE THE SPACES</span></div></div><div class="gallery-scene"><div class="scene-backplate"></div><div class="scene-image"><img src="./assets/hero-gallery.webp" alt="暖白展厅中的红色流动雕塑，带有少量蓝色细节" fetchpriority="high"><span class="image-tag">FORM / SPACE / POSSIBILITY</span><span class="image-caption">数字艺术装置 · 主视觉示意</span></div><div class="scene-swatch"><span>COLOUR STUDY</span><i></i><i></i><i></i><i></i></div><div class="scene-stamp" aria-hidden="true">OPEN<br>TO<br>IDEAS. <b>↘</b></div></div></div><div class="hero-baseline"><span>个人作品集 / PERSONAL PORTFOLIO</span><span>向下，或走进一个空间 ↓</span></div></section><section class="rooms-section" aria-labelledby="rooms-title"><div class="section-top"><span class="eyebrow">CHOOSE A DIRECTION</span><h2 id="rooms-title">每一次进入，<em>都有新的发现。</em></h2></div><div class="room-grid"><a class="room room-red" href="./works.html"><span class="room-number">01 / WORK</span><div class="room-door" aria-hidden="true"><i></i><i></i><i></i></div><div class="room-bottom"><div><h3>作品展厅</h3><p>从全貌，到每一处细节。</p></div><span>↗</span></div></a><a class="room room-cream" href="./about.html"><span class="room-number">02 / ABOUT</span><div class="room-portrait" aria-hidden="true"><i></i><i></i></div><div class="room-bottom"><div><h3>关于创作者</h3><p>作品背后的视角与故事。</p></div><span>↗</span></div></a><a class="room room-blue" href="./contact.html"><span class="room-number">03 / CONNECT</span><div class="room-spark" aria-hidden="true">✳</div><div class="room-bottom"><div><h3>开始对话</h3><p>让下一个想法，在这里相遇。</p></div><span>↗</span></div></a></div></section>';
  }
  function works() {
    main.innerHTML=crumbs([['作品展厅']])+'<section class="page-intro"><div><span class="eyebrow">ROOM 01 / SELECTED WORK</span><h1>Selected<br><em>works.</em><sup>('+String(projects.length).padStart(2,'0')+')</sup></h1></div><div class="page-intro-copy"><span class="tiny-cross" aria-hidden="true">✳</span><p>想法，有很多种形状。<br>选择一件作品，走近一点。</p><small>以下封面为视觉示意，项目内容待补充。</small></div></section><div class="filter-bar"><div class="filters" role="group" aria-label="作品分类">'+['全部',...new Set(projects.map(p=>p.category).filter(Boolean))].map((cat,i)=>'<button type="button" data-filter="'+esc(cat)+'" aria-pressed="'+(i===0)+'">'+esc(cat)+'</button>').join('')+'</div><span id="work-count" aria-live="polite">'+projects.length+' 件作品</span></div><section class="project-grid" aria-label="作品列表">'+projects.map(card).join('')+'</section><div class="page-end">'+button('./about.html','继续探索 · 关于',true)+'</div>';
    main.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{
      const cat=b.dataset.filter; main.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
      let count=0; main.querySelectorAll('.project-card').forEach(el=>{el.hidden=cat!=='全部'&&el.dataset.category!==cat;if(!el.hidden)count++;});
      document.getElementById('work-count').textContent=count+' 件作品';
    }));
  }
  function project() {
    const id=new URLSearchParams(location.search).get('id');
    const index=projects.findIndex(p=>p.id===id);
    if(index<0) { main.innerHTML=crumbs([['作品展厅','./works.html'],['项目未找到']])+'<section class="empty-page"><span class="eyebrow">NOT FOUND</span><h1>这件作品<br><em>还未入场。</em></h1>'+button('./works.html','返回作品目录')+'</section>'; return; }
    const p=projects[index], next=projects[(index+1)%projects.length], title=titleOf(p,index);
    document.title=title+' · '+name;
    main.innerHTML=crumbs([['作品展厅','./works.html'],[title]])+'<section class="project-intro"><div><span class="eyebrow">PROJECT / '+esc(p.id)+'</span><h1>'+esc(title)+'</h1><p>'+esc(p.title?'': '项目名称与内容待补充')+'</p></div><div class="project-facts"><div><span>领域 / FIELD</span><strong>'+esc(p.category||'待补充')+'</strong></div><div><span>年份 / YEAR</span><strong>'+esc(p.year||'待补充')+'</strong></div><div><span>角色 / ROLE</span><strong>'+esc(p.role||'待补充')+'</strong></div></div></section><div class="detail-art">'+art(p,true)+'</div><section class="project-story"><span class="eyebrow">01 / THE IDEA</span><div><h2>从一个想法开始。</h2><p class="'+(p.description?'':'empty-copy')+'">'+esc(p.description||'项目简介待补充。这里可以介绍创作背景、希望解决的问题，以及最初的灵感。')+'</p></div></section><section class="project-story"><span class="eyebrow">02 / THE PROCESS</span><div><h2>让想法，成为作品。</h2><p class="'+(p.process?'':'empty-copy')+'">'+esc(p.process||'创作过程待补充。这里可以记录探索、尝试和最终成果。')+'</p>'+(safeUrl(p.url)?'<a class="text-link" href="'+esc(safeUrl(p.url))+'" target="_blank" rel="noopener noreferrer">查看完整项目 '+arrow+'</a>':'')+'</div></section><nav class="project-navigation" aria-label="项目导航"><a href="./works.html">← 返回作品目录</a>'+(next&&projects.length>1?'<a href="'+esc(hrefOf(next))+'"><small>NEXT PROJECT</small><span>'+esc(titleOf(next,(index+1)%projects.length))+' ↗</span></a>':'')+'</nav>';
  }
  function about() {
    main.innerHTML=crumbs([['关于创作者']])+'<section class="about-layout"><div class="about-visual"><div class="portrait-frame"><div class="portrait-sculpture"><i></i><i></i><i></i></div><span>YOUR PERSPECTIVE<br>MATTERS.</span><small>个人照片 / 形象待补充</small></div><span class="about-visual-caption">A PERSON. A PERSPECTIVE. A POSSIBILITY.</span></div><div class="about-text"><span class="eyebrow">ROOM 02 / BEHIND THE WORK</span><h1>Behind<br>the <em>ideas.</em></h1><p class="about-lead">'+esc(data.personName||'你的名字，写在这里。')+'</p><p class="about-description '+(data.about?'':'empty-copy')+'">'+esc(data.about||'个人简介待补充。\\n这里留给你的经历、兴趣与创作方式。').replace(/\\n|\r?\n/g,'<br>')+'</p><dl class="personal-facts"><div><dt>创作方向</dt><dd>'+esc(data.practice||'待补充')+'</dd></div><div><dt>所在城市</dt><dd>'+esc(data.location||'待补充')+'</dd></div></dl>'+button('./contact.html','进入下一空间 · 联系')+'</div></section>';
  }
  function contact() {
    const email=typeof data.email==='string'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)?data.email:'';
    main.innerHTML=crumbs([['联系']])+'<section class="contact-hero"><div><span class="eyebrow">ROOM 03 / START SOMETHING</span><h1>Good things<br>begin with<br><em>a hello.</em><span class="contact-dot">●</span></h1><p>一次对话，或许就是下一个作品的开始。</p></div><div class="contact-object" aria-hidden="true"><i></i><i></i><span>↗</span></div></section><section class="contact-links"><div><span class="eyebrow">EMAIL</span>'+(email?'<a href="mailto:'+esc(email)+'">'+esc(email)+' ↗</a>':'<p class="empty-copy">联系邮箱待补充</p>')+'</div><div><span class="eyebrow">ELSEWHERE</span>'+(profile?'<a href="'+esc(profile)+'" target="_blank" rel="noopener noreferrer">GitHub <small>@'+esc(user)+'</small> ↗</a>':'<p class="empty-copy">社交账号待补充</p>')+'</div></section>'+(profile?'<section class="github-section"><div class="github-top"><div><span class="eyebrow">OPEN EXPLORATIONS</span><h2>也在代码中，<em>继续探索。</em></h2></div><button class="text-link" id="load-repos" type="button">加载公开项目 ↻</button></div><p id="github-status" role="status">点击加载 GitHub 上的公开项目。</p><div id="repository-list"></div></section>':'');
    if(profile) setupGithub();
  }
  function setupGithub() {
    const b=document.getElementById('load-repos'), status=document.getElementById('github-status'), list=document.getElementById('repository-list');
    b.addEventListener('click',async()=>{
      b.disabled=true;status.textContent='正在读取公开项目…';
      const controller=new AbortController(), timeout=setTimeout(()=>controller.abort(),12000);
      try {
        const r=await fetch('https://api.github.com/users/'+encodeURIComponent(user)+'/repos?sort=updated&per_page=100&type=owner',{signal:controller.signal,headers:{Accept:'application/vnd.github+json'}});
        if(!r.ok)throw Error('HTTP '+r.status);
        const values=await r.json();if(!Array.isArray(values))throw Error('Invalid data');
        const repos=values.filter(r=>!r.fork&&!r.archived).slice(0,4);
        list.innerHTML=repos.map((r,i)=>'<a class="repo-row" href="https://github.com/'+encodeURIComponent(user)+'/'+encodeURIComponent(r.name)+'" target="_blank" rel="noopener noreferrer"><span>0'+(i+1)+'</span><div><h3>'+esc(r.name)+'</h3><p>'+esc(r.description||r.language||'公开项目')+'</p></div>'+arrow+'</a>').join('');
        status.textContent=repos.length?'已更新 · 最近更新的 '+repos.length+' 个原创公开项目。':'暂时没有可展示的原创公开项目。';
      } catch { status.textContent='暂时无法读取，可能是网络或 GitHub 请求限制。可重试或通过上方链接访问 GitHub。'; }
      finally {clearTimeout(timeout);b.disabled=false;}
    });
  }
  ({home,works,project,about,contact}[page]||home)();
  if(page!=='project') document.title=({home:'个人作品集',works:'作品展厅',about:'关于',contact:'联系'}[page]||'个人作品集')+' · '+name;
  document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.classList.add('image-unavailable');img.alt='视觉图片暂不可用';}));
})();
