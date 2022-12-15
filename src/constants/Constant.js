export const Constant = {
    Open:1,
    UnderReview: 2,
    Planned: 3,
    InProgress: 4,
    Complete: 5,
    Closed: 6,
  };

  export const UserType = {
    Admin:1,
    User:2
  } 
  export const SupabaseCredentials ={
    CommonUrl : process.env.REACT_APP_COMMEN_URL,
     ApiKey :process.env.REACT_APP_APIKEY,    
     Authorization :process.env.REACT_APP_AUTHORIZATION,
     FileURL:process.env.REACT_APP_FILE_URL,
     CommentURL:process.env.REACT_APP_COMMENT_URL,
     ServiceRoleKey:process.env.REACT_APP_SERVICE_ROLE_KEY
  };
