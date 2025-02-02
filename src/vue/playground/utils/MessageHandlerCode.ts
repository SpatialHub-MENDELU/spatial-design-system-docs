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
      import { onMounted } from 'vue';

      onMounted(() => {
        window.addEventListener('message', (event) => {
          if (event.origin === 'http://localhost:5174') {
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

export const getErrorHandlerCode = (projectType: ProjectType): string => {
  switch (projectType) {
    case 'vanilla':
      return `
        <script>
          window.addEventListener('error', (event) => {
            window.parent.postMessage({ type: 'error', content: event })
          });
        </script>
      `;
    case 'vue':
      return `
      import { onMounted } from 'vue';

      onMounted(() => {
        window.addEventListener('error', (event) => {
          window.parent.postMessage({ type: 'error', content: event })
        });
      })
      `;
    default:
      throw new Error('Unsupported project type');
  }
};
