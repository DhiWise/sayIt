import React from "react";
import useForm from "hooks/useForm";

import { List, Column, Row, Text, Img, Input, Stack, Button, Footer } from "components";
import Header3 from "components/Header/Header3";
import { CloseSVG, SearchSVG } from "../../assets/images/index.js";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import _ from "lodash";
import UserCommentEditForm from "pages/UserCommentEditForm";
import { selectCount } from 'reducers/userSlice';
import { useSelector } from 'react-redux';
import Modal from "react-modal"
import { fetchInitals } from "util";

import {
  upvotePosts,
  getUpvotespostideq1,
  deleteUpvotespostideq1,
  getPostsideq1selectusersuserid,
  getUpvotespostideq1selectusersuserid,
  getCommentImgByPostid,
  fetchCommentData,
  fetchcommentsImageData,
  deleteCommentImagesData,
  deleteCommentData,
  deletePosts,

} from "service/api";
import moment from "moment";
import { Constant, SupabaseCredentials } from "constants/Constant.js";
import UserComments from "pages/UserComments/index.js";
import UserEditPost from "pages/UserEditPost/index.js";


const UserpostdetailsPage = () => {
  const [inputvalue, setInputvalue] = React.useState("");
  const [apiData1, setapiData1] = React.useState();
  const [apiData, setapiData] = React.useState();
  const [apiData4, setapiData4] = React.useState();
  const [hasUpvote, setHasUpvote] = React.useState();
  const [postImages, setPostImages] = React.useState();
  const [visiblePostCommentForm, setVisiblePostCommentForm] =
    React.useState(false);
  const [commentData, setCommentData] = React.useState();
  const [commentImage, setCommentImage] = React.useState();
  const [visibleCommentForm, setVisibleCommentForm] = React.useState(false);
  const [editPost,setEditPost]= React.useState();

  const [editRecordId, setEditRecordId] = React.useState("");
  const location = useLocation();
  const count = useSelector(selectCount);
  const navigate = useNavigate();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      width: 600
    }
  }
  const isUpvoteProcessRunning = React.useRef(false);
  const [upvoteCount, setUpvoteCount] = React.useState(null);

  React.useEffect(() => {
    fetchPostDetails();
    fetchPostVoter();
  }, []);
  function addComments() {
    if (!localStorage.getItem('LOGIN')) {
      navigate('/login');
    } else {
      setVisiblePostCommentForm(true);
    }
  }
  function editComments(id, user_id) {
    if (!localStorage.getItem('LOGIN')) {
      navigate('/login');
    } if (count?.payload?.id != user_id) {
      setVisibleCommentForm(false);
    }
    else {
      setEditRecordId(id);
      setVisibleCommentForm(true);
    }
  }
  function setEditPostToClose(){
    setEditPost(false);
    fetchPostDetails();
  }
  function deleteComments(id) {
    if (!localStorage.getItem('LOGIN')) {
      navigate('/login');
    } else {
      const req = { params: { comment_id: `eq.${id}` } };

      deleteCommentImagesData(req)
        .then((res) => {
          fetchComments(
            localStorage.getItem("POST_ID"),
            localStorage.getItem("POST_TITLE")
          );
          const req = { params: { and: `(id.eq.${id}, user_id.eq.${count?.payload?.id})` } };

          deleteCommentData(req)
            .then((res) => {
              fetchComments(
                localStorage.getItem("POST_ID"),
                localStorage.getItem("POST_TITLE")
              );
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
  function deleteCommentsImages(imageId, imageURL) {
    const req = { params: { id: `eq.${imageId}` } };

    deleteCommentImagesData(req)
      .then((res) => {
        fetchComments(
          localStorage.getItem("POST_ID"),
          localStorage.getItem("POST_TITLE")
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function setVisiblePostComment() {
    setVisiblePostCommentForm(false);
    fetchComments(
      localStorage.getItem("POST_ID"),
      localStorage.getItem("POST_TITLE")
    );
  }
  const setVisibleChildState = () => {
    setTimeout(function () {
      setVisibleCommentForm(false);
      fetchComments(localStorage.getItem("COMMENT_ID"));
    }, 2000);
  };
  function fetchPostVoter() {
    const req = { params: { post_id: `eq.${location?.state?.pid}` } };

    getUpvotespostideq1selectusersuserid(req)
      .then((res) => {

        if (count.payload.id) {
          let userUpvote = _.find(res, { 'user_id': count.payload.id });
          if (userUpvote) {
            setHasUpvote(true);
          }
        }
        setUpvoteCount(res.length)
        setapiData1(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function deletePost(id) {
    const req = { params: { id: `eq.${id}` } };

    deletePosts(req)
      .then((res) => {
        navigate('/usercreatepost')
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function fetchPostDetails() {

    const req = { params: { id: `eq.${location?.state?.pid}` } };

    getPostsideq1selectusersuserid(req)
      .then((res) => {
        // Start Manual Code
        if (res[0].status === Constant.Open) {
          res[0].status = "OPEN";
        } else if (res[0].status === Constant.UnderReview) {
          res[0].status = "UNDER REVIEW";
        } else if (res[0].status === Constant.Planned) {
          res[0].status = "PLANNED";
        } else if (res[0].status === Constant.InProgress) {
          res[0].status = "INPROGRESS";
        } else if (res[0].status === Constant.Complete) {
          res[0].status = "COMPLETE";
        } else if (res[0].status === Constant.Closed) {
          res[0].status = "CLOSED";
        }

        const req = { params: { post_id: `eq.${res[0].id}` } };
        // End Manual Code
        getCommentImgByPostid(req)
          .then((res) => {
            setPostImages(res);
          })
          .catch((err) => {
            console.error(err);
          });
        setapiData(res[0]);
        fetchComments(res[0].id);
        localStorage.setItem("POST_ID", JSON.stringify(res[0].id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleUpvote = async (postId) => {
    let userId = count?.payload?.id ? count.payload.id : null;
    if (isUpvoteProcessRunning.current) {
      return;
    }
    isUpvoteProcessRunning.current = true;
    const reqParamsForCheckUpvote = {
      params: { post_id: `eq.${postId}`, user_id: `eq.${userId}` },
    };
    await getUpvotespostideq1(reqParamsForCheckUpvote)
      .then((res) => {
        if (res.length > 0) {
          downvote(res[0].id);
        } else {
          performUpvote(postId, userId);
        }
      })
      .catch((err) => {
        isUpvoteProcessRunning.current = false;
        console.error(err);
      });
  };

  const performUpvote = (postId, userId) => {
    const req = { data: { post_id: postId, user_id: userId } };
    upvotePosts(req)
      .then((res) => {
        const newData = apiData1;
        let temp = _.clone(res[0]);
        temp.users = { id: count.payload.id, name: count.payload.name }
        newData.push(temp);
        newData.upvote_count = newData.upvote_count + 1;
        setapiData1(newData);
        setHasUpvote(true);
        setUpvoteCount(upvoteCount + 1);
        isUpvoteProcessRunning.current = false;
      })
      .catch((err) => {
        isUpvoteProcessRunning.current = false;
        console.error(err);
      });
  };

  const downvote = (upvoteId) => {
    const req = { params: { id: `eq.${upvoteId}` } };
    deleteUpvotespostideq1(req)
      .then((res) => {
        const newData = apiData1;
        let temp = _.clone(newData);
        temp =  _.reject(temp, {"user_id" : count.payload.id});
        setapiData1(temp);
        setHasUpvote(false)
        setUpvoteCount(upvoteCount - 1);
        isUpvoteProcessRunning.current = false;
      })
      .catch((err) => {
        isUpvoteProcessRunning.current = false;
        console.error(err);
      });
  };


  function fetchComments(data) {
    const req = {
      params: {
        post_id: `eq.${data}`,
        select: "id,comments,parent_id,user_id,created_at,profiles(name,avtar)",
      },
    };
    fetchCommentData(req)
      .then((res) => {
        let commentsId = [];
        commentsId.push(
          res.map(function (e) {
            return e.id;
          })
        );
        setCommentData(res);
        fetchCommentImage(commentsId);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function fetchCommentImage(commentId) {
    const req = {
      params: { select: "*" },
    };
    _.set(req.params, `comment_id", "in.(${_.join(commentId, ",")})`);
    fetchcommentsImageData(req)
      .then((res) => {
        setCommentImage(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function openEditForm(){
    setEditPost(true);
  }
  return (
    <>
      <Column className="min-h-screen bg-white_A700 font-inter mx-[auto] py-[15px] sm:py-[5px] md:py-[7px] w-[100%]">
        <Column className="items-center justify-start sm:mb-[194px] md:mb-[250px] mb-[486px] w-[100%]">
          <Header3 className="w-[100%]" />
          <Row className="items-start justify-center max-w-[991px] sm:max-w-[100%] md:max-w-[100%] md:mt-[12px] mt-[24px] sm:mt-[9px] sm:mx-[0] mx-[auto] sm:px-[15px] px-[30px]  w-[100%]">
            <Column className="items-center justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[32%] block sm:hidden">
              <Column className="bg-gray_103 justify-start sm:p-[15px] p-[16px] md:p-[8px] rounded-radius4 w-[100%]">
                <Text
                  className="font-semibold text-bluegray_402 w-[auto]"
                  variant="body3"
                >
                  VOTERS
                </Text>
                {apiData1?.map((apiData1ResponseEle, index) => {
                  return (
                    <React.Fragment key={`apiData1ResponseEle${index}`}>
                      <Row className="md:flex-wrap sm:flex-wrap items-center mt-[16px] sm:mt-[6px] md:mt-[8px]">
                      <Column className="dropdown-menu h-[36px] bg-purple_200  items-center justify-start left-[0]  sm:px-[2px] md: rounded-radius50  w-[36px] p-[5px] ml-[10px]">
                      <Text
                        className="mb-[1px] text-white_A700 w-[auto]"
                        variant="body1"
                      >
                        {fetchInitals(apiData1ResponseEle?.users?.name)}
                      </Text>
                      </Column>
                        <Text className="rowtip" variant="body3">
                          {apiData1ResponseEle?.users?.name}
                        </Text>
                      </Row>
                    </React.Fragment>
                  );
                })}
              </Column>

              <Text className="columnpoweredbycann" variant="body4">
                Powered by SayIt
              </Text>
            </Column>
            <Column className="justify-start w-[64%] md:ml-[20px] ml-[40px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
              <Column className="justify-start w-[100%]">
                <Row className="items-start sm:mx-[0] sm:px-[0] sm:w-[100%]">
                  <Column
                    onClick={() => {
                      handleUpvote(apiData?.id);
                    }}
                    className="border border-bluegray_50 border-solid items-center justify-start sm:px-[10px] p-[5px] sm:py-[3px] rounded-radius4  w-[45px] mr-[20px]"
                  >
                    <Img
                      src={
                        hasUpvote == true
                          ? "images/img_polygon2.svg"
                          : "images/img_polygon2_bluegray_102.svg"
                      }
                      className="sm:w-[100%] w-[57%]"
                      alt="PolygonTwo"
                    />
                    <Text className="columnpolygontwo" variant="body1">
                      {upvoteCount}
                    </Text>
                  </Column>
                  <Column className="justify-start">
                    <Text
                      className="font-medium text-bluegray_900 w-[auto]"
                      as="h5"
                      variant="h5"
                    >
                      {apiData?.title}
                    </Text>
                    <Text
                      className="font-semibold sm:mt-[3px] md:mt-[4px] mt-[8px] text-indigo_A201 w-[auto]"
                      variant="body4"
                    >
                      {apiData?.status}
                    </Text>
                  </Column>
                </Row>

                <Column className="items-center justify-start md:ml-[4px] ml-[8px] md:mr-[27px] mr-[53px] mt-[16px] sm:mt-[6px] md:mt-[8px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[90%]">
                  <Column className="justify-start w-[100%]">
                    <Column className="items-center justify-start w-[100%]">
                      <Column className="justify-start w-[100%]">
                        <Row className="listrequest ml-[10px]">
                          <Row className="items-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[100%]">
                            <Column className="justify-start rounded-radius4  mr-[10px]">
                              <Text
                                className="bg-gray_700 flex items-center px-[12px]   rounded-radius50 text-white_A700 w-[32px] h-[32px]"
                                variant="body2"
                              >
                                {apiData?.users?.name.charAt(0)}
                              </Text>
                            </Column>
                            <Column className="justify-start">
                              <Text
                                className="font-semibold text-bluegray_700 w-[auto] "
                                variant="body3"
                              >
                                {apiData?.users?.name}
                              </Text>

                              <Text
                                className="text-bluegray_700 w-[auto] md:flex-wrap sm:flex-wrap"
                                variant="body3"
                              >
                                {apiData?.description}
                              </Text>

                              <List className="gap-[16px] sm:gap-[6px] md:gap-[8px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] sm:mt-[3px] md:mt-[4px] mt-[9px] rounded-radius6 w-[100%]">
                                {postImages?.map(
                                  (apiData1ResponseEle, index) => {
                                    return (
                                      <React.Fragment
                                        key={`apiData1ResponseEle${index}`}
                                      >
                                        <Img
                                          src={`${SupabaseCredentials.CommonUrl}storage/v1/object/public/${apiData1ResponseEle.image}`}
                                          alt="Rectangle489"
                                        />
                                      </React.Fragment>
                                    );
                                  }
                                )}
                              </List>
                              <Modal isOpen={editPost}
                              onRequestClose={() => setEditPost(false)}
                             style={customStyles}
                              >
                              <UserEditPost id={apiData?.id} title={apiData?.title} description={apiData?.description} ModalClose= {setEditPostToClose}/>
                              </Modal>
                               <Row className="mt-[16px]">
                                <Text
                                  className="font-medium text-bluegray_300 w-[auto]"
                                  variant="body4"
                                >
                                  {moment(apiData?.created_at).format(
                                    "MMMM D, YYYY"
                                  )}
                                </Text>
                                {apiData?.users?.id  == count?.payload?.id && (
                                  <>
                                 <Text
                                  className="font-medium ml-[16px] sm:ml-[6px] md:ml-[8px] text-bluegray_300 w-[auto]"
                                  variant="body4"
                                  onClick={()=>{
                                    openEditForm()
                                  }}
                                >
                                  Edit Post
                                </Text>
                                <Text
                                  className="font-medium ml-[16px] sm:ml-[6px] md:ml-[8px] text-bluegray_300 w-[auto]"
                                  variant="body4"
                                  onClick={()=>{
                                    deletePost(apiData?.id)}}
                                >
                                  Delete Post
                                </Text> 
                                </>
                                )}
                              </Row>

                            </Column>
                          </Row>
                        </Row>
                      </Column>
                    </Column>
                  </Column>
                </Column>

                <Column className="justify-start  sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] sm:px-[0] ml-[20px]">
                  {commentData?.length ?
                    <Row className=" listrequest mt-[10px] mb-[10px]">
                      <Text
                        className="font-medium text-bluegray_400 w-[auto]"
                        variant="body3"
                      >
                        Comments
                      </Text>
                    </Row> : ""}
                  <List
                    className="bg-white_A700 min-h-[auto] sm:p-[1px] p-[1px] md:p-[8px] w-[100%]"
                    orientation="vertical"
                  >

                    {commentData?.map((apiData1ResponseEle, index) => {
                      localStorage.setItem(
                        "COMMENT_ID",
                        apiData1ResponseEle?.id
                      );
                      return (
                        <Row className="listrequest">
                          <Row className="items-start sm:mx-[0] sm:px-[0] sm:w-[100%]">
                            <Column className="justify-start rounded-radius4  mr-[10px]">
                              {apiData1ResponseEle?.profiles?.avtar ? (
                                <Img
                                  src={`${SupabaseCredentials.CommonUrl}storage/v1/object/public/${apiData1ResponseEle?.profiles?.avtar}`}
                                  className="h-[10px] sm:h-[4px] md:h-[6px] flex items-center justify-center"
                                />
                              ) : (
                                <Text
                                  className="bg-gray_801 flex items-center px-[12px]   rounded-radius50 text-white_A700 w-[32px] h-[32px]"
                                  variant="body2"
                                >
                                  {apiData1ResponseEle?.profiles?.name.charAt(
                                    0
                                  )}
                                </Text>
                              )}
                            </Column>
                            <Column className="justify-start">
                              <Text
                                className="font-semibold text-indigo_A201 w-[auto] "
                                variant="body3"
                              >
                                {apiData1ResponseEle?.profiles?.name}
                              </Text>

                              <Text
                                className="font-medium text-bluegray_700 w-[auto] md:flex-wrap sm:flex-wrap"
                                variant="body3"
                              >
                                {apiData1ResponseEle?.comments}
                              </Text>
                              <Row className="items-center justify-between lg:mt-[5px] xl:mt-[6px] 2xl:mt-[7px] 3xl:mt-[9px] w-[100%]">
                                <Text className="September222" variant="body3">
                                  <List className="gap-[16px] sm:gap-[6px] md:gap-[8px] grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 min-h-[auto] sm:mt-[3px] md:mt-[4px] mt-[9px] rounded-radius6 w-[100%]">
                                    {commentImage?.map((images, index) => {
                                      if (
                                        apiData1ResponseEle?.id ===
                                        images.comment_id
                                      ) {
                                        return (
                                          <React.Fragment
                                            key={`apiData1ResponseEle${index}`}
                                          >
                                        <Stack>
                                          <Row className="p-[5px]">
                                            <Img
                                              src="images/img_multiplysolid.svg"
                                              className="questioncircle float-right"
                                              alt="multiplySolid"
                                              onClick={() => {
                                                deleteCommentsImages(
                                                  images.id,
                                                  images.image
                                                );
                                              }}
                                            />
                                            <Img
                                            className="mb-[5px]"
                                              src={`${SupabaseCredentials.CommonUrl}storage/v1/object/public/${images.image}`}
                                              alt="Rectangle489"

                                            />
                                          
                                          </Row>
                                            </Stack>
                                          </React.Fragment>
                                        );
                                      }
                                    })}
                                  </List>
                                </Text>
                              </Row>
                              <Row className="mt-[16px]">
                                <Text className="Internal" variant="body4">
                                  {moment(
                                    apiData1ResponseEle?.["created_at"]
                                  ).format("MMMM D, YYYY")}
                                </Text>
                                  {apiData1ResponseEle?.user_id== count?.payload?.id && 
                                 (
                                 <>
                                   <Text
                                    className="Internal Editpost"
                                    variant="body4"
                                    onClick={() => {
                                      editComments(apiData1ResponseEle?.id, apiData1ResponseEle?.user_id);
                                    }}
                                  >
                                    Edit Comment
                                  </Text>

                                <Column className="ml-[10px] pt-[20px]">
                                  {visibleCommentForm &&
                                    editRecordId ===
                                    apiData1ResponseEle?.id && (
                                      <UserCommentEditForm
                                        comments={apiData1ResponseEle?.comments}
                                        commentsId={apiData1ResponseEle?.id}
                                        setVisibleChildState={
                                          setVisibleChildState
                                        }
                                      />
                                    )}
                                </Column>
                          
                                  <Text
                                    className="Internal Editpost"
                                    variant="body4"
                                    onClick={() => {
                                      deleteComments(apiData1ResponseEle?.id);
                                    }}
                                  >
                                    Delete Comment
                                  </Text>
                                     </>)}
                              </Row>
                            </Column>
                          </Row>
                        </Row>
                      );
                    })}
                  </List>
                </Column>

                <Column className="items-center justify-start w-[100%] ml-[10px] md:ml-[33px] sm:mt-[14px] md:mt-[18px] mt-[36px]">
                  <Row
                    className="border-gray_101 border border-solid sm:p-[15px] p-[16px] md:p-[8px] 
                     listpolygontwo mt-[50px]"
                  >
                    {!visiblePostCommentForm && (
                      <Text
                        className="font-medium sm:ml-[3px] md:ml-[4px] ml-[8px] text-gray_402 w-[auto]"
                        onClick={() => {
                          addComments();
                        }}
                      >
                        Leave an Internal comment
                      </Text>
                    )}
                    {visiblePostCommentForm && (
                      <UserComments
                        setVisiblePostComment={
                          setVisiblePostComment
                        }
                      />
                    )}
                  </Row>
                </Column>
              </Column>
            </Column>
          </Row>
        </Column>
        <Footer />
      </Column>
    </>
  );
};

export default UserpostdetailsPage;
