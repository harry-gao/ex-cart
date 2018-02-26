(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("web/static/admin/js/admin.js", function(exports, require, module) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".


// based on: https://blog.diacode.com/page-specific-javascript-in-phoenix-framework-pt-1

require("phoenix_html");

var _views = require("./views");

var _views2 = _interopRequireDefault(_views);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Application = function () {
  function Application() {
    _classCallCheck(this, Application);

    var body = document.getElementsByTagName('body')[0];
    var viewName = body.getAttribute('data-js-view-name');
    var viewClass = (0, _views2.default)(viewName);

    this.view = new viewClass();
    window.addEventListener('DOMContentLoaded', this.handleDOMContentLoaded.bind(this), false);
    window.addEventListener('unload', this.handleDocumentUnload.bind(this), false);
  }

  _createClass(Application, [{
    key: "handleDOMContentLoaded",
    value: function handleDOMContentLoaded() {
      this.view.mount();
    }
  }, {
    key: "handleDocumentUnload",
    value: function handleDocumentUnload() {
      this.view.unmount();
    }
  }]);

  return Application;
}();

new Application();
});

require.register("web/static/admin/js/lib/ajax_setup.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  setup: function setup() {
    var csrf_token = document.querySelector('meta[name=csrf]').content;
    $.ajaxSetup({
      headers: {
        "X-CSRF-TOKEN": csrf_token
      }
    });
  }
};
});

require.register("web/static/admin/js/socket.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phoenix = require("phoenix");

var socket = new _phoenix.Socket("/socket", { params: { token: window.userToken } });

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/2" function
// in "web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, pass the token on connect as below. Or remove it
// from connect if you don't care about authentication.

// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
socket.connect();

// Now that you are connected, you can join channels with a topic:
// let channel = socket.channel("topic:subtopic", {})
// channel.join()
//   .receive("ok", resp => { console.log("Joined successfully", resp) })
//   .receive("error", resp => { console.log("Unable to join", resp) })

exports.default = socket;
});

;require.register("web/static/admin/js/utils/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.checkStatus = checkStatus;
exports.parseJSON = parseJSON;
exports.httpGet = httpGet;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _es6Promise = require('es6-promise');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

function buildHeaders() {
  // fetch csrf token
  var csrfToken = 'dsahdjkashdksahdj';
  return _extends({}, defaultHeaders, { 'X-CSRF-TOKEN': csrfToken });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function httpGet(url) {
  return (0, _isomorphicFetch2.default)(url, { headers: buildHeaders(), credentials: 'same-origin' }).then(checkStatus).then(parseJSON);
}
});

;require.register("web/static/admin/js/views/admin/cart/base_cart_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _admin_base_view = require("../../admin_base_view");

var _admin_base_view2 = _interopRequireDefault(_admin_base_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseCartView = function (_AdminBaseView) {
  _inherits(BaseCartView, _AdminBaseView);

  function BaseCartView() {
    _classCallCheck(this, BaseCartView);

    return _possibleConstructorReturn(this, (BaseCartView.__proto__ || Object.getPrototypeOf(BaseCartView)).apply(this, arguments));
  }

  _createClass(BaseCartView, [{
    key: "mount",
    value: function mount() {
      _get(BaseCartView.prototype.__proto__ || Object.getPrototypeOf(BaseCartView.prototype), "mount", this).call(this);
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(BaseCartView.prototype.__proto__ || Object.getPrototypeOf(BaseCartView.prototype), "unmount", this).call(this);
    }
  }]);

  return BaseCartView;
}(_admin_base_view2.default);

exports.default = BaseCartView;
});

;require.register("web/static/admin/js/views/admin/cart/cart_creator.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  ordersList: $("#orders-list"),
  createOrderButton: $("#create-order"),
  userIdInput: $("#order_user_id"),

  init: function init() {
    this.bindEvents();
  },

  bindEvents: function bindEvents() {
    var _this = this;
    $('#user-list').on('change', function () {
      var userId = $(this).val();
      var userName = $(this).find(":selected").text();
      if (userId) {
        _this.fetchUsersPendingOrders(userId);
        _this.updateCreateButton(userId, userName);
      } else {
        _this.updateCreateButton("", "Guest");
        _this.userIdInput.attr("value", "");
        _this.ordersList.html("");
      }
    });

    this.createOrderButton.on('click', function () {});
  },

  fetchUsersPendingOrders: function fetchUsersPendingOrders(userId) {
    if (!userId) {
      return;
    }
    var _this = this;
    $.ajax({
      url: "/admin/users/" + userId + "/all_pending_orders",
      type: "get",
      success: function success(data) {
        _this.displayUsersOrderList(data);
      }
    });
  },

  updateCreateButton: function updateCreateButton(userId, userName) {
    this.userIdInput.attr('value', userId);
    this.createOrderButton.html("create order for " + userName);
  },

  displayUsersOrderList: function displayUsersOrderList(orders) {
    var _this2 = this;

    this.ordersList.html("");
    orders.map(function (order) {
      _this2.ordersList.append(_this2.buildOrderHtml(order));
    });
  },

  buildOrderHtml: function buildOrderHtml(order) {
    return "<li>order created on " + order.created_on + " in state: <strong>" + order.state + "</strong>,\n        click <a href=\"" + order.edit_cart_link + "\" class=\"btn btn-danger\">here</a> to continue adding products to cart.\n            Or, click <a href=\"" + order.continue_checkout_link + "\" class=\"btn btn-primary\">here</a> to continue checkout</li>";
  }
};
});

