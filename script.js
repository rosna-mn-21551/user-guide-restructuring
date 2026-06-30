<script>
// ============================================================
// Help-doc behavior: active-section highlighting + feedback.
// Inlined into every output by the renderer.
// ============================================================

// ---- scrollspy: highlight the active section in the side nav ----
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  var map = {};
  var targets = [];
  links.forEach(function(a){
    var id = a.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if(el){ map[id] = a; targets.push(el); }
  });
  var visible = {};
  function setActive(id){
    links.forEach(function(a){ a.classList.remove('active'); a.removeAttribute('aria-current'); });
    if(map[id]){ map[id].classList.add('active'); map[id].setAttribute('aria-current','true'); }
  }
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ visible[e.target.id] = true; }
        else { delete visible[e.target.id]; }
      });
      for(var i=0;i<targets.length;i++){
        if(visible[targets[i].id]){ setActive(targets[i].id); break; }
      }
    }, {rootMargin:'-82px 0px -70% 0px', threshold:0});
    targets.forEach(function(t){ io.observe(t); });
  }
})();

// ---- feedback buttons ----
(function(){
  var box = document.getElementById('fb');
  if(!box) return;
  box.addEventListener('click', function(e){
    var btn = e.target.closest('button'); if(!btn) return;
    box.innerHTML = '<span class="fb-done">Thanks for your feedback!</span>';
  });
})();

</script>
