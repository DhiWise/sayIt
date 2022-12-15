import React from "react";

import { Column, Row, Button, Img, Text, Line } from "components";

const Header5 = (props) => {
  return (
    <>
      <header className={props.className}>
        <Column className="items-center justify-start w-[100%]">
          <Column className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[51%]">
            <Row className="md:flex-wrap sm:flex-wrap w-[100%]">
              <ul className="">
                <li className="w-[auto] sm:w-[100%] sm:my-[10px]">
                  <a
                    href={"javascript:"}
                    className="hover:bg-purple_200 cursor-pointer font-inter hover:font-medium font-semibold hover:justify-center text-[18px] text-bluegray_900"
                    rel="noreferrer"
                  >
                    DhIWIse
                  </a>
                </li>
                <li className="w-[5%] sm:w-[100%] sm:my-[10px] flex items-center justify-center">
                  <Button
                    className="flex sm:h-[16px] md:h-[21px] h-[40px] items-center justify-center rounded-radius50"
                    size="mdIcn"
                    variant="icbFillGray104"
                  >
                    <Img
                      src="images/img_group2.svg"
                      className="h-[24px] sm:h-[10px] md:h-[13px] flex items-center justify-center"
                      alt="GroupTwo"
                    />
                  </Button>
                </li>
                <li className="w-[auto] sm:w-[100%] sm:my-[10px]">
                  <a
                    href={"javascript:"}
                    className="hover:font-medium hover:text-bluegray_900 rowSayItLogo2"
                    rel="noreferrer"
                  >
                    K
                  </a>
                </li>
              </ul>
            </Row>
            <Row className="md:flex-wrap sm:flex-wrap items-center md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[35%]">
              <Row className="md:flex-wrap sm:flex-wrap items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[30%]">
                <Img
                  src="images/img_frame413_20X20.svg"
                  className="plusOutline"
                  alt="Frame413"
                />
                <Text className="rowframe4131" variant="body3">
                  ROADMAP
                </Text>
              </Row>
              <Row className="md:flex-wrap sm:flex-wrap items-start justify-between md:ml-[18px] ml-[36px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[60%]">
                <Img
                  src="images/img_lightbulbalto_20X20.svg"
                  className="settingSolid"
                  alt="lightbulbaltO"
                />
                <Text className="rowlightbulbalto1" variant="body3">
                  PRODUCT FEEDBACK
                </Text>
                <Img
                  src="images/img_arrowdown_bluegray_402.svg"
                  className="settingSolid"
                  alt="arrowdown"
                />
              </Row>
            </Row>
          </Column>
          <Line className="bg-bluegray_100 h-[1px] md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]" />
        </Column>
      </header>
    </>
  );
};

export default Header5;