require.register("web/static/admin/js/views/admin/cart/edit_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base_cart_view = require("./base_cart_view");

var _base_cart_view2 = _interopRequireDefault(_base_cart_view);

var _order = require("./order");

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditView = function (_BaseCartView) {
  _inherits(EditView, _BaseCartView);

  function EditView() {
    _classCallCheck(this, EditView);

    return _possibleConstructorReturn(this, (EditView.__proto__ || Object.getPrototypeOf(EditView)).apply(this, arguments));
  }

  _createClass(EditView, [{
    key: "mount",
    value: function mount() {
      _get(EditView.prototype.__proto__ || Object.getPrototypeOf(EditView.prototype), "mount", this).call(this);
      var orderId = document.getElementById("order").getAttribute("data-order-id");
      _order2.default.init(parseInt(orderId, 10));
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(EditView.prototype.__proto__ || Object.getPrototypeOf(EditView.prototype), "unmount", this).call(this);
    }
  }]);

  return EditView;
}(_base_cart_view2.default);

exports.default = EditView;
});

;require.register("web/static/admin/js/views/admin/cart/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getView;

var _base_cart_view = require("./base_cart_view");

var _base_cart_view2 = _interopRequireDefault(_base_cart_view);

var _edit_view = require("./edit_view");

var _edit_view2 = _interopRequireDefault(_edit_view);

var _new_view = require("./new_view");

var _new_view2 = _interopRequireDefault(_new_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getView(actionName) {
  switch (actionName) {
    case "edit":
      return _edit_view2.default;
    case "new":
      return _new_view2.default;
    default:
      return _base_cart_view2.default;
  }
}
});

;require.register("web/static/admin/js/views/admin/cart/new_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _cart_creator = require("./cart_creator");

var _cart_creator2 = _interopRequireDefault(_cart_creator);

var _base_cart_view = require("./base_cart_view");

var _base_cart_view2 = _interopRequireDefault(_base_cart_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewView = function (_BaseCartView) {
  _inherits(NewView, _BaseCartView);

  function NewView() {
    _classCallCheck(this, NewView);

    return _possibleConstructorReturn(this, (NewView.__proto__ || Object.getPrototypeOf(NewView)).apply(this, arguments));
  }

  _createClass(NewView, [{
    key: "mount",
    value: function mount() {
      _get(NewView.prototype.__proto__ || Object.getPrototypeOf(NewView.prototype), "mount", this).call(this);
      _cart_creator2.default.init();
    }
  }]);

  return NewView;
}(_base_cart_view2.default);

exports.default = NewView;
});

;require.register("web/static/admin/js/views/admin/cart/order.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  productList: $("#product-listing"),
  cart: $("#cart"),
  error: $("p.alert.alert-danger"),

  init: function init(id) {
    this.orderId = id;
    this.bindEvents();
  },

  bindEvents: function bindEvents() {
    this.bindAddToCart();
    this.bindRemoveFromCart();
    this.bindUpdateInCartQuantity();
  },

  bindAddToCart: function bindAddToCart() {
    var _this = this;
    this.productList.on('click', '.add-to-cart', function () {
      var product = $(this).closest('.product');
      var variantId = product.find('[name=variant]').val();
      var quantity = product.find('input[name=quantity]').val();
      _this.addToCart(variantId, quantity);
    });
  },

  bindRemoveFromCart: function bindRemoveFromCart() {
    var _this = this;
    this.cart.on('click', '.remove-from-cart', function () {
      var lineItem = $(this).closest('.line-item');
      var lineItemId = lineItem.data('line-item-id');
      _this.removeFromCart(lineItemId);
    });
  },

  bindUpdateInCartQuantity: function bindUpdateInCartQuantity() {
    var _this = this;
    this.cart.on('click', '.update-cart-quantity', function () {
      var lineItem = $(this).closest('.line-item');
      var lineItemId = lineItem.data('line-item-id');
      var updatedQuantity = lineItem.find('input').val();
      _this.updateLineItem(lineItemId, updatedQuantity);
    });
  },

  addToCart: function addToCart(variantId) {
    var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var _this = this;
    $.ajax({
      url: "/admin/orders/" + this.orderId + "/line_items",
      method: 'post',
      data: {
        line_item: {
          variant_id: variantId,
          quantity: quantity
        }
      },
      beforeSend: function beforeSend() {
        _this.clearErrorMessage();
      },
      success: function success(lineItem) {
        _this.appendOrUpdateInCart(lineItem);
      },
      error: function error(data) {
        _this.setErrorMessage(data);
      }
    });
  },

  updateLineItem: function updateLineItem(lineItemId) {
    var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var _this = this;
    $.ajax({
      url: "/orders/" + this.orderId + "/line_items/" + lineItemId,
      data: {
        quantity: quantity
      },
      method: 'put',
      beforeSend: function beforeSend() {
        _this.clearErrorMessage();
      },
      success: function success(lineItem) {
        _this.appendOrUpdateInCart(lineItem);
      },
      error: function error(data) {
        _this.setErrorMessage(data);
      }
    });
  },

  removeFromCart: function removeFromCart(lineItemId) {
    var _this = this;
    $.ajax({
      url: "/admin/orders/" + this.orderId + "/line_items/" + lineItemId,
      method: 'delete',
      beforeSend: function beforeSend() {
        _this.clearErrorMessage();
      },
      success: function success(lineItem) {
        _this.removeFromCartListing(lineItemId);
      },
      error: function error(data) {
        _this.setErrorMessage(data);
      }
    });
  },

  removeFromCartListing: function removeFromCartListing(lineItemId) {
    this.cart.find("li.line-item[data-line-item-id=" + lineItemId + "]").remove();
  },

  appendOrUpdateInCart: function appendOrUpdateInCart(lineItem) {
    var existingLineItem = this.cart.find("li.line-item[data-line-item-id=" + lineItem.id + "]");
    if (existingLineItem.length > 0) {
      if (lineItem.quantity) {
        existingLineItem.replaceWith(this.makeLineItemHtml(lineItem));
      } else {
        existingLineItem.html("");
      }
    } else {
      this.cart.append(this.makeLineItemHtml(lineItem));
    }
  },

  makeLineItemHtml: function makeLineItemHtml(lineItem) {
    return "\n            <li class=\"list-group-item line-item row\" data-line-item-id=\"" + lineItem.id + "\">\n            <span class=\"col-lg-6\">" + lineItem.variant.display_name + " X " + lineItem.quantity + "</span>\n            <span class=\"col-lg-6\">\n            <button class=\"btn btn-danger btn-sm remove-from-cart pull-right\">-</button>\n            </span>\n            </li>\n        ";
  },

  setErrorMessage: function setErrorMessage(msg) {
    this.error.html(this.toErrorMessage(msg.responseJSON));
  },

  clearErrorMessage: function clearErrorMessage() {
    this.error.html("");
  },

  toErrorMessage: function toErrorMessage(response) {
    return response.errors.map(function (_ref) {
      var detail = _ref.detail,
          field = _ref.field;
      return field + ": " + detail;
    }).join("\n");
  }
};
});

