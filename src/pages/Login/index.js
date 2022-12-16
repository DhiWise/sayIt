import React from "react";

import { Column, Row, Img, Button, Text, Input, Footer } from "components";
import { loginData,fetchUserData } from "service/api";
import useForm from "hooks/useForm";
import * as yup from "yup";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { increment, selectCount } from 'reducers/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Login = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const [passwordData, setPasswordData] = React.useState();
  const formValidationSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be minimum of length 8")
      .max(20, "Password must be maximum of length 20")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-._]).{8,}$/,
        "Password is not in correct format"
      ),
        email: yup
          .string()
          .required("Email is required")
          .email("Please enter valid email")
  });
  const form = useForm(
    {email: "", password: "" },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  function login(data) {
    const req = { data: { ...data } };
    let value={};
    dispatch(increment(value));
    localStorage.removeItem('LOGIN');
    loginData(req)
      .then((res) => {
        setPasswordData(res);
        fetchProfiles(res?.user?.id);
        localStorage.removeItem('INVITE');
        navigate("/adminfeedback");
      })
      .catch((err) => {
        alert(err?.response?.data?.error_description);
      });
  }
  function fetchProfiles(data) {
    const req = {
      params: {
        auth_user_id: `eq.${data}`,
        select: "*",
      },
      
    };
      fetchUserData(req)
        .then((res) => {
         // Start Manual Code
          let value={
            id:res[0]?.id,
            name:res[0]?.name
          }
         dispatch(increment(value));
         localStorage.setItem('LOGIN',res[0]?.type);
        })
        // End Manual Code
        .catch((err) => {
          console.error(err);
        });
    }  

  return (
    <>
      <Column className="bg-gray_100 font-inter items-center justify-start mx-[auto] sm:p-[15px] md:p-[18px] p-[36px] w-[100%]">
        <Column className="items-center justify-start max-w-[1083px] mb-[179px] sm:mb-[71px] md:mb-[92px] mx-[auto] sm:px-[15px] w-[100%]">
          <Row className="listrequest">
          <Text className="text-blue-700" as="h4" variant="h2">
             SayIt
            </Text>            
          </Row>
          <Row className="justify-evenly mt-[129px] sm:mt-[51px] md:mt-[66px] listpolygontwo">
            <Column className="bg-white_A700 sm:mx-[0] outline outline-[0.5px] outline-gray_300 sm:p-[15px] md:p-[33px] p-[64px] rounded-bl-[8px] rounded-br-[0] rounded-tl-[8px] rounded-tr-[0] sm:w-[100%] w-[59%]">
              <Column className="justify-start sm:mx-[0] sm:px-[0] sm:w-[100%]">
                <Text
                  className="font-bold leading-[32.00px] md:leading-[normal] sm:leading-[normal] text-bluegray_900 w-[100%]"
                  as="h2"
                  variant="h2"
                >
                  Easily gather, track, and manage feedback
                </Text>
                <Text
                  className="font-medium sm:mt-[12px] md:mt-[16px] mt-[32px] text-bluegray_600 w-[auto]"
                  variant="body1"
                >
                  Get started with SayIt for free
                </Text>
              </Column>
              <Input
                className="placeholder:text-bluegray_300 InputField"
                wrapClassName="md:mt-[12px] mt-[29px] sm:mt-[8px] sm:mx-[0] sm:w-[100%]"
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
              
                <Input
                className="placeholder:text-bluegray_300 InputField"
                wrapClassName="md:mt-[12px] mt-[29px] sm:mt-[8px] sm:mx-[0] sm:w-[100%]"
                type="password"
                name="InputField"
                placeholder="Password"
                shape="RoundedBorder6"
                size="xl"
                errors={form?.errors?.password}
                onChange={(e) => {
                  form.handleChange("password", e.target.value);
                }}

              ></Input>
              

              <Button
                className="font-bold  mb-[20px] sm:mt-[12px] md:mt-[16px] mt-[32px] text-[14px] text-center w-[max-content]"
                shape="RoundedBorder6"
                size="xl"
                variant="FillLightgreenA700"
                onClick={() => {
                  form.handleSubmit(login);
                }}

              >
                LOGIN
              </Button>
              <Link to="/register">
              Don't have an account? Sign up
              </Link>
            </Column>
            
          </Row>
        </Column>
      </Column>
      <Footer/>
    </>
  );
};


export default Login;
