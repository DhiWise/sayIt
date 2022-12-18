import { apis } from "service";
import { SupabaseCredentials } from "constants/Constant";
const COMMON_URL = SupabaseCredentials.CommonUrl;

const API_URLS = {
  BOARDS: `${COMMON_URL}rest/v1/boards`,
  COMMENT_IMAGE: `${COMMON_URL}rest/v1/comment_image`,
  POST_TAGS: `${COMMON_URL}rest/v1/tags`,
  POSTS: `${COMMON_URL}rest/v1/posts`,
  POST_COMMENTS: `${COMMON_URL}rest/v1/comments`,
  POST_TAG: `${COMMON_URL}rest/v1/post_tag`,
  PUT_SIGNUP: `${COMMON_URL}auth/v1/user`,
  FETCH_USER_DATA: `${COMMON_URL}rest/v1/profiles`,
  GET_PROFILE: `${COMMON_URL}rest/v1/profiles?`,
  POST_LOGIN: `${COMMON_URL}auth/v1/token?grant_type=password`,
  UPVOTES: `${COMMON_URL}rest/v1/upvotes`,
  FETCH_USER_WITH_SORTING_DATA: `${COMMON_URL}rest/v1/rpc/user_list_with_sorting`,
  FETCH_POST_LIST_WITH_FILTER_DATA: `${COMMON_URL}rest/v1/rpc/post_list_with_filter`,
  FETCH_NOTIFICATION_LIST_WITH_FILTERS_DATA: `${COMMON_URL}rest/v1/notifications`,
  POST_LIST: `${COMMON_URL}rest/v1/rpc/post_list`,
  GET_TOPPOSTSCOUNT: `${COMMON_URL}rest/v1/rpc/top_posts_count`,
  INVITE_USER: `${COMMON_URL}auth/v1/invite`,
  REGISTER_USER: `${COMMON_URL}auth/v1/signup`,
  BOARDS_WITH_POST_COUNT: `${COMMON_URL}rest/v1/rpc/boards_with_post_count`,
  DELETE_POST:`${COMMON_URL}rest/v1/posts`,
  EDIT_POST:`${COMMON_URL}rest/v1/posts`,
  POST_TAGPOST:`${COMMON_URL}rest/v1/post_tag`,
  DELETE_POST_TAGS:`${COMMON_URL}rest/v1/post_tag`
};


export const createBoardData = (payload) =>
  apis.post(API_URLS.BOARDS, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const fetchBoardData = (payload) =>
  apis.get(API_URLS.BOARDS, {
    ...payload,
    params: { select: "name,id", ...payload?.params },
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      ...payload?.headers,
    },
  });

export const getBoardsselectname = (payload) =>
  apis.get(API_URLS.BOARDS, {
    ...payload,
    params: { select: "*", ...payload?.params },
  });

export const fetchcommentImageData = (payload, params) =>
  apis.get(API_URLS.COMMENT_IMAGE, {
    ...payload,
    params: {
      select: "id,image,comment:comments(id,comments)",
      ...params
    },
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });

export const postCommentsImagesData = (payload) =>
  apis.post(API_URLS.COMMENT_IMAGE, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const fetchcommentsImageData =
  (payload, params) =>
    apis.get(
      API_URLS.COMMENT_IMAGE,
      {
        ...payload,
        params: {
          select: "*",
          ...params,
        },
        headers: {
          apikey: SupabaseCredentials.ApiKey,
          Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
          ...payload?.headers,
        },
      }
    );

export const deleteCommentImagesData = (payload) =>
  apis.delete(API_URLS.COMMENT_IMAGE, {
    ...payload,
    params: { ...payload?.params },
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      ...payload?.headers,
    },
  });

export const getCommentImgByPostid = (payload) =>
  apis.get(API_URLS.COMMENT_IMAGE, {
    ...payload,
    params: { select: "*", ...payload?.params },
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,

      ...payload?.headers,
    },
  });

export const fetchTagData = (payload) =>
  apis.get(API_URLS.POST_TAGS, {
    ...payload,
    params: { select: "id,name", ...payload?.params },
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });

