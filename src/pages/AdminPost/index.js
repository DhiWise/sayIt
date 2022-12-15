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
         postCommentsImagesData,fetchBoardData } from 'service/api';
import useForm from "hooks/useForm";
import { increment, selectCount } from 'reducers/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import { SupabaseCredentials } from "constants/Constant";
import { SelectBox3 } from "components/SelectBox/SelectBox3/index.js";

import * as yup from "yup";
import _ from 'lodash';

let array=[];
export default function AdminPost(props) {

const [postData,setPostData]= React.useState();
const [selectedFile,setSelectedFile]= React.useState();
const [boardId, setBoardId]= React.useState(); 

const count = useSelector(selectCount);
React.useEffect(() => {
  fetchBorads();
}, []);

const formValidationSchema = yup
.object()
.shape({
  title: yup
    .string()
    .required("Title is required")

});

const form = useForm({ title: "", description:"" },
{
  validate: true,
  validateSchema: formValidationSchema,
  validationOnChange: true,
});

function postPosts(data) {
  
    data.user_id=count.payload?.id;
    data.owner_id=count.payload?.id;
    data.status=1;
    data.board_id=boardId;
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
  function fetchBorads() {
    const req = { params: { select: "name,id" } };
      fetchBoardData(req)
      .then((res) => {
          localStorage.setItem("BOARDS_LIST", JSON.stringify(res));
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
  function handleOnChange(event){
    setBoardId(event);
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

    let response = await fetch(`${SupabaseCredentials.CommonUrl}/storage/v1/object/bucket1/post/donwload1.jpg`
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

  return (
       <Row className="w-[1800px]">
           <Column className="items-center justify-start mb-[130px] sm:mb-[5px] md:mb-[67px] mt-[11px] sm:mt-[4px] md:mt-[5px] sm:mx-[0] sm:p-[15px] p-[16px] md:p-[8px] rounded-radius4 sm:w-[100%] w-[31%]">
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
                        className="font-medium p-[0] text-[14px] placeholder:text-bluegray_100 text-bluegray_700 w-[100%]"
                        wrapClassName="md:mt-[5px] mt-[10px] sm:mt-[3px] w-[100%]"
                        name="InputField"
                        errors={form?.errors?.title}
                        onChange={(e) =>{
                            form.handleChange("title",e.target.value);
                        }}
                        placeholder="Short, Descriptive title"
                        shape="RoundedBorder6"
                        size="xl"
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
                        className="font-medium mt-[10px] sm:mt-[3px] md:mt-[5px] text-[14px] placeholder:text-bluegray_100
                         text-bluegray_700 w-[100%]"
                        name="inputfield One"
                        placeholder="Any Additional details..."
                        onChange={(e) =>{
                            form.handleChange("description",e.target.value);
                        }}
                      ></TextArea>
                    </Column>
                    <Column className="justify-start md:mt-[10px] mt-[21px] sm:mt-[8px] w-[100%]">
                    <Text
                        className="font-semibold text-bluegray_402 w-[auto]"
                        variant="body3"
                      >
                        Boards
                      </Text>
                  <SelectBox3
                  className="border border-gray_301 border-solid common-pointer md:mt-[3px] mt-[7px] sm:mt-[2px] font-medium lg:mt-[20px] xl:mt-[20px] 2xl:mt-[25px] 3xl:mt-[20px] 2xl:text-[8px] 3xl:text-[10px] lg:text-[5px] xl:text-[7px] text-bluegray_700 w-[100%]"
                  onChange={handleOnChange}
                  placeholderClassName="text-bluegray_700 md:ml-[3px] ml-[7px] sm:ml-[2px]"
                  name="Searchbox"
                  placeholder="Search..."
                  isSearchable={true}
                  isMulti={false}
                  shape="RoundedBorder4"
                  size="lg"
                  variant="OutlineGray302"
                ></SelectBox3>
                    </Column>
                  </Column>
                  <Row className="mt-[16px] sm:mt-[6px] md:mt-[8px] listrequest">
                    <Button
                      className="font-semibold min-w-[45%] text-[14px] text-center w-[max-content]"
                      shape="RoundedBorder6"
                      size="lg"
                      variant="FillIndigoA201"
                      onClick = {()=>{
                        form.handleSubmit(postPosts);
                      }}
                    >
                      CREATE POST
                    </Button>
                  </Row>
                </Column>
              </Column>
            </Column>
       </Row>
    )
}
