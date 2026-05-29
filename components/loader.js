function initMobileNav() {
  var mvToggle = document.getElementById('mvToggle');
  var mvNav = document.getElementById('mvNavLinks');
  if (!mvToggle) return;
  mvToggle.addEventListener('click', function () {
    mvNav.classList.toggle('open');
    mvToggle.classList.toggle('open');
  });
  mvNav.querySelectorAll('.dropdown > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.innerWidth <= 720) { e.preventDefault(); a.closest('.dropdown').classList.toggle('mob-open'); }
    });
  });
  mvNav.querySelectorAll('.subdropdown > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.innerWidth <= 720) { e.preventDefault(); a.closest('.subdropdown').classList.toggle('mob-open'); }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mv-header')) { mvNav.classList.remove('open'); mvToggle.classList.remove('open'); }
  });
  var callLi = document.createElement('li');
  callLi.innerHTML = '<a class="mv-call-link" href="tel:18257366306">&#9742; +1(825)736-6306</a>';
  mvNav.appendChild(callLi);
}

Promise.all([
  fetch('components/header.html').then(function (r) { return r.text(); }),
  fetch('components/footer.html').then(function (r) { return r.text(); })
]).then(function (results) {
  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = results[0];
  if (footerEl) footerEl.innerHTML = results[1];
  initMobileNav();
});