export const createTagsData = (payload) =>
  apis.post(API_URLS.POST_TAGS, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const fetchPostData =
  (payload, params, startRange, endRange) =>
    apis.get(
      API_URLS.POSTS,
      {
        ...payload,
        params: {
          select: "id,status,title,description, board_id, boards(id, name)",
          ...params
        },
        headers: {
          apikey: SupabaseCredentials.ApiKey,
          Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
          Range: `${startRange}-${endRange}`,
          ...payload?.headers,
        },
      }
    );

export const postPostsData = (payload) =>
  apis.post(API_URLS.POSTS, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const fetchUserPostCountData = (payload) =>
  apis.get(API_URLS.POSTS, {
    ...payload,
    params: { user_id: payload.user_id, select: "count", ...payload?.params },
    headers: {

      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      ...payload?.headers,
    },
  });

export const getPostsboardideq1 = (payload) =>
  apis.get(API_URLS.POSTS, {
    ...payload,
    params: { ...payload?.params },
    headers: {

    },
  });

export const getPostsideq1selectusersuserid = (payload) =>
  apis.get(API_URLS.POSTS, {
    ...payload,
    params: { select: "*, users:user_id(*)", ...payload?.params },
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "content-type": "application/json",
      ...payload?.headers,
    },
  });

export const postPosts = (payload) =>
  apis.post(API_URLS.POSTS, {
    ...payload,
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const fetchCommentData =
  (payload, startRangeComment, endRangeComment) =>
    apis.get(
      API_URLS.POST_COMMENTS,
      {
        ...payload,
        params: {
          select: "id,comments,user_id,parent_id,created_at,profiles(name,avtar)",
          ...payload?.params,
        },
        headers: {
          apikey: SupabaseCredentials.ApiKey,
          Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
          Range: `${startRangeComment}-${endRangeComment}`,
          ...payload?.headers,
        },
      }
    );

export const editCommentsData = (payload) =>
  apis.patch(API_URLS.POST_COMMENTS, {
    ...payload,
    params: { ...payload?.params },
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
    },
  });

export const postCommentsData = (payload) =>

  apis.post(API_URLS.POST_COMMENTS, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

  export const postTagtoPostData = (payload) =>

  apis.post(API_URLS.POST_TAGPOST, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const deleteCommentData = (payload) =>
  apis.delete(API_URLS.POST_COMMENTS, {
    ...payload,
    params: { ...payload?.params },
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
    },
  });
  export const deleteTagPostData = (payload) =>
  apis.delete(API_URLS.DELETE_POST_TAGS, {
    ...payload,
    params: { ...payload?.params },
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
    },
  });

export const fetchUserCommentCountData = (payload) =>
  apis.get(API_URLS.POST_COMMENTS, {
    ...payload,
    params: { user_id: payload.user_id, select: "count", ...payload?.params },
    headers: {

      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      ...payload?.headers,
    },
  });

export const fetchPostTagData = (payload) =>
  apis.get(API_URLS.POST_TAG, {
    ...payload,
    params: { select: "*, tag:tags(name)", ...payload?.params },
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      ...payload?.headers,
    },
  });

export const inviteUsers = (payload) =>
  apis.post(API_URLS.INVITE_USER, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ServiceRoleKey,
      Authorization: `Bearer ${SupabaseCredentials.ServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const editPasswordData = (payload, href) =>
  apis.put(API_URLS.PUT_SIGNUP, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${href}`,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });

  export const editPostData = (payload, href) =>
  apis.patch(API_URLS.EDIT_POST, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });

export const fetchProfileData = (payload) =>
  apis.get(API_URLS.FETCH_USER_DATA, {
    ...payload,
    params: { select: "*", ...payload?.params },
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      ...payload?.headers,
    },
  });

export const fetchUserData = (payload) =>
  apis.get(API_URLS.FETCH_USER_DATA, {
    ...payload,
    params: { id: payload.user_id, select: "*", ...payload?.params },
    headers: {

      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      ...payload?.headers,
    },
  });

