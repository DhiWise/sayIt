import React from "react";

import {
  Column,
  Row,
  Img,
  Stack,
  Text,
  Input,
  RadioGroup,
  Radio,
  List,
  CheckBox,
  Footer
} from "components";
import Header from "components/Header/Header";
const AdminusersPage = () => {



  return (
    <>
      <Column className="bg-gray_50 font-inter items-center justify-start mx-[auto] w-[100%]">
        <Column className="items-center justify-start w-[100%] min-h-screen">
          <Header className="w-[100%]" />
          <Row className="md:flex-wrap sm:flex-wrap  sm:mx-[0] mx-[auto] sm:px-[15px] w-[100%] grow ">
            <Column className="justify-start ml-5 md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[14%]">
              <Column className="justify-start sm:mt-[15px] md:mt-[20px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
                <Text
                  className="font-semibold text-bluegray_900 w-[auto]"
                  variant="body2"
                >
                  Sort
                </Text>
                <RadioGroup
                  selectedValue="LAST_ACTIVITY"
                  className="mt-[10px] sm:mt-[3px] md:mt-[5px] w-[100%]"
                  name="radiogrouplastactivity"
                >
                  <Radio
                    value="LAST_ACTIVITY"
                    className="font-medium mr-[4px] sm:mt-[3px] md:mt-[4px] mt-[8px] text-[14px] text-bluegray_700"
                    inputClassName="h-[20px] mr-[5px] w-[20px]"
                    checked={true}
                    name="radiogrouplastactivity"
                    label="Last Activity"
                    variant="OutlineIndigoA200"
                  ></Radio>
                  <Radio
                    value="TOP_POSTERS"
                    className="font-medium mr-[4px] sm:mt-[3px] md:mt-[4px] mt-[8px] text-[14px] text-bluegray_700"
                    inputClassName="h-[20px] mr-[5px] w-[20px]"
                    checked={false}
                    name="radiogrouplastactivity"
                    label="Top Posters"
                  ></Radio>
                  <Radio
                    value="TOP_VOTERS"
                    className="font-medium mr-[4px] sm:mt-[3px] md:mt-[4px] mt-[8px] text-[14px] text-bluegray_700"
                    inputClassName="h-[20px] mr-[5px] w-[20px]"
                    checked={false}
                    name="radiogrouplastactivity"
                    label="Top Voters"
                  ></Radio>
                </RadioGroup>
              </Column>
              <Column className="justify-start sm:mt-[15px] md:mt-[20px] mt-[40px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
                <Text
                  className="font-semibold text-bluegray_900 w-[auto]"
                  variant="body2"
                >
                  Activity
                </Text>
                <Column className="justify-start mt-[10px] sm:mt-[3px] md:mt-[5px] w-[100%]">


                  <Row className="md:flex-wrap sm:flex-wrap items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[64%]">
                    <CheckBox
                      className="font-medium sm:mt-[3px] md:mt-[4px] mt-[8px] text-[14px] text-bluegray_700"
                      inputClassName="h-[20px] mr-[5px] w-[20px]"
                      name="Posts"
                      label="Posts"
                      value="post"
                    ></CheckBox>
                  </Row>

                  <Row className="md:flex-wrap sm:flex-wrap items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[64%]">
                    <CheckBox
                      className="font-medium sm:mt-[3px] md:mt-[4px] mt-[8px] text-[14px] text-bluegray_700"
                      inputClassName="h-[20px] mr-[5px] w-[20px]"
                      name="Votes"
                      label="Votes"
                      value="upvote"
                    ></CheckBox>
                  </Row>

                  <Row className="md:flex-wrap sm:flex-wrap items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[64%]">
                    <CheckBox
                      className="font-medium sm:mt-[3px] md:mt-[4px] mt-[8px] text-[14px] text-bluegray_700"
                      inputClassName="h-[20px] mr-[5px] w-[20px]"
                      name="Comments"
                      label="Comments"
                      value="comment"
                    ></CheckBox>
                  </Row>
                </Column>
              </Column>
            </Column>
            <Stack id="scrollableDivUser" className=" md:ml-[12px] ml-[24px] sm:ml-[9px] w-[20%] brd-left overflow-auto">

              <Row className="mt-5 md:flex-wrap sm:flex-wrap items-center ml-[16px] md:ml-[8px] sm:mx-[0] sm:px-[0] sm:w-[100%]">

                <Text
                  className="font-semibold text-bluegray_900 w-[auto]"
                  variant="body2"
                >
                  Users
                </Text>
                <Text
                  className="text-bluegray_400 rowheartoutline"
                  variant="body2"
                >
                  1 total
                </Text>
              </Row>
              <Column className="absolute items-center justify-start top-[2%] w-[100%]">
                <Input
                  className="mt-5 font-normal not-italic p-[0] text-[14px] placeholder:text-bluegray_401 text-bluegray_401 w-[100%]"
                  wrapClassName="flex md:mt-[9px] mt-[19px] sm:mt-[7px] w-[100%]"
                  name="Group320"
                  placeholder="Search by name..."></Input>

                <Column

                  style={{
                    cursor: "pointer",
                  }}

                  className="bg-white_A700 outline outline-[0.5px] outline-bluegray_100 justify-end p-[13px] sm:p-[5px] md:p-[6px] w-[100%]">
                  <Row
                    className="md:flex-wrap sm:flex-wrap items-center md: mr-[auto] mt-[1px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[18%]">
                    <Stack className="sm:w-[100%] w-[48%]">
                      <Column className="h-[33px] bg-purple_200 h-[max-content] inset-y-[0] items-center justify-start left-[0] my-[auto] sm:px-[2px] md: rounded-radius50 sm:w-[12px] md:w-[16px] w-[32px] p-[5px]">
                        <Text
                          className="mb-[1px] text-white_A700 w-[auto]"
                          variant="body1"
                        >
                          KB
                        </Text>
                      </Column>
                    </Stack>
                    <Text
                      className="font-thin sm:ml-[2px] md:ml-[3px] ml-[15px] mt-[1px] w-[auto]"
                      variant="body2"
                    >

                      Kesar Bhimani
                    </Text>
                  </Row>
                </Column>

              </Column>
            </Stack>
            <Stack id="scrollableDiv" className=" sm:w-[100%] w-[42%] brd-left overflow-auto">

              <Column className="absolute items-center justify-start top-[0] w-[100%]">



                <List
                  className="gap-[0] min-h-[auto] w-[100%]"
                  orientation="vertical"
                >
                  <Row
                    style={{
                      cursor: "pointer",
                    }}
                    className="bg-white_A700 sm:mx-[0]  sm:w-[100%] w-[100%] brd-btm" >
                    <Column
                      className="w-[40px] p-[12px] shrink-0 items-center justify-center">
                      <Img
                        src="images/img_pencil2.svg"
                        className="user-action-icon "
                        alt="created"
                      />
                      <Img
                        src="images/img_polygon4.svg"
                        className="user-action-icon"
                        alt="upvoted" />
                      <Img
                        src="images/img_comment1.svg"
                        className="user-action-icon"
                        alt="commented"
                      />
                    </Column>
                    <div class="bg-bluegray_100 bottom-[0] right-[8%] w-[0.5px]"></div>
                    <Column className="p-[10px]">
                      <Text
                        className="font-medium sm:ml-[2px] md:ml-[3px] ml-[6px] text-bluegray_900 w-[auto]"
                        as="h6"
                        variant="h6"
                      >
                        Flutter: Form validation not working
                      </Text>
                      <Text
                        className="sm:ml-[2px] md:ml-[3px] ml-[6px] graphsupport"
                        variant="body2"
                      >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      </Text>
                      <Row className="md:flex-wrap sm:flex-wrap items-start md:ml-[3px] ml-[6px] sm:mt-[2px] md:mt-[3px] mt-[7px] sm:mx-[0] sm:px-[0]">
                        <Row className="md:flex-wrap sm:flex-wrap items-start justify-evenly mt-[1px] sm:mx-[0] sm:px-[0]">
                          <Img
                            src="images/img_polygon4.svg"
                            className="user-action-icon"
                            alt="upvoted"
                          />
                          <Text
                            className="flex-grow font-medium text-bluegray_700 ml-1"
                            variant="body2"
                          >
                            1
                          </Text>
                        </Row>
                        <Row className="md:flex-wrap sm:flex-wrap items-start justify-evenly ml-[17px] md:ml-[8px] sm:mx-[0] sm:px-[0]">
                          <Img
                            src="images/img_comment1.svg"
                            className="user-action-icon"
                            alt="commentOne"
                          />
                          <Text
                            className="flex-grow font-medium text-bluegray_700 ml-1"
                            variant="body2"
                          >
                            0
                          </Text>
                        </Row>
                      </Row>
                    </Column>
                  </Row>

                </List>
              </Column>
            </Stack>
            <Column className="bg-white_A700 justify-start sm:mx-[0] sm:p-[15px] p-[16px] md:p-[8px] sm:w-[100%] w-[25%] brd-left">
              <Text
                className="font-semibold text-bluegray_900 w-[auto]"
                variant="body2"
              >
                Kesar Bhimani
              </Text>
              <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                <Text className="Publiclink" variant="body2">
                  Account created
                </Text>
                <Text className="Unknown" variant="body2">
                  Unknown
                </Text>
              </Row>
              <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                <Text className="Email" variant="body2">
                  Email
                </Text>
                <Text
                  className="font-medium text-bluegray_900 columnnestfunction"
                  variant="body2"
                >
                  kesar@gmail.com
                </Text>
              </Row>

              <Row className="md:flex-wrap sm:flex-wrap items-center sm:mt-[3px] md:mt-[4px] mt-[9px] sm:mx-[0] sm:px-[0]">
                <Text className="Publiclink" variant="body2">
                  Posts
                </Text>
                <Text className="Unknown" variant="body2">
                  1
                </Text>
              </Row>

              <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                <Text className="Publiclink" variant="body2">
                  Comments
                </Text>
                <Text className="Unknown" variant="body2">
                  0
                </Text>
              </Row>
              <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                <Text className="Publiclink" variant="body2">
                  Votes
                </Text>
                <Text className="Unknown" variant="body2">
                  1
                </Text>
              </Row>
              <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                <Text className="Publiclink" variant="body2">
                  User ID
                </Text>
                <Text className="Unknown" variant="body2">
                  Unknown
                </Text>
              </Row>
            </Column>
          </Row>
          <Footer />
        </Column>
      </Column>

    </>
  );
};

export default AdminusersPage;