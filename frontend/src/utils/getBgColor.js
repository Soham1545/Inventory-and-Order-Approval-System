const getBgColor = (category) => {
  if (category === "electronics") return "bg-blue-100";
  if (category === "household") return "bg-green-100";
  return "bg-purple-100";
}

export default getBgColor;