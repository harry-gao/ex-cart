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
require.register("web/static/client/js/actions/cart.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Actions = {
  fetchCurrentCartSummary: function fetchCurrentCartSummary(callback) {
    return function (dispatch) {
      dispatch({ type: _constants2.default.FETCHING_CART_SUMMARY });

      (0, _utils.httpGet)('/api/cart?summary=true').then(function (data) {
        dispatch({
          type: _constants2.default.CART_SUMMARY_RECEIVED,
          cart_summary: data
        });
      }).then(function (data) {
        callback();
      });
    };
  }
};

exports.default = Actions;
});

require.register("web/static/client/js/actions/cart_notification.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require("../constants");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Actions = {
  sendCartNotification: function sendCartNotification(msg) {
    return function (dispatch) {
      dispatch({ type: _constants2.default.CART_NOTIFICATION_RECEIVED,
        notification_message: msg });
    };
  },

  clearCartNotification: function clearCartNotification(index) {
    return function (dispatch) {
      dispatch({ type: _constants2.default.CART_NOTIFICATION_CLEARED, notification_index: index });
    };
  }

};

exports.default = Actions;
});

require.register("web/static/client/js/actions/product.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Actions = {
  getProductListing: function getProductListing() {
    return function (dispatch) {
      dispatch({ type: _constants2.default.FETCHING_PRODUCTS });

      (0, _utils.httpGet)('/products').then(function (data) {
        dispatch({
          type: _constants2.default.PRODUCTS_RECEIVED,
          products: data.products
        });
      });
    };
  }
};

exports.default = Actions;
});

require.register("web/static/client/js/app.js", function(exports, require, module) {
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

require.register("web/static/client/js/components/cart_modal.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactBootstrap = require("react-bootstrap");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _stacked_alerts = require("./stacked_alerts");

var _stacked_alerts2 = _interopRequireDefault(_stacked_alerts);

var _cart_notification = require("../actions/cart_notification");

var _cart_notification2 = _interopRequireDefault(_cart_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CartModal = function (_React$Component) {
  _inherits(CartModal, _React$Component);

  function CartModal() {
    _classCallCheck(this, CartModal);

    var _this = _possibleConstructorReturn(this, (CartModal.__proto__ || Object.getPrototypeOf(CartModal)).call(this));

    _this.clearAlert = _this.clearAlert.bind(_this);
    return _this;
  }

  _createClass(CartModal, [{
    key: "clearAlert",
    value: function clearAlert(index) {
      this.props.dispatch(_cart_notification2.default.clearCartNotification(index));
    }
  }, {
    key: "render",
    value: function render() {
      var tableBody = this.props.lineItems.map(function (lItem, idx) {
        return _react2.default.createElement(
          "tr",
          { key: idx },
          _react2.default.createElement(
            "td",
            null,
            _react2.default.createElement(
              "a",
              { href: lItem.path },
              lItem.name
            )
          ),
          _react2.default.createElement(
            "td",
            null,
            lItem.quantity
          ),
          _react2.default.createElement(
            "td",
            null,
            lItem.total
          )
        );
      });

      var tableStyle = { width: "100%" };

      return _react2.default.createElement(
        _reactBootstrap.Modal,
        { show: this.props.show, onHide: this.props.onHide, title: "cart", bsStyle: "container" },
        _react2.default.createElement(
          "div",
          { className: "cart-contents" },
          _react2.default.createElement(
            "h5",
            null,
            "Your cart contents"
          ),
          _react2.default.createElement(_stacked_alerts2.default, { alerts: this.props.cartNotifications.notifications, clear: this.clearAlert }),
          _react2.default.createElement(
            "table",
            { className: "table table-responsive", style: tableStyle },
            _react2.default.createElement(
              "thead",
              null,
              _react2.default.createElement(
                "tr",
                null,
                _react2.default.createElement(
                  "th",
                  null,
                  "Product"
                ),
                _react2.default.createElement(
                  "th",
                  null,
                  "Quantity"
                ),
                _react2.default.createElement(
                  "th",
                  null,
                  "Cost"
                )
              )
            ),
            _react2.default.createElement(
              "tbody",
              null,
              tableBody
            )
          ),
          _react2.default.createElement(
            "a",
            { href: this.props.cartLink },
            "Go To My Cart"
          )
        )
      );
    }
  }]);

  return CartModal;
}(_react2.default.Component);

exports.default = CartModal;
});

;require.register("web/static/client/js/components/cart_notification.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CartNotification = function (_React$Component) {
  _inherits(CartNotification, _React$Component);

  function CartNotification() {
    _classCallCheck(this, CartNotification);

    return _possibleConstructorReturn(this, (CartNotification.__proto__ || Object.getPrototypeOf(CartNotification)).apply(this, arguments));
  }

  _createClass(CartNotification, [{
    key: "render",
    value: function render() {
      var cartNotifyMessage = this.props.notification_message;
      if (cartNotifyMessage && cartNotifyMessage != "") {
        return _react2.default.createElement(
          "div",
          { className: "cart_notification active alert" },
          cartNotifyMessage
        );
      } else {
        // return inactive cart notification if no message present
        return _react2.default.createElement("div", { className: "cart_notification inactive" });
      }
    }
  }]);

  return CartNotification;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return state.cart_notification;
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(CartNotification);
});

require.register("web/static/client/js/components/dismissable_alert.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DismissableAlert = function (_React$Component) {
  _inherits(DismissableAlert, _React$Component);

  function DismissableAlert() {
    _classCallCheck(this, DismissableAlert);

    return _possibleConstructorReturn(this, (DismissableAlert.__proto__ || Object.getPrototypeOf(DismissableAlert)).apply(this, arguments));
  }

  _createClass(DismissableAlert, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "alert alert-danger" },
        _react2.default.createElement(
          "a",
          { href: "#", "class": "close", title: "close", onClick: this.props.dismiss },
          "\xD7"
        ),
        _react2.default.createElement(
          "span",
          null,
          this.props.message
        )
      );
    }
  }]);

  return DismissableAlert;
}(_react2.default.Component);

