import React from "react";

export const Img = ({
  className,
  src = "defaultNoData.png",
  alt = "",
  ...restProps
}) => {
  return (
    <img
      className={`${className} common-image`}
      src={src}
      alt={alt}
      {...restProps}
      loading={"lazy"}
    />
  );
};
