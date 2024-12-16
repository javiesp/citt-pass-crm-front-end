import{_ as D,d as y,a as r,e as C,b as a,w as t,g,F as A,u as U,o as j,h as i}from"./entry.5d6c19b6.js";import{g as I,c as w,d as E,u as P}from"./rackApi.412b9ffa.js";import"./axios.4d564c32.js";const N=y({name:"rackItem",data(){return{loading:!1,search:"",itemsPerPage:5,rowsPerPageItems:[{title:"5",value:5},{title:"10",value:10},{title:"25",value:25},{title:"50",value:50}],headers:[{title:"ID",value:"rack_id"},{title:"Tipo de rack",value:"rack_type"},{title:"Nombre",value:"rack_name"},{title:"Acciones",value:"actions"}],dialog:!1,rackArray:[],rackNames:[],rackId:null,searchQuery:"",totalRows:0,selectedRack:null,dialogVisible:!1,dialogUpdateVisible:!1,alertVisible:!1,errorAlertVisible:!1,objectDto:{rack_id:null,rack_type:"",rack_name:""},loading:!1,max:2934875}},computed:{filteredRack(){return this.searchQuery?this.rackArray.filter(e=>e.rack_name.toLowerCase().includes(this.searchQuery.toLowerCase())):this.rackArray}},methods:{verifyTokenAuth(e){const o=U();e||o.push("/login"),typeof e=="string"&&e.split(".").length!==3&&o.push("/login")},async getRack(){this.loading=!0;try{const e=await I();console.log(e.data),this.rackArray=e.data,this.rackNames=this.rackArray.map(o=>o.rack_name)}catch(e){console.error("Error al obtener Racks:",e),this.errorAlertVisible=!0}finally{this.loading=!1}},downloadPdf(){const e=document.createElement("a");e.href=this.pdfUrl,e.target="_blank",e.download=this.pdfFileName,document.body.appendChild(e),e.click(),document.body.removeChild(e)},openCreateDialog(){this.dialog=!0},closeCreateDialog(){this.dialog=!1},getRandomInt(){const e=Math.floor(Math.random()*this.max);return this.objectDto.rack_id=e,console.log("NUMERO",e),e},async saveRack(){this.getRandomInt(),this.objectDto.rack_id,this.objectDto.rack_type,this.objectDto.rack_name,console.log("Guardar Rack",this.objectDto);try{const e=await w(this.objectDto);this.dialog=!1,this.getRack(),console.log("CREATED",e),this.clearInput(),this.alertVisible=!0,this.objectDto={rack_id:this.rackId,rack_type:"",rack_name:""}}catch(e){console.error("No se ha podido crear el rack",this.objectDto.rack_id,e),this.errorAlertVisible=!0}},openDeleteDialog(e){this.rackId=e._id,console.log("ITEM",this.rackId),this.dialogVisible=!0},closeDeleteDialog(){this.dialogVisible=!1},async confirmDeleteRack(){try{const e=await E(this.rackId);this.dialogVisible=!1,this.getRack(),console.log("DELETED",e),this.alertVisible=!0}catch(e){console.error("No se ha podido eliminar el rack",this.rackId,e),this.errorAlertVisible=!0}},openUpdateDialog(e){this.objectDto={rack_type:e.rack_type,rack_name:e.rack_name},this.rackId=e._id,this.dialogUpdateVisible=!0},closeUpdateDialog(){this.clearInput(),this.dialogUpdateVisible=!1},async updateRack(){console.log("ERORRRRRRRRRR",this.objectDto);const e={rack_type:this.objectDto.rack_type,rack_name:this.objectDto.rack_name};console.log(e);try{const o=await P(this.rackId,e);this.dialogVisible=!1,this.getRack(),console.log("UPDATED",o),this.clearInput(),this.alertVisible=!0,this.dialogUpdateVisible=!1}catch(o){console.error("No se ha podido actualizar el rack",this.rackId,o),this.clearInput(),this.errorAlertVisible=!0}},clearInput(){this.objectDto={rack_id:null,rack_type:null,rack_name:null}}},mounted(){const e=localStorage.getItem("accessToken");this.verifyTokenAuth(e),this.getRack()}}),T=g("h2",null,"Gestor Rack",-1),$={class:"pa-4 text-center"},z={class:"pa-4 text-center"};function B(e,o,G,M,q,F){const c=r("v-text-field"),n=r("v-col"),s=r("v-btn"),u=r("v-divider"),_=r("v-icon"),b=r("v-data-table"),d=r("v-card"),m=r("v-row"),p=r("v-spacer"),v=r("v-card-title"),k=r("v-card-text"),h=r("v-card-actions"),f=r("v-dialog"),V=r("v-alert");return j(),C(A,null,[T,a(m,{class:"month-table"},{default:t(()=>[a(n,{cols:"3"},{default:t(()=>[a(c,{modelValue:e.search,"onUpdate:modelValue":o[0]||(o[0]=l=>e.search=l),class:"mx-auto",density:"comfortable","menu-icon":"",placeholder:"Buscar Rack","prepend-inner-icon":"mdi-magnify",theme:"light",variant:"solo","auto-select-first":"","item-props":"",hint:"Escriba para buscar",rounded:""},null,8,["modelValue"])]),_:1}),a(n,{cols:"3"},{default:t(()=>[a(s,{variant:"tonal",color:"primary",onClick:e.downloadPdf},{default:t(()=>[i("Generar archivo .csv")]),_:1},8,["onClick"])]),_:1}),a(n,{cols:"6",class:"text-right"},{default:t(()=>[a(s,{variant:"tonal",color:"primary","prepend-icon":"mdi-folder-outline",onClick:e.openCreateDialog},{default:t(()=>[i("Agregar Rack")]),_:1},8,["onClick"])]),_:1}),a(n,{cols:"12",sm:"12"},{default:t(()=>[a(d,{variant:e.variant,class:"mx-auto"},{default:t(()=>[a(u),a(n,null,{default:t(()=>[a(b,{"items-per-page":e.itemsPerPage,"onUpdate:itemsPerPage":o[1]||(o[1]=l=>e.itemsPerPage=l),"items-per-page-options":e.rowsPerPageItems,headers:e.headers,items:e.rackArray,loading:e.loading,search:e.search},{"item.actions":t(({item:l})=>[a(s,{class:"ml-2",color:"primary",icon:"",size:"x-small",flat:"",onClick:R=>e.openUpdateDialog(l)},{default:t(()=>[a(_,null,{default:t(()=>[i("mdi-pencil")]),_:1})]),_:2},1032,["onClick"]),a(s,{class:"ml-2",color:"error",icon:"",size:"x-small",flat:"",onClick:R=>e.openDeleteDialog(l)},{default:t(()=>[a(_,null,{default:t(()=>[i("mdi-delete")]),_:1})]),_:2},1032,["onClick"])]),_:1},8,["items-per-page","items-per-page-options","headers","items","loading","search"])]),_:1})]),_:1},8,["variant"])]),_:1})]),_:1}),a(f,{modelValue:e.dialogVisible,"onUpdate:modelValue":o[2]||(o[2]=l=>e.dialogVisible=l),"max-width":"400"},{default:t(()=>[a(d,null,{default:t(()=>[a(p),a(v,{class:"text-h5"},{default:t(()=>[i("Confirmar Eliminación")]),_:1}),a(k,null,{default:t(()=>[i("¿Estás seguro de que deseas eliminar este rack?")]),_:1}),a(h,null,{default:t(()=>[a(p),a(s,{color:"error",text:"",onClick:e.closeDeleteDialog},{default:t(()=>[i("Cancelar")]),_:1},8,["onClick"]),a(s,{color:"primary",text:"",onClick:e.confirmDeleteRack},{default:t(()=>[i("Eliminar")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),g("div",$,[a(f,{modelValue:e.dialog,"onUpdate:modelValue":o[5]||(o[5]=l=>e.dialog=l),"max-width":"600"},{default:t(()=>[a(d,{"prepend-icon":"mdi-folder-outline",title:"Agregar Rack"},{default:t(()=>[a(k,null,{default:t(()=>[a(m,{dense:""},{default:t(()=>[a(n,{cols:"12",md:"4",sm:"6"},{default:t(()=>[a(c,{label:"Tipo Rack",required:"",modelValue:e.objectDto.rack_type,"onUpdate:modelValue":o[3]||(o[3]=l=>e.objectDto.rack_type=l)},null,8,["modelValue"])]),_:1}),a(n,{cols:"12",md:"4",sm:"6"},{default:t(()=>[a(c,{hint:"Rack",label:"Nombre Rack",modelValue:e.objectDto.rack_name,"onUpdate:modelValue":o[4]||(o[4]=l=>e.objectDto.rack_name=l)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),a(u),a(h,null,{default:t(()=>[a(p),a(s,{color:"error",text:"Cancelar",variant:"plain",onClick:e.closeCreateDialog},null,8,["onClick"]),a(s,{color:"primary",text:"Guardar rack",variant:"tonal",onClick:e.saveRack},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),g("div",z,[a(f,{modelValue:e.dialogUpdateVisible,"onUpdate:modelValue":o[8]||(o[8]=l=>e.dialogUpdateVisible=l),"max-width":"600"},{default:t(()=>[a(d,{"prepend-icon":"mdi-folder-outline",title:"Actualizar Rack"},{default:t(()=>[a(k,null,{default:t(()=>[a(m,{dense:""},{default:t(()=>[a(n,{cols:"12",md:"4",sm:"6"},{default:t(()=>[a(c,{label:"Tipo Rack",required:"",modelValue:e.objectDto.rack_type,"onUpdate:modelValue":o[6]||(o[6]=l=>e.objectDto.rack_type=l)},null,8,["modelValue"])]),_:1}),a(n,{cols:"12",md:"4",sm:"6"},{default:t(()=>[a(c,{hint:"Rack",label:"Nombre Rack",modelValue:e.objectDto.rack_name,"onUpdate:modelValue":o[7]||(o[7]=l=>e.objectDto.rack_name=l)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),a(u),a(h,null,{default:t(()=>[a(s,{color:"error",text:"",onClick:e.closeUpdateDialog},{default:t(()=>[i("Cancelar")]),_:1},8,["onClick"]),a(s,{color:"primary",text:"",onClick:e.updateRack},{default:t(()=>[i("Actualizar")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),a(V,{modelValue:e.errorAlertVisible,"onUpdate:modelValue":o[9]||(o[9]=l=>e.errorAlertVisible=l),dismissible:"",color:"red",border:"left",elevation:"2","colored-border":"",icon:"mdi-alert",timeout:"5000"},{default:t(()=>[i(" Oops! Ha ocurrido un problema. ")]),_:1},8,["modelValue"])],64)}const H=D(N,[["render",B]]);export{H as default};