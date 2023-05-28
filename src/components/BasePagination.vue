// https://github.com/lokyoung/vuejs-paginate
<template>
  <div>
    <ul
      v-if="!noLiSurround"
      :class="containerClass"
    >
      <li
        v-if="firstLastButton"
        :class="[pageClass, firstPageSelected() ? disabledClass : '']"
      >
        <a
          :class="pageLinkClass"
          :tabindex="firstPageSelected() ? -1 : 0"
          @click="selectFirstPage()"
          @keyup.enter="selectFirstPage()"
          v-html="firstButtonText"
        />
      </li>
        
      <li
        v-if="!(firstPageSelected() && hidePrevNext)"
        :class="[prevClass, firstPageSelected() ? disabledClass : '']"
      >
        <a
          :class="prevLinkClass"
          :tabindex="firstPageSelected() ? -1 : 0"
          @click="prevPage()"
          @keyup.enter="prevPage()"
          v-html="prevText"
        />
      </li>
        
      <li
        v-for="page in pages"
        :key="page"
        :class="[pageClass, page.selected ? activeClass : '', page.disabled ? disabledClass : '', page.breakView ? breakViewClass: '']"
      >
        <a
          v-if="page.breakView"
          :class="[pageLinkClass, breakViewLinkClass]"
          tabindex="0"
        ><slot name="breakViewContent">{{ breakViewText }}</slot></a>
        <a
          v-else-if="page.disabled"
          :class="pageLinkClass"
          tabindex="0"
        >{{ page.content }}</a>
        <a
          v-else
          :class="pageLinkClass"
          tabindex="0"
          @click="handlePageSelected(page.index + 1)"
          @keyup.enter="handlePageSelected(page.index + 1)"
        >{{ page.content }}</a>
      </li>
        
      <li
        v-if="!(lastPageSelected() && hidePrevNext)"
        :class="[nextClass, lastPageSelected() ? disabledClass : '']"
      >
        <a
          :class="nextLinkClass"
          :tabindex="lastPageSelected() ? -1 : 0"
          @click="nextPage()"
          @keyup.enter="nextPage()"
          v-html="nextText"
        />
      </li>
        
      <li
        v-if="firstLastButton"
        :class="[pageClass, lastPageSelected() ? disabledClass : '']"
      >
        <a
          :class="pageLinkClass"
          :tabindex="lastPageSelected() ? -1 : 0"
          @click="selectLastPage()"
          @keyup.enter="selectLastPage()"
          v-html="lastButtonText"
        />
      </li>
    </ul>
  </div>
</template>


<script>
export default {
    name: 'BasePagination',
    props: {
        modelValue: {
            type: Number,
            required: true
        },
        pageCount: {
            type: Number,
            required: true
        },
        forcePage: {
            type: Number,
            default: undefined
        },
        clickHandler: {
            type: Function,
            default: () => { }
        },
        pageRange: {
            type: Number,
            default: 3
        },
        marginPages: {
            type: Number,
            default: 1
        },
        prevText: {
            type: String,
            default: ''
        },
        nextText: {
            type: String,
            default: ''
        },
        breakViewText: {
            type: String,
            default: '...'
        },
        containerClass: {
            type: String,
            default: ''
        },
        pageClass: {
            type: String,
            default: ''
        },
        pageLinkClass: {
            type: String,
            default: ''
        },
        prevClass: {
            type: String,
            default: ''
        },
        prevLinkClass: {
            type: String,
            default: ''
        },
        nextClass: {
            type: String,
            default: ''
        },
        nextLinkClass: {
            type: String,
            default: ''
        },
        breakViewClass: {
            type: String,
            default: ''
        },
        breakViewLinkClass: {
            type: String,
            default: ''
        },
        activeClass: {
            type: String,
            default: 'active'
        },
        disabledClass: {
            type: String,
            default: 'disabled'
        },
        noLiSurround: {
            type: Boolean,
            default: false
        },
        firstLastButton: {
            type: Boolean,
            default: false
        },
        firstButtonText: {
            type: String,
            default: 'First'
        },
        lastButtonText: {
            type: String,
            default: 'Last'
        },
        hidePrevNext: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            innerValue: 1,
        };
    },
    computed: {
        selected: {
            get: function() {
                return this.modelValue || this.innerValue;
            },
            set: function(newValue) {
                this.innerValue = newValue;
            }
        },
        pages: function () {
            let items = {};
            if (this.pageCount <= this.pageRange) {
                for (let index = 0; index < this.pageCount; index++) {
                    let page = {
                        index: index,
                        content: index + 1,
                        selected: index === (this.selected - 1)
                    };
                    items[index] = page;
                }
            } else {
                const halfPageRange = Math.floor(this.pageRange / 2);
                let setPageItem = index => {
                    let page = {
                        index: index,
                        content: index + 1,
                        selected: index === (this.selected - 1)
                    };
                    items[index] = page;
                };
                let setBreakView = index => {
                    let breakView = {
                        disabled: true,
                        breakView: true
                    };
                    items[index] = breakView;
                };
                // 1st - loop thru low end of margin pages
                for (let i = 0; i < this.marginPages; i++) {
                    setPageItem(i);
                }
                // 2nd - loop thru selected range
                let selectedRangeLow = 0;
                if (this.selected - halfPageRange > 0) {
                    selectedRangeLow = this.selected - 1 - halfPageRange;
                }
                let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
                if (selectedRangeHigh >= this.pageCount) {
                    selectedRangeHigh = this.pageCount - 1;
                    selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
                }
                
                //!!! MODIFYING FOR VISIBLE 4 PAGE ON START !!!
                if (this.selected < 3) {
                    selectedRangeHigh += 1;
                }
                
                for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
                    setPageItem(i);
                }
                // Check if there is breakView in the left of selected range
                if (selectedRangeLow > this.marginPages) {
                    setBreakView(selectedRangeLow - 1);
                }
                // Check if there is breakView in the right of selected range
                if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
                    setBreakView(selectedRangeHigh + 1);
                }
                // 3rd - loop thru high end of margin pages
                for (let i = this.pageCount - 1; i >= this.pageCount - this.marginPages; i--) {
                    setPageItem(i);
                }
            }
            return items;
        }
    },
    beforeUpdate() {
        if (this.forcePage === undefined) return;
        if (this.forcePage !== this.selected) {
            this.selected = this.forcePage;
        }
    },
    methods: {
        handlePageSelected(selected) {
            if (this.selected === selected) return;
            this.innerValue = selected;
            this.$emit('update:modelValue', selected);
            this.clickHandler(selected);
        },
        prevPage() {
            if (this.selected <= 1) return;
            this.handlePageSelected(this.selected - 1);
        },
        nextPage() {
            if (this.selected >= this.pageCount) return;
            this.handlePageSelected(this.selected + 1);
        },
        firstPageSelected() {
            return this.selected === 1;
        },
        lastPageSelected() {
            return (this.selected === this.pageCount) || (this.pageCount === 0);
        },
        selectFirstPage() {
            if (this.selected <= 1) return;
            this.handlePageSelected(1);
        },
        selectLastPage() {
            if (this.selected >= this.pageCount) return;
            this.handlePageSelected(this.pageCount);
        }
    },
};
</script>


<style lang="scss" scoped>

.pagination {
    display: flex;
}
.pagination-item {
    width: 60px;
    height: 60px;
    border-radius: 12px;
}
.pagination-item a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.pagination-item.active {
    border: 1px solid var(--primary);
}
</style>