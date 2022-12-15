import React from 'react'
import {
    Row,
    Input,
    Column,
    Button,
    Text,
    Switch
  } from "components";
import { postCommentsData,
         postCommentsImagesData } from "service/api";
import useForm from "hooks/useForm";
import {SupabaseCredentials} from "constants/Constant"
import * as yup from "yup";
import { selectCount } from 'reducers/userSlice';
import { useSelector } from 'react-redux';

let array=[];
let imageUploadedCount=0;

export default function AdminComments(props) {
  const formValidationSchema = yup
  .object()
  .shape({
    comments: yup
      .string()
      .required("Comment is required")
  });
  const count = useSelector(selectCount);
    const [commentsData, setCommentData]= React.useState();
    const [selectedFile, setSelectedFile] = React.useState();
    let [imageUrl,setImgaeUrl]= React.useState(0);

    const form = useForm(
        { comments: "", is_public: true },
        {
          validate: true,
          validateSchema: formValidationSchema,
          validationOnChange: true,
        }    
      );
    
    function postComments(data) {
        const req = {
          data: { ...data, post_id: localStorage.getItem("POST_ID"), user_id: count?.payload?.id },
        };
      
        postCommentsData(req)
        
          .then((res) => {
            setCommentData(res);
            props.setVisiblePostComment(false);
            if (array.length) {
              let bucketURL = array.map(v => ({ image: v.Key, comment_id: res[0].id }))
              postCommentImages(bucketURL);
            }
    
          })
          .catch((err) => {
            console.error(err);
          });
      }
      function postCommentImages(data) {
        const req = { data };
        postCommentsImagesData(req)
          .then((res) => {
            if(res){
              array=[];
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
      //start Manual Code

      const changeHandler = async (event) => {
        imageUploadedCount=event.target.files.length;
        for (let index in event.target.files) {
          if (event.target.files[index].name && typeof (event.target.files[index]) === 'object') {
            setSelectedFile(event.target.files[index]);
            let data = await fileUpload(event.target.files[index]);
            array.push(JSON.parse(data));
          }
        }
      };

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
    
        let response = await fetch(`${SupabaseCredentials.CommentURL}${Math.random()}${file.name}`
          , requestOptions);
          setImgaeUrl(imageUrl+=1);
        return await response.text();
      }
    
       //End Manual Code
    
  return (
    <>
    <Column>
    <Row>
    <Input
    className="placeholder:text-bluegray_700 Dropdown"
    wrapClassName="flex md:mt-[2px] mt-[6px] sm:mt-[1px] w-[300px] ml-[10px] pt-[4px]"
    name="Dropdown"
    placeholder="Enter Comment"
    shape="RoundedBorder6"
    size="lg"
    errors={form?.errors?.comments}
    onChange={(e) => {
        form.handleChange("comments", e.target.value);
      }}

     ></Input>   
             <label className="w-20 flex flex-col items-center px-2 py-3
        bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border 
        border-blue cursor-pointer ml-[1px] mt-[5px]">
        <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
         <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
          <input type='file' className="hidden" multiple onChange={changeHandler}  />
        </label>

    </Row>
     <Column>
     <Row className="mt-[5px]">    
     {imageUrl!=0 && (
      <div>{imageUrl}/{imageUploadedCount} files uploaded</div>
      )}
    
      <Button
                    className="font-bold min-w-[20%] h-[40px] text-[12px] text-center w-[max-content] ml-[300px] mt-[5px]"
                    shape="CustomBorderTL4"
                    size="sm"
                    variant="icbOutlineIndigoA201"
                    onClick={() => {
                        form.handleSubmit(postComments);
                      }}

                  >
                    POST
                  </Button>

      </Row>
     </Column>
    </Column>
      </>


  )
}
