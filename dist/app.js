(() => {
  'use strict';
  const data = window.PORTFOLIO || {};
  const text = (id, value) => { if(value) document.getElementById(id).textContent = value; };
  document.querySelectorAll('[data-name]').forEach(el => el.textContent = data.name || '留白');
  document.title = (data.name || '留白') + ' / Personal Portfolio';
  text('intro', data.intro); text('about-copy', data.about); text('about-detail', data.aboutDetail);
  text('person-name', data.personName); text('practice', data.practice); text('location', data.location);
  text('year', String(new Date().getFullYear()));
  const username = /^[a-z\d](?:[a-z\d-]{0,38})$/i.test(data.githubUsername || '') ? data.githubUsername : '';
  if (username) document.querySelectorAll('.github-profile').forEach(a => a.href = 'https://github.com/' + username);
  else document.querySelectorAll('.github-profile').forEach(a => a.hidden = true);
  if (data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    const area = document.getElementById('email-area');
    const a = document.createElement('a'); a.href = 'mailto:' + data.email; a.textContent = data.email;
    area.querySelector('.email-placeholder').replaceWith(a);
  }
  function safeUrl(value) { try { const u = new URL(value, location.href); return ['https:', 'http:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } }
  const dialog = document.getElementById('project-dialog');
  const artworks = {fold:'art-fold',orbit:'art-orbit-cover',type:'art-type',grid:'art-grid'};
  (data.projects || []).forEach((project, i) => {
    const article = document.createElement('article'); article.className = 'work-card';
    const button = document.createElement('button'); button.type = 'button';
    const number = String(i + 1).padStart(2, '0');
    const title = project.title || '作品 ' + number;
    button.setAttribute('aria-label', '查看' + title + (project.title ? '' : '，内容待填写'));
    const art = document.createElement('div'); art.className = 'work-art ' + (artworks[project.art] || 'art-fold'); art.setAttribute('aria-hidden', 'true');
    const caption = document.createElement('span'); caption.className = 'cover-caption'; caption.textContent = project.title ? 'SELECTED WORK / ' + number : 'YOUR NEXT CREATION / ' + number;
    const index = document.createElement('span'); index.className = 'cover-index'; index.textContent = project.title ? number : '封面示意'; art.append(caption, index);
    if(project.image && safeUrl(project.image)) { const img = document.createElement('img'); img.src = safeUrl(project.image); img.alt = ''; img.loading = 'lazy'; img.addEventListener('error', () => img.remove()); art.append(img); }
    const meta = document.createElement('div'); meta.className = 'card-caption';
    const info = document.createElement('div'); const h = document.createElement('h3'); h.textContent = title;
    if(!project.title) { const badge = document.createElement('span'); badge.className = 'draft-label'; badge.textContent = '待填写'; h.append(badge); }
    const p = document.createElement('p'); p.textContent = [project.category, project.year].filter(Boolean).join(' / '); info.append(h, p);
    const arrow = document.createElement('span'); arrow.className = 'card-arrow'; arrow.textContent = '↗'; meta.append(info, arrow); button.append(art, meta); article.append(button); document.getElementById('work-grid').append(article);
    button.addEventListener('click', () => {
      text('dialog-title', title); text('dialog-type', project.category || 'SELECTED WORK');
      text('dialog-description', project.description || '这个位置留给你的作品。\n项目介绍、创作过程和最终成果，等待你来填写。');
      const link = document.getElementById('dialog-link'); const url = project.url ? safeUrl(project.url) : ''; link.hidden = !url; if(url) link.href = url;
      dialog.showModal();
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { const r = dialog.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); });
  const load = document.getElementById('load-repos');
  if (!username) { load.hidden = true; text('github-status', 'GitHub 账号待填写。'); document.getElementById('repository-list').replaceChildren(); }
  else {
    const initial = document.querySelector('.repo-row'); initial.href = 'https://github.com/' + username + '?tab=repositories'; initial.querySelector('p').textContent = username + ' / repositories';
  }
  load.addEventListener('click', async () => {
    load.disabled = true; text('github-status', '正在读取 GitHub 公开项目…');
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch('https://api.github.com/users/' + encodeURIComponent(username) + '/repos?sort=updated&per_page=100&type=owner', { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } });
      if (!response.ok) throw new Error('GitHub ' + response.status);
      const repos = await response.json(); if(!Array.isArray(repos)) throw new Error('Invalid response');
      const publicRepos = repos.filter(r => !r.fork && !r.archived).slice(0, 4);
      const list = document.getElementById('repository-list'); list.replaceChildren();
      publicRepos.forEach((repo, i) => {
        const a = document.createElement('a'); a.className = 'repo-row'; a.href = 'https://github.com/' + encodeURIComponent(username) + '/' + encodeURIComponent(repo.name); a.target = '_blank'; a.rel = 'noopener noreferrer';
        const n = document.createElement('span'); n.className = 'repo-number'; n.textContent = String(i + 1).padStart(2, '0');
        const info = document.createElement('div'); const h = document.createElement('h3'); h.textContent = repo.name;
        const p = document.createElement('p'); p.textContent = repo.description || [repo.language, 'GitHub 项目'].filter(Boolean).join(' / '); info.append(h, p);
        const arrow = document.createElement('span'); arrow.className = 'repo-arrow'; arrow.textContent = '↗'; a.append(n, info, arrow); list.append(a);
      });
      text('github-status', publicRepos.length ? '已更新 · 展示最近更新的 ' + publicRepos.length + ' 个原创公开项目。' : '暂时没有可展示的原创公开项目。你仍可通过上方入口访问 GitHub。');
    } catch { text('github-status', '暂时无法读取，可能是网络或 GitHub 请求限制。请稍后重试，或直接访问 GitHub。'); }
    finally { clearTimeout(timeout); load.disabled = false; }
  });
})();
