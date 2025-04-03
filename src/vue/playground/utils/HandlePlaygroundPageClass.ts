export const handlePlaygroundPageClass = `
  window.addEventListener("beforeunload", (event) => {
    addPlaygroundClass({ destination: { url: event.currentTarget.location.href } });
  });

  window.navigation.addEventListener("navigate", (event) => {
    addPlaygroundClass(event);
  });

  window.addEventListener("popstate", () => {
    addPlaygroundClass({ destination: { url: window.location.href } });
  });

  function addPlaygroundClass(event) {
    showLoadingIndicator();
    const newPathname = new URL(event.destination?.url).pathname;

    if (newPathname.includes('playground')) {
      document.body.classList.add('playground-page');
    } else {
      document.body.classList.remove('playground-page');
    }

    hideLoadingIndicator();
  }

  window.addEventListener('load', () => addPlaygroundClass({ destination: { url: window.location.href } }));

  function showLoadingIndicator() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('loading');
    loadingElement.innerHTML = \`<div class="loading-spinner"></div>\`;
    document.body.appendChild(loadingElement);
  }

  function hideLoadingIndicator() {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
      loadingElement.remove();
    } 
  }
`
