define(function(){return {"_cartlist":"<script id=\"tpl_header_cartlist\" type=\"smcore\"><i class=\"cart-icons\"></i><div class=\"cart_content_null\" vm-if=\"cartInfo.quantity == 0\"> 购物车中还没有商品， <br>快去挑选心爱的商品吧！</div><div class=\"cart_content_all\" vm-if=\"cartInfo.quantity > 0\"><div class=\"cart_left_time\"><span class=\"cart_timer\">16分27.6</span>后购物车将被清空,请及时结算</div><div class=\"cart_content_center\"><div class=\"cart_con_over cart_con_single\" vm-repeat=\"cartInfo.product.items\"><div class=\"single_pic\"><a vm-attr-alt=\"el.short_name\" target=\"_blank\" vm-href=\"el.url + '?from=home_cart_float'\"><img vm-src=\"http://static.local/assets/img/el.image_60?=t14307141\"></a></div><div class=\"single_info\"><a class=\"name\" vm-attr-alt=\"el.short_name\" target=\"_blank\" vm-href=\"el.url + '?from=home_cart_float'\">{{el.short_name}}</a><span class=\"price\">￥{{el.item_price}}</span><span class=\"price_plus\"> x </span><span class=\"price_num\">{{el.quantity}}</span></div></div></div><div class=\"con_all\"><div class=\"price_whole\"><span>共<span class=\"num_all\">{{cartInfo.quantity}}</span>件商品</span></div><div><span class=\"price_gongji\">共计<em>￥</em><span class=\"total_price\">{{cartInfo.total_amount}}</span></span><a rel=\"nofollow\" class=\"cart_btn\" href=\"http://cart.jumei.com/i/cart/show/?from=header_cart\">去购物车结算</a></div></div></div></script>","cartbtn":"<div class=\"cart_box\" id=\"cart_box\" vm-class=\"car-current:isOn\"><a rel=\"nofollow\" href=\"http://cart.jumei.com/i/cart/show?from=header_cart\" class=\"cart_link\" id=\"cart\" vm-mouseenter=\"movein\" vm-mouseleave=\"moveout\"><img width=\"28\" height=\"28\" class=\"cart_gif\" src=\"http://p0.jmstatic.com/assets/cart.gif\"><span class=\"text\">去购物车结算</span><span class=\"num\" vm-if=\"cartInfo.quantity > 0\">{{cartInfo.quantity}}</span><s class=\"icon_arrow_right\"></s></a><div id=\"cart_content\" class=\"cart_content\" vm-include=\"tpl_cart\" data-include-rendered=\"render\" vm-mouseenter=\"movein\" vm-mouseleave=\"moveout\"></div></div>","userinfo":"<ul id=\"headerTopLeft\" class=\"header_top_left\" vm-if=\"isLogin\"><li class=\"signin\">欢迎您，<span class=\"col_jumei\"><a target=\"_blank\" href=\"http://www.jumei.com/i/order/list\">JM135ACCE2090</a></span> [ <a href=\"http://passport.jumei.com/i/account/logout\" class=\"signout\">退出</a> ]</li></ul><ul class=\"header_top_left\" id=\"headerTopLeft\" vm-if=\"!isLogin\"><li>欢迎来到聚美！</li><li><a href=\"http://www.jumei.com/i/account/login\" rel=\"nofollow\">请登录</a></li><li><a href=\"http://www.jumei.com/i/account/signup\" rel=\"nofollow\">快速注册</a></li></ul>"};});