require.register("web/static/admin/js/views/admin/checkout/base_checkout_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _admin_base_view = require("../../admin_base_view");

var _admin_base_view2 = _interopRequireDefault(_admin_base_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseCheckoutView = function (_AdminBaseView) {
  _inherits(BaseCheckoutView, _AdminBaseView);

  function BaseCheckoutView() {
    _classCallCheck(this, BaseCheckoutView);

    return _possibleConstructorReturn(this, (BaseCheckoutView.__proto__ || Object.getPrototypeOf(BaseCheckoutView)).apply(this, arguments));
  }

  _createClass(BaseCheckoutView, [{
    key: "mount",
    value: function mount() {
      _get(BaseCheckoutView.prototype.__proto__ || Object.getPrototypeOf(BaseCheckoutView.prototype), "mount", this).call(this);
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(BaseCheckoutView.prototype.__proto__ || Object.getPrototypeOf(BaseCheckoutView.prototype), "unmount", this).call(this);
    }
  }]);

  return BaseCheckoutView;
}(_admin_base_view2.default);

exports.default = BaseCheckoutView;
});

;require.register("web/static/admin/js/views/admin/checkout/checkout_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base_checkout_view = require("./base_checkout_view");

var _base_checkout_view2 = _interopRequireDefault(_base_checkout_view);

var _payment = require("./payment");

var _payment2 = _interopRequireDefault(_payment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckoutView = function (_BaseCheckoutView) {
  _inherits(CheckoutView, _BaseCheckoutView);

  function CheckoutView() {
    _classCallCheck(this, CheckoutView);

    return _possibleConstructorReturn(this, (CheckoutView.__proto__ || Object.getPrototypeOf(CheckoutView)).apply(this, arguments));
  }

  _createClass(CheckoutView, [{
    key: "mount",
    value: function mount() {
      _get(CheckoutView.prototype.__proto__ || Object.getPrototypeOf(CheckoutView.prototype), "mount", this).call(this);
      var state = document.getElementById('order').getAttribute('data-order-state');
      if (this[state]) {
        this[state]();
      }
    }
  }, {
    key: "tax",
    value: function tax() {
      var braintreeForm = document.getElementById('braintree');
      if (braintreeForm) {
        var braintreeClientToken = braintreeForm.getAttribute('data-client-token');
        _payment2.default.init({ braintreeClientToken: braintreeClientToken });
      }
    }
  }]);

  return CheckoutView;
}(_base_checkout_view2.default);

exports.default = CheckoutView;
});

;require.register("web/static/admin/js/views/admin/checkout/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getView;

var _base_checkout_view = require("./base_checkout_view");

var _base_checkout_view2 = _interopRequireDefault(_base_checkout_view);

var _checkout_view = require("./checkout_view");

var _checkout_view2 = _interopRequireDefault(_checkout_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getView(actionName) {
  switch (actionName) {
    case "checkout":
      return _checkout_view2.default;
    default:
      return _base_checkout_view2.default;
  }
}
});

