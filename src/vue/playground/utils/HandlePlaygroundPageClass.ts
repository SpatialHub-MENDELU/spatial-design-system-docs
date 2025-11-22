export const handlePlaygroundPageClass = `
  if (window && window.navigation) {
    window.navigation.addEventListener("navigate", (event) => {
      if (event.downloadRequest !== 'file_structure.zip') {
        addPlaygroundClass(event);
      }
    });
  } else {
    window.addEventListener("popstate", (event) => {
      addPlaygroundClass(event);
    });

    window.addEventListener("hashchange", (event) => {
      addPlaygroundClass(event);
    });
  }

  window.addEventListener("beforeunload", (event) => {
    addPlaygroundClass({ destination: { url: event.currentTarget.location.href } });
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
