import { ErrorMessage } from "../../components/ErrorMessage";
import React from "react";
import PropTypes from "prop-types";

const variants = {
  OutlineBluegray100: "bg-white_A700 border border-bluegray_100 border-solid",
  OutlineBluegray50: "bg-white_A700 border border-bluegray_50 border-solid",
  OutlineBluegray101: "border border-bluegray_101 border-solid",
  FillBluegray50: "bg-bluegray_50",
  srcFillGray201: "bg-gray_201",
  srcUnderLineBluegray100: "border-b-[1px] border-bluegray_100",
  srcOutlineBluegray100:
    "bg-white_A700 border border-bluegray_100 border-solid",
};
const shapes = {
  RoundedBorder6: "rounded-radius6",
  srcRoundedBorder4: "rounded-radius4",
};
const sizes = {
  sm: "sm:p-[3px] md:p-[4px] p-[8px]",
  md: "p-[10px] sm:p-[3px] md:p-[5px]",
  lg: "sm:pb-[2px] md:pb-[3px] pb-[7px] pt-[12px] sm:pt-[4px] md:pt-[6px] sm:px-[2px] md:px-[3px] px-[7px]",
  xl: "p-[13px] sm:p-[5px] md:p-[6px]",
  "2xl": "p-[16px] md:p-[8px] sm:px-[15px] sm:py-[6px]",
  smSrc: "md:pb-[11px] pb-[22px] sm:pb-[8px] pt-[2px] px-[2px]",
  mdSrc: "sm:p-[1px] md:p-[2px] p-[5px]",
  lgSrc: "p-[16px] md:p-[8px] sm:px-[15px] sm:py-[6px]",
};

const Input = React.forwardRef(
  (
    {
      wrapClassName = "",
      className = "",
      name,
      placeholder,
      type = "text",
      children,
      errors = [],
      label = "",
      prefix,
      suffix,
      shape,
      variant,
      size,
      ...restProps
    },
    ref
  ) => {
    return (
      <>
        <div
          className={`${wrapClassName} ${shapes[shape] || ""} ${
            variants[variant] || ""
          } ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            className={`${className} bg-transparent border-0`}
            type={type}
            name={name}
            placeholder={placeholder}
            {...restProps}
          />
          {!!suffix && suffix}
        </div>
        {!!errors && <ErrorMessage errors={errors} />}
      </>
    );
  }
);

Input.propTypes = {
  wrapClassName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  shape: PropTypes.oneOf(["RoundedBorder6", "srcRoundedBorder4"]),
  variant: PropTypes.oneOf([
    "OutlineBluegray100",
    "OutlineBluegray50",
    "OutlineBluegray101",
    "FillBluegray50",
    "srcFillGray201",
    "srcUnderLineBluegray100",
    "srcOutlineBluegray100",
  ]),
  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "smSrc",
    "mdSrc",
    "lgSrc",
  ]),
};
Input.defaultProps = {
  wrapClassName: "",
  className: "",
  name: "",
  placeholder: "",
  type: "text",
  shape: "",
  variant: "OutlineBluegray100",
  size: "",
};

export { Input };
