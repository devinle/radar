/**
 * radar
 *
 * Router
 */

import { routeRequest } from './radar.decorator';

// Main export
export const radar = (function radar() {
  /**
   * @function go
   * Main handler to parse the event and route
   * accordingly.
   *
   * @param {Object} e - Click event
   */
  const go = (e) => {
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
    }
    return payload;
  };

  /**
   * @function init
   * Bind window listeners for popstate
   * and setup initial history state
   */
  const init = () => {
    window.addEventListener(
      'popstate',
      e => routeRequest(e.state),
    );

    // Initialize delegation for router handling
    document.body.addEventListener('click', go);
  };

  // Initialize
  init();

  // API
  return {
    go,
  };
}());

export default radar;
