const crewList = document.querySelector('[role="dotlist"]');
const crewMembers = document.querySelectorAll('[role="dot"]');

let tabFocus = 0;

console.log(crewMembers);

crewList.addEventListener('keydown', changeTabFocus);

function changeTabFocus(e) {
  // change the aria-selected of the current element to false
  if (e.key === keydownLeft || e.key === keydownRight) {
    crewMembers[tabFocus].setAttribute('ariaSelected', 'false');

    // select the next tab when the right arrowkey is pressed
    if (e.key === keydownRight) {
      tabFocus++;
      // move to the first tab when at the last tab
      if (tabFocus >= crewMembers.length) {
        tabFocus = 0;
      }
    } else {
      tabFocus--;
      // move to the last tab when at the first tab
      if (tabFocus < 0) {
        tabFocus = crewMembers.length - 1;
      }
    }

    // makes the tab focusable
    crewMembers[tabFocus].setAttribute('ariaSelected', 'true');
    // actually sets the tab as the focused tab
    crewMembers[tabFocus].focus();
  }
}
