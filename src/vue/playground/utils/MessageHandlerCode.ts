import { ProjectType } from '../types/projectType';

export const getMessageHandlerCode = (projectType: ProjectType): string => {
  switch (projectType) {
    case 'vanilla':
      return `
        <script>
          window.addEventListener('message', (event) => {
            if (event.origin === 'http://localhost:5174') {
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
        <script>
          import { onMounted } from 'vue';
          onMounted(() => {
            window.addEventListener('message', (event) => {
              if (event.data === 'getDocument') {
                const iframeContent = document.body.innerHTML;
                event.source.postMessage({ type: 'iframeContent', content: iframeContent }, event.origin);
              }
            });
          });
        </script>
      `;
    default:
      throw new Error('Unsupported project type');
  }
};
