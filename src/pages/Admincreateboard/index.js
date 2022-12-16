import React from "react";

import { Column, Text, Input, Row, Img, Switch, Button, Footer } from "components";
import Header from "components/Header/Header";
import { createBoardData } from "service/api";
import { useNavigate } from "react-router-dom";
import useForm from "hooks/useForm";
import * as yup from "yup";

const AdmincreateboardPage = () => {

  const [fetchBoardData, setBoardData] = React.useState();
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
  const navigate = useNavigate();

  function createBoard(data) {
    const req = { data: { ...data, is_public: "true" } };

    createBoardData(req)
      .then((res) => {
        setBoardData(res);

        navigate("/adminfeedback");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <Column className="bg-gray_50 font-inter items-center justify-start mx-[auto] sm:pb-[15px] md:pb-[164px] pb-[318px] w-[100%]">
        <Header className="w-[100%]" />
        <Column className="bg-white_A700 border border-bluegray_50 border-solid items-center justify-end max-w-[597px] sm:mt-[12px] md:mt-[16px] mt-[32px] mx-[auto] md:p-[13px] sm:p-[15px] p-[26px] sm:px-[15px] rounded-radius4 w-[100%]">
          <Column className="items-center justify-start sm:mt-[3px] md:mt-[4px] mt-[9px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[64%]">
            <Text
              className="font-medium text-bluegray_900 w-[auto]"
              as="h5"
              variant="h5"
            >
              Create a new board
            </Text>
            <Text
              className="font-medium leading-[22.00px] md:leading-[normal] sm:leading-[normal] md:mt-[10px] mt-[20px] sm:mt-[7px] text-bluegray_600 text-center w-[100%]"
              variant="body1"
            >
              A board Is a place where people can post and
              <br />
              vote on Ideas for a specific topic.
            </Text>
          </Column>
          <Column className="justify-start sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[84%]">
            <Input
              className="w-[100%]"
              wrapClassName="flex h-[56px] w-[100%]"
              name="group293"
              onChange={(e) => {
                form.handleChange("name", e.target.value);
              }}
              errors={form?.errors?.name}
              placeholder="Enter name"
              shape="RoundedBorder6"
              variant="OutlineBluegray101"
            ></Input>
            <Input
              className="w-[100%]"
              wrapClassName="flex h-[56px] md:mt-[8px] mt-[16px] sm:mt-[6px] w-[100%]"
              name="group294"
              placeholder="Enter company name"
              shape="RoundedBorder6"
              variant="OutlineBluegray101"
            ></Input>

            <Button
              className="font-gilroy font-semibold min-w-[17%] sm:ml-[153px] md:ml-[197px] ml-[383px] mt-[16px] sm:mt-[6px] md:mt-[8px] text-[14px] text-center w-[max-content]"
              shape="RoundedBorder6"
              size="lg"
              variant="FillIndigoA201"
              onClick={() => {
                form.handleSubmit(createBoard);
              }}

            >
              CREATE
            </Button>
          </Column>
        </Column>
      </Column>
      <Footer/>
    </>
  );
};

export default AdmincreateboardPage;
