<template>
  <div>


<h2>Inventory List</h2><br>


<h3>Sort Options</h3><hr><br>


<!-- filter start here-->
<el-form>
<el-form-item label="SortBy">
  <el-select v-model="filtervalue" placeholder="Select">
    <el-option
      v-for="item in filteroptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</el-form-item>
<el-form-item label="Reverse">
  <el-select v-model="reversevalue" placeholder="Select">
    <el-option
      v-for="item in reverseoptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</el-form-item>
<el-form-item>
<el-button @click="clickUpdate">Sort</el-button>
</el-form-item>
</el-form>
<!-- filter end here-->


<h3>Add/Delete</h3><hr><br>

<el-form>
<el-form-item>
<el-button @click="clickAdd">+</el-button>
<el-button @click="clickDelete">-</el-button>
<el-button @click="clickFile">Upload File</el-button>

</el-form-item>
</el-form>

<!-- table start here-->
  <el-table
    ref="multipleTable"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>    
    <el-table-column
      label="No"
      prop="no">
    </el-table-column>    
    <el-table-column
      label="Vin"
      prop="vin">
    </el-table-column>    
        <el-table-column
      label="Model"
      prop="cardetails.model">
    </el-table-column>    
        <el-table-column
      label="Make"
      prop="cardetails.make">
    </el-table-column>    
        <el-table-column
      label="Year"
      prop="cardetails.year">
    </el-table-column>    
        <el-table-column
      label="Msrp"
      prop="cardetails.msrp">
    </el-table-column>    
    <el-table-column
      label="Status"
      prop="carstatuses.status">
    </el-table-column>    
        <el-table-column
      label="Booked"
      prop="carstatuses.booked">
    </el-table-column>    
        <el-table-column
      label="Listed"
      prop="carstatuses.listed">
    </el-table-column>    
    <el-table-column
      align="right">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="viewRow(scope.$index, scope.row)">View</el-button>
      </template>
    </el-table-column>
  </el-table>
<!-- table end here-->

<!-- pagination start here-->
  </el-table>
        <el-pagination
          style="margin-top:25px"        
          background
          @current-change="handleCurrentChange($event)"
          :current-page="current_page"
          :total="1000"
          layout="prev, pager, next"          
          >
        </el-pagination>
<!-- pagination end here-->

<!-- View Dialog start here-->
      <el-dialog
        adaptive
        title="Check Data"
        :visible.sync="ViewDialogShow"
        width="30%">
        <h3>Info</h3>
        <el-form v-if="ViewDialogShow">
          <el-form-item label="No">
            <el-input v-model="dialogdataForm.no" disabled />
          </el-form-item>
          <el-form-item label="Vin">
            <el-input v-model="dialogdataForm.vin" disabled />
          </el-form-item>
          <el-form-item label="Model">
            <el-input v-model="dialogdataForm.cardetails.model" disabled />
          </el-form-item>
          <el-form-item label="make">
            <el-input v-model="dialogdataForm.cardetails.make" disabled />
          </el-form-item>
          <el-form-item label="Year">
            <el-input v-model="dialogdataForm.cardetails.year" disabled />
          </el-form-item>
          <el-form-item label="Msrp">
            <el-input v-model="dialogdataForm.cardetails.msrp" />
          </el-form-item>
          <el-form-item label="Status">
            <el-select v-model="dialogdataForm.carstatuses.status" placeholder="Select">
              <el-option
                v-for="item in carstatusoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Booked">
              <el-select v-model="dialogdataForm.carstatuses.booked" placeholder="Select">
              <el-option
                v-for="item in yesorno"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Listed">
            <el-select v-model="dialogdataForm.carstatuses.listed" placeholder="Select">
              <el-option
                v-for="item in yesorno"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="updateDialog">Update</el-button>        
                    <el-button type="warning" @click="deleteDialog">Delete</el-button>        
                    <el-button @click="cancelDialog">Cancel</el-button>
                  </span>
      </el-dialog>
<!-- View Dialog end here-->      

<!-- Add Dialog start here-->
      <el-dialog
        adaptive
        title="Add Data"
        :visible.sync="DialogShow"
        width="30%">
        <h3>Info</h3>
        <el-form v-if="DialogShow">
          <el-form-item label="Vin">
            <el-input v-model="dialogdataForm.vin"  />
          </el-form-item>
          <el-form-item label="Model">
            <el-input v-model="dialogdataForm.cardetails.model"  />
          </el-form-item>
          <el-form-item label="make">
            <el-input v-model="dialogdataForm.cardetails.make"  />
          </el-form-item>
          <el-form-item label="Year">
            <el-input v-model="dialogdataForm.cardetails.year"  />
          </el-form-item>
          <el-form-item label="Msrp">
            <el-input v-model="dialogdataForm.cardetails.msrp" />
          </el-form-item>
          <el-form-item label="Status">
            <el-select v-model="dialogdataForm.carstatuses.status" placeholder="Select">
              <el-option
                v-for="item in carstatusoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Booked">
              <el-select v-model="dialogdataForm.carstatuses.booked" placeholder="Select">
              <el-option
                v-for="item in yesorno"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Listed">
            <el-select v-model="dialogdataForm.carstatuses.listed" placeholder="Select">
              <el-option
                v-for="item in yesorno"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addDialog">Save</el-button>        
                    <el-button @click="cancelDialog">Cancel</el-button>
                  </span>
      </el-dialog>
