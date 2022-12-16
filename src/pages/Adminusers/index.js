import React from "react";

import {
  Column,
  Row,
  Img,
  Stack,
  Text,
  Input,
  RadioGroup,
  Radio,
  List,
  CheckBox,
  Footer
} from "components";
import { CloseSVG } from "../../assets/images/index.js";
import {
  fetchPostListWithFilterData,
  fetchUserListWithSortingData,
  fetchUserData,
  fetchUserPostCountData,
  fetchUserVotesCountData,
  fetchUserCommentCountData,
  fetchUserCountData
} from "service/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from "components/Header/Header";
import { useNavigate } from "react-router-dom";
import { fetchInitals } from "util/index.js";
const AdminusersPage = () => {

  const navigate = useNavigate();
  const defaultLimit = 10;
  const offsetForUser = React.useRef(0);
  const hasMoreDataForUser = React.useRef(true);
  const [userSortBy, setUserSortBy] = React.useState(0);
  const [userDetailsData, setUserDetailsData] = React.useState();
  const [userPostCountData, setUserPostCountData] = React.useState();
  const [userCommentCountData, setUserCommentCountData] = React.useState();
  const [userUpvoteCountData, setUserUpvoteCountData] = React.useState();
  const [userCountData, setUserCountData] = React.useState();
  const [inputvalue, setInputvalue] = React.useState("");
  const currentUserId = React.useRef(null);
  const postListOffset = React.useRef(0);
  const posthasMoreData = React.useRef(true);
  const postFilter = React.useRef([]);
  const [postListWithFilterData, setPostListWithFilterData] = React.useState([]);
  const [userData, setUserData] = React.useState();
  const searchKeyword = React.useRef(null);

  React.useEffect(() => {
    fetchUserList();

  }, [userSortBy]);

  const handleSortChange = (e) => {
    offsetForUser.current = 0;
    hasMoreDataForUser.current = true;
    setUserData([]);
    setPostListWithFilterData([]);
    postListOffset.current = 0;
    posthasMoreData.current = true;
    setUserSortBy(e.target.value)
  }

  const handleActivityChange = (e) => {

    let filterItems = [...postFilter.current, e.target.value];
    if (postFilter.current.includes(e.target.value)) {
      filterItems = filterItems.filter(day => day !== e.target.value);
    }
    postFilter.current = filterItems;
    refreshPostList(currentUserId.current);
  }

  const refreshPostList = (userId) => {
    currentUserId.current = userId;
    postListOffset.current = 0;
    posthasMoreData.current = true;

    setPostListWithFilterData([]);
    FetchUser();
    fetchUserPostCount();
    fetchUserCommentCount();
    fetchUserVotesCount();
    fetchPostList();
  }

  function fetchUserVotesCount() {
    const req = { params: { user_id: "eq." + currentUserId.current } };

    fetchUserVotesCountData(req)
      .then((res) => {
        setUserUpvoteCountData(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("error on votes count");
      });
  }

  function fetchUserCommentCount() {
    const req = { params: { user_id: "eq." + currentUserId.current } };

    fetchUserCommentCountData(req)
      .then((res) => {
        setUserCommentCountData(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error on comment count");
      });
  }

  function fetchUserPostCount() {
    const req = { user_id: "eq." + currentUserId.current };
    fetchUserPostCountData(req)
      .then((res) => {
        setUserPostCountData(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("error on getUserPostCount");
      });
  }

  function fetchUserCount() {
    const req = {};

    fetchUserCountData(req)
      .then((res) => {
        setUserCountData(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("error on user count");
      });
  }


  function FetchUser() {
    const req = { user_id: "eq." + currentUserId.current };
    fetchUserData(req)
      .then((res) => {
        setUserDetailsData(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error in getUserDetails");
      });
  }

  function fetchPostList() {

    if (currentUserId.current) {
      const req = { data: { req_user: currentUserId.current, req_limit: defaultLimit, req_offset: postListOffset.current, req_activity: postFilter.current } };

      fetchPostListWithFilterData(req)
        .then((res) => {
          setPostListWithFilterData((oldData) => {
            if (oldData) {
              return [...oldData, ...res]
            } else {
              return [...res]
            }
          });

          if (res?.length < defaultLimit) {
            posthasMoreData.current = false;
          }
          postListOffset.current = postListOffset.current + defaultLimit;
        })
        .catch((err) => {
          console.error(err);
          toast.error("Something went wrong!");
        });
    }

  }

  function fetchUserList() {


    const req = { data: { req_sort_by: userSortBy, req_limit: 15, req_offset: offsetForUser.current } };

    let search = null;

    if (searchKeyword.current && searchKeyword.current.length > 2) {
      search = searchKeyword.current
    }

    if (search != null) {
      req.data.req_search = search
    }

    fetchUserListWithSortingData(req)
      .then((res) => {
        setUserData((oldUserData) => {
          if (oldUserData) {
            return [...oldUserData, ...res]
          } else {
            return [...res]
          }
        });

        if (res?.length < 15) {
          hasMoreDataForUser.current = false;
        }

        if (postListWithFilterData.length < 1) {
          currentUserId.current = res?.[0].id;
          fetchPostList();

          FetchUser();
          fetchUserPostCount();
          fetchUserCommentCount();
          fetchUserVotesCount();
          fetchUserCount();

        }

        offsetForUser.current = offsetForUser.current + defaultLimit;
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  }

  function navigateToPostDetail(data) {
    navigate("/adminfeedback", { state: { post_id: data } });
  }

  function handleSearchChange(event) {

    searchKeyword.current = null

    if (event.length > 2) {
      searchKeyword.current = event
    }

    offsetForUser.current = 0;
    hasMoreDataForUser.current = true;
    setUserData([])
    fetchUserList()
  }


  return (
    <>
      <Column className="bg-gray_50 font-inter items-center justify-start mx-[auto] w-[100%]">
        <Column className="items-center justify-start w-[100%] min-h-screen">
          <Header className="w-[100%]" />
          <Row className="md:flex-wrap sm:flex-wrap  sm:mx-[0] mx-[auto] sm:px-[15px] w-[100%] grow ">
            <Column className="justify-start ml-5 md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[14%]">
              <Column className="justify-start sm:mt-[15px] md:mt-[20px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
                <Text
                  className="font-semibold text-bluegray_900 w-[auto]"
                  variant="body2"
                >
                  Sort
                </Text>
                <RadioGroup
                  selectedValue="LAST_ACTIVITY"
                  className="mt-[10px] sm:mt-[3px] md:mt-[5px] w-[100%]"
                  name="radiogrouplastactivity"
                >
                  <Radio
                    value="LAST_ACTIVITY"
                    className="font-medium mr-[4px] sm:mt-[3px] md:mt-[4px] mt-[8px] text-[14px] text-bluegray_700"
                    inputClassName="h-[20px] mr-[5px] w-[20px]"
                    checked={true}
                    onClick={handleSortChange}
                    name="radiogrouplastactivity"
                    label="Last Activity"
                    variant="OutlineIndigoA200"
                  ></Radio>
                  <Radio
                    value="TOP_POSTERS"
                    className="font-medium mr-[4px] sm:mt-[3px] md:mt-[4px] mt-[8px] text-[14px] text-bluegray_700"
                    inputClassName="h-[20px] mr-[5px] w-[20px]"
                    checked={false}
                    onClick={handleSortChange}
                    name="radiogrouplastactivity"
                    label="Top Posters"
                  ></Radio>
                  <Radio
                    value="TOP_VOTERS"
                    className="font-medium mr-[4px] sm:mt-[3px] md:mt-[4px] mt-[8px] text-[14px] text-bluegray_700"
                    inputClassName="h-[20px] mr-[5px] w-[20px]"
                    checked={false}
                    onClick={handleSortChange}
                    name="radiogrouplastactivity"
                    label="Top Voters"
                  ></Radio>
                </RadioGroup>
              </Column>
              <Column className="justify-start sm:mt-[15px] md:mt-[20px] mt-[40px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
                <Text
                  className="font-semibold text-bluegray_900 w-[auto]"
                  variant="body2"
                >
                  Activity
                </Text>
                <Column className="justify-start mt-[10px] sm:mt-[3px] md:mt-[5px] w-[100%]">


                  <Row className="md:flex-wrap sm:flex-wrap items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[64%]">
                    <CheckBox
                      className="font-medium sm:mt-[3px] md:mt-[4px] mt-[8px] text-[14px] text-bluegray_700"
                      inputClassName="h-[20px] mr-[5px] w-[20px]"
                      name="Posts"
                      label="Posts"
                      value="post"
                      onChange={handleActivityChange}
                    ></CheckBox>
                  </Row>

                  <Row className="md:flex-wrap sm:flex-wrap items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[64%]">
                    <CheckBox
                      className="font-medium sm:mt-[3px] md:mt-[4px] mt-[8px] text-[14px] text-bluegray_700"
                      inputClassName="h-[20px] mr-[5px] w-[20px]"
                      name="Votes"
                      label="Votes"
                      value="upvote"
                      onChange={handleActivityChange}
                    ></CheckBox>
                  </Row>

                  <Row className="md:flex-wrap sm:flex-wrap items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[64%]">
                    <CheckBox
                      className="font-medium sm:mt-[3px] md:mt-[4px] mt-[8px] text-[14px] text-bluegray_700"
                      inputClassName="h-[20px] mr-[5px] w-[20px]"
                      name="Comments"
                      label="Comments"
                      value="comment"
                      onChange={handleActivityChange}
                    ></CheckBox>
                  </Row>
                </Column>
              </Column>
            </Column>
            <Stack id="scrollableDivUser" className=" md:ml-[12px] ml-[24px] sm:ml-[9px] w-[20%] brd-left overflow-auto">

              <Row className="mt-5 md:flex-wrap sm:flex-wrap items-center ml-[16px] md:ml-[8px] sm:mx-[0] sm:px-[0] sm:w-[100%]">

                <Text
                  className="font-semibold text-bluegray_900 w-[auto]"
                  variant="body2"
                >
                  Users
                </Text>
                {userCountData?.map((userCountDataResponseEle, index) => {
                  return (
                    <React.Fragment key={`userCountDataResponseEle${index}`}>
                      <Text
                        className="text-bluegray_400 rowheartoutline"
                        variant="body2"
                      >
                        ({userCountDataResponseEle?.count} total)
                      </Text>
                    </React.Fragment>
                  );
                })}
              </Row>
              <InfiniteScroll
                dataLength={userData?.length || 0}
                next={fetchUserList}
                hasMore={hasMoreDataForUser.current}
                scrollableTarget="scrollableDivUser"
              >
                <Column className="absolute items-center justify-start top-[2%] w-[100%]">
                  <Input
                    onChange={(e) => handleSearchChange(e?.target?.value)}
                    className="mt-5 font-normal not-italic p-[0] text-[14px] placeholder:text-bluegray_401 text-bluegray_401 w-[100%]"
                    wrapClassName="flex md:mt-[9px] mt-[19px] sm:mt-[7px] w-[100%]"
                    name="Group320"
                    placeholder="Search by name..."
                    prefix={
                      <Img
                        src="images/img_search.svg"
                        className="mt-5 cursor-pointer ml-[14px] mr-[8px] sm:mr-[3px] sm:ml-[5px] md:mr-[4px] md:ml-[7px] my-[auto]"
                        alt="search"
                      />
                    }
                    suffix={
                      inputvalue?.length > 0 ? (
                        <CloseSVG
                          color="#8a8a8a"
                          className="mt-5 cursor-pointer ml-[10px] mr-[22px] sm:mr-[8px] sm:ml-[3px] md:mr-[11px] md:ml-[5px] my-[auto]"
                          onClick={() => setInputvalue("")}
                        />
                      ) : (
                        ""
                      )
                    }
                    size="smSrc"
                    variant="srcUnderLineBluegray100"
                  ></Input>

                  {userData?.map((user, index) => {
                    return (
                      <React.Fragment key={`postListWithFilterDataResponseEle${index}`}>

                        <Column

                          style={{
                            cursor: "pointer",
                          }}

                          onClick={() => { refreshPostList(user.id) }}
                          className="bg-white_A700 outline outline-[0.5px] outline-bluegray_100 justify-end p-[13px] sm:p-[5px] md:p-[6px] w-[100%]">
                          <Row
                            className="md:flex-wrap sm:flex-wrap items-center md: mr-[auto] mt-[1px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[18%]">
                            <Stack className="sm:w-[100%] w-[48%]">
                              <Column className="h-[33px] bg-purple_200 h-[max-content] inset-y-[0] items-center justify-start left-[0] my-[auto] sm:px-[2px] md: rounded-radius50 sm:w-[12px] md:w-[16px] w-[32px] p-[5px]">
                                <Text
                                  className="mb-[1px] text-white_A700 w-[auto]"
                                  variant="body1"
                                >
                                  {fetchInitals(user.name)}
                                </Text>
                              </Column>
                            </Stack>
                            <Text
                              className="font-thin sm:ml-[2px] md:ml-[3px] ml-[15px] mt-[1px] w-[auto]"
                              variant="body2"
                            >

                              {user.name}
                            </Text>
                          </Row>
                        </Column>

                      </React.Fragment>);
                  })}
                </Column>
              </InfiniteScroll>
            </Stack>
            <Stack id="scrollableDiv" className=" sm:w-[100%] w-[42%] brd-left overflow-auto">

              <Column className="absolute items-center justify-start top-[0] w-[100%]">



                <List
                  className="gap-[0] min-h-[auto] w-[100%]"
                  orientation="vertical"
                >
                  <InfiniteScroll
                    dataLength={postListWithFilterData?.length || 0}
                    next={fetchPostList}
                    hasMore={posthasMoreData.current}
                    scrollableTarget="scrollableDiv"
                  >
                    {postListWithFilterData?.map((postListWithFilterDataResponseEle, index) => {
                      return (
                        <React.Fragment key={`postListWithFilterDataResponseEle${index}`}>
                          <Row
                            onClick={() => navigateToPostDetail(postListWithFilterDataResponseEle?.id)}
                            style={{
                              cursor: "pointer",
                            }}
                            className="bg-white_A700 sm:mx-[0]  sm:w-[100%] w-[100%] brd-btm" >
                            <Column
                              className="w-[40px] p-[12px] shrink-0 items-center justify-center">
                              {postListWithFilterDataResponseEle.is_self_post ? (
                                <Img
                                  src="images/img_pencil2.svg"
                                  className="user-action-icon "
                                  alt="created"
                                />
                              ) : (
                                <></>
                              )}

                              {postListWithFilterDataResponseEle.is_voted ? (
                                <Img
                                  src="images/img_polygon4.svg"
                                  className="user-action-icon"
                                  alt="upvoted"
                                />
                              ) : (
                                <></>
                              )}

                              {postListWithFilterDataResponseEle.is_commented ? (
                                <Img
                                  src="images/img_comment1.svg"
                                  className="user-action-icon"
                                  alt="commented"
                                />
                              ) : (
                                <></>
                              )}
                            </Column>
                            <div class="bg-bluegray_100 bottom-[0] right-[8%] w-[0.5px]"></div>
                            <Column className="p-[10px]">
                              <Text
                                className="font-medium sm:ml-[2px] md:ml-[3px] ml-[6px] text-bluegray_900 w-[auto]"
                                as="h6"
                                variant="h6"
                              >
                                {postListWithFilterDataResponseEle?.title}
                              </Text>
                              <Text
                                className="sm:ml-[2px] md:ml-[3px] ml-[6px] graphsupport"
                                variant="body2"
                              >

                                {postListWithFilterDataResponseEle?.description}
                              </Text>
                              <Row className="md:flex-wrap sm:flex-wrap items-start md:ml-[3px] ml-[6px] sm:mt-[2px] md:mt-[3px] mt-[7px] sm:mx-[0] sm:px-[0]">
                                <Row className="md:flex-wrap sm:flex-wrap items-start justify-evenly mt-[1px] sm:mx-[0] sm:px-[0]">
                                  <Img
                                    src="images/img_polygon4.svg"
                                    className="user-action-icon"
                                    alt="upvoted"
                                  />
                                  <Text
                                    className="flex-grow font-medium text-bluegray_700 ml-1"
                                    variant="body2"
                                  >
                                    {postListWithFilterDataResponseEle?.upvote_count || 0}
                                  </Text>
                                </Row>
                                <Row className="md:flex-wrap sm:flex-wrap items-start justify-evenly ml-[17px] md:ml-[8px] sm:mx-[0] sm:px-[0]">
                                  <Img
                                    src="images/img_comment1.svg"
                                    className="user-action-icon"
                                    alt="commentOne"
                                  />
                                  <Text
                                    className="flex-grow font-medium text-bluegray_700 ml-1"
                                    variant="body2"
                                  >
                                    {postListWithFilterDataResponseEle?.comment_count || 0}
                                  </Text>
                                </Row>
                              </Row>
                            </Column>
                          </Row>
                        </React.Fragment>);
                    })}
                  </InfiniteScroll>
                </List>
              </Column>
            </Stack>
            <Column className="bg-white_A700 justify-start sm:mx-[0] sm:p-[15px] p-[16px] md:p-[8px] sm:w-[100%] w-[25%] brd-left">
              {userDetailsData?.map((userDetailsDataResponseEle, index) => {
                return (
                  <React.Fragment key={`userDetailsDataResponseEle${index}`}>

                    <Text
                      className="font-semibold text-bluegray_900 w-[auto]"
                      variant="body2"
                    >
                      {userDetailsDataResponseEle?.name}
                    </Text>
                    <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                      <Text className="Publiclink" variant="body2">
                        Account created
                      </Text>
                      <Text className="Unknown" variant="body2">
                        Unknown
                      </Text>
                    </Row>
                    <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                      <Text className="Email" variant="body2">
                        Email
                      </Text>
                      <Text
                        className="font-medium text-bluegray_900 columnnestfunction"
                        variant="body2"
                      >
                        {userDetailsDataResponseEle?.email}
                      </Text>
                    </Row>
                    {userPostCountData?.map((userPostCountDataResponseEle, index) => {
                      return (
                        <React.Fragment key={`userPostCountDataResponseEle${index}`}>

                          <Row className="md:flex-wrap sm:flex-wrap items-center sm:mt-[3px] md:mt-[4px] mt-[9px] sm:mx-[0] sm:px-[0]">
                            <Text className="Publiclink" variant="body2">
                              Posts
                            </Text>
                            <Text className="Unknown" variant="body2">
                              {userPostCountDataResponseEle?.count}
                            </Text>
                          </Row>
                        </React.Fragment>
                      );
                    })}

                    {userCommentCountData?.map((userCommentCountDataResponseEle, index) => {
                      return (
                        <React.Fragment key={`userCommentCountDataResponseEle${index}`}>

                          <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                            <Text className="Publiclink" variant="body2">
                              Comments
                            </Text>
                            <Text className="Unknown" variant="body2">
                              {userCommentCountDataResponseEle?.count}
                            </Text>
                          </Row>
                        </React.Fragment>
                      );
                    })}
                    {userUpvoteCountData?.map((userUpvoteCountDataResponseEle, index) => {
                      return (
                        <React.Fragment key={`userUpvoteCountDataResponseEle${index}`}>

                          <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                            <Text className="Publiclink" variant="body2">
                              Votes
                            </Text>
                            <Text className="Unknown" variant="body2">
                              {userUpvoteCountDataResponseEle?.count}
                            </Text>
                          </Row>
                        </React.Fragment>
                      );
                    })}
                    <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                      <Text className="Publiclink" variant="body2">
                        User ID
                      </Text>
                      <Text className="Unknown" variant="body2">
                        Unknown
                      </Text>
                    </Row>
                  </React.Fragment>
                );
              })}
            </Column>
          </Row>
          <Footer/>
        </Column>
      </Column>

    </>
  );
};

export default AdminusersPage;