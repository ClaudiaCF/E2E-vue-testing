<template>
  <div class="w-full">
    <div class="flex flex-col items-center ">
      <select v-model="selectOption" placeholder="Choose one!" class="block mb-5 appearance-none w-64 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option>Choose one!</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
      <div class="flex">
        <div class="mr-5">
          <input v-model="inputLeft" class="inheritInputOne w-64 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div class="">
          <input v-model="inputRight" class="inheritInputTwo w-64 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
      </div>
      <button @click="launchModal = true" class="btn-launchModal mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        <p>Launch modal</p>
      </button>
      <transition name="openModal">
        <div v-if="launchModal" class="absolute z-50 w-full h-full top-0 left-0 flex items-center justify-center" style="background-color: rgba(0,0,0,.2)">
          <div  @click="launchModal = false" class="circle-launchModal bg-blue-500 w-64 h-64 rounded-full items-center justify-center flex"> 
            <p class="text-black text-4xl font-bold">Click!</p> 
          </div>
        </div>
      </transition>
      <div class="mt-10">
        <input type="checkbox" id="claudia" value="Claudia" v-model="checkedNames">
        <label for="claudia" class="ml-1 mr-5">Claudia</label>
        <input type="checkbox" id="nico" value="Nico" v-model="checkedNames">
        <label for="nico" class="ml-1 mr-5">Nico</label>
        <input type="checkbox" id="taco" value="Taco" v-model="checkedNames">
        <label for="taco" class="ml-1">Taco</label>
        <p class="checked-text">Checked names: {{ checkedNames }}</p>
      </div>
      <div class="mt-10">
        <input type="radio" id="carolina" value="Carolina" v-model="radioName">
        <label for="carolina" class="ml-1 mr-5">Carolina</label>
        <input type="radio" id="barney" value="Barney" v-model="radioName">
        <label for="barney" class="ml-1 mr-5">Barney</label>
        <input type="radio" id="moe" value="Moe" v-model="radioName">
        <label for="moe" class="ml-1">Moe</label>
        <p>Selected name: {{ radioName }}</p>
      </div>
      <div>
        <input v-model="validatedText" class="shadow appearance-none border mt-10 rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username" name="input-validation"
        type="text" placeholder="Write your DNI like 1111111A">
        <p>{{validation}}</p>
      </div>
    </div>
   
    
  </div>
</template>
<script>
  export default {
    data () {
      return {
        checkedNames: [],
        radioName: '',
        validation: 'Not validated',
        selectOption: 'Choose one!',
        launchModal: false,
        inputLeft: '',
        inputRight: '',
        validatedText: ''
      }
    },
    methods: {
      checkTextValidation(text){
        return /^\d{8}[a-zA-Z]$/.test(text)
      }
      
    },
    watch: {
      'selectOption': function () {
        this.inputLeft = this.selectOption
        this.inputRight = this.selectOption
      },
      'validatedText': function () {
          this.validation =  this.checkTextValidation(this.validatedText) ? 'Validation ok' : 'Not validated'
      }
    }
  }
</script>
<style>
    .openModal-enter-active, .openModal-leave-active {
      transition: all 0.5s;
      top:0;
    }
    .openModal-enter, .openModal-leave-to {
      opacity: 0;
      transform: translateY(50px);
    }
  </style>
