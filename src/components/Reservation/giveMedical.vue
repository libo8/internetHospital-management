<template>
  <el-container>
    <el-header v-if="recipeInsertFlag" style="font-weight:700;height:20px">处方已开具</el-header>
    <el-header v-if="!recipeInsertFlag" style="height:300px">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearch"
        popper-class="my-autocomplete"
        placeholder="请输入药品名"
        style="width:60%"
        @select="handleSelect"
      >
        <i slot="prefix" class="el-icon-search el-input__icon"/>
        <template slot-scope="{ item }">
          <span class="name">{{ item.name }}</span>
          <span class="origin">{{ item.origin }}</span>
        </template>
      </el-autocomplete>
    </el-header>
    <el-main>
      <div/>
      <el-table :data="tableData" style="width:100%" stripe>
        <el-table-column prop="name" label="药品名称" width="200px"/>
        <el-table-column v-if="!recipeInsertFlag" label="剂量" width="100px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dosage" size="mini" type="number" min="0"/>
          </template>
        </el-table-column>
        <el-table-column v-if="!recipeInsertFlag" label="剂量单位" width="80px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dosageUnit" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column v-if="!recipeInsertFlag" label="用药频次" width="150px">
          <template slot-scope="scope">
            <el-select v-model="scope.row.times" placeholder="请选择">
              <el-option
                v-for="item in times"
                :key="item.id"
                :label="item.times"
                :value="item.times"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column v-if="!recipeInsertFlag" label="天数" width="80px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.day" size="mini" type="number" step="1" min="1"/>
          </template>
        </el-table-column>
        <el-table-column v-if="!recipeInsertFlag" prop label="用法">
          <template slot-scope="scope">
            <el-select v-model="scope.row.method" placeholder="请选择">
              <el-option
                v-for="item in methods"
                :key="item.id"
                :label="item.method"
                :value="item.method"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column v-if="!recipeInsertFlag" label="药品数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.amount" size="mini" type="number" step="1" min="1"/>
          </template>
        </el-table-column>

        <el-table-column v-if="recipeInsertFlag" label="药品数量" prop="amount"/>
        <el-table-column v-if="recipeInsertFlag" label="用法" prop="method"/>
        <el-table-column v-if="recipeInsertFlag" label="天数" width="80px" prop="day"/>
        <el-table-column v-if="recipeInsertFlag" label="用药频次" width="150px" prop="times"/>
        <el-table-column v-if="recipeInsertFlag" label="剂量单位" width="80px" prop="dosageUnit"/>
        <el-table-column v-if="recipeInsertFlag" label="剂量" width="100px" prop="dosage"/>

        <el-table-column prop="price" label="单价"/>
        <el-table-column v-if="!recipeInsertFlag" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer style="text-align:center">
      <el-button v-if="!recipeInsertFlag" type="primary" @click="handleRecipeList">提交处方</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import {
  listAllMedicalInPage,
  listMedicalMethod,
  listMedicalTimes
} from '@/api/medical'
import {
  insertRecipe,
  getRecipeDetailListByUserReservationUuid
} from '@/api/recipe'
export default {
  data() {
    return {
      medicals: [],
      state: '',
      medical: '',
      tableData: [],
      times: [],
      methods: [],
      recipeInsertFlag: false
    }
  },
  mounted() {
    this.listAllMedicalInPage()
    this.listMedicalTimes()
    this.listMedicalMethod()
    this.getInsertRecipe()
  },
  methods: {
    querySearch(queryString, cb) {
      var medicals = this.medicals
      var results = queryString
        ? medicals.filter(this.createFilter(queryString))
        : medicals
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return medical => {
        return (
          medical.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    listAllMedicalInPage() {
      listAllMedicalInPage(1, 0).then(response => {
        if (response.data.returnCode === 200) {
          this.medicals = response.data.returnData.list
        }
      })
    },
    handleSelect(item) {
      let flag = true
      this.tableData.forEach(element => {
        if (element.id === item.id) {
          this.$store.state.errorTokenVisible = true
          this.$store.state.errorTokenMessage = '请勿重复添加相同药品'
          flag = false
        }
      })
      if (flag) {
        this.tableData.push(item)
      }
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
    },
    handleRecipeList() {
      let flag = false
      if (this.tableData.length === 0) {
        this.$store.state.errorTokenVisible = true
        this.$store.state.errorTokenMessage = '请至少选择一种药品'
        return
      }
      this.tableData.forEach(element => {
        if (element.dosage === null || element.dosage.trim() === '') {
          flag = true
        }
        if (element.dosageUnit === null || element.dosage.trim() === '') {
          flag = true
        }
        if (element.times === null || element.times.trim() === '') {
          flag = true
        }
        if (element.method === null || element.method.trim() === '') {
          flag = true
        }
        if (element.amount === null || element.amount.trim() === '') {
          flag = true
        }
      })
      this.tableData[0].userReservationUuid = localStorage.getItem(
        'userReservationUuId'
      )
      if (flag) {
        this.$store.state.errorTokenVisible = true
        this.$store.state.errorTokenMessage = '请将药品信息填写完整'
      } else {
        insertRecipe(this.tableData).then(response => {
          if (response.data.returnCode === 200) {
            this.$store.state.errorTokenVisible = true
            this.$store.state.errorTokenMessage = '处方信息添加成功'
            this.recipeInsertFlag = true
          }
        })
      }
    },
    listMedicalTimes() {
      listMedicalTimes().then(response => {
        if (response.data.returnCode === 200) {
          this.times = response.data.returnData
        }
      })
    },
    listMedicalMethod() {
      listMedicalMethod().then(response => {
        if (response.data.returnCode === 200) {
          this.methods = response.data.returnData
        }
      })
    },
    getInsertRecipe() {
      const userReservationUuid = localStorage.getItem('userReservationUuId')
      getRecipeDetailListByUserReservationUuid(userReservationUuid).then(
        response => {
          if (response.data.returnCode === 200) {
            if (response.data.returnData !== null) {
              this.recipeInsertFlag = true
              this.$store.state.hasMedicalFlag = true
              this.tableData = response.data.returnData
            } else {
              this.recipeInsertFlag = false
              this.tableData = []
              this.$store.state.hasMedicalFlag = false
            }
          }
        }
      )
    }
  }
}
</script>

<style lang="scss">
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      margin-right: 10px;
    }
    .origin {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .origin {
      color: #ddd;
    }
  }
}
</style>