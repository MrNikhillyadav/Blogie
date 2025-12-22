export const getFormattedDate = (time : Date)=> {
  const createdAt = new Date(time);
  
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  
  return formattedDate;
}