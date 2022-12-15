import React from 'react'

import {
    Column,
    Row,
    Button,
    Input,
  } from "components";
import { editCommentsData,fetchcommentImageData }from '../service/api';
import useForm from "hooks/useForm";
import * as yup from "yup";

export default function Form(props) {

  const [editComment,setEditComment]= React.useState();

  React.useEffect(()=>{
    fetchCommentImages();
  },[])
  const formValidationSchema = yup
  .object()
  .shape({
    comment: yup
      .string()
      .required("Comment is required")
  });

  const form = useForm(
    { comment: ""},
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
);
    function fetchCommentImages() {
      const req = {
        params: {
          comment_id: `eq.${props.id}`,
          select: "id,image,comment:comments(id,comments)",
        },
      };
      fetchcommentImageData(req)
        .then((res) => {
          localStorage.setItem('COMMENT',(res[0].comment.comments));
          setEditComment(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }  

function editComments(data) {
  const req = { params: { id: `eq.${props.id}` }, data: { comments: data.comment } };

  editCommentsData(req)
    .then((res) => {
      props.closeModal(false);
    })
    .catch((err) => {
      console.error(err);
    });
}
  return (
    <>
    <Column className="ml-[10px] mr-[330px]">
      <Row>
      <Input
                className="placeholder:text-bluegray_100 text-bluegrey_700"
                wrapClassName="md:mt-[12px] mt-[29px] sm:mt-[8px] sm:mx-[0] sm:w-[100%] w-[76%]"
                type="text"
                name="InputField"
                shape="RoundedBorder6"
                placeholder="Enter comments"
                size="xl"
                errors={form?.errors?.comment}
                onChange={(e) => {
                  form.handleChange("comment", e.target.value);
                }}

              ></Input>
           </Row>
        <Row className="pt-[3px]">
         </Row>
         <Row>
        <Button
          className="font-gilroy font-semibold min-w-[25%] sm:ml-[20px] md:ml-[px] 
          ml-[300px] mt-[16px] sm:mt-[6px] md:mt-[8px] text-[14px] text-center w-[max-content]"
          shape="RoundedBorder6"
          size="lg"
          variant="FillIndigo100"
          onClick={() => {
            form.handleSubmit(editComments);
          }}
        >
          SAVE
        </Button>
        </Row>

    </Column>
    </>

    )
}
