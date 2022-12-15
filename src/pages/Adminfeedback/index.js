import React from "react";
import { Constant } from "constants/Constant.js";
import { fillSelectWithConstants,changeStatusColor,fillSelectWithAPIResponse } from "util/index.js";
import { useNavigate } from "react-router-dom";
import useForm from "hooks/useForm";
import Modal from "react-modal"
import _, { remove } from "lodash";
import { SupabaseCredentials } from "constants/Constant.js";
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectCount } from 'reducers/userSlice';
import { useSelector } from 'react-redux';
import { fetchInitals } from "util/index.js";

import {
  Column,
  Row,
  Text,
  Img,
  Input,
  Button,
  List,
  CheckBox,
  Stack,
  Footer,
} from "components";
import Header from "components/Header/Header";
import { CloseSVG } from "../../assets/images/index.js";
import {
  fetchBoardData,
  fetchTagData,
  fetchPostData,
  fetchCommentData,
  fetchPostTagData,
  postCommentsImagesData,
  deleteCommentData,
  fetchcommentsImageData,
  deleteCommentImagesData,
  postPostlistwithcustomsorting,
  deletePosts,
  postTagtoPostData,
  deleteTagPostData,
  editPostData
} from "service/api.js";
import { SelectBox1 } from "components/SelectBox/SelectBox1/index.js";
import { SelectBox2 } from "components/SelectBox/SelectBox2/index.js";
import Form from "pages/Form";
import AdminPost from "pages/AdminPost/index.js";
import AdminComments from "pages/AdminComments/index.js";
import Tag from "pages/Tag.js";
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

