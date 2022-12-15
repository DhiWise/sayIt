import React from "react";

import { Row, Img, Button, Text } from "components";


const Header = () => {
  return (
    <>
      <header className="w-[100%]">
        <Row className="bg-indigo_A200 md:p-[10px] sm:p-[15px] p-[20px] listpolygontwo">
          <Row className="max-w-[1856px] md:ml-[6px] sm:mx-[0] mx-[auto] sm:px-[15px] listpolygontwo">
            <Img
              src="images/Sayit-logo.svg"
              className="SayItLogo"
              alt="SayItLogo"
            />
            <Row className=" md:flex-wrap sm:flex-wrap inset-y-[23%] md:w-[25%]">
              <ul className="items-center justify-between">
                <li className="w-[auto] sm:w-[100%] sm:my-[10px] px-[10px]">
                  <a
                    href={"javascript:"}
                    className="rowfeedback"
                    rel="noreferrer"
                  >
                    Feedback
                  </a>
                </li>
                <li className="w-[auto] sm:w-[100%] sm:my-[10px] px-[10px]">
                  <a
                    href={"javascript:"}
                    className="rowfeedback"
                    rel="noreferrer"
                  >
                    Roadmap
                  </a>
                </li>
                <li className="w-[auto] sm:w-[100%] sm:my-[10px] px-[10px]">
                  <a
                    href={"javascript:"}
                    className="rowfeedback"
                    rel="noreferrer"
                  >
                    Users
                  </a>
                </li>
                <li className="w-[auto] sm:w-[100%] sm:my-[10px] px-[10px]">
                  <a
                    href={"javascript:"}
                    className="rowfeedback"
                    rel="noreferrer"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </Row>
            <Row className="absolute right-10">

              <Button
                className="flex items-center justify-center  rounded-radius50 SayItLogo"
                size="mdIcn"
                variant="icbFillWhiteA70033"
              >
                <Img
                  src="images/img_eye.svg"
                  className="h-[24px] sm:h-[10px] md:h-[13px] flex items-center justify-center"
                  alt="eye"
                />
              </Button>
              <Button
                className="flex items-center justify-center md:ml-[12px] ml-[24px] sm:ml-[9px] rounded-radius50 SayItLogo"
                size="mdIcn"
                variant="icbFillWhiteA70033"
              >
                <Img
                  src="images/img_lightening.svg"
                  className="h-[24px] sm:h-[10px] md:h-[13px] flex items-center justify-center"
                  alt="Lightening"
                />
              </Button>
              <Button
                className="flex items-center justify-center md:ml-[12px] ml-[24px] sm:ml-[9px] rounded-radius50 SayItLogo"
                size="mdIcn"
                variant="icbFillWhiteA70033"
              >
                <Img
                  src="images/img_bell.svg"
                  className="h-[24px] sm:h-[10px] md:h-[13px] flex items-center justify-center"
                  alt="Bell"
                />
              </Button>
              <Text className="rowSayItLogo" as="h5" variant="h5">
                K
              </Text>
            </Row>
          </Row>
        </Row>
      </header>
    </>
  );
};
export default Header;