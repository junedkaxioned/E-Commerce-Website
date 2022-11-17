
var html = document.querySelector('html');
var header = document.querySelector("header");
var hamBurger = document.querySelector('.hamburger');
var navbar = document.querySelector('.navbar');


// Events On Windows Start
window.addEventListener('scroll', function () {
  stickyNav();
});
// Events On Windows End

// Sticky Navigation Function Start 
function stickyNav() {
  if (window.scrollY > header.offsetHeight + 8) {
    header.classList.add('active')
  } else {
    header.classList.remove('active')
  }
}

// Mobile Navbar Function Start 
hamBurger.addEventListener('click', function () {
  html.classList.toggle('stop-scroll')
  hamBurger.classList.toggle('active')
  navbar.classList.toggle('active')
})
// Mobile Navbar Function End 
