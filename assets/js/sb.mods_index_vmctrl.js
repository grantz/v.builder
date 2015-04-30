;(function() {
// Generated by CoffeeScript 1.9.1
/*
 * ajax接口封装
 */
var utils_doajax, data_ibar, base_class, tpl_header, tpl_ggmod, mods_ggmod_poptips, mods_common_header, tpl_ibar, mods_ibar_tplinit, mods_ibar_main, mods_index_vmctrl;
utils_doajax = function () {
  var exports;
  exports = {};
  exports.get = function (url, datas, cb) {
    var _cb;
    _cb = cb || function () {
    };
    return $.ajax({
      url: url,
      dataType: 'json',
      data: datas || {},
      type: 'GET',
      success: function (ajaxobj) {
        return _cb(ajaxobj);
      },
      error: function (ajaxobj) {
        return _cb(ajaxobj);
      }
    });
  };
  exports.post = function (url, datas, cb) {
    var _cb;
    _cb = cb || function () {
    };
    return $.ajax({
      url: url,
      dataType: 'json',
      data: datas || {},
      type: 'POST',
      success: function (ajaxobj) {
        return _cb(ajaxobj);
      },
      error: function (ajaxobj) {
        return _cb(ajaxobj);
      }
    });
  };
  return exports;
}();
data_ibar = function (doAjax) {
  var cachetime, exports;
  cachetime = new Date().getTime();
  exports = {
    userInfo: function (cb) {
      var url;
      url = '/json/login.json?_' + cachetime;
      return doAjax.post(url, {}, function (data) {
        return cb(data);
      });
    },
    asset: function (cb) {
      var url;
      url = '/json/asset.json?_' + cachetime;
      return doAjax.post(url, {}, function (data) {
        return cb(data);
      });
    },
    cartList: function (cb) {
      var url;
      url = '/json/cart_6.json?_' + cachetime;
      return doAjax.post(url, {}, function (data) {
        return cb(data);
      });
    },
    favorite: function (cb) {
      var url;
      url = '/json/favorite.json?_' + cachetime;
      return doAjax.post(url, {}, function (data) {
        return cb(data);
      });
    },
    history: function (cb) {
      var url;
      url = '/json/history.json?_' + cachetime;
      return doAjax.post(url, {}, function (data) {
        return cb(data);
      });
    }
  };
  return exports;
}(utils_doajax);
base_class = function () {
  // The base Class implementation.
  var Class = function (o) {
    // Convert existed function to Class.
    if (!(this instanceof Class) && isFunction(o)) {
      return classify(o);
    }
  };
  /**
   * {@link https://github.com/aralejs/class class} 
   */
  var toString = Object.prototype.toString;
  var isArray = Array.isArray || function (val) {
    return toString.call(val) === '[object Array]';
  };
  var isFunction = function (val) {
    return toString.call(val) === '[object Function]';
  };
  var indexOf = Array.prototype.indexOf ? function (arr, item) {
    return arr.indexOf(item);
  } : function (arr, item) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  };
  Class.create = function (parent, properties) {
    if (!isFunction(parent)) {
      properties = parent;
      parent = null;
    }
    properties || (properties = {});
    parent || (parent = properties.Extends || Class);
    properties.Extends = parent;
    // The created class constructor
    function SubClass() {
      // Call the parent constructor.
      parent.apply(this, arguments);
      // Only call initialize in self constructor.
      if (this.constructor === SubClass && this.initialize) {
        this.initialize.apply(this, arguments);
      }
    }
    // Inherit class (static) properties from parent.
    if (parent !== Class) {
      mix(SubClass, parent, parent.StaticsWhiteList);
    }
    // Add instance properties to the subclass.
    implement.call(SubClass, properties);
    // Make subclass extendable.
    return classify(SubClass);
  };
  function implement(properties) {
    var key, value;
    for (key in properties) {
      value = properties[key];
      if (Class.Mutators.hasOwnProperty(key)) {
        Class.Mutators[key].call(this, value);
      } else {
        this.prototype[key] = value;
      }
    }
  }
  // Create a sub Class based on `Class`.
  Class.extend = function (properties) {
    properties || (properties = {});
    properties.Extends = this;
    return Class.create(properties);
  };
  function classify(cls) {
    cls.extend = Class.extend;
    cls.implement = implement;
    return cls;
  }
  // Mutators define special properties.
  Class.Mutators = {
    Extends: function (parent) {
      var existed = this.prototype;
      var proto = createProto(parent.prototype);
      // Keep existed properties.
      mix(proto, existed);
      // Enforce the constructor to be what we expect.
      proto.constructor = this;
      // Set the prototype chain to inherit from `parent`.
      this.prototype = proto;
      // Set a convenience property in case the parent's prototype is
      // needed later.
      this.superclass = parent.prototype;
    },
    Implements: function (items) {
      isArray(items) || (items = [items]);
      var proto = this.prototype, item;
      while (item = items.shift()) {
        mix(proto, item.prototype || item);
      }
    },
    Statics: function (staticProperties) {
      mix(this, staticProperties);
    }
  };
  // Shared empty constructor function to aid in prototype-chain creation.
  function Ctor() {
  }
  // See: http://jsperf.com/object-create-vs-new-ctor
  var createProto = Object.__proto__ ? function (proto) {
    return { __proto__: proto };
  } : function (proto) {
    Ctor.prototype = proto;
    return new Ctor();
  };
  // Helpers
  // ------------
  function mix(r, s, wl) {
    // Copy "all" properties including inherited ones.
    for (var p in s) {
      if (s.hasOwnProperty(p)) {
        if (wl && indexOf(wl, p) === -1)
          continue;
        // 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
        if (p !== 'prototype') {
          r[p] = s[p];
        }
      }
    }
  }
  return Class;
}();
tpl_header = {
  '_cartlist': '<script id="tpl_header_cartlist" type="smcore"><i class="cart-icons"></i><div class="cart_content_null" vm-if="cartInfo.quantity == 0"> \u8D2D\u7269\u8F66\u4E2D\u8FD8\u6CA1\u6709\u5546\u54C1\uFF0C <br>\u5FEB\u53BB\u6311\u9009\u5FC3\u7231\u7684\u5546\u54C1\u5427\uFF01</div><div class="cart_content_all" vm-if="cartInfo.quantity > 0"><div class="cart_left_time"><span class="cart_timer">16\u520627.6</span>\u540E\u8D2D\u7269\u8F66\u5C06\u88AB\u6E05\u7A7A,\u8BF7\u53CA\u65F6\u7ED3\u7B97</div><div class="cart_content_center"><div class="cart_con_over cart_con_single" vm-repeat="cartInfo.product.items"><div class="single_pic"><a vm-attr-alt="el.short_name" target="_blank" vm-href="el.url + \'?from=home_cart_float\'"><img vm-src="http://static.local/assets/img/el.image_60?=t14303201"></a></div><div class="single_info"><a class="name" vm-attr-alt="el.short_name" target="_blank" vm-href="el.url + \'?from=home_cart_float\'">{{el.short_name}}</a><span class="price">\uFFE5{{el.item_price}}</span><span class="price_plus"> x </span><span class="price_num">{{el.quantity}}</span></div></div></div><div class="con_all"><div class="price_whole"><span>\u5171<span class="num_all">{{cartInfo.quantity}}</span>\u4EF6\u5546\u54C1</span></div><div><span class="price_gongji">\u5171\u8BA1<em>\uFFE5</em><span class="total_price">{{cartInfo.total_amount}}</span></span><a rel="nofollow" class="cart_btn" href="http://cart.jumei.com/i/cart/show/?from=header_cart">\u53BB\u8D2D\u7269\u8F66\u7ED3\u7B97</a></div></div></div></script>',
  'cartbtn': '<div class="cart_box" id="cart_box" vm-class="car-current:isOn"><a rel="nofollow" href="http://cart.jumei.com/i/cart/show?from=header_cart" class="cart_link" id="cart" vm-mouseenter="movein" vm-mouseleave="moveout"><img width="28" height="28" class="cart_gif" src="http://p0.jmstatic.com/assets/cart.gif"><span class="text">\u53BB\u8D2D\u7269\u8F66\u7ED3\u7B97</span><span class="num" vm-if="cartInfo.quantity > 0">{{cartInfo.quantity}}</span><s class="icon_arrow_right"></s></a><div id="cart_content" class="cart_content" vm-include="tpl_cart" data-include-rendered="render" vm-mouseenter="movein" vm-mouseleave="moveout"></div></div>',
  'userinfo': '<ul id="headerTopLeft" class="header_top_left" vm-if="isLogin"><li class="signin">\u6B22\u8FCE\u60A8\uFF0C<span class="col_jumei"><a target="_blank" href="http://www.jumei.com/i/order/list">JM135ACCE2090</a></span> [ <a href="http://passport.jumei.com/i/account/logout" class="signout">\u9000\u51FA</a> ]</li></ul><ul class="header_top_left" id="headerTopLeft" vm-if="!isLogin"><li>\u6B22\u8FCE\u6765\u5230\u805A\u7F8E\uFF01</li><li><a href="http://www.jumei.com/i/account/login" rel="nofollow">\u8BF7\u767B\u5F55</a></li><li><a href="http://www.jumei.com/i/account/signup" rel="nofollow">\u5FEB\u901F\u6CE8\u518C</a></li></ul>'
};
tpl_ggmod = { '_poptips': '<script id="tpl_ggmod_poptips" type="smcore"><div class="envelopeBubble png" style="right: 200px; display: block;"><div class="ebClose"></div><div class="ebtime"><i><span>23</span><strong>\u65F6</strong></i><i><span>25</span><strong>\u5206</strong></i><i style="margin-right:0"><span>59</span><strong>\u79D2</strong></i></div><div class="ebbmont"><a href="http://www.jumei.com/i/membership/show_promocards"><span>\u67E5\u770B\u60A8\u7684</span><span class="price_l">165</span><span>\u5143\u73B0\u91D1\u5238</span></a></div></div></script>' };
mods_ggmod_poptips = function (Class, Tpl) {
  return Class.create({
    initialize: function () {
      var $body;
      $body = $('body');
      this.tpl_poptips = $(Tpl._poptips);
      return this.tpl_poptips.appendTo($body);
    }
  });
}(base_class, tpl_ggmod);
mods_common_header = function (smcore, Class, hdTpl, Tips) {
  var _timer, tplInit;
  tplInit = Class.create({
    initialize: function () {
      var $body, $cartBtn, $hd_user;
      $body = $('body');
      $hd_user = $('#hd_user');
      $cartBtn = $('.header_icon_wrap');
      this.tpl_cartbtn = $(hdTpl.cartbtn);
      this.tpl_user = $(hdTpl.userinfo);
      this.tpl_cartlist = $(hdTpl._cartlist);
      this.tpl_user.appendTo($hd_user);
      this.tpl_cartbtn.appendTo($cartBtn);
      return this.tpl_cartlist.appendTo($body);
    }
  });
  /*模板实例化 */
  new tplInit();
  new Tips();
  _timer = null;
  /*header_user的vm模型 */
  _VM_.header_user = smcore.define({
    $id: 'header_user',
    tpl_tips: 'tpl_ggmod_userinfo',
    userInfo: {},
    isLogin: false,
    render: function () {
      return this.innerHTML;
    }
  });
  /*header_cart按钮的vm模型 */
  _VM_.header_cart = smcore.define({
    $id: 'header_cart',
    tpl_cart: '',
    cartInfo: {},
    isOn: false,
    render: function () {
      return this.innerHTML;
    },
    movein: function () {
      if (_timer) {
        clearTimeout(_timer);
      }
      _VM_.header_cart.tpl_cart = 'tpl_header_cartlist';
      _VM_.header_cart.isOn = true;
      return $('.cart_content_all').slideDown();
    },
    moveout: function () {
      return _timer = setTimeout(function () {
        _VM_.header_cart.tpl_cart = '';
        _VM_.header_cart.isOn = false;
        return $('.cart_content_all').slideUp();
      }, 1500);
    }
  });
  return _VM_;
}(smcore, base_class, tpl_header, mods_ggmod_poptips);
tpl_ibar = {
  '_asset': '<script id="tpl_ibar_asset" type="smcore"><a title="\u5173\u95ED" class="ibar_closebtn" href="javascript:;" vm-click="hidePanel(20)"></a><span class="ibar_loading_text">\u6B63\u5728\u4E3A\u60A8\u52AA\u529B\u52A0\u8F7D\u6570\u636E\uFF01</span><div class="ibar-Asset-wrap ibar-moudle-wrap ibar_plugin" id="iBarAsset" style="display: block;"><h2 class="ibar_plugin_title"><span class="ibar_plugin_name">\u6211\u7684\u8D22\u4EA7</span></h2><div class="ibar_plugin_content" style="height: 720px; overflow-y: auto;"><div class="ia-head-list clearfix"><a href="http://www.jumei.com/i/membership/show_promocards?from=ibar_property_xianjinquan" target="_blank" class="ihl-quan fl"><div class="num">0</div><div class="text">\u73B0\u91D1\u5238</div></a><a href="http://www.jumei.com/i/membership/show_red_envelope?from=ibar_property_hongbao" target="_blank" class="ihl-hg fl"><div class="num">0</div><div class="text">\u7EA2\u5305</div></a><a href="http://www.jumei.com/i/account/balance?from=ibar_property_yue" target="_blank" class="ihl-money fl"><div class="num">\xA50</div><div class="text">\u4F59\u989D</div></a></div><div class="ga-expiredsoon"><div class="es-head">\u5373\u5C06\u8FC7\u671F\u73B0\u91D1\u5238</div><div class="ia-none">\u60A8\u8FD8\u6CA1\u6709\u53EF\u7528\u7684\u73B0\u91D1\u5238\u54E6\uFF01</div></div><div class="ga-expiredsoon"><div class="es-head">\u5373\u5C06\u8FC7\u671F\u7EA2\u5305</div><div class="ia-none">\u60A8\u8FD8\u6CA1\u6709\u53EF\u7528\u7684\u7EA2\u5305\u54E6\uFF01</div></div></div></div></script>',
  '_cart': '<script id="tpl_ibar_cart" type="smcore"><a title="\u5173\u95ED" class="ibar_closebtn" href="javascript:;" vm-click="hidePanel(20)"></a><span class="ibar_loading_text">\u6B63\u5728\u4E3A\u60A8\u52AA\u529B\u52A0\u8F7D\u6570\u636E\uFF01</span><div class="ibar_plugin ibar_cart_content" id="iBarCart"><div class="ibar_plugin_title"><span class="ibar_plugin_name">\u8D2D\u7269\u8F66<span class="ibar_cart_timer" style="display: inline;">\u5DF2\u8D85\u65F6\uFF0C\u8BF7\u5C3D\u5FEB\u7ED3\u7B97</span></span></div><div class="ibar_plugin_content ibar_cart_content"><div class="ibar_cart_group_container" style="position: absolute;"><div class="ibar_cart_group ibar_cart_product"><div class="ibar_cart_group_header clearfix"><span class="ibar_cart_group_title">\u805A\u7F8E\u4F18\u54C1</span><span class="ibar_cart_group_shop ibar_text_ellipsis"></span><span class="ibar_cart_group_baoyou ibar_pink">\u65B0\u7528\u6237\u9996\u5355\u6EE1<i>39</i>\u5143\u5305\u90AE</span></div><ul class="ibar_cart_group_items"><li class="ibar_cart_item clearfix" vm-repeat="cartInfo.product.items"><div class="ibar_cart_item_pic"><a target="_blank" vm-attr-title="el.short_name" vm-href="el.url + \'?from=ibar_cart\'"><img vm-attr-alt="el.short_name" vm-src="el.image_100"><span class="ibar_cart_item_tag png" vm-class="ibar_cart_item_tag_active ibar_cart_item_tag_soldout:el.sale_status != \'\'"></span></a></div><div class="ibar_cart_item_desc"><span class="ibar_cart_item_name_wrapper"><span class="ibar_cart_item_global">[\u6781\u901F\u514D\u7A0E\u5E97]</span><a target="_blank" class="ibar_cart_item_name" vm-attr-title="el.short_name" vm-href="el.url + \'?from=ibar_cart\'">{{el.short_name}}</a></span><div class="ibar_cart_item_sku ibar_text_ellipsis"><span>{{el.attribute}}</span></div><div class="ibar_cart_item_price ibar_pink"><span class="unit_price">\uFFE5{{el.item_price}}</span><span class="unit_plus"> x </span><span class="ibar_cart_item_count">{{el.quantity}}</span></div></div></li></ul></div><p class="ibar_cart_loading_text">\u6B63\u5728\u4E3A\u60A8\u52AA\u529B\u5730\u52A0\u8F7D\u6570\u636E\uFF01</p></div><div class="ibar_cart_handler ibar_cart_handler_attached" style="display: block; bottom: 45px"><div class="ibar_cart_handler_header clearfix"><span class="ibar_cart_handler_header_left">\u5171 <span class="ibar_cart_total_quantity ibar_pink">{{cartInfo.quantity}}</span> \u4EF6\u5546\u54C1</span><span class="ibar_cart_total_price ibar_pink">\uFFE5{{cartInfo.total_amount}}</span></div><a target="_blank" href="http://cart.jumei.com/i/cart/show?from=ibar_cart_button" class="ibar_cart_go_btn">\u53BB\u8D2D\u7269\u8F66\u7ED3\u7B97</a></div></div></div></script>',
  '_favorite': '<script id="tpl_ibar_favorite" type="smcore"><a href="javascript:;" class="ibar_closebtn" title="\u5173\u95ED" vm-click="hidePanel(20)"></a><span class="ibar_loading_text">\u6B63\u5728\u4E3A\u60A8\u52AA\u529B\u52A0\u8F7D\u6570\u636E\uFF01</span><div class="ibar-moudle-wrap ibar_plugin" id="iBarFavorite" style="display: block;"><h2 class="ibar_plugin_title"><span class="ibar_plugin_name">\u4ECA\u65E5\u75AF\u62A2</span></h2><div class="ibar_plugin_content" style="height: 700px; overflow-y: auto;"><div class="ibar-nothing"><div class="txt">\u60A8\u6CA1\u6709\u5728\u552E\u4E2D\u7684 <br><span>\u5FC3\u613F\u5546\u54C1\u5594\uFF01</span></div></div><div class="ibar-moudle-product soon"><h2>\u5373\u5C06\u5F00\u62A2</h2><div class="imp_item"><div class="imp-starttime">03\u670825\u65E510:00:00\u5F00\u62A2</div><a href="http://gz.jumei.com/i/deal/d150325p21839zc.html?from=ibar_mywish_willsale" title="15ml\u6B27\u83B1\u96C5\u590D\u989C\u6297\u76B1\u7D27\u81F4\u6ECB\u6DA6\u773C\u971C" target="_blank" class="pic"><img src="http://p4.jmstatic.com/product/000/021/21839_std/21839_100_100.jpg" width="100" height="100"></a><p class="tit"><a href="http://gz.jumei.com/i/deal/d150325p21839zc.html?from=ibar_mywish_willsale" title="15ml\u6B27\u83B1\u96C5\u590D\u989C\u6297\u76B1\u7D27\u81F4\u6ECB\u6DA6\u773C\u971C" target="_blank">15ml\u6B27\u83B1\u96C5\u590D\u989C\u6297\u76B1\u7D27\u81F4\u6ECB\u6DA6\u773C\u971C</a></p><p class="wish-num">\u5DF2\u6709318\u4EBA\u8BB8\u613F</p><p></p><p class="price"><em>\xA5</em>189 <del>\xA5210</del></p></div><div class="imp_item"><div class="imp-starttime">03\u670825\u65E510:00:00\u5F00\u62A2</div><a href="http://gz.jumei.com/i/deal/d150325p817644zc.html?from=ibar_mywish_willsale" title="\u5957\u6B27\u83B1\u96C5\u9650\u91CF\u6E05\u6DA6\u4FDD\u6E7F\u62A4\u80A4\u793C\u76D2\u5957\u88C5" target="_blank" class="pic"><img src="http://p4.jmstatic.com/product/000/817/817644_std/817644_100_100.jpg" width="100" height="100"></a><p class="tit"><a href="http://gz.jumei.com/i/deal/d150325p817644zc.html?from=ibar_mywish_willsale" title="\u5957\u6B27\u83B1\u96C5\u9650\u91CF\u6E05\u6DA6\u4FDD\u6E7F\u62A4\u80A4\u793C\u76D2\u5957\u88C5" target="_blank">\u5957\u6B27\u83B1\u96C5\u9650\u91CF\u6E05\u6DA6\u4FDD\u6E7F\u62A4\u80A4\u793C\u76D2\u5957\u88C5</a></p><p class="wish-num">\u5DF2\u67091139\u4EBA\u8BB8\u613F</p><p></p><p class="price"><em>\xA5</em>330 <del>\xA5509</del></p></div></div></div></div><div class="ibar-Asset-wrap ibar-moudle-wrap ibar_plugin" id="iBarAsset" style="display: none;"><h2 class="ibar_plugin_title"><span class="ibar_plugin_name">\u6211\u7684\u8D22\u4EA7</span></h2><div class="ibar_plugin_content" style="height: 700px; overflow-y: auto;"><div class="ia-head-list clearfix"><a href="http://www.jumei.com/i/membership/show_promocards?from=ibar_property_xianjinquan" target="_blank" class="ihl-quan fl"><div class="num">0</div><div class="text">\u73B0\u91D1\u5238</div></a><a href="http://www.jumei.com/i/membership/show_red_envelope?from=ibar_property_hongbao" target="_blank" class="ihl-hg fl"><div class="num">0</div><div class="text">\u7EA2\u5305</div></a><a href="http://www.jumei.com/i/account/balance?from=ibar_property_yue" target="_blank" class="ihl-money fl"><div class="num">\xA50</div><div class="text">\u4F59\u989D</div></a></div><div class="ga-expiredsoon"><div class="es-head">\u5373\u5C06\u8FC7\u671F\u73B0\u91D1\u5238</div><div class="ia-none">\u60A8\u8FD8\u6CA1\u6709\u53EF\u7528\u7684\u73B0\u91D1\u5238\u54E6\uFF01</div></div><div class="ga-expiredsoon"><div class="es-head">\u5373\u5C06\u8FC7\u671F\u7EA2\u5305</div><div class="ia-none">\u60A8\u8FD8\u6CA1\u6709\u53EF\u7528\u7684\u7EA2\u5305\u54E6\uFF01</div></div></div></div></script>',
  '_history': '<script id="tpl_ibar_history" type="smcore"><a title="\u5173\u95ED" class="ibar_closebtn" href="javascript:;" vm-click="hidePanel(20)"></a><span class="ibar_loading_text">\u6B63\u5728\u4E3A\u60A8\u52AA\u529B\u52A0\u8F7D\u6570\u636E\uFF01</span><div id="iBarHistroy" class="ibar-moudle-wrap ibar_plugin"><h2 class="ibar_plugin_title"><span class="ibar_plugin_name">\u6700\u8FD1\u67E5\u770B</span></h2><div class="ibar_plugin_content"><div class="ibar-history-head">\u51715\u4EF6\u5546\u54C1<a id="ibar-btn-clearhistory" href="javascript:;">\u6E05\u7A7A</a></div><div class="ibar-moudle-product"><div class="imp_item"><a class="pic" target="_blank" title="\u5C0F\u7F8E\u76D2\u78A7\u6B27\u6CC9\u4E3B\u9898\u76D2\u4E03\u4EF6\u59571" href="http://item.jumei.com/gz150318p1309926.html?from=ibar_view_recent_product"><img width="100" height="100" src="http://p1.jmstatic.com/product/001/309/1309926_std/1309926_100_100.jpg"></a><p class="tit"><a target="_blank" title="\u5C0F\u7F8E\u76D2\u78A7\u6B27\u6CC9\u4E3B\u9898\u76D2\u4E03\u4EF6\u59571" href="http://item.jumei.com/gz150318p1309926.html?from=ibar_view_recent_product">\u5C0F\u7F8E\u76D2\u78A7\u6B27\u6CC9\u4E3B\u9898\u76D2\u4E03\u4EF6\u59571</a></p><p class="price"><em>\xA5</em>200</p><a img="http://p1.jmstatic.com/product/001/309/1309926_std/1309926_100_100.jpg" type="deal" key="gz150318p1309926" class="imp-addCart" target="_blnak" href="javascript:;">\u52A0\u5165\u8D2D\u7269\u8F66</a><div class="sku_box"><select class="sku_select"><option value="0">\u578B\u53F7\u9009\u62E9</option></select></div></div><div class="imp_item"><a class="pic" target="_blank" title="\u5170\u853B\u5947\u8FF9\u9999\u6C1B30ml" href="http://item.jumei.com/d150318p1150zc.html?from=ibar_view_recent_product"><img width="100" height="100" src="http://p0.jmstatic.com/product/000/001/1150_std/1150_100_100.jpg"></a><p class="tit"><a target="_blank" title="\u5170\u853B\u5947\u8FF9\u9999\u6C1B30ml" href="http://item.jumei.com/d150318p1150zc.html?from=ibar_view_recent_product">\u5170\u853B\u5947\u8FF9\u9999\u6C1B30ml</a></p><p class="price"><em>\xA5</em>389</p><a img="http://p0.jmstatic.com/product/000/001/1150_std/1150_100_100.jpg" type="deal" key="d150318p1150zc" class="imp-addCart" target="_blnak" href="javascript:;">\u52A0\u5165\u8D2D\u7269\u8F66</a><div class="sku_box"><select class="sku_select"><option value="0">\u578B\u53F7\u9009\u62E9</option></select></div></div><div class="imp_item"><a class="pic" target="_blank" title="\u73C0\u83B1\u96C5\u65B0\u67D4\u7699\u7F8E\u767D\u8865\u6C34\u5957\u88C5" href="http://item.jumei.com/gz150105p230856bk.html?from=ibar_view_recent_product"><img width="100" height="100" src="http://p1.jmstatic.com/product/000/230/230856_std/230856_100_100.jpg"></a><p class="tit"><a target="_blank" title="\u73C0\u83B1\u96C5\u65B0\u67D4\u7699\u7F8E\u767D\u8865\u6C34\u5957\u88C5" href="http://item.jumei.com/gz150105p230856bk.html?from=ibar_view_recent_product">\u73C0\u83B1\u96C5\u65B0\u67D4\u7699\u7F8E\u767D\u8865\u6C34\u5957\u88C5</a></p><p class="price"><em>\xA5</em>99</p><a img="http://p1.jmstatic.com/product/000/230/230856_std/230856_100_100.jpg" type="deal" key="gz150105p230856bk" class="imp-addCart" target="_blnak" href="javascript:;">\u52A0\u5165\u8D2D\u7269\u8F66</a><div class="sku_box"><select class="sku_select"><option value="0">\u578B\u53F7\u9009\u62E9</option></select></div></div><div class="imp_item"><a class="pic" target="_blank" title="\u5B8C\u7F8E\u82A6\u835F\u80F6\u4E00\u5BF940g*2" href="http://item.jumei.com/gz150105p34bk.html?from=ibar_view_recent_product"><img width="100" height="100" src="http://p4.jmstatic.com/product/000/000/34_std/34_100_100.jpg"></a><p class="tit"><a target="_blank" title="\u5B8C\u7F8E\u82A6\u835F\u80F6\u4E00\u5BF940g*2" href="http://item.jumei.com/gz150105p34bk.html?from=ibar_view_recent_product">\u5B8C\u7F8E\u82A6\u835F\u80F6\u4E00\u5BF940g*2</a></p><p class="price"><em>\xA5</em>59.9</p><a img="http://p4.jmstatic.com/product/000/000/34_std/34_100_100.jpg" type="deal" key="gz150105p34bk" class="imp-addCart" target="_blnak" href="javascript:;">\u52A0\u5165\u8D2D\u7269\u8F66</a><div class="sku_box"><select class="sku_select"><option value="0">\u578B\u53F7\u9009\u62E9</option></select></div></div><div class="imp_item"><a class="pic" target="_blank" title="\u5170\u853B\u6E05\u6EE2\u67D4\u80A4\u6C34400ml" href="http://item.jumei.com/d150318p646884zc.html?from=ibar_view_recent_product"><img width="100" height="100" src="http://p4.jmstatic.com/product/000/646/646884_std/646884_100_100.jpg"></a><p class="tit"><a target="_blank" title="\u5170\u853B\u6E05\u6EE2\u67D4\u80A4\u6C34400ml" href="http://item.jumei.com/d150318p646884zc.html?from=ibar_view_recent_product">\u5170\u853B\u6E05\u6EE2\u67D4\u80A4\u6C34400ml</a></p><p class="price"><em>\xA5</em>299</p><a img="http://p4.jmstatic.com/product/000/646/646884_std/646884_100_100.jpg" type="deal" key="d150318p646884zc" class="imp-addCart" target="_blnak" href="javascript:;">\u52A0\u5165\u8D2D\u7269\u8F66</a><div class="sku_box"><select class="sku_select"><option value="0">\u578B\u53F7\u9009\u62E9</option></select></div></div></div></div></div></script>',
  '_login': '<script id="tpl_ibar_login" type="smcore"><div class="avatar_box" vm-mouseenter="openLogin" vm-mouseleave="hideLogin"><p class="avatar_imgbox"><img src="http://p0.jmstatic.com/product_report/default/avatar/avatar_small.png" alt="\u5934\u50CF" width="62" height="62"></p><ul class="user_info"><li>\u7528\u6237\u540D\uFF1AJM135ACCE2090</li><li>\u7EA7 \u522B\uFF1A\u666E\u901A\u4F1A\u5458</li></ul></div><div class="login_btnbox" vm-mouseenter="openLogin" vm-mouseleave="hideLogin"><a href="http://www.jumei.com/i/order/list" class="login_order" target="_blank">\u6211\u7684\u8BA2\u5355</a><a href="http://www.jumei.com/i/product/fav_products" class="login_favorite" target="_blank">\u6211\u7684\u6536\u85CF</a></div><s class="icon_arrow_white"></s><a href="javascript:;" class="ibar_closebtn" title="\u5173\u95ED" vm-click="hidePanel(20)"></a></script>',
  '_recharge': '<script id="tpl_ibar_recharge" type="smcore"><a title="\u5173\u95ED" class="ibar_closebtn" href="javascript:;" vm-click="hidePanel(20)"></a><span class="ibar_loading_text">\u6B63\u5728\u4E3A\u60A8\u52AA\u529B\u52A0\u8F7D\u6570\u636E\uFF01</span><div class="ibar_plugin ibar_recharge_content" id="iBarRecharge"><div class="ibar_plugin_title"><span class="ibar_plugin_name">\u624B\u673A\u5145\u8BDD\u8D39</span></div><div class="ibar_plugin_content"><form class="ibar_recharge_form " method="get" target="_blank" action="//cart.jumei.com/m/forward/"><div style="*z-index: 3; *position: relative" class="ibar_recharge-field ibar_recharge-num"><label>\u53F7\u7801</label><div class="ibar_recharge-input ibar_recharge-fl"><div class="ibar_recharge-iwrapper"><input type="text" autocomplete="off" placeholder="\u624B\u673A\u53F7\u7801" name="hp" maxlength="13"></div><i title="\u67E5\u770B\u5145\u503C\u5386\u53F2" class="ibar_recharge-contact"></i><div class="ibar_recharge-tooltip" style="display: none;"><p class="no-phone ibar_pink">\u8BF7\u586B\u5199\u60A8\u7684\u624B\u673A\u53F7\u7801</p><p class="phone-error ibar_pink">\u8BF7\u586B\u5199\u6B63\u786E\u7684\u624B\u673A\u53F7\u7801</p><p class="zoom-in ibar_pink"></p><ul class="phone-list"></ul><p class="no-history ibar_pink">\u60A8\u8FD8\u6CA1\u6709\u5145\u503C\u8BB0\u5F55</p></div></div></div><div style="*z-index: 2" class="ibar_recharge-field"><label>\u9762\u503C</label><div class="ibar_recharge-fl ibar_recharge-vwrapper"><p class="ibar_recharge-mod"><span class="ibar_recharge-val">100</span> \u5143</p><i class="ibar_recharge-arrow"></i><div class="ibar_recharge-vbox clearfix" style="display: none;"><ul><li class="selected"><span>100</span>\u5143</li><li><span>200</span>\u5143</li><li><span>300</span>\u5143</li><li><span>500</span>\u5143</li></ul><ul class="last-ul"><li><span>10</span>\u5143</li><li><span>20</span>\u5143</li><li><span>30</span>\u5143</li><li><span>50</span>\u5143</li></ul></div></div></div><div class="ibar_recharge-field ibar_recharge-pwrapper"><label>\u552E\u4EF7</label><div class="ibar_recharge-fl"><p><span class="ibar_pink sell-status"><span class="on-sell"><span class="ibar_recharge-price">98.70 ~ 99.80</span> \u5143</span><span class="sold-out">\u6682\u65F6\u7F3A\u8D27</span></span><span class="ibar_recharge-operator"></span></p><input type="hidden" value="" name="sku_no"><input type="hidden" value="" name="customers_price"><input type="hidden" value="" name="market_price"><input type="hidden" value="ibar_mobile_recharge" name="from"><input type="hidden" value="" name="province"><input type="hidden" value="" name="mall_id"></div></div><div class="ibar_recharge-btn"><input type="submit" value="\u7ACB\u5373\u5145\u503C"></div></form></div></div></script>',
  'main': '<div id="iBar" class="ibar" vm-controller="global_ibar"><div class="ibar_main_panel" style="left: 0px;"><ul class="ibar_mp_center"><li class="mpbtn_login"><a href="javascript:;" vm-click="openLogin" vm-mouseleave="hidePanel(2000)"><s></s><span>\u767B\u5F55</span></a></li><li class="mpbtn_cart"><a href="javascript:;" vm-click="openPanel(1)" vm-mouseleave="hidePanel(2000)"><s></s><span class="text">\u8D2D\u7269\u8F66</span><span class="cart_num">{{cartInfo.quantity}}</span></a></li><li class="mpbtn_asset"><a href="javascript:;" vm-mouseenter="showTips(-122,-92)" vm-mouseleave="hideTips(-122)" vm-click="openPanel(4)" vm-mouseleave="hidePanel(2000)"><s></s><span>\u6211\u7684\u8D22\u4EA7</span></a><div class="mp_tooltip">\u6211\u7684\u8D22\u4EA7 <s class="icon_arrow_right_black"></s></div></li><li class="mpbtn_favorite"><a href="javascript:;" vm-mouseenter="showTips(-122,-92)" vm-mouseleave="hideTips(-122)" vm-click="openPanel(2)" vm-mouseleave="hidePanel(2000)"><s></s><span>\u6211\u7684\u5FC3\u613F\u5355</span></a><div class="mp_tooltip">\u6211\u7684\u5FC3\u613F\u5355 <s class="icon_arrow_right_black"></s></div></li><li class="mpbtn_histroy"><a href="javascript:;" vm-mouseenter="showTips(-122,-92)" vm-mouseleave="hideTips(-122)" vm-click="openPanel(3)" vm-mouseleave="hidePanel(2000)"><s></s><span>\u6211\u770B\u8FC7\u7684</span></a><div class="mp_tooltip">\u6211\u770B\u8FC7\u7684 <s class="icon_arrow_right_black"></s></div></li><li class="mpbtn_recharge"><a href="javascript:;" vm-mouseenter="showTips(-122,-92)" vm-mouseleave="hideTips(-122)" vm-click="openPanel(5)" vm-mouseleave="hidePanel(2000)"><s></s><span class="text">\u5145</span></a><div class="mp_tooltip">\u6211\u8981\u5145\u503C <s class="icon_arrow_right_black"></s></div></li></ul><ul class="ibar_mp_bottom"><li class="mpbtn_qrcode"><a href="javascript:;" vm-mouseenter="showTips(-188,-168)" vm-mouseleave="hideTips(-188)" vm-click="hidePanel(20)"><s></s>\u624B\u673A\u805A\u7F8E</a><div class="mp_qrcode"><img width="148" height="175" src="http://s0.jmstatic.com/templates/jumei/images/ibar/qrcode.png?v=0"><s class="icon_arrow_white"></s></div></li><li class="mpbtn_support"><a href="javascript:;" vm-mouseenter="showTips(-122,-92)" vm-mouseleave="hideTips(-122)" vm-click="hidePanel(20)"><s></s>\u5BA2\u670D\u4E2D\u5FC3</a><div class="mp_tooltip">\u5BA2\u670D\u4E2D\u5FC3 <s class="icon_arrow_right_black"></s></div></li><li id="gotop" class="mpbtn_gotop"><a href="javascript:;" class="btn_gotop" vm-mouseenter="showTips(-122,-92)" vm-mouseleave="hideTips(-122)" vm-click="goTop" vm-click-1="hidePanel(20)" style="visibility: visible;"><s></s>\u8FD4\u56DE\u9876\u90E8</a><div class="mp_tooltip">\u8FD4\u56DE\u9876\u90E8 <s class="icon_arrow_right_black"></s></div></li></ul></div><div class="ibar_tips_box" vm-include="tpl_tips" data-include-rendered="render" vm-mouseleave="hidePanel(2000)"></div><div class="ibar_login_box status_login" vm-include="tpl_login" data-include-rendered="render" vm-mouseleave="hidePanel(2000)"></div><div class="ibar_sub_panel" vm-include="tpl_panel" data-include-rendered="render" vm-mouseenter="openPanel()" vm-mouseleave="hidePanel(2000)"></div></div>'
};
mods_ibar_tplinit = function (Class, Tpl) {
  var tplInit;
  return tplInit = Class.create({
    initialize: function () {
      var $body;
      $body = $('body');
      /*
       * 注入主模块，注入依赖
       */
      /* 载入主模板 */
      this.tpl_main = $(Tpl.main);
      /* 载入子模板 - 用户信息 */
      this.tpl_login = $(Tpl._login);
      /* 载入子模板 - 购物车信息 */
      this.tpl_cart = $(Tpl._cart);
      /* 载入子模板 - 我的财产 */
      this.tpl_asset = $(Tpl._asset);
      /* 载入子模板 - 我的心愿单 */
      this.tpl_favorite = $(Tpl._favorite);
      /* 载入子模板 - 我的浏览记录 */
      this.tpl_history = $(Tpl._history);
      /* 载入子模板 - 附属信息 */
      this.tpl_recharge = $(Tpl._recharge);
      /* 将模板注入到页面中 */
      this.tpl_main.appendTo($body);
      this.tpl_login.appendTo($body);
      this.tpl_cart.appendTo($body);
      this.tpl_asset.appendTo($body);
      this.tpl_favorite.appendTo($body);
      this.tpl_history.appendTo($body);
      return this.tpl_recharge.appendTo($body);
    }
  });
}(base_class, tpl_ibar);
mods_ibar_main = function (smcore, ibarTpl, getData) {
  var _timer, timer;
  new ibarTpl();
  timer = null;
  _timer = null;
  /*全局的ibar购物车模型 */
  _VM_.ibar = smcore.define({
    $id: 'global_ibar',
    userInfo: {},
    cartInfo: {},
    myAsset: {},
    myFavorite: {},
    myHistory: {},
    tpl_login: '',
    tpl_panel: '',
    tpl_tips: '',
    isLogin: false,
    iscurrent: false,
    render: function () {
      return this.innerHTML;
    },
    openLogin: function () {
      var _top;
      if (timer) {
        clearTimeout(timer);
      }
      _top = $('.mpbtn_login').offsetTop;
      _VM_.ibar.tpl_login = 'tpl_ibar_login';
      $('.ibar_login_box').css({
        top: _top,
        visibility: 'visible'
      }).fadeIn();
      return $('.ibar_sub_panel').fadeOut().css({
        left: 0,
        visibility: 'hidden'
      });
    },
    hideLogin: function () {
    },
    openPanel: function (type) {
      var _this, _type;
      _this = $(this);
      _this.next('div').stop().animate({ opacity: 0 }, 'fast').css({
        left: -92,
        visibility: 'hidden'
      });
      if (timer) {
        clearTimeout(timer);
      }
      _type = type || 1;
      switch (_type) {
      case 1:
        _VM_.ibar.tpl_panel = 'tpl_ibar_cart';
        break;
      case 2:
        _VM_.ibar.tpl_panel = 'tpl_ibar_favorite';
        getData.favorite(function (data) {
          return _VM_.ibar.myFavorite = data;
        });
        break;
      case 3:
        _VM_.ibar.tpl_panel = 'tpl_ibar_history';
        getData.history(function (data) {
          return _VM_.ibar.myHistory = data;
        });
        break;
      case 4:
        _VM_.ibar.tpl_panel = 'tpl_ibar_asset';
        getData.asset(function (data) {
          return _VM_.ibar.myAsset = data;
        });
        break;
      case 5:
        _VM_.ibar.tpl_panel = 'tpl_ibar_recharge';
      }
      $('.ibar_login_box').fadeOut().css({ visibility: 'hidden' });
      return $('.ibar_sub_panel').css({ visibility: 'visible' }).fadeIn().animate({ left: -287 }, 250);
    },
    hidePanel: function (t) {
      var _t;
      if (timer) {
        clearTimeout(timer);
      }
      _t = t || 1500;
      timer = setTimeout(function () {
        _VM_.ibar.tpl_panel = '';
        _VM_.ibar.tpl_login = '';
        $('.ibar_login_box').fadeOut().css({ visibility: 'hidden' });
        return $('.ibar_sub_panel').fadeOut().css({
          left: 0,
          visibility: 'hidden'
        });
      }, _t);
    },
    showTips: function (start, end) {
      var _this;
      _this = $(this);
      _this.addClass('current');
      return _this.next('div').css({
        left: start,
        opacity: 0,
        visibility: 'visible'
      }).stop().animate({
        left: end,
        opacity: 1
      }, 400);
    },
    hideTips: function (end) {
      var _this;
      _this = $(this);
      _this.next('div').stop().animate({ opacity: 0 }, 'fast').css({
        left: end,
        visibility: 'hidden'
      });
      return _this.removeClass('current');
    },
    goTop: function () {
      return $('body,html').animate({ scrollTop: 0 }, 400);
    }
  });
  return _VM_;
}(smcore, mods_ibar_tplinit, data_ibar);
mods_index_vmctrl = function (smcore, getData, header, iBar) {
  var exports;
  exports = {};
  exports.run = function (cb) {
    var timer;
    smcore.scan();
    timer = null;
    getData.cartList(function (data) {
      return _VM_.ibar.cartInfo = _VM_.header_cart.cartInfo = data;
    });
    getData.userInfo(function (data) {
      _VM_.ibar.userInfo = _VM_.header_user.userInfo = data;
      if (data.status === 1) {
        return _VM_.ibar.isLogin = _VM_.header_user.isLogin = true;
      }
    });
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      return $('#iBar').css({ 'height': $(window).height() }).slideDown(500);
    }, 400);
    return cb();
  };
  return exports;
}(smcore, data_ibar, mods_common_header, mods_ibar_main);
}());