export const fetchUserCountData = (payload) =>
  apis.get(API_URLS.FETCH_USER_DATA, {
    ...payload,
    params: { select: "count", ...payload?.params },
    headers: {

      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      ...payload?.headers,
    },
  });

export const loginData = (payload) =>
  apis.post(API_URLS.POST_LOGIN, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });


export const postPostlistwithcustomsorting = (payload) =>
  apis.post(API_URLS.POST_LIST, {
    ...payload,
    headers: {
      "Content-Type": "application/json",
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      ...payload?.headers,
    },
  });

export const fetchUserVotesCountData = (payload) =>
  apis.get(API_URLS.UPVOTES, {
    ...payload,
    params: { user_id: payload.user_id, select: "count", ...payload?.params },
    headers: {

      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      ...payload?.headers,
    },
  });

export const getUpvotespostideq1 = (payload) =>
  apis.get(API_URLS.UPVOTES, {
    ...payload,
    params: { ...payload?.params },
  });

export const deleteUpvotespostideq1 = (payload) =>
  apis.delete(API_URLS.UPVOTES, {
    ...payload,
    params: { ...payload?.params },
  });

export const deletePosts = (payload) =>
  apis.delete(API_URLS.DELETE_POST, {
    ...payload,
    params: { ...payload?.params },
  });


export const getUpvotespostideq1selectusersuserid = (payload) =>
  apis.get(API_URLS.UPVOTES, {
    ...payload,
    params: {
      select: "*, users:user_id(id,name)",
      ...payload?.params,
    },
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "content-type": "application/json",
      ...payload?.headers,
    },
  });

export const upvotePosts = (payload) =>
  apis.post(API_URLS.UPVOTES, {
    ...payload,
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...payload?.headers,
    },
  });

export const fetchUserListWithSortingData = (payload) =>
  apis.post(API_URLS.FETCH_USER_WITH_SORTING_DATA, {
    ...payload,
    headers: {

      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      ...payload?.headers,
    },
  });

export const fetchPostListWithFilterData = (payload) =>
  apis.post(API_URLS.FETCH_POST_LIST_WITH_FILTER_DATA, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      ...payload?.headers,
    },
  });

export const fetchNotificationListWithFiltersData =
  (payload) =>
    apis.get(
      API_URLS.FETCH_NOTIFICATION_LIST_WITH_FILTERS_DATA,
      {
        params: {
          activity: "in.(NEW_COMMENTS,NEW_POSTS,STATUS_UPDATES)",
          select:
            "post_id,posts(title,description,status),user_id,board_id,boards(name),date,activity,id,profiles:user_id(name),action_user(name))",
          order: "date.desc",
          ...payload?.params
        },
        headers: {
          apikey: SupabaseCredentials.ApiKey,
          Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
          ...payload?.headers,
        },
      }
    );

export const getNotificationsUser =
  (payload) =>
    apis.get(
      API_URLS.FETCH_NOTIFICATION_LIST_WITH_FILTERS_DATA,
      {
        ...payload,
        params: {
          select:
            "id,post_id,is_read,posts(title,description,status),user_id,board_id,boards(name),date,activity",
          "order": "is_read",
          ...payload?.params,
        },
        headers: {
          apikey: SupabaseCredentials.ApiKey,
          Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
          ...payload?.headers,
        },
      }
    );

export const patchNotifications = (payload) =>
  apis.patch(API_URLS.FETCH_NOTIFICATION_LIST_WITH_FILTERS_DATA, {
    ...payload,
    params: { ...payload?.params },
  });

export const getToppostscount = (payload) =>
  apis.get(API_URLS.GET_TOPPOSTSCOUNT, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });

  export const registerUser = (payload) =>
  apis.post(API_URLS.REGISTER_USER, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      "Content-Type": "application/json",
      ...payload?.headers,
    },
  });

  export const fetchBoardWithPostCount = (payload) =>
  apis.get(API_URLS.BOARDS_WITH_POST_COUNT, {
    ...payload,
    headers: {
      apikey: SupabaseCredentials.ApiKey,
      Authorization: `Bearer ${SupabaseCredentials.Authorization}`,
      ...payload?.headers,
    },
  });