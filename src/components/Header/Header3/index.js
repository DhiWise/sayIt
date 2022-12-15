import React from "react";
import ReactTooltip from 'react-tooltip';

import {
  Column,
  Row,
  Button,
  Img,
  Text,
  Line,
} from "components";
import { Link } from "react-router-dom";



const Header3 = (props) => {

  return (
    <>
      <ReactTooltip />
      <header className={props.className}>
        <Column className="items-center justify-start w-[100%] ">
          <Column className="justify-start sm:mx-[0] sm:px-[15px] px-[30px] py-[10px] sm:w-[100%] md:w-[100%]  w-[991px]">
            <div>

              <Row className="float-left">
                <Text className="text-blue-700" as="h4" variant="h2">
                  SayIt
                </Text></Row>
              <Row className="float-right">
                <Link to="/login"> <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Login
                </button></Link>
              </Row>
            </div>
            <Row className="items-start sm:mx-[0] sm:px-[0] sm:w-[100%] md:w-[100%] w-[34%] mt-[10px]">
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
                <Row className="items-start mx-[10px] sm:px-[0] sm:w-[100%]">
                  <Img
                    src="images/img_lightbulbalto_20X20.svg"
                    className=""
                    alt="lightbulbaltO"
                  />
                </Row>
              </Column>
            </Row>



          </Column>
          <Line className="bg-bluegray_100 h-[1px] mt-[1px] sm:mt-[9px] w-[100%]" />
        </Column>
      </header>

    </>
  );
};

export default Header3;