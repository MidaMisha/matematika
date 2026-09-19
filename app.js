'use strict';
const $=s=>document.querySelector(s);let kind='all';
const norm=s=>String(s||'').toLowerCase().replaceAll('ё','е');
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
function render(){
 const query=norm($('#search').value.trim());let count=0;$('#topics').replaceChildren();
 for(const t of [...COURSE.topics].sort((a,b)=>a.order-b.order)){
  const rows=COURSE.materials.filter(m=>m.topic===t.id&&(kind==='all'||m.kind===kind)&&norm(t.title+' '+m.title+' '+m.description).includes(query)).sort((a,b)=>a.order-b.order);
  if(!rows.length)continue;count+=rows.length;
  const d=el('details','topic');d.id='topic-'+t.id;d.open=true;const s=el('summary');s.append(el('span','topic-number',String(t.order).padStart(2,'0')));const info=el('div');info.append(el('h2','',t.title),el('span','topic-meta',`${rows.length} ${rows.length===1?'материал':rows.length<5?'материала':'материалов'}`));s.append(info);d.append(s);
  const list=el('div','resources');for(const m of rows){const a=el('a','resource '+m.kind);a.href=m.path;a.append(el('span','type',m.kind==='notes'?'КОНСПЕКТ':'ПРАКТИКА'),el('strong','',m.title),el('p','',m.description),el('span','open','Открыть материал ↗'));list.append(a);}d.append(list);$('#topics').append(d);
 }
 $('#topic-count').textContent=COURSE.topics.length;$('#count').textContent=`Материалов: ${count}`;$('#empty').hidden=count>0;
 document.querySelectorAll('[data-kind]').forEach(b=>{b.classList.toggle('active',b.dataset.kind===kind);b.setAttribute('aria-pressed',String(b.dataset.kind===kind));});
}
$('.filters').addEventListener('click',e=>{const b=e.target.closest('[data-kind]');if(b){kind=b.dataset.kind;render();}});$('#search').addEventListener('input',render);$('#reset').addEventListener('click',()=>{kind='all';$('#search').value='';render();});render();
if(location.hash){const target=document.getElementById(location.hash.slice(1));if(target)target.scrollIntoView();}
