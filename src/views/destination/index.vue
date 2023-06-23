<template>
  <div class="container">
    <div class="image_input" style="position:relative">

      <img :src="article.cover" alt="" style="height:100%;width:100%;">
      <div class="input" style="top:0px">
        <div class="words" style="font-size:20px;margin-left:15px;margin-top:20px;margin-bottom:15px;color:white">
          Don't fear the unknown!
        </div>
        <div>
          <el-input v-model="inputDes" placeholder="我想去..." style="width: 250px;margin-left:15px;margin-right:15px;font-size:20px;" class="filter-item" />
          <el-button v-waves class="des_choices" type="warning" icon="el-icon-search" style="" @click="goDes(inputDes)">
            查询
          </el-button>
        </div>

        <div class="des_choices" style="height:20px;font-size:14px;width:200px;color:white;margin-top:15px;margin-left:15px">
          <!-- 热门城市 -->
          <a v-for="des in hotDes" :id="des.id" :key="des.id" href="javascript:void(0);" @click="findCity($event)">{{ des.cityName }}</a>
        </div>
      </div>

      <div class="descri" style="width:700px;position:absolute;right:15%;top:20%">
        <div style="border-right:7px dashed #77a6df;padding-right:100px">
          <h1>{{ article.title }}</h1>
          <p style="text-shadow:0px 1px 0px black;line-height:22px;font-size:17px">{{ article.content }}</p>
        </div>
        <router-link :to="{name:'Display',params:{id:article.id} }">
          <h3><u>阅读攻略</u></h3>
        </router-link>
      </div>

    </div>

    <div class="hot_pick">
      <div class="h_title">
        <h2 style="font-weight:normal;margin-bottom:0px">热门目的地</h2>
      </div>
      <div style="text-align:center;height:50px">

        <span v-for="item in level" :id="item.id" :key="item.id" class="h_li" @mouseenter="handleEnter(item.id)" @mouseleave="handleLeave(item.id)">

          {{ item.name }}

        </span>

      </div>
      <div style="margin-left:400px;">
        <div id="hd1" class="hot-list clearfix hide">
          <div class="col">
            <dl>
              <dt>直辖市</dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">北京</a>
                <a href="javascript:void(0);" @click="findCity($event)">上海</a>

                <a href="javascript:void(0);" @click="findCity($event)">重庆</a>
                <a href="javascript:void(0);" @click="findCity($event)">天津</a>
              </dd>
            </dl>
            <dl>
              <dt><a href="javascript:void(0);" @click="findCity($event)">云南</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">丽江</a>
                <a href="javascript:void(0);" @click="findCity($event)">大理</a>
                <a href="javascript:void(0);" @click="findCity($event)">昆明</a>
                <a href="javascript:void(0);" @click="findCity($event)">香格里拉</a>
                <a href="javascript:void(0);" @click="findCity($event)">泸沽湖</a>
                <a href="javascript:void(0);" @click="findCity($event)">双廊</a>
                <a href="javascript:void(0);" @click="findCity($event)">西双版纳</a>
                <a href="javascript:void(0);" @click="findCity($event)">束河</a>
                <a href="javascript:void(0);" @click="findCity($event)">腾冲</a>
                <a href="javascript:void(0);" @click="findCity($event)">雨崩</a>
              </dd>
            </dl>
            <dl>
              <dt><a href="javascript:void(0);" @click="findCity($event)">四川</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">成都</a>
                <a href="javascript:void(0);" @click="findCity($event)">九寨沟</a>
                <a href="javascript:void(0);" @click="findCity($event)">稻城</a>
                <a href="javascript:void(0);" @click="findCity($event)">色达</a>
                <a href="javascript:void(0);" @click="findCity($event)">若尔盖</a>
                <a href="javascript:void(0);" @click="findCity($event)">都江堰</a>
                <a href="javascript:void(0);" @click="findCity($event)">亚丁</a>
                <a href="javascript:void(0);" @click="findCity($event)">阿坝</a>
                <a href="javascript:void(0);" @click="findCity($event)">峨眉山</a>
                <a href="javascript:void(0);" @click="findCity($event)">牛背山</a>
              </dd>
            </dl>
            <dl>
              <dt><a href="javascript:void(0);" @click="findCity($event)">浙江</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">杭州</a>
                <a href="javascript:void(0);" @click="findCity($event)">乌镇</a>
                <a href="javascript:void(0);" @click="findCity($event)">西塘</a>
                <a href="javascript:void(0);" @click="findCity($event)">千岛湖</a>
                <a href="javascript:void(0);" @click="findCity($event)">普陀山</a>
                <a href="javascript:void(0);" @click="findCity($event)">东极岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">南浔</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">海南</a>
                <a href="javascript:void(0);" @click="findCity($event)">福建</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">三亚</a>
                <a href="javascript:void(0);" @click="findCity($event)">蜈支洲岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">海口</a>
                <a href="javascript:void(0);" @click="findCity($event)">厦门</a>
                <a href="javascript:void(0);" @click="findCity($event)">鼓浪屿</a>
                <a href="javascript:void(0);" @click="findCity($event)">武夷山</a>
                <a href="javascript:void(0);" @click="findCity($event)">泉州</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">江苏</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">南京</a>
                <a href="javascript:void(0);" @click="findCity($event)">苏州</a>
                <a href="javascript:void(0);" @click="findCity($event)">无锡</a>
                <a href="javascript:void(0);" @click="findCity($event)">扬州</a>
                <a href="javascript:void(0);" @click="findCity($event)">周庄</a>
                <a href="javascript:void(0);" @click="findCity($event)">常州</a>
                <a href="javascript:void(0);" @click="findCity($event)">连云港</a>
                <a href="javascript:void(0);" @click="findCity($event)">同里</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">广东</a>
                <a href="javascript:void(0);" @click="findCity($event)">广西</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">广州</a>
                <a href="javascript:void(0);" @click="findCity($event)">深圳</a>
                <a href="javascript:void(0);" @click="findCity($event)">珠海</a>
                <a href="javascript:void(0);" @click="findCity($event)">汕头</a>
                <a href="javascript:void(0);" @click="findCity($event)">桂林</a>
                <a href="javascript:void(0);" @click="findCity($event)">阳朔</a>
                <a href="javascript:void(0);" @click="findCity($event)">北海</a>
                <a href="javascript:void(0);" @click="findCity($event)">黄姚古镇</a>
                <a href="javascript:void(0);" @click="findCity($event)">涠洲岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">龙脊梯田</a>
              </dd>
            </dl>
          </div>

          <div class="col">
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">西藏</a>
                <a href="javascript:void(0);" @click="findCity($event)">贵州</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">拉萨</a>
                <a href="javascript:void(0);" @click="findCity($event)">林芝</a>
                <a href="javascript:void(0);" @click="findCity($event)">阿里</a>
                <a href="javascript:void(0);" @click="findCity($event)">黔东南</a>
                <a href="javascript:void(0);" @click="findCity($event)">荔波</a>
                <a href="javascript:void(0);" @click="findCity($event)">镇远</a>
                <a href="javascript:void(0);" @click="findCity($event)">西江</a>
                <a href="javascript:void(0);" @click="findCity($event)">黄果树</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">西北</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">西安</a>
                <a href="javascript:void(0);" @click="findCity($event)">青海湖</a>
                <a href="javascript:void(0);" @click="findCity($event)">西宁</a>
                <a href="javascript:void(0);" @click="findCity($event)">祁连</a>
                <a href="javascript:void(0);" @click="findCity($event)">敦煌</a>
                <a href="javascript:void(0);" @click="findCity($event)">兰州</a>
                <a href="javascript:void(0);" @click="findCity($event)">甘南</a>
                <a href="javascript:void(0);" @click="findCity($event)">张掖</a>
                <a href="javascript:void(0);" @click="findCity($event)">嘉峪关</a>
                <a href="javascript:void(0);" @click="findCity($event)">新疆</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">山东</a>
                <a href="javascript:void(0);" @click="findCity($event)">山西</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">青岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">泰山</a>
                <a href="javascript:void(0);" @click="findCity($event)">日照</a>
                <a href="javascript:void(0);" @click="findCity($event)">威海</a>
                <a href="javascript:void(0);" @click="findCity($event)">烟台</a>
                <a href="javascript:void(0);" @click="findCity($event)">长岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">蓬莱</a>
                <a href="javascript:void(0);" @click="findCity($event)">平遥</a>
                <a href="javascript:void(0);" @click="findCity($event)">大同</a>
                <a href="javascript:void(0);" @click="findCity($event)">五台山</a>
                <a href="javascript:void(0);" @click="findCity($event)">壶口瀑布</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">湖南</a>
                <a href="javascript:void(0);" @click="findCity($event)">湖北</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">张家界</a>
                <a href="javascript:void(0);" @click="findCity($event)">凤凰</a>
                <a href="javascript:void(0);" @click="findCity($event)">郴州</a>
                <a href="javascript:void(0);" @click="findCity($event)">武汉</a>
                <a href="javascript:void(0);" @click="findCity($event)">恩施</a>
                <a href="javascript:void(0);" @click="findCity($event)">神农架</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">安徽</a>
                <a href="javascript:void(0);" @click="findCity($event)">江西</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">黄山</a>
                <a href="javascript:void(0);" @click="findCity($event)">宏村</a>
                <a href="javascript:void(0);" @click="findCity($event)">婺源</a>
                <a href="javascript:void(0);" @click="findCity($event)">景德镇</a>
                <a href="javascript:void(0);" @click="findCity($event)">庐山</a>
                <a href="javascript:void(0);" @click="findCity($event)">三清山</a>
                <a href="javascript:void(0);" @click="findCity($event)">南昌</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">河北</a>
                <a href="javascript:void(0);" @click="findCity($event)">河南</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">北戴河</a>
                <a href="javascript:void(0);" @click="findCity($event)">秦皇岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">承德</a>
                <a href="javascript:void(0);" @click="findCity($event)">张北</a>
                <a href="javascript:void(0);" @click="findCity($event)">少林寺</a>
                <a href="javascript:void(0);" @click="findCity($event)">洛阳</a>
                <a href="javascript:void(0);" @click="findCity($event)">龙门石窟</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">内蒙古</a>
                <a href="javascript:void(0);" @click="findCity($event)">东北</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">呼伦贝尔</a>
                <a href="javascript:void(0);" @click="findCity($event)" />
                <a href="javascript:void(0);" @click="findCity($event)">阿尔山</a>
                <a href="javascript:void(0);" @click="findCity($event)">海拉尔</a>
                <a href="javascript:void(0);" @click="findCity($event)" />
                <a href="javascript:void(0);" @click="findCity($event)">哈尔滨</a>
                <a href="javascript:void(0);" @click="findCity($event)">漠河</a>
                <a href="javascript:void(0);" @click="findCity($event)">雪乡</a>
                <a href="javascript:void(0);" @click="findCity($event)">大连</a>
                <a href="javascript:void(0);" @click="findCity($event)">丹东</a>
                <a href="javascript:void(0);" @click="findCity($event)">盘锦</a>
              </dd>
            </dl>
          </div>

          <div style="clear:both;" />
        </div>

        <div id="hd2" class="hot-list clearfix hide">
          <div class="col">
            <dl>
              <dt><a href="javascript:void(0);" @click="findCity($event)">台湾</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">台北</a>
                <a href="javascript:void(0);" @click="findCity($event)">垦丁</a>
                <a href="javascript:void(0);" @click="findCity($event)">花莲</a>
                <a href="javascript:void(0);" @click="findCity($event)">高雄</a>
                <a href="javascript:void(0);" @click="findCity($event)">台中</a>
                <a href="javascript:void(0);" @click="findCity($event)">九份</a>
                <a href="javascript:void(0);" @click="findCity($event)">南投</a>
                <a href="javascript:void(0);" @click="findCity($event)">阿里山</a>
              </dd>
            </dl>
          </div>
          <div class="col">
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">香港</a>
                <a href="javascript:void(0);" @click="findCity($event)">澳门</a>
              </dt>
            </dl>
          </div>
        </div>
        <div id="hd3" class="hot-list clearfix hide">
          <div class="col">
            <dl>
              <dt><a href="javascript:void(0);" @click="findCity($event)">日本</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">东京</a>
                <a href="javascript:void(0);" @click="findCity($event)">大阪</a>
                <a href="javascript:void(0);" @click="findCity($event)">京都</a>
                <a href="javascript:void(0);" @click="findCity($event)">冲绳</a>
                <a href="javascript:void(0);" @click="findCity($event)">北海道</a>
                <a href="javascript:void(0);" @click="findCity($event)">箱根</a>
                <a href="javascript:void(0);" @click="findCity($event)">札幌</a>
                <a href="javascript:void(0);" @click="findCity($event)">奈良</a>
                <a href="javascript:void(0);" @click="findCity($event)">名古屋</a>
                <a href="javascript:void(0);" @click="findCity($event)">福冈</a>
                <a href="javascript:void(0);" @click="findCity($event)">神户</a>
                <a href="javascript:void(0);" @click="findCity($event)">那霸</a>
                <a href="javascript:void(0);" @click="findCity($event)">函馆</a>
                <a href="javascript:void(0);" @click="findCity($event)">小樽</a>
                <a href="javascript:void(0);" @click="findCity($event)">镰仓</a>
              </dd>
            </dl>
          </div>

        </div>
        <div id="hd4" class="hot-list clearfix hide">
          <div class="col">
            <dl>
              <dt><a href="javascript:void(0);" @click="findCity($event)">泰国</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">普吉岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">清迈</a>
                <a href="javascript:void(0);" @click="findCity($event)">曼谷</a>
                <a href="javascript:void(0);" @click="findCity($event)">苏梅岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">甲米</a>
                <a href="javascript:void(0);" @click="findCity($event)">芭提雅</a>
                <a href="javascript:void(0);" @click="findCity($event)">象岛</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">新加坡</a>
                <a href="javascript:void(0);" @click="findCity($event)">印尼</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">新加坡</a>
                <a href="javascript:void(0);" @click="findCity($event)">巴厘岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">民丹岛</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">马来西亚</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">沙巴</a>
                <a href="javascript:void(0);" @click="findCity($event)">仙本那</a>
                <a href="javascript:void(0);" @click="findCity($event)">吉隆坡</a>
                <a href="javascript:void(0);" @click="findCity($event)">兰卡威</a>
              </dd>
            </dl>
          </div>
          <div class="col">
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">越南</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">芽庄</a>
                <a href="javascript:void(0);" @click="findCity($event)">岘港</a>
                <a href="javascript:void(0);" @click="findCity($event)">美奈</a>
                <a href="javascript:void(0);" @click="findCity($event)">大叻</a>
                <a href="javascript:void(0);" @click="findCity($event)">河内</a>
                <a href="javascript:void(0);" @click="findCity($event)">胡志明市</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">柬埔寨</a>
                <a href="javascript:void(0);" @click="findCity($event)">缅甸</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">吴哥窟</a>
                <a href="javascript:void(0);" @click="findCity($event)">暹粒</a>
                <a href="javascript:void(0);" @click="findCity($event)">金边</a>
                <a href="javascript:void(0);" @click="findCity($event)">仰光</a>
                <a href="javascript:void(0);" @click="findCity($event)">蒲甘</a>
                <a href="javascript:void(0);" @click="findCity($event)">曼德勒</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">菲律宾</a>
                <a href="javascript:void(0);" @click="findCity($event)">文莱</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">长滩岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">杜马盖地</a>
                <a href="javascript:void(0);" @click="findCity($event)">薄荷岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">宿雾</a>
                <a href="javascript:void(0);" @click="findCity($event)">文莱</a>
              </dd>
            </dl>
          </div>
        </div>
        <div id="hd5" class="hot-list clearfix hide">
          <div class="col">
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">马尔代夫</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">马累</a>
                <a href="javascript:void(0);" @click="findCity($event)">阿雅达岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">薇拉瓦鲁岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">宁静岛</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">阿联酋</a>
                <a href="javascript:void(0);" @click="findCity($event)">伊朗</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">迪拜</a>
                <a href="javascript:void(0);" @click="findCity($event)">阿布扎比</a>
                <a href="javascript:void(0);" @click="findCity($event)">德黑兰</a>
                <a href="javascript:void(0);" @click="findCity($event)">伊斯法罕</a>
                <a href="javascript:void(0);" @click="findCity($event)">设拉子</a>
              </dd>
            </dl>
          </div>
          <div class="col">
            <dl>
              <dt><a href="javascript:void(0);" @click="findCity($event)">斯里兰卡</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">科伦坡</a>
                <a href="javascript:void(0);" @click="findCity($event)">康提</a>
                <a href="javascript:void(0);" @click="findCity($event)">努沃勒埃利耶</a>
                <a href="javascript:void(0);" @click="findCity($event)">尼甘布</a>
              </dd>
            </dl>
            <dl>
              <dt><a href="javascript:void(0);" @click="findCity($event)">尼泊尔</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">加德满都</a>
                <a href="javascript:void(0);" @click="findCity($event)">博卡拉</a>
                <a href="javascript:void(0);" @click="findCity($event)">巴德岗</a>
              </dd>
            </dl>
            <dl>
              <dt><a href="javascript:void(0);" @click="findCity($event)">印度</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">新德里</a>
                <a href="javascript:void(0);" @click="findCity($event)">孟买</a>
                <a href="javascript:void(0);" @click="findCity($event)">阿格拉</a>
                <a href="javascript:void(0);" @click="findCity($event)">斋普尔</a>
                <a href="javascript:void(0);" @click="findCity($event)">瓦拉纳西</a>
              </dd>
            </dl>
          </div>
        </div>
        <div id="hd6" class="hot-list clearfix hide">
          <div class="col">
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">美国</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">洛杉矶</a>
                <a href="javascript:void(0);" @click="findCity($event)">旧金山</a>
                <a href="javascript:void(0);" @click="findCity($event)">纽约</a>
                <a href="javascript:void(0);" @click="findCity($event)">塞班岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">夏威夷</a>
                <a href="javascript:void(0);" @click="findCity($event)">关岛</a>
                <a href="javascript:void(0);" @click="findCity($event)">西雅图</a>
                <a href="javascript:void(0);" @click="findCity($event)">华盛顿</a>
                <a href="javascript:void(0);" @click="findCity($event)">波士顿</a>
                <a href="javascript:void(0);" @click="findCity($event)">奥兰多</a>
                <a href="javascript:void(0);" @click="findCity($event)">迈阿密</a>
                <a href="javascript:void(0);" @click="findCity($event)">芝加哥</a>
                <a href="javascript:void(0);" @click="findCity($event)">阿拉斯加</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">英国</a>
                <a href="javascript:void(0);" @click="findCity($event)">爱尔兰</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">伦敦</a>
                <a href="javascript:void(0);" @click="findCity($event)">爱丁堡</a>
                <a href="javascript:void(0);" @click="findCity($event)">剑桥</a>
                <a href="javascript:void(0);" @click="findCity($event)">牛津</a>
                <a href="javascript:void(0);" @click="findCity($event)">约克</a>
                <a href="javascript:void(0);" @click="findCity($event)">都柏林</a>
              </dd>
            </dl>
            <dl>
              <dt><a href="javascript:void(0);" @click="findCity($event)">意大利</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">罗马</a>
                <a href="javascript:void(0);" @click="findCity($event)">威尼斯</a>
                <a href="javascript:void(0);" @click="findCity($event)">佛罗伦萨</a>
                <a href="javascript:void(0);" @click="findCity($event)">米兰</a>
                <a href="javascript:void(0);" @click="findCity($event)">五渔村</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">法国</a>
                <a href="javascript:void(0);" @click="findCity($event)">瑞士</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">巴黎</a>
                <a href="javascript:void(0);" @click="findCity($event)">普罗旺斯</a>
                <a href="javascript:void(0);" @click="findCity($event)">卢塞恩</a>
                <a href="javascript:void(0);" @click="findCity($event)">苏黎世</a>
                <a href="javascript:void(0);" @click="findCity($event)">因特拉肯</a>
                <a href="javascript:void(0);" @click="findCity($event)">日内瓦</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">西班牙</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">巴塞罗那</a>
                <a href="javascript:void(0);" @click="findCity($event)">马德里</a>
                <a href="javascript:void(0);" @click="findCity($event)">塞维利亚</a>
                <a href="javascript:void(0);" @click="findCity($event)">格拉纳达</a>
                <a href="javascript:void(0);" @click="findCity($event)">托莱多</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">葡萄牙</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">里斯本</a>
                <a href="javascript:void(0);" @click="findCity($event)">波尔图</a>
                <a href="javascript:void(0);" @click="findCity($event)">辛特拉</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">俄罗斯</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">莫斯科</a>
                <a href="javascript:void(0);" @click="findCity($event)">贝加尔湖</a>
                <a href="javascript:void(0);" @click="findCity($event)">圣彼得堡</a>
                <a href="javascript:void(0);" @click="findCity($event)">海参崴</a>
              </dd>
            </dl>
          </div>
          <div class="col">
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">德国</a>
                <a href="javascript:void(0);" @click="findCity($event)">奥地利</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">慕尼黑</a>
                <a href="javascript:void(0);" @click="findCity($event)">法兰克福</a>
                <a href="javascript:void(0);" @click="findCity($event)">柏林</a>
                <a href="javascript:void(0);" @click="findCity($event)">科隆</a>
                <a href="javascript:void(0);" @click="findCity($event)">福森</a>
                <a href="javascript:void(0);" @click="findCity($event)">维也纳</a>
                <a href="javascript:void(0);" @click="findCity($event)">哈尔施塔特</a>
                <a href="javascript:void(0);" @click="findCity($event)">萨尔茨堡</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">希腊</a>
                <a href="javascript:void(0);" @click="findCity($event)">土耳其</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">圣托里尼</a>
                <a href="javascript:void(0);" @click="findCity($event)">雅典</a>
                <a href="javascript:void(0);" @click="findCity($event)">伊斯坦布尔</a>
                <a href="javascript:void(0);" @click="findCity($event)">棉花堡</a>
                <a href="javascript:void(0);" @click="findCity($event)">卡帕多奇亚</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">捷克</a>
                <a href="javascript:void(0);" @click="findCity($event)">匈牙利</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">布拉格</a>
                <a href="javascript:void(0);" @click="findCity($event)">克鲁姆洛夫</a>
                <a href="javascript:void(0);" @click="findCity($event)">卡罗维发利</a>
                <a href="javascript:void(0);" @click="findCity($event)">布达佩斯</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">冰岛</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">雷克雅未克</a>
                <a href="javascript:void(0);" @click="findCity($event)">维克</a>
                <a href="javascript:void(0);" @click="findCity($event)">阿克雷里</a>
                <a href="javascript:void(0);" @click="findCity($event)">霍芬</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">荷兰</a>
                <a href="javascript:void(0);" @click="findCity($event)">比利时</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">阿姆斯特丹</a>
                <a href="javascript:void(0);" @click="findCity($event)">鹿特丹</a>
                <a href="javascript:void(0);" @click="findCity($event)">羊角村</a>
                <a href="javascript:void(0);" @click="findCity($event)">布鲁塞尔</a>
                <a href="javascript:void(0);" @click="findCity($event)">布鲁日</a>
              </dd>
            </dl>
            <dl>
              <dt>美洲其他</dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">加拿大</a>
                <a href="javascript:void(0);" @click="findCity($event)">巴西</a>
                <a href="javascript:void(0);" @click="findCity($event)">古巴</a>
                <a href="javascript:void(0);" @click="findCity($event)">墨西哥</a>
                <a href="javascript:void(0);" @click="findCity($event)">秘鲁</a>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">欧洲其他</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">芬兰</a>
                <a href="javascript:void(0);" @click="findCity($event)">挪威</a>
                <a href="javascript:void(0);" @click="findCity($event)">丹麦</a>
                <a href="javascript:void(0);" @click="findCity($event)">瑞典</a>
                <a href="javascript:void(0);" @click="findCity($event)">塞尔维亚</a>
                <a href="javascript:void(0);" @click="findCity($event)">克罗地亚</a>
              </dd>
            </dl>
          </div>
        </div>
        <div id="hd7" class="hot-list clearfix hide">
          <div class="col">
            <dl>
              <dt><a href="javascript:void(0);" @click="findCity($event)">澳大利亚</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">悉尼</a>
                <a href="javascript:void(0);" @click="findCity($event)">墨尔本</a>
                <a href="javascript:void(0);" @click="findCity($event)">凯恩斯</a>
                <a href="javascript:void(0);" @click="findCity($event)">大堡礁</a>
                <a href="javascript:void(0);" @click="findCity($event)">黄金海岸</a>
                <a href="javascript:void(0);" @click="findCity($event)">布里斯班</a>
              </dd>
            </dl>
            <dl>
              <dt><a href="javascript:void(0);" @click="findCity($event)">新西兰</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">奥克兰</a>
                <a href="javascript:void(0);" @click="findCity($event)">皇后镇</a>
                <a href="javascript:void(0);" @click="findCity($event)">基督城</a>
              </dd>
            </dl>
            <dl>
              <dt>澳洲其他</dt>
              <dd>

                <a href="javascript:void(0);" @click="findCity($event)">斐济</a>
                <a href="javascript:void(0);" @click="findCity($event)">大溪地</a>
              </dd>
            </dl>
          </div>
          <div class="col">
            <dl>
              <dt>
                <a href="javascript:void(0);" @click="findCity($event)">埃及</a>
              </dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">开罗</a>
                <a href="javascript:void(0);" @click="findCity($event)">卢克索</a>
                <a href="javascript:void(0);" @click="findCity($event)">阿斯旺</a>
                <a href="javascript:void(0);" @click="findCity($event)">红海</a>
                <a href="javascript:void(0);" @click="findCity($event)">亚历山大</a>
              </dd>
            </dl>
            <dl>
              <dt><a href="javascript:void(0);" @click="findCity($event)">摩洛哥</a></dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">马拉喀什</a>
                <a href="javascript:void(0);" @click="findCity($event)">卡萨布兰卡</a>
                <a href="javascript:void(0);" @click="findCity($event)">非斯</a>
                <a href="javascript:void(0);" @click="findCity($event)">舍夫沙万</a>
              </dd>
            </dl>
            <dl>
              <dt>非洲其他</dt>
              <dd>
                <a href="javascript:void(0);" @click="findCity($event)">毛里求斯</a>
                <a href="javascript:void(0);" @click="findCity($event)">塞舌尔</a>
                <a href="javascript:void(0);" @click="findCity($event)">肯尼亚</a>
                <a href="javascript:void(0);" @click="findCity($event)">马达加斯加</a>
              </dd>
            </dl>
          </div>

          <div style="clear:both;" />
        </div>
      </div>
    </div>

    <div class="season_recommand" />
  </div>
