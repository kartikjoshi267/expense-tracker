const formatDate = (date: Date) => {
  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  return formattedDate;
}

export default formatDate;