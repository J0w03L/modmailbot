const Eris = require("eris");

/**
 * @typedef AfterNewThreadHookData
 * @property {Thread} thread
 * @property {Eris.User} user
 * @property {CreateNewThreadForUserOpts} opts
 */

/**
 * @callback AfterNewThreadHookFn
 * @param {AfterNewThreadHookData} data
 * @return {void}
 */

/**
 * @callback AddAfterNewThreadHookFn
 * @param {AfterNewThreadHookFn} fn
 * @return {void}
 */

/**
 * @type AfterNewThreadHookFn[]
 */
const afterNewThreadHooks = [];

/**
 * @type {AddAfterNewThreadHookFn}
 */
let afterNewThread; // Workaround to inconsistent IDE bug with @type and anonymous functions
afterNewThread = (fn) => {
  afterNewThreadHooks.push(fn);
};

/**
 * @param {{
 *   thread: Thread,
 *   user: Eris.User,
 *   opts: CreateNewThreadForUserOpts,
 * }} input
 */

async function callAfterNewThreadHooks(input) {
  for (const hook of afterNewThreadHooks) {
    await hook(input);
  }
}

module.exports = {
  afterNewThread: afterNewThread,
  callAfterNewThreadHooks: callAfterNewThreadHooks,
};
