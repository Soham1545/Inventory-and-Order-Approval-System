const getTextColor = (category) => {
  if (category === "electronics") return "text-blue-500";
  if (category === "household") return "text-green-500";
  return "text-purple-500";
}

export default getTextColor;