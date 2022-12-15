import React from "react";

import { List, Column, Row, Text, Img, Stack, Footer } from "components";
import Header3 from "components/Header/Header3";

const UserpostdetailsPage = () => {

  return (
    <>
      <Column className="min-h-screen bg-white_A700 font-inter mx-[auto] py-[15px] sm:py-[5px] md:py-[7px] w-[100%]">
        <Column className="items-center justify-start sm:mb-[194px] md:mb-[250px] mb-[486px] w-[100%]">
          <Header3 className="w-[100%]" />
          <Row className="items-start justify-center max-w-[991px] sm:max-w-[100%] md:max-w-[100%] md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] mx-[auto] sm:px-[15px] px-[30px]  w-[100%]">
            <Column className="items-center justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[32%] block sm:hidden">
              <Column className="bg-gray_103 justify-start sm:p-[15px] p-[16px] md:p-[8px] rounded-radius4 w-[100%]">
                <Text
                  className="font-semibold text-bluegray_402 w-[auto]"
                  variant="body3"
                >
                  VOTERS
                </Text>
                <Row className="md:flex-wrap sm:flex-wrap items-center mt-[16px] sm:mt-[6px] md:mt-[8px]">
                  <Column className="dropdown-menu h-[36px] bg-purple_200  items-center justify-start left-[0]  sm:px-[2px] md: rounded-radius50  w-[36px] p-[5px] ml-[10px]">
                    <Text
                      className="mb-[1px] text-white_A700 w-[auto]"
                      variant="body1"
                    >
                      KB
                    </Text>
                  </Column>
                  <Text className="rowtip" variant="body3">
                    Kesar Bhimani
                  </Text>
                </Row>
              </Column>

              <Text className="columnpoweredbycann" variant="body4">
                Powered by SayIt
              </Text>
            </Column>
            <Column className="justify-start w-[64%] md:ml-[20px] ml-[40px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
              <Column className="justify-start w-[100%]">
                <Row className="items-start sm:mx-[0] sm:px-[0] sm:w-[100%]">
                  <Column
                    className="border border-bluegray_50 border-solid items-center justify-start sm:px-[10px] p-[5px] sm:py-[3px] rounded-radius4  w-[45px] mr-[20px]"
                  >
                    <Img
                      src="images/img_polygon2.svg"
                      className="sm:w-[100%] w-[57%]"
                      alt="PolygonTwo"
                    />
                    <Text className="columnpolygontwo" variant="body1">
                      1
                    </Text>
                  </Column>
                  <Column className="justify-start">
                    <Text
                      className="font-medium text-bluegray_900 w-[auto]"
                      as="h5"
                      variant="h5"
                    >
                      Flutter: Form Validation not working
                    </Text>
                    <Text
                      className="font-semibold sm:mt-[3px] md:mt-[4px] mt-[8px] text-indigo_A201 w-[auto]"
                      variant="body4"
                    >
                      Planned
                    </Text>
                  </Column>
                </Row>

                <Column className="items-center justify-start md:ml-[4px] ml-[8px] md:mr-[27px] mr-[53px] mt-[16px] sm:mt-[6px] md:mt-[8px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[90%]">
                  <Column className="justify-start w-[100%]">
                    <Column className="items-center justify-start w-[100%]">
                      <Column className="justify-start w-[100%]">
                        <Row className="listrequest ml-[10px]">
                          <Row className="items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
                            <Column className="justify-start rounded-radius4  mr-[10px]">
                              <Text
                                className="bg-gray_700 flex items-center px-[12px]   rounded-radius50 text-white_A700 w-[32px] h-[32px]"
                                variant="body2"
                              >
                                K
                              </Text>
                            </Column>
                            <Column className="justify-start">
                              <Text
                                className="font-semibold text-bluegray_700 w-[auto] "
                                variant="body3"
                              >
                                Kesar Bhimani
                              </Text>

                              <Text
                                className="text-bluegray_700 w-[auto] md:flex-wrap sm:flex-wrap"
                                variant="body3"
                              >
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                              </Text>
                              <Row className="mt-[16px]">
                                <Text
                                  className="font-medium text-bluegray_300 w-[auto]"
                                  variant="body4"
                                >
                                 December 1, 2022
                                </Text>
                                  <>
                                    <Text
                                      className="font-medium ml-[16px] sm:ml-[6px] md:ml-[8px] text-bluegray_300 w-[auto]"
                                      variant="body4"
                                    >
                                      Edit Post
                                    </Text>
                                    <Text
                                      className="font-medium ml-[16px] sm:ml-[6px] md:ml-[8px] text-bluegray_300 w-[auto]"
                                      variant="body4"
                                    >
                                      Delete Post
                                    </Text>
                                  </>
                              </Row>

                            </Column>
                          </Row>
                        </Row>
                      </Column>
                    </Column>
                  </Column>
                </Column>
              </Column>
            </Column>
          </Row>
        </Column>
        <Footer />
      </Column>
    </>
  );
};

export default UserpostdetailsPage;
