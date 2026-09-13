

const paths = {
  profit: {
    label: 'Финансовая прозрачность',
    title: 'Отделяем прибыль от движения денег',
    text: 'Собираем корректный ОПиУ, связываем его с ДДС и Балансом и находим, где именно исчезает финансовый результат.',
    s1: 'Понимание реальной чистой и маржинальной прибыли',
    s2: 'Выручку, себестоимость, расходы, деньги и капитал',
    s3: 'План действий с приоритетами и финансовым эффектом'
  },
  cash: {
    label: 'Денежный поток',
    title: 'Перестаем лечить кассовые разрывы кредитами',
    text: 'Строим платежный календарь, прогноз ДДС и правила управления оборотным капиталом, чтобы дефицит был виден заранее.',
    s1: 'Прогноз денег и безопасных выплат собственнику',
    s2: 'Сроки оплат, закупки, кредиты, запасы и дебиторку',
    s3: 'Снижение стоимости дефицита и кредитной зависимости'
  },
  market: {
    label: 'Экономика маркетплейса',
    title: 'Считаем не оборот, а прибыль по SKU',
    text: 'Связываем продажи с комиссиями, логистикой, рекламой, себестоимостью, возвратами и остатками — и управляем ассортиментом по реальной марже.',
    s1: 'Маржинальная прибыль и рентабельность по SKU',
    s2: 'Ozon/WB, ДРР, логистику, себестоимость и запасы',
    s3: 'Решения по ценам, рекламе, закупкам и ассортименту'
  },
  scale: {
    label: 'Рост и сценарии',
    title: 'Сначала считаем цену роста — потом масштабируемся',
    text: 'Финансовая модель показывает, сколько денег потребует рост, где возникнет дефицит и при каком сценарии масштабирование действительно повышает прибыль.',
    s1: 'Сценарии роста и потребность в финансировании',
    s2: 'Маржу, ФОТ, CAPEX, оборотный капитал и долговую нагрузку',
    s3: 'План-факт и критерии для инвестиционного решения'
  }
};

window.setPath = function(key, el) {
  const p = paths[key];
  if (!p) return;
  document.querySelectorAll('.path-tab').forEach(x => x.classList.remove('active'));
  if (el) el.classList.add('active');
  const map = {
    pathLabel: p.label,
    pathTitle: p.title,
    pathText: p.text,
    s1: p.s1,
    s2: p.s2,
    s3: p.s3
  };
  Object.entries(map).forEach(([id, value]) => {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  });
};

window.openContact = function() {
  const modal = document.getElementById('contactModal');
  if (modal) modal.classList.add('open');
};
window.closeContact = function() {
  const modal = document.getElementById('contactModal');
  if (modal) modal.classList.remove('open');
};

window.openTestimonial = function(i) {
  const modal = document.getElementById('testimonial-' + i);
  if (modal) modal.classList.add('open');
};
window.closeTestimonial = function(i) {
  const modal = document.getElementById('testimonial-' + i);
  if (modal) modal.classList.remove('open');
};

let currentSlide = 0;
function fintabloSlides() {
  return Array.from(document.querySelectorAll('.carousel-slide'));
}
window.renderSlide = function() {
  const slides = fintabloSlides();
  if (!slides.length) return;
  currentSlide = (currentSlide + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  const counter = document.getElementById('slideNow');
  if (counter) counter.textContent = String(currentSlide + 1);
};
window.moveSlide = function(direction) {
  currentSlide += Number(direction) || 0;
  window.renderSlide();
};

let currentReview = 0;
function reviewSlides() {
  return Array.from(document.querySelectorAll('.review-slide'));
}
window.renderReview = function() {
  const slides = reviewSlides();
  if (!slides.length) return;
  currentReview = (currentReview + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentReview));
  document.querySelectorAll('.review-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentReview);
  });
  const counter = document.getElementById('reviewNow');
  if (counter) counter.textContent = String(currentReview + 1);
};
window.moveReview = function(direction) {
  currentReview += Number(direction) || 0;
  window.renderReview();
};
window.goReview = function(i) {
  currentReview = Number(i) || 0;
  window.renderReview();
};

function attachSwipe(element, onSwipeLeft, onSwipeRight) {
  if (!element) return;
  let startX = 0;
  let startY = 0;
  element.addEventListener('touchstart', function(e) {
    if (!e.changedTouches || !e.changedTouches.length) return;
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
  }, {passive: true});
  element.addEventListener('touchend', function(e) {
    if (!e.changedTouches || !e.changedTouches.length) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) >= 35 && Math.abs(dx) > Math.abs(dy) * 1.15) {
      if (dx < 0) onSwipeLeft();
      else onSwipeRight();
    }
  }, {passive: true});
}

