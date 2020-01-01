/* eslint-disable prettier/prettier */
function Gallery(gallery) {
  if (!gallery) {
    throw new Error('Gallery does not exist');
  }
  this.gallery = gallery;

  // Select the elements we need
  this.images = Array.from(gallery.querySelectorAll('img'));

  // Select modal
  this.modal = document.querySelector('.modal');
  this.prevButton = document.querySelector('.prev');
  this.nextButton = document.querySelector('.next');

  // bind our methods to the instance when we need them
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  // These are our eventlisteners

  this.images.forEach(image =>
    image.addEventListener('click', e => this.showImage(e.currentTarget))
  );

  // loop over each image
  this.images.forEach(image => {
    // attach an event listener for each image
    image.addEventListener('keyup', e => {
      // when that is keyup'd, check if it was enter
      if (e.key === 'Enter') {
        // if it was, show that image
        this.showImage(e.currentTarget);
      }
    });
  });

  this.modal.addEventListener('click', this.handleClickOutside);
}

Gallery.prototype.openModal = function() {
  console.info('Opening modal...');
  // First check if if the modal is already open
  if (this.modal.matches('.open')) {
    console.log('Modal is already open');
    return;
  }
  this.modal.classList.add('open');

  // Event listeners to be bound when we open the modal
  window.addEventListener('keyup', this.handleKeyUp);
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
};

Gallery.prototype.closeModal = function() {
  this.modal.classList.remove('open');
  // TODO: Add eventlistener for clicks and keyboard
  window.removeEventListener('keyup', this.handleKeyUp);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
};

Gallery.prototype.handleClickOutside = function(e) {
  console.log(`e target${e.target}`);
  console.log(`e currentTarget${e.currentTarget}`);

  if (e.target === e.currentTarget) {
    this.closeModal();
  }
}


Gallery.prototype.handleKeyUp = function(event) {
  if (event.key === 'Escape') return this.closeModal();
  if (event.key === 'ArrowRight') return this.showNextImage();
  if (event.key === 'ArrowLeft') return this.showPrevImage();
};

Gallery.prototype.showNextImage = function() {
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild
  );
};

Gallery.prototype.showPrevImage = function() {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild
  );
};

Gallery.prototype.showImage = function(el) {
  if (!el) {
    console.info('No image to show');
    return;
  }
  // Update the modal with this image and info
  this.modal.querySelector('img').src = el.src;
  this.modal.querySelector('h2').textContent = el.title;
  this.modal.querySelector('figure p').textContent = el.dataset.description;
  this.currentImage = el;
  this.openModal();
};

// Use it on the page
const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1);