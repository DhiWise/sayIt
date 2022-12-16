import React from "react";
import ModalProvider from "react-modal";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { Column, Row, Text, Line, List } from "components";
import { Constant } from "constants/Constant.js";
import {
  patchNotifications,
  postPostlistwithcustomsorting,
  getNotificationsUser,
} from "service/api";
import { selectCount } from 'reducers/userSlice';
import { useSelector } from 'react-redux';

const _ = require("underscore");
const UsernotificationspopupModal = (props) => {
  const [apiData, setapiData] = React.useState([]);
  const [PostDetails, setPostDetails] = React.useState(true);
  const navigate = useNavigate();
  const count = useSelector(selectCount);

  React.useEffect(() => {
    callApi();
    fetchPostForDetails();
  }, []);
  function callApi() {
    const req = { params: { user_id: `eq.${count?.payload?.id}`, offset: 0 } };

    getNotificationsUser(
      req
    )
      .then((res) => {
        res.forEach((d) => {
          if (d.activity === "STATUS_UPDATES") {
            const req = {
              params: {
                user_id: `eq.${d.user_id}`,
                post_id: `eq.${d.post_id}`,
               limit:3,
                activity: `in.(NEW_COMMENTS,NEW_POSTS)`,
                
              },
            };

            getNotificationsUser(
              req
            )
              .then((res) => {
                res.forEach((data) => {
               
                  if (data.activity === "NEW_COMMENTS") {
                    data.activity = "A post you commented on,";
                    data.activity1 = "has been marked as";
                  }
                  if (data.activity === "NEW_POSTS") {
                    data.activity = "Your post,";
                    data.activity1 = "has been marked as";
                  }
                
                });

                setapiData(res);
              })
              .catch((err) => {
                console.error(err);
              });
          }
       
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function fetchPostForDetails() {

    let req_user = count?.payload?.id;

    const req = {
      data: {
       
        req_limit: 100,
        req_offset: 0,
        req_user: req_user ? req_user : null,
      },
    };

    postPostlistwithcustomsorting(req)
      .then((res) => {
        res = _.compact(res);
        setPostDetails(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleNavigate() {
   
    navigate("/Usernotifications");
  }
  function handlePostDetails(pid, upvotes, nid) {
    const req = { params: { id: `eq.${nid}` }, data: { is_read: "true" } };

    patchNotifications(req)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
    navigate("/Userpostdetails", { state: { pid, upvotes } });
  }
  function handleMarkallReadNotification() {
    let user_id = count?.payload?.id;
    const req = {
      params: { user_id: `eq.${user_id}` },
      data: { is_read: "true" },
    };

    patchNotifications(req)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className="m-[auto] mt-[80px] mr-[0px] w-[32%] sm:w-[100%]"
        overlayClassName="fixed flex h-[100%] inset-y-[0] w-[100%]"
        {...props}
      >
        <div className="m-[auto] max-h-[97vh]">
          <Column
            className=" bg-gray-100 items-center justify-end max-w-[390px] sm:mb-[181px] md:mb-[234px] mb-[454px] mx-[auto] sm:px-[15px] sm:py-[15px] py-[16px] md:py-[8px] w-[100%]"
            
          >
            <Row className="md:flex-wrap sm:flex-wrap items-center justify-between mt-[11px] sm:mt-[4px] md:mt-[5px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[88%]">
              <Text
                className="font-bold text-bluegray_402 tracking-ls07000000000000001 md:tracking-ls1 sm:tracking-ls1 w-[auto]"
                variant="body2"
              >
                NOTIFICATIONS
              </Text>
              <Text
                className="font-normal not-italic text-indigo_A200 w-[auto]"
                variant="body2"
                onClick={handleMarkallReadNotification}
              >
                Mark all as read
              </Text>
            </Row>
            <Column className="items-center justify-start mt-[16px] sm:mt-[6px] md:mt-[8px] w-[100%]">
              <Line className="bg-bluegray_100 h-[1px] w-[100%]" />
              <List
                className="min-h-[auto] mt-[19px] sm:mt-[7px] md:mt-[9px] md:pb-[12px] pb-[24px] sm:pb-[9px] md:px-[12px] sm:px-[15px] px-[24px] w-[100%]"
                orientation="vertical"
              >
                 {apiData?.map((apiDataResponseEle, index) => {
                if (apiDataResponseEle.posts.status === Constant.Open) {
                  apiDataResponseEle.posts.status = "Open";
                } else if (
                  apiDataResponseEle.posts.status === Constant.UnderReview
                ) {
                  apiDataResponseEle.posts.status = "UnderReview";
                } else if (
                  apiDataResponseEle.posts.status === Constant.Planned
                ) {
                  apiDataResponseEle.posts.status = "Planned";
                } else if (
                  apiDataResponseEle.posts.status === Constant.InProgress
                ) {
                  apiDataResponseEle.posts.status = "Inprogress";
                } else if (
                  apiDataResponseEle.posts.status === Constant.Complete
                ) {
                  apiDataResponseEle.posts.status = "Completed";
                } else if (
                  apiDataResponseEle.posts.status === Constant.Closed
                ) {
                  apiDataResponseEle.posts.status = "Closed";
                }

                return (
                  <React.Fragment key={`apiDataResponseEle${index}`}>
                     <Column className={`bg-white_A700 justify-start my-[0] outline outline-[0.5px] outline-bluegray_100 md:p-[12px] sm:p-[15px] p-[24px] rounded-bl-[0] mb-[5px]   w-[100%]  ${!apiDataResponseEle?.is_read ? "unread-notification" : " "}`}>
                      {PostDetails?.map((apiDataResponseEle2) => {
                        if (
                          apiDataResponseEle?.post_id ===
                          apiDataResponseEle2?.id
                        ) {
                          apiDataResponseEle.upvote_count =
                            apiDataResponseEle2?.["upvote_count"];
                        }
                      })}
                <Column  
                onClick={handlePostDetails.bind(
                          null,
                          apiDataResponseEle?.post_id,
                          apiDataResponseEle?.["upvote_count"],
                          apiDataResponseEle?.id
                        )} 
                        className="justify-start sm:px-[0] w-[100%]">
               
                        {" "}
                  <Text className="YourpostNavi" as="h6" variant="h6">
                  {apiDataResponseEle?.activity}
                          {apiDataResponseEle?.posts?.title}{" "}
                          {apiDataResponseEle?.activity1}{" "}
                          {apiDataResponseEle?.posts.status}
                          {"."}
                  </Text>
                  <Text className="October72022" variant="body2">
                  {moment(apiDataResponseEle?.date).format(
                            "MMMM D, YYYY"
                          )}{" "}
                  </Text>
                </Column>
                </Column>
                </React.Fragment>
                );
              })}
              </List>
              <Line className="bg-bluegray_100 h-[1px] md:mt-[10px] mt-[20px] sm:mt-[7px] w-[100%]" />
              <Text className="CustomDomains text" variant="body2"
              onClick={handleNavigate}
              >
                See all
              </Text>
            </Column>
          </Column>
        </div>
      </ModalProvider>
    </>
  );
};

export default UsernotificationspopupModal;
