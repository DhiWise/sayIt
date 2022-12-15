import React from "react";
import { Column, Row, Text, List, Footer } from "components";
import Header3 from "components/Header/Header3/index.js";

const UsernotificationsPage = () => {

  return (
    <>
      <Column className="bg-white_A700 font-inter items-center justify-start mx-[auto] py-[15px] sm:py-[5px] md:py-[7px] w-[100%]">
        <Header3
          className="w-[100%]"
        />
        <Column className="items-center justify-start max-w-[976px] sm:mb-[225px] md:mb-[291px] mb-[565px] sm:mt-[13px] md:mt-[18px] mt-[35px] mx-[auto] sm:px-[15px] w-[100%]">
          <Row className="listrequest">
            <Text
              className="font-medium text-bluegray_900 w-[auto]"
              as="h2"
              variant="h2"
            >
              Notifications
            </Text>
            <Row>
              <Text
                className="font-medium text-indigo_A200 w-[auto]"
                as="h6"
                variant="h6"
              >
                Mark all as read
              </Text>
            </Row>
          </Row>
          <Column className="items-center justify-start md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]">
            <List
              className="gap-[0] min-h-[auto] w-[100%]"
              orientation="vertical"
            >

              <Column className="bg-white_A700 justify-start my-[0] outline outline-[0.5px] outline-bluegray_100 md:p-[12px] sm:p-[15px] p-[24px] rounded-bl-[0] mb-[5px]   w-[100%]">

                <Column className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[67%]">
                  <Text
                    className="font-medium text-bluegray_900 w-[auto]"
                    as="h6"
                    variant="h6"
                  >
                    Kesar Bhimani has commented in Flutter, Flutter: Form validation not working
                    {"."}
                  </Text>
                  <Text className="October72022" variant="body2">
                  December 1, 2022

                  </Text>
                </Column>
              </Column>
            </List>
          </Column>
        </Column>
      </Column>
      <Footer />
    </>
  );
};

export default UsernotificationsPage;
