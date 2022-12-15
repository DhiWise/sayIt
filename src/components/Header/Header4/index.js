import React from "react";
import ReactTooltip from 'react-tooltip';

import {
  Column,
  Row,
  Button,
  Img,
  Text,
  Line,
  SelectBox,
} from "components";

const Header3 = (props) => {
 
  return (
    <>
       <ReactTooltip />
      <header className={props.className}>
        <Column className="items-center justify-start w-[100%]">
          <Column className="justify-start sm:mx-[0] sm:px-[15px] px-[30px] py-[10px] sm:w-[100%] md:w-[100%]  w-[991px]">
            <div>
              <a
                href={"javascript:"}
                className="hover:bg-purple_200 cursor-pointer font-inter hover:font-medium font-semibold hover:justify-center text-[18px] text-bluegray_900"
                rel="noreferrer"
              >
                DhIWIse
              </a>
              <Row className="float-right">
                <Button
                  className="flex h-[36px] w-[36px] items-center justify-center rounded-radius50 mr-[10px] bg-gray-10"
                  size=""
                  variant="icbFillGray104"
                >
                  <Img
                    src="images/img_group2.svg"
                    className="p-[5px]"
                    alt="GroupTwo"

                  />
                </Button>
                <Column className="h-[36px] bg-purple_200  items-center justify-start left-[0]  sm:px-[2px] md: rounded-radius50  w-[36px] p-[5px]">
                  <Text
                    className="mb-[1px] text-white_A700 w-[auto]"
                    variant="body1"
                  >
                    C
                  </Text>
                </Column>
                {!localStorage.getItem('LOGIN') && <Column className="h-[36px] items-center 
                justify-start left-[0]  sm:px-[2px] md: rounded-radius50  w-[36px] p-[5px] ml-[13px]">
                  <Text data-tip="login"
                    className="mb-[1px] w-[auto]"
                    variant="body1"
                  >
                    <Link to="/login">
                      LOGIN
                </Link>
                </Text>
                </Column>
                    }
                <Button
                  className="font-semibold text-[12px] text-center hidden sm:block ml-[10px]"
                  shape="RoundedBorder6"
                  size="sm"
                  variant="FillIndigoA201"
                >

                  <Link to="/create-post">CREATE POST</Link>
                </Button>
              </Row>
            </div>



            <Row className="md:flex-wrap sm:flex-wrap items-start sm:mx-[0] sm:px-[0] sm:w-[100%] md:w-[100%] w-[34%] mt-[10px]">

              <Column>
                <Row>
                  <Img
                    src="images/img_frame413_20X20.svg"
                    className=""
                    alt="Frame413"
                  />
                  <Text className="rowframe4131" variant="body3">
                    ROADMAP
                  </Text>
                </Row>
              </Column>
              <Column>
                <Row className="md:flex-wrap sm:flex-wrap items-start mx-[10px] sm:px-[0] sm:w-[100%]">
                  <Img
                    src="images/img_lightbulbalto_20X20.svg"
                    className=""
                    alt="lightbulbaltO"
                  />
                  <SelectBox
                    className="common-pointer lg:ml-[15px] xl:ml-[24px] 2xl:ml-[27px] 3xl:ml-[32px] w-[200%]"
                    options={selectBoxData}
                    name="rowlightbulb"
                    onChange={(e) => {
                      handleSubmitBoard(e);
                    }}

                    isSearchable={true}
                    isMulti={false}
                    placeholder="GIVE FEEDBACK"
                    defaultValue={selectedBoard}
                  />
                </Row>
              </Column>
            </Row>



          </Column>
          <Line className="bg-bluegray_100 h-[1px] md:mt-[12px] mt-[24px] sm:mt-[9px] w-[100%]" />
        </Column>
      </header>
    </>
  );
};

export default Header3;