;require.register("web/static/admin/js/views/admin/checkout/payment.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  form: $('#payment-form > form'),

  init: function init(_ref) {
    var braintreeClientToken = _ref.braintreeClientToken;

    this.initializeBrainTreeClient(braintreeClientToken);
    this.bindFormSubmissionListner();
  },

  initializeBrainTreeClient: function initializeBrainTreeClient(clientToken) {
    this.brainTreeClient = new braintree.api.Client({
      clientToken: clientToken
    });
  },

  bindFormSubmissionListner: function bindFormSubmissionListner() {
    var _this2 = this;

    this.form.submit(function (event) {
      if (_this2.isBrainTreePayment() && !_this2.noncePresent()) {
        event.preventDefault();
        _this2.tokenizeCard();
      } else {
        _this2.form.off('submit').submit();
      }
    });
  },

  tokenizeCard: function tokenizeCard() {
    var brainTreeForm = this.form.find('.payment-form[data-for=braintree]');
    var number = brainTreeForm.find('input[name="order[payment_method][braintree][card_number]"]').val();
    var expirationDate = brainTreeForm.find('select').map(function (idx, val) {
      return val.value;
    }).toArray().join("/");
    var _this = this;
    this.brainTreeClient.tokenizeCard({
      number: number, expirationDate: expirationDate
    }, function (err, nonce) {
      if (err) {
        alert(err);
        return;
      }

      var nonce_input = $("<input>").attr("type", "hidden").attr("name", "order[payment_method][braintree][nonce]").val(nonce);
      _this.form.append($(nonce_input));
      _this.form.off('submit').submit();
    });
  },

  isBrainTreePayment: function isBrainTreePayment() {
    var checked = $(this.form.find("input[type=checkbox]").filter(function (_, checkbox) {
      return checkbox.checked;
    }));
    return checked.closest('.payment-form').data('for') == 'braintree';
  },

  noncePresent: function noncePresent() {
    return !!this.form.find('input[name="order[payment_method][nonce]"]').val();
  }
};
});

require.register("web/static/admin/js/views/admin/countries/base_country_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _admin_base_view = require("../../admin_base_view");

var _admin_base_view2 = _interopRequireDefault(_admin_base_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseCountryView = function (_AdminBaseView) {
  _inherits(BaseCountryView, _AdminBaseView);

  function BaseCountryView() {
    _classCallCheck(this, BaseCountryView);

    return _possibleConstructorReturn(this, (BaseCountryView.__proto__ || Object.getPrototypeOf(BaseCountryView)).apply(this, arguments));
  }

  _createClass(BaseCountryView, [{
    key: "mount",
    value: function mount() {
      _get(BaseCountryView.prototype.__proto__ || Object.getPrototypeOf(BaseCountryView.prototype), "mount", this).call(this);
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(BaseCountryView.prototype.__proto__ || Object.getPrototypeOf(BaseCountryView.prototype), "unmount", this).call(this);
    }
  }]);

  return BaseCountryView;
}(_admin_base_view2.default);

exports.default = BaseCountryView;
});

;require.register("web/static/admin/js/views/admin/countries/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getView;

var _base_country_view = require("./base_country_view");

var _base_country_view2 = _interopRequireDefault(_base_country_view);

var _show_view = require("./show_view");

var _show_view2 = _interopRequireDefault(_show_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getView(actionName) {
  switch (actionName) {
    case "show":
      return _show_view2.default;
    default:
      return _base_country_view2.default;
  }
}
});

;require.register("web/static/admin/js/views/admin/countries/show_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base_country_view = require("./base_country_view");

var _base_country_view2 = _interopRequireDefault(_base_country_view);

var _state = require("./state");

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowView = function (_BaseCountryView) {
  _inherits(ShowView, _BaseCountryView);

  function ShowView() {
    _classCallCheck(this, ShowView);

    return _possibleConstructorReturn(this, (ShowView.__proto__ || Object.getPrototypeOf(ShowView)).apply(this, arguments));
  }

  _createClass(ShowView, [{
    key: "mount",
    value: function mount() {
      _get(ShowView.prototype.__proto__ || Object.getPrototypeOf(ShowView.prototype), "mount", this).call(this);
      var countryId = document.getElementById("country").getAttribute("data-country-id");
      _state2.default.init(parseInt(countryId, 10));
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(ShowView.prototype.__proto__ || Object.getPrototypeOf(ShowView.prototype), "unmount", this).call(this);
    }
  }]);

  return ShowView;
}(_base_country_view2.default);

exports.default = ShowView;
});

;require.register("web/static/admin/js/views/admin/countries/state.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  addButton: $("#add"),
  stateList: $("#state-list"),
  stateForm: $("#state-form"),

  init: function init(countryId) {
    this.countryId = countryId;
    this.bindEvents();
  },

  bindEvents: function bindEvents() {
    var _this2 = this;

    this.addButton.on('click', function () {
      _this2.addNewState();
    });
    var _this = this;
    this.stateList.on('click', '.delete', function () {
      var state_id = $(this).closest('tr').data("state-id");
      _this.deleteState(state_id);
    });
  },

  addNewState: function addNewState() {
    var data = {
      state: {
        name: this.stateForm.find("input[name=name]").val(),
        abbr: this.stateForm.find("input[name=abbr]").val()
      }
    };
    var _this = this;
    $.ajax({
      url: "/admin/countries/" + _this.countryId + "/states",
      type: "post",
      dataType: "json",
      data: data,
      beforeSend: function beforeSend() {
        _this.clearErrors();
      },
      success: function success(data) {
        _this.addToStateList(data);
      },
      error: function error(data) {
        _this.renderErrors(data);
      }
    });
  },

  renderErrors: function renderErrors(data) {
    var _this3 = this;

    var errors = data.responseJSON.errors;
    errors.forEach(function (_ref) {
      var detail = _ref.detail,
          field = _ref.field;

      _this3.stateForm.find("input[name=" + field + "]").after("<span class='danger error'>" + detail + "</span>");
    });
  },
  clearErrors: function clearErrors() {
    this.stateForm.find('.error').remove();
  },

  deleteState: function deleteState(state_id) {
    var _this = this;
    $.ajax({
      url: "/admin/countries/" + _this.countryId + "/states/" + state_id,
      type: "delete",
      success: function success(data) {
        _this.removeFromStateList(state_id);
      }
    });
  },

  addToStateList: function addToStateList(state) {
    var html = "<tr data-state-id=" + state["id"] + ">\n          <td>" + state["name"] + "</td>\n          <td>" + state["abbr"] + "</td>\n          <td><button class=\"delete btn btn-danger\">X</button></td>\n          </tr>";
    this.stateList.append(html);
  },

  removeFromStateList: function removeFromStateList(state_id) {
    this.stateList.find("[data-state-id=" + state_id + "]").remove();
  }

};
});

