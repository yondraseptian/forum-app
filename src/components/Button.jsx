import PropTypes from "prop-types";
export const Button = ({ children, className, onClick, disabled }) => {
  return (
    <div>
      <button className={className} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </div>
  );
};

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
