<<<<<<< HEAD
function Gallery(gallery) {
  if (!gallery) {
    throw new Error('Gallery does not exist');
  }
  // Select the elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  console.log(images);

  // Select modal
  const modal = document.querySelector('.modal');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentImage;

  function openModal() {
    console.info('Opening modal...');
    // First check if if the modal is already open
    if (modal.matches('.open')) {
      console.log('Modal is already open');
      return;
    }
    modal.classList.add('open');

    // Event listeners to be bound when we open the modal
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    // TODO: Add eventlistener for clicks and keyboard
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    console.log(`e target${e.target}`);
    console.log(`e currentTarget${e.currentTarget}`);

    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'Escape') return closeModal();
    if (event.key === 'ArrowRight') return showNextImage();
    if (event.key === 'ArrowLeft') return showPrevImage();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);

  }


  function showImage(el) {
    if (!el) {
      console.info('No image to show');
      return;
    }
    // Update the modal with this image and info
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }
  // These are our eventlisteners

  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );

  // loop over each image
  images.forEach(image => {
    // attach an event listener for each image
    image.addEventListener('keyup', e => {
      // when that is keyup'd, check if it was enter
      if (e.key === 'Enter') {
        // if it was, show that image
        showImage(e.currentTarget);
      }
    });
  });

  modal.addEventListener('click', handleClickOutside);


}

// Use it on the page
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));

=======
>>>>>>> ee3bf6f8359f1de6c6a484a5af137fee75f68a4a
