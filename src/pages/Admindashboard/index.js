import React from "react";

import { Column, Row, Text, Input, Img, List, Line, Stack } from "components";
import Header1 from "components/Header/Header1";

const AdmindashboardPage = () => {
  return (
    <>
      <Column className="bg-gray_50 font-inter items-center justify-start mx-[auto] sm:pb-[15px] md:pb-[166px] pb-[322px] w-[100%]">
        <Column className="items-center justify-start w-[100%]">
          <Header1 className="w-[100%]" />
          <Column className="items-center justify-start max-w-[913px] sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] mx-[auto] sm:px-[15px] w-[100%]">
            <Column className="bg-white_A700 border border-bluegray_50 border-solid items-center justify-start sm:p-[15px] p-[16px] md:p-[8px] rounded-radius8 w-[100%]">
              <Column className="items-center justify-start sm:mb-[2px] md:mb-[3px] mb-[6px] sm:px-[0] w-[100%]">
                <Row className="md:flex-wrap sm:flex-wrap items-end justify-between w-[100%]">
                  <Text className="rowactivityovervi" as="h5" variant="h5">
                    Activity overview
                  </Text>
                  <Input
                    className="placeholder:text-bluegray_700 Dropdown"
                    wrapClassName="flex sm:mx-[0] sm:w-[100%] w-[21%]"
                    name="Dropdown"
                    placeholder="This Week"
                    suffix={
                      <Img
                        src="images/img_arrow_chevron_forward.svg"
                        className="ml-[35px] mr-[2px] sm:ml-[13px] md:ml-[18px] my-[auto]"
                        alt="Arrow Chevron Forward"
                      />
                    }
                    shape="RoundedBorder6"
                    size="md"
                    variant="OutlineBluegray50"
                  ></Input>
                </Row>
                <Row className="md:mt-[12px] mt-[24px] sm:mt-[9px] sm:px-[0] listrequest">
                  <List
                    className="md:gap-[12px] gap-[24px] sm:gap-[9px] grid sm:grid-cols-1 grid-cols-2 min-h-[auto] sm:w-[100%] w-[49%]"
                    orientation="horizontal"
                  >
                    <Column className="listposts">
                      <Row className="md:flex-wrap sm:flex-wrap items-start justify-between w-[100%]">
                        <Text className="Posts" variant="body3">
                          Posts
                        </Text>
                        <Text
                          className="font-bold text-bluegray_900 w-[auto]"
                          variant="body1"
                        >
                          0
                        </Text>
                      </Row>
                      <Line className="bg-gray_301 h-[2px] sm:mt-[23px] md:mt-[30px] mt-[60px] w-[100%]" />
                    </Column>
                    <Column className="listposts">
                      <Row className="md:flex-wrap sm:flex-wrap items-start justify-between w-[100%]">
                        <Text className="Posts" variant="body3">
                          Votes
                        </Text>
                        <Text
                          className="font-bold text-bluegray_900 w-[auto]"
                          variant="body1"
                        >
                          0
                        </Text>
                      </Row>
                      <Line className="bg-gray_301 h-[2px] sm:mt-[23px] md:mt-[30px] mt-[60px] w-[100%]" />
                    </Column>
                  </List>
                  <Column className="items-center sm:mx-[0] pt-[3px] sm:px-[0] sm:w-[100%] w-[23%]">
                    <Row className="md:flex-wrap sm:flex-wrap items-center justify-between sm:mx-[0] sm:px-[0] sm:w-[100%] w-[99%]">
                      <Text
                        className="font-medium text-bluegray_400 w-[auto]"
                        variant="body3"
                      >
                        Comments
                      </Text>
                      <Text
                        className="font-bold text-bluegray_900 w-[auto]"
                        variant="body1"
                      >
                        1
                      </Text>
                    </Row>
                    <Stack
                      className="bg-cover bg-no-repeat h-[43px] mt-[19px] sm:mt-[7px] md:mt-[9px] pb-[1px] w-[100%]"
                      style={{
                        backgroundImage: "url('images/img_group8.svg')",
                      }}
                    >
                      <Img
                        src="images/img_line5.svg"
                        className="absolute h-[42px] w-[100%]"
                        alt="LineFive Two"
                      />
                    </Stack>
                  </Column>
                  <Column className="items-center sm:mx-[0] pt-[3px] sm:px-[0] sm:w-[100%] w-[23%]">
                    <Row className="md:flex-wrap sm:flex-wrap items-start justify-between w-[100%]">
                      <Text className="StatusChanges" variant="body3">
                        Status Changes
                      </Text>
                      <Text
                        className="font-bold text-bluegray_900 w-[auto]"
                        variant="body1"
                      >
                        0
                      </Text>
                    </Row>
                    <Line className="bg-gray_301 h-[2px] sm:mt-[23px] md:mt-[30px] mt-[60px] w-[100%]" />
                  </Column>
                </Row>
              </Column>
            </Column>
            <Row className="sm:mt-[12px] md:mt-[16px] mt-[32px] sm:px-[0] listrequest">
              <Column className="bg-white_A700 border border-bluegray_50 border-solid items-center sm:mx-[0] md:p-[10px] sm:p-[15px] p-[20px] rounded-radius8 sm:w-[100%] w-[49%]">
                <Column className="justify-start mt-[4px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[98%]">
                  <Row className="md:flex-wrap sm:flex-wrap items-start justify-between w-[100%]">
                    <Text className="rownewposts" as="h5" variant="h5">
                      New posts
                    </Text>
                    <Img
                      src="images/img_questioncircle.svg"
                      className="questioncircle"
                      alt="questioncircle"
                    />
                  </Row>
                  <List
                    className="min-h-[auto] ml-[1px] md:mt-[12px] mt-[24px] sm:mt-[9px] sm:pb-[29px] md:pb-[38px] pb-[75px] sm:w-[100%] w-[45%]"
                    orientation="vertical"
                  >
                    <Row className="listpolygontwo">
                      <Column className="border border-bluegray_50 border-solid items-center sm:mx-[0] md:p-[4px] p-[8px] sm:px-[0] sm:py-[3px] rounded-radius4 sm:w-[100%] w-[28%]">
                        <Img
                          src="images/img_polygon2.svg"
                          className="sm:w-[100%] w-[57%]"
                          alt="PolygonTwo"
                        />
                        <Text className="columnpolygontwo" variant="body1">
                          1
                        </Text>
                      </Column>
                      <Text className="rowpolygontwo" variant="body1">
                        feature request
                      </Text>
                    </Row>
                    <Row className="md:flex-wrap sm:flex-wrap items-center sm:mx-[0] sm:px-[0] sm:w-[100%] w-[93%]">
                      <Column className="border border-bluegray_50 border-solid items-center sm:mx-[0] md:p-[4px] p-[8px] sm:px-[0] sm:py-[3px] rounded-radius4 sm:w-[100%] w-[30%]">
                        <Img
                          src="images/img_polygon2.svg"
                          className="sm:w-[100%] w-[57%]"
                          alt="PolygonTwo One"
                        />
                        <Text className="columnpolygontwo" variant="body1">
                          1
                        </Text>
                      </Column>
                      <Text className="rowpolygontwo" variant="body1">
                        nest Function
                      </Text>
                    </Row>
                    <Column className="items-center justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[60%]">
                      <Row className="md:flex-wrap sm:flex-wrap items-start justify-between w-[100%]">
                        <Column className="border border-bluegray_50 border-solid items-center justify-start sm:mx-[0] md:p-[4px] p-[8px] sm:px-[0] sm:py-[3px] rounded-radius4 sm:w-[100%] w-[46%]">
                          <Img
                            src="images/img_polygon2.svg"
                            className="sm:w-[100%] w-[57%]"
                            alt="PolygonTwo Two"
                          />
                          <Text className="columnpolygontwo" variant="body1">
                            1
                          </Text>
                        </Column>
                        <Column className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[47%]">
                          <Text
                            className="font-semibold text-bluegray_900 w-[auto]"
                            variant="body1"
                          >
                            f1
                          </Text>
                          <Text className="CLOSED" variant="body4">
                            CLOSED
                          </Text>
                        </Column>
                      </Row>
                    </Column>
                  </List>
                </Column>
              </Column>
              <Column className="bg-white_A700 border border-bluegray_50 border-solid items-center sm:mx-[0] md:p-[12px] sm:p-[15px] p-[24px] rounded-radius8 sm:w-[100%] w-[49%]">
                <Column className="items-center justify-start sm:mb-[37px] md:mb-[49px] mb-[95px] sm:px-[0] w-[100%]">
                  <Row className="md:flex-wrap sm:flex-wrap items-start justify-between w-[100%]">
                    <Text className="rownewposts" as="h5" variant="h5">
                      Stale posts
                    </Text>
                    <Img
                      src="images/img_questioncircle.svg"
                      className="questioncircle"
                      alt="questioncircle One"
                    />
                  </Row>
                  <Column className="items-center justify-start sm:mt-[26px] md:mt-[34px] mt-[67px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[56%]">
                    <Img
                      src="images/img_group230.svg"
                      className="Group230"
                      alt="Group230"
                    />
                    <Text className="columngroup230" variant="body1">
                      none of your posts are stale.
                    </Text>
                  </Column>
                </Column>
              </Column>
            </Row>
            <Row className="sm:mt-[12px] md:mt-[16px] mt-[32px] listrequest">
              <Column className="bg-white_A700 border border-bluegray_50 border-solid sm:mx-[0] md:p-[12px] sm:p-[15px] p-[24px] rounded-radius8 sm:w-[100%] w-[31%]">
                <Row className="md:flex-wrap sm:flex-wrap items-center mr-[auto] mt-[3px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[42%]">
                  <div className="bg-blue_A200 h-[10px] sm:h-[4px] md:h-[6px] my-[4px] rounded-radius50 w-[10px] sm:w-[3px] md:w-[5px]"></div>
                  <Text className="rowpolygontwo" as="h5" variant="h5">
                    Planned
                  </Text>
                </Row>
                <Text className="Planned" variant="body1">
                  Come back soon!
                </Text>
              </Column>
              <List
                className="sm:gap-[12px] md:gap-[16px] gap-[32px] grid sm:grid-cols-1 grid-cols-2 min-h-[auto] sm:w-[100%] w-[66%]"
                orientation="horizontal"
              >
                <Column className="listellipsefour_one">
                  <Row className="md:flex-wrap sm:flex-wrap items-start mr-[auto] sm:mt-[1px] md:mt-[2px] mt-[5px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[55%]">
                    <div className="bg-purple_A400 h-[10px] sm:h-[4px] md:h-[6px] sm:mb-[3px] md:mb-[4px] mb-[9px] mt-[3px] rounded-radius50 w-[10px] sm:w-[3px] md:w-[5px]"></div>
                    <Text className="rowpolygontwo" as="h5" variant="h5">
                      In Progress
                    </Text>
                  </Row>
                  <Text className="Inprogress" variant="body1">
                    Come back soon!
                  </Text>
                </Column>
                <Column className="listellipsefour_one">
                  <Row className="md:flex-wrap sm:flex-wrap items-start mr-[auto] sm:mt-[1px] md:mt-[2px] mt-[5px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[54%]">
                    <div className="bg-light_green_A701 h-[10px] sm:h-[4px] md:h-[6px] sm:mb-[3px] md:mb-[4px] mb-[9px] mt-[3px] rounded-radius50 w-[10px] sm:w-[3px] md:w-[5px]"></div>
                    <Text className="rowpolygontwo" as="h5" variant="h5">
                      Completed
                    </Text>
                  </Row>
                  <Text className="Inprogress" variant="body1">
                    Come back soon!
                  </Text>
                </Column>
              </List>
            </Row>
          </Column>
        </Column>
      </Column>
    </>
  );
};

export default AdmindashboardPage;