require.register("web/static/admin/js/views/admin/option_types/base_option_type_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _admin_base_view = require("../../admin_base_view");

var _admin_base_view2 = _interopRequireDefault(_admin_base_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseOptionTypeView = function (_AdminBaseView) {
  _inherits(BaseOptionTypeView, _AdminBaseView);

  function BaseOptionTypeView() {
    _classCallCheck(this, BaseOptionTypeView);

    return _possibleConstructorReturn(this, (BaseOptionTypeView.__proto__ || Object.getPrototypeOf(BaseOptionTypeView)).apply(this, arguments));
  }

  _createClass(BaseOptionTypeView, [{
    key: "mount",
    value: function mount() {
      _get(BaseOptionTypeView.prototype.__proto__ || Object.getPrototypeOf(BaseOptionTypeView.prototype), "mount", this).call(this);
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(BaseOptionTypeView.prototype.__proto__ || Object.getPrototypeOf(BaseOptionTypeView.prototype), "unmount", this).call(this);
    }
  }]);

  return BaseOptionTypeView;
}(_admin_base_view2.default);

exports.default = BaseOptionTypeView;
});

;require.register("web/static/admin/js/views/admin/option_types/edit_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base_option_type_view = require("./base_option_type_view");

var _base_option_type_view2 = _interopRequireDefault(_base_option_type_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditView = function (_BaseOptionTypeView) {
  _inherits(EditView, _BaseOptionTypeView);

  function EditView() {
    _classCallCheck(this, EditView);

    return _possibleConstructorReturn(this, (EditView.__proto__ || Object.getPrototypeOf(EditView)).apply(this, arguments));
  }

  _createClass(EditView, [{
    key: "mount",
    value: function mount() {
      _get(EditView.prototype.__proto__ || Object.getPrototypeOf(EditView.prototype), "mount", this).call(this);
      this.handleAdd();
      this.handleDelete();
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(EditView.prototype.__proto__ || Object.getPrototypeOf(EditView.prototype), "unmount", this).call(this);
    }
  }, {
    key: "handleAdd",
    value: function handleAdd() {
      $(document).on("click", "#add_option_value, #add_product_option_type, #add_category, #add_product_category, #add_product_image", function (e) {
        e.preventDefault();
        var time = new Date().getTime();
        var template = $(this).data("template");
        var uniq_template = template.replace(/\[0\]/g, "[" + time + "]");
        uniq_template = uniq_template.replace(/_0_/g, "_" + time + "_");
        $(this).after(uniq_template);
      });
    }
  }, {
    key: "handleDelete",
    value: function handleDelete() {
      $(document).on("click", "#delete_option_value, #delete_product_option_type, #delete_category, #delete_product_category,  #delete_product_image", function (e) {
        e.preventDefault();
        $(this).parent().remove();
      });
    }
  }]);

  return EditView;
}(_base_option_type_view2.default);

exports.default = EditView;
});

;require.register("web/static/admin/js/views/admin/option_types/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getView;

var _base_option_type_view = require("./base_option_type_view");

var _base_option_type_view2 = _interopRequireDefault(_base_option_type_view);

var _edit_view = require("./edit_view");

var _edit_view2 = _interopRequireDefault(_edit_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getView(actionName) {
  switch (actionName) {
    case "edit":
      return _edit_view2.default;
    case "new":
      return _edit_view2.default;
    default:
      return _base_option_type_view2.default;
  }
}
});

;require.register("web/static/admin/js/views/admin/orders/base_order_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _admin_base_view = require("../../admin_base_view");

var _admin_base_view2 = _interopRequireDefault(_admin_base_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseOrderView = function (_AdminBaseView) {
  _inherits(BaseOrderView, _AdminBaseView);

  function BaseOrderView() {
    _classCallCheck(this, BaseOrderView);

    return _possibleConstructorReturn(this, (BaseOrderView.__proto__ || Object.getPrototypeOf(BaseOrderView)).apply(this, arguments));
  }

  _createClass(BaseOrderView, [{
    key: "mount",
    value: function mount() {
      _get(BaseOrderView.prototype.__proto__ || Object.getPrototypeOf(BaseOrderView.prototype), "mount", this).call(this);
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(BaseOrderView.prototype.__proto__ || Object.getPrototypeOf(BaseOrderView.prototype), "unmount", this).call(this);
    }
  }]);

  return BaseOrderView;
}(_admin_base_view2.default);

exports.default = BaseOrderView;
});

