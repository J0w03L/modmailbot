const Eris = require("eris");

/**
 * @typedef AfterStaffReplyHookData
 * @property {Thread} thread
 * @property {Eris.Member} moderator
 * @property {ThreadMessage} message
 */

/**
 * @callback AfterStaffReplyHookFn
 * @param {AfterStaffReplyHookData} data
 * @return {void}
 */

/**
 * @callback AddAfterStaffReplyHookFn
 * @param {AfterStaffReplyHookFn} fn
 * @return {void}
 */

/**
 * @type AfterStaffReplyHookFn[]
 */
const afterStaffReplyHooks = [];

/**
 * @type {AddAfterStaffReplyHookFn}
 */
let afterStaffReply; // Workaround to inconsistent IDE bug with @type and anonymous functions
afterStaffReply = (fn) => {
  afterStaffReplyHooks.push(fn);
};

/**
 * @param {{
 *   thread: Thread,
 *   moderator: Eris.Member,
 *   message: ThreadMessage
 * }} input
 */

async function callAfterStaffReplyHooks(input) {
  for (const hook of afterStaffReplyHooks) {
    await hook(input);
  }
}

module.exports = {
  afterStaffReply: afterStaffReply,
  callAfterStaffReplyHooks: callAfterStaffReplyHooks,
};
