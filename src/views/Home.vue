<!--
 * @Descripttion: 
 * @version: 
 * @Author: LiuYang
 * @Date: 2022-02-10 06:57:08
 * @LastEditors: LiuYang
 * @LastEditTime: 2022-02-17 20:34:01
-->
<template>
  <div>
    <div class="box">
    <div class="left">
      <div class="t">
        <div id="tui-image-editor"></div>
      </div>
      <div class="imgs">
        <div
          class="img-item"
          v-for="(item, index) in imgsList"
          :key="index"
          @click="changeCurrentImg(item, index)"
          :class="index == activeIndex ? 'active' : ''"
          :style="
            'background: url(' +
            item.path +
            ') no-repeat;background-size: 100% 100%'
          "
        ></div>
      </div>
    </div>
    <div class="right">
      
      <div class="sets">
        
        <div class="row">
          <div class="ipt-title">教师：</div>
          <!-- <el-input v-model="teacher.name" placeholder="教师名称"></el-input> -->

          <el-select
            v-model="teacher"
            placeholder="请选择"
            @change="changeTeacher"
            value-key="value"
          >
            <el-option
              v-for="item in teacherList"
              :key="item.value"
              :label="item.value"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <div class="row">
          <div id="e" class="edit-box"></div>
        </div>
        <div class="row">
          <div class="ipt-title">审美：</div>
          <el-input-number
            v-model="chartData.a"
            :min="0"
            :max="6"
            placeholder="审美"
          ></el-input-number>
        </div>
        <div class="row">
          <div class="ipt-title">创意：</div>
          <el-input-number
            v-model="chartData.b"
            :min="0"
            :max="6"
            placeholder="创意"
          ></el-input-number>
        </div>
        <div class="row">
          <div class="ipt-title">排版：</div>
          <el-input-number
            v-model="chartData.c"
            :min="0"
            :max="6"
            placeholder="排版"
          ></el-input-number>
        </div>
        <div class="row">
          <div class="ipt-title">色彩：</div>
          <el-input-number
            v-model="chartData.d"
            :min="0"
            :max="6"
            placeholder="色彩"
          ></el-input-number>
        </div>
        <div class="row">
          <div class="ipt-title">整体：</div>
          <el-input-number
            v-model="chartData.e"
            :min="0"
            :max="6"
            placeholder="整体"
          ></el-input-number>
        </div>
        <div class="row">
          <div class="ipt-title">字体：</div>
          <el-input-number
            v-model="chartData.f"
            :min="0"
            :max="6"
            placeholder="字体"
          ></el-input-number>
        </div>
        
        <div class="row">
          <div class="ipt-title">背景色：</div>

          <el-color-picker v-model="rgba" popper-class="color-down"></el-color-picker>
        </div>
      </div>
      <div class="action">
        <el-button type="primary" class="next-btn" @click="handlerNext"
          >下一张</el-button
        >
        <input
          type="file"
          id="fileUpload"
          webkitdirectory
          @change="selectImg"
          multiple
        />
      </div>
    </div>

    
  </div>
  <!-- 预览合成效果 -->
    <div id="preview" class="preview" ref="imageWrapper">
      <div class="i" :style="'background:' + rgba">
        <img
          :src="base64Url"
          alt=""
          class="preview-img"
          crossorigin="anonymous"
        />
        <!-- <img src="../assets/logo2.png" alt="" class="logo-s" /> -->
      </div>

      <div class="preview-bottom">
        <div class="msg-box">
          <div class="msg-title">指导意见</div>
          <div class="msg" v-html="msg"></div>
        </div>
        <!-- 雷达图 -->
        <div class="radar" ref="myChart"></div>
      </div>

      <div class="teacher">
        <div class="left">
          <img :src="teacher.avatar" alt="" class="avatar" />
          <div class="names">
            <div>辅导研究员：</div>
            <div>{{ teacher.value }}</div>
          </div>
        </div>
        <img src="../assets/logo2.png" alt="" class="right" />
      </div>
    </div>
  </div>
