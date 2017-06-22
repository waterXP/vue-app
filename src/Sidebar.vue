<template lang='pug'>
#sidebar(:class='{ "expand": isExpand }')
  ul
    li.node(@click='expand()')
      i.fa.fa-fw.fa-bars(:class='{ "fa-rotate-90": isExpand}')
    li(
      v-for='item in items'
      :class='{ "node": !item.leaf }'
      :key='item.href'
      v-show='showLeaf(item)'
      @click='toggle(item)'
      :title='item.title'
    )
      router-link(
        :to='{ path: item.href }'
        v-if='item.leaf'
      )
        i.fa.fa-fw(:class='[item.icon]')
        span(v-if='isExpand') &nbsp;{{item.title}}
      i.fa.fa-fw(
        :class='[item.icon, { "fa-rotate-270": !hideLeaf[item.href.split("/")[1]] }]',
        v-if='!item.leaf'
      )
      span(v-if='!item.leaf && isExpand') &nbsp;{{item.title}}
</template>

<script>
import items from '@/enums/sidebar'

export default {
  name: 'sidebar',
  data: function () {
    let hideLeaf = {}
    for (let item of items) {
      hideLeaf[item.href.split('/')[1]] = true
    }
    return {
      items,
      isExpand: true,
      hideLeaf
    }
  },
  methods: {
    showLeaf: function (item) {
      return !item.leaf || this.hideLeaf[item.href.split('/')[1]]
    },
    expand: function () {
      this.isExpand = !this.isExpand
    },
    toggle: function (item) {
      if (item.leaf) return
      this.hideLeaf[item.href.split('/')[1]] = !this.hideLeaf[item.href.split('/')[1]]
    }
  }
}
</script>

<style lang='scss' scoped>
@import './style.scss';
#sidebar {
  width: $frameSideWidthShrink;
  &.expand {
    width: $frameSideWidth;
    li {
      &.node:not(:first-child) {
        text-align: left;
      }
      a {
        padding: 0 20px;
        text-align: left;
      }
    }
  }
  ul {
    width: 100%;
  }
  li {
    height: 40px;
    line-height: 40px;
    background-color: $backColor;
    &.node {
      padding: 0 10px;
      text-align: center;
      cursor: pointer;
      background-color: darken($backColor, 10%);
    }
    &:first-child {
      background-color: darken($backColor, 5%);
      text-align: center;
    }    
    a {
      display: inline-block;
      width: 100%;
      padding: 0;
      text-align: center;
      color: $fontColor;
      text-decoration: none;
      &:focus, &:hover, &:active {
        background-color: darken($backColor, 5%);
      }
      &.router-link-active {
        background-color: $activeColor;
      }
    }
  }
}
</style>