function setupMobileAccordions() {
  const selectors = ['.service', '.role', '.fit', '.takeaway'];
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(card => {
      if (card.dataset.mobileAccordion === '1') return;
      card.dataset.mobileAccordion = '1';
      card.addEventListener('click', function(e) {
        if (window.innerWidth > 640) return;
        if (e.target.closest('a,button')) return;
        card.classList.toggle('mobile-open');
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  window.renderSlide();
  window.renderReview();
  setupMobileAccordions();

  // Explicit listeners: more reliable in mobile webviews than inline handlers alone.
  document.querySelectorAll('.carousel-arrow.prev').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.moveSlide(-1);
    });
  });
  document.querySelectorAll('.carousel-arrow.next').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.moveSlide(1);
    });
  });
  document.querySelectorAll('.review-arrow.prev').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.moveReview(-1);
    });
  });
  document.querySelectorAll('.review-arrow.next').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.moveReview(1);
    });
  });

  attachSwipe(document.querySelector('.carousel-shell'), () => window.moveSlide(1), () => window.moveSlide(-1));
  attachSwipe(document.querySelector('.review-viewport'), () => window.moveReview(1), () => window.moveReview(-1));

  const up = document.getElementById('upButton');
  function updateUp() {
    if (up) up.classList.toggle('show', window.scrollY > 420);
  }
  window.addEventListener('scroll', updateUp, {passive: true});
  updateUp();

  if (up) {
    up.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open,.testimonial-modal.open').forEach(x => x.classList.remove('open'));
  }
});


document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('header a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      const id=this.getAttribute('href');
      const target=document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      const offset=window.innerWidth<=640 ? 58 : 72;
      const y=target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({top:y,behavior:'smooth'});
    });
  });
});

// Accessible modal lifecycle, including keyboard focus restoration.
let modalReturnFocus = null;
function showPanel(id){const panel=document.getElementById(id);if(!panel)return;modalReturnFocus=document.activeElement;panel.classList.add('open');panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label',id==='contactModal'?'Запись на диагностику':'Оригинал отзыва');panel.querySelector('button,a')?.focus();}
function hidePanel(id){document.getElementById(id)?.classList.remove('open');modalReturnFocus?.focus();}
window.openContact=()=>{if(typeof ym==='function'){ym(112547387,'reachGoal','diagnostic_open');}showPanel('contactModal');};window.closeContact=()=>hidePanel('contactModal');window.openTestimonial=i=>showPanel('testimonial-'+i);window.closeTestimonial=i=>hidePanel('testimonial-'+i);
document.addEventListener('keydown',e=>{const panel=document.querySelector('.modal.open,.testimonial-modal.open');if(e.key==='Escape'){modalReturnFocus?.focus();return;}if(!panel||e.key!=='Tab')return;const items=[...panel.querySelectorAll('button,a[href]')];const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
document.querySelectorAll('.path-tab').forEach(el=>{el.setAttribute('aria-pressed',el.classList.contains('active'));el.addEventListener('click',()=>document.querySelectorAll('.path-tab').forEach(x=>x.setAttribute('aria-pressed',x===el)));});
document.querySelector('.path-result')?.setAttribute('aria-live','polite');
document.querySelectorAll('.modal .close,.testimonial-modal .close').forEach(x=>x.setAttribute('aria-label','Закрыть'));
// Open supplied reports at readable size.
document.querySelectorAll('.carousel-slide img').forEach(img=>{const a=document.createElement('a');a.href=img.src;a.target='_blank';a.rel='noopener';a.setAttribute('aria-label','Открыть отчет: '+img.alt);img.replaceWith(a);a.append(img);});
const reportTabs=[...document.querySelectorAll('.report-tab')];
function selectReport(tab){reportTabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});}
reportTabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectReport(tab));tab.addEventListener('keydown',e=>{let n=i;if(e.key==='ArrowDown'||e.key==='ArrowRight')n=(i+1)%reportTabs.length;else if(e.key==='ArrowUp'||e.key==='ArrowLeft')n=(i-1+reportTabs.length)%reportTabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=reportTabs.length-1;else return;e.preventDefault();selectReport(reportTabs[n]);reportTabs[n].focus();});});
const reportDialog=document.querySelector('.report-dialog');
document.querySelectorAll('[data-report]').forEach(button=>button.addEventListener('click',()=>{const img=document.getElementById('report-original');img.src=button.dataset.report;img.alt=button.dataset.title;document.getElementById('report-dialog-title').textContent=button.dataset.title;reportDialog.showModal();}));
document.querySelector('.report-dialog-close').addEventListener('click',()=>reportDialog.close());
reportDialog.addEventListener('click',e=>{if(e.target===reportDialog){const r=reportDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)reportDialog.close();}});
