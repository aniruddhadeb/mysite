// Get all tab buttons and panels
const tabButtons = document.querySelectorAll('[role="tab"]');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');

// Function to deactivate all tabs
function deactivateAllTabs() {
  tabButtons.forEach(button => {
    button.setAttribute('aria-selected', 'false');
    button.setAttribute('data-state', 'inactive');
    button.setAttribute('tabindex', '-1');
  });

  tabPanels.forEach(panel => {
    // Add fade out animation
    panel.style.animation = 'fadeOut 0.2s ease-out';

    setTimeout(() => {
      panel.setAttribute('data-state', 'inactive');
      panel.setAttribute('hidden', '');
      panel.style.animation = '';
    }, 200);
  });
}

// Function to activate a specific tab
function activateTab(button) {
  const panelId = button.getAttribute('aria-controls');
  const panel = document.getElementById(panelId);

  // Deactivate all tabs first
  deactivateAllTabs();

  // Activate the selected tab
  button.setAttribute('aria-selected', 'true');
  button.setAttribute('data-state', 'active');
  button.setAttribute('tabindex', '0');

  // Show the associated panel with animation
  if (panel) {
    setTimeout(() => {
      panel.setAttribute('data-state', 'active');
      panel.removeAttribute('hidden');
      panel.style.animation = 'fadeIn 0.3s ease-in';
    }, 200);
  }
}

// Add click event listeners to all tab buttons
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    activateTab(button);
  });

  // Add keyboard navigation
  button.addEventListener('keydown', (e) => {
    const currentIndex = Array.from(tabButtons).indexOf(button);
    let nextIndex;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = (currentIndex + 1) % tabButtons.length;
        tabButtons[nextIndex].focus();
        activateTab(tabButtons[nextIndex]);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
        tabButtons[nextIndex].focus();
        activateTab(tabButtons[nextIndex]);
        break;
      case 'Home':
        e.preventDefault();
        tabButtons[0].focus();
        activateTab(tabButtons[0]);
        break;
      case 'End':
        e.preventDefault();
        tabButtons[tabButtons.length - 1].focus();
        activateTab(tabButtons[tabButtons.length - 1]);
        break;
    }
  });
});

// Initialize - ensure the first tab is active on load
if (tabButtons.length > 0) {
  activateTab(tabButtons[0]);
}

// Function to download resume
document.getElementById("downloadResumeBtn").addEventListener("click", function () {
    const fileUrl = 'https://aniruddhadeb.me/assets/Aniruddha_Deb_Angular_Developer.pdf';
  window.open(fileUrl, '_blank');
});


