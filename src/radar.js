/**
 * radar
 *
 * Router
 */
import { sonar } from '@devinle/sonar';

// Main export
const radar = Object.assign({}, sonar);

/**
 * @function routeRequest
 * Used to interface with window pushstate
 *
 * @param {Object} payload
 * @param {String} payload.from - From URL
 * @param {String} payload.to - To URL
 * @param {String} title - Optional title (not used in FF)
 */
radar.routeRequest = (payload = {}, title = '') => {
  const { from = '', to = '' } = payload;
  if (to === '') return;
  window.history.pushState(
    { from, to },
    title,
    to,
  );
  radar.trigger('radar-change', payload);
};

/**
 * @function go
 * Main handler to parse the event and route
 * accordingly.
 *
 * @param {Object} e - Click event
 */
radar.go = function go(e) {
  let payload;
  if (
    e.target.localName === 'a'
    && window.location.host === e.target.host
    && !e.target.classList.contains('radar-ignore')
  ) {
    e.preventDefault();
    payload = {
      from: window.location.href,
      to: e.target.href,
    };
    radar.routeRequest(payload, '', e.target.href);
  }
  return payload;
};

/**
 * @function init
 * Bind window listeners for popstate
 * and setup initial history state
 */
radar.init = function init() {
  window.addEventListener(
    'popstate',
    e => radar.routeRequest(e.state),
  );
  // Initialize delegation for router handling
  document.body.addEventListener('click', radar.go);

  return this;
};

// Freeze radar
Object.freeze(radar);

// Export
export default radar.init();