<!-- Add Dialog end here-->      
  </div>
</template>

<script>
  import axios from 'axios'
  import * as Promise from 'bluebird'
  export default {
    data: () => ({
      ViewDialogShow:false,
        multipleSelection: [],
        reverseoptions: [{
          value: 'True',
          label: 'True'
        }, {
          value: 'False',
          label: 'False'
        }],
        reversevalue: 'true',
        filteroptions: [{
          value: 'All',
          label: 'All'
        },{
          value: 'Make',
          label: 'Make'
        }, {
          value: 'Model',
          label: 'Model'
        }, {
          value: 'Year',
          label: 'Year'
        }],
        yesorno: [{
          value: 'y',
          label: 'y'
        },{
          value: 'n',
          label: 'n'
        }],
        carstatusoptions: [{
          value: 'Ordered',
          label: 'Ordered'
        },{
          value: 'Sold',
          label: 'Sold'
        },{
          value: 'In Stock',
          label: 'In Stock'
        }],
        filtervalue: 'All',
        DialogShow:false,
        current_page:1,
        dialogdataForm:{
          vin: "",
          carstatuses:{
            status: "",
            booked: "",
            listed: "",
          },
          cardetails:{
            model: "",
            make:  "",
            year:  "",
            msrp:  "",
          },
		    },
        tableData: null
    }),
    created(){

        this.fetchtableData()        
    },
    methods: {
      clickFile(){
        alert("준비중입니다.")
      },
      initializeDialog(){
        this.dialogdataForm={
          vin: "",
          carstatuses:{
            status: "",
            booked: "",
            listed: "",
          },
          cardetails:{
            model: "",
            make:  "",
            year:  "",
            msrp:  "",
          },
		    }
      },
      addDialog(){
          let self=this
          self.DialogShow=false
          axios.post(`http://localhost:3500/`,self.dialogdataForm 
          ).then(function(response){
            console.log(response)
            self.$message({
              type: 'success',
              message: "successfully inserted"
            });            
            self.fetchtableData()
          }).catch(err=>{
            console.log(err)
          });  
      },
      clickAdd(){
        this.initializeDialog()
        this.DialogShow=true
      },
      clickDelete(){
        let self=this,
            promisearray=[]
        self.multipleSelection.map(ms=>{
            let promise=new Promise(function(resolve){
              axios.delete(`http://localhost:3500/`,{
                data:ms
              }).then(function(response){
                return resolve(response)
              });
            })
            promisearray.push(promise)
        })
        Promise.all(promisearray).then(data=>{
            self.$message({
                type: 'success',
                message: "successfully deleted"
            });
            self.fetchtableData()
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
        console.log(this.multipleSelection)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      viewRow(index, row) {
        this.ViewDialogShow=true
        this.dialogdataForm=row
      },
      updateDialog(){
        let self=this
        self.$confirm('업데이트를 하시겠습니까?', 'Info', {
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          type: 'info'
        }).then(() => {
          self.ViewDialogShow=false
          console.log(self.dialogdataForm)
          axios.put(`http://localhost:3500/`,self.dialogdataForm 
          ).then(function(response){
            console.log(response)
            self.$message({
              type: 'success',
              message: "successfully updated"
            });            
            self.fetchtableData()
          });
        })
        .catch(err=>{
          self.$message({
            type: 'warning',
            message: 'failed'
          });
        })
      },
      deleteDialog(){
        let self=this
        console.log(self.dialogdataForm.no)
        self.$confirm('지우시겠습니까?', 'Info', {
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          type: 'info'
        }).then(() => {
          self.ViewDialogShow=false
          axios.delete(`http://localhost:3500/`,{
            data:self.dialogdataForm 
          }).then(function(response){
            console.log(response)
            self.$message({
              type: 'success',
              message: "successfully deleted"
            });
            self.fetchtableData()
          });
        })
        .catch(err=>{
          console.log(err)
          self.$message({
            type: 'warning',
            message: 'failed'
          });
        })      },
      cancelDialog(){
        this.ViewDialogShow=false
      },
      clickUpdate(){
        this.fetchtableData()        
      },
      handleCurrentChange(pg){
        this.current_page=pg
        this.fetchtableData()        
      },
      fetchtableData(){
        let self=this
        axios.get(`http://localhost:3500/${this.filtervalue}/${this.current_page}/${this.reversevalue}`).then(function(response){
          //console.log(response.data)
          self.tableData=response.data
        });
      }            

    }
  }
</script>

<style>

</style>
