const Button = ({ name, type = 'button' }) => {
  return (
    <button
      type={type}
      className="bg-primary w-full cursor-pointer rounded-lg px-3 py-2 font-medium text-white hover:bg-grey"
    >
      {name}
    </button>
  );
};

export default Button;