;require.register("web/static/admin/js/views/admin/orders/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getView;

var _base_order_view = require("./base_order_view");

var _base_order_view2 = _interopRequireDefault(_base_order_view);

var _show_view = require("./show_view");

var _show_view2 = _interopRequireDefault(_show_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getView(actionName) {
  switch (actionName) {
    case "show":
      return _show_view2.default;
    default:
      return _base_order_view2.default;
  }
}
});

;require.register("web/static/admin/js/views/admin/orders/order_show.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  lineItems: $("#line_items"),
  error: $("p.alert.alert-danger"),

  init: function init(id) {
    this.orderId = id;
    this.bindEvents();
  },

  bindEvents: function bindEvents() {
    this.bindFullfillmentToggle();
  },

  bindFullfillmentToggle: function bindFullfillmentToggle() {
    var _this = this;
    this.lineItems.on('change', '.fullfillment', function () {
      var checkbox = $(this);
      var fullfilled = checkbox.checked;
      var lineItemId = checkbox.data('line-item-id');
      _this.updateFullfillment(lineItemId, fullfilled);
    });
  },

  updateFullfillment: function updateFullfillment(lineItemId, fullfilled) {
    var _this = this;
    $.ajax({
      url: "/admin/orders/" + this.orderId + "/line_items/" + lineItemId + "/update_fullfillment",
      data: {
        line_item: {
          fullfilled: fullfilled
        }
      },
      contentType: "application/json",
      method: 'put',
      success: function success() {
        _this.removeCheckbox(lineItemId);
      },
      error: function error(data) {
        _this.displayErrorNotification(data);
        _this.recheckLineItem(lineItemId);
      }
    });
  },

  displayErrorNotification: function displayErrorNotification(msg) {
    this.error.html(this.toErrorMessage(msg.responseJSON));
  },

  toErrorMessage: function toErrorMessage(response) {
    return response.errors.map(function (_ref) {
      var detail = _ref.detail,
          field = _ref.field;
      return field + ": " + detail;
    }).join("\n");
  },

  removeCheckbox: function removeCheckbox(lineItemId) {
    this.lineItems.find(".fullfillment[data-line-item-id=" + lineItemId + "]").replaceWith("<strong>cancelled</strong>");
  },
  recheckLineItem: function recheckLineItem(lineItemId) {
    this.lineItems.find(".fullfillment[data-line-item-id=" + lineItemId + "]")[0].checked = true;
  }
};
});

;require.register("web/static/admin/js/views/admin/orders/show_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _order_show = require("./order_show");

var _order_show2 = _interopRequireDefault(_order_show);

var _base_order_view = require("./base_order_view");

var _base_order_view2 = _interopRequireDefault(_base_order_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowView = function (_BaseOrderView) {
  _inherits(ShowView, _BaseOrderView);

  function ShowView() {
    _classCallCheck(this, ShowView);

    return _possibleConstructorReturn(this, (ShowView.__proto__ || Object.getPrototypeOf(ShowView)).apply(this, arguments));
  }

  _createClass(ShowView, [{
    key: "mount",
    value: function mount() {
      _get(ShowView.prototype.__proto__ || Object.getPrototypeOf(ShowView.prototype), "mount", this).call(this);
      var orderId = document.getElementById("order").getAttribute("data-order-id");
      _order_show2.default.init(parseInt(orderId, 10));
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(ShowView.prototype.__proto__ || Object.getPrototypeOf(ShowView.prototype), "unmount", this).call(this);
    }
  }]);

  return ShowView;
}(_base_order_view2.default);

exports.default = ShowView;
});

;require.register("web/static/admin/js/views/admin/products/base_product_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _admin_base_view = require("../../admin_base_view");

var _admin_base_view2 = _interopRequireDefault(_admin_base_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseProductView = function (_AdminBaseView) {
  _inherits(BaseProductView, _AdminBaseView);

  function BaseProductView() {
    _classCallCheck(this, BaseProductView);

    return _possibleConstructorReturn(this, (BaseProductView.__proto__ || Object.getPrototypeOf(BaseProductView)).apply(this, arguments));
  }

  _createClass(BaseProductView, [{
    key: "mount",
    value: function mount() {
      _get(BaseProductView.prototype.__proto__ || Object.getPrototypeOf(BaseProductView.prototype), "mount", this).call(this);
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(BaseProductView.prototype.__proto__ || Object.getPrototypeOf(BaseProductView.prototype), "unmount", this).call(this);
    }
  }]);

  return BaseProductView;
}(_admin_base_view2.default);

exports.default = BaseProductView;
});

