import { ProjectType } from '../types/projectType';

export const getMessageHandlerCode = (projectType: ProjectType): string => {
  switch (projectType) {
    case 'vanilla':
      return `
        <script>
          window.addEventListener('message', (event) => {
            if (['http://localhost:5174', 'https://sds.spatialhub.cz', 'http://localhost:8081'].includes(event.origin)) {
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
          if (['http://localhost:5174', 'https://sds.spatialhub.cz', 'http://localhost:8081'].includes(event.origin)) {
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
