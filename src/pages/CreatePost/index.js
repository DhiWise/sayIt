import React from 'react'
import {
    Column,
    Row,
    Text,
    Input,
    TextArea,
    Button,
    Img,
  } from "components";
import { postPostsData,
         postCommentsImagesData } from 'service/api';
import useForm from "hooks/useForm";
import { selectCount } from 'reducers/userSlice';
import { useSelector } from 'react-redux';

import { SupabaseCredentials } from "constants/Constant";

import Header3 from "components/Header/Header3";
let array=[];
const CreatePost = (props) => {
  const [postData,setPostData]= React.useState();
const [selectedFile,setSelectedFile]= React.useState();
const count = useSelector(selectCount);

const form = useForm({ title: "", description:"" });


function postPosts(data) {
    data.user_id=count?.payload?.id;

    const req = { data: { ...data } };
    postPostsData(req)
      .then((res) => {
        if (array.length) {
            let bucketURL = array.map(v => ({ image: v.Key, post_id: res[0].id }))
            postCommentImages(bucketURL);

          }
        setPostData(res);
        props.closeModal(false);
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

  // Start Manual Code
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

    let response = await fetch(`${SupabaseCredentials.CommonUrl}storage/v1/object/bucket1/post/${Math.random()}${file.name}`
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
  // End Manual Code
  return (
    <>
      <Column className="bg-white_A700 font-inter items-center justify-start mx-[auto] py-[15px] sm:py-[5px] md:py-[7px] w-[100%]">
      <Header3 className="w-[100%]" />
        <Column className="items-center justify-end max-w-[976px] sm:mt-[13px] md:mt-[18px] mt-[35px] mx-[auto] sm:p-[14px] p-[px] sm:px-[15px] sm:py-[11px] rounded-radius4 w-[100%]">
          <Column className="justify-start sm:mt-[2px] md:mt-[3px] mt-[7px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[99%]">
            <Text
              className="font-medium text-bluegray_900 w-[auto]"
              as="h6"
              variant="h6"
            >
              Create a Post
            </Text>
            <Column className="items-center justify-start mt-[16px] sm:mt-[6px] md:mt-[8px] sm:pt-[1px] md:pt-[2px] pt-[5px] w-[100%]">
              <Column className="justify-start w-[100%]">
                <Text
                  className="font-semibold text-bluegray_402 w-[auto]"
                  variant="body3"
                >
                  TITLE
                </Text>
                <Input
                  className="font-medium p-[0] text-[14px] placeholder:text-bluegray_600 text-black w-[100%]"
                  wrapClassName="md:mt-[5px] mt-[10px] sm:mt-[3px] w-[100%]"
                  name="InputField"
                  placeholder="Can not fetch cookie"
                  shape="RoundedBorder6"
                  size="xl"
                  onChange={(e) =>{
                    form.handleChange("title",e.target.value);
                }}
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
                 onChange={(e) =>{
                  form.handleChange("description",e.target.value);
              }}
                  className="font-medium mt-[10px] sm:mt-[3px] md:mt-[5px] text-[14px] placeholder:text-bluegray_600 text-black w-[100%]"
                  name="inputfield One"
                  placeholder="When I’ll try to import CURL in DhiWise API runner it can not fetch cookiefrom CURL in header."
                ></TextArea>
              </Column>
            </Column>
            <Row className="mt-[16px] sm:mt-[6px] md:mt-[8px] listrequest">
            <label className="w-15 flex flex-col items-center px-2 py-3 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer">
                      <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                       <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                        <input type='file' className="hidden" multiple onChange={changeHandlerFile} />
                      </label>
              <Button
                className="font-semibold min-w-[9%] text-[14px] text-center w-[max-content] text-white_A700 bg-indigo-700"
                shape="RoundedBorder6"
                size="lg"
                variant="FillIndigoA201"
                onClick = {()=>{
                  form.handleSubmit(postPosts);
                  form.resetForm()
                }}
              >
                Create Post
              </Button>
            </Row>
          </Column>
        </Column>
      </Column>
    </>
  );
};

export default CreatePost;