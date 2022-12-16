import React from 'react'
import * as yup from "yup";
import {
    Column,
    Row,
    Text,
    Input,
    TextArea,
    Button,
    Img,
    FloatingInput,
  } from "components";
  import useForm from "hooks/useForm";
  import { editPostData } from 'service/api';

export default function UserEditPost(props) {
  const form = useForm(
    {title: "", description: "" },
  );

   function editPost(data) {
    data.title= data.title ? data.title: props.title;
    data.description= data.description ? data.description:props.description;
    console.log(data);
      const req = {
        params: { id: `eq.${props.id}` },
        data: { title: data.title, description:data.description },
      }
      editPostData(req)
        .then((res) => {
          props.ModalClose(false);
        })
        .catch((err) => {
          console.error(err);
        });
  }
    return (
        <Row className="w-[1800px]">
            <Column className="items-center justify-start mb-[130px] sm:mb-[5px] md:mb-[67px] mt-[11px] sm:mt-[4px] md:mt-[5px] sm:mx-[0] sm:p-[15px] p-[16px] md:p-[8px] rounded-radius4 sm:w-[100%] w-[31%]">
               <Column className="items-center justify-start sm:px-[0] w-[100%]">
                 <Text
                   className="font-medium text-bluegray_900 w-[auto]"
                   as="h6"
                   variant="h6"
                 >
                  Edit
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
                         className="font-medium p-[0] text-[14px] placeholder:text-bluegray_700 text-bluegray_700 
                         w-[100%]"
                         wrapClassName="md:mt-[5px] mt-[10px] sm:mt-[3px] w-[100%]"
                         name="InputField"
                         placeholder="title"
                         defaultValue={props.title}
                         shape="RoundedBorder6"
                         size="xl"
                         onChange={(e) => {
                          if(e.target.value){
                            form.handleChange("title", e.target.value);
                          }
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
                         className="font-medium mt-[10px] sm:mt-[3px] md:mt-[5px] text-[14px] placeholder:
                         text-bluegray_700
                          text-bluegray_700 w-[100%]"
                         name="inputfield One"
                         placeholder="desctipion..."
                         defaultValue={props.description}
                         onChange={(e) => {
                           form.handleChange("description", e.target.value);
                         }}         
                       
                       ></TextArea>
                     </Column>
                   </Column>
                   <Row className="mt-[16px] sm:mt-[6px] md:mt-[8px] listrequest">
                     <Button
                       className="font-semibold min-w-[45%] text-[14px] text-center w-[max-content]"
                       shape="RoundedBorder6"
                       size="lg"
                       variant="FillIndigoA201"
                       onClick={() => {
                        form.handleSubmit(editPost);
                      }}
                     >
                       Edit Post
                     </Button>
                   </Row>
                 </Column>
               </Column>
             </Column>
        </Row>
     )
}