exports.default = DismissableAlert;
});

;require.register("web/static/client/js/components/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductListing = exports.MiniCart = exports.CartNotification = undefined;

var _cart_notification = require("./cart_notification");

var _cart_notification2 = _interopRequireDefault(_cart_notification);

var _mini_cart = require("./mini_cart");

var _mini_cart2 = _interopRequireDefault(_mini_cart);

var _product_listing = require("./product_listing");

var _product_listing2 = _interopRequireDefault(_product_listing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.CartNotification = _cart_notification2.default;
exports.MiniCart = _mini_cart2.default;
exports.ProductListing = _product_listing2.default;
});

require.register("web/static/client/js/components/mini_cart.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _cart_modal = require("./cart_modal");

var _cart_modal2 = _interopRequireDefault(_cart_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MiniCart = function (_React$Component) {
  _inherits(MiniCart, _React$Component);

  function MiniCart() {
    _classCallCheck(this, MiniCart);

    var _this = _possibleConstructorReturn(this, (MiniCart.__proto__ || Object.getPrototypeOf(MiniCart)).call(this));

    _this.state = { showModal: false };
    _this.onClick = _this.onClick.bind(_this);
    _this.onHide = _this.onHide.bind(_this);
    return _this;
  }

  _createClass(MiniCart, [{
    key: "onClick",
    value: function onClick() {
      this.setState({ showModal: true });
    }
  }, {
    key: "onHide",
    value: function onHide() {
      this.setState({ showModal: false });
    }
  }, {
    key: "render",
    value: function render() {
      var cart_link = "" + this.props.cart.cart_link;
      var modal = _react2.default.createElement(_cart_modal2.default, { onHide: this.onHide,
        cartNotifications: this.props.cart_notifications,
        lineItems: this.props.cart.cart_summary.line_items,
        cartLink: this.props.cart.cart_link,
        show: this.state.showModal,
        dispatch: this.props.dispatch });
      var badgeClasses = "btn-primary";
      if (this.props.cart_notifications.notifications.length > 0) {
        badgeClasses = "shake btn-danger";
      }
      var mini_cart = _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "a",
          { type: "button", className: badgeClasses + " btn btn-default btn-sm", onClick: this.onClick },
          "Cart ",
          _react2.default.createElement(
            "span",
            { className: "badge" },
            this.props.cart.cart_summary.items_in_cart
          )
        ),
        modal
      );
      return mini_cart;
    }
  }]);

  return MiniCart;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return state.mini_cart;
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MiniCart);
});

