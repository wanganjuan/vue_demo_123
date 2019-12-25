<style scoped>
@import url(./style.css);
</style>

<template>
  <div class="main-box">
  <div class="content">
    <div class="old-img">
      <img :src="mainSrc" alt="old" ref="img"/>
    </div>
    <div class="image-input"><div class="image-input-container"><input type="text" v-model="webUrl" spallcheck="false" placeholder="请输入网络图片URL" class="image-url"> <button class="image-button" @click="_checkWebUrl()">检测</button> <div class="image-text">或</div> <label class="image-local"><input @change="_changeImg" type="file" accept="image/png, image/bmp, image/jpg, image/jpeg" class="image-local-input">
        本地上传
    </label></div> <div class="image-notice">图片文件类型支持PNG、JPG、JPEG、BMP，图片大小不超过2M。</div></div>
    <div class="scan-mask" v-show="loading"></div>
  </div>
  <div class="image-select ">
    <div class="image-select-item" :class="{'is-active': curIndex === index}" v-for="(item, index) in picList" :key="index" @click="_changePic(index)">
      <img :src="item"/>
    </div>
  </div>
  <div class="json-box">
    <div class="json-header">识别结果:</div>
    <div class="json-conetnt"><json-viewer
      :value="res"
      :expand-depth=5
      copyable
      boxed
      sort>
    </json-viewer>
  </div>
  </div>

  </div>
</template>

<script>
import imgList from './image'
import JsonViewer from 'vue-json-viewer'
import {ocr} from '@api/doc'
export default {
  data: function () {
    return {
      webUrl: '',
      loading: false,
      picList: imgList,
      mainSrc: '',
      curIndex: 0,
      res: {}
    }
  },
  components: {
    JsonViewer
  },
  methods: {
    _changeImg (e) {
      var fr1 = new FileReader()
      fr1.onload = () => {
        console.log(fr1)
        let base64 = fr1.result
        this.showImg(base64)
      }
      fr1.readAsDataURL(e.target.files[0])
    },
    getBase64 (imgUrl) {
      this.curIndex = -1
      let that = this
      window.URL = window.URL || window.webkitURL
      var xhr = new XMLHttpRequest()
      xhr.open('get', imgUrl, true)
      xhr.responseType = 'blob'
      xhr.onload = function () {
        if (this.status === 200) {
          var blob = this.response
          let oFileReader = new FileReader()
          oFileReader.onloadend = function (e) {
            let base64 = e.target.result
            that.showImg(base64)
          }
          oFileReader.readAsDataURL(blob)
        }
      }
      xhr.send()
    },
    _checkWebUrl () {
      if (!this.webUrl) {
        return
      }
      this.getBase64(this.webUrl)
    },
    _changePic (index) {
      this.curIndex = index
      this.showImg(this.picList[index])
    },
    _ocr (dataURL) {
      ocr({
        'common': {
          'app_id': 'xctan-test'
        },
        'business': {
          'ent': 'fingerocr',
          'mode': 'finger+ocr',
          'method': 'dynamic',
          'sub': 'ocr'
        },
        'data': {
          image: dataURL.replace('data:image/png;base64,', '')
        }
      }).then((res) => {
        this.loading = false
        this.res = res
      })
    },
    getBase64Image (img) {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      var dataURL = canvas.toDataURL('image/' + ext)
      this._ocr(dataURL)
      return dataURL
    },
    showImg (img) {
      var image = this.$refs.img
      image.crossOrigin = ''
      image.onload = () => {
        // this.mainSrc = img
        this.loading = true
        this.getBase64Image(image)
      }
      image.onerror = () => {
        this.loading = false
        window.alert('无法获取图片，请检查图片资源')
      }
      image.src = img
    }
  },
  mounted () {
    this.showImg(imgList[0])
  }
}
</script>
<style>
html, body, #app {
height: 100%;
}
</style>
