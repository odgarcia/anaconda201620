import {SERVER_URL} from './utils/constants';

export const addRequest = request => ({ type: 'ADD_REQUEST', data: request });
export const setRequest = (request) => ({ type: 'SET_REQUEST', data: request });
export const deleteRequest = (requestId) => ({ type: 'DELETE_REQUEST', data: requestId });

export const getSoundTracks = (soundtracks) => ({ type: 'GET_SOUNDTRACKS', data: soundtracks });
export const getNotifications = (notifications) => ({ type: 'GET_NOTIFICATIONS', data: notifications });
export const editNotification = (id) => ({type: 'EDIT_NOTIFICATIONS',data: id});
export const publishNotification = (id) => ({type: 'PUBLISH_NOTIFICATIONS',data: id});

export const showSAModal = (modalProps) => ({ type: 'SHOW_SA_MODALS', data: modalProps });
export const hideSAModal = () => ({ type: 'HIDE_SA_MODALS' });

export const showNotifictionModal = (modalProps) => ({ type: 'SHOW_NOTIFICATION_MODAL', data: modalProps });
export const hideNotifictionModal = () => ({ type: 'HIDE_NOTIFICATION_MODAL' });

export const setActualUserType = (userType) => ({ type: 'SET_USER_TYPE', data: userType });
export const setUserId = (id) => ({ type: 'SET_USER_ID', data: id});
export const getActualNotification = (notifications,notificationId) => ({ type: 'GET_ACTUAL_NOTIFICATION', data: {notifications, notificationId} });

export const getArtistArtworks = artworks => ({type: 'GET_ARTIST_ARTWORKS', data: artworks});

export const getSoundTracksByArtist = id => ({type: 'GET_SOUNDTRACK_BY_ARTIST'})

export const fetchArtistArtworks = (id) => {
  return dispatch => {
      jQuery.ajax({
        method: "GET",
        url: `${SERVER_URL}/comercial_agent/artists/${id}/artworks/`,
        statusCode: {
        200: (data) => {
          dispatch(getArtistArtworks(data.artworks))
        },
        404: (err) => {
          dispatch(showSAModal({
            show: true,
            type: "error",
            title: "Error",
            text: `status: ${err.status} \nstatusText: ${err.statusText}`
          }))
        }
      }
    });
  }
}
export const fetchSoundTracks = (filter, type) => {
  return dispatch => {
    jQuery.ajax({
        method: "GET",
        url: `${SERVER_URL}/comercial_agent/sounds/${type}/${filter}`,
        statusCode: {
        200: (data) => {
          dispatch(getSoundTracks(data))
        },
        404: (err) => {
          dispatch(showSAModal({
            show: true,
            type: "error",
            title: "Error",
            text: `status: ${err.status} \nstatusText: ${err.statusText}`
          }))
        }
      }
    });
  }
};
export const fetchNotifications = () => {
  return dispatch => {
    jQuery.ajax({
        method: "GET",
        url: `${SERVER_URL}/comercial_agent/notifications/`,
        statusCode: {
        200: (data) => {
          localStorage.setItem("NOTIFICATIONS", JSON.stringify(data));
          dispatch(getNotifications(data))
        },
        404: (err) => {
          dispatch(showSAModal({
            show: true,
            type: "error",
            title: "Error",
            text: `status: ${err.status} \nstatusText: ${err.statusText}`
          }))
        }
      }
    });
  }
};

export const fetchOpenNotifications = () => {
  return dispatch => {
    jQuery.ajax({
        method: "GET",
        url: `${SERVER_URL}/comercial_agent/notifications/open-notifications/`,
        statusCode: {
        200: (data) => {
          localStorage.setItem("NOTIFICATIONS", JSON.stringify(data));
          dispatch(getNotifications(data))
        },
        404: (err) => {
          dispatch(showSAModal({
            show: true,
            type: "error",
            title: "Error",
            text: `status: ${err.status} \nstatusText: ${err.statusText}`
          }))
        }
      }
    });
  }
};