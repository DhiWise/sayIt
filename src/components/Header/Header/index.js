import React from "react";

import { Row, Img, Button, Text, Column } from "components";
import { increment, selectCount } from 'reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitals } from "util";
import ReactTooltip from 'react-tooltip';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Adminnotificationspopup from "modals/Adminnotificationspopup";

const Header = (props) => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenAdminnotificationspopup, setAdminnotificationspopup] =
    React.useState(false);
  function handleOpenAdminnotificationspopupModal() {
    setAdminnotificationspopup(true);
  }
  function handleCloseAdminnotificationspopupModal() {
    setAdminnotificationspopup(false);
  }


  function logout() {
    let value = {};
    dispatch(increment(value));
    localStorage.removeItem('LOGIN');
    navigate('/usercreatepost');

  }
  return (
    <>
      <header className="w-[100%]">

        <Row className="bg-indigo_A200 md:p-[10px] sm:p-[15px] listpolygontwo">
          <Img
            src="Sayit-logo.svg"
            className="h-[80px]"
            alt="SayItLogo"
          />
          <Row className="max-w-[1856px] md:ml-[6px] sm:mx-[0] mx-[auto] sm:px-[15px] listpolygontwo">

            <Row className=" md:flex-wrap sm:flex-wrap inset-y-[23%] md:w-[25%]">
              <ul className="items-center justify-between">
                <li className="w-[auto] sm:w-[100%] sm:my-[10px] px-[10px] text-white_A700">
                  <Link to="/adminfeedback">
                    Feedback
                  </Link>
                </li>
                <li className="w-[auto] sm:w-[100%] sm:my-[10px] px-[10px]  text-white_A700">
                  <Link to="/adminnotifications">
                    Notifications
                  </Link>
                </li>
                <li className="w-[auto] sm:w-[100%] sm:my-[10px] px-[10px]  text-white_A700">
                  <Link to="/adminusers">
                    Users
                  </Link>

                </li>
              </ul>
            </Row>
            <Row className="absolute right-10">
              <ReactTooltip />
              <Button
                data-tip="Impersonate as user"
                className="flex items-center justify-center  rounded-radius50 SayItLogo"
                size="mdIcn"
                variant="icbFillWhiteA70033"
              >
                <Link to="/userroadmapone">

                  <Img
                    src="images/img_eye.svg"
                    className="h-[24px] sm:h-[10px] md:h-[13px] flex items-center justify-center"
                    alt="eye"
                  />
                </Link>
              </Button>

              <Button
                data-tip="invite"
                className="flex items-center justify-center  ml-[10px] rounded-radius50"
                size="mdIcn"
                variant="icbFillWhiteA70033"
              >
                <Link to="/invite">
                  <Img
                    src="images/img_lightening.svg"
                    className="h-[24px] sm:h-[10px] md:h-[13px] flex items-center justify-center"
                    alt="Lightening"
                  />
                </Link>
              </Button>

              <Button
                className="flex items-center justify-center md:ml-[12px] ml-[10px] sm:ml-[9px] rounded-radius50 SayItLogo"
                size="mdIcn"
                variant="icbFillWhiteA70033"

                onClick={handleOpenAdminnotificationspopupModal}
                isOpen={isOpenAdminnotificationspopup}
                onRequestClose={handleCloseAdminnotificationspopupModal}
              >
                <Img
                  src="images/img_bell.svg"
                  className="h-[24px] sm:h-[10px] md:h-[13px] flex items-center justify-center"
                  alt="Bell"

                  onClick={handleOpenAdminnotificationspopupModal}
                  isOpen={isOpenAdminnotificationspopup}
                  onRequestClose={handleCloseAdminnotificationspopupModal}
                />
              </Button>

              <Column className="dropdown-menu h-[40px] bg-purple_200  items-center justify-start left-[0]  sm:px-[2px] md: rounded-radius50  w-[40px] p-[10px] ml-[10px]">
                <Text
                  className="mb-[1px] text-white_A700 w-[auto]"
                  variant="body1"
                >
                  {fetchInitals(count?.payload?.name)}
                </Text>
                <div class="dropdown-content">
                  <a href="#"
                    onClick={() => {
                      logout()
                    }}
                  >
                    Logout
                  </a>
                </div>
              </Column>


            </Row>
          </Row>
        </Row>
      </header>
      {Adminnotificationspopup ? (
        <Adminnotificationspopup
          isOpen={isOpenAdminnotificationspopup}
          onRequestClose={handleCloseAdminnotificationspopupModal}
        />
      ) : null}
    </>
  );
};
export default Header;