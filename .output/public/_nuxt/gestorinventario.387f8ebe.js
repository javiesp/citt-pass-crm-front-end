import{_ as E,d as P,a as l,e as c,b as t,w as o,g as v,F as N,r as T,u as S,o as u,h as i,t as I}from"./entry.289fa0b3.js";import{a as A}from"./axios.4d564c32.js";import{g as $}from"./rackApi.412b9ffa.js";A.defaults.validateStatus=function(e){return e>=200&&e<300};const d=A.create({baseURL:"https://citt-pass-api-gateaway-backend-production.up.railway.app",timeout:1e5}),C=localStorage.getItem("accessToken");d.interceptors.request.use(e=>(C&&(e.headers.Authorization=`Bearer ${C}`),e),e=>Promise.reject(e));d.interceptors.response.use(e=>e,e=>Promise.reject(e));const L=()=>d.get("/inventory-management/find-all-inventories"),z=e=>d.get("/inventory-management/find-inventory-by-rack-id",{params:{rack_id:e}}),B=e=>d.delete("/inventory-management/delete-inventory/"+e),O=e=>(console.log(e),d.post("/inventory-management/create-inventory",e)),q=(e,a)=>(console.log("Datos enviados a la API:",a),d.put("/inventory-management/update-inventory/"+e,a)),M=()=>d.get("https://citt-pass-byteboosdt-api-production.up.railway.app/wishlist/find-all-wishList-types"),F=P({name:"inventoryItem",data(){return{loading:!1,search:"",itemsPerPage:5,rowsPerPageItems:[{title:"5",value:5},{title:"10",value:10},{title:"25",value:25},{title:"50",value:50}],headers:[{title:"ID",value:"inventory_id"},{title:"Nombre",value:"inventory_name"},{title:"Productos",value:"product_id"},{title:"Rack ID",value:"rack_id"},{title:"Acciones",value:"actions"}],dialog:!1,dialogRack:!0,selectItem:null,inventoryArray:[],inventoryNames:[],rackIds:[],rackNames:[],rackArray:[],productArray:[],rackId:null,inventoryId:T(null),searchQuery:"",dialogVisible:!1,dialogUpdateVisible:!1,alertVisible:!1,errorAlertVisible:!1,selectedItem:{},objectDto:{inventory_id:null,inventory_name:"",rack_id:null},max:12312312}},computed:{filteredInventory(){return this.searchQuery?this.inventoryArray.filter(e=>e.inventory_name.toLowerCase().includes(this.searchQuery.toLowerCase())):this.inventoryArray}},async created(){const e=localStorage.getItem("accessToken");this.verifyTokenAuth(e);let a=localStorage.getItem("rack_id_cach");!a||a.trim()===""?this.dialogRack=!0:this.dialogRack=!1,await this.getUsers(),await this.getProjects()},methods:{verifyTokenAuth(e){const a=S();e||a.push("/login"),typeof e=="string"&&e.split(".").length!==3&&a.push("/login")},async getInventory(){this.loading=!0;try{const e=await L();this.inventoryArray=e.data,this.inventoryNames=this.productArray.results.map(a=>inventory_name.name),console.log("INVENTARIOS"),console.log(this.inventoryNames)}catch(e){console.error("Error al obtener Inventarios:",e),this.errorAlertVisible=!0}finally{this.loading=!1}},async getWishlist(){try{const e=await M();this.productArray=e.data,console.log("ACA MIRA"),console.log(this.productArray)}catch(e){console.error("Error al obtener PRODUCTOS:",e)}},async getRack(){try{const e=await $();this.rackArray=e.data}catch(e){console.error("Error al obtener Racks:",e)}},downloadPdf(){const e=document.createElement("a");e.href=this.pdfUrl,e.target="_blank",e.download=this.pdfFileName,document.body.appendChild(e),e.click(),document.body.removeChild(e)},getRandomInt(){const e=Math.floor(Math.random()*this.max);return this.objectDto.inventory_id=e,console.log("NUMERO",e),e},async saveInventory(){this.getRandomInt();const e={inventory_id:this.objectDto.inventory_id,inventory_name:this.objectDto.inventory_name,rack_id:this.objectDto.rack_id};console.log(e);try{const a=await O(e);this.getInventory(),console.log("CREATED",a),this.cleanInput(),this.alertVisible=!0,this.dialog=!1}catch(a){console.error("No se ha podido crear el inventario",this.objectDto.inventory_id,a),this.errorAlertVisible=!0}},openDeleteDialog(e){console.log("ITEM",e._id),this.inventoryId=e._id,this.dialogVisible=!0},closeDeleteDialog(){this.dialogVisible=!1},async confirmDeleteInventory(){try{const e=await B(this.inventoryId);this.dialogVisible=!1,this.getInventory(),console.log("DELETED",e),this.alertVisible=!0}catch(e){console.error("No se ha podido eliminar el inventario",this.inventoryId,e),this.errorAlertVisible=!0}},openUpdateDialog(e){this.objectDto={inventory_name:e.inventory_name,rack_id:e.rack_id},this.inventoryId=e._id,this.dialogUpdateVisible=!0},closeUpdateDialog(){this.dialogUpdateVisible=!1,this.cleanInput()},async updateInventory(){console.log("DTO",this.objectDto);const e={inventory_name:this.objectDto.inventory_name,rack_id:this.objectDto.rack_id};try{const a=await q(this.inventoryId,e);this.dialogVisible=!1,this.getInventory(),console.log("UPDATED",a),this.cleanInput(),this.alertVisible=!0,this.dialogUpdateVisible=!1}catch(a){console.error("No se ha podido actualizar el proyecto",this.inventoryId,a),this.errorAlertVisible=!0}},async selectProject(){console.log("SELECTED"),localStorage.setItem("rack_id_cach",this.selectedItem),console.log(this.selectedItem,"<---");try{this.loading=!0;const e=await z(this.selectedItem);console.log(e),this.inventoryArray=e.data,this.loading=!1,this.dialogRack=!1}catch(e){console.error(e)}},openCreateDialog(){this.dialog=!0},closeCreateDialog(){this.dialog=!1},customTitle(){return"Seleccione un rack"},cleanInput(){this.objectDto={inventory_id:null,inventory_name:null,rack_id:null},console.log(this.objectDto)}},mounted(){this.getInventory(),this.getRack(),this.getWishlist()}}),Q=v("h2",null,"Inventarios Citt",-1),W={class:"pa-4 text-center"},G={key:0},H={key:1},J={class:"pa-4 text-center"},K={key:0},X={key:1},Y=v("span",{class:"my-letra"},"Rack",-1),Z={key:0},x={key:1},ee=v("p",{class:"letra-abajo"},"Es necesario que seleccione su grupo para poder gestionar",-1);function te(e,a,oe,ae,ne,le){const _=l("v-text-field"),s=l("v-col"),r=l("v-btn"),m=l("v-spacer"),f=l("v-divider"),V=l("v-icon"),w=l("v-data-table"),p=l("v-card"),k=l("v-row"),D=l("v-card-title"),y=l("v-card-text"),g=l("v-card-actions"),h=l("v-dialog"),b=l("v-autocomplete"),R=l("v-alert"),U=l("v-container");return u(),c(N,null,[Q,t(k,{class:"month-table"},{default:o(()=>[t(s,{cols:"3"},{default:o(()=>[t(_,{modelValue:e.search,"onUpdate:modelValue":a[0]||(a[0]=n=>e.search=n),class:"mx-auto",density:"comfortable","menu-icon":"",placeholder:"Buscar inventario","prepend-inner-icon":"mdi-magnify",theme:"light",variant:"solo","auto-select-first":"","item-props":"",hint:"Escriba para buscar",rounded:""},null,8,["modelValue"])]),_:1}),t(s,{cols:"3"},{default:o(()=>[t(r,{variant:"tonal",color:"primary","prepend-icon":"mdi-folder-outline",onClick:e.openCreateDialog},{default:o(()=>[i("Agregar Inventario")]),_:1},8,["onClick"])]),_:1}),t(s,{cols:"3"},{default:o(()=>[t(m),t(r,{variant:"tonal",color:"red","prepend-icon":"mdi-logout",onClick:a[1]||(a[1]=n=>e.dialogRack=!0),text:"cambiar de rack"})]),_:1}),t(s,{cols:"12",sm:"12"},{default:o(()=>[t(p,{variant:e.variant,class:"mx-auto"},{default:o(()=>[t(f),t(s,null,{default:o(()=>[t(w,{"items-per-page":e.itemsPerPage,"onUpdate:itemsPerPage":a[2]||(a[2]=n=>e.itemsPerPage=n),"items-per-page-options":e.rowsPerPageItems,headers:e.headers,items:e.inventoryArray,loading:e.loading,search:e.search},{"item.actions":o(({item:n})=>[t(r,{class:"ml-2",color:"primary",icon:"",size:"x-small",flat:"",onClick:j=>e.openUpdateDialog(n)},{default:o(()=>[t(V,null,{default:o(()=>[i("mdi-pencil")]),_:1})]),_:2},1032,["onClick"]),t(r,{class:"ml-2",color:"error",icon:"",size:"x-small",flat:"",onClick:j=>e.openDeleteDialog(n)},{default:o(()=>[t(V,null,{default:o(()=>[i("mdi-delete")]),_:1})]),_:2},1032,["onClick"])]),_:1},8,["items-per-page","items-per-page-options","headers","items","loading","search"])]),_:1})]),_:1},8,["variant"])]),_:1})]),_:1}),t(h,{modelValue:e.dialogVisible,"onUpdate:modelValue":a[3]||(a[3]=n=>e.dialogVisible=n),"max-width":"400"},{default:o(()=>[t(p,null,{default:o(()=>[t(m),t(D,{class:"text-h5"},{default:o(()=>[i("Confirmar Eliminación")]),_:1}),t(y,null,{default:o(()=>[i("¿Estás seguro de que deseas eliminar este inventario?")]),_:1}),t(g,null,{default:o(()=>[t(m),t(r,{color:"error",text:"",onClick:e.closeDeleteDialog},{default:o(()=>[i("Cancelar")]),_:1},8,["onClick"]),t(r,{color:"primary",text:"",onClick:e.confirmDeleteInventory},{default:o(()=>[i("Eliminar")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),v("div",W,[t(h,{modelValue:e.dialog,"onUpdate:modelValue":a[6]||(a[6]=n=>e.dialog=n),"max-width":"600"},{default:o(()=>[t(p,{"prepend-icon":"mdi-folder-outline",title:"Agregar Inventario"},{default:o(()=>[t(y,null,{default:o(()=>[t(k,{dense:""},{default:o(()=>[t(s,{cols:"12",md:"4",sm:"6"},{default:o(()=>[t(_,{label:"Nombre Inventario",required:"",modelValue:e.objectDto.inventory_name,"onUpdate:modelValue":a[4]||(a[4]=n=>e.objectDto.inventory_name=n)},null,8,["modelValue"])]),_:1}),t(s,null,{default:o(()=>[t(b,{modelValue:e.objectDto.rack_id,"onUpdate:modelValue":a[5]||(a[5]=n=>e.objectDto.rack_id=n),items:e.rackArray,"item-value":"rack_id","item-title":"rack_name",variant:"outlined","display-typed-values":!1},{selection:o(n=>[n.selectedItem?(u(),c("span",G,I(n.selectedItem.rack_name),1)):(u(),c("span",H,"No hay proyecto seleccionado"))]),_:1},8,["modelValue","items"])]),_:1})]),_:1})]),_:1}),t(f),t(g,null,{default:o(()=>[t(m),t(r,{color:"error",text:"Cancelar",variant:"plain",onClick:e.closeCreateDialog},null,8,["onClick"]),t(r,{color:"primary",text:"Guardar Inventario",variant:"tonal",onClick:e.saveInventory},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),v("div",J,[t(h,{modelValue:e.dialogUpdateVisible,"onUpdate:modelValue":a[9]||(a[9]=n=>e.dialogUpdateVisible=n),"max-width":"600"},{default:o(()=>[t(p,{"prepend-icon":"mdi-folder-outline",title:"Actualizar Inventario"},{default:o(()=>[t(y,null,{default:o(()=>[t(k,{dense:""},{default:o(()=>[t(s,{cols:"12",md:"4",sm:"6"},{default:o(()=>[t(_,{label:"Nombre Inventario",required:"",modelValue:e.objectDto.inventory_name,"onUpdate:modelValue":a[7]||(a[7]=n=>e.objectDto.inventory_name=n)},null,8,["modelValue"])]),_:1}),t(s,null,{default:o(()=>[t(b,{modelValue:e.objectDto.rack_id,"onUpdate:modelValue":a[8]||(a[8]=n=>e.objectDto.rack_id=n),items:e.rackArray,"item-value":"rack_id","item-title":"rack_name",variant:"outlined","display-typed-values":!1},{selection:o(n=>[n.selectedItem?(u(),c("span",K,I(n.selectedItem.rack_name),1)):(u(),c("span",X,"No hay proyecto seleccionado"))]),_:1},8,["modelValue","items"])]),_:1})]),_:1})]),_:1}),t(f),t(g,null,{default:o(()=>[t(r,{color:"error",text:"",onClick:e.closeUpdateDialog},{default:o(()=>[i("Cancelar")]),_:1},8,["onClick"]),t(r,{color:"primary",text:"",onClick:e.updateInventory},{default:o(()=>[i("Actualizar")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),t(R,{modelValue:e.errorAlertVisible,"onUpdate:modelValue":a[10]||(a[10]=n=>e.errorAlertVisible=n),dismissible:"",color:"red",elevation:"2","colored-border":"",icon:"mdi-alert",timeout:"5000"},{default:o(()=>[i(" Oops! Ha ocurrido un problema. ")]),_:1},8,["modelValue"]),t(h,{modelValue:e.dialogRack,"onUpdate:modelValue":a[12]||(a[12]=n=>e.dialogRack=n),persistent:"",width:"600"},{default:o(()=>[t(p,null,{default:o(()=>[t(D,null,{default:o(()=>[Y]),_:1}),t(y,null,{default:o(()=>[t(U,null,{default:o(()=>[t(s,{cols:"12"},{default:o(()=>[t(b,{modelValue:e.selectedItem,"onUpdate:modelValue":a[11]||(a[11]=n=>e.selectedItem=n),label:"Selecciona un proyecto...",items:e.rackArray,"item-value":"rack_id","item-title":"rack_name",variant:"underlined","display-typed-values":!1},{selection:o(n=>[n.selectedItem?(u(),c("span",Z,I(n.selectedItem.rack_name),1)):(u(),c("span",x,"No hay proyecto seleccionado"))]),_:1},8,["modelValue","items"]),ee]),_:1})]),_:1})]),_:1}),t(g,null,{default:o(()=>[t(m),t(r,{color:"primary",rounded:!0,elevation:"2",variant:"text",onClick:e.selectProject},{default:o(()=>[i(" Login ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}const de=E(F,[["render",te]]);export{de as default};