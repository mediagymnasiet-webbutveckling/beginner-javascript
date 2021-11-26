<<<<<<< HEAD
function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  let tempPopup = popup;
  popup.classList.remove('open');
  await wait(1000);
  popup.remove();
  tempPopup = null;
}

function ask(options) {
  return new Promise(async function(resolve, reject) {
    // Create popup
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin',
      `<fieldset>
      <label>${options.title}</label>
      <input type="text" name="input"></input>
      <button type="submit">Submit</button>
      </fieldset>`
    );
    console.log(popup);
    // Check if they want cancel
    if (options.cancel) {
      const skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel';
      popup.firstElementChild.appendChild(skipButton);
      skipButton.addEventListener(
        'click',
        function() {
          resolve(null);
          destroyPopup(popup);
        },
        { once: true }
      );
    }
    // Submit event?
    popup.addEventListener(
      'submit',
      function(e) {
        e.preventDefault();
        resolve(e.target.input.value);
        destroyPopup(popup);
      },
      { once: true }
    );

    // Resolve the data in the input box

    // Insert the popup to the DOM
    document.body.appendChild(popup);
    await wait(50);
    popup.classList.add('open');
  });
}

// select all button that have a question
async function askQuestion(e) {
  const button = e.currentTarget;
  const cancel = 'cancel' in button.dataset;

  const answer = await ask({
    title: button.dataset.question,
    cancel,
  });
  console.log(answer);
}

const buttons = document.querySelectorAll('[data-question]');
buttons.forEach(button => button.addEventListener('click', askQuestion));

const questions = [
  { title: 'What is your name?' },
  { title: 'What is your age?', cancel: true },
  { title: 'What is your dogs name?' },
];

async function asyncMap(array, callback) {
  // make an array to store our results
  const results = [];
  // loop over our array
  for (const item of array) {
    results.push(await callback(item));
  }
  // when we are done the loop, return it!
  return results;
}

async function go() {
  const answers = await asyncMap(questions, ask);
  console.log(answers);
}

go();
  
=======
>>>>>>> ee3bf6f8359f1de6c6a484a5af137fee75f68a4a
