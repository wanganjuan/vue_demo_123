<template>
  <div class="mask-black-dialog">
    <div class="mask-content">
      <div class="mask-header">
        <SvgTool name="chenggong" class="chenggong"/>
        <span>{{content}}</span>
        <span class="docfont del-icon" @click="pubTag = false">&#xe6ed;</span>
      </div>
      <el-button type="primary" style="margin: 19px 0 0 62px;" @click.stop="buttonClick">{{buttonDesc}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: String,
    buttonDesc: String,
    callback: Function
  }

}
</script>

<style lang="scss" scoped>
  .mask-black-dialog {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    .mask-content {
      width: 360px;
      height: 110px;
      overflow: hidden;
      border-left: 4px solid #56CD75;
      background: #FFFFFF;
      box-shadow: 0 4px 30px 0 rgba(174,174,194,0.60);
      border-radius: 4px;
      font-size: 16px;
      color: #242F3E;
      box-sizing: border-box;
      padding-top: 16px;
      .mask-header {
        height: 22px;
        display: flex;
        align-items: center;
        position: relative;
        .del-icon {
          position: absolute;
          right: 30px;
          font-size: 12px;
          top: 5px;
          cursor: pointer;
        }
      }
    }
    .chenggong {
      height: 22px;
      width: 22px;
      margin: 0 14px 0 27px;
    }
  }
</style>