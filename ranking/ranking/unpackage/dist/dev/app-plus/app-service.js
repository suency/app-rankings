if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
      throw reason;
    }));
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$3 = {
    components: {},
    onReady() {
      uni.setNavigationBarColor({
        frontColor: "#ffffff"
      });
    },
    data() {
      return {
        displayConfirm: false,
        searchContent: "",
        gpu_list: [],
        cpu_list: [],
        menu_list: [{
          name: "GPU",
          id: 1,
          isActive: true
        }, {
          name: "CPU",
          id: 1,
          isActive: false
        }]
      };
    },
    mounted() {
      this.requestData({
        which: "web_gpu",
        whichList: "",
        platformType: "desktop"
      });
      this.requestData({
        which: "web_cpu",
        whichList: "",
        platformType: "desktop"
      });
    },
    computed: {
      filterGPUList() {
        let that = this;
        return that.gpu_list.filter((item, index) => {
          return item.showName.includes(that.searchContent);
        });
      },
      filterCPUList() {
        let that = this;
        return that.cpu_list.filter((item, index) => {
          return item.showName.includes(that.searchContent);
        });
      }
    },
    methods: {
      searchButton() {
        uni.showTabBar();
        this.displayConfirm = false;
      },
      details(info) {
        uni.navigateTo({
          url: "/pages/details/details?info=" + JSON.stringify(info)
        });
        formatAppLog("log", "at pages/index/index.vue:179", info);
      },
      search() {
        this.displayConfirm = true;
        uni.hideTabBar();
      },
      swichMenu(index) {
        this.menu_list.forEach((e, i) => {
          e.isActive = false;
        });
        this.menu_list[index].isActive = true;
      },
      requestData({
        which,
        whichList,
        platformType
      }) {
        uni.showLoading({
          title: "Loading data..."
        });
        let that = this;
        let url = "";
        switch (uni.getSystemInfoSync().platform) {
          case "android":
            formatAppLog("log", "at pages/index/index.vue:217", "\u8FD0\u884CAndroid\u4E0A");
            url = "http://www1.ludashi.com/web/getRankingList";
            break;
          case "ios":
            formatAppLog("log", "at pages/index/index.vue:222", "\u8FD0\u884CiOS\u4E0A");
            url = "http://www1.ludashi.com/web/getRankingList";
            break;
          default:
            formatAppLog("log", "at pages/index/index.vue:226", "\u8FD0\u884C\u5728\u5F00\u53D1\u8005\u5DE5\u5177\u4E0A");
            url = "/web/getRankingList";
            break;
        }
        uni.request({
          url,
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            which,
            whichList,
            platformType
          },
          success: function(res) {
            if (which === "web_gpu") {
              that.gpu_list = res.data.data;
            } else {
              that.cpu_list = res.data.data;
            }
            uni.hideLoading();
          }
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "dark_mode" }, [
      vue.createElementVNode("view", {
        class: vue.normalizeClass([{ "popup-show": $data.displayConfirm }, "flex-col page space-y-30"])
      }, [
        vue.createElementVNode("view", { class: "topHeader" }, [
          vue.createElementVNode("text", { class: "text" }, "RANKINGS"),
          vue.createElementVNode("view", {
            class: "search",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.search && $options.search(...args))
          }, [
            vue.createElementVNode("image", { src: "/static/search.png" })
          ])
        ]),
        vue.createElementVNode("view", { class: "flex-col space-y-27" }, [
          vue.createElementVNode("view", { class: "flex-row justify-between section_2" }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.menu_list, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: vue.normalizeClass(["flex-col font_1", { "text-wrapper": item.isActive }]),
                key: index,
                onClick: ($event) => $options.swichMenu(index)
              }, vue.toDisplayString(item.name), 11, ["onClick"]);
            }), 128))
          ]),
          vue.createCommentVNode(' <image src="/static/amd_1.png"></image> '),
          vue.createElementVNode("view", { class: "flex-col section_3" }, [
            vue.createElementVNode("view", { class: "flex-col list" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.filterGPUList, (item, i) => {
                return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
                  onClick: ($event) => $options.details(item),
                  style: { "position": "relative" },
                  class: "flex-row list-item",
                  key: i
                }, [
                  vue.createElementVNode("text", { class: "font_2 text_4" }, vue.toDisplayString(item.rank), 1),
                  vue.createElementVNode("view", {
                    class: vue.normalizeClass([[(item == null ? void 0 : item.gpuVendor) == "Nvidia" ? "nvidia" : "amd"], "iconSize"])
                  }, vue.toDisplayString((item == null ? void 0 : item.gpuVendor) == "Nvidia" ? "N" : "A"), 3),
                  vue.createCommentVNode(` <image class="image image_2"\r
								:src="item?.gpuVendor=='Nvidia'?'/static/nvidia_1.png':'/static/amd_1.png'" /> `),
                  vue.createElementVNode("view", { class: "flex-col items-start group_3 space-y-9" }, [
                    vue.createElementVNode("text", { class: "font_3" }, vue.toDisplayString(item.showName), 1),
                    vue.createElementVNode("text", { class: "font_4 text_6" }, vue.toDisplayString(item.score) + " SCORE", 1),
                    vue.createCommentVNode(' <image class="arrow_right" src="/static/Foward.png" /> '),
                    vue.createCommentVNode(' <view class="arrow_right">\n									>\n								</view> ')
                  ])
                ], 8, ["onClick"])), [
                  [vue.vShow, $data.menu_list[0].isActive]
                ]);
              }), 128)),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.filterCPUList, (item, i) => {
                return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
                  onClick: ($event) => $options.details(item),
                  style: { "position": "relative" },
                  class: "flex-row list-item",
                  key: i
                }, [
                  vue.createElementVNode("text", { class: "font_2 text_4" }, vue.toDisplayString(item.rank), 1),
                  vue.createElementVNode("view", {
                    class: vue.normalizeClass([[(item == null ? void 0 : item.kernel) == "" ? "amd" : "intel"], "iconSize"])
                  }, vue.toDisplayString((item == null ? void 0 : item.kernel) == "" ? "A" : "I"), 3),
                  vue.createCommentVNode(` <image class="image image_2"\r
								:src="item?.kernel==''?'/static/amd_1.png':'/static/intel.png'" /> `),
                  vue.createElementVNode("view", { class: "flex-col items-start group_3 space-y-9" }, [
                    vue.createElementVNode("text", { class: "font_3" }, vue.toDisplayString(item.showName), 1),
                    vue.createElementVNode("text", { class: "font_4 text_6" }, vue.toDisplayString(item.score) + " SCORE", 1),
                    vue.createCommentVNode(' <image class="arrow_right" src="/static/Foward.png" /> '),
                    vue.createCommentVNode(' <view class="arrow_right">\n									>\n								</view> ')
                  ])
                ], 8, ["onClick"])), [
                  [vue.vShow, $data.menu_list[1].isActive]
                ]);
              }), 128))
            ])
          ])
        ])
      ], 2),
      $data.displayConfirm ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "masksearch",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.searchButton && $options.searchButton(...args))
      }, [
        vue.createElementVNode("view", { class: "flex-col section_7 space-y-26" }, [
          vue.createElementVNode("text", { class: "font_4 text_10" }, "Search Keyword"),
          vue.createElementVNode("view", { class: "flex-col" }, [
            vue.createElementVNode("view", { class: "flex-col items-start text-wrapper_3" }, [
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.searchContent = $event),
                class: "uni-input",
                focus: "",
                placeholder: "type your search name",
                "placeholder-style": "line-height:50rpx"
              }, null, 512), [
                [vue.vModelText, $data.searchContent]
              ])
            ]),
            vue.createElementVNode("view", { class: "flex-col items-center button" }, [
              vue.createElementVNode("text", { class: "text_12" }, "Search")
            ])
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "/Users/geng/Desktop/work/apps/ranking/ranking/pages/index/index.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "flex-col page" }, [
        vue.createElementVNode("view", { class: "flex-row group space-x-14" }, [
          vue.createElementVNode("image", {
            class: "image",
            src: "/static/arrow_left.png"
          }),
          vue.createElementVNode("text", { class: "text" }, "BACK")
        ]),
        vue.createElementVNode("view", { class: "flex-col group_2" }, [
          vue.createElementVNode("view", { class: "flex-col list space-y-12" }, [
            vue.createElementVNode("view", { class: "flex-col items-start text-wrapper" }, [
              vue.createElementVNode("text", { class: "font_1 text_5" }, "More Infomation")
            ]),
            vue.createElementVNode("view", { class: "flex-row justify-between" }, [
              vue.createElementVNode("text", { class: "font_1" }, "Privacy & Data")
            ])
          ]),
          vue.createElementVNode("view", { class: "flex-col items-start text-wrapper" }, [
            vue.createElementVNode("text", { class: "font_1 text_5" }, "Get help")
          ]),
          vue.createElementVNode("view", { class: "flex-col items-start text-wrapper view_2" }, [
            vue.createElementVNode("text", { class: "font_1 text_5" }, "Log out")
          ])
        ])
      ])
    ]);
  }
  var PagesSettingSetting = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "/Users/geng/Desktop/work/apps/ranking/ranking/pages/setting/setting.vue"]]);
  const _sfc_main$1 = {
    onLoad: function(option) {
      let resData = JSON.parse(option.info);
      delete resData.urlkey;
      this.info = resData;
    },
    data() {
      return {
        info: {}
      };
    },
    methods: {
      goback() {
        uni.navigateBack();
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "detailWrap" }, [
      vue.createElementVNode("view", {
        class: "flex-row group space-x-14 back",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.goback && $options.goback(...args))
      }, [
        vue.createElementVNode("image", {
          class: "image",
          src: "/static/arrow_left.png"
        }),
        vue.createElementVNode("text", { class: "text" }, "BACK")
      ]),
      vue.createElementVNode("view", { class: "flex-col page space-y-24" }, [
        vue.createElementVNode("text", { class: "text" }, vue.toDisplayString($data.info.showName), 1),
        vue.createElementVNode("view", { class: "flex-col space-y-6" }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.info, (val, key, index) => {
            return vue.openBlock(), vue.createElementBlock("view", { class: "flex-row justify-between list-item" }, [
              vue.createElementVNode("text", { class: "font_1 text_2" }, vue.toDisplayString(key), 1),
              vue.createElementVNode("text", { class: "font_1 text_4" }, vue.toDisplayString(val), 1)
            ]);
          }), 256))
        ])
      ])
    ]);
  }
  var PagesDetailsDetails = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "/Users/geng/Desktop/work/apps/ranking/ranking/pages/details/details.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/setting/setting", PagesSettingSetting);
  __definePage("pages/details/details", PagesDetailsDetails);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Users/geng/Desktop/work/apps/ranking/ranking/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