require.register("web/static/client/js/components/product.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Product = function (_React$Component) {
  _inherits(Product, _React$Component);

  function Product() {
    _classCallCheck(this, Product);

    return _possibleConstructorReturn(this, (Product.__proto__ || Object.getPrototypeOf(Product)).apply(this, arguments));
  }

  _createClass(Product, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "panel-group col-lg-3" },
        _react2.default.createElement(
          "div",
          { className: "panel panel-default" },
          _react2.default.createElement(
            "div",
            { className: "panel-body" },
            this.props.product.name
          ),
          _react2.default.createElement(
            "div",
            { className: "panel-body" },
            _react2.default.createElement(
              "a",
              { href: this.props.product.link },
              _react2.default.createElement("img", { src: this.props.product.thumbnail, title: this.props.product.name })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "panel-footer" },
            _react2.default.createElement(
              "span",
              null,
              this.props.product.cost_price
            )
          )
        )
      );
    }
  }]);

  return Product;
}(_react2.default.Component);

exports.default = Product;
});

require.register("web/static/client/js/components/product_listing.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _product = require("./product");

var _product2 = _interopRequireDefault(_product);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductListing = function (_React$Component) {
  _inherits(ProductListing, _React$Component);

  function ProductListing() {
    _classCallCheck(this, ProductListing);

    return _possibleConstructorReturn(this, (ProductListing.__proto__ || Object.getPrototypeOf(ProductListing)).apply(this, arguments));
  }

  _createClass(ProductListing, [{
    key: "render",
    value: function render() {
      var products = this.props.products.map(function (product, idx) {
        return _react2.default.createElement(_product2.default, { product: product, key: idx });
      });

      return _react2.default.createElement(
        "div",
        { className: "row" },
        _react2.default.createElement(
          "div",
          { className: "col-md-12" },
          products
        )
      );
    }
  }]);

  return ProductListing;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return state.products;
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ProductListing);
});

require.register("web/static/client/js/components/stacked_alerts.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _dismissable_alert = require("./dismissable_alert");

var _dismissable_alert2 = _interopRequireDefault(_dismissable_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StackedAlerts = function (_React$Component) {
  _inherits(StackedAlerts, _React$Component);

  function StackedAlerts() {
    _classCallCheck(this, StackedAlerts);

    return _possibleConstructorReturn(this, (StackedAlerts.__proto__ || Object.getPrototypeOf(StackedAlerts)).apply(this, arguments));
  }

  _createClass(StackedAlerts, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var alerts = this.props.alerts.map(function (alert, idx) {
        return _react2.default.createElement(_dismissable_alert2.default, {
          message: alert.message,
          key: idx,
          index: idx,
          dismiss: _this2.props.clear.bind(_this2, idx) });
      });
      return _react2.default.createElement(
        "div",
        null,
        alerts
      );
    }
  }]);

  return StackedAlerts;
}(_react2.default.Component);

exports.default = StackedAlerts;
});

;require.register("web/static/client/js/constants/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Constants = {
  FETCHING_CART_SUMMARY: 'FETCHING_CART_SUMMARY',
  CART_SUMMARY_RECEIVED: 'CART_SUMMARY_RECEIVED',
  FETCHING_PRODUCTS: 'FETCHING_PRODUCTS',
  PRODUCTS_RECEIVED: 'PRODUCTS_RECEIVED',
  CART_NOTIFICATION_RECEIVED: 'CART_NOTIFICATION_RECEIVED',
  CART_NOTIFICATION_CLEARED: 'CART_NOTIFICATION_CLEARED'
};
exports.default = Constants;
});

