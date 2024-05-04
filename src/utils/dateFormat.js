const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const milliseconds = now - date;

  if (milliseconds < 1000) {
    return "Baru saja";
  }

  const seconds = Math.floor(milliseconds / 1000);

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

  return `${seconds} detik lalu`;
};

export { formatDate };
