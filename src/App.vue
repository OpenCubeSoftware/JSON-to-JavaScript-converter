<script setup>
import {computed, ref} from 'vue';
const input = ref('');

function replaceJsonKey(match, p1, p2, p3, offset, string) {
  console.log(match);
  return match.substring(1, match.length -2) + ":";
}

const converted = computed(() => {
  try {
    if (input.value === '') {
      return 'When you enter some JSON, it will be converted to a JavaScript object here!';
    }
    JSON.parse(input.value);
    return input.value.replace(/"(\w+)":/g, replaceJsonKey)
  } catch {
    return "Not valid JSON."
  }
})

const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(converted.value);
  } catch {
    alert("Could not copy text");
  }
}

const clearInput = () => {
  input.value = '';
}

</script>

<template>
  <el-container class="meow">
        <div class="flex-row">
          <div class="wide-wrapper">
            <el-input class="text-input" resize="none" v-model="input" :rows="25" type="textarea"
                      placeholder="Enter JSON..."/>
          </div>
          <div class="center-vert">
          </div>
          <div class="wide-wrapper">
            <el-input class="text-input" resize="none" v-model="converted" :rows="25" type="textarea" readonly/>
          </div>
        </div>
        <div class="flex-row space-between padding-top">
          <el-button type="primary" @click="clearInput">Clear input</el-button>
          <el-button type="primary" @click="copyResult">Copy value</el-button>
        </div>
  </el-container>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
.meow {
  height: 97vh;
  width: 97vw;
  display: flex;
  flex-direction: column;
}
.flex-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 12px;
}
.center-vert {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.text-input{
  width: 100%;
}
.wide-wrapper {
  width: 47vw;
}
.space-between {
  justify-content: space-between;
}

.padding-top {
   padding-top: 10px;
}
</style>
