/**
 * radar
 *
 * Router
 */
import { sonar } from '@devinle/sonar';
import { routeRequest } from './radar.decorator';

// Main export
const radar = Object.assign({}, sonar);

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
    routeRequest(payload, '', e.target.href);
    radar.trigger('radar-change', payload);
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
    e => routeRequest(e.state),
  );
  // Initialize delegation for router handling
  document.body.addEventListener('click', radar.go);
};

// Initialize radar
radar.init();

// Freeze radar
Object.freeze(radar);

// Export
export default radar;