;require.register("web/static/admin/js/views/admin/products/edit_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base_product_view = require("./base_product_view");

var _base_product_view2 = _interopRequireDefault(_base_product_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditView = function (_BaseProductView) {
  _inherits(EditView, _BaseProductView);

  function EditView() {
    _classCallCheck(this, EditView);

    return _possibleConstructorReturn(this, (EditView.__proto__ || Object.getPrototypeOf(EditView)).apply(this, arguments));
  }

  _createClass(EditView, [{
    key: "mount",
    value: function mount() {
      _get(EditView.prototype.__proto__ || Object.getPrototypeOf(EditView.prototype), "mount", this).call(this);
      this.initTinymce();
      this.handleAdd();
      this.handleDelete();
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(EditView.prototype.__proto__ || Object.getPrototypeOf(EditView.prototype), "unmount", this).call(this);
    }
  }, {
    key: "initTinymce",
    value: function initTinymce() {
      tinymce.init({
        selector: '#product-description',
        plugins: "textcolor image",
        toolbar: "forecolor backcolor",
        textcolor_map: ["000000", "Black", "993300", "Burnt orange", "333300", "Dark olive", "003300", "Dark green", "003366", "Dark azure", "000080", "Navy Blue", "333399", "Indigo", "333333", "Very dark gray", "800000", "Maroon", "FF6600", "Orange", "808000", "Olive", "008000", "Green", "008080", "Teal", "0000FF", "Blue", "666699", "Grayish blue", "808080", "Gray", "FF0000", "Red", "FF9900", "Amber", "99CC00", "Yellow green", "339966", "Sea green", "33CCCC", "Turquoise", "3366FF", "Royal blue", "800080", "Purple", "999999", "Medium gray", "FF00FF", "Magenta", "FFCC00", "Gold", "FFFF00", "Yellow", "00FF00", "Lime", "00FFFF", "Aqua", "00CCFF", "Sky blue", "993366", "Red violet", "FFFFFF", "White", "FF99CC", "Pink", "FFCC99", "Peach", "FFFF99", "Light yellow", "CCFFCC", "Pale green", "CCFFFF", "Pale cyan", "99CCFF", "Light sky blue", "CC99FF", "Plum"],
        images_upload_handler: function images_upload_handler(blobInfo, success, failure) {
          var xhr, formData;
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open('POST', '/admin_api/contentimage');
          xhr.onload = function () {
            var json;

            if (xhr.status != 200) {
              failure('HTTP Error: ' + xhr.status);
              return;
            }
            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.location != 'string') {
              failure('Invalid JSON: ' + xhr.responseText);
              return;
            }
            success(json.location);
          };
          formData = new FormData();
          formData.append('file', blobInfo.blob());
          formData.append('id', $("#product_id").val());
          xhr.send(formData);
        }
      });
    }
  }, {
    key: "handleAdd",
    value: function handleAdd() {
      $(document).on("click", "#add_option_value, #add_product_option_type, #add_category, #add_product_category, #add_product_image", function (e) {
        e.preventDefault();
        var time = new Date().getTime();
        var template = $(this).data("template");
        var uniq_template = template.replace(/\[0\]/g, "[" + time + "]");
        uniq_template = uniq_template.replace(/_0_/g, "_" + time + "_");
        $(this).after(uniq_template);
      });
    }
  }, {
    key: "handleDelete",
    value: function handleDelete() {
      $(document).on("click", "#delete_option_value, #delete_product_option_type, #delete_category, #delete_product_category, #delete_product_image", function (e) {
        e.preventDefault();
        $(this).parent().remove();
      });
    }
  }]);

  return EditView;
}(_base_product_view2.default);

exports.default = EditView;
});

;require.register("web/static/admin/js/views/admin/products/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getView;

var _base_product_view = require("./base_product_view");

var _base_product_view2 = _interopRequireDefault(_base_product_view);

var _edit_view = require("./edit_view");

var _edit_view2 = _interopRequireDefault(_edit_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getView(actionName) {
  switch (actionName) {
    case "edit":
      return _edit_view2.default;
    case "new":
      return _edit_view2.default;
    case "new_single":
      return _edit_view2.default;
    default:
      return _base_product_view2.default;
  }
}
});

;require.register("web/static/admin/js/views/admin/zones/base_zone_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _admin_base_view = require("../../admin_base_view");

var _admin_base_view2 = _interopRequireDefault(_admin_base_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseZoneView = function (_AdminBaseView) {
  _inherits(BaseZoneView, _AdminBaseView);

  function BaseZoneView() {
    _classCallCheck(this, BaseZoneView);

    return _possibleConstructorReturn(this, (BaseZoneView.__proto__ || Object.getPrototypeOf(BaseZoneView)).apply(this, arguments));
  }

  _createClass(BaseZoneView, [{
    key: "mount",
    value: function mount() {
      _get(BaseZoneView.prototype.__proto__ || Object.getPrototypeOf(BaseZoneView.prototype), "mount", this).call(this);
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(BaseZoneView.prototype.__proto__ || Object.getPrototypeOf(BaseZoneView.prototype), "unmount", this).call(this);
    }
  }]);

  return BaseZoneView;
}(_admin_base_view2.default);

exports.default = BaseZoneView;
});

;require.register("web/static/admin/js/views/admin/zones/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getView;

var _base_zone_view = require("./base_zone_view");

var _base_zone_view2 = _interopRequireDefault(_base_zone_view);

var _show_view = require("./show_view");

var _show_view2 = _interopRequireDefault(_show_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getView(actionName) {
  switch (actionName) {
    case "show":
      return _show_view2.default;
    default:
      return _base_zone_view2.default;
  }
}
});

