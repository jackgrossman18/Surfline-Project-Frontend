var JSON_RPC = {};
(function() {
  "use strict";

  var id = 0,
    callbacks = {};

  // Construct JSON RPC request
  JSON_RPC.buildRequest = function(method, params, id) {
    // rpcRequest
    var request = {};
    request.jsonrpc = "2.0";
    request.method = method; // rpcRequest.method;
    if (typeof params !== "undefined") {
      request.params = params; // rpcRequest.param
    }

    request.id = id || id++; // rpcRequest.id || uuid();
    return request;
  };

  // Construct JSON RPC response
  JSON_RPC.buildResponse = function(result, id) {
    // rpc Response
    var response = {};
    response.jsonrpc = "2.0";
    if (typeof result !== "undefined") {
      response.result = result;
    }
    response.id = id;
    return response;
  };

  // Construct JSON RPC Notification
  JSON_RPC.buildNotification = function(method, params) {
    // rpcUpdate
    var notification = {};
    notification.jsonrpc = "2.0";
    notification.method = method;
    if (typeof params !== undefined) {
      notification.params = params; // update params
    }
    return notification;
  };

  // Construct JSON RPC Errors
  JSON_RPC.buildError = function(code, id) {
    var res = {};
    var error = {};
    function getMessage(code) {
      let message;
      if (code === -32700) {
        message = "Invalid JSON was received by the server.";
      }
      if (code === -32600) {
        message = "The JSON sent is not a valid Request object.";
      }
      if (code === -32601) {
        message = "The method does not exist / is not available.";
      }
      if (code === -32602) {
        message = "Invalid method parameter(s).";
      }
      if (code === -32603) {
        message = "Internal JSON-RPC error.";
      }
      if (code <= -32000 && code >= -32099) {
        message = "	Reserved for implementation-defined server-errors.";
      }
      return message;
    }
    res.jsonrpc = "2.0";
    error.code = code;
    error.message = getMessage(code);
    res.id = id || id++;
    return res;
  };
  // Construct JSON RPC method error
  JSON_RPC.buildmethodError = function(code, message, id) {
    var error = {};
    var res = {};
    if (!isNaN(code)) {
      error.code = code;
    }
    if (typeof message === "string") {
      error.message = message;
    }
    res.jsonrpc = "2.0";
    res.error = error;
    res.id = id || id++;
    return res;
  };

  // Construct JSON RPC json parse error
  JSON_RPC.buildjsonError = function(code, message, id) {
    var jsonError = {},
      res = {};
    if (!isNaN(code)) {
      jsonError.code = code;
    }
    if (typeof message === "string") {
      jsonError.message = message;
    }
    res.jsonrpc = "2.0";
    res.error = jsonError;
    res.id = id || id++;
    return res;
  };

  // Construct JSON RPC request error
  JSON_RPC.buildreqError = function(code, message, id) {
    var reqError = {},
      res = {};
    if (!isNaN(code)) {
      reqError.code = code;
    }
    if (typeof message === "string") {
      reqError.message = message;
    }
    res.jsonrpc = "2.0";
    res.error = reqError;
    res.id = id || id++;
    return res;
  };

  // Construct JSON RPC param error
  JSON_RPC.buildparamError = function(code, message, id) {
    var paramError = {},
      res = {};
    if (!isNaN(code)) {
      paramError.code = code;
    }
    if (typeof message === "string") {
      paramError.message = message;
    }
    res.jsonrpc = "2.0";
    res.error = paramError;
    res.id = id || id++;
    return res;
  };

  // Construct JSON RPC internal error
  JSON_RPC.buildinternalError = function(code, message, id) {
    var internalError = {},
      res = {};
    if (!isNaN(code)) {
      internalError.code = code;
    }
    if (typeof message === "string") {
      internalError.message = message;
    }
    res.jsonrpc = "2.0";
    res.error = internalError;
    res.id = id || id++;
    return res;
  };

  // Construct JSON RPC server error
  JSON_RPC.buildserverError = function(code, message, id) {
    var serverError = {},
      res = {};
    if (!isNaN(code)) {
      serverError.code = code;
    }
    if (typeof message === "string") {
      serverError.message = message;
    }
    res.jsonrpc = "2.0";
    res.error = serverError;
    res.id = id || id++;
    return res;
  };
})();

try {
  module.exports = JSON_RPC;
} catch (err) {}
