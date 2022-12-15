import React from "react";

import {
  Column,
  Row,
  Button,
  Img,
  Text,
  Input,
  TextArea,
  List,
  Footer,
} from "components";
import { CloseSVG } from "../../assets/images/index.js";
import Header3 from "components/Header/Header3/index.js";
let imageUploadedCount = 0;
const UsercreatepostPage = () => {


  return (
    <>
      <Column className="bg-white_A700 font-inter items-center justify-start mx-[auto] py-[10px] sm:py-[5px] md:py-[5px] w-[100%]">
        <Column className="items-center justify-start w-[100%]">

          <Header3
            className="w-[100%]"
          />
          <Row className="md:flex-wrap sm:flex-wrap items-start justify-center max-w-[991px] sm:max-w-[100%] md:max-w-[100%] md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] mx-[auto] sm:px-[15px] px-[30px]  w-[100%]">
            <Column className="bg-gray_103 items-center justify-start mb-[130px] sm:mb-[51px] md:mb-[67px] mt-[11px] sm:mt-[4px] md:mt-[5px] sm:mx-[0] sm:p-[15px] p-[16px] md:p-[8px] rounded-radius4 sm:w-[100%] w-[31%] block sm:hidden">
              <Column className="items-center justify-start sm:px-[0] w-[100%]">
                <Text
                  className="font-medium text-bluegray_900 w-[auto]"
                  as="h6"
                  variant="h6"
                >
                  Create a Post
                </Text>
                <Column className="items-center justify-start sm:mt-[3px] md:mt-[4px] mt-[9px] w-[100%]">
                  <Column className="items-center justify-start sm:pt-[1px] md:pt-[2px] pt-[5px] w-[100%]">
                    <Column className="justify-start w-[100%]">
                      <Text
                        className="font-semibold text-bluegray_402 w-[auto]"
                        variant="body3"
                      >
                        TITLE
                      </Text>
                      <Input
                        className="font-medium p-[0] text-[14px] placeholder:text-bluegray_100 text-black w-[100%]"
                        wrapClassName="md:mt-[5px] mt-[10px] sm:mt-[3px] w-[100%]"
                        name="InputField"
                        placeholder="Short, Descriptive title"
                        shape="RoundedBorder6"
                        size="xl"
                      ></Input>
                    </Column>
                    <Column className="justify-start md:mt-[10px] mt-[21px] sm:mt-[8px] w-[100%]">
                      <Text
                        className="font-semibold text-bluegray_402 w-[auto]"
                        variant="body3"
                      >
                        DETAILS
                      </Text>
                      <TextArea
                        className="font-medium mt-[10px] sm:mt-[3px] md:mt-[5px] text-[14px] placeholder:text-bluegray_100 text-black w-[100%]"
                        name="inputfield One"
                        placeholder="Any Additional details..."
                      ></TextArea>
                    </Column>
                  </Column>
                  <Row className="mt-[16px] sm:mt-[6px] md:mt-[8px] listrequest">
                    <label className="w-15 flex flex-col items-center px-2 py-3 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                      />
                    </label>

                    <Button

                      className="font-semibold min-w-[45%] text-[14px] text-center w-[max-content]"
                      shape="RoundedBorder6"
                      size="lg"
                      variant="FillIndigoA201"
                    >
                      CREATE POST
                    </Button>
                  </Row>
                </Column>
              </Column>
            </Column>
            <Column className="items-center justify-start md:ml-[20px] ml-[40px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[66%]">
              <Row className="listrequest">
                <Row className="">
                  <Text
                    className="text-bluegray_402 w-[auto] mr-[10px]"
                    as=""
                    variant="body1"
                  >
                    Showing
                  </Text>
                  <Text
                    className="text-bluegray_402 w-[auto] ml-[10px]"
                    variant="body1"
                  >
                    Posts
                  </Text>
                </Row>
                <Input
                  className="font-normal not-italic p-[0] text-[14px] placeholder:text-bluegray_401 text-bluegray_401 w-[100%]"
                  wrapClassName="flex sm:mx-[0]"
                  name="search"
                  placeholder="Search..."
                  prefix={
                    <Img
                      src="images/img_search.svg"
                      className="cursor-pointer sm:mx-[3px] md:mx-[4px] my-[auto] mx-[8px]"
                      alt="search"
                    />
                  }
                  suffix={
                    <CloseSVG
                      color="#8a8a8a"
                      className="cursor-pointer ml-[10px] mr-[22px] sm:mr-[8px] sm:ml-[3px] md:mr-[11px] md:ml-[5px] my-[auto]"

                    />
                  }
                  shape="srcRoundedBorder4"
                  size="sm"
                  variant="srcOutlineBluegray100"
                ></Input>
              </Row>
              <List
                className="min-h-[auto] sm:mt-[13px] md:mt-[17px] mt-[34px] sm:w-[100%] w-[98%]"
                orientation="vertical"
              >
                <Column className="items-center justify-start w-[100%]">
                  <Row className="items-start justify-between w-[100%]  mb-[25px]">
                    <Column
                      className="border border-bluegray_50 border-solid items-center justify-start sm:px-[10px] p-[5px] sm:py-[3px] rounded-radius4  w-[45px] mr-[20px]"
                    >
                      <Img
                        src="images/img_polygon2_bluegray_105.svg"
                        className="sm:w-[100%] w-[57%]"
                        alt="PolygonTwo"
                      />
                      <Text
                        className="columnpolygontwo"
                        variant="body1"
                      >
                       1
                      </Text>
                    </Column>
                    <Column
                      className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[90%]"
                    >
                      <Row className="md:flex-wrap sm:flex-wrap items-start justify-between w-[100%]">
                        <Text
                          className="font-semibold text-bluegray_900 w-[auto]"
                          variant="body1"
                        >
                          Flutter: API response
                        </Text>
                      </Row>
                      <Text
                        className="text-cyan-600 font-semibold leading-[24.00px] md:leading-[normal] sm:leading-[normal] sm:mx-[0] not-italic text-bluegray_402 sm:w-[100%] w-[90%] mt-[5px]"
                        variant="body2"
                      >
                        In progress
                      </Text>
                      <Text
                        className="font-normal leading-[24.00px] md:leading-[normal] sm:leading-[normal] sm:mx-[0] not-italic text-bluegray_402 sm:w-[100%] w-[90%] mt-[5px]"
                        variant="body2"
                      >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      </Text>
                    </Column>
                    <Column>
                      <Row className="items-start justify-evenly sm:mx-[0] sm:px-[0]">
                        <Img
                          src="images/img_comment2.svg"
                          className="mt-[3px] mr-[5px]"
                          alt="commentTwo"
                        />
                        <Text
                          className="rowcommenttwo1"
                          variant="body1"
                        >
                         0
                        </Text>
                      </Row>
                    </Column>
                  </Row>
                </Column>
              </List>
            </Column>
          </Row>
        </Column>
      </Column>
      <Footer />
    </>
  );
};

export default UsercreatepostPage;