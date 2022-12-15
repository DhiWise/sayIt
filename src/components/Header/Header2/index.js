import React from "react";

import { Row, Img, Stack, Button, Text } from "components";

const Header2 = (props) => {
  return (
    <>
      <header className={props.className}>
        <Row className="bg-indigo_A201 md:p-[10px] sm:p-[15px] p-[20px] listpolygontwo">
          <Row className="md:flex-wrap sm:flex-wrap items-center ml-[12px] md:ml-[6px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[99%]">
            <Img
              src="images/Sayit-logo.svg"
              className="SayItLogo"
              alt="SayItLogo"
            />
            <Stack className="h-[35px] sm:ml-[19px] md:ml-[24px] ml-[48px] w-[20%]">
              <div className="absolute bg-indigo_500 sm:h-[14px] md:h-[19px] h-[35px] left-[27%] rounded-radius4 w-[25%]"></div>
              <Row className="absolute md:flex-wrap sm:flex-wrap inset-y-[23%] w-[100%]">
                <ul className="">
                  <li className="w-[auto] sm:w-[100%] sm:my-[10px]">
                    <a
                      href={"javascript:"}
                      className="rowfeedback3"
                      rel="noreferrer"
                    >
                      Feedback
                    </a>
                  </li>
                  <li className="w-[auto] sm:w-[100%] sm:my-[10px]">
                    <a
                      href={"javascript:"}
                      className="rowfeedback3"
                      rel="noreferrer"
                    >
                      Roadmap
                    </a>
                  </li>
                  <li className="w-[auto] sm:w-[100%] sm:my-[10px]">
                    <a
                      href={"javascript:"}
                      className="rowfeedback3"
                      rel="noreferrer"
                    >
                      Users
                    </a>
                  </li>
                  <li className="w-[auto] sm:w-[100%] sm:my-[10px]">
                    <a
                      href={"javascript:"}
                      className="rowfeedback3"
                      rel="noreferrer"
                    >
                      Changelog
                    </a>
                  </li>
                </ul>
              </Row>
            </Stack>
            <Button
              className="flex items-center justify-center ml-[1172px] sm:ml-[468px] md:ml-[604px] rounded-radius50 SayItLogo"
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
            <Text className="rowSayItLogo1" as="h6" variant="h6">
              K
            </Text>
          </Row>
        </Row>
      </header>
    </>
  );
};

export default Header2;
