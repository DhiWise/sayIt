import React from "react";

import {
  Column,
  Row,
  Text,
  Img,
  Input,
  Button,
  Footer,
} from "components";
import useForm from "hooks/useForm";
import * as yup from "yup";
import _ from "lodash";
import { inviteUsers } from "service/api";
import { useNavigate } from "react-router-dom";

const Invite = () => {
  function handleNavigate() {}

  const [userData, setUserData] = React.useState("");
  const[messageData,setMessageData]= React.useState(false);
  const navigate= useNavigate();

  const formValidationSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("email is required")
      .email("Please enter valid email"),
    data: yup.object().shape({ name: yup.string() }),
  });

  const form = useForm(
    {email: ""},
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }

  );
  function inviteUser(data) {
    const req = { data: { ...data } };
    inviteUsers(req)
      .then((res) => {
        setUserData(res);
        setMessageData(true);
        localStorage.setItem('INVITE',true);

      })
      .catch((err) => {
        if(err?.response?.data?.error_description){
          alert(err?.response?.data?.error_description);
        }else{
          alert(err?.response?.data?.msg);
        }
      });
  }
  function handleNavigate(){
    navigate("/login");
  }
  return (
    <>
      <Column className="bg-gray_100 font-inter items-center justify-start mx-[auto]
       sm:p-[15px] md:p-[18px] p-[36px] w-[100%]">
        <Column className="items-center justify-start max-w-[1083px]
         mb-[179px] sm:mb-[71px] md:mb-[92px] mx-[auto] sm:px-[15px] w-[100%]">
           <Row className="listrequest">
           <Text className="text-blue-700" as="h4" variant="h2">
             SayIt
            </Text>            
            <Button
              className="font-bold min-w-[7%] text-[14px] text-bluegray_400 text-center w-[max-content]"
              shape="RoundedBorder6"
              onClick={handleNavigate}
              size="lg"
            >
              LOG IN
            </Button>
          </Row>
          <Row className="justify-evenly mt-[50px] sm:mt-[51px] md:mt-[46px] listpolygontwo">
            <Column className="bg-white_A700 sm:mx-[0] outline outline-[0.5px] outline-gray_300 sm:p-[15px] 
            md:p-[33px] p-[64px] rounded-bl-[8px] rounded-br-[0] rounded-tl-[8px] rounded-tr-[0] sm:w-[100%] w-[59%]">
              <Column className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%] w-[57%] ml-[100px]">
                <Text
                  className="font-bold leading-[32.00px] md:leading-[normal] sm:leading-[normal] text-bluegray_900 w-[100%]"
                  as="h2"
                  variant="h2"
                >
                  Easily gather, track, and
                  <br />
                  manage feedback
                </Text>
                <Text
                  className="font-medium sm:mt-[12px] md:mt-[16px] mt-[32px] text-bluegray_600 w-[auto]"
                  variant="body1"
                >
                  Send invitation
                </Text>
              </Column>
              <Column className="items-center justify-start sm:mt-[12px] md:mt-[16px] mt-[32px] sm:mx-[0] 
              sm:px-[0] sm:w-[100%] w-[12%] ml-[400px]">

              </Column>
              <Input
                className="placeholder:text-bluegray_300 InputField"
                wrapClassName="md:mt-[12px] mt-[29px] sm:mt-[8px] sm:mx-[0] sm:w-[100%] w-[76%] ml-[70px]"
                type="text"
                name="InputField"
                placeholder="Email"
                shape="RoundedBorder6"
                size="xl"
                errors={form?.errors?.email}
                onChange={(e) => {
                  form.handleChange("email", e.target.value);
                }}

              ></Input>
                
              <Button
                className="font-bold sm:mb-[34px] md:mb-[44px] mb-[86px] min-w-[76%] sm:mt-[12px] 
                md:mt-[16px] mt-[32px] text-[14px] text-center w-[max-content] ml-[70px]"
                shape="RoundedBorder6"
                size="xl"
                variant="FillLightgreenA700"
                onClick={() => {
                  form.handleSubmit(inviteUser);
                }}
              >
                SEND
              </Button>
              <Row>
            
              </Row>
              {messageData && 
              <div>
               check your mailbox
              </div>}
            </Column>
          </Row>
        </Column>
      </Column>   
      <Footer/>
       </>
  );
};

export default Invite;
