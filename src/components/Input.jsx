import PropTypes from "prop-types";

export const Input = ({ type, children, value, onChange, className }) => {
  return (
    <div className="flex flex-col">
      <label>{children}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={className}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
