export const formatSize = (bytes: number, $primevue) => {
  
  const k = 1024;
  const dm = 3;
  const sizes = $primevue.config.locale?.fileSizeTypes;

  if (bytes === 0 && sizes) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize} ${sizes ? sizes[i] : ''}`;
};
