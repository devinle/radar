/**
 * @function routeRequest
 * Used to interface with window pushstate
 *
 * @param {Object} payload
 * @param {String} payload.from - From URL
 * @param {String} payload.to - To URL
 * @param {String} title - Optional title (not used in FF)
 */
export const routeRequest = ({ from = '', to = '' }, title = '') => {
  if (to === '') return;
  window.history.pushState(
    { from, to },
    title,
    to,
  );
};

export default routeRequest;
