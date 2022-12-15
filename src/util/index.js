import _ from "lodash";
export const handleSectionNavigation = (id) => {
  const element = document.getElementById(id);
  const offset = 45;
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element?.getBoundingClientRect().top ?? 0;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
// Start Manual Code

export const fillSelectWithAPIResponse = (response) => {
  let result={};
  let replaceKeys = {
    id: "value",
    name: "label"
  }
  response = JSON.parse(response);
  if(response && response.length){
     result = JSON.parse(response).map(function (obj) {
      return _.mapKeys(obj, function (value, key) {
        return replaceKeys[key];
      })
    })
  }
  return result;
}
export const fillSelectWithConstants = (constants) => {
  const result = _.map(constants, function (value, key) {
    let obj = {};
    obj.value = value;
    obj.label = key;
    return obj;
  })
  return result;
}

export const days = (date) =>{
  
}
export const countPosts = (res) => {
  let groupId = _.groupBy(res, "board_id");
  let countId = _.map(groupId, (a) => {
    let countUpvote=_.size(a)
    let upvotePid=a
    return {posts:countUpvote,postBoardId:_.first(_.uniqBy(_.map(upvotePid,(a)=>{ return a.board_id})))};
  }); 
  return countId;                       
};

export const fetchInitals = (data) =>{
  if(data && data.includes('"')){
    data=data.split('"').join('');
  }
  let name = data
  let fullName = name ? name.split(' ') : ["Unknown"];
  let initials = fullName.length > 1 ? fullName.shift().charAt(0) + fullName.pop().charAt(0) : fullName.shift().charAt(0);
  return initials.toUpperCase();
}

export const changeStatusColor = (status) => {
  let classStatus;
   switch(status){
    case 'Open':
      classStatus = 'status-open';
      break;

      case 'Planned':
        classStatus = 'status-planned';
        break;
        
      case 'InProgress':
        classStatus = 'status-in-progress';
        break;

      case 'UnderReview':
          classStatus = 'status-under-review';
          break;

      case 'Complete':
          classStatus = 'status-complete';
          break;   
      
      case 'Closed':
          classStatus = 'status-closed';
          break;    

      default:
        classStatus='status-default';
        break;    
   
   }
   return classStatus;
   

}
// End Manual Code