import{g as X,a as P,c as F,u as N,d as B}from"./userApi.a8dbcbe7.js";import{a as $}from"./axios.4d564c32.js";import{g as M}from"./projectApi.98219bc6.js";import{q as L,_ as H,d as z,a as n,o as O,e as K,b as o,w as l,h as d,g as m,F as W}from"./entry.5d6c19b6.js";import{l as Y}from"./index.fa76b92a.js";$.defaults.validateStatus=function(e){return e>=200&&e<300};const V=$.create({baseURL:"https://citt-pass-api-gateaway-backend-production.up.railway.app",timeout:1e5}),A=localStorage.getItem("accessToken");V.interceptors.request.use(e=>(A&&(e.headers.Authorization=`Bearer ${A}`),e),e=>Promise.reject(e));V.interceptors.response.use(e=>e,e=>Promise.reject(e));const J=()=>V.get("/check-in/find-all-check-in"),Z=(e,t)=>V.get("/check-in/find-by-day-and-user",{params:{date:e,uid_user:t}}),G=e=>(console.log(e),V.post("/check-in/create-check-in",e));var Q=Y;const x=L(Q),ee=z({data(){return{loading:!1,search:"",itemsPerPage:5,rowsPerPageItems:[{title:"5",value:5},{title:"10",value:10},{title:"25",value:25},{title:"50",value:50}],headers:[{title:"UID",value:"uid_user"},{title:"Nombre",value:"name"},{title:"Mail",value:"email"},{title:"Teléfono",value:"phone"},{title:"ID Proyecto",value:"proyect_id"},{title:"Acciones",value:"actions"},{title:"Lista",value:"checkin"},{title:"Asistencia",value:"asist"}],dialog:!1,dialogCheckin:!1,dialogProject:!1,dialogDelete:!1,dialogUpdate:!1,errorAlertVisible:!1,selectedItem:{},selectItem:null,variant:null,checkInArray:[],usersArray:[],projectArray:[],projectsNames:[],selectorOP:["Proyecto CITT","MMT"],projectId:0,totalRows:0,selectedProyect:null,items:[1,2,3,4,5,6,7,8,9,10],userRole:["Admin citt","Profesor","Alumno","CIA","MMT"],uidUser:["OIUUYFASD","ASDIUAD908","908DKJHAS"],userId:null,UID_USER:[],entryReason:null,entryDate:null,assited:!1,post:{uid_user:null,email:null,phone:null,name:null,hashed_password:null,run:null,project_id:null},itemId:null,errorText:"",passwordVisible:!1,studentName:null,motivoEntrada:null,messageError:!0,local_project:null}},computed:{formattedRun:{get(){return this.rutFormat(this.post.run)},set(e){this.post.run=e.replace(/\./g,"").replace(/-/g,"")}}},async created(){this.local_project=localStorage.getItem("project_id"),!this.local_project||this.local_project.trim()===""?this.dialogProject=!0:this.dialogProject=!1,await Promise.all([this.getProjects(),this.getUsers(this.local_project)])},methods:{async getAll(){this.loading=!0;try{const e=await X();this.usersArray=e.data;const t=this.usersArray.map(async r=>{r.asistioHoy=await this.checkIfAttendedToday(r.uid_user)});await Promise.all(t)}catch(e){console.error("Error fetching users:",e),this.errorAlertVisible=!0}finally{this.loading=!1}},async checkIfAttendedToday(e){try{const t=new Date,r=`${t.getDate().toString().padStart(2,"0")}/${(t.getMonth()+1).toString().padStart(2,"0")}/${t.getFullYear()}`;return(await Z(r,e)).data.length>0}catch(t){return console.error(`Error checking attendance for user ${e}:`,t),!1}},async getUsers(e){this.local_project=localStorage.getItem("project_id"),this.loading=!0;try{const t=await P(this.local_project);this.usersArray=t.data;const r=this.usersArray.map(async c=>{c.asistioHoy=await this.checkIfAttendedToday(c.uid_user)});await Promise.all(r)}catch(t){console.error("Error fetching users:",t),this.errorAlertVisible=!0}finally{this.loading=!1}},async getProjects(){this.loading=!0;try{const e=await M();this.projectArray=e.data,this.projectsNames=this.projectArray.map(t=>t.project_name),this.totalRows=e.data.total}catch(e){console.error("Error al obtener proyectos:",e)}finally{this.loading=!1}},async editItem(e){this.post={...e},this.dialogCheckin=!0,this.userId=e.uid_user,this.studentName=e.name},async updateItem(e){this.post={...e},this.itemId=e._id,this.dialogUpdate=!0},async getCheckIn(){try{const e=await J();this.checkInArray=e.data}catch(e){console.log(e)}},async createCheckIn(){const e={uid_user:this.userId,entry_date:null,entry_reason:`${this.studentName}: ${this.entryReason} - ${this.motivoEntrada}`,times_entered:null};try{this.loading=!0;const t=await G(e);this.dialogCheckin=!1,this.clearInput()}catch(t){console.log(t)}finally{this.loading=!1}},async createUser(){const e=x.generate();this.post.email=this.post.email.toLowerCase(),this.post.uid_user=e,console.log(this.post);const t={uid_user:this.post.uid_user,email:this.post.email,phone:this.post.phone,name:this.post.name,hashed_password:this.post.hashed_password,run:this.post.run,proyect_id:this.post.project_id};try{await F(t),this.local_project=this.post.project_id,localStorage.removeItem("project_id"),localStorage.setItem("project_id",this.local_project),await this.getUsers(this.local_project),this.clearInput(),this.dialog=!1}catch(r){console.log(r)}},async updateUser(){const e={email:this.post.email,phone:this.post.phone,name:this.post.name,run:this.post.run,proyect_id:this.post.project_id};try{await N(this.itemId,e),this.local_project=this.post.project_id,localStorage.removeItem("project_id"),localStorage.setItem("project_id",this.local_project),await this.getUsers(this.local_project),this.clearInput(),this.dialogUpdate=!1}catch(t){console.log(t),this.errorAlertVisible=!0}},closeUpdate(){this.clearInput(),this.dialogUpdate=!1},selectProject(){this.dialogProject=!1,this.loading=!0;const e=this.selectedItem.id;localStorage.setItem("project_id",e),this.getProjectById()},async getProjectById(){this.local_project=localStorage.getItem("project_id");try{const e=await P(this.local_project);this.usersArray=e.data,this.totalRows=e.data.total;const t=this.usersArray.map(async r=>{r.asistioHoy=await this.checkIfAttendedToday(r.uid_user)});await Promise.all(t),window.location.reload()}catch(e){console.error("Error al obtener usuarios:",e)}finally{this.loading=!1}},openDeleteDialog(e){this.dialogDelete=!0,this.itemId=e._id},rutFormat(e){let t=e.replace(/^0+/,"").replace(/\./g,"").replace(/-/g,"");if(t.length>1){let r=t.slice(0,-1),c=t.slice(-1).toUpperCase();return r=r.replace(/\B(?=(\d{3})+(?!\d))/g,"."),`${r}-${c}`}return e},validateRun(e){if(!e)return"El RUT es requerido";const t=e.replace(/\./g,"").replace(/-/g,"");if(!/^\d{7,8}[0-9Kk]$/.test(t))return"RUT inválido";const r=t.slice(0,-1),c=t.slice(-1).toUpperCase();let _=0,g=2;for(let p=r.length-1;p>=0;p--)_+=g*parseInt(r.charAt(p),10),g=g===7?2:g+1;const u=_%11,s=u===0?"0":u===1?"K":(11-u).toString();return c!==s?"RUT inválido":!0},phoneFormat(e){let t=e.replace(/\D/g,"");return t.length===0?e:t.startsWith("9")&&(t.length===8||t.length===9)?t.length===9?`${t.slice(0,1)}${t.slice(1,5)}${t.slice(5)}`:`${t.slice(0,1)}${t.slice(1,4)}${t.slice(4)}`:e},validatePhone(e){let t=e.replace(/\D/g,"");return t?!t.startsWith("9")||!(t.length===8||t.length===9)?"El teléfono debe comenzar con '9' y tener 8 o 9 dígitos":!0:"El teléfono es obligatorio"},validateEmail(e){return e?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)?!0:"El correo debe tener un formato válido y no contener espacios ni símbolos inválidos":"El correo es obligatorio"},validatePassword(e){if(!e)return"La contraseña es obligatoria";if(e.length<9)return"La contraseña debe tener al menos 9 caracteres";const t=/[a-zA-Z]/.test(e),r=/[!@#$%^&*()_+{}\[\]:;"'<>,.?~`-]/.test(e),c=/[0-9]/.test(e);return!t||!r||!c?"La contraseña debe contener al menos una letra, un símbolo y un número":!0},isFormValid(){return this.post.name&&this.post.email&&this.post.phone&&this.post.hashed_password&&this.post.project_id?!0:(this.messageError="Todos los campos son obligatorios",!1)},async deleteItem(){try{this.loading=!0,await B(this.itemId),await this.getUsers(this.local_project),this.dialogDelete=!1}catch(e){console.error(e)}finally{this.loading=!1}},logout(){localStorage.removeItem("project_id"),this.dialogProject=!0},closeCreate(){this.clearInput(),this.dialog=!1},downloadPdf(){const e=document.createElement("a");e.href=this.pdfUrl,e.target="_blank",e.download=this.pdfFileName,document.body.appendChild(e),e.click(),document.body.removeChild(e)},clearInput(){this.post={uid_user:null,email:null,phone:null,name:null,hashed_password:null,run:null,project_id:null}}},watch:{selectedProyect:function(e,t){e!==t&&this.getUsers(this.local_project)}}}),te={class:"pa-4 text-center"},oe=m("small",{class:"text-caption text-medium-emphasis"},"* Indica que el campo es obligatorio",-1),le=["disbled"],ae={class:"pa-4 text-center"},se=m("small",{class:"text-caption text-medium-emphasis"},"* Indica que el campo es obligatorio",-1),re=m("span",{class:"my-letra"},"Proyecto",-1),ne=m("p",{class:"letra-abajo"}," Es necesario que seleccione su proyecto para poder gestionar ",-1),ie=m("span",null,"Confirmar Eliminación",-1);function de(e,t,r,c,_,g){const u=n("v-text-field"),s=n("v-col"),p=n("v-spacer"),i=n("v-btn"),C=n("v-tooltip"),b=n("v-divider"),w=n("v-icon"),E=n("v-switch"),R=n("v-data-table"),h=n("v-card"),f=n("v-row"),U=n("v-card-title"),S=n("v-textarea"),D=n("v-select"),y=n("v-card-text"),v=n("v-dialog"),k=n("v-autocomplete"),j=n("v-card-actions"),T=n("v-container"),q=n("v-alert");return O(),K(W,null,[o(f,{class:"month-table"},{default:l(()=>[o(s,{cols:"3"},{default:l(()=>[o(u,{modelValue:e.search,"onUpdate:modelValue":t[0]||(t[0]=a=>e.search=a),class:"mx-auto",density:"comfortable","menu-icon":"",placeholder:"Buscar Usuario","prepend-inner-icon":"mdi-magnify",theme:"light",variant:"solo","auto-select-first":"","item-props":"",hint:"Escriba para buscar",rounded:""},null,8,["modelValue"])]),_:1}),o(s,{cols:"3"},{default:l(()=>[o(p),o(i,{variant:"tonal",color:"primary","prepend-icon":"mdi-account",onClick:t[1]||(t[1]=a=>e.dialog=!0),text:"Registrar nuevo usuario"})]),_:1}),o(s,{cols:"3"},{default:l(()=>[o(p),o(i,{variant:"tonal",color:"red","prepend-icon":"mdi-logout",onClick:e.logout},{default:l(()=>[d(" cambiar de proyecto "),o(C,{activator:"parent",location:"bottom"},{default:l(()=>[d("Muestra los usuarios según el proyecto")]),_:1})]),_:1},8,["onClick"])]),_:1}),o(s,{cols:"3"},{default:l(()=>[o(p),o(i,{variant:"tonal",color:"red","prepend-icon":"mdi-account-search",onClick:e.getAll},{default:l(()=>[d(" Buscar todos "),o(C,{activator:"parent",location:"bottom"},{default:l(()=>[d("Muestra todos los usuarios")]),_:1})]),_:1},8,["onClick"])]),_:1}),o(s,{cols:"12",sm:"12"},{default:l(()=>[o(h,{class:"mx-auto"},{default:l(()=>[o(b),o(s,null,{default:l(()=>[o(R,{"items-per-page":e.itemsPerPage,"onUpdate:itemsPerPage":t[2]||(t[2]=a=>e.itemsPerPage=a),"items-per-page-options":e.rowsPerPageItems,headers:e.headers,items:e.usersArray,loading:e.loading,search:e.search,"item-key":"uid_user"},{"item.actions":l(({item:a})=>[o(i,{class:"ml-2",color:"error",icon:"",size:"x-small",flat:"",onClick:I=>e.openDeleteDialog(a)},{default:l(()=>[o(w,null,{default:l(()=>[d("mdi-delete")]),_:1})]),_:2},1032,["onClick"]),o(i,{class:"ml-2",color:"primary",icon:"",size:"x-small",flat:"",onClick:I=>e.updateItem(a)},{default:l(()=>[o(w,null,{default:l(()=>[d("mdi-pencil")]),_:1})]),_:2},1032,["onClick"])]),"item.checkin":l(({item:a})=>[o(i,{class:"ml-2",color:"primary",flat:"",onClick:I=>e.editItem(a)},{default:l(()=>[d(" Ingresar ")]),_:2},1032,["onClick"])]),"item.asist":l(({item:a})=>[o(E,{modelValue:a.asistioHoy,"onUpdate:modelValue":I=>a.asistioHoy=I,inset:"",color:"primary"},null,8,["modelValue","onUpdate:modelValue"])]),_:1},8,["items-per-page","items-per-page-options","headers","items","loading","search"])]),_:1})]),_:1})]),_:1})]),_:1}),o(v,{modelValue:e.dialogCheckin,"onUpdate:modelValue":t[6]||(t[6]=a=>e.dialogCheckin=a),"max-width":"600"},{default:l(()=>[o(h,null,{default:l(()=>[o(U,null,{default:l(()=>[d("Registrar ingreso citt")]),_:1}),o(y,null,{default:l(()=>[o(f,null,{default:l(()=>[o(s,null,{default:l(()=>[o(S,{modelValue:e.entryReason,"onUpdate:modelValue":t[3]||(t[3]=a=>e.entryReason=a),label:"Motivo"},null,8,["modelValue"])]),_:1}),o(s,null,{default:l(()=>[o(D,{modelValue:e.motivoEntrada,"onUpdate:modelValue":t[4]||(t[4]=a=>e.motivoEntrada=a),items:e.selectorOP,label:"Seleciona una opción"},null,8,["modelValue","items"])]),_:1})]),_:1}),o(i,{class:"ml-2",flat:"",onClick:t[5]||(t[5]=a=>e.dialogCheckin=!1)},{default:l(()=>[d(" Cancelar ")]),_:1}),o(i,{class:"ml-2",color:"primary",flat:"",onClick:e.createCheckIn},{default:l(()=>[d(" Registrar ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),m("div",te,[o(v,{modelValue:e.dialog,"onUpdate:modelValue":t[16]||(t[16]=a=>e.dialog=a),"max-width":"600"},{default:l(()=>[o(h,{"prepend-icon":"mdi-account",title:"Crear Usuario"},{default:l(()=>[o(y,null,{default:l(()=>[o(f,{dense:""},{default:l(()=>[o(s,{cols:"12",md:"4",sm:"6"},{default:l(()=>[o(u,{modelValue:e.post.name,"onUpdate:modelValue":t[7]||(t[7]=a=>e.post.name=a),label:"Nombre*",required:""},null,8,["modelValue"])]),_:1}),o(s,{cols:"12",md:"4",sm:"6"},{default:l(()=>[o(u,{modelValue:e.post.email,"onUpdate:modelValue":t[8]||(t[8]=a=>e.post.email=a),hint:"email@duocuc.cl/ email@profesor.duoc.cl",label:"Email*",rules:[e.validateEmail],required:""},null,8,["modelValue","rules"])]),_:1}),o(s,{cols:"12",md:"4",sm:"6"},{default:l(()=>[o(u,{modelValue:e.post.phone,"onUpdate:modelValue":t[9]||(t[9]=a=>e.post.phone=a),hint:"Ej: +56 9 XXXX XXXX",label:"Teléfono*",required:"",rules:[e.validatePhone],onInput:t[10]||(t[10]=a=>e.post.phone=e.phoneFormat(e.post.phone))},null,8,["modelValue","rules"])]),_:1}),o(s,{cols:"11",md:"4",sm:"6"},{default:l(()=>[o(u,{modelValue:e.post.run,"onUpdate:modelValue":t[11]||(t[11]=a=>e.post.run=a),hint:"Ingresa el RUT sin puntos ni guion",label:"RUT*",rules:[e.validateRun],required:""},null,8,["modelValue","rules"])]),_:1}),o(s,{cols:"12",md:"4",sm:"6"},{default:l(()=>[o(u,{modelValue:e.post.hashed_password,"onUpdate:modelValue":t[12]||(t[12]=a=>e.post.hashed_password=a),hint:"Debe tener al menos 9 caracteres y contener al menos una letra, símbolo o número",label:"Contraseña*",rules:[e.validatePassword],required:"",type:e.passwordVisible?"text":"password","append-icon":"mdi-eye","onClick:append":t[13]||(t[13]=a=>e.passwordVisible=!e.passwordVisible)},null,8,["modelValue","rules","type"])]),_:1}),o(s,{cols:"12",sm:"6"},{default:l(()=>[o(k,{modelValue:e.post.project_id,"onUpdate:modelValue":t[14]||(t[14]=a=>e.post.project_id=a),label:"Selecciona un proyecto...",items:e.projectArray,"item-value":"project_id","item-title":"project_name",variant:"underlined",onChange:e.selectItem},null,8,["modelValue","items","onChange"])]),_:1})]),_:1}),oe,m("small",{disbled:!e.messageError,class:"text-caption text-medium-emphasis"},"* Indica que el campo es obligatorio",8,le)]),_:1}),o(b),o(j,null,{default:l(()=>[o(p),o(i,{text:"Cerrar",variant:"plain",onClick:t[15]||(t[15]=a=>e.closeCreate())}),o(i,{color:"primary",text:"Crear usuario",variant:"tonal",onClick:e.createUser,disabled:!e.isFormValid()},null,8,["onClick","disabled"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),m("div",ae,[o(v,{modelValue:e.dialogUpdate,"onUpdate:modelValue":t[24]||(t[24]=a=>e.dialogUpdate=a),"max-width":"600"},{default:l(()=>[o(h,{"prepend-icon":"mdi-account",title:"Crear Usuario"},{default:l(()=>[o(y,null,{default:l(()=>[o(f,{dense:""},{default:l(()=>[o(s,{cols:"12",md:"4",sm:"6"},{default:l(()=>[o(u,{modelValue:e.post.name,"onUpdate:modelValue":t[17]||(t[17]=a=>e.post.name=a),label:"Nombre*",required:""},null,8,["modelValue"])]),_:1}),o(s,{cols:"12",md:"4",sm:"6"},{default:l(()=>[o(u,{modelValue:e.post.email,"onUpdate:modelValue":t[18]||(t[18]=a=>e.post.email=a),hint:"email@duocuc.cl/ email@profesor.duoc.cl",label:"Email*",rules:[e.validateEmail],required:""},null,8,["modelValue","rules"])]),_:1}),o(s,{cols:"12",md:"4",sm:"6"},{default:l(()=>[o(u,{modelValue:e.post.phone,"onUpdate:modelValue":t[19]||(t[19]=a=>e.post.phone=a),hint:"Ej: +56 9 XXXX XXXX",label:"Teléfono*",required:"",rules:[e.validatePhone],onInput:t[20]||(t[20]=a=>e.post.phone=e.phoneFormat(e.post.phone))},null,8,["modelValue","rules"])]),_:1}),o(s,{cols:"12",md:"4",sm:"6"},{default:l(()=>[o(u,{modelValue:e.post.run,"onUpdate:modelValue":t[21]||(t[21]=a=>e.post.run=a),hint:"Ingresa el RUT sin puntos ni guion",label:"RUT*",rules:[e.validateRun],required:""},null,8,["modelValue","rules"])]),_:1}),o(s,{cols:"12",sm:"6"},{default:l(()=>[o(k,{modelValue:e.post.project_id,"onUpdate:modelValue":t[22]||(t[22]=a=>e.post.project_id=a),label:"Selecciona un proyecto...",items:e.projectArray,"item-value":"project_id","item-title":"project_name",variant:"underlined",onChange:e.selectItem},null,8,["modelValue","items","onChange"])]),_:1})]),_:1}),se]),_:1}),o(b),o(j,null,{default:l(()=>[o(p),o(i,{text:"Cerrar",variant:"plain",onClick:t[23]||(t[23]=a=>e.closeUpdate())}),o(i,{color:"primary",text:"Crear usuario",variant:"tonal",onClick:e.updateUser},null,8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),o(v,{modelValue:e.dialogProject,"onUpdate:modelValue":t[26]||(t[26]=a=>e.dialogProject=a),persistent:"",width:"600"},{default:l(()=>[o(h,null,{default:l(()=>[o(U,null,{default:l(()=>[re]),_:1}),o(y,null,{default:l(()=>[o(T,null,{default:l(()=>[o(f,null,{default:l(()=>[o(s,{cols:"12"},{default:l(()=>[o(k,{modelValue:e.selectedItem.id,"onUpdate:modelValue":t[25]||(t[25]=a=>e.selectedItem.id=a),label:"Selecciona un proyecto...",items:e.projectArray,"item-value":"project_id","item-title":"project_name",variant:"underlined"},null,8,["modelValue","items"]),ne]),_:1})]),_:1})]),_:1})]),_:1}),o(j,null,{default:l(()=>[o(p),o(i,{color:"primary",rounded:!0,elevation:"2",variant:"text",onClick:e.selectProject},{default:l(()=>[d(" Login ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),o(v,{modelValue:e.dialogDelete,"onUpdate:modelValue":t[28]||(t[28]=a=>e.dialogDelete=a),persistent:"","max-width":"500px"},{default:l(()=>[o(h,null,{default:l(()=>[o(U,null,{default:l(()=>[ie]),_:1}),o(y,null,{default:l(()=>[d(" ¿Estás seguro de que deseas eliminar esto? ")]),_:1}),o(j,null,{default:l(()=>[o(i,{onClick:t[27]||(t[27]=a=>e.dialogDelete=!1)},{default:l(()=>[d("Cancelar")]),_:1}),o(i,{color:"red",onClick:e.deleteItem},{default:l(()=>[d("Eliminar")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),o(q,{modelValue:e.errorAlertVisible,"onUpdate:modelValue":t[29]||(t[29]=a=>e.errorAlertVisible=a),dismissible:"",color:"red",elevation:"2","colored-border":"",icon:"mdi-alert",timeout:"5000"},{default:l(()=>[d(" Oops! Ha ocurrido un problema. ")]),_:1},8,["modelValue"])],64)}const ge=H(ee,[["render",de]]);export{ge as I,J as g};