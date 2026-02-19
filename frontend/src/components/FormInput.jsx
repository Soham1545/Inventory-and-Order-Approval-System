import { useState } from 'react';
import { Eye, EyeOff, ShieldAlert } from 'lucide-react';

const FormInput = ({
  label = "",
  name = "",
  type = "text",
  placeholder = "",
  options = [],
  value = "",
  onChange = () => {},
  onBlur = () => {},
  error = "",
  flex = "column",
  touched = false,
  required = false,
  disabled= false
}) => {
  const hasError = touched && !!error;
  const baseClasses = ` ${hasError ? 'border-red-500 border-2' : 'border-border-grey'} focus:font-semibold placeholder-font-grey font-medium w-full rounded-sm border p-2 text-sm `;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`flex w-full ${flex === "column" ? "flex-col" : ""} gap-1.5`}>
      <label htmlFor={name} className="text-sm font-bold text-nowrap items-center flex">
        {label} {required && <span className="mr-1 text-red-500">*</span>}
      </label>

      {type === 'password' ? (
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={baseClasses}
          />
          <span
            className="text-font-grey focus:text-midnight absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </span>
        </div>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          placeholder={placeholder}
          name={name}
          className={`${baseClasses} min-h-32`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : type === 'dropdown' ? (
        <select
          id={name}
          name={name}
          className={baseClasses}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white">
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          id={name}
          name={name}
          className={baseClasses}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
      )}
      {touched && error && (
        <div className="mt-1 flex items-center text-xs font-semibold text-red-500">
          <ShieldAlert size={20} /> <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormInput;
