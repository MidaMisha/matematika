'use strict';
(()=>{
 const file=decodeURIComponent(location.pathname).split('/').pop();const m=COURSE.materials.find(x=>x.path.split('/').pop()===file);if(!m)return;
 const related=COURSE.materials.filter(x=>x.topic===m.topic&&x.id!==m.id).sort((a,b)=>a.order-b.order);
 const nav=document.createElement('nav');nav.className='document-nav';nav.setAttribute('aria-label','Навигация по теме');
 const back=document.createElement('a');back.href='../index.html#topic-'+m.topic;back.textContent='← К теме';nav.append(back);
 if(related[0]){const a=document.createElement('a');a.href=related[0].path.split('/').pop();a.className='related';a.textContent=(related[0].kind==='practice'?'Перейти к практике':'Открыть конспект')+' →';nav.append(a);}
 document.body.prepend(nav);
 if(related.length){const foot=document.createElement('nav');foot.className='document-footer';for(const r of related){const p=document.createElement('p');const a=document.createElement('a');a.href=r.path.split('/').pop();a.textContent=(r.kind==='practice'?'Практика: ':'Конспект: ')+r.title;p.append(a);foot.append(p);}document.body.append(foot);}
})();
