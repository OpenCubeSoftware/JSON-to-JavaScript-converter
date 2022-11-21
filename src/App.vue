<script setup>
import {computed, ref} from 'vue';
const input = ref('');
const language  =ref('js');
const toOrFrom = ref('from');

function replaceJsonKey(match, p1, p2, p3, offset, string) {
  console.log(match);
  return match.substring(1, match.length -2) + ":";
}

const jsonToPhp = (json) => {
  const newStr = json.replace(/\{/g, "[").replace(/\}/g, "]");
  let replacedStr = newStr.replace(/:/g, " =>");
  return replacedStr + ";";
}

const converted = computed(() => {
  try {
    if (input.value === '') {
      return `When you enter some JSON, it will be converted to a ${language.value === 'js' ? 'JavaScript object' : 'PHP array'} here!`;
    }
    if (language.value === 'js') {
      JSON.parse(input.value);
      return input.value.replace(/"(\w+)":/g, replaceJsonKey)
    } else {
      return jsonToPhp(input.value);
    }
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
  <el-container class="main-col">
        <div class="flex-row space-between">
          <el-radio-group v-model="language">
            <el-radio label="js" size="default">JavaScript</el-radio>
            <el-radio label="php" size="default">PHP</el-radio>
          </el-radio-group>
<!--          <el-radio-group v-model="language">-->
<!--            <el-radio label="from" size="default">JSON to {{language === 'js' ? 'JavaScript' : 'PHP'}}</el-radio>-->
<!--            <el-radio label="to" size="default">{{language === 'js' ? 'JavaScript' : 'PHP'}} to JSON</el-radio>-->
<!--          </el-radio-group>-->
        </div>
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
.main-col {
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
.space-evenly {
  justify-content: space-evenly;
}
.center {
  justify-content: center;
}
.gap {
  gap: 55px;
}
.padding-top {
   padding-top: 10px;
}
</style>
