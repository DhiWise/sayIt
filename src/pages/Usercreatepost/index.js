import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Column,
  Row,
  Button,
  Img,
  Text,
  Input,
  TextArea,
  List,
  SelectBox,
  Footer,
} from "components";
import { CloseSVG } from "../../assets/images/index.js";
import Header3 from "components/Header/Header3/index.js";

import { Constant, SupabaseCredentials } from "constants/Constant.js";
import * as yup from "yup";
import InfiniteScroll from "react-infinite-scroll-component";
import { selectCount } from 'reducers/userSlice';
import { useSelector } from 'react-redux';

import useForm from "hooks/useForm";
import {
  postPostsData,
  postCommentsImagesData,
  postPostlistwithcustomsorting,
  upvotePosts,
  getUpvotespostideq1,
  deleteUpvotespostideq1,
} from "service/api";
const _ = require("lodash");
let array = [];
let imageUploadedCount=0;
const UsercreatepostPage = () => {
  const [SelectedBoardposts, setSelectedBoardposts] = React.useState();
  const [statusfilter, setStatusFilter] = React.useState();
  const [bid, setBoardId] = React.useState();
  let [imageUrl,setImgaeUrl]= React.useState(0);


  const [postData, setPostData] = React.useState();
  const [selectedFile, setSelectedFile] = React.useState();
  const count = useSelector(selectCount);


  const formValidationSchema = yup.object().shape({
    title: yup.string().required("Oops! You forgot to enter a post title."),
  });
  const form = useForm(
    { title: "", description: "" },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  const navigate = useNavigate();


  const defaultLimit = 10;

  const postListOffset = React.useRef(0);
  const [postHasMoreData, setPostHasMoreData] = React.useState(true);

  const filterBy = React.useRef("TRENDING");
  const searchKeyword = React.useRef(null);
  const searchInput = React.useRef(null);
  const isUpvoteProcessRunning = React.useRef(false);

  React.useEffect(() => {
    statusFilter();
  }, []);

  React.useEffect(() => {

    if (bid) {
      postListOffset.current = 0;
      setPostHasMoreData(true);
      setSelectedBoardposts([]);
      fetchPostList();
    }
  }, [bid]);

  function statusFilter() {
    const options = [
      { label: "Trending", value: "TRENDING" },
      { label: "Top", value: "TOP" },
      { label: "New", value: "NEW" },
      { label: "My Own", value: "OWN" },
      { label: "Under Review", value: Constant.UnderReview },
      { label: "Planned", value: Constant.Planned },
      { label: "In Progress", value: Constant.InProgress },
      { label: "Complete", value: Constant.Complete },
    ];
    setStatusFilter(options);
  }
  function postPosts(data) {
    data.user_id = count?.payload?.id;
    data.status = Constant.Open;
    data.board_id = bid;
    const req = { data: { ...data } };
    postPostsData(req)
      .then((res) => {
        if (array.length) {
          let bucketURL = array.map((v) => ({
            image: v.Key,
            post_id: res[0].id,
          }));
          postCommentImages(bucketURL);
        }
        setPostData(res);

        postListOffset.current = 0;
        setPostHasMoreData(true)
        setSelectedBoardposts([]);
        fetchPostList();


      })
      .catch((err) => {
        console.error(err);
      });
  }
  function postCommentImages(data) {
    const req = { data };
    postCommentsImagesData(req)
      .then((res) => { })
      .catch((err) => {
        console.error(err);
      });
  }

  async function fileUpload(file) {
    var myHeaders = new Headers();
    myHeaders.append("apikey", SupabaseCredentials.ApiKey);
    myHeaders.append(
      "Authorization",
      `Bearer ${SupabaseCredentials.Authorization}`
    );

    var formdata = new FormData();
    formdata.append("file", file);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    let response = await fetch(
      `${SupabaseCredentials.CommonUrl
      }storage/v1/object/bucket1/post/${Math.random()}${file.name}`,
      requestOptions
    );
    setImgaeUrl(imageUrl+=1);
    return await response.text();
  }
  const changeHandlerFile = async (event) => {
    imageUploadedCount=event.target.files.length;
    for (let index in event.target.files) {
      if (
        event.target.files[index].name &&
        typeof event.target.files[index] === "object"
      ) {
        setSelectedFile(event.target.files[index]);
        let data = await fileUpload(event.target.files[index]);
        array.push(JSON.parse(data));
      }
    }
  };

  function fetchPostList() {
    // Start Manual Code
    let userId =count?.payload?.id ? count.payload.id : null;

    let reqSortBy = null;
    let reqStatus = null;
    let reqSearch = null;




    if (["TOP", "TRENDING", "NEW", "OWN"].includes(filterBy.current)) {
      reqSortBy = filterBy.current;
    } else if (
      [
        Constant.UnderReview,
        Constant.Planned,
        Constant.InProgress,
        Constant.Complete,
      ].includes(filterBy.current)
    ) {
      reqStatus = filterBy.current;
    }

    if (searchKeyword.current != null && searchKeyword.current.length > 2) {
      reqSearch = searchKeyword.current;
      reqStatus = null;
    }

  

    

    const req = {
      data: {
        req_user: userId ? userId : null,
        req_board: [bid],
        req_limit: defaultLimit,
        req_offset: postListOffset.current,
      },
    };
    if (reqSortBy != null) {
      req.data.req_sort_by = reqSortBy;
    }

    if (reqStatus != null) {
      req.data.req_status = reqStatus;
    }

    if (reqSearch != null) {
      req.data.req_search = reqSearch;
    }
    // End Manual Code
    postPostlistwithcustomsorting(req)
      .then((res) => {
        setSelectedBoardposts((oldData) => {
          if (oldData) {
            return [...oldData, ...res];
          } else {
            return [...res];
          }
        });

        if (res?.length < defaultLimit) {
          setPostHasMoreData(false)
        }
        postListOffset.current = postListOffset.current + defaultLimit;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleUpvote = async (postId, index) => {
    let userId = count?.payload?.id ? count.payload.id : null;   
    if (isUpvoteProcessRunning.current) {
      return;
    }
    isUpvoteProcessRunning.current = true;
    const reqParamsForCheckUpvote = {
      params: { post_id: `eq.${postId}`, user_id: `eq.${userId}` },
    };
    await getUpvotespostideq1(reqParamsForCheckUpvote)
      .then( (res) => {
        if (res.length > 0) {
           downvote(res[0].id, index);
        } else {
           performUpvote(postId, userId, index);
        }
      })
      .catch((err) => {
        isUpvoteProcessRunning.current = false;
        console.error(err);
      });
  };

  const performUpvote = (postId, userId, index) => {
    const req = { data: { post_id: postId, user_id: userId } };
    upvotePosts(req)
      .then((res) => {
        const newData = [...SelectedBoardposts];
        newData[index].user_upvote_id = res[0].id;
        newData[index].upvote_count = newData[index].upvote_count + 1;
        setSelectedBoardposts(newData);
        isUpvoteProcessRunning.current = false;
      })
      .catch((err) => {
        isUpvoteProcessRunning.current = false;
        console.error(err);
      });
  };

  const downvote = (upvoteId, index) => {
    const req = { params: { id: `eq.${upvoteId}` } };
    deleteUpvotespostideq1(req)
      .then((res) => {
        const newData = [...SelectedBoardposts];
        newData[index].user_upvote_id = null;
        newData[index].upvote_count = newData[index].upvote_count - 1;
        setSelectedBoardposts(newData);
        isUpvoteProcessRunning.current = false;
      })
      .catch((err) => {
        isUpvoteProcessRunning.current = false;
        console.error(err);
      });
  };

  const handleFilter = (event) => {
    filterBy.current = event;
    postListOffset.current = 0;
    setPostHasMoreData(true);
    setSelectedBoardposts([]);
    fetchPostList();
  };

  function handleSearch(event) {
    searchKeyword.current = "";
    if (event.target.value?.length > 1) {
      searchKeyword.current = event.target.value;
      postListOffset.current = 0;
      setPostHasMoreData(true);
      setSelectedBoardposts([]);
      fetchPostList();
    } else if (event.target.value?.length == 0) {
      postListOffset.current = 0;
      setPostHasMoreData(true)
      setSelectedBoardposts([]);
      fetchPostList();
    }
  }

  const clearSearch = () => {
    searchInput.current.value = "";
    searchKeyword.current = "";
    postListOffset.current = 0;
    setPostHasMoreData(true)
    setSelectedBoardposts([]);
    fetchPostList();
  };

  

  function handleNavigate(pid, upvotes) {
    navigate("/Userpostdetails", { state: { pid, upvotes } });
  }

  return (
    <>
      <Column className="bg-white_A700 font-inter items-center justify-start mx-[auto] py-[10px] sm:py-[5px] md:py-[5px] w-[100%]">
        <Column className="items-center justify-start w-[100%]">

          <Header3
            className="w-[100%]"
            setBoardId={(e) => setBoardId(e)}
          />
          <Row className="md:flex-wrap sm:flex-wrap items-start justify-center max-w-[991px] sm:max-w-[100%] md:max-w-[100%] md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] mx-[auto] sm:px-[15px] px-[30px]  w-[100%]">
            <Column className="bg-gray_103 items-center justify-start mb-[130px] sm:mb-[51px] md:mb-[67px] mt-[11px] sm:mt-[4px] md:mt-[5px] sm:mx-[0] sm:p-[15px] p-[16px] md:p-[8px] rounded-radius4 sm:w-[100%] w-[31%] block sm:hidden">
              <Column className="items-center justify-start sm:px-[0] w-[100%]">
                <Text
                  className="font-medium text-bluegray_900 w-[auto]"
                  as="h6"
                  variant="h6"
                >
                  Create a Post
                </Text>
                <Column className="items-center justify-start sm:mt-[3px] md:mt-[4px] mt-[9px] w-[100%]">
                  <Column className="items-center justify-start sm:pt-[1px] md:pt-[2px] pt-[5px] w-[100%]">
                    <Column className="justify-start w-[100%]">
                      <Text
                        className="font-semibold text-bluegray_402 w-[auto]"
                        variant="body3"
                      >
                        TITLE
                      </Text>
                      <Input
                        className="font-medium p-[0] text-[14px] placeholder:text-bluegray_100 text-black w-[100%]"
                        wrapClassName="md:mt-[5px] mt-[10px] sm:mt-[3px] w-[100%]"
                        name="InputField"
                        placeholder="Short, Descriptive title"
                        shape="RoundedBorder6"
                        size="xl"
                        onChange={(e) => {
                          form.handleChange("title", e.target.value);
                        }}
                        errors={form?.errors?.title}
                        value={form?.values?.title}
                      ></Input>
                    </Column>
                    <Column className="justify-start md:mt-[10px] mt-[21px] sm:mt-[8px] w-[100%]">
                      <Text
                        className="font-semibold text-bluegray_402 w-[auto]"
                        variant="body3"
                      >
                        DETAILS
                      </Text>
                      <TextArea
                        className="font-medium mt-[10px] sm:mt-[3px] md:mt-[5px] text-[14px] placeholder:text-bluegray_100 text-black w-[100%]"
                        name="inputfield One"
                        placeholder="Any Additional details..."
                        onChange={(e) => {
                          form.handleChange("description", e.target.value);
                        }}
                        value={form?.values?.description}
                      ></TextArea>
                    </Column>
                  </Column>
                  <Row className="mt-[16px] sm:mt-[6px] md:mt-[8px] listrequest">
                    <label className="w-15 flex flex-col items-center px-2 py-3 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={changeHandlerFile}
                      />
                    </label>
                    {imageUrl!=0 && (
      <div>{imageUrl}/{imageUploadedCount} files uploaded</div>
      )}
                    <Button

                      className="font-semibold min-w-[45%] text-[14px] text-center w-[max-content]"
                      shape="RoundedBorder6"
                      size="lg"
                      variant="FillIndigoA201"
                      onClick={() => {
                        form.handleSubmit(postPosts);
                        form.resetForm();
                      }}
                    >
                      CREATE POST
                    </Button>
                  </Row>
                </Column>
              </Column>
            </Column>
            <Column className="items-center justify-start md:ml-[20px] ml-[40px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[66%]">
              <Row className="listrequest">
                <Row className="">
                  <Text
                    className="text-bluegray_402 w-[auto] mr-[10px]"
                    as=""
                    variant="body1"
                  >
                    Showing
                  </Text>
                  <SelectBox
                    className="border-b-[1px] border-bluegray_402  sm:mx-[0]  text-bluegray_402 w-[150px]"
                    placeholderClassName="text-bluegray_402"
                    name="Group375"
                    placeholder="TrendIng"
                    options={statusfilter}
                    size="md"
                    defaultValue={statusfilter?.[0]}
                    onChange={(e) => {
                      handleFilter(e);
                    }}
                    isSearchable={false}
                    isMulti={false}
                    indicator={
                      <Img
                        src="images/img_arrowdown_bluegray_402.svg"
                        className="w-[20px] h-[20px] mr-[0]"
                        alt="arrow_down"
                      />
                    }
                  ></SelectBox>
                  <Text
                    className="text-bluegray_402 w-[auto] ml-[10px]"
                    variant="body1"
                  >
                    Posts
                  </Text>
                </Row>
                <Input
                  onChange={(e) => handleSearch(e)}
                  className="font-normal not-italic p-[0] text-[14px] placeholder:text-bluegray_401 text-bluegray_401 w-[100%]"
                  wrapClassName="flex sm:mx-[0]"
                  name="search"
                  placeholder="Search..."
                  prefix={
                    <Img
                      src="images/img_search.svg"
                      className="cursor-pointer sm:mx-[3px] md:mx-[4px] my-[auto] mx-[8px]"
                      alt="search"
                    />
                  }
                  suffix={
                    <CloseSVG
                      color="#8a8a8a"
                      className="cursor-pointer ml-[10px] mr-[22px] sm:mr-[8px] sm:ml-[3px] md:mr-[11px] md:ml-[5px] my-[auto]"
                      onClick={(e) => clearSearch()}
                    />
                  }
                  shape="srcRoundedBorder4"
                  size="sm"
                  variant="srcOutlineBluegray100"
                  ref={searchInput}
                ></Input>
              </Row>
              {SelectedBoardposts?.length ? (
                <List
                  className="min-h-[auto] sm:mt-[13px] md:mt-[17px] mt-[34px] sm:w-[100%] w-[98%]"
                  orientation="vertical"
                >
                  <InfiniteScroll
                    dataLength={SelectedBoardposts?.length || 0}
                    next={fetchPostList}
                    hasMore={postHasMoreData}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                    scrollableTarget="scrollableDiv"
                  >
                    {SelectedBoardposts?.map((apiDataResponseEle, index) => {
                      if (apiDataResponseEle.status === Constant.Open) {
                        apiDataResponseEle.status = "OPEN";
                      } else if (
                        apiDataResponseEle.status === Constant.UnderReview
                      ) {
                        apiDataResponseEle.status = "UNDER REVIEW";
                      } else if (
                        apiDataResponseEle.status === Constant.Planned
                      ) {
                        apiDataResponseEle.status = "PLANNED";
                      } else if (
                        apiDataResponseEle.status === Constant.InProgress
                      ) {
                        apiDataResponseEle.status = "INPROGRESS";
                      } else if (
                        apiDataResponseEle.status === Constant.Complete
                      ) {
                        apiDataResponseEle.status = "COMPLETE";
                      } else if (
                        apiDataResponseEle.status === Constant.Closed
                      ) {
                        apiDataResponseEle.status = "CLOSED";
                      }
                      return (
                        <React.Fragment key={`apiDataResponseEle${index}`}>
                          <Column className="items-center justify-start w-[100%]">
                            <Row className="items-start justify-between w-[100%]  mb-[25px]">
                              <Column
                                onClick={() => {
                                  handleUpvote(apiDataResponseEle?.id, index);
                                }}
                                className="border border-bluegray_50 border-solid items-center justify-start sm:px-[10px] p-[5px] sm:py-[3px] rounded-radius4  w-[45px] mr-[20px]"
                              >
                                <Img
                                  src={
                                    apiDataResponseEle.user_upvote_id != null
                                      ? "images/img_polygon2.svg"
                                      : "images/img_polygon2_bluegray_105.svg"
                                  }
                                  className="sm:w-[100%] w-[57%]"
                                  alt="PolygonTwo"
                                />
                                <Text
                                  className="columnpolygontwo"
                                  variant="body1"
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
                                className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[90%]"
                              >
                                <Row className="md:flex-wrap sm:flex-wrap items-start justify-between w-[100%]">
                                  <Text
                                    className="font-semibold text-bluegray_900 w-[auto]"
                                    variant="body1"
                                  >
                                    {apiDataResponseEle?.title}
                                  </Text>
                                </Row>
                                <Text
                                  className="text-cyan-600 font-semibold leading-[24.00px] md:leading-[normal] sm:leading-[normal] sm:mx-[0] not-italic text-bluegray_402 sm:w-[100%] w-[90%] mt-[5px]"
                                  variant="body2"
                                >
                                  {apiDataResponseEle?.status}
                                </Text>
                                <Text
                                  className="font-normal leading-[24.00px] md:leading-[normal] sm:leading-[normal] sm:mx-[0] not-italic text-bluegray_402 sm:w-[100%] w-[90%] mt-[5px]"
                                  variant="body2"
                                >
                                  {apiDataResponseEle?.description}
                                </Text>
                              </Column>
                              <Column>
                                <Row className="items-start justify-evenly sm:mx-[0] sm:px-[0]">
                                  <Img
                                    src="images/img_comment2.svg"
                                    className="mt-[3px] mr-[5px]"
                                    alt="commentTwo"
                                  />
                                  <Text
                                    className="rowcommenttwo1"
                                    variant="body1"
                                  >
                                    {apiDataResponseEle?.comment_count}
                                  </Text>
                                </Row>
                              </Column>
                            </Row>
                          </Column>
                        </React.Fragment>
                      );
                    })}
                  </InfiniteScroll>
                </List>
              ) : (
                <Text
                  className="text-black-400 font-thin m-4"
                  as="h6"
                  variant="h6"
                >
                  We couldn't find anything, Try to create a new post !
                </Text>
              )}
            </Column>
          </Row>
        </Column>
      </Column>
      <Footer />
    </>
  );
};

export default UsercreatepostPage;