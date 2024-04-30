const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} hari lalu`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} jam lalu`;
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} menit lalu`;
  }

  return `${Math.floor(seconds)} detik lalu`;
};

export { formatDate };
