
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

// Slider Function Start
function sliderFunction() {
  var slider = document.querySelector('.sliders');
  var slideNextBtn = document.querySelector('.slide-next')
  var slidePrevBtn = document.querySelector('.slide-prev')
  var containerDimension = slider.getBoundingClientRect();
  var containerWidth = containerDimension.width;

  slideNextBtn.addEventListener('click', function () {
    slider.scrollLeft += containerWidth;
  })

  slidePrevBtn.addEventListener('click', function () {
    slider.scrollLeft -= containerWidth;
  })
}
// Slider Function End

// Modal Function Start
function modalFunction() {
  var arrivalImage = document.querySelectorAll(".image");
  var arrivalSection = document.querySelector('.new-arrivales-section .wrapper');
  arrivalImage.forEach(function (img) {
    img.addEventListener('click', function () {
      var div = document.createElement('div');
      div.classList.add('modal');
      div.innerHTML = `<div class="wrapper">
      <div class="modal-image">
      <figure>
      <img>
      </figure>
      </div>
      <span class="close-btn">Close</span>
      </div>`
      arrivalSection.append(div);
      var modal = document.querySelector('.modal');
      var modalImage = document.querySelector('.modal-image figure img');
      var closeBtn = document.querySelector('.close-btn');
      modalImage.src = img.src;
      console.log(img);

      window.addEventListener('keydown', function (e) {
        if (e.key == "Escape") {
          closeModal();
        }
      })

      // Event on Beside Image to close Modal
      modal.addEventListener('click', function () {
        closeModal();
      })

      // Event on Image to stop for closing a Modal
      modalImage.addEventListener('click', function (e) {
        e.stopPropagation();
      })

      // Event on button to close a Modal
      closeBtn.addEventListener('click', function () {
        closeModal();
      })

      // Function for Closing a modal
      function closeModal() {
        var modal = document.querySelector('.modal');
        modal.style.display = "none";
        div.remove();
      }
    })
  })
}
// Modal Function End



if (document.body.classList.contains("home-page")) {
  sliderFunction();
  modalFunction();

} else if (document.body.classList.contains("contact-page")) {

} else if (document.body.classList.contains("product-page")) {

}