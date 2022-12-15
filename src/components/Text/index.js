import React from "react";
const variantClasses = {
  h1: "font-medium text-[7.2px]",
  h2: "sm:text-[20px] md:text-[22px] text-[24px]",
  h3: "font-medium sm:text-[18.5px] md:text-[20.5px] text-[22.5px]",
  h4: "font-semibold sm:text-[18px] md:text-[20px] text-[22px]",
  h5: "text-[20px]",
  h6: "text-[18px]",
  body1: "text-[16px]",
  body2: "font-medium text-[14.4px]",
  body3: "text-[14px]",
  body4: "text-[12px]",
  body5: "font-medium text-[10.8px]",
  body6: "font-normal text-[10px]",
};
const Text = ({ children, className, variant, as, ...restProps }) => {
  const Component = as || "span";
  return (
    <Component
      className={`${className} ${variantClasses[variant]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
