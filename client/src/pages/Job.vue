<template id="">
  <div class="job-body">
    <div class="top-bar-wrap">
      <top-bar></top-bar>
    </div>
    <div class="main">
      <div class="search-wrap">
        <search></search>
      </div>
      <div class="filter-wrap">
        <div class="work-place">
          <dl class="">
            <dt>工作地点：</dt>
            <dd :class="{'now-select': !nowCity}" @click="deselectCity()">全国</dd>
            <dd v-for="(item, index) in commonCityList" :class="{'now-select': nowCityId===item.id}" @click="switchCityComfirm(item)">{{ item.name }}</dd>
            <router-link class="iconfont icon-enter" to="/citylist">全部城市</router-link>
          </dl>
        </div>
        <div class="work-experience">
          <dl class="">
            <dt>工作经验：</dt>
            <dd :class="{'now-select': !nowWorkExperience}" @click="deselectWork()">不限</dd>
            <dd v-for="item in workExperience" :class="{'now-select': item===nowWorkExperience}" @click="selectWork(item)">{{ item.name }}</dd>
          </dl>
        </div>
        <div class="education">
          <dl class="">
            <dt>学历要求：</dt>
            <dd :class="{'now-select': !nowEducation}" @click="deselectEdu()">不限</dd>
            <dd v-for="item in education" :class="{'now-select': item===nowEducation}" @click="selectEducation(item)">{{ item.name }}</dd>
          </dl>
        </div>
        <div class="fund-profile">
          <dl class="">
            <dt>融资阶段：</dt>
            <dd :class="{'now-select': !nowFundProfile}" @click="deselectFund()">不限</dd>
            <dd v-for="item in fundProfile" :class="{'now-select': item===nowFundProfile}" @click="selectFund(item)">{{ item.name }}</dd>
          </dl>
        </div>
        <div class="industry">
          <dl class="">
            <dt>行业领域：</dt>
            <dd :class="{'now-select': !nowIndustry}" @click="deselectInd()">不限</dd>
            <dd v-for="item in industry" :class="{'now-select': item===nowIndustry}" @click="selectIndustry(item)">{{ item.name }}</dd>
          </dl>
        </div>
        <div class="select-ing">
          <dl>
            <dt v-show="selecting.length">已选条件：</dt>
            <dd v-for="item in selecting" class="now-select">
              {{ item.name }}
              <span class="iconfont icon-delete" @click="deselectAnyone(item)"></span>
            </dd>
          </dl>
        </div>
      </div>
      <div class="job-wrap">
        <ul>
          <li v-for="(item, index) in jobList">
            <span>{{ item[0].title }}</span>
            <span>{{ item[1].fullname }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-wrap">
      <v-footer></v-footer>
    </div>
  </div>
</template>
<script type="text/javascript">
import nowCityStorage from '../store/localStorage'
import Public from '../Public'
import Model from '../components/Model'
import Search from '../components/Search'
import analogDate from '../util/analog-data'
import { mapState } from 'vuex'
export default {
  mixins: [Public],
  components: {
    Model,
    Search
  },
  computed: {
    ...mapState(['jobList', 'nowCityId', 'nowCityName'])
  },
  data () {
    return {
      commonCityList: [],
      cityList: [],
      selecting: [],
      nowCity: '',
      nowEducation: '',
      nowWorkExperience: '',
      nowFundProfile: '',
      nowIndustry: '',
      education: [],
      workExperience: [],
      fundProfile: [],
      industry: [],
      isShowModel: false
    }
  },
  methods: {
    deselectAnyone (item) {
      this.selecting.forEach((value, index) => {
        if (value === item) {
          this.selecting.splice(index, 1)
        }
      })
      if (item === this.nowCity) {
        this.nowCity = ''
        this.deselectCity()
      }
      if (item === this.nowEducation) {
        this.nowEducation = ''
      }
      if (item === this.nowWorkExperience) {
        this.nowWorkExperience = ''
      }
      if (item === this.nowFundProfile) {
        this.nowFundProfile = ''
      }
      if (item === this.nowIndustry) {
        this.nowIndustry = ''
      }
    },
    deselectWork () {
      this.selecting.forEach((value, index) => {
        if (value === this.nowWorkExperience) {
          this.selecting.splice(index, 1)
        }
      })
      // 为什么不能直接赋值空对象
      this.nowWorkExperience = ''
    },
    deselectCity () {
      let nowCityName = '全国'
      let nowCityId = 1
      this.$store.dispatch('switchCity', {nowCityName, nowCityId})
      nowCityStorage.save({nowCityName, nowCityId})
      this.selecting.forEach((value, index) => {
        if (value === this.nowCity) {
          this.selecting.splice(index, 1)
        }
      })
      // 为什么不能直接赋值空对象
      this.nowCity = ''
    },
    deselectEdu () {
      this.selecting.forEach((value, index) => {
        if (value === this.nowEducation) {
          this.selecting.splice(index, 1)
        }
      })
      // 为什么不能直接赋值空对象
      this.nowEducation = ''
    },
    deselectFund () {
      this.selecting.forEach((value, index) => {
        if (value === this.nowFundProfile) {
          this.selecting.splice(index, 1)
        }
      })
      // 为什么不能直接赋值空对象
      this.nowFundProfile = ''
    },
    deselectInd () {
      this.selecting.forEach((value, index) => {
        if (value === this.nowIndustry) {
          this.selecting.splice(index, 1)
        }
      })
      // 为什么不能直接赋值空对象
      this.nowIndustry = ''
    },
    switchCityComfirm (item) {
      let nowCityName = item.name
      let nowCityId = item.id
      this.$store.dispatch('switchCity', {nowCityName, nowCityId})
      nowCityStorage.save({nowCityName, nowCityId})
      this.selecting.forEach((value, index) => {
        if (value === this.nowCity) {
          this.selecting.splice(index, 1)
        }
      })
      this.selecting.push(item)
      this.nowCity = item
    },
    selectIndustry (item) {
      // console.log(item)
      this.selecting.forEach((value, index) => {
        if (value === this.nowIndustry) {
          this.selecting.splice(index, 1)
        }
      })
      this.selecting.push(item)
      this.nowIndustry = item
    },
    selectWork (item) {
      this.selecting.forEach((value, index) => {
        if (value === this.nowWorkExperience) {
          this.selecting.splice(index, 1)
        }
      })
      this.selecting.push(item)
      this.nowWorkExperience = item
    },
    selectEducation (item) {
      this.selecting.forEach((value, index) => {
        if (value === this.nowEducation) {
          this.selecting.splice(index, 1)
        }
      })
      this.selecting.push(item)
      this.nowEducation = item
    },
    selectFund (item) {
      this.selecting.forEach((value, index) => {
        if (value === this.nowFundProfile) {
          this.selecting.splice(index, 1)
        }
      })
      this.selecting.push(item)
      this.nowFundProfile = item
    },
    analogDateinit () {
      const {education, workExperience, fundProfile, industry} = analogDate
      this.education = education
      this.workExperience = workExperience
      this.fundProfile = fundProfile
      this.industry = industry
    },
    nowCityInit () {
      this.selecting.forEach((value, index) => {
        if (value === this.nowCity) {
          this.selecting.splice(index, 1)
        }
      })
      let id = this.nowCityId
      let name = this.nowCityName
      this.nowCity = {'id': id, 'name': name}
      this.$set(this.nowCity, 'id', id)
      this.$set(this.nowCity, 'name', name)
      this.selecting.push(this.nowCity)
      console.log(this.nowCity)
    }
  },
  mounted () {
    this.analogDateinit()
    // console.log(this.nowCityId, this.nowCityName)
    if (this.nowCityId === 1) {
      this.nowCity = ''
    } else {
      this.nowCityInit()
    }
    this.$http.get('/city/getcity')
    .then(res => {
      this.cityList = res.data.data
      this.commonCityList = (this.cityList).slice(0, 12)
    })
  },
  watch: {
    nowCityId: {
      handler (value1, value2) {
        console.log(value1)
        if (value1 === 1) {
          this.nowCity = ''
        } else {
          this.nowCityInit()
        }
      }
    }
  }
}
// ^([0-9]+)(,[0-9]+)*,([0-9]+)$
// ^([0-9]+)(,[0-9]+)*,?([0-9]+)?$
</script>

<style scoped>
  .job-body {
    background: #fff;
  }
  .top-bar-wrap {
    width: 100%;
    height: 50px;
    min-width: 980px;
    background-color: #333;
  }
  .main {
    width: 100%;
    min-width: 980px;
  }
  .search-wrap {
    background: #F2F5F4;
    padding: 30px 0 28px;
  }
  .footer-wrap {
    border-top: 1px solid #ebebeb;
    width: 100%;
    min-width: 980px;
    background-color: white;
  }
  .filter-wrap {
    width: 980px;
    background: #f8f8f8;
    border: 1px solid #f0f0f0;
    margin: 30px auto;
    padding-bottom: 40px;
    position: relative;
  }
  .filter-wrap dl {
    display: flex;
    line-height: 24px;
    padding: 6px 0;
  }
  .filter-wrap dl dt {
    padding: 0 10px;
    font-weight: bold;
  }
  .filter-wrap dl dd {
    cursor: pointer;
    padding: 0 4px;
    margin: 0 10px;
  }
  .filter-wrap dl dd:hover {
    background: #00b38a;
    color: white;
  }
  .filter-wrap dl dd.now-select {
    background: #00b38a;
    color: white;
  }
  .icon-enter {
    position: relative;
    font-size: 14px;
    margin-left: 10px;
    color: #00b38a;
  }
  .icon-enter:before {
    position: absolute;
    right: -20px;
  }
  .filter-wrap .select-ing dl {
    line-height: 20px;
  }
  .select-ing {
    font-size: 12px;
    width: 100%;
    background: #efefef;
    height: 30px;
    position: absolute;
    bottom: 5px;
  }
  .select-ing .icon-delete:before {
    font-size: 16px;
  }
</style>
