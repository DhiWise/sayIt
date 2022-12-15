import React from "react";
import PropTypes from "prop-types";

const shapes = {
  RoundedBorder6: "rounded-radius6",
  CustomBorderTL4:
    "rounded-bl-[4px] rounded-br-[0] rounded-tl-[4px] rounded-tr-[0]",
  CustomBorderLR4:
    "rounded-bl-[0] rounded-br-[4px] rounded-tl-[0] rounded-tr-[4px]",
  CircleBorder12: "rounded-radius1273",
  CircleBorder33: "rounded-radius3309",
  icbRoundedBorder4: "rounded-radius4",
  icbCircleBorder8: "rounded-radius8",
  icbCircleBorder20: "rounded-radius20",
};
const variants = {
  FillIndigoA201: "bg-indigo_A201 text-white_A700",
  FillLightgreenA700: "bg-light_green_A700 text-white_A700",
  OutlineGray302:
    "bg-gray_302 outline outline-[0.5px] outline-gray_302 text-bluegray_401",
  OutlineBluegray100:
    "outline outline-[0.5px] outline-bluegray_100 text-bluegray_401",
  OutlineBluegray700:
    "border border-bluegray_700 border-solid text-bluegray_700",
  FillIndigo100: "bg-indigo_100 text-white_A700",
  FillGreen400: "bg-green_400 text-white_A700",
  OutlineBluegray50: "bg-white_A700 border border-bluegray_50 border-solid",
  FillPurple200: "bg-purple_200 text-white_A700",
  icbOutlineBluegray100: "border border-bluegray_100 border-solid",
  icbOutlineIndigoA201: "bg-gray_201 border border-indigo_A201 border-solid",
  icbOutlineWhiteA700: "bg-indigo_A201 border border-solid border-white_A700",
  icbFillWhiteA70033: "bg-white_A700_33",
  icbFillGray104: "bg-gray_104",
  icbOutlineBluegray100_1:
    "bg-white_A700 border border-bluegray_100 border-solid",
};
const sizes = {
  sm: "p-[4px]",
  md: "sm:p-[3px] md:p-[4px] p-[8px]",
  lg: "p-[12px] sm:p-[4px] md:p-[6px]",
  xl: "p-[18px] md:p-[9px] sm:px-[15px] sm:py-[7px]",
  "2xl": "md:p-[12px] p-[24px] sm:px-[15px] sm:py-[9px]",
  smIcn: "p-[2px]",
  mdIcn: "sm:p-[3px] md:p-[4px] p-[8px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant,
  size,
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${shapes[shape] || ""} ${
        variants[variant] || ""
      } ${sizes[size] || ""} common-button `}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf([
    "RoundedBorder6",
    "CustomBorderTL4",
    "CustomBorderLR4",
    "CircleBorder12",
    "CircleBorder33",
    "icbRoundedBorder4",
    "icbCircleBorder8",
    "icbCircleBorder20",
  ]),
  variant: PropTypes.oneOf([
    "FillIndigoA201",
    "FillLightgreenA700",
    "OutlineGray302",
    "OutlineBluegray100",
    "OutlineBluegray700",
    "FillIndigo100",
    "FillGreen400",
    "OutlineBluegray50",
    "FillPurple200",
    "icbOutlineBluegray100",
    "icbOutlineIndigoA201",
    "icbOutlineWhiteA700",
    "icbFillWhiteA70033",
    "icbFillGray104",
    "icbOutlineBluegray100_1",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "2xl", "smIcn", "mdIcn"]),
};
Button.defaultProps = { className: "", shape: "", variant: "", size: "" };

export { Button };