;require.register("web/static/admin/js/views/admin/zones/show_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base_zone_view = require("./base_zone_view");

var _base_zone_view2 = _interopRequireDefault(_base_zone_view);

var _zone = require("./zone");

var _zone2 = _interopRequireDefault(_zone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowView = function (_BaseZoneView) {
  _inherits(ShowView, _BaseZoneView);

  function ShowView() {
    _classCallCheck(this, ShowView);

    return _possibleConstructorReturn(this, (ShowView.__proto__ || Object.getPrototypeOf(ShowView)).apply(this, arguments));
  }

  _createClass(ShowView, [{
    key: "mount",
    value: function mount() {
      _get(ShowView.prototype.__proto__ || Object.getPrototypeOf(ShowView.prototype), "mount", this).call(this);
      var zoneId = document.getElementById("zone").getAttribute("data-zone-id");
      _zone2.default.init(parseInt(zoneId, 10));
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(ShowView.prototype.__proto__ || Object.getPrototypeOf(ShowView.prototype), "unmount", this).call(this);
    }
  }]);

  return ShowView;
}(_base_zone_view2.default);

exports.default = ShowView;
});

;require.register("web/static/admin/js/views/admin/zones/zone.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  addButton: $("#add"),
  selection: $("#zoneable-select"),
  zoneableList: $("#zoneable-list"),

  init: function init(zoneId) {
    this.bindEvents();
    this.zoneId = zoneId;
  },

  bindEvents: function bindEvents() {
    var _this2 = this;

    this.addButton.on('click', function () {
      var zoneable_id = _this2.selection.val();
      _this2.addNewZoneMember(zoneable_id);
    });
    var _this = this;
    this.zoneableList.on('click', '.delete', function () {
      var zoneable_id = $(this).parent().data("zoneable-id");
      _this.deleteZoneMember(zoneable_id);
    });
  },

  addNewZoneMember: function addNewZoneMember(zoneable_id) {
    var data = {
      zone_member: {
        zoneable_id: zoneable_id
      }
    };
    var _this = this;
    $.ajax({
      url: "/admin/zones/" + _this.zoneId + "/members",
      type: "post",
      dataType: "json",
      data: data,
      success: function success(data) {
        _this.addToZoneableList(data);
        _this.removeFromZoneableOption(zoneable_id);
      }
    });
  },

  deleteZoneMember: function deleteZoneMember(zoneable_id) {
    var _this = this;
    $.ajax({
      url: "/admin/zones/" + _this.zoneId + "/members/" + zoneable_id,
      type: "delete",
      success: function success(data) {
        _this.removeFromZoneableList(zoneable_id);
        _this.addToZoneableOption(data);
      }
    });
  },

  removeFromZoneableOption: function removeFromZoneableOption(zoneable_id) {
    $("option[value=" + zoneable_id + "]").remove();
  },

  addToZoneableOption: function addToZoneableOption(zoneable) {
    var zoneable_html = "<option value=" + zoneable["id"] + ">" + zoneable["name"] + "</option>";
    this.selection.append(zoneable_html);
  },

  addToZoneableList: function addToZoneableList(zoneable) {
    var html = "<li data-zoneable-id=" + zoneable["id"] + " class=\"list-group-item\">" + zoneable["name"] + "<button class=\"delete pull-right\">X</button></li>";
    this.zoneableList.append(html);
  },

  removeFromZoneableList: function removeFromZoneableList(zoneable_id) {
    this.zoneableList.find("[data-zoneable-id=" + zoneable_id + "]").remove();
  }

};
});

require.register("web/static/admin/js/views/admin_base_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ajax_setup = require("../lib/ajax_setup");

var _ajax_setup2 = _interopRequireDefault(_ajax_setup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminBaseView = function () {
  function AdminBaseView() {
    _classCallCheck(this, AdminBaseView);
  }

  _createClass(AdminBaseView, [{
    key: "mount",
    value: function mount() {
      _ajax_setup2.default.setup();
    }
  }, {
    key: "unmount",
    value: function unmount() {}
  }]);

  return AdminBaseView;
}();

exports.default = AdminBaseView;
});

;require.register("web/static/admin/js/views/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = viewToRender;

var _admin_base_view = require("./admin_base_view");

var _admin_base_view2 = _interopRequireDefault(_admin_base_view);

var _countries = require("./admin/countries");

var _countries2 = _interopRequireDefault(_countries);

var _orders = require("./admin/orders");

var _orders2 = _interopRequireDefault(_orders);

var _cart = require("./admin/cart");

var _cart2 = _interopRequireDefault(_cart);

var _zones = require("./admin/zones");

var _zones2 = _interopRequireDefault(_zones);

var _checkout = require("./admin/checkout");

var _checkout2 = _interopRequireDefault(_checkout);

var _products = require("./admin/products");

var _products2 = _interopRequireDefault(_products);

var _option_types = require("./admin/option_types");

var _option_types2 = _interopRequireDefault(_option_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// add all the views here.
var views = {
  AdminCountryView: _countries2.default,
  AdminOrderView: _orders2.default,
  AdminCartView: _cart2.default,
  AdminZoneView: _zones2.default,
  AdminCheckoutView: _checkout2.default,
  AdminProductView: _products2.default,
  AdminOptionTypeView: _option_types2.default
};

function viewToRender(view) {
  var viewLookUp = view.split(".");
  var actionName = viewLookUp.pop();
  var viewName = viewLookUp.join("");
  var actionLookup = views[viewName];

  if (actionLookup) {
    return actionLookup(actionName);
  } else {
    if (viewLookUp[0] == 'Admin') {
      return _admin_base_view2.default;
    } else {
      return BaseView;
    }
  }
}
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('web/static/admin/js/admin');
//# sourceMappingURL=admin.js.map