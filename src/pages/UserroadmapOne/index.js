import React from "react";
import Header3 from "components/Header/Header3";

import { useNavigate } from "react-router-dom";

import {
  postPostlistwithcustomsorting,
  getUpvotespostideq1,
  deleteUpvotespostideq1,
  upvotePosts,
  fetchBoardWithPostCount
} from "service/api";
import { Column, Row, Button, Img, Text, Line, List, Footer } from "components";
import { Constant } from "constants/Constant.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { selectCount } from 'reducers/userSlice';
import { useSelector } from 'react-redux';
const _ = require("lodash");

const UserroadmapOnePage = (props) => {
  const [boards, setBoards] = React.useState();
  const navigate = useNavigate();

  //New Code//

  const defaultLimit = 10;
  const count = useSelector(selectCount);


  const [plannedPostsData, setPlannedPostData] = React.useState([]);
  const [inProgressPostsData, setInProgressPostData] = React.useState([]);
  const [completedPostsData, setCompletedPostData] = React.useState([]);

  const plannedListOffset = React.useRef(0);
  const plannedHasMoreData = React.useRef(true);

  const inProgressListOffset = React.useRef(0);
  const inProgressHasMoreData = React.useRef(true);

  const completedListOffset = React.useRef(0);
  const completedHasMoreData = React.useRef(true);

  const [boardDetails, setBoardDetails] = React.useState({});
  const isUpvoteProcessRunning = React.useRef(false);
  //New Code End//


  React.useEffect(() => {
    fetchBoards()
  }, []);

  React.useEffect(() => {
    if (boards && boards.length > 1) {
      fetchPlannedPost();
      fetchInProgressPost();
      fetchCompletedPost();
    }
  }, [boards]);

  const fetchPlannedPost = async () => {
    let plannedPosts = await fetchPosts(Constant.Planned, plannedListOffset.current);

    setPlannedPostData((oldData) => {
      // Start Manual Code
      if (oldData) {
        return [...oldData, ...plannedPosts]
      } else {
        return [...plannedPosts]
      }
    });

    if (plannedPosts?.length < defaultLimit) {
      plannedHasMoreData.current = false;
    }
    plannedListOffset.current = plannedListOffset.current + defaultLimit;
    // End Manual Code
  }

  const fetchInProgressPost = async () => {
    let inProgressPosts = await fetchPosts(Constant.InProgress, inProgressListOffset.current);

    setInProgressPostData((oldData) => {
      // Start Manual Code
      if (oldData) {
        return [...oldData, ...inProgressPosts]
      } else {
        return [...inProgressPosts]
      }
    });

    if (inProgressPosts?.length < defaultLimit) {
      inProgressHasMoreData.current = false;
    }
    inProgressListOffset.current = inProgressListOffset.current + defaultLimit;
    // End Manual Code
  }

  const fetchCompletedPost = async () => {
    let completedPosts = await fetchPosts(Constant.Complete, completedListOffset.current);

    setCompletedPostData((oldData) => {
      if (oldData) {
        // Start Manual Code
        return [...oldData, ...completedPosts]
      } else {
        return [...completedPosts]
      }
    });

    if (completedPosts?.length < defaultLimit) {
      completedHasMoreData.current = false;
    }
    completedListOffset.current = completedListOffset.current + defaultLimit;
    // End Manual Code
  }


  const fetchPosts = async (status, offset) => {

    let req_user = count?.payload?.id ? count.payload.id : null;
    var BoardIds = _.map(boards, 'id');
    const req = { data: { req_board: BoardIds, req_limit: defaultLimit, req_offset: offset, req_user: req_user ? req_user : null } };

    if (status) {
      req.data.req_status = status;
    }
    try {
      return await postPostlistwithcustomsorting(req);
    } catch (error) {
      return null;
    }
  }


  function fetchBoards(data) {
    const req = {};

    fetchBoardWithPostCount(req)
      .then((res) => {
        setBoards(res);
        _.forEach(res, function (board) {
          boardDetails[board.id] = board.name;
        });
      })
      .catch((err) => {
        console.error(err);
      });

  }

  const handleUpvote = async (postId, postStatus, index) => {
    let userId = count?.payload?.id ? count.payload.id : null;
    if (isUpvoteProcessRunning.current) {
      return;
    }
    isUpvoteProcessRunning.current = true;
    const reqParamsForCheckUpvote = { params: { post_id: `eq.${postId}`, user_id: `eq.${userId}` } };
    await getUpvotespostideq1(reqParamsForCheckUpvote)
      .then((res) => {
        if (res.length > 0) {
          downvote(res[0].id, postStatus, index);
        } else {
          performUpvote(postId, userId, postStatus, index);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const performUpvote = (postId, userId, postStatus, index) => {
    const req = { data: { post_id: postId, user_id: userId } };
    upvotePosts(req)
      .then((res) => {
        // Start Manual Code
        if (postStatus == Constant.Planned) {
          const newData = [...plannedPostsData];
          newData[index].user_upvote_id = res[0].id;
          newData[index].upvote_count = newData[index].upvote_count + 1;
          setPlannedPostData(newData);
        } else if (postStatus == Constant.InProgress) {
          const newData = [...inProgressPostsData];
          newData[index].user_upvote_id = res[0].id;
          newData[index].upvote_count = newData[index].upvote_count + 1;
          setInProgressPostData(newData);
        } else if (postStatus == Constant.Complete) {
          const newData = [...completedPostsData];
          newData[index].user_upvote_id = res[0].id;
          newData[index].upvote_count = newData[index].upvote_count + 1;
          setCompletedPostData(newData);
          // End Manual Code
        }
        isUpvoteProcessRunning.current = false;
      })
      .catch((err) => {
        isUpvoteProcessRunning.current = false;
        console.error(err);
      });
  }

  const downvote = (upvoteId, postStatus, index) => {
    const req = { params: { id: `eq.${upvoteId}` } };
    deleteUpvotespostideq1(req)
      .then((res) => {
        // Start Manual Code

        if (postStatus == Constant.Planned) {
          const newData = [...plannedPostsData];
          newData[index].user_upvote_id = null;
          newData[index].upvote_count = newData[index].upvote_count - 1;
          setPlannedPostData(newData);
        } else if (postStatus == Constant.InProgress) {
          const newData = [...inProgressPostsData];
          newData[index].user_upvote_id = null;
          newData[index].upvote_count = newData[index].upvote_count - 1;
          setInProgressPostData(newData);
        } else if (postStatus == Constant.Complete) {
          const newData = [...completedPostsData];
          newData[index].user_upvote_id = null;
          newData[index].upvote_count = newData[index].upvote_count - 1;
          setCompletedPostData(newData);
          // End Manual Code
        }
        isUpvoteProcessRunning.current = false;
      })
      .catch((err) => {
        isUpvoteProcessRunning.current = false;
        console.error(err);
      });
  }

  function handleNavigate(pid, upvotes) {
    navigate("/Userpostdetails", { state: { pid, upvotes } });
  }
  function handleSubmitBoard(bid) {


    navigate("/usercreatepost?bid=" + bid);


  }
  return (
    <>
      <Column className="bg-white_A700 font-inter items-center justify-start mx-[auto] py-[15px] sm:py-[5px] md:py-[7px] w-[100%]">
        <Header3 className="w-[100%]" />
        <Column className="items-center justify-start max-w-[913px] sm:mb-[166px] md:mb-[215px] mb-[418px] sm:mt-[23px] md:mt-[30px] mt-[59px] mx-[auto] sm:px-[15px] w-[100%]">
          <Column className="justify-start sm:px-[0] rounded-radius6 w-[100%]">
            <Text
              className="font-medium text-bluegray_402 w-[auto]"
              variant="body2"
            >
              Give Feedback
            </Text>
            <List
              className="gap-[16px] sm:gap-[6px] md:gap-[8px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] sm:mt-[3px] md:mt-[4px] mt-[9px] rounded-radius6 w-[100%]"
              orientation="horizontal"
            >
              {boards?.map((apiDataResponseEle, index) => {
                return (
                  <React.Fragment key={`apiDataResponseEle${index}`}>
                    <Row className="listinputplaceho_two" onClick={handleSubmitBoard.bind(
                      null,
                      apiDataResponseEle?.id,

                    )}>
                      <Text className="InputPlaceho_One" variant="body2">
                        {apiDataResponseEle?.name}
                      </Text>
                      <Text
                        className="font-normal text-bluegray_400 w-[auto]"
                        variant="body3"
                      >
                        {apiDataResponseEle?.post_count}
                      </Text>
                    </Row>
                  </React.Fragment>
                );
              })}
            </List>
          </Column>
          <Column className="items-center justify-start sm:mt-[18px] md:mt-[23px] mt-[46px] w-[100%]">
            <Column className="justify-start w-[100%]">
              <Text
                className="font-medium text-bluegray_402 w-[auto]"
                variant="body2"
              >
                Roadmap
              </Text>
              <Row className="md:flex-wrap sm:flex-wrap items-start justify-between mt-[12px] sm:mt-[4px] md:mt-[6px] w-[100%]">
                <Column className="bg-gray_103 border border-bluegray_50 border-solid justify-end sm:mb-[14px] md:mb-[18px] mb-[36px] sm:mx-[0] md:p-[12px] sm:p-[15px] p-[24px] rounded-radius8 sm:w-[100%] w-[31%]">
                  <Row className="md:flex-wrap sm:flex-wrap items-center mr-[auto] mt-[3px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
                    <div className="bg-blue_A200 h-[10px]   rounded-radius50 w-[10px]"></div>
                    <Text className="rowpolygontwo" as="h4" variant="h4">
                      Planned
                    </Text>
                  </Row>

                  <Column id="scrollableDivPlanned" className="max-h-[400px] overflow-auto no-scrollbar">
                    {plannedPostsData?.length ? (
                      <List
                        className="min-h-[auto] mt-[16px] sm:mt-[6px] md:mt-[8px]"
                        orientation="vertical"
                      >
                        <InfiniteScroll
                          dataLength={plannedPostsData?.length || 0}
                          next={fetchPlannedPost}
                          hasMore={plannedHasMoreData.current}
                          scrollableTarget="scrollableDivPlanned"
                        >
                          {plannedPostsData?.map((apiDataResponseEle, index) => {
                            return (
                              <React.Fragment key={`apiDataResponseEle${index}`}>
                                <Row className="items-start justify-between w-[100%]">
                                  <Column
                                    onClick={() => {
                                      handleUpvote(apiDataResponseEle?.id, Constant.Planned, index);
                                    }}
                                    className="bg-white_A700 border-bluegray_100 border-bw086 border-solid items-center justify-start mb-[19px] sm:mb-[7px] md:mb-[9px]  md:p-[4px] p-[8px] rounded-radius4 w-[45px] mr-[20px]"
                                  >
                                    <Img
                                      src={
                                        apiDataResponseEle.user_upvote_id != null
                                          ? "images/img_polygon2.svg"
                                          : "images/img_polygon2_bluegray_105.svg"
                                      }
                                      className="sm:w-[100%] w-[58%]"
                                      alt="PolygonTwo"
                                    />

                                    <Text
                                      className="columnpolygontwo2"
                                      variant="body2"
                                    >
                                      {apiDataResponseEle?.["upvote_count"]}
                                    </Text>
                                  </Column>
                                  <Column
                                    onClick={handleNavigate.bind(
                                      null,
                                      apiDataResponseEle?.id,
                                      apiDataResponseEle?.["upvote_count"]
                                    )}
                                    className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[75%]">
                                    <Text
                                      className="Listofpossibl"
                                      variant="body2"
                                    >
                                      {apiDataResponseEle?.title}
                                    </Text>
                                    <Text
                                      className="SMARTEDITORFE"
                                      variant="body3"
                                    >
                                      {boardDetails[apiDataResponseEle?.board_id]}
                                    </Text>
                                  </Column>
                                </Row>
                              </React.Fragment>
                            );
                          })}

                        </InfiniteScroll>
                      </List>
                    ) : (
                      <Text
                        className="text-slate-400 font-thin m-4"
                        as="h6"
                        variant="h6"
                      >
                        Come back soon!
                      </Text>
                    )}
                  </Column>
                </Column>
                <Column className="bg-gray_103 border border-bluegray_50 border-solid justify-end sm:mb-[14px] md:mb-[18px] mb-[36px] sm:mx-[0] md:p-[12px] sm:p-[15px] p-[24px] rounded-radius8 sm:w-[100%] w-[31%]">
                  <Row className="md:flex-wrap sm:flex-wrap items-center mr-[auto] mt-[3px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
                    <div className="bg-purple_A400 h-[10px]   rounded-radius50 w-[10px]"></div>

                    <Text className="rowpolygontwo" as="h4" variant="h4">
                      In Progress
                    </Text>
                  </Row>

                  <Column id="scrollableDivInProgress" className="max-h-[400px] overflow-auto no-scrollbar">
                    {inProgressPostsData?.length ? (
                      <List
                        className="min-h-[auto] mt-[16px] sm:mt-[6px] md:mt-[8px] sm:w-[100%] w-[96%]"
                        orientation="vertical"
                      >
                        <InfiniteScroll
                          dataLength={inProgressPostsData?.length || 0}
                          next={fetchInProgressPost}
                          hasMore={inProgressHasMoreData.current}
                          scrollableTarget="scrollableDivInProgress"
                        >
                          {inProgressPostsData?.map(
                            (apiDataResponseEle, index) => {
                              return (
                                <React.Fragment
                                  key={`apiDataResponseEle${index}`}
                                >
                                  <Row className="items-start justify-between w-[100%]">
                                    <Column
                                      onClick={() => {
                                        handleUpvote(apiDataResponseEle?.id, Constant.InProgress, index);
                                      }}
                                      className="bg-white_A700 border-bluegray_100 border-bw086 border-solid items-center justify-start mb-[19px] sm:mb-[7px] md:mb-[9px]  md:p-[4px] p-[8px] rounded-radius4 w-[45px] mr-[20px]"
                                    >
                                      <Img
                                        src={
                                          apiDataResponseEle.user_upvote_id !=
                                            null
                                            ? "images/img_polygon2.svg"
                                            : "images/img_polygon2_bluegray_105.svg"
                                        }
                                        className="sm:w-[100%]"
                                        alt="PolygonTwo"
                                      />

                                      <Text
                                        className="columnpolygontwo2"
                                        variant="body2"
                                      >
                                        {apiDataResponseEle?.["upvote_count"]}
                                      </Text>
                                    </Column>
                                    <Column
                                      onClick={handleNavigate.bind(
                                        null,
                                        apiDataResponseEle?.id,
                                        apiDataResponseEle?.["upvote_count"]
                                      )}
                                      className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[75%]">
                                      <Text
                                        className="Listofpossibl"
                                        variant="body2"
                                      >
                                        {apiDataResponseEle?.title}
                                      </Text>
                                      <Text
                                        className="SMARTEDITORFE"
                                        variant="body3"
                                      >
                                        {boardDetails[apiDataResponseEle?.board_id]}
                                      </Text>
                                    </Column>
                                  </Row>
                                </React.Fragment>
                              );
                            }
                          )}
                        </InfiniteScroll>
                      </List>
                    ) : (
                      <Text
                        className="text-slate-400 font-thin m-4"
                        as="h6"
                        variant="h6"
                      >
                        Come back soon!
                      </Text>
                    )}

                  </Column>
                </Column>
                <Column className="bg-gray_103 border border-bluegray_50 border-solid justify-end sm:mb-[14px] md:mb-[18px] mb-[36px] sm:mx-[0] md:p-[12px] sm:p-[15px] p-[24px] rounded-radius8 sm:w-[100%] w-[31%]">
                  <Row className="md:flex-wrap sm:flex-wrap items-center mr-[auto] mt-[3px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
                    <div className="bg-light_green_A700  h-[10px]   rounded-radius50 w-[10px]"></div>
                    <Text className="rowpolygontwo" as="h4" variant="h4">
                      Completed
                    </Text>
                  </Row>
                  <Column id="scrollableDivInCompleted" className="max-h-[400px] overflow-auto no-scrollbar">
                    {completedPostsData?.length ? (
                      <List
                        className="min-h-[auto] mt-[16px] sm:mt-[6px] md:mt-[8px] sm:w-[100%] w-[96%]"
                        orientation="vertical"
                      >
                        <InfiniteScroll
                          dataLength={completedPostsData?.length || 0}
                          next={fetchCompletedPost}
                          hasMore={completedHasMoreData.current}
                          scrollableTarget="scrollableDivInCompleted"
                        >
                          {completedPostsData?.map((apiDataResponseEle, index) => {
                            return (
                              <React.Fragment key={`apiDataResponseEle${index}`}>
                                <Row className="items-start justify-between w-[100%]">
                                  <Column
                                    onClick={() => {
                                      handleUpvote(apiDataResponseEle?.id, Constant.Complete, index);
                                    }}
                                    className="bg-white_A700 border-bluegray_100 border-bw086 border-solid items-center justify-start mb-[19px] sm:mb-[7px] md:mb-[9px]  md:p-[4px] p-[8px] rounded-radius4 w-[45px] mr-[20px]"
                                  >
                                    <Img
                                      src={
                                        apiDataResponseEle.user_upvote_id != null
                                          ? "images/img_polygon2.svg"
                                          : "images/img_polygon2_bluegray_105.svg"
                                      }
                                      className="sm:w-[100%]"
                                      alt="PolygonTwo"
                                    />

                                    <Text
                                      className="columnpolygontwo2"
                                      variant="body2"
                                    >
                                      {apiDataResponseEle?.["upvote_count"]}
                                    </Text>
                                  </Column>
                                  <Column
                                    onClick={handleNavigate.bind(
                                      null,
                                      apiDataResponseEle?.id,
                                      apiDataResponseEle?.["upvote_count"]
                                    )}
                                    className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[75%]">
                                    <Text
                                      className="Listofpossibl"
                                      variant="body2"
                                    >
                                      {apiDataResponseEle?.title}
                                    </Text>
                                    <Text
                                      className="SMARTEDITORFE"
                                      variant="body3"
                                    >
                                      {boardDetails[apiDataResponseEle?.board_id]}
                                    </Text>
                                  </Column>
                                </Row>
                              </React.Fragment>
                            );
                          })}
                        </InfiniteScroll>
                      </List>
                    ) : (
                      <Text
                        className="text-slate-400 font-thin m-4"
                        as="h6"
                        variant="h6"
                      >
                        Come back soon!
                      </Text>
                    )}
                  </Column>
                </Column>
              </Row>
            </Column>
          </Column>
        </Column>
      </Column>
      <Footer />
    </>
  );
};

export default UserroadmapOnePage;