require.register("web/static/client/js/lib/ajax_setup.js", function(exports, require, module) {
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

require.register("web/static/client/js/listeners/cart_notification_listener.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cart_notification = require("../actions/cart_notification");

var _cart_notification2 = _interopRequireDefault(_cart_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CartNotificationListener = function () {
  function CartNotificationListener(socket, store, options) {
    _classCallCheck(this, CartNotificationListener);

    this.store = store;
    this.socket = socket;
    this.channel = socket.channel("cart:" + options["cart_id"], {});
    this.channel.join();
    this.channel.on("new_notification", this.dispatchCartNotification.bind(this));
  }

  _createClass(CartNotificationListener, [{
    key: "dispatchCartNotification",
    value: function dispatchCartNotification(_ref) {
      var msg = _ref.msg;

      this.store.dispatch(_cart_notification2.default.sendCartNotification(msg));
    }
  }]);

  return CartNotificationListener;
}();

exports.default = CartNotificationListener;
});

;require.register("web/static/client/js/reducers/cart.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cart = document.getElementById('cart');
var cart_link = cart ? cart.getAttribute('data-cart-link') : "";
var initialState = {
  cart_summary: { items_in_cart: 0, id: -1, line_items: [] },
  fetching: true,
  cart_link: cart_link
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _constants2.default.FETCHING_CART_SUMMARY:
      return _extends({}, state, { fetching: true });
    case _constants2.default.CART_SUMMARY_RECEIVED:
      return _extends({}, state, { cart_summary: action.cart_summary, fetching: false });
    default:
      return state;
  }
}
});

;require.register("web/static/client/js/reducers/cart_notification.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _constants = require("../constants");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
  notifications: []
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _constants2.default.CART_NOTIFICATION_RECEIVED:
      return _extends({}, state, { notifications: [].concat(_toConsumableArray(state.notifications), [{ message: action.notification_message }]) });
    case _constants2.default.CART_NOTIFICATION_CLEARED:
      return _extends({}, state, { notifications: [].concat(_toConsumableArray(state.notifications.slice(0, action.notification_index)), _toConsumableArray(state.notifications.slice(action.notification_index + 1))) });
    default:
      return state;
  }
}
});

;require.register("web/static/client/js/reducers/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _cart = require('./cart');

var _cart2 = _interopRequireDefault(_cart);

var _cart_notification = require('./cart_notification');

var _cart_notification2 = _interopRequireDefault(_cart_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mini_cart = (0, _redux.combineReducers)({ cart: _cart2.default, cart_notifications: _cart_notification2.default });
exports.default = (0, _redux.combineReducers)({
  mini_cart: mini_cart
});
});

require.register("web/static/client/js/reducers/product.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// future enhancement, add pagination
var initialState = {
  products: [],
  fetching: true,
  category_filters: []
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _constants2.default.FETCHING_PRODUCTS:
      return _extends({}, state, { fetching: true });
    case _constants2.default.PRODUCTS_RECEIVED:
      return _extends({}, state, { fetching: false, products: action.products });
    default:
      return state;
  }
}
});

;require.register("web/static/client/js/socket.js", function(exports, require, module) {
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

;require.register("web/static/client/js/store/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore() {
  var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore);
  return createStoreWithMiddleware(_reducers2.default);
}
});

