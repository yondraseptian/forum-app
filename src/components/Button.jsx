/* eslint-disable linebreak-style */
/* eslint-disable react/require-default-props */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/button-has-type */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

export function Button({
  children, className, onClick, disabled,
}) {
  return (
    <div>
      <button className={className} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </div>
  );
}

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
