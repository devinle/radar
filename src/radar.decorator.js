/**
 * @function routeRequest
 * Used to interface with window pushstate
 *
 * @param {Object} payload
 * @param {String} payload.from - From URL
 * @param {String} payload.to - To URL
 * @param {String} title - Optional title (not used in FF)
 */
export const routeRequest = (payload, title = '') => {
  const { from, to } = payload;
  console.log(from, to);
  if (to === '') return;
  window.history.pushState(
    { from, to },
    title,
    to,
  );
};

export default routeRequest;