;require.register("web/static/client/js/utils/index.js", function(exports, require, module) {
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

;require.register("web/static/client/js/views/base_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _socket = require("../socket");

var _socket2 = _interopRequireDefault(_socket);

var _components = require("../components");

var _store = require("../store");

var _store2 = _interopRequireDefault(_store);

var _cart = require("../actions/cart");

var _cart2 = _interopRequireDefault(_cart);

var _cart_notification_listener = require("../listeners/cart_notification_listener");

var _cart_notification_listener2 = _interopRequireDefault(_cart_notification_listener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseView = function () {
  function BaseView() {
    _classCallCheck(this, BaseView);
  }

  _createClass(BaseView, [{
    key: "mount",
    value: function mount() {
      this.store = (0, _store2.default)();
      _reactDom2.default.render(_react2.default.createElement(
        _reactRedux.Provider,
        { store: this.store },
        _react2.default.createElement(_components.MiniCart, null)
      ), document.getElementById('cart'));

      this.store.dispatch(_cart2.default.fetchCurrentCartSummary(this.setupListeners.bind(this)));
    }
  }, {
    key: "unmount",
    value: function unmount() {}
  }, {
    key: "setupListeners",
    value: function setupListeners() {
      this.socket = _socket2.default;
      _socket2.default.connect();
      new _cart_notification_listener2.default(_socket2.default, this.store, { cart_id: this.store.getState().mini_cart.cart.cart_summary.id });
    }
  }]);

  return BaseView;
}();

exports.default = BaseView;
});

;require.register("web/static/client/js/views/checkout/base_checkout_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base_view = require("../base_view");

var _base_view2 = _interopRequireDefault(_base_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseCheckoutView = function (_BaseView) {
  _inherits(BaseCheckoutView, _BaseView);

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
}(_base_view2.default);

exports.default = BaseCheckoutView;
});

;require.register("web/static/client/js/views/checkout/checkout_view.js", function(exports, require, module) {
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

;require.register("web/static/client/js/views/checkout/index.js", function(exports, require, module) {
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

;require.register("web/static/client/js/views/checkout/payment.js", function(exports, require, module) {
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

require.register("web/static/client/js/views/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = viewToRender;

var _base_view = require("./base_view");

var _base_view2 = _interopRequireDefault(_base_view);

var _products = require("./products");

var _products2 = _interopRequireDefault(_products);

var _checkout = require("./checkout");

var _checkout2 = _interopRequireDefault(_checkout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// add all the views here.
var views = {
  ProductView: _products2.default,
  CheckoutView: _checkout2.default
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
      return AdminBaseView;
    } else {
      return _base_view2.default;
    }
  }
}
});

;require.register("web/static/client/js/views/products/base_product_view.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base_view = require("../base_view");

var _base_view2 = _interopRequireDefault(_base_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseProductView = function (_BaseView) {
  _inherits(BaseProductView, _BaseView);

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
}(_base_view2.default);

exports.default = BaseProductView;
});

;require.register("web/static/client/js/views/products/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getView;

var _index_view = require("./index_view");

var _index_view2 = _interopRequireDefault(_index_view);

var _base_product_view = require("./base_product_view");

var _base_product_view2 = _interopRequireDefault(_base_product_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getView(actionName) {
  switch (actionName) {
    case "index":
      return _index_view2.default;
    default:
      return _base_product_view2.default;
  }
};
});

require.register("web/static/client/js/views/products/index_view.js", function(exports, require, module) {
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

var IndexView = function (_BaseProductView) {
  _inherits(IndexView, _BaseProductView);

  function IndexView() {
    _classCallCheck(this, IndexView);

    return _possibleConstructorReturn(this, (IndexView.__proto__ || Object.getPrototypeOf(IndexView)).apply(this, arguments));
  }

  _createClass(IndexView, [{
    key: "mount",
    value: function mount() {
      _get(IndexView.prototype.__proto__ || Object.getPrototypeOf(IndexView.prototype), "mount", this).call(this);
    }
  }, {
    key: "unmount",
    value: function unmount() {
      _get(IndexView.prototype.__proto__ || Object.getPrototypeOf(IndexView.prototype), "unmount", this).call(this);
    }
  }]);

  return IndexView;
}(_base_product_view2.default);

exports.default = IndexView;
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('web/static/client/js/app');
//# sourceMappingURL=app.js.map