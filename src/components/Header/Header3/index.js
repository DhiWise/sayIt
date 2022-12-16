import React from "react";
import UserroadmapOnePage from "../../../pages/UserroadmapOne/index";
import ReactTooltip from 'react-tooltip';
import { fetchInitals } from "util";
import { UserType } from "constants/Constant";

import {
  Column,
  Row,
  Button,
  Img,
  Text,
  Line,
  Input,
  SelectBox,
} from "components";
import {
  getBoardsselectname,
  getPostsboardideq1,
  postPostlistwithcustomsorting,
  getUpvotespostideq1,
  deleteUpvotespostideq1,
  upvotePosts,
} from "service/api";
import { Link } from "react-router-dom";

import UsernotificationspopupModal from "modals/Usernotificationspopup";
import { useNavigate } from "react-router-dom";
import { increment, selectCount } from 'reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const _ = require("underscore");


const Header3 = (props) => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [inputvalue, setInputvalue] = React.useState({ title: " " });
  const [apiData, setapiData] = React.useState();
  const [selectBoxData, setselectBoxData] = React.useState();
  const [isOpenUsernotificationspopupModal, setUsernotificationspopupModal] =
    React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {

    callApi();
  }, []);

  function callApi() {
    const queryParams = new URLSearchParams(window.location.search);
    const bid = queryParams.get("bid")
    const req = {};
    getBoardsselectname(req)
      .then((res) => {
        res = _.map(res, (a) => {
          return { value: a.id, label: a.name };
        });
        setselectBoxData(res);
        if (bid) {
          var selected = _.first(_.filter(res, { 'value': parseInt(bid) }));
          if (selected) {
            setSelectedBoard(selected);
            props.setBoardId(selected.value);
          } else {
            setSelectedBoard({ label: res[0].label, value: res[0].value });
            props.setBoardId(res[0].value);
          }
        } else {
          setSelectedBoard({ label: res[0].label, value: res[0].value });
          props.setBoardId(res[0].value);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleSubmitBoard(bid) {

    const currentUrlParts = window.location.href.split('/');
    var lastSegment = currentUrlParts.pop();

   

    if (lastSegment == "" || lastSegment == "userroadmapone" || lastSegment == 'Userpostdetails' || lastSegment == 'Usernotifications') {
      navigate("/usercreatepost?bid=" + bid);
    }

    props.setBoardId && props.setBoardId(bid);
  }

  function handleOpenUsernotificationspopupModal() {
    setUsernotificationspopupModal(true);
  }

  function handleCloseUsernotificationspopupModal() {
    setUsernotificationspopupModal(false);
  }
  function logout() {
    let value = {};
    dispatch(increment(value));
    localStorage.removeItem('LOGIN');
    navigate('/usercreatepost');
  }
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
                {!localStorage.getItem('LOGIN') ? (
                  <Link to="/login"> <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Login
                  </button></Link>
                ) : (
                  <>
                    <Button
                      className="flex h-[36px] w-[36px] items-center justify-center rounded-radius50  bg-gray-10"
                      size=""
                      variant="icbFillGray104"
                      onClick={handleOpenUsernotificationspopupModal}
                      isOpen={isOpenUsernotificationspopupModal}
                      onRequestClose={handleCloseUsernotificationspopupModal}
                    >
                      <Img
                        src="images/img_group2.svg"
                        className="p-[5px]"
                        alt="GroupTwo"
                        onClick={handleOpenUsernotificationspopupModal}
                        isOpen={isOpenUsernotificationspopupModal}
                        onRequestClose={handleCloseUsernotificationspopupModal}
                      />
                    </Button>
                    {localStorage.getItem('LOGIN') == UserType.Admin ?
                      <Column className="h-[36px] bg-purple_200  items-center 
                    justify-start left-[0]  sm:px-[2px] md: rounded-radius50  w-[36px] p-[5px] ml-[10px]">
                        <Text data-tip="Impersonate as admin"
                          className="mb-[1px] w-[auto]"
                          variant="body1"
                        >
                          <Link to="/adminfeedback">
                            <Img
                              src="images/img_eye.svg"
                            />
                          </Link>
                        </Text>
                      </Column>
                      : <></>}

                    <Column className="dropdown-menu h-[36px] bg-purple_200  items-center justify-start left-[0]  sm:px-[2px] md: rounded-radius50  w-[36px] p-[5px] ml-[10px]">
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
                        {/* <a href="#">Link 2</a>
                    <a href="#">Link 3</a> */}
                      </div>
                    </Column>
                    <Link to="/create-post"> <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded hidden sm:block ml-[10px]">
                    Create Post
                  </button></Link>
                  </>
                )}
              </Row>
            </div>
            <Row className="items-start sm:mx-[0] sm:px-[0] sm:w-[100%] md:w-[100%] w-[34%] mt-[10px]">
              <Link to="/userroadmapone">
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
              </Link>
              <Column>
                <Row className="items-start mx-[10px] sm:px-[0] sm:w-[100%]">
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
          <Line className="bg-bluegray_100 h-[1px] mt-[1px] sm:mt-[9px] w-[100%]" />
        </Column>
      </header>
      {isOpenUsernotificationspopupModal ? (
        <UsernotificationspopupModal
          isOpen={isOpenUsernotificationspopupModal}
          onRequestClose={handleCloseUsernotificationspopupModal}
        />
      ) : null}
    </>
  );
};

export default Header3;