</template>
<script>
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import ImageEditor from "tui-image-editor";
import html2canvas from "html2canvas";
import E from "wangeditor";
export default {
  data() {
    return {
      instance: null,
      //原图
      imgsList: [],
      activeIndex: 0,
      currentImage: {},
      msg: "",
      base64Url: "", //修改后的图片，单图
      aaa: "",
      chartData: {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,

      },
      myChart: null,
      teacher: {
        labal: "001@shakeup-lab",
        value: "001@shakeup-lab",
        avatar: require("../assets/teacher/001@shakeup-lab.jpg"),
      },
      teacherName: "",
      teacherList: [
        {
          labal: "001@shakeup-lab",
          value: "001@shakeup-lab",
          avatar: require("../assets/teacher/001@shakeup-lab.jpg"),
        },
        {
          labal: "橙子@shakeup-lab",
          value: "橙子@shakeup-lab",
          avatar: require("../assets/teacher/橙子@shakeup-lab.jpg"),
        },
        {
          labal: "超超@shakeup-lab",
          value: "超超@shakeup-lab",
          avatar: require("../assets/teacher/超超@shakeup-lab.jpg"),
        },
        {
          labal: "莓莓@shakeup-lab",
          value: "莓莓@shakeup-lab",
          avatar: require("../assets/teacher/莓莓@shakeup-lab.jpg"),
        },
        {
          labal: "七七@shakeup-lab",
          value: "七七@shakeup-lab",
          avatar: require("../assets/teacher/七七@shakeup-lab.jpg"),
        },
        {
          labal: "阿易@shakeup-lab",
          value: "阿易@shakeup-lab",
          avatar: require("../assets/teacher/阿易@shakeup-lab.jpg"),
        },
        {
          labal: "三三@shakeup-lab",
          value: "三三@shakeup-lab",
          avatar: require("../assets/teacher/三三@shakeup-lab.jpg"),
        },
        {
          labal: "老豆@shakeup-lab",
          value: "老豆@shakeup-lab",
          avatar: require("../assets/teacher/老豆@shakeup-lab.webp"),
        },
        {
          labal: "敦敦@shakeup-lab",
          value: "敦敦@shakeup-lab",
          avatar: require("../assets/teacher/敦敦@shakeup-lab.jpg"),
        },
        {
          labal: "九九@shakeup-lab",
          value: "九九@shakeup-lab",
          avatar: require("../assets/teacher/九久@shakeup-lab.webp"),
        },
      ],
      rgba: "",
      editor: null,
    };
  },
  mounted() {
    this.init();
    this.initE();
    this.initChart();
  },
  methods: {
    init() {
      const locale_zh = {
        ZoomIn: "放大",
        ZoomOut: "缩小",
        Hand: "手掌",
        History: "历史",
        Resize: "调整宽高",
        Crop: "裁剪",
        DeleteAll: "全部删除",
        Delete: "删除",
        Undo: "撤销",
        Redo: "反撤销",
        Reset: "重置",
        Flip: "镜像",
        Rotate: "旋转",
        Draw: "画",
        Shape: "形状标注",
        Icon: "图标标注",
        Text: "文字标注",
        Mask: "遮罩",
        Filter: "滤镜",
        Bold: "加粗",
        Italic: "斜体",
        Underline: "下划线",
        Left: "左对齐",
        Center: "居中",
        Right: "右对齐",
        Color: "颜色",
        "Text size": "字体大小",
        Custom: "自定义",
        Square: "正方形",
        Apply: "应用",
        Cancel: "取消",
        "Flip X": "X 轴",
        "Flip Y": "Y 轴",
        Range: "区间",
        Stroke: "描边",
        Fill: "填充",
        Circle: "圆",
        Triangle: "三角",
        Rectangle: "矩形",
        Free: "曲线",
        Straight: "直线",
        Arrow: "箭头",
        "Arrow-2": "箭头2",
        "Arrow-3": "箭头3",
        "Star-1": "星星1",
        "Star-2": "星星2",
        Polygon: "多边形",
        Location: "定位",
        Heart: "心形",
        Bubble: "气泡",
        "Custom icon": "自定义图标",
        "Load Mask Image": "加载蒙层图片",
        Grayscale: "灰度",
        Blur: "模糊",
        Sharpen: "锐化",
        Emboss: "浮雕",
        "Remove White": "除去白色",
        Distance: "距离",
        Brightness: "亮度",
        Noise: "噪音",
        "Color Filter": "彩色滤镜",
        Sepia: "棕色",
        Sepia2: "棕色2",
        Invert: "负片",
        Pixelate: "像素化",
        Threshold: "阈值",
        Tint: "色调",
        Multiply: "正片叠底",
        Blend: "混合色",
        Width: "宽度",
        Height: "高度",
        "Lock Aspect Ratio": "锁定宽高比例",
      };
      const customTheme = {
        "common.bi.image": require("../assets/logo2.png"), // 左上角logo图片
        "common.bisize.width": "130px",
        "common.bisize.height": "34px",
        // "common.backgroundImage": "none",
        // "common.backgroundColor": "#f3f4f6",
        // "common.border": "1px solid #333",

        // header
        // "header.backgroundImage": "none",
        // "header.backgroundColor": "#f3f4f6",
        // "header.border": "0px",

        // load button
        "loadButton.backgroundColor": "#fff",
        "loadButton.border": "1px solid #ddd",
        "loadButton.color": "#222",
        "loadButton.fontFamily": "NotoSans, sans-serif",
        "loadButton.fontSize": "12px",
        "loadButton.display": "none", // 隐藏

        // download button
        "downloadButton.backgroundColor": "#fdba3b",
        "downloadButton.border": "1px solid #fdba3b",
        "downloadButton.color": "#fff",
        "downloadButton.fontFamily": "NotoSans, sans-serif",
        "downloadButton.fontSize": "12px",
        "downloadButton.display": "none", // 隐藏
      };
      this.instance = new ImageEditor(
        document.querySelector("#tui-image-editor"),
        {
          includeUI: {
            loadImage: this.currentImage,
            initMenu: "draw", // 默认打开的菜单项
            menuBarPosition: "left", // 菜单所在的位置
            locale: locale_zh,
            theme: customTheme, // 自定义样式
          },
          cssMaxWidth: 1000, // canvas 最大宽度
          cssMaxHeight: 600, // canvas 最大高度
        }
      );
      document.getElementsByClassName("tui-image-editor-main")[0].style.top =
        "45px"; // 图片距顶部工具栏的距离

      this.isPng();
    },
    changeCurrentImg(item, index) {
      this.activeIndex = index;
      this.currentImage = item;
      this.instance.loadImageFromURL(item.path, item.name);
      // this.init();
      console.log("currentImage", this.currentImage);
      this.isPng();
    },
    isPng() {
      if (this.currentImage.name) {
        if (
          this.currentImage.name.indexOf("png") == -1 &&
          this.currentImage.name.indexOf("PNG") == -1
        ) {
          this.getRgba();
        } else {
          this.rgba = "#fff";
        }
      }
    },
    getRgba() {
      setTimeout(() => {
        let c = document.getElementsByClassName("lower-canvas")[0];
        let width = c.width;
        let height = c.height;

        let ctx = c.getContext("2d");
        let imgData = ctx.getImageData(10, 10, width, height);
        let rgba = `rgba(${imgData.data[2]},${imgData.data[1]},${imgData.data[2]},${imgData.data[3]})`;
        this.rgba = rgba;
        // console.log(c.width);
      }, 1000);
    },
    handlerNext() {
      this.getEditImg();
    },
    //上传文件夹
    selectImg(e) {
      // e.target.files = null;
      const _this = this;
      let imgList = Array.from(e.target.files);
      imgList.forEach((item) => {
        // getObjectURL(item);
        _this.imgsList.push({
          path: getObjectURL(item),
          name: item.name,
        });
      });
      if (!this.currentImage.path) {
        this.currentImage = _this.imgsList[0];
        this.init();
      }
      function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      }
    },
    //获取修改后的图片
    getEditImg() {
      this.initChart();
      this.base64Url = this.instance.toDataURL();
      console.log(this.base64Url);
      setTimeout(() => {
        this.saveImage();
      }, 500);
    },
    async saveImage() {
      let dom = this.$refs["imageWrapper"];
      let res = await html2canvas(dom, {
        scale: 3, // 设备像素比

        useCORS: true,
      });
      let canvasImg = res.toDataURL("image/png");

      let filename = "已批改" + this.imgsList[this.activeIndex].name;
      this.saveFile(filename, canvasImg);
    },
    //图片导出
    saveFile(filename, content) {
      var base64Img = content;
      var oA = document.createElement("a");
      oA.href = base64Img;
      oA.download = filename;
      var event = document.createEvent("MouseEvents");
      event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      oA.dispatchEvent(event);
      if (this.activeIndex >= this.imgsList.length - 1) {
        return this.$message("已是最后一张");
      }
      this.activeIndex++;
      let item = this.imgsList[this.activeIndex];
      this.currentImage = item;
      this.instance.loadImageFromURL(item.path, item.name);
      this.base64Url = "";
    },
    initChart() {
      let data = [];
      for(let key in this.chartData){
        data.push(this.chartData[key])
      }
      this.myChart = this.$echarts.init(this.$refs.myChart, null, {
        renderer: "svg",
      });
      // 绘制图表
      this.myChart.setOption({
        radar: [
          {
            //这是雷达图的大小
            radius: "60%",
            //图外名称
            name: {
              formatter: "{value}",
              // 字体样式
              textStyle: {
                fontSize: 12,
                color: "#A3A3A3",
              },
            },
            indicator: [
              {
                name: "审美",
                max: 6,
              },
              {
                name: "创意",
                max: 6,
              },
              {
                name: "排版",
                max: 6,
              },
              {
                name: "色彩",
                max: 6,
              },
              {
                name: "整体",
                max: 6,
              },
              {
                name: "字体",
                max: 6,
              },
            ],
            //文字与图的距离
            nameGap: 3,
            //指示器轴的分割段数
            splitNumber: 6,

            //分割区域是否显示
            splitArea: {
              show: false,
              areaStyle: {
                color: "#292929", // 图表背景的颜色
              },
            },
          },
        ],
        series: [
          {
            type: "radar",
            symbol: "none",
            data: [
              {
                value: data,
                name: "评分",
                areaStyle: {
                  color: "#123BEC",
                },
                itemStyle: {
                  normal: {
                    color: "rgba(255,225,0,.1)",
                    lineStyle: {
                      color: "rgba(255,225,0,.1)",
                    },
                  },
                },
              },
            ],
          },
        ],
      });
    },
    changeTeacher(value) {
      console.log("teacherName", this.teacherName);
      console.log("返回值", value);

      // let current = this.teacherList.find(item => {
      //   return item.value = value
      // })
      // console.log(current);
      // this.teacher = current
    },
    initE() {
      this.editor = new E("#e");
      //这里各位小伙伴可以查询官网，根据自己的需求进行菜单栏调整
      this.editor.config.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "list", // 列表
        "justify", // 对齐方式
        "lineHeight"
      ];
      this.editor.create();
      this.editor.config.onchange = (html) => {
        this.msg = html; // 绑定当前逐渐地值
      };
    },
  },
};
</script>

