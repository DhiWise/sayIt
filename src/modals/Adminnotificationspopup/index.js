import React from "react";
import ModalProvider from "react-modal";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { Column, Row, Text, Line, List } from "components";
import { Constant } from "constants/Constant.js";
import {
    fetchNotificationListWithFiltersData,
} from "service/api";


import { selectCount } from 'reducers/userSlice';
import { useSelector } from 'react-redux';


const AdminnotificationspopupModal = (props) => {

    const count = useSelector(selectCount);
    const [notificationFilterData, setNotificationFilterData] = React.useState();
    const defaultLimit = 3;
    const navigate = useNavigate();

    React.useEffect(() => {
        Notifications();
    }, []);

    function Notifications() {
        const reqParams = {
            limit: defaultLimit
        };


        const req = { params: reqParams };
        fetchNotificationListWithFiltersData(
            req
        )

            .then((res) => {
                res.forEach((d) => {
                    if (d.activity === "NEW_POSTS") {
                        d.activity = "created a post in"
                        d.users = d?.profiles?.name
                    }

                    if (d.activity === "NEW_COMMENTS") {
                        d.activity = "commented"
                        d.users = d?.action_user?.name
                    }

                    if (d.activity === "STATUS_UPDATES") {
                        d.activity = "marked status as"
                        d.status = d?.posts?.status
                        d.users = count?.payload?.name
                    }
                })
                setNotificationFilterData(res)

            })
            .catch((err) => {
                console.error(err);
            });
    }

    function handleNavigate() {
        navigate("/Adminnotifications");
    }

    function navigateToPostDetail(data) {
        navigate("/adminfeedback", { state: { post_id: data } });
    }
    return (
        <>
            <ModalProvider
                appElement={document.getElementById("root")}
                className="m-[auto] mr-[0px] mt-[60px] w-[32%] sm:w-[100%]"
                overlayClassName="fixed flex h-[100%] inset-y-[0] w-[100%]"
                {...props}
            >
                <div className="m-[auto] mt-[20px]  max-h-[97vh] bg-s bg-gray-100">
                    <Column
                        className="justify-end max-w-[390px] sm:mb-[181px] md:mb-[234px] mb-[454px] mx-[auto] sm:px-[15px] sm:py-[15px] py-[16px] md:py-[8px] w-[100%]"
                    >
                        <Row className="md:flex-wrap sm:flex-wrap items-center justify-between mt-[11px] sm:mt-[4px] md:mt-[5px] sm:mx-[0] sm:px-[0] sm:w-[100%] w-[88%]">
                            <Text
                                className="font-bold text-bluegray_402 tracking-ls07000000000000001 md:tracking-ls1 sm:tracking-ls1 w-[auto]"
                                variant="body2"
                            >
                                NOTIFICATIONS
                            </Text>
                        </Row>
                        <Column className="items-center justify-start mt-[16px] sm:mt-[6px] md:mt-[8px] w-[100%]">
                            <Line className="bg-bluegray_100 h-[1px] w-[100%]" />
                            <List
                                className="min-h-[auto]
                                 pl-1 pr-1 mt-[19px] sm:mt-[7px] md:mt-[9px] md:pb-[12px] pb-[24px] sm:pb-[9px] md:px-[12px] sm:px-[15px] px-[24px] w-[100%]"
                                orientation="vertical"
                            >
                                {notificationFilterData?.map((notificationFilterDataResponseEle, index) => {
                                    if (notificationFilterDataResponseEle.status === Constant.Open) {
                                        notificationFilterDataResponseEle.status = "OPEN";
                                    }
                                    else if (
                                        notificationFilterDataResponseEle.status === Constant.UnderReview
                                    ) {
                                        notificationFilterDataResponseEle.status = "UNDER REVIEW";
                                    } else if (notificationFilterDataResponseEle.status === Constant.Planned) {
                                        notificationFilterDataResponseEle.status = "PLANNED";
                                    } else if (
                                        notificationFilterDataResponseEle.status === Constant.InProgress
                                    ) {
                                        notificationFilterDataResponseEle.status = "INPROGRESS";
                                    } else if (
                                        notificationFilterDataResponseEle.status === Constant.Complete
                                    ) {
                                        notificationFilterDataResponseEle.status = "COMPLETE";
                                    } else if (notificationFilterDataResponseEle.status === Constant.Closed) {
                                        notificationFilterDataResponseEle.status = "CLOSED";
                                    }

                                    return (
                                        <React.Fragment key={`notificationFilterDataResponseEle${index}`}>
                                            <Column
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => navigateToPostDetail(notificationFilterDataResponseEle?.post_id)}
                                                className="bg-white_A700 justify-start my-[0] outline outline-[0.5px] outline-bluegray_100 lg:p-[12px] xl:p-[16px] 2xl:p-[18px] 3xl:p-[21px] rounded-bl-[0] rounded-br-[0] rounded-tl-[8px] rounded-tr-[8px] w-[auto]">
                                                <Column className="justify-start w-[auto]">
                                                    <Text
                                                        className=" text-bluegray_900 w-[100%] text-[14px] mt-3 ml-[1px]"
                                                        as="h6"
                                                        variant="h6"
                                                    >
                                                        {notificationFilterDataResponseEle?.users} has {notificationFilterDataResponseEle?.activity} <b>{notificationFilterDataResponseEle?.owner}</b> <b className="lg:leading-[12px] xl:leading-[16px] 2xl:leading-[18px] 3xl:leading-[21px] 3xl:mt-[11px] lg:mt-[6px] xl:mt-[8px] 2xl:mt-[9px] not-italic text-cyan-600 font-normal	 w-[87%]">{notificationFilterDataResponseEle?.status}</b> in {notificationFilterDataResponseEle?.boards?.name}, {notificationFilterDataResponseEle?.posts?.title}
                                                    </Text>
                                                    <Text className="October12202  mt-1 ml-3 mb-5 text-bluegray_301 text-[12px] font-thin;" variant="body2">

                                                        {moment(notificationFilterDataResponseEle?.date).format('MMMM D, YYYY')}

                                                    </Text>
                                                </Column>
                                            </Column>
                                            <Line className="self-center w-[100%] h-[1px] bg-bluegray_100" />
                                        </React.Fragment>
                                    );
                                })}
                            </List>
                            <Line className="bg-bluegray_100 h-[1px] md:mt-[10px] mt-[20px] sm:mt-[7px] w-[100%]" />
                            <Text className="CustomDomains cursor-pointer" variant="body2"
                                onClick={handleNavigate}
                            >
                                See all
                            </Text>
                        </Column>
                    </Column>
                </div>
            </ModalProvider>
        </>
    );
};

export default AdminnotificationspopupModal;