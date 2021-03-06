import types from './types'

  export const getCommunityAction = (data) => ({
    type: types.GET_COMMUNITY,
    data,
  });

  export const getMoreCommunityAction = (data) => ({
    type: types.GET_MORE_COMMUNITY,
    data,
  });

  export const getCommunitySearchAction = (data) => ({
    type: types.GET_COMMUNITY_SEARCH,
    data,
  });

  export const getMoreCommunitySearchAction = (data) => ({
    type: types.GET_MORE_COMMUNITY_SEARCH,
    data,
  });

  export const resetCommunitySearchValueAction = () => ({
    type: types.RESET_COMMUNITY_SEARCH_VALUE,
  });

  export const getPostDetailAction = (data) => ({
    type: types.GET_POST_DETAIL,
    data,
  });

  export const changePostDetailAction = (data) => ({
    type: types.CHANGE_POST_DETAIL,
    data,
  });

  export const resetPostDetailAction = () => ({
    type: types.RESET_POST_DETAIL,
  });

  export const createCommunityListAction = () => {
    return {
      type: types.CREATE_COMMUNITY_LIST,
    }
  };
  
  export const resetCommunityListAction = () => {
    return {
      type: types.RESET_COMMUNITY_LIST,
    }
  };
  
        
