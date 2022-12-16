import React from "react";

import { Column, Row, Button, FloatingInput, Input } from "components";
import { editCommentsData } from "../service/api";
import useForm from "hooks/useForm";

export default function Form(props) {
  const form = useForm({});

  function editComments(data) {
    const req = {
      params: { id: `eq.${props.commentsId}` },
      data: { comments: data.comment },
    };

    editCommentsData(req)
      .then((res) => {
        props.setVisibleChildState(false);
        window.location.reload(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (

    <>
      <Column>
        <Row
          className="border-gray_101 border border-solid sm:p-[15px] p-[16px] md:p-[8px] 
                    rounded-bl-[16px] rounded-br-[0] rounded-tl-[0] rounded-tr-[0] listpolygontwo mt-[50px]"
        >
          <FloatingInput
          className="bg-transparent border-0 font-inter font-medium placeholder:left-[8px] text-[14px] placeholder:text-bluegray_401 text-bluegray_401 placeholder:top-[0] top-[0] w-[100%]"
          type="text"
          name="group293"
          defaultText={props.comments}
          onChange={(e) => {
            form.handleChange("comment", e);
          }}
         ></FloatingInput>
         
          
        </Row>
        <Column>
          <Row className="mt-[5px]">
            <Button
              className="font-bold min-w-[20%] h-[40px] text-[12px] text-center w-[max-content] ml-[310px] mt-[5px]"
              shape="CustomBorderTL4"
              size="sm"
              variant="icbOutlineIndigoA201"
              onClick={() => {
                form.handleSubmit(editComments);
              }}
            >
              SAVE
            </Button>
          </Row>
        </Column>
      </Column>
    </>
  );
}
