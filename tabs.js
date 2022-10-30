const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
let tabFocus = 0;
const keydownLeft = 'ArrowLeft';
const keydownRight = 'ArrowRight';

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener('click', changeTabPanel);
});

function changeTabFocus(e) {
  // change the tabindex of the current tab to -1
  if (e.key === keydownLeft || e.key === keydownRight) {
    tabs[tabFocus].setAttribute('tabindex', -1);

    // select the next tab when the right arrowkey is pressed
    if (e.key === keydownRight) {
      tabFocus++;
      // move to the first tab when at the last tab
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else {
      tabFocus--;
      // move to the last tab when at the first tab
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }

    // makes the tab focusable
    tabs[tabFocus].setAttribute('tabindex', 0);
    // actually sets the tab as the focused tab
    tabs[tabFocus].focus();
  }
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute('aria-controls');
  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;
  const targetImage = targetTab.getAttribute('data-image');

  // sets the selected state of the previously active tab to false
  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute('aria-selected', false);

  // sets the selected state of the new active tab to true
  targetTab.setAttribute('aria-selected', true);

  // hides the tab contents for all tabs
  mainContainer
    .querySelectorAll('[role="tabpanel"]')
    .forEach((item) => item.setAttribute('hidden', true));

  // shows the tab content of the selected tab
  mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');

  // hides all of the images
  mainContainer
    .querySelectorAll('picture')
    .forEach((item) => item.style.setProperty('display', 'none'));

  //shows the image of the highlighted tab
  mainContainer
    .querySelector([`#${targetImage}`])
    .style.setProperty('display', 'inline');
}
