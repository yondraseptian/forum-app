/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

export function Input({
  type,
  children,
  value,
  onChange,
  className,
  placeholder,
}) {
  return (
    <div className="flex flex-col">
      <label>{children}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
