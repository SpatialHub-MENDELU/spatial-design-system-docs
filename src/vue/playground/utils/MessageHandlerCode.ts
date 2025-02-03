import { ProjectType } from '../types/projectType';

export const getMessageHandlerCode = (projectType: ProjectType): string => {
  switch (projectType) {
    case 'vanilla':
      return `
        <script>
          window.addEventListener('message', (event) => {
            if (event.origin === 'http://localhost:5174' || event.origin === 'https://sds.spatialhub.cz') {
              if (event.data.type === 'getDocument') {
                const iframeContent = document.body.innerHTML;
                event.source.postMessage({ type: 'iframeContent', content: iframeContent }, event.origin);
              }
            } else {
              return;
            }
          });
        </script>
      `;
    case 'vue':
      return `
      import { onMounted } from 'vue';

      onMounted(() => {
        window.addEventListener('message', (event) => {
          if (event.origin === 'http://localhost:5174' || event.origin === 'https://sds.spatialhub.cz') {
            if (event.data.type === 'getDocument') {
              const iframeContent = document.body.innerHTML;
              event.source.postMessage({ type: 'iframeContent', content: iframeContent }, event.origin);
            }
          } else {
            return;
          }
        })
      })
      `;
    default:
      throw new Error('Unsupported project type');
  }
};
