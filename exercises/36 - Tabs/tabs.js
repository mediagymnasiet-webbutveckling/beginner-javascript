const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
//const tabPanels = tabs.querySelectorAll('[role="tabpanel"]');
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));


function handleTabClick(event) {
  // Hide all tabs panels
  tabPanels.forEach(panel => {
    panel.hidden = true;
  });

  // Mark all tabs as unselected
  tabButtons.forEach(tab => {
    tab.setAttribute('aria-selected', false);
  });

  // Mark the clicked tab as selected
  event.currentTarget.setAttribute('aria-selected', true);

  // Find the associated tabPanel and show it!
  // Method 1
  const { id } = event.currentTarget;
  // const tabPanel = document.querySelector(`[aria-labelledby="${id}"]`); 
  // Method 2
  const tabPanel = tabPanels.find(
    panel => panel.getAttribute('aria-labelledby') === id
  );

  tabPanel.hidden = false;
}

tabButtons.forEach(button => button.addEventListener('click', handleTabClick));
