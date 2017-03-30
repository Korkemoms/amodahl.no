// @flow
/**
 * Action types should be fetched using a function call.
 * This causes an error to be thrown if non existing
 * types are used. (instead of silently causing a bug)
 */
export const types = {
  home: {
    ENABLE_FADE_IN: () => 'ENABLE_FADE_IN',
    DISABLE_FADE_IN: () => 'DISABLE_FADE_IN'
  },
  leveringMontering: {
    CAROUSEL_SELECT: () => 'LEVERING_MONTERING_CAROUSEL_SELECT'
  },
  login: {
    USER_LOGGED_OUT: () => 'USER_LOGGED_OUT',
    REQUEST_AMODAHL_TOKEN_FAILED: () => 'REQUEST_AMODAHL_TOKEN_FAILED',
    RECEIVE_SIGNERE_URL: () => 'RECEIVE_SIGNERE_URL',
    RECEIVE_AMODAHL_TOKEN: () => 'RECEIVE_AMODAHL_TOKEN',
    UPDATE_LOGIN_INFO: () => 'UPDATE_LOGIN_INFO'
  },
  router: {
    LOCATION_CHANGE: () => '@@router/LOCATION_CHANGE'
  }
}
