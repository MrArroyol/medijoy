(function(){
  // Cursor
  var cur=document.querySelector('.cursor'),ring=document.querySelector('.cursor-ring');
  if(cur&&ring){
    var mx=window.innerWidth/2,my=window.innerHeight/2,rx=mx,ry=my;
    document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY});
    (function anim(){cur.style.left=mx+'px';cur.style.top=my+'px';rx+=(mx-rx)*.13;ry+=(my-ry)*.13;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(anim)})();
    document.querySelectorAll('a,button,.trat-card,.dif-item,.testi-card').forEach(function(el){
      el.addEventListener('mouseenter',function(){ring.style.width='54px';ring.style.height='54px';ring.style.borderColor='rgba(201,168,76,.85)'});
      el.addEventListener('mouseleave',function(){ring.style.width='38px';ring.style.height='38px';ring.style.borderColor='rgba(201,168,76,.5)'});
    });
  }
  // Reveal
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:0.1});
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(function(el){obs.observe(el)});
  // Nav scroll
  var nav=document.querySelector('.nav-main');
  if(nav)window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.scrollY>60)},{passive:true});
  // Count up
  document.querySelectorAll('.count-up').forEach(function(el){
    var target=parseInt(el.dataset.target),suffix=el.dataset.suffix||'',started=false;
    var co=new IntersectionObserver(function(entries){
      if(entries[0].isIntersecting&&!started){started=true;var c=0,step=target/55;
        var t=setInterval(function(){c=Math.min(c+step,target);el.textContent=Math.round(c)+suffix;if(c>=target)clearInterval(t)},16);
        co.disconnect();}},{threshold:0.5});
    co.observe(el);
  });
  // Smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){var t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}});
  });
})();