</template>

<script type="text/javascript">
import { get } from '@/utils/request'
export default {
  data() {
    return {
      inputDes: '',
      activeName: 'second',
      level: [
        { id: 'd1', name: '国内' },
        { id: 'd2', name: '港澳台' },
        { id: 'd3', name: '日本' },
        { id: 'd4', name: '东南亚' },
        { id: 'd5', name: '南亚 西亚' },
        { id: 'd6', name: '欧洲 美洲' }
      ],
      current_h_id: 'd1',
      hotDes: [
        { id: 1, cityName: '婺源' },
        { id: 2, cityName: '苍南' },
        { id: 3, cityName: '上海' },
        { id: 4, cityName: '温州' },
        { id: 5, cityName: '宜山' }
      ],
      img_url: 'https://p1-q.mafengwo.net/s19/M00/42/4E/CoNJZGReLoAI4KLWACD7PdCYl-E.png?imageView2%2F2%2Fw%2F1920%2Fq%2F90%2Fformat%2Fjpeg',
      article: {
        cover: 'https://p1-q.mafengwo.net/s19/M00/42/4E/CoNJZGReLoAI4KLWACD7PdCYl-E.png?imageView2%2F2%2Fw%2F1920%2Fq%2F90%2Fformat%2Fjpeg',
        id: 60,
        title: '来雪山玩玩玩wanna',
        content: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'
      }
    }
  },
  created() {
    get('api/article/hotQuery', { pageSize: 1, pageNum: 1 }).then(res => {
      this.article = res.data.data
      this.article = this.article[0]
      console.log('🚀 ~ file: index.vue:728 ~ get ~ this.article:', this.article)
      this.article.content = this.filterContent(this.article.content)
    })
  },
  mounted() {
    this.createdfunc()
  },
  methods: {
    filterContent(value) {
      var reg = /<[^<>]+>/g
      value = value.replace(reg, '') // 把v-html的格式标签替换掉
      if (value.length > 120) {
        return value.slice(0, 150) + '...'
      } else {
        return value
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    createdfunc() {
      console.log(this.current_h_id)
      document.getElementById(String(this.current_h_id)).classList.add('on')
      document.getElementById('h' + String(this.current_h_id)).classList.remove('hide')
    },
    changeId(id) {
      this.current_h_id = id
    },
    handleEnter(id) {
      document.getElementById(String(this.current_h_id)).classList.remove('on')
      document.getElementById('h' + String(this.current_h_id)).classList.add('hide')
      this.changeId(id)
      document.getElementById(String(this.current_h_id)).classList.add('on')
      document.getElementById('h' + String(this.current_h_id)).classList.remove('hide')
    },
    handleLeave(id) {

    },
    findCity() {
      var name = event.currentTarget.innerText
      console.log(name)
      this.goDes(name)
    },
    goDes(name) {
      console.log(name)
      this.$router.push({
        name: 'NameCard',
        params: {
          name: name
        }
      })
    }
  }
}
</script>

<style>
  .hot-pick{
    display: block;
  }
  .image_input{
    height: 600px;
    opacity: 80%;

  }
  .input{
    margin-top: 200px;
    margin-left: 300px;
    width: 400px;
    height: 150px;
    background-color: rgba(81, 99, 120,.3);
    border-radius: 4px;
    position: absolute

  }
  .h_title{
    text-align: center;
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 20px;
  }
  .des_choices a{
    margin-right:10px;
  }
  .h_tabs{
    align-items: center;
    justify-content: center;
  }
  .season_recommand{
    background-color: #fafafa;
    height: 500px;
  }
  .h_li{
    font-size: 18px;
    margin: 0px 10px;
    padding: 0px 10px;
    padding-bottom: 10px;

  }
  .hot_list{
     line-height: 24px;
    font-size: 14px;
    overflow: auto;
  }

  .on{
    border-bottom: #ff9d00 2px solid;
    color: #ff9d00;
  }

  .hot-list .col{
    float: left;
    width: 470px;
    margin-left:50px;

  }
  .hot-list dl {
    border-bottom: 1px dashed #eee;
    padding: 20px 0 20px 100px;
    height:60px
  }
  .hot-list dt a {
    color: #333;
    margin-right:5px;
    text-decoration: underline;
  }
  dd {
    display: block;
    margin-inline-start: 40px;

}
  dd a{
    margin-right:10px;
    color:#666666;
    font-size:14px;
  }
.hot-list dt {
    float: left;
    font-size: 16px;
    color: #333;
    margin-left: -100px;
}
  .hide{
    display: none;
  }

  .clearfix {
  clear: both;
}
</style>
