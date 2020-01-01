const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');
//const input = document.querySelector('#item');
// We need an array to hold our state
let items = [];

// Listen for submit events

function handleSubmit(event) {
  event.preventDefault();
  const name = event.currentTarget.item.value;
  // If empty do not submit
  if (!name) return;

  // Store the current item as an object in array
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };

  // Add item to the array
  items.push(item);

  console.log(`There are now ${items.length} in the list`);

  // Clear hthe form
  event.target.reset();

  //displayItems();
  // Fire of custom events if that will tell if the items have been updated
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  console.log(items);
  const html = items
    .map(
      item => `<li class="shopping-item">
  <input type="checkbox" value="${item.id}" ${item.complete ? 'checked' : ''}>
  <span class="itemName">${item.name}</span>
  <button aria-label="Remove ${item.name}" value="${item.id}">&times;</button>
  </li>`
    )
    .join('');
  list.innerHTML = html;
}

function toLocalStorage() {
  // Convert objet to JSON
  // Save to local storage
  localStorage.setItem('items', JSON.stringify(items));
  console.log('Saving to local storage');
}

function restoreFromLocalStorage() {
  console.info('Restoring from LS');
  // pull the items from LS
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    // items = lsItems;
    // lsItems.forEach(item => items.push(item));
    // items.push(lsItems[0], lsItems[1]);
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  console.log('DELETIENG ITEM', id);
  // update our items array without this one
  items = items.filter(item => item.id !== id);
  console.log(items);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
    console.log('Marking as complete', id);
    const itemRef = items.find(item => item.id === id);
    itemRef.complete = !itemRef.complete;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', toLocalStorage);
// Event Delegation: We listen or the click on the list <ul> but then delegate the click over to the button if that is what was clicked
list.addEventListener('click', function(e) {
    console.log(e.target);
  const id = parseInt(e.target.value);
  if (e.target.matches('button')) {
    deleteItem(id);
  }
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});
restoreFromLocalStorage();
