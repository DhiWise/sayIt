import React from "react";

import { Column, Row, List, Text, CheckBox, Img, Line, Footer } from "components";
import Header from "components/Header/Header";
const AdminnotificationsPage = () => {
 


  return (
    <>
      <Column className="bg-gray_50 font-inter items-center justify-start mx-[auto] w-[100%]">
        <Column className="justify-start w-[100%]">
          <Header className="w-[100%]" />
          <Row className="items-start lg:ml-[17px] xl:ml-[21px] 2xl:ml-[24px] 3xl:ml-[28px] w-[100%]">
            <List
              className="gap-[0] min-h-[auto] lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] w-[20%]"
              orientation="vertical"
            >
              <Column className="items-start justify-start lg:my-[10px] xl:my-[13px] 2xl:my-[15px] 3xl:my-[18px] w-[100%]">
                <Column className="justify-start w-[100%]">
                  <Row className="items-center justify-between w-[100%]">
                    <Text
                      className="font-medium text-bluegray_900 w-[auto] ml-5 mt-5"
                      variant="body2"
                    >
                      Boards
                    </Text>

                  </Row>
                  <List
                    className="sm:gap-[3px] md:gap-[4px] gap-[8px] min-h-[auto] mt-[5px] sm:mt-[3px] md:mt-[5px] sm:w-[100%] w-[69%]"
                    orientation="vertical"
                  >
                    
                    <Column className="justify-start lg:mt-[5px] xl:mt-[5px] 2xl:mt-[7px] 3xl:mt-[9px] w-[auto]">
                    <CheckBox
                      className=" text-sm ml-5 mt-2 font-thin lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] text-bluegray_700"
                      inputClassName="h-[20px] mr-[5px] w-[20px]"
                      value="Flutter"
                      label="Flutter"
                    ></CheckBox>
                    <CheckBox
                      className=" text-sm ml-5 mt-2 font-thin lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] text-bluegray_700"
                      inputClassName="h-[20px] mr-[5px] w-[20px]"
                      value="react"
                      label="React"
                    ></CheckBox>
                  </Column>
                  </List>

                  <Row className="items-start ml-[1px] lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] w-auto ml-5"
                    style={{
                      cursor: "pointer",
                    }}>
                    <Img
                      src="images/img_plus.svg"
                      className="plus mt-3 "
                      alt="plus"
                    />
                    <Text className="text-sm text-bluegray_301 font-normal mt-3 ml-1" variant="body2">
                      Create board
                    </Text>
                  </Row>
                </Column>
              </Column>
              <Column className="items-start justify-start lg:my-[10px] xl:my-[13px] 2xl:my-[15px] 3xl:my-[18px] w-[100%]">
                <Column className="justify-start w-[100%]">
                  <Row className="items-center justify-between w-[100%]">
                    <Text
                      className="font-medium text-bluegray_900 w-[auto] ml-5 mt-5"
                      variant="body2"
                    >
                      Activity
                    </Text>

                  </Row>
                  <Column className="justify-start lg:mt-[5px] xl:mt-[5px] 2xl:mt-[7px] 3xl:mt-[9px] w-[auto]">
                    <CheckBox
                      className=" text-sm ml-5 mt-2 font-thin lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] text-bluegray_700"
                      inputClassName="h-[20px] mr-[5px] w-[20px]"
                      name="activity"
                      value="NEW_COMMENTS"
                      label="New Comments"
                    ></CheckBox>
                    <CheckBox
                      className=" text-sm ml-5 mt-2 font-thin lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] text-bluegray_700"
                      inputClassName="h-[20px] mr-[5px] w-[20px]"
                      name="activity"
                      value="NEW_POSTS"
                      label="New Posts"
                    ></CheckBox>
                    <CheckBox
                      className=" text-sm ml-5 mt-2 font-thin lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] text-bluegray_700"
                      inputClassName="h-[20px] mr-[5px] w-[20px]"
                      name="activity"
                      value="STATUS_UPDATES"
                      label="Status Updates"
                    ></CheckBox>
                  </Column>
                </Column>
              </Column>
            </List>

            <Line className="bg-bluegray_100 lg:h-[534px] xl:h-[406px] 2xl:h-[751px] 3xl:h-[901px] lg:ml-[12px] xl:ml-[16px] 2xl:ml-[18px] 3xl:ml-[21px] w-[90px]" />

            <Column className="items-start justify-start lg:ml-[16px] xl:ml-[20px] 2xl:ml-[23px] 3xl:ml-[27px] lg:mt-[19px] xl:mt-[24px] 2xl:mt-[27px] 3xl:mt-[32px] w-[76%]">
              <Row className="items-center justify-between w-[100%] mb-5 mt-5]">
                <Text
                  className="font-normal text-bluegray_900 w-[auto] mt-3"
                  as="h2"
                  variant="h2"
                >
                  Notifications
                </Text>
              </Row>
              <div className="w-[90%]">
                  <List
                    className="gap-[0] min-h-[auto] lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] w-[auto]"
                    orientation="vertical"
                  >
                    
                          <Column
                            style={{
                              cursor: "pointer",
                            }}
                           className="bg-white_A700 justify-start my-[0] outline outline-[0.5px] outline-bluegray_100 lg:p-[12px] xl:p-[16px] 2xl:p-[18px] 3xl:p-[21px] rounded-bl-[0] rounded-br-[0] rounded-tl-[8px] rounded-tr-[8px] w-[auto]">
                            <Column className="justify-start w-[auto]">
                              <Text
                                className=" text-bluegray_900 w-[auto] text-[14px] mt-3 ml-3"
                                as="h6"
                                variant="h6"
                              >
                                Kesar Bhimani has commented in Flutter, Flutter: Form validation not working
                              </Text>
                              <Text className="October12202  mt-1 ml-3 mb-5 text-bluegray_301 text-[12px] font-thin;" variant="body2">

                                December 1, 2022

                              </Text>
                            </Column>
                          </Column>
                  </List>
              </div>
            </Column>
          </Row>
        </Column>
      </Column>
    <Footer/>
    </>
  );
};

export default AdminnotificationsPage;
