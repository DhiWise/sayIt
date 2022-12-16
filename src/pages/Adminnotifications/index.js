import React from "react";

import { Column, Row, List, Text, CheckBox, Img, Line, Footer } from "components";
import Header from "components/Header/Header";
import {
  fetchBoardData,
  fetchNotificationListWithFiltersData
} from "service/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import InfiniteScroll from 'react-infinite-scroll-component';

import { useNavigate } from "react-router-dom";
import { Constant } from "constants/Constant.js";
import { selectCount } from 'reducers/userSlice';
import { useSelector } from 'react-redux';
const AdminnotificationsPage = () => {
  const count = useSelector(selectCount);

  const navigate = useNavigate();
  const [boardData, setBoardData] = React.useState();
  const [notificationFilterData, setNotificationFilterData] = React.useState();
  const defaultLimit = 15;
  const offset = React.useRef(0);
  const hasMoreData = React.useRef(true);

  const activityFilter = React.useRef([]);
  const boardFilter = React.useRef([]);

  const handleActivityChange = (e) => {

    let activityFilterItems = [...activityFilter.current, e.target.value];
    if (activityFilter.current.includes(e.target.value)) {
      activityFilterItems = activityFilterItems.filter(day => day !== e.target.value);
    }
    activityFilter.current = activityFilterItems;
    refreshNotificationList()
  }

  const handleBoardChange = (e) => {

    let boardFilterItems = [...boardFilter.current, e.target.value];
    if (boardFilter.current.includes(e.target.value)) {
      boardFilterItems = boardFilterItems.filter(day => day !== e.target.value);
    }
    boardFilter.current = boardFilterItems;
    refreshNotificationList()
  }

  React.useEffect(() => {
    getAllBoards();
    NotificationWithFilters();
  }, []);

  function getAllBoards() {
    const req = {};

    fetchBoardData(req)
      .then((res) => {
        setBoardData(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error  on board list");
      });
  }

  const refreshNotificationList = () => {
    offset.current = 0;
    hasMoreData.current = true;

    setNotificationFilterData([]);
    NotificationWithFilters();
  }


  function NotificationWithFilters() {

    const reqParams = {
      limit: defaultLimit, offset: offset.current
    };

    if (activityFilter.current.length) {
      reqParams.activity = "in.(" + activityFilter.current + ")";

    }
    if (boardFilter.current.length) {

      reqParams.board_id = "in.(" + boardFilter.current + ")";
    }

    const req = { params: reqParams };

    fetchNotificationListWithFiltersData(
      req
    )
      .then((res) => {
        res.forEach((d) => {
          if (d.activity === "NEW_POSTS") {
            d.activity = "created a post in"
            d.users = d?.profiles?.name
          }

          if (d.activity === "NEW_COMMENTS") {
            d.activity = "commented"
            d.users = d?.action_user?.name
          }

          if (d.activity === "STATUS_UPDATES") {
            d.activity = "marked status as"
            d.status = d?.posts?.status
            d.users = count?.payload?.name
          }
        })
        setNotificationFilterData((oldNotificationData) => {
          //Start Manual Code
          if (oldNotificationData) {
            return [...oldNotificationData, ...res]
          } else {
            return [...res]
          }
        });

        if (res?.length < defaultLimit) {
          hasMoreData.current = false;
        }

        offset.current = offset.current + defaultLimit;

        //End Manual Code
      })
      .catch((err) => {
        console.error(err);
        toast.error("error on notification list");
      });
  }


  function navigateToCreateBoard() {
    navigate("/admincreateboard");
  }

  function navigateToPostDetail(data) {
    navigate("/adminfeedback", { state: { post_id: data } });
  }


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
                    {boardData?.map((boardDataResponseEle, index) => {
                      return (
                        <React.Fragment key={`boardDataResponseEle${index}`}>
                          <Row className="flex flex-row md:flex-wrap sm:flex-wrap items-start w-[100%]">
                            <CheckBox
                              className=" text-sm ml-5 font-thin lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] text-bluegray_700"
                              inputClassName="h-[20px] mr-[5px] w-[20px]"
                              name="board"
                              value={boardDataResponseEle?.id}
                              label={boardDataResponseEle?.name}
                              onChange={handleBoardChange}
                            ></CheckBox>
                          </Row>
                        </React.Fragment>
                      );
                    })}
                  </List>

                  <Row className="items-start ml-[1px] lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] w-auto ml-5"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={navigateToCreateBoard}>
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
                      onChange={handleActivityChange}
                    ></CheckBox>
                    <CheckBox
                      className=" text-sm ml-5 mt-2 font-thin lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] text-bluegray_700"
                      inputClassName="h-[20px] mr-[5px] w-[20px]"
                      name="activity"
                      value="NEW_POSTS"
                      label="New Posts"
                      onChange={handleActivityChange}
                    ></CheckBox>
                    <CheckBox
                      className=" text-sm ml-5 mt-2 font-thin lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] text-bluegray_700"
                      inputClassName="h-[20px] mr-[5px] w-[20px]"
                      name="activity"
                      value="STATUS_UPDATES"
                      label="Status Updates"
                      onChange={handleActivityChange}
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
                <InfiniteScroll
                  dataLength={notificationFilterData?.length || 0}
                  next={NotificationWithFilters}
                  hasMore={hasMoreData}
                  scrollableTarget="scrollableDivUser"
                >
                  <List
                    className="gap-[0] min-h-[auto] lg:mt-[12px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] w-[auto]"
                    orientation="vertical"
                  >
                    {notificationFilterData?.map((apiDataNotificationFilterResponseEle, index) => {
                      if (apiDataNotificationFilterResponseEle.status === Constant.Open) {
                        apiDataNotificationFilterResponseEle.status = "OPEN";
                      }
                      else if (
                        apiDataNotificationFilterResponseEle.status === Constant.UnderReview
                      ) {
                        apiDataNotificationFilterResponseEle.status = "UNDER REVIEW";
                      } else if (apiDataNotificationFilterResponseEle.status === Constant.Planned) {
                        apiDataNotificationFilterResponseEle.status = "PLANNED";
                      } else if (
                        apiDataNotificationFilterResponseEle.status === Constant.InProgress
                      ) {
                        apiDataNotificationFilterResponseEle.status = "INPROGRESS";
                      } else if (
                        apiDataNotificationFilterResponseEle.status === Constant.Complete
                      ) {
                        apiDataNotificationFilterResponseEle.status = "COMPLETE";
                      } else if (apiDataNotificationFilterResponseEle.status === Constant.Closed) {
                        apiDataNotificationFilterResponseEle.status = "CLOSED";
                      }
                      return (
                        <React.Fragment key={`apiDataNotificationFilterResponseEle${index}`}>
                          <Column
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => navigateToPostDetail(apiDataNotificationFilterResponseEle?.post_id)}
                            className="bg-white_A700 justify-start my-[0] outline outline-[0.5px] outline-bluegray_100 lg:p-[12px] xl:p-[16px] 2xl:p-[18px] 3xl:p-[21px] rounded-bl-[0] rounded-br-[0] rounded-tl-[8px] rounded-tr-[8px] w-[auto]">
                            <Column className="justify-start w-[auto]">
                              <Text
                                className=" text-bluegray_900 w-[auto] text-[14px] mt-3 ml-3"
                                as="h6"
                                variant="h6"
                              >
                                {apiDataNotificationFilterResponseEle?.users} has {apiDataNotificationFilterResponseEle?.activity} <b>{apiDataNotificationFilterResponseEle?.owner}</b> <b className="lg:leading-[12px] xl:leading-[16px] 2xl:leading-[18px] 3xl:leading-[21px] 3xl:mt-[11px] lg:mt-[6px] xl:mt-[8px] 2xl:mt-[9px] not-italic text-cyan-600 font-normal	 w-[87%]">{apiDataNotificationFilterResponseEle?.status}</b> in {apiDataNotificationFilterResponseEle?.boards?.name}, {apiDataNotificationFilterResponseEle?.posts?.title}
                              </Text>
                              <Text className="October12202  mt-1 ml-3 mb-5 text-bluegray_301 text-[12px] font-thin;" variant="body2">

                                {moment(apiDataNotificationFilterResponseEle?.date).format('MMMM D, YYYY')}

                              </Text>
                            </Column>
                          </Column>
                        </React.Fragment>
                      );
                    })}
                  </List>
                </InfiniteScroll>
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