let boardArray = [];
let statusArray = [];
const AdminfeedbackPage = () => {
  const count = useSelector(selectCount);
  const [inputvalue, setInputvalue] = React.useState("");
  const [boardData, setBoardData] = React.useState();
  const [postData, setPostData] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const [commentData, setCommentData] = React.useState();
  const [postTagData, setPostTagData] = React.useState([]);
  const [visibleCommentForm, setVisibleCommentForm] = React.useState(false);
  const [visiblePostCommentForm, setVisiblePostCommentForm] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState();
  const [modelOpen, setModelOpen] = React.useState();
  const [editModelOpen, setEditModelOpen] = React.useState();
  const [commentImage, setCommentImage] = React.useState();
  const [visibleTagForm, setVisibleTagForm] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [startRange, setStartRange] = React.useState(0);
  const [endRange, setEndRange] = React.useState(9);
  const [countData, setCountData] = React.useState();
  const [deleteModal, setDeleteModal] = React.useState();
  const countStartRange = React.useRef(0);
  const countEndRange = React.useRef(9);
  const [emptyComment, setEmptyComment] = React.useState(false);
  const [fetchTagByNameData, setFetchTagByName]= React.useState([]);
  const [postStatus, setPostStatus]= React.useState([]);
  const [postEmpty,setPostEmpty]= React.useState(false);
  const [tagOptions,setTagOptions]= React.useState([]);

  const form = useForm({ name: "" });
  let array = [];
  const navigate = useNavigate();
  React.useEffect(() => {
    setStatus(fillSelectWithConstants(Constant));
    fetchBorads();
    setPostStatus(fillSelectWithConstants(Constant));
    setTagOptions(fillSelectWithAPIResponse(JSON.stringify(localStorage.getItem("TAGS"))));
  }, []);

  function fetchBorads() {
    const req = { params: { select: "name,id" } };

    fetchBoardData(req)
      .then((res) => {
        for (let index in res) {
          boardArray.push(res[index].id)
        }
        setBoardData(res);
        fetchTags();
        localStorage.setItem("BOARD_ID", JSON.stringify(res?.response?.id));
        countFunction();

      })
      .catch((err) => {
        console.error(err);
      });
  }
  function editPost(event) {
      const req = {
        params: { id: `eq.${localStorage.getItem('POST_ID')}` },
        data: { status:event,"updated_at":new Date()},
      }
      editPostData(req)
        .then((res) => {
          countFunction();
        })
        .catch((err) => {
          console.error(err);
        });
  }
    function fetchTags() {
    const req = { params: { select: "id,name" } };
    fetchTagData(req)
      .then(async (res) =>  {
        localStorage.setItem("TAGS", JSON.stringify(res));
        await setTagOptions(fillSelectWithAPIResponse(JSON.stringify(localStorage.getItem("TAGS"))));
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function fetchTagsByName(name) {
    const req = {
      params: {
        name: `eq.${name}`,
        select: "id,name",
      },
    }
    fetchTagData(req)
      .then((res) => {
        tagPosts(res[0].id);

      })
      .catch((err) => {
        console.error(err);
      });
  }
  function fetchPosts() {
    let params = {};
    const req = {
      params: { select: "id,status,title,on,board_id,board:boards(id,name)" },
    };
    if (boardArray.length) {
      _.set(req.params, "board_id", `in.(${_.join(boardArray, ',')})`);
      params = {
        'board_id': `in.(${_.join(boardArray, ',')})`,
      }
    }
    fetchPostData(req, params, countStartRange.current, countEndRange.current)
      .then(async (res) => {
        setPostData((oldData) => {
          if (oldData) {
            return [...oldData, ...res]
          } else {
            return [...res]
          }
        });
        setStartRange(startRange + 10);
        setEndRange(endRange + 10);
        countStartRange.current = countStartRange.current + 10;
        countEndRange.current = countEndRange.current + 10;
        if (res?.length < 8) {
          setHasMore(false);
        }
        await fetchComments(localStorage.getItem('POST_ID'), localStorage.getItem('POST_TITLE'));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function fetchComments(data) {
    localStorage.setItem('COMMENT_WISE_POST', data);
    const req = {
      params: {
        post_id: `eq.${data}`,
        select: "id,comments,parent_id,created_at,profiles(name,avtar)",
      },

    };
    fetchCommentData(req)
      .then((res) => {
        let commentsId = [];
        commentsId.push(res.map(function (e) { return e.id }));
        setCommentData(res);
        if (!res.length) {
          setEmptyComment(true);
          setPostTagData([]);
          fetchPostTags();
        } else {
          setEmptyComment(false);
          fetchCommentImage(commentsId);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function deleteCommentsImages(imageId, imageURL) {

    const req = { params: { id: `eq.${imageId}` } };

    deleteCommentImagesData(req)
      .then((res) => {
        fetchComments(localStorage.getItem("POST_ID"), localStorage.getItem("POST_TITLE"));
        setDeleteModal(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function fetchCommentImage(commentId) {
    let params = {};
    const req = {
      params: { select: "*" },
    };
    _.set(req.params, `comment_id, "in.(${_.join(commentId, ',')})`);
    params = {
      'comment_id': `in.(${_.join(commentId, ',')})`,
    }
    fetchcommentsImageData(req, params)
      .then((res) => {
        setCommentImage(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }


  function fetchPostTags() {
    const req = {
      params: {
      post_id: `eq.${localStorage.getItem('POST_ID')}`,
      select: "*,tag:tags(name,id)",
    },
  }
    fetchPostTagData(req)
      .then((res) => {
        setPostTagData([]);
        for(let index of res){
          setPostTagData(postTagData => [...postTagData, index.tag.name]);
          let obj={
            id:index.id,
            name:index.tag.name,
            post_id:index.post_id,
            tag_id:index.tag.id
          }
          setFetchTagByName(fetchTagByNameData=>[...fetchTagByNameData,obj]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function postComments(data) {
    const req = {
      data: { ...data, post_id: localStorage.getItem("POST_ID"), user_id: count.payload.id },
    };

    postComments(req)
      .then((res) => {
        if (array.length) {
          let bucketURL = array.map(v => ({ image: v.Key, comment_id: res[0].id }))
          postCommentImages(bucketURL);
        }
        fetchComments(localStorage.getItem("POST_ID"), localStorage.getItem("POST_TITLE"));
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function tagPosts(data) {
    const req = {
      data: { post_id: localStorage.getItem("POST_ID"), tag_id:data},
    };

    postTagtoPostData(req)
      .then((res) => {
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function postCommentImages(data) {
    const req = { data };
    postCommentsImagesData(req)
      .then((res) => {
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function countFunction(data) {
    if(data?.search){
      data.req_search=data.search;
      delete data.search;
    }
    data = {
      ...data,
      "req_board": boardArray,
      "req_limit": 100,
      "req_offset": 0,
    }
    const req = { data };
    postPostlistwithcustomsorting(req)
      .then((res) => {
        if(res.length==0){
          setPostEmpty(true);
          localStorage.setItem('POST_TITLE', 'No Post');
        }else{
          localStorage.setItem('POST_ID', res[0]?.id);
          localStorage.setItem('POST_TITLE', res[0]?.title);
          getStatus(res[0]?.status);
          setCountData((oldData) => {
            if (oldData) {
              return [...res,...oldData]
            } else {
              return [...res]
            }
          });
          setStartRange(startRange + 10);
          setEndRange(endRange + 10);
          fetchComments(localStorage.getItem('POST_ID'), localStorage.getItem('POST_TITLE'));
          setPostEmpty(false);
        }
     
      })
      .catch((err) => {
        console.error(err);
      });
  }


  async function fileUpload(file) {
    var myHeaders = new Headers();
    myHeaders.append("apikey", SupabaseCredentials.ApiKey);
    myHeaders.append("Authorization", `Bearer ${SupabaseCredentials.Authorization}`);

    var formdata = new FormData();
    formdata.append("file", file);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    let response = await fetch(`${SupabaseCredentials.CommonUrl}/storage/v1/object/bucket1/comment/${Math.random()}${file.name}`
      , requestOptions);
    return await response.text();
  }

  const changeHandlerFile = async (event) => {
    for (let index in event.target.files) {
      if (event.target.files[index].name && typeof (event.target.files[index]) === 'object') {
        setSelectedFile(event.target.files[index]);
        let data = await fileUpload(event.target.files[index]);
        array.push(JSON.parse(data));
      }
    }
  };

  function setEditModelOpenData(id) {
    setEditModelOpen(true);
    localStorage.setItem('EDIT_ID', id);
  }
  function deleteComments(id) {
    const req = { params: { id: `eq.${id}` } };

    deleteCommentData(req)
      .then((res) => {
        fetchComments(localStorage.getItem("POST_ID"), localStorage.getItem("POST_TITLE"));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function addComments() {
    setVisiblePostCommentForm(true);
  }
  function addTags() {
    setVisibleTagForm(true);
  }
  function setVisibleTags() {
    setVisibleTagForm(false);
    fetchTags();
    setTagOptions(fillSelectWithAPIResponse(JSON.stringify(localStorage.getItem("TAGS"))));

  }
  function setVisiblePostComment() {
    setVisiblePostCommentForm(false);
    fetchComments(localStorage.getItem("POST_ID"), localStorage.getItem("POST_TITLE"));
  }
  function handleNavigate() {
    navigate("/admincreateboard");
  }

  const changeHandler = async (event) => {
    if (event.target.checked) {
      setStartRange(0);
      setEndRange(9);
      countStartRange.current = 0;
      countEndRange.current = 9;
      setPostData([]);
      if (boardArray.filter(item => item === event.target.name)) {
        boardArray.push(parseInt(event.target.name));
      }
    } else {
      setStartRange(0);
      setEndRange(9);
      countStartRange.current = 0;
      countEndRange.current = 9;
      setPostData([]);

      _.remove(boardArray, (array) => array === parseInt(event.target.name));
    }

    setCountData();
    await countFunction();
  }

  function closeModal() {
    setModelOpen(false);
    setEditModelOpen(false);
    countFunction();
  }

  function deletePostsData(){
    if(window.confirm("Are you sure to delete the post?")){
      const req = { params: { id: `eq.${localStorage.getItem("POST_ID")}` } };

      deletePosts(req)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  
  }
  const handleOnChange = async (event) => {
    if (event != null) {
      if (!_.includes(postTagData, event)) {
        setPostTagData(postTagData => [...postTagData, event]);
        await fetchTagsByName(event);
      }
    }
  }

  function removeTags(event) {
    if (_.includes(postTagData, event)) {
      setPostTagData((postTagData) => postTagData.filter((item) => item !== event));
    }
    for(let index of fetchTagByNameData){
      if(index.name === event && index.post_id==localStorage.getItem('POST_ID')){
        deleteTagPost(index.id);
      }
    }
  }
  function handleSearch(e){
    let data={}
    if(e?.target?.value){
      data.search=e.target.value;
      countFunction(data);
    }
  }
  function deleteTagPost(id) {
    const req = { params: { id: `eq.${id}` } };
    deleteTagPostData(req)
      .then((res) => {
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function getStatus(id){
    for(let index in postStatus){
      if(postStatus[index].value == id){
        localStorage.setItem('POST_STATUS',postStatus[index].label)
      }
    }
  }

  return (
    <>
      <Header className="w-[100%]" />
      <Column className="bg-gray_50 font-inter items-center justify-start mx-[auto] w-[100%]">
        <Column className="items-center justify-start w-[100%] min-h-screen">
          <Row className="md:flex-wrap sm:flex-wrap  sm:mx-[0] mx-[auto] sm:px-[15px] w-[100%] grow  h-0">
            <Column className="justify-start m-5 sm:mx-[0] sm:px-[0] sm:w-[100%] w-[15%]">
              <Column className="justify-start sm:mt-[15px] md:mt-[20px] sm:mx-[0] sm:px-[0] sm:w-[100%]">
              </Column>
              <Column className="justify-start sm:mt-[15px] md:mt-[20px] w-[100%]">
                <Text
                  className="font-semibold text-bluegray_900 w-[auto]"
                  variant="body3"
                >
                  Date Range
                </Text>
                <Input
                  className="placeholder:text-bluegray_700 Dropdown"
                  wrapClassName="flex md:mt-[4px] mt-[8px] sm:mt-[3px] w-[100%]"
                  name="Dropdown One"
                  placeholder="All Time"
                  onClick={() => {
                    alert("coming soon");
                  }}
                  suffix={
                    <Img
                      src="images/img_arrow_chevron_forward.svg"
                      className="ml-[35px] mr-[2px] sm:ml-[13px] md:ml-[18px] my-[auto]"
                      alt="Arrow Chevron Forward"
                    />
                  }
                  shape="RoundedBorder6"
                  size="md"
                ></Input>
              </Column>

              <Column className="items-center justify-start sm:mt-[15px] md:mt-[20px] mt-[40px] sm:px-[0] w-[100%]">
                <Column className="justify-start w-[100%]">
                  <Row className="listrequest">
                    <Text
                      className="font-semibold text-bluegray_900 w-[auto]"
                      variant="body3"
                    >
                      Boards
                    </Text>
                  </Row>
                  <List
                    className="gap-[0] lg:mt-[4px] 2xl:mt-[6px] xl:mt-[6px] 3xl:mt-[8px] w-[100%]"
                    orientation="vertical"
                  >
                    {boardData?.map((apiData2ResponseEle, index) => {
                      return (
                        <React.Fragment key={`apiData2ResponseEle${index}`}>
                          <CheckBox
                            className="font-medium xl:my-[2px] lg:my-[2px] 3xl:my-[3px] 2xl:my-[3px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] text-bluegray_700 w-[100%]"
                            inputClassName="2xl:my-[1px] 3xl:my-[1px] h-[15px] lg:my-[2px] mr-[5px] w-[15px] xl:my-[2px]"
                            name={apiData2ResponseEle?.id}
                            label={apiData2ResponseEle?.name}
                            onChange={changeHandler}
                            defaultChecked={true}
                          ></CheckBox>
                        </React.Fragment>
                      );
                    })}
                  </List>

                  <Row className="md:flex-wrap sm:flex-wrap items-start sm:mt-[3px] md:mt-[4px] mt-[8px] sm:w-[100%] w-[44%]"
                    onClick={handleNavigate}
                  >

                    <Img
                      src="images/img_plusoutline.svg"
                      className="plusOutline"
                      alt="plusOutline One"
                    />
                    <Text className="rowplusoutline" variant="body3">
                      Create board
                    </Text>
                  </Row>

                </Column>
              </Column>
              <Column className="justify-start sm:mt-[15px] md:mt-[20px] mt-[40px] sm:px-[0] w-[100%]">
                <Row className="md:flex-wrap sm:flex-wrap items-start justify-between w-[100%]">
                  <Text
                    className="flex-grow font-semibold text-bluegray_900"
                    variant="body3"
                  >
                    Tags
                  </Text>
                </Row>
                <SelectBox1
                  className="border border-gray_301 border-solid common-pointer md:mt-[3px] mt-[7px] sm:mt-[2px] font-medium lg:mt-[20px] xl:mt-[20px] 2xl:mt-[25px] 3xl:mt-[20px] 2xl:text-[8px] 3xl:text-[10px] lg:text-[5px] xl:text-[7px] text-bluegray_700 w-[100%]"
                  onChange={handleOnChange}
                  value={form?.values?.name}
                  placeholderClassName="text-bluegray_700 md:ml-[3px] ml-[7px] sm:ml-[2px]"
                  name="Searchbox"
                  placeholder="Search..."
                  isSearchable={true}
                  isMulti={false}
                  shape="RoundedBorder4"
                  size="lg"
                  variant="OutlineGray302"
                  options={tagOptions}
                ></SelectBox1>
              </Column>
              <List
                className="gap-[0] min-h-[auto] w-[100%]"
                orientation="vertical"
              >
                <Row className="mr-[100px] gap-[10px]">
                  {postTagData?.map((apiDataResponseEle, index) => {
                    return (
                      <React.Fragment key={`apiDataResponseEle${index}`}>
                        <Button
                          className="flex sm:h-[12px] md:h-[15px] h-[28px] items-center justify-center sm:w-[11px] md:w-[14px] w-[auto] p-[10px] mt-[10px]"
                          shape="icbRoundedBorder4"
                          size="smIcn"
                          variant="icbOutlineIndigoA201"
                          onClick={()=>{
                            removeTags(apiDataResponseEle)
                          }}
                        >
                          {apiDataResponseEle}
                        </Button>
                      </React.Fragment>
                    )
                  })}
                </Row>
              </List>
            </Column>



            <Column className="justify-start  sm:mx-[0] sm:px-[0] sm:w-[100%] w-[20%] brd-left">
              <Column className="bg-white_A700 items-center justify-start  p-[10px] sm:p-[3px] md:p-[5px] w-[100%]">
                <Column className="items-end justify-start sm:px-[0] w-[100%]">
                  <Row className="listrequest">
                    <Input
//                      onChange={(e) => setInputvalue(e?.target?.value)}
                      onChange={(e) => handleSearch(e)}
                      className="font-normal not-italic p-[0] text-[14px] placeholder:text-bluegray_401 text-bluegray_401 w-[100%]"
                      wrapClassName="flex sm:mx-[0] sm:w-[100%] w-[85%]"
                      name="search One"
                      placeholder="Search..."
                      prefix={
                        <Img
                          src="images/img_search.svg"
                          className="cursor-pointer ml-[3px] mr-[8px] sm:mr-[3px] md:mr-[4px] my-[auto]"
                          alt="search"
                        />
                      }
                      shape="srcRoundedBorder4"
                      size="mdSrc"
                      variant="srcFillGray201"
                    ></Input>
                    <Button
                      className="flex sm:h-[12px] md:h-[15px] h-[28px] items-center justify-center sm:w-[11px] md:w-[14px] w-[28px]"
                      shape="icbRoundedBorder4"
                      size="smIcn"
                      variant="icbOutlineIndigoA201"
                      onClick={setModelOpen}
                    >
                      <Img
                        src="images/img_group254.svg"
                        className="h-[20px] sm:h-[8px] md:h-[11px] flex items-center justify-center"
                        alt="Group254"
                      />
                    </Button>
                    <Modal isOpen={modelOpen}
                      onRequestClose={() => setModelOpen(false)}
                      style={customStyles}
                    >
                      <AdminPost closeModal={closeModal} />
                    </Modal>
                  </Row>
                </Column>
              </Column>
              <Column className="w-[100%]  overflow-auto">
                <List
                  className="gap-[0]"
                  orientation="vertical"
                >
                  <Column className="listrectangle461">
                  {postEmpty && (
                  <div className="ml-[100px]">
                          no posts found
                          </div>)}
                   {!postEmpty && (
                   <>
                     <InfiniteScroll
                      dataLength={postData?.length || 0}
                      next={fetchPosts}
                      hasMore={hasMore}
                      loader={<h4>Loading...</h4>}
                      scrollableTarget="scrollableDiv"
                    >
                      {
                        countData?.map((apiDataResponseEle, index) => {
                          return (
                            <Column className="bg-white_A700 justify-start my-[0] outline outline-[0.5px] outline-bluegray_100
p-[10px] sm:p-[3px] md:p-[5px] w-[100%]"
                              onClick={() => {
                                localStorage.setItem("POST_ID", apiDataResponseEle?.id);
                                localStorage.setItem('POST_TITLE', apiDataResponseEle?.title);
                                getStatus(apiDataResponseEle?.status);
                                fetchComments(apiDataResponseEle.id)
                              }}
                            >
                              <div style={{ wordBreak: "break-all" }}>
                                <Text className="nestFunction" variant="body1">
                                  {apiDataResponseEle.title}

                                </Text>
                              </div>
                              <div style={{ wordBreak: "break-all" }}>
                                <Text className="graphsupport_One" variant="body3">
                                  {apiDataResponseEle.description}
                                </Text>
                              </div>
                              <Row className="md:flex-wrap sm:flex-wrap items-start md:ml-[4px] ml-[9px] sm:mt-[3px] md:mt-[4px] mt-[8px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[16%]">
                                <Row className="md:flex-wrap sm:flex-wrap items-start justify-evenly 
mt-[1px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[55%]">
                                  <Img
                                    src="images/img_polygon4.svg"
                                    className="w-[250px] mt-[5px]"
                                    alt="PolygonFour Six"
                                  />
                                  <Text
                                    className="flex-grow font-medium text-bluegray_700 pl-[3px]"
                                    variant="body3"
                                  >
                                    {apiDataResponseEle.upvote_count}
                                  </Text>
                                </Row>
                                <Row className="md:flex-wrap sm:flex-wrap items-start justify-evenly ml-[17px] md:ml-[8px] sm:mx-[0]
sm:px-[0] sm:w-[100%] w-[65%]">
                                  <Img
                                    src="images/img_comment1.svg"
                                    className="commentOne"
                                    alt="commentOne Six"
                                  />
                                  <Text
                                    className="flex-grow font-medium text-bluegray_700 pl-[3px]"
                                    variant="body3"
                                  >
                                    {apiDataResponseEle.comment_count}
                                  </Text>
                                </Row>
                              </Row>
                            </Column>
                          );
                        })}
                    </InfiniteScroll>
                    </>)}
                  </Column>
                </List>
              </Column>
            </Column>


            <Column className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[65%] brd-left">

              <Column className="justify-start w-[100%] h-[100%] p-[10px]">
                <Row className="bg-white_A700 border border-gray_301 border-solid sm:p-[15px] p-[16px] md:p-[8px] rounded-bl-[0] rounded-br-[0] rounded-tl-[16px] rounded-tr-[16px] listrequest">
                  <Row className="md:flex-wrap sm:flex-wrap items-center
       md:ml-[4px] ml-[8px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[45%]">
                   

                    <Text className="rowpolygonthree " variant="body1">
                      {localStorage.getItem('POST_TITLE')}
                    </Text>
                    {localStorage.getItem('POST_STATUS') && (
                    <Button
                          className={changeStatusColor(localStorage.getItem('POST_STATUS'))}
                          shape="icbRoundedBorder4"
                          size="smIcn"
                          variant="icbOutlineIndigoA201"
                        >
                          {localStorage.getItem('POST_STATUS')}
                        </Button>)}
                  </Row>
                
                  <Img
                    src="images/trash.png"
                    className="mergeEleven"
                    alt="mergeEleven"
                    onClick={()=>{
                      deletePostsData();
                    }}
                  />
                </Row>
                <Row className="sm:mx-[0] sm:px-[0] h-[100%]">
                  <Column className="sm:mx-[0] sm:px-[0] sm:w-[100%] w-[60%] mr-[0px] pt-[3px]">
                    <List
                      className="bg-white_A700  sm:p-[1px] p-[1px] md:p-[8px] w-[100%] h-[100%]"
                      orientation="vertical"
                    >
                      {emptyComment && <div className="ml-[150px]">no comments found</div>}
                      {commentData?.map((apiData1ResponseEle, index) => {
                        return (
                          <Column className="bg-white_A700 items-center justify-start my-[0] sm:p-[3px] md:p-[4px] 
          p-[2px] rounded-radius4 w-[100%]">
                            <Row className="md:flex-wrap sm:flex-wrap items-start sm:px-[0] w-[100%]">
                              <Stack className="h-[28px] w-[6%]">
                                <Column className="h-[33px] bg-purple_200  inset-y-[0] items-center 
              justify-start left-[0] my-[auto] sm:px-[2px]
               md: rounded-radius50 sm:w-[12px] md:w-[16px] w-[32px] p-[5px]">
                                  <Text
                                    className="mb-[1px] text-white_A700 w-[auto]"
                                    variant="body1"
                                  >
                                    {fetchInitals(apiData1ResponseEle?.profiles?.name)}
                                  </Text>
                                </Column>
                              </Stack>
                              <div>
                                <Column className="sm:mx-[0] sm:px-[0]">

                                  <Row className="md:flex-wrap sm:flex-wrap items-start w-[100%]">
                                    <Text className="row" variant="body3">
                                      {apiData1ResponseEle?.profiles?.name}
                                    </Text>
                                    <Img
                                      src="images/img_multiplysolid.svg"
                                      className="questioncircle"
                                      alt="multiplySolid"
                                      onClick={() => {
                                        deleteComments(apiData1ResponseEle?.id)
                                      }}
                                    />
                                  </Row>
                                  {!visibleCommentForm &&
                                    <>
                                      <Text className="column" variant="body3">
                                        {apiData1ResponseEle?.comments}
                                      </Text>
                                      <Row className="md:flex-wrap sm:flex-wrap items-start sm:mt-[3px] 
                                      md:mt-[4px] mt-[8px] sm:mx-[0] sm:px-[0]">
                                        <div className="bg-bluegray_700 sm:h-[1px] h-[2px] ml-[4px] 
                                        sm:my-[2px] md:my-[3px] my-[6px] rounded-radius50 md:w-[1px] sm:w-[1px] w-[2px]"></div>
                                        <Text
                                          className="ml-[4px] rowseptember222"
                                          variant="body4"
                                        >
                                          {apiData1ResponseEle?.["created_at"]}
                                        </Text>
                                        <div className="bg-bluegray_700 sm:h-[1px] h-[2px]
                                         ml-[1px] sm:my-[2px] md:my-[3px] my-[6px] rounded-radius50 
                                         md:w-[1px] sm:w-[1px] w-[2px] ml-[100px]"></div>
                                        <Text
                                          className="Internal Editpost"
                                          variant="body4"
                                          onClick={() => {
                                            setEditModelOpenData(apiData1ResponseEle?.id);
                                          }}
                                        >
                                          Edit Comment
                                        </Text>

                                      </Row>
                                      <Row className="items-center justify-between lg:mt-[5px] xl:mt-[6px] 2xl:mt-[7px] 3xl:mt-[9px] w-[100%]">
                                        <Text
                                          className="September222"
                                          variant="body3"
                                        >
                                          {commentImage?.map((images, index) => {
                                            if (apiData1ResponseEle?.id === images.comment_id) {
                                              return (
                                                <>
                                                  <Row className="p-[20px]">
                                                    <Stack className="h-[35px] sm:ml-[19px] md:ml-[24px] ml-[48px] w-[40%]">
                                                      <Row className="p-[10px]">
                                                        <img src={`${SupabaseCredentials.CommonUrl}storage/v1/object/public/${images.image}`}
                                                          alt=""
                                                          onClick={() => {
                                                            localStorage.setItem('CLICKED_IMAGE', `${SupabaseCredentials.CommentURL}storage/v1/object/public/${images.image}`);
                                                          }}
                                                        />

                                                        <Column className="absolute items-center justify-start 
                            left-[30px] sm:px-[1px] md:px-[2px] px-[5px] rounded-radius50 top-[0] imageSolid">
                                                          <Img
                                                            src="images/trash.png"
                                                            className="h-[15px] sm:h-[4px] md:h-[6px] flex items-center justify-center w-[20px]"
                                                            onClick={() => {
                                                              setDeleteModal(true);
                                                              localStorage.setItem('DELETED_IMAGE', images.id)
                                                            }}

                                                          />

                                                        </Column>

                                                      </Row>
                                                    </Stack>
                                                    <Modal isOpen={deleteModal}
                                                      onRequestClose={() => setDeleteModal(false)}
                                                      style={customStyles}
                                                    >
                                                      <h5>Are you want to delete this images?</h5>
                                                      <Row>
                                                        <Button
                                                          className="font-bold min-w-[50%] 
                                                    text-[12px] text-center w-[max-content]"
                                                          shape="CustomBorderTL4"
                                                          size="sm"
                                                          variant="OutlineGray302"
                                                          onClick={() => { deleteCommentsImages(localStorage.getItem('DELETED_IMAGE'), images.image) }}

                                                        >
                                                          Yes
                                                        </Button>


                                                        <Button
                                                          className="font-bold min-w-[50%] text-[12px] 
                                                    text-center w-[max-content] ml-[10px]"
                                                          shape="CustomBorderTL4"
                                                          size="sm"
                                                          variant="OutlineGray302"
                                                          onClick={() => setDeleteModal(false)}
                                                        >
                                                          No
                                                        </Button>
                                                      </Row>
                                                    </Modal>
                                                  </Row>

                                                </>
                                              )
                                            }
                                          })
                                          }      </Text>

                                      </Row>
                                      <Column className="ml-[10px] pt-[20px]">
                                        <Modal isOpen={editModelOpen}
                                          onRequestClose={() => setEditModelOpen(false)}
                                          style={customStyles}
                                        >
                                          <Form closeModal={closeModal} id={localStorage.getItem('EDIT_ID')} comment={apiData1ResponseEle?.comment} />
                                        </Modal>
                                      </Column>

                                    </>
                                  }
                                </Column>
                              </div>
                            </Row>
                          </Column>
                        )
                      })}
                    </List>
                    <Row className="bg-gray_101 border border-indigo_A201 border-solid sm:p-[15px] p-[16px] md:p-[8px] 
        rounded-bl-[16px] rounded-br-[0] rounded-tl-[0] rounded-tr-[0] listpolygontwo"
                    >
                      <Column className="h-[33px] bg-purple_200 h-[max-content] inset-y-[0] items-center 
              justify-start left-[0] my-[auto] sm:px-[2px]
               md: rounded-radius50 sm:w-[12px] md:w-[16px] w-[32px] p-[5px]">
                        <Text
                          className="mb-[1px] text-white_A700 w-[auto]"
                          variant="body1"
                        >
                          {fetchInitals(count?.payload?.name?.split('"').join(''))}
                        </Text>
                      </Column>
                      {!visiblePostCommentForm && <Text
                        className="font-medium sm:ml-[3px] md:ml-[4px] ml-[8px] text-gray_402 w-[auto]"
                        onClick={() => {
                          addComments();
                        }}
                      >
                        Leave an Internal comment

                      </Text>}
                      {
                        visiblePostCommentForm &&
                        <AdminComments setVisiblePostComment={setVisiblePostComment} />
                      }

                    </Row>
                  </Column>
                  <Column className="bg-white_A700 border border-gray_301 border-solid items-center sm:mx-[0]
       sm:p-[15px] p-[16px] md:p-[8px] rounded-bl-[0] rounded-br-[16px] rounded-tl-[0] 
       rounded-tr-[0] sm:w-[100%] w-[45%]">
                    <Column className="justify-start sm:px-[0] w-[100%]">
                      <Column className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[96%]">
                        <Text
                          className="font-semibold text-bluegray_900 w-[auto]"
                          variant="body3"
                        >
                          Details
                        </Text>
                        <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                          <Text className="Publiclink" variant="body3">
                            Public link
                          </Text>
                          <Text
                            className="common-pointer"
                            variant="body3"
                          >
                            https://comingsoon.canny.io
                          </Text>
                        </Row>
                        <Row className="md:flex-wrap sm:flex-wrap items-center mt-[10px] sm:mt-[3px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                          <Text className="Publiclink" variant="body3">
                            Status
                          </Text>
                          <Row className="md:flex-wrap sm:flex-wrap items-start justify-evenly md:ml-[16px] ml-[32px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[83%]">
                            <SelectBox2
                              className="font-medium lg:mt-[3px] xl:mt-[4px] 2xl:mt-[5px] 3xl:mt-[6px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[9px] text-bluegray_700 w-[100%]"
                              placeholderClassName="text-bluegray_700"
                              name="Dropdown"
                              onChange={editPost}
                              placeholder="status"
                              isSearchable={false}
                              isMulti={false}
                              indicator={
                                <Img
                                  src="images/img_arrowdown.svg"
                                  className="lg:w-[10px] lg:h-[11px] lg:mr-[4px] xl:w-[13px] xl:h-[14px] xl:mr-[5px] 2xl:w-[15px] 2xl:h-[16px] 2xl:mr-[6px] 3xl:w-[18px] 3xl:h-[19px] 3xl:mr-[7px]"
                                  alt="arrow_down"
                                />
                              }
                              shape="RoundedBorder4"
                              size="lg"
                              variant="OutlineBluegray100"
                            ></SelectBox2>
                          </Row>
                        </Row>
                        <Row className="md:flex-wrap sm:flex-wrap items-center mt-[11px] sm:mt-[4px] md:mt-[5px] sm:mx-[0] sm:px-[0]">
                          <Text className="Publiclink" variant="body3">
                            You
                          </Text>
                          <Row className="md:flex-wrap sm:flex-wrap items-start justify-evenly md:ml-[10px]
               ml-[31px] sm:mx-[0] sm:px-[0]">
                            <Text
                              className="font-normal not-italic text-bluegray_900 w-[200px]"
                              variant="body3"
                            >
                              {count?.payload?.name}
                            </Text>
                          </Row>
                        </Row>
                       
                        <Row className="md:flex-wrap sm:flex-wrap items-center mt-[12px] sm:mt-[4px] md:mt-[6px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[28%]">
                          <Text className="Publiclink" variant="body3">
                            Type
                          </Text>
                          <Text className="Add" variant="body3">
                            Admin
                          </Text>
                        </Row>
                      </Column>
                      <Row className="sm:mt-[12px] md:mt-[16px] mt-[32px] listrequest">
                        <Text
                          className="font-semibold text-bluegray_900 w-[auto]"
                          variant="body3"
                          onClick={() => {
                            addTags();
                          }}
                        >
                          Tags
                        </Text>
                        <Text
                          className="SelectAll"
                          onClick={() => {
                            addTags()
                          }}
                        >
                          Add tags
                        </Text>


                      </Row>
                      {visibleTagForm &&
                        <>
                          <Column>
                            <Row><Tag setVisibleTags={setVisibleTags} /></Row>
                          </Column>
                        </>
                      }

                    </Column>
                  </Column>
                </Row>
              </Column>
            </Column>
          </Row>
          <Footer/>
        </Column>
      </Column>
    </>
  );
};

export default AdminfeedbackPage;
