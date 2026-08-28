const Eris = require("eris");

/**
 * @typedef BeforeThreadCloseHookContext
 * @property {Number} reason
 * @property {Eris.Member} [moderator]
 * @property {boolean} suppressSystemMessage
 * @property {boolean} silent
 */

/**
 * @typedef BeforeThreadCloseHookData
 * @property {Thread} thread
 * @property {BeforeThreadCloseHookContextData} context
 * @property {Function} cancel
 */

/**
 * @typedef BeforeThreadCloseHookResult
 * @property {boolean} cancelled
 */

/**
 * @callback BeforeThreadCloseHookFn
 * @param {BeforeThreadCloseHookData} data
 * @return {void|Promise<void>}
 */

/**
 * @callback AddBeforeThreadCloseHookFn
 * @param {BeforeThreadCloseHookFn} fn
 * @return {void}
 */

/**
 * @type BeforeThreadCloseHookFn[]
 */
const beforeThreadCloseHooks = [];

/**
 * @type {AddBeforeThreadCloseHookFn}
 */
let beforeThreadClose; // Workaround to inconsistent IDE bug with @type and anonymous functions
beforeThreadClose = (fn) => {
  beforeThreadCloseHooks.push(fn);
};

/**
 * @param {{
 *   thread: Thread,
 *   context: BeforeThreadCloseHookContext,
 * }} input
 * @return {Promise<BeforeThreadCloseHookResult>}
 */
async function callBeforeThreadCloseHooks(input) {
  /**
   * @type {BeforeThreadCloseHookResult}
   */
  const result = {
    cancelled: false,
  };

  /**
   *  @type {BeforeThreadCloseHookData}
   */
  const data = {
    ...input,

    cancel() {
      result.cancelled = true;
    },
  };

  for (const hook of beforeThreadCloseHooks) {
    await hook(data);
  }

  return result;
}

module.exports = {
  beforeThreadClose: beforeThreadClose,
  callBeforeThreadCloseHooks: callBeforeThreadCloseHooks,
};
