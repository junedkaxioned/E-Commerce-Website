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

  // Events on Next Slide Button
  slideNextBtn.addEventListener('click', function () {
    slider.scrollLeft += containerWidth;
  })
  // Events on Previous Slide Button
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
        </div>
      `
      arrivalSection.append(div);
      html.classList.add('stop-scroll')
      var modal = document.querySelector('.modal');
      var modalImage = document.querySelector('.modal-image figure img');
      var closeBtn = document.querySelector('.close-btn');
      modalImage.src = img.src;

      // Event on Escape Button to close modal
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
        html.classList.remove('stop-scroll')
      }
    })
  })
}
// Modal Function End

// Form Validation Function start
function formValidation() {
  var fisrtName = document.querySelector('.first-name');
  var lastName = document.querySelector('.last-name');
  var email = document.querySelector('.email-address');
  var textarea = document.querySelector('.textarea');
  var form = document.querySelector('.form-contact');
  var inputs = document.querySelectorAll('.input');
  var submitButton = document.querySelector('.submit');
  var nameReg = /^[a-zA-Z]+$/;
  var emailReg = /^([A-Za-z][A-Za-z0-9\-\_\.]+[A-Za-z0-9])\@([A-Za-z]{2,})\.([A-Za-z]{2,})$/;
  var messageReg = /^([a-zA-Z0-9][a-zA-Z0-9@\s /-]+)$/;

  // Function for getting inputs and removing error (blur)
  inputs.forEach(function (input) {
    input.addEventListener('blur', function () {
      formErrors(input);
    })
    input.addEventListener('keyup', function () {
      formErrors(input);
    })
  })

  // function for Error
  function formErrors(input) {
    var inputError = input.parentElement.children[1];

    // Conditon for input error
    if (!input.value) {
      // input form
      inputError.classList.add('show')
      inputError.innerText = "Enter Your " + input.name;
    } else {
      inputError.classList.remove('show')

      // VALIDATION
      // Condition for Address
      if (input.name == "Email Address") {
        if (emailReg.test(input.value)) {
          inputError.classList.remove('show')
        } else {
          inputError.classList.add('show')
          inputError.innerText = "Email must be in abcd@abcd.abc";
        }
      } else if (input.name == "Message") {
        if (messageReg.test(input.value)) {
          inputError.classList.remove('show')
        } else {
          inputError.classList.add('show')
          inputError.innerText = "Symbols are Not Allowed";
        }
      } else {
        // Condition for Names
        if (nameReg.test(input.value)) {
          inputError.classList.remove('show')
        } else {
          inputError.classList.add('show')
          inputError.innerText = "Numbers and Symbol Not Allowed";
        }
      }
    }
  }

  // Events on Submit button
  submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    var activeError = form.querySelectorAll('.show');
    var formDiv = document.querySelector('.contact-left')

    // Conditon for input in filled or not
    if (fisrtName.value && email.value && textarea.value && lastName.value && (activeError.length === 0)) {
      var div = document.createElement('div');
      div.classList.add('sucessMessage');
      div.innerHTML = `
          <span class="section-heading success-text">Form Submited</span>
          <p class ="text">Thank you for filling out your information!</p>
        `
      formDiv.append(div);
      var sucessMessage = document.querySelector('.sucessMessage');
      setTimeout(function () {
        sucessMessage.remove();
      }, 2000);
      form.reset();
    } else {
      inputs.forEach(function (input) {
        formErrors(input);
      })
    }
  })

}
// Form Validation Function End

// Product Page Functions Start
function productPageFunctions() {

  var catUrl = location.href.split("?");
  var products = document.querySelectorAll('.product');
  var breadcrumb = document.querySelector('.all-pro-breadcrumb');
  var catHead = document.querySelector('.categories-heading');
  var resultCount = document.querySelector('.result-number');
  var searchForm = document.querySelector('.search-form');
  var searchInput = document.querySelector('.search');
  var filterForm = document.querySelector('.filter-form');
  var thumbsize = 14;
  var min = filterForm.querySelector('.min');
  var max = filterForm.querySelector('.max');
  var rangemin = parseInt(min.getAttribute('min'));
  var rangemax = parseInt(max.getAttribute('max'));
  var avgvalue = (rangemin + rangemax) / 2;

  breadcrumb.innerText = catUrl[1];
  catHead.innerText = catUrl[1];
  Object.assign(breadcrumb, { "href": location.href, "title": catUrl[1], })

  // Filter By Category Functions
  products.forEach(function (product) {
    var dataCat = product.getAttribute('data-target');
    if (dataCat === catUrl[1]) {
      if (product.classList.contains("product-active")) {
        product.classList.remove('product-active');
      }
      product.classList.add("product-active");
      var productActive = document.querySelectorAll('.product-active');
      resultCount.innerText = productActive.length;
    } else if (!catUrl[1]) {
      product.classList.add('product-active');
      breadcrumb.innerText = "All Product";
      breadcrumb.setAttribute("title", "All Product");
      catHead.innerText = "All Product";
      resultCount.innerText = products.length;
    }
  })

  // Search Functionality
  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (searchInput.value) {
      products.forEach(function (product) {
        var dataCat = product.getAttribute('data-target');
        var productName = product.querySelector('.product-name').innerText;
        if (dataCat === catUrl[1] || !catUrl[1]) {
          if (product.classList.contains("product-active")) {
            product.classList.remove('product-active');
          }
          if (productName.toLowerCase().match(searchInput.value.toLowerCase())) {
            product.classList.add("product-active");
          }
          var productActive = document.querySelectorAll('.product-active');
          resultCount.innerText = productActive.length;
        }
      })
    }
  })

  // Function for getting Min Max Price
  function draw(slider, splitvalue) {
    var min = slider.querySelector('.min');
    var max = slider.querySelector('.max');
    var lower = slider.querySelector('.min-price');
    var upper = slider.querySelector('.max-price');
    var thumbsize = parseInt(slider.getAttribute('data-thumbsize'));
    var rangewidth = parseInt(slider.getAttribute('data-rangewidth'));
    var rangemin = parseInt(slider.getAttribute('data-rangemin'));
    var rangemax = parseInt(slider.getAttribute('data-rangemax'));
    var minWidthCondition = thumbsize + ((splitvalue - rangemin) / (rangemax - rangemin)) * (rangewidth - (2 * thumbsize));
    var maxWidthCondition = thumbsize + ((rangemax - splitvalue) / (rangemax - rangemin)) * (rangewidth - (2 * thumbsize));
    /* set min and max attributes */
    min.setAttribute('max', splitvalue);
    max.setAttribute('min', splitvalue);
    /* set css */
    min.style.width = parseInt(minWidthCondition) + 'px';
    max.style.width = parseInt(maxWidthCondition) + 'px';
    min.style.left = '0px';
    max.style.left = parseInt(min.style.width) + 'px';
    /* correct for 1 off at the end */
    if (max.value > (rangemax - 1)) max.setAttribute('data-value', rangemax);
    /* Value of min and max price */
    max.value = max.getAttribute('data-value');
    min.value = min.getAttribute('data-value');
    lower.innerText = min.getAttribute('data-value');
    upper.innerText = max.getAttribute('data-value');
  }

  /* Seting data-value */
  min.setAttribute('data-value', rangemin);
  max.setAttribute('data-value', rangemax);
  /* Seting data vars */
  filterForm.setAttribute('data-rangemin', rangemin);
  filterForm.setAttribute('data-rangemax', rangemax);
  filterForm.setAttribute('data-thumbsize', thumbsize);
  filterForm.setAttribute('data-rangewidth', filterForm.offsetWidth);
  /* Dynamic price */
  var lower = filterForm.querySelector('.min-price');
  var upper = filterForm.querySelector('.max-price');
  lower.classList.add('lower', 'value');
  upper.classList.add('upper', 'value');
  lower.innerText = rangemin;
  upper.innerText = rangemax;
  draw(filterForm, avgvalue);
  /* Events on inputs*/
  min.addEventListener("input", function () { update(min); });
  max.addEventListener("input", function () { update(max); });

  function update(el) {
    var slider = el.parentElement.parentElement;
    var min = slider.querySelector('.min');
    var max = slider.querySelector('.max');
    var minvalue = Math.floor(min.value);
    var maxvalue = Math.floor(max.value);
    /* Seting inactive values before draw */
    min.setAttribute('data-value', minvalue);
    max.setAttribute('data-value', maxvalue);
    var avgvalue = (minvalue + maxvalue) / 2;
    /* Draw */
    draw(slider, avgvalue);
  }

  // Filter By Price on Submit Function
  filterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var minPrice = Number(filterForm.querySelector('.min-price').innerText);
    var maxPrice = Number(filterForm.querySelector('.max-price').innerText);

    products.forEach(function (product) {
      var minProduct = Number(product.getAttribute("data-min"));
      var maxProduct = Number(product.getAttribute("data-max"));
      var dataCat = product.getAttribute('data-target');
      var minProductCondition = (minProduct >= minPrice) && (minProduct <= maxPrice);
      var maxProductCondition = (maxProduct >= minPrice) && (maxProduct <= maxPrice);
      var conditionValid = ( minProductCondition || maxProductCondition) && ((dataCat == catUrl[1]) || !catUrl[1]);
      // Checking Condition
      if (conditionValid) {
        product.classList.add('product-active');
      } else {
        product.classList.remove('product-active');
      }
      var productActive = document.querySelectorAll('.product-active');
      resultCount.innerText = productActive.length;
    })
  })
}
// Product Page Functions End


if (document.body.classList.contains("home-page")) {
  sliderFunction();
  modalFunction();

} else if (document.body.classList.contains("contact-page")) {
  formValidation();

} else if (document.body.classList.contains("product-page")) {
  productPageFunctions();
}