<style>
.w-e-menu {
    z-index: 2 !important;
  }
  .w-e-text-container {
    z-index: 1 !important;
  }
  .w-e-toolbar {
    z-index: 1 !important;
    
  }
</style>
<style lang="less" scoped>
.box {
  display: flex;
  width: 100%;
}
.left {
  width: 80%;
  .t {
    width: 100%;
    height: 80vh;
  }
  .imgs {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // height: 100px;
  width: 100%;
  .img-item {
    height: 100px;
    width: 80px;
    margin: 10px 10px 0 0;
    cursor: pointer;
    background: url() no-repeat;
    background-size: 100% 100%;
  }
  .active {
    width: 90px;
    height: 110px;
    border: 2px solid red;
  }
}
  
}
.right {
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 20%;
  .sets {
    width: 100%;
    padding-left: 10px;
    .row {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .ipt-title {
        width: 80px;
        font-size: 14px;
      }
    }
  }
  .action {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .next-btn {
      margin: 0 10px;
    }
  }
}



//预览
.preview {
  background-color: #292929;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 10px;
  width: 672px;
  .i {
    // position: relative;
    display: flex;
    justify-content: center;
    width: 640px;
    height: 360px;
    border-radius: 6px;
    background-color: rgba(93, 157, 93, 255);
    overflow: hidden;
  }
  .preview-img {
    display: block;
    height: 360px;
    max-width: 100%;
    border: none;
    
  }
  .preview-bottom {
    display: flex;
    width: 640px;
    padding-left: 8px;
    .msg-box {
      width: 385px;
      .msg-title {
        font-size: 16px;
        color: #fff;
        margin: 25px 0 10px;
      }
      /deep/.msg {
        font-size: 12px;
        color: #a3a3a3;
        word-wrap: break-word;
        word-break: break-all;
        p,span,div,h1,h2,h3,h4,h5,h6,li,ul,ol, {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
      }
    }
    .radar {
      width: 255px;
      height: 160px;
      margin-top: 20px;
    }
  }

  .teacher {
    padding: 24px 0 0 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
      .names {
        color: #a3a3a3;
        font-size: 12px;
        margin-left: 10px;
      }
    }
    .right {
      width: 114px;
    }
  }
}
.edit-box {
  // height: 300px;
  width: 100%;
 
}
// /deep/.el-select-dropdown,.el-popper  {
//   z-index: 99999;
// }

</style>
