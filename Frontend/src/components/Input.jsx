export const Input = ({ setFunction, ...props }) => {
  return (
    <div className="w-full">
      <input
        {...props}
      
        onChange={(e) => {
          setFunction(e.target.value);
        }}
      />
    </div>
  );
};
