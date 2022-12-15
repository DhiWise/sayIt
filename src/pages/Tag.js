import React from 'react'
import {
    Img,
    Input,
    Button,
  } from "components";
import {createTagsData} from 'service/api';
import useForm from "hooks/useForm";
import * as yup from "yup";

export default function Tag(props) {

    const [tagData, setTagData] = React.useState();
    const formValidationSchema = yup
    .object()
    .shape({
      name: yup
        .string()
        .required("Name is required")
    });
    const form = useForm({ name: "" },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    });

    function createTags(data) {
        const req = { data: { ...data } };
        createTagsData(req)
          .then((res) => {
            setTagData(res);
            props.setVisibleTags(false);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    
  return (
    <>
    <Input
    className="placeholder:text-bluegray_700 Dropdown"
    wrapClassName="flex md:mt-[3px] mt-[7px] sm:mt-[2px] w-[350px]"
    name="Dropdown"
    placeholder="Tags"
    shape="RoundedBorder6"
    size="lg"
    errors={form?.errors?.name}
    onChange={(e) => {
        form.handleChange("name", e.target.value);
      }}
  ></Input>
    <Button
     className="font-bold ml-[2px] text-[12px] text-center w-[50px] mt-[6px]"
    shape="CustomBorderTL4"
    size="sm"
    variant="OutlineGray302"
    onClick={() => {
        form.handleSubmit(createTags);
      }}

    >
        Add
    </Button>

  </>
)
}
