import radar from '../src/radar';

/**
 * Simulate a click event.
 * @public
 * @param {Element} elem  the element to simulate a click on
 */
const simulateClick = function simulateClick(elem) {
  // Create our event (with options)
  const evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  // If cancelled, don't dispatch our event
  elem.dispatchEvent(evt);
};

beforeEach(() => {
  window.history.pushState = jest.fn();
  return window.history.pushState;
});

test('calls window history once', () => {
  radar.routeRequest({ from: 'a', to: 'b' }, 'This is a title');
  expect(window.history.pushState.mock.calls.length).toBe(1);
});

test('calls window history with proper payload', () => {
  radar.routeRequest({ from: 'a', to: 'b' }, 'This is a title');
  expect(window.history.pushState.mock.calls[0][0]).toEqual({ from: 'a', to: 'b' });
  expect(window.history.pushState.mock.calls[0][1]).toBe('This is a title');
});

test('does not call window history with missing to parameter', () => {
  radar.routeRequest({ from: 'a', to: '' }, 'This is a title');
  expect(window.history.pushState.mock.calls.length).toBe(0);
});

test('Test binding a click to the DOM', () => {
  // Initialize delegation for router handling
  document.body.addEventListener('click', radar.go);
  // Add a link
  document.body.innerHTML = `
    <a href="/test" id="testLink">Click me</a>
  `;
  simulateClick(document.getElementById('testLink'));
  expect(window.history.pushState.mock.calls.length).toBe(1);
});

test('Test proper params passed from link', () => {
  // Initialize delegation for router handling
  document.body.addEventListener('click', radar.go);
  // Add a link
  document.body.innerHTML = `
    <a href="/test" id="testLink">Click me</a>
  `;
  simulateClick(document.getElementById('testLink'));
  expect(window.history.pushState.mock.calls[0][0]).toEqual({ from: 'http://localhost/', to: 'http://localhost/test' });
});

test('Test link using ignore class is ignored', () => {
  // Initialize delegation for router handling
  document.body.addEventListener('click', radar.go);
  // Add a link
  document.body.innerHTML = `
    <a href="/test" id="testLink" class="radar-ignore">Click me</a>
  `;

  simulateClick(document.getElementById('testLink'));
  expect(window.history.pushState.mock.calls.length).toBe(0);
});

test('Test on event callback fired once', () => {
  const callback = jest.fn();
  radar.on('radar-change', callback);
  // Initialize delegation for router handling
  document.body.addEventListener('click', radar.go);
  // Add a link
  document.body.innerHTML = `
    <a href="/test" id="testLink">Click me</a>
  `;
  simulateClick(document.getElementById('testLink'));
  expect(callback.mock.calls.length).toBe(1);
});

test('Expect callback data to be accurate', () => {
  let test = {};
  const callback = function callback(data) { test = data; };
  radar.on('radar-change', callback);
  // Initialize delegation for router handling
  document.body.addEventListener('click', radar.go);
  // Add a link
  document.body.innerHTML = `
    <a href="/test" id="testLink">Click me</a>
  `;
  simulateClick(document.getElementById('testLink'));
  expect(test).toEqual({ from: 'http://localhost/', to: 'http://localhost/test' });
});
