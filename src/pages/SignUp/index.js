import React from "react";

import { Column, Row, Button, Text, Input, Footer } from "components";
const Signup = () => {
  
  return (
    <>
      <Column className="bg-gray_100 font-inter items-center justify-start mx-[auto]
       sm:p-[15px] md:p-[18px] p-[36px] w-[100%]">
        <Column className="items-center justify-start max-w-[1083px]
         mb-[179px] sm:mb-[71px] md:mb-[92px] mx-[auto] sm:px-[15px] w-[100%]">
          <Row className="listrequest">
          <Text className="text-blue-700" as="h4" variant="h2">
             SayIt
            </Text>            
            <Button
              className="font-bold min-w-[7%] text-[14px] text-bluegray_400 text-center w-[max-content]"
              shape="RoundedBorder6"
              size="lg"
            >
              LOG IN
            </Button>
          </Row>
          <Row className="justify-evenly mt-[50px] sm:mt-[51px] md:mt-[46px] listpolygontwo">
            <Column className="bg-white_A700 sm:mx-[0] outline outline-[0.5px] outline-gray_300 sm:p-[15px] 
            md:p-[33px] p-[64px] rounded-bl-[8px] rounded-br-[0] rounded-tl-[8px] rounded-tr-[0] sm:w-[100%] w-[59%]">
              <Column className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[57%] ml-[100px]">
                <Text
                  className="font-bold leading-[32.00px] md:leading-[normal] sm:leading-[normal] text-bluegray_900 w-[100%]"
                  as="h2"
                  variant="h2"
                >
                  Easily gather, track, and
                  <br />
                  manage feedback
                </Text>
                <Text
                  className="font-medium sm:mt-[12px] md:mt-[16px] mt-[32px] text-bluegray_600 w-[auto]"
                  variant="body1"
                >
                  Get started with SayIt for free
                </Text>
              </Column>
              <Input
                className="placeholder:text-bluegray_300 InputField"
                wrapClassName="md:mt-[12px] mt-[29px] sm:mt-[8px] sm:mx-[0] sm:w-[100%] w-[76%] ml-[70px]"
                type="text"
                name="InputField"
                placeholder="Name"
                shape="RoundedBorder6"
                size="xl"

              ></Input>
              


              <Input
                className="placeholder:text-bluegray_300 InputField"
                wrapClassName="md:mt-[16px] mt-[32px] sm:mt-[12px] sm:mx-[0] sm:w-[100%] w-[76%] ml-[70px]"
                type="text"
                name="InputField"
                placeholder="Email"
                shape="RoundedBorder6"
                size="xl"

              ></Input>
                <Input
                className="placeholder:text-bluegray_300 InputField"
                wrapClassName="md:mt-[12px] mt-[29px] sm:mt-[8px] sm:mx-[0] sm:w-[100%] w-[76%] ml-[70px]"
                type="password"
                name="InputField"
                placeholder="Password"
                shape="RoundedBorder6"
                size="xl"

              ></Input>
              

              <Button
                className="font-bold sm:mb-[34px] md:mb-[44px] mb-[86px] min-w-[76%] sm:mt-[12px] 
                md:mt-[16px] mt-[32px] text-[14px] text-center w-[max-content] ml-[70px]"
                shape="RoundedBorder6"
                size="xl"

              >
                SIGN UP
              </Button>
            </Column>
          </Row>
        </Column>
      </Column>
      <Footer />
    </>
  );
};

export default Signup;
