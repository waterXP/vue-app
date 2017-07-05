<template lang='pug'>
#sidebar(:class='{ "expand": isExpand }')
  button(@click='expand()')
    i.fa.fa-fw.fa-bars(:class='{ "fa-rotate-90": isExpand}')
  ul.parent
    li(
      v-for='items in menu'
      :class='{ "shirk": !hideLeaf[items[0].href.split("/")[1]] }'
      :style='{ height: getHeight(items) }'
    )
      ul.children
        li(
          v-for='item in items'
          :class='{ "node": !item.leaf }'
          :key='item.href'
          @click='toggle(item)'
          :title='item.title'
        )
          Tooltip(
            :content='item.title'
            :disabled='isExpand'
            placement='right'
          )
            router-link(
              :to='{ path: item.href }'
              v-if='item.leaf'
            )
              i.fa.fa-fw(:class='[item.icon]')
              span(v-if='isExpand') &nbsp;{{ item.title }}
            i.fa.fa-fw(
              :class='[item.icon, { "rotate90": !hideLeaf[item.href.split("/")[1]] }]',
              v-if='!item.leaf'
            )
            span(v-if='!item.leaf && isExpand') &nbsp;{{ item.title }}
</template>

<script>
import menu from '@/enums/sidebar'

export default {
  name: 'sidebar',
  data: function () {
    let hideLeaf = {}
    for (let items of menu) {
      for (let item of items) {
        hideLeaf[item.href.split('/')[1]] = true
      }
    }
    return {
      menu,
      isExpand: true,
      hideLeaf
    }
  },
  methods: {
    expand: function () {
      this.isExpand = !this.isExpand
    },
    getHeight: function (items) {
      let target = items[0].href.split('/')[1]
      if (this.hideLeaf[target]) {
        return items.length * 40 + 'px'
      }
      return '40px'
    },
    toggle: function (item) {
      if (item.leaf) return
      this.hideLeaf[item.href.split('/')[1]] = !this.hideLeaf[item.href.split('/')[1]]
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../css/style.scss';

.ivu-tooltip, .ivu-tooltip > div {
  width: 100%;
}
.ivu-tooltip-rel {
  width: 180px !important;
}
#sidebar {
  width: $frameSideWidthShrink;
  transition: $animate;
  button {
    width: $frameSideWidthShrink;
    height: 40px;
    line-height: 40px;
    border: none;
    background-color: darken($background, 15%);
    transition: $animate;
    &:focus, &:hover, &:active {
      border: none;
      outline: none;
    }
    i {
      transform: rotate(0deg);
    }
    i.fa-rotate-90 {
      transform: rotate(90deg);
    }
  }
  &.expand {
    width: $frameSideWidth;
    transform: rotate(360deg);
    button {
      transition: $animate;
      width: $frameSideWidth;
    }
    .node {
      i {
        margin-left: 15px;
      }
    }
    > ul {
      width: $frameSideWidth + 20px;
      li {
        width: $frameSideWidth;
      }
    }
    li {
      width: $frameSideWidth;
      &.node {
        text-align: left;
      }
      a {
        padding-left: 25px;
        text-align: left;
      }
    }
  }
  > ul {
    width: $frameSideWidthShrink + 20px;
    padding-bottom: 40px;
    > li {
      width: $frameSideWidthShrink;
    }
  }
  ul {
    height: 100%;
    overflow-x: hidden;
  }
  li {
    overflow: hidden;
    line-height: 40px;
    background-color: $background;
    &.shirk {
      height: 40px;
    }
    &.node {
      cursor: pointer;
      background-color: darken($background, 10%);
    }
    a {
      display: inline-block;
      width: 100%;
      padding: 0;
      text-align: center;
      color: $content;
      text-decoration: none;
      &:focus, &:hover {
        background-color: $lightActive;
      }
      &:active {
        background-color: $darkActive;
      }
      &:hover {
        i {
          font-size: $fontSize + 2px;
        }
      }
      &.router-link-active {
        background-color: $active;
      }
    }
  }
  .parent {
    > li.node {
      text-align: center;
    }
  }
  .children > li.node i {
    margin-left: 15px;
  }
}
.parent > li {
  transition: $animateQuick;
}
i {
  transform: rotate(0deg);
  transition: $animateQuick;
}
i.rotate90 {
  transform: rotate(-90deg);
}
</style>
