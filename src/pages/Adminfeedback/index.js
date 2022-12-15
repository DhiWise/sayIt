import React from "react";

import {
  Column,
  Row,
  Text,
  Img,
  Input,
  Button,
  List,
  CheckBox,
  Stack,
  Footer,
} from "components";

import Header from "components/Header/Header";
const AdminfeedbackPage = () => {


  return (
    <>
      <Header className="w-[100%]" />
      <Column className="bg-gray_50 font-inter items-center justify-start mx-[auto] w-[100%]">
        <Column className="items-center justify-start w-[100%] min-h-screen">
          <Row className="md:flex-wrap sm:flex-wrap  sm:mx-[0] mx-[auto] sm:px-[15px] w-[100%] grow  h-0">
            <Column className="justify-start m-5 sm:mx-[0] sm:px-[0] sm:w-[100%] w-[15%]">
              <Column className="justify-start sm:mt-[15px] md:mt-[20px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
              </Column>
              <Column className="justify-start sm:mt-[15px] md:mt-[20px] w-[100%]">
                <Text
                  className="font-semibold text-bluegray_900 w-[auto]"
                  variant="body3"
                >
                  Date Range
                </Text>
                <Input
                  className="placeholder:text-bluegray_700 Dropdown"
                  wrapClassName="flex md:mt-[4px] mt-[8px] sm:mt-[3px] w-[100%]"
                  name="Dropdown One"
                  placeholder="All Time"
                  suffix={
                    <Img
                      src="images/img_arrow_chevron_forward.svg"
                      className="ml-[35px] mr-[2px] sm:ml-[13px] md:ml-[18px] my-[auto]"
                      alt="Arrow Chevron Forward"
                    />
                  }
                  shape="RoundedBorder6"
                  size="md"
                ></Input>
              </Column>

              <Column className="items-center justify-start sm:mt-[15px] md:mt-[20px] mt-[40px] sm:px-[0] w-[100%]">
                <Column className="justify-start w-[100%]">
                  <Row className="listrequest">
                    <Text
                      className="font-semibold text-bluegray_900 w-[auto]"
                      variant="body3"
                    >
                      Boards
                    </Text>
                  </Row>
                  <List
                    className="gap-[0] lg:mt-[4px] 2xl:mt-[6px] xl:mt-[6px] 3xl:mt-[8px] w-[100%]"
                    orientation="vertical"
                  >
                    <CheckBox
                      className="font-medium xl:my-[2px] lg:my-[2px] 3xl:my-[3px] 2xl:my-[3px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] text-bluegray_700 w-[100%]"
                      inputClassName="2xl:my-[1px] 3xl:my-[1px] h-[15px] lg:my-[2px] mr-[5px] w-[15px] xl:my-[2px]"
                      name="React"
                      label="React"
                    ></CheckBox>
                    <CheckBox
                      className="font-medium xl:my-[2px] lg:my-[2px] 3xl:my-[3px] 2xl:my-[3px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] text-bluegray_700 w-[100%]"
                      inputClassName="2xl:my-[1px] 3xl:my-[1px] h-[15px] lg:my-[2px] mr-[5px] w-[15px] xl:my-[2px]"
                      name="Flutter"
                      label="Flutter"
                    ></CheckBox>

                  </List>

                  <Row className="md:flex-wrap sm:flex-wrap items-start sm:mt-[3px] md:mt-[4px] mt-[8px] sm:w-[100%] w-[44%]">

                    <Img
                      src="images/img_plusoutline.svg"
                      className="plusOutline"
                      alt="plusOutline One"
                    />
                    <Text className="rowplusoutline" variant="body3">
                      Create board
                    </Text>
                  </Row>

                </Column>
              </Column>
            </Column>



            <Column className="justify-start  sm:mx-[0] sm:px-[0] sm:w-[100%] w-[20%] brd-left">
              <Column className="bg-white_A700 items-center justify-start  p-[10px] sm:p-[3px] md:p-[5px] w-[100%]">
                <Column className="items-end justify-start sm:px-[0] w-[100%]">
                  <Row className="listrequest">
                    <Input
                      className="font-normal not-italic p-[0] text-[14px] placeholder:text-bluegray_401 text-bluegray_401 w-[100%]"
                      wrapClassName="flex sm:mx-[0] sm:w-[100%] w-[85%]"
                      name="search One"
                      placeholder="Search..."
                      prefix={
                        <Img
                          src="images/img_search.svg"
                          className="cursor-pointer ml-[3px] mr-[8px] sm:mr-[3px] md:mr-[4px] my-[auto]"
                          alt="search"
                        />
                      }
                      shape="srcRoundedBorder4"
                      size="mdSrc"
                      variant="srcFillGray201"
                    ></Input>
                    <Button
                      className="flex sm:h-[12px] md:h-[15px] h-[28px] items-center justify-center sm:w-[11px] md:w-[14px] w-[28px]"
                      shape="icbRoundedBorder4"
                      size="smIcn"
                      variant="icbOutlineIndigoA201"
                    >
                      <Img
                        src="images/img_group254.svg"
                        className="h-[20px] sm:h-[8px] md:h-[11px] flex items-center justify-center"
                        alt="Group254"
                      />
                    </Button>
                  </Row>
                </Column>
              </Column>
              <Column className="w-[100%]  overflow-auto">
                <List
                  className="gap-[0]"
                  orientation="vertical"
                >
                  <Column className="listrectangle461">

                    <Column className="bg-white_A700 justify-start my-[0] outline outline-[0.5px] outline-bluegray_100
p-[10px] sm:p-[3px] md:p-[5px] w-[100%]"
                    >
                      <div style={{ wordBreak: "break-all" }}>
                        <Text className="nestFunction" variant="body1">
                          Flutter: Form validation not working

                        </Text>
                      </div>
                      <div style={{ wordBreak: "break-all" }}>
                        <Text className="graphsupport_One" variant="body3">
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </Text>
                      </div>
                      <Row className="md:flex-wrap sm:flex-wrap items-start md:ml-[4px] ml-[9px] sm:mt-[3px] md:mt-[4px] mt-[8px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[16%]">
                        <Row className="md:flex-wrap sm:flex-wrap items-start justify-evenly 
mt-[1px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[55%]">
                          <Img
                            src="images/img_polygon4.svg"
                            className="w-[250px] mt-[5px]"
                            alt="PolygonFour Six"
                          />
                          <Text
                            className="flex-grow font-medium text-bluegray_700 pl-[3px]"
                            variant="body3"
                          >
                            1
                          </Text>
                        </Row>
                        <Row className="md:flex-wrap sm:flex-wrap items-start justify-evenly ml-[17px] md:ml-[8px] sm:mx-[0]
sm:px-[0] sm:w-[100%] w-[65%]">
                          <Img
                            src="images/img_comment1.svg"
                            className="commentOne"
                            alt="commentOne Six"
                          />
                          <Text
                            className="flex-grow font-medium text-bluegray_700 pl-[3px]"
                            variant="body3"
                          >
                            0
                          </Text>
                        </Row>
                      </Row>
                    </Column>
                  </Column>
                </List>
              </Column>
            </Column>


            <Column className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[65%] brd-left">

              <Column className="justify-start w-[100%] h-[100%] p-[10px]">
                <Row className="bg-white_A700 border border-gray_301 border-solid sm:p-[15px] p-[16px] md:p-[8px] rounded-bl-[0] rounded-br-[0] rounded-tl-[16px] rounded-tr-[16px] listrequest">
                  <Row className="md:flex-wrap sm:flex-wrap items-center
       md:ml-[4px] ml-[8px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[45%]">


                    <Text className="rowpolygonthree " variant="body1">
                      Flutter: Form validation not working
                    </Text>
                  </Row>

                  <Img
                    src="images/trash.png"
                    className="mergeEleven"
                    alt="mergeEleven"
                  />
                </Row>
                <Row className="sm:mx-[0] sm:px-[0] h-[100%]">
                  <Column className="sm:mx-[0] sm:px-[0] sm:w-[100%] w-[60%] mr-[0px] pt-[3px]">
                    <List
                      className="bg-white_A700  sm:p-[1px] p-[1px] md:p-[8px] w-[100%] h-[100%]"
                      orientation="vertical"
                    >

                      <Column className="bg-white_A700 items-center justify-start my-[0] sm:p-[3px] md:p-[4px] 
          p-[2px] rounded-radius4 w-[100%]">
                        <Row className="md:flex-wrap sm:flex-wrap items-start sm:px-[0] w-[100%]">
                          <Stack className="h-[28px] w-[6%]">
                            <Column className="h-[33px] bg-purple_200  inset-y-[0] items-center 
              justify-start left-[0] my-[auto] sm:px-[2px]
               md: rounded-radius50 sm:w-[12px] md:w-[16px] w-[32px] p-[5px]">
                              <Text
                                className="mb-[1px] text-white_A700 w-[auto]"
                                variant="body1"
                              >
                                KB
                              </Text>
                            </Column>
                          </Stack>
                          <div>
                            <Column className="sm:mx-[0] sm:px-[0]">

                              <Row className="md:flex-wrap sm:flex-wrap items-start w-[100%]">
                                <Text className="row ml-2" variant="body3">
                                  Kesar Bhimani
                                </Text>
                              </Row>
                            </Column>
                          </div>
                        </Row>
                      </Column>

                    </List>
                    <Row className="bg-gray_101 border border-indigo_A201 border-solid sm:p-[15px] p-[16px] md:p-[8px] 
        rounded-bl-[16px] rounded-br-[0] rounded-tl-[0] rounded-tr-[0] listpolygontwo"
                    >
                      <Column className="h-[33px] bg-purple_200 h-[max-content] inset-y-[0] items-center 
              justify-start left-[0] my-[auto] sm:px-[2px]
               md: rounded-radius50 sm:w-[12px] md:w-[16px] w-[32px] p-[5px]">
                        <Text
                          className="mb-[1px] text-white_A700 w-[auto]"
                          variant="body1"
                        >
                          KB
                        </Text>
                      </Column>
                      <Text className="ml-2"
                      >
                        Leave an Internal comment

                      </Text>

                    </Row>
                  </Column>
                  <Column className="bg-white_A700 border border-gray_301 border-solid items-center sm:mx-[0]
       sm:p-[15px] p-[16px] md:p-[8px] rounded-bl-[0] rounded-br-[16px] rounded-tl-[0] 
       rounded-tr-[0] sm:w-[100%] w-[45%]">
                    <Column className="justify-start sm:px-[0] w-[100%]">
                      <Column className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[96%]">
                        <Text
                          className="font-semibold text-bluegray_900 w-[auto]"
                          variant="body3"
                        >
                          Details
                        </Text>
                        <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                          <Text className="Publiclink" variant="body3">
                            Public link
                          </Text>
                          <Text
                            className="common-pointer ml-2"
                            variant="body3"
                          >
                            https://comingsoon.sayit.io
                          </Text>
                        </Row>
                        <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                          <Text className="Publiclink" variant="body3">
                            Status
                          </Text>
                          <Row className="md:flex-wrap sm:flex-wrap items-start justify-evenly md:ml-[16px] ml-[32px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[83%]">

                          </Row>
                        </Row>
                        <Row className="md:flex-wrap sm:flex-wrap items-center mt-[11px] sm:mt-[4px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                          <Text className="Publiclink" variant="body3">
                            You
                          </Text>
                          <Row className="md:flex-wrap sm:flex-wrap items-start justify-evenly md:ml-[10px]
               ml-[31px] sm:mx-[0] sm:px-[0]">
                            <Text
                              className="font-normal not-italic text-bluegray_900 w-[200px]"
                              variant="body3"
                            >
                              Kesar Bhimani
                            </Text>
                          </Row>
                        </Row>

                        <Row className="md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[28%]">
                          <Text className="Publiclink" variant="body3">
                            Type
                          </Text>
                          <Text className="Add" variant="body3">
                            Admin
                          </Text>
                        </Row>
                      </Column>
                    </Column>
                  </Column>
                </Row>
              </Column>
            </Column>
          </Row>
          <Footer />
        </Column>
      </Column>
    </>
  );
};

export default AdminfeedbackPage;
