import React from "react";
import moment from "moment";
import { Column, Row, Text, List, Footer } from "components";
import Header3 from "components/Header/Header3/index.js";
import { Constant } from "constants/Constant.js";
import {
  patchNotifications,
  postPostlistwithcustomsorting,
  getNotificationsUser,
} from "service/api";
import { useNavigate } from "react-router-dom";
import { selectCount } from 'reducers/userSlice';
import { useSelector } from 'react-redux';

const _ = require("underscore");

const UsernotificationsPage = () => {
  const [apiData, setapiData] = React.useState([]);
  const [PostDetails, setPostDetails] = React.useState(true);
  const navigate = useNavigate();
  const [bid, setBoardId] = React.useState();
  const count = useSelector(selectCount);

  React.useEffect(() => {
    callApi();
    fetchPostForDetails();
  }, []);
  function callApi() {
    const req = { params: { user_id: `eq.${count?.payload?.id}`, limit: 1000, offset: 0 } };

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
                activity: `in.(NEW_COMMENTS,NEW_POSTS)`,
                
              },
            };

            getNotificationsUser(
              req
            )
              .then((res) => {
                // Start Manual Code
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
               // End Manual Code
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
        req_board: [1, 2, 3, 4],
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
  function handleNavigate(pid, upvotes, nid) {
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
      <Column className="bg-white_A700 font-inter items-center justify-start mx-[auto] py-[15px] sm:py-[5px] md:py-[7px] w-[100%]">
          <Header3
            className="w-[100%]"
            setBoardId={(e) => setBoardId(e)}
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
            <Row onClick={handleMarkallReadNotification}>
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
                    <Column 
                    
                     className={`bg-white_A700 justify-start my-[0] outline outline-[0.5px] outline-bluegray_100 md:p-[12px] sm:p-[15px] p-[24px] rounded-bl-[0] mb-[5px]   w-[100%]  ${!apiDataResponseEle?.is_read ? "unread-notification" : " "}`}>
                      
                      
                      
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
                        className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[67%]"
                        onClick={handleNavigate.bind(
                          null,
                          apiDataResponseEle?.post_id,
                          apiDataResponseEle?.["upvote_count"],
                          apiDataResponseEle?.id
                        )}
                      >
  
                       
                        {" "}
                       
                        
                        <Text
                          className="font-medium text-bluegray_900 w-[auto]"
                          as="h6"
                          variant="h6"
                        >
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
          </Column>
        </Column>
      </Column>
      <Footer/>
    </>
  );
};

export default UsernotificationsPage;
