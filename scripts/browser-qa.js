// Run through agent-browser eval --stdin on the local homepage with chat open.
// Network mocks ensure this QA never sends email or depends on a live AI provider.
(async () => {
  const results = [];
  const check = (name, condition) => { if (!condition) throw Error(name); results.push(name); };
  const waitFor = async predicate => {
    const started = Date.now();
    while (!predicate()) { if (Date.now() - started > 4000) throw Error('UI update timed out'); await new Promise(r => setTimeout(r, 30)); }
  };
  const change = async (element, value) => {
    const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise(r => setTimeout(r, 30));
  };
  const actualFetch = window.fetch;
  let chatRequests = 0, contactRequests = 0, contactSuccess = false;
  window.fetch = async (input, init) => {
    if (String(input).includes('/api/chat')) { chatRequests++; return new Response('Unavailable', { status: 502 }); }
    if (String(input).includes('/api/contact')) { contactRequests++; return Response.json(contactSuccess ? { success: true } : { error: 'Unavailable' }, { status: contactSuccess ? 200 : 503 }); }
    return actualFetch(input, init);
  };
  try {
    const panel = document.querySelector('#portfolio-chat');
    const chatInput = panel.querySelector('input');
    await change(chatInput, 'Tell me about Friends AI');
    const started = performance.now();
    panel.querySelector('form').requestSubmit();
    await waitFor(() => panel.innerText.includes('WebRTC') && panel.innerText.includes('Vercel AI SDK'));
    const instantAnswerMs = Math.round(performance.now() - started);
    check('confirmed Friends AI stack answered without an API call', chatRequests === 0);
    panel.querySelector('[aria-label="Close Chat"]').click();
    await waitFor(() => panel.hidden);
    check('close restores keyboard focus', document.activeElement.getAttribute('aria-label') === 'Open AI chat');
    document.querySelector('[aria-label="Open AI chat"]').click();
    await waitFor(() => !panel.hidden);
    check('reopening preserves conversation', panel.innerText.includes('WebRTC'));
    await change(chatInput, 'Explain how Chaty AI helps with document research');
    panel.querySelector('form').requestSubmit();
    await waitFor(() => panel.innerText.includes('relevant details published'));
    check('502 returns helpful published details', chatRequests === 1 && !panel.querySelector('[role="alert"]'));
    const bounds = panel.getBoundingClientRect();
    check('chat fits viewport horizontally', bounds.left >= 0 && bounds.right <= innerWidth);
    check('page has no horizontal overflow', document.documentElement.scrollWidth <= innerWidth);
    panel.querySelector('[aria-label="Close Chat"]').click();
    const contact = document.querySelector('#contact form');
    await change(contact.querySelector('[name="email"]'), 'qa@example.com');
    await change(contact.querySelector('textarea'), 'Mock browser QA draft');
    contact.requestSubmit();
    await waitFor(() => contact.querySelector('[role="alert"]'));
    check('failed contact preserves draft and offers direct email', contact.querySelector('textarea').value === 'Mock browser QA draft' && contact.querySelector('[role="alert"] a').href.startsWith('mailto:'));
    check('failed contact does not report success', !contact.querySelector('[role="status"]'));
    contactSuccess = true;
    contact.requestSubmit();
    await waitFor(() => contact.querySelector('[role="status"]'));
    check('accepted contact reports success and clears the draft', contact.querySelector('textarea').value === '' && contactRequests === 2);
    document.querySelector('[aria-label="Open AI chat"]').click();
    return { passed: results, instantAnswerMs, viewport: { width: innerWidth, height: innerHeight }, emailRequestsMocked: contactRequests };
  } finally { window.fetch = actualFetch; }
})()
