import{g as T,c as J,d as Z}from"./userApi.a0892e7f.js";import{a as M}from"./axios.4d564c32.js";import{g as Q}from"./projectApi.98219bc6.js";import{m as x,_ as ee,d as te,a as d,o as oe,e as re,b as o,w as r,h as m,g as w,F as ae}from"./entry.58387a37.js";M.defaults.validateStatus=function(e){return e>=200&&e<300};const I=M.create({baseURL:"https://citt-pass-api-gateaway-backend-production.up.railway.app",timeout:1e5}),q=localStorage.getItem("accessToken");I.interceptors.request.use(e=>(q&&(e.headers.Authorization=`Bearer ${q}`),e),e=>Promise.reject(e));I.interceptors.response.use(e=>e,e=>Promise.reject(e));const le=()=>I.get("/check-in/find-all-check-in"),se=(e,t)=>I.get("/check-in/find-by-day-and-user",{params:{date:e,uid_user:t}}),ne=e=>(console.log(e),I.post("/check-in/create-check-in",e));var O={exports:{}},j=1;function ie(){return j=(j*9301+49297)%233280,j/233280}function de(e){j=e}var ue={nextValue:ie,seed:de},S=ue,h="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-",p,B,y;function E(){y=!1}function X(e){if(!e){p!==h&&(p=h,E());return}if(e!==p){if(e.length!==h.length)throw new Error("Custom alphabet for shortid must be "+h.length+" unique characters. You submitted "+e.length+" characters: "+e);var t=e.split("").filter(function(l,s,u){return s!==u.lastIndexOf(l)});if(t.length)throw new Error("Custom alphabet for shortid must be "+h.length+" unique characters. These characters were not unique: "+t.join(", "));p=e,E()}}function ce(e){return X(e),p}function me(e){S.seed(e),B!==e&&(E(),B=e)}function pe(){p||X(h);for(var e=p.split(""),t=[],l=S.nextValue(),s;e.length>0;)l=S.nextValue(),s=Math.floor(l*e.length),t.push(e.splice(s,1)[0]);return t.join("")}function H(){return y||(y=pe(),y)}function fe(e){var t=H();return t[e]}function he(){return p||h}var D={get:he,characters:ce,seed:me,lookup:fe,shuffled:H},R=typeof window=="object"&&(window.crypto||window.msCrypto),$;!R||!R.getRandomValues?$=function(e){for(var t=[],l=0;l<e;l++)t.push(Math.floor(Math.random()*256));return t}:$=function(e){return R.getRandomValues(new Uint8Array(e))};var ge=$,ve=function(e,t,l){for(var s=(2<<Math.log(t.length-1)/Math.LN2)-1,u=-~(1.6*s*l/t.length),g="";;)for(var c=e(u),i=u;i--;)if(g+=t[c[i]&s]||"",g.length===+l)return g},ye=D,we=ge,Ie=ve;function ke(e){for(var t=0,l,s="";!l;)s=s+Ie(we,ye.get(),1),l=e<Math.pow(16,t+1),t++;return s}var be=ke,_=be,Ve=1567752802062,_e=7,C,L;function Ce(e){var t="",l=Math.floor((Date.now()-Ve)*.001);return l===L?C++:(C=0,L=l),t=t+_(_e),t=t+_(e),C>0&&(t=t+_(C)),t=t+_(l),t}var je=Ce,Pe=D;function Ue(e){if(!e||typeof e!="string"||e.length<6)return!1;var t=new RegExp("[^"+Pe.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]");return!t.test(e)}var Ae=Ue;(function(e){var t=D,l=je,s=Ae,u=0;function g(n){return t.seed(n),e.exports}function c(n){return u=n,e.exports}function i(n){return n!==void 0&&t.characters(n),t.shuffled()}function f(){return l(u)}e.exports=f,e.exports.generate=f,e.exports.seed=g,e.exports.worker=c,e.exports.characters=i,e.exports.isValid=s})(O);var Re=O.exports,Se=Re;const Ee=x(Se);console.log("");const $e=te({data(){return{loading:!1,search:"",itemsPerPage:5,rowsPerPageItems:[{title:"5",value:5},{title:"10",value:10},{title:"25",value:25},{title:"50",value:50}],headers:[{title:"UID",value:"uid_user"},{title:"Nombre",value:"name"},{title:"Mail",value:"email"},{title:"Teléfono",value:"phone"},{title:"ID Proyecto",value:"proyect_id"},{title:"Acciones",value:"actions"},{title:"Lista",value:"checkin"},{title:"Asistencia",value:"asist"}],name:"DownloadPdfButton",props:{pdfUrl:{type:String,required:!0},pdfFileName:{type:String,required:!0}},dialog:!1,dialogCheckin:!1,dialogProject:!1,dialogDelete:!1,selectedItem:{},selectItem:null,variant:null,checkInArray:[],usersArray:[],projectArray:[],projectsNames:[],projectId:0,totalRows:0,selectedProyect:null,items:[1,2,3,4,5,6,7,8,9,10],userRole:["Admin citt","Profesor","Alumno","CIA","MMT"],uidUser:["OIUUYFASD","ASDIUAD908","908DKJHAS"],loading:!1,userId:null,UID_USER:[],entryReason:null,entryDate:null,assited:!1,post:{uid_user:null,email:null,phone:null,name:null,hashed_password:null,run:null,project_id:null},itemId:null,errorText:"",passwordVisible:!1,studentName:null}},methods:{async checkIfAttendedToday(e){try{const t=new Date,l=`${t.getDate().toString().padStart(2,"0")}/${(t.getMonth()+1).toString().padStart(2,"0")}/${t.getFullYear()}`;return(await se(l,e)).data.length>0}catch(t){return console.error(`Error checking attendance for user ${e}:`,t),!1}},async getUsers(){let e=localStorage.getItem("project_id");console.log("get id",e),this.loading=!0;try{const t=await T(e);this.usersArray=t.data;const l=this.usersArray.map(async s=>{s.asistioHoy=await this.checkIfAttendedToday(s.uid_user)});await Promise.all(l)}catch(t){console.error("Error fetching users:",t)}finally{this.loading=!1}},async getProjects(){this.loading=!0;try{const e=await Q();this.projectArray=e.data,this.projectsNames=this.projectArray.map(t=>t.project_name),this.totalRows=e.data.total}catch(e){console.error("Error al obtener proyectos:",e)}finally{this.loading=!1}},async editItem(e){this.dialogCheckin=!0,this.userId=e.uid_user,this.studentName=e.name,console.log(this.userId)},async getCheckIn(){try{const e=await le();this.checkInArray=e.data}catch(e){console.log(e)}},async createCheckIn(){console.log("CREATE CHECKIN");const e={uid_user:this.userId,entry_date:null,entry_reason:this.studentName+": "+this.entryReason,times_entered:null};try{this.loading=!0;const t=await ne(e);console.log(t),console.log("REGISTRADO"),window.location.reload(),this.dialogCheckin=!1,this.loading=!1}catch(t){console.log(t)}},async createUser(){const t={uid_user:Ee.generate(),email:this.post.email,phone:this.post.phone,name:this.post.name,hashed_password:this.post.hashed_password,run:this.post.run,proyect_id:this.post.project_id};try{const l=await J(t);this.getUsers(),this.dialog=!1}catch(l){console.log(l)}},selectProject(){this.dialogProject=!1,this.loading=!0;const e=this.selectedItem.id;localStorage.setItem("project_id",e),this.getProjectById()},async getProjectById(){let e=localStorage.getItem("project_id");console.log("get id",e);try{const t=await T(e);this.usersArray=t.data,this.totalRows=t.data.total;const l=this.usersArray.map(async s=>{s.asistioHoy=await this.checkIfAttendedToday(s.uid_user)});console.log("asistencia",this.asistioHoy),await Promise.all(l),console.log("ARRAY",this.usersArray)}catch(t){console.error("Error al obtener usuarios:",t)}finally{this.loading=!1}},openDeleteDialog(e){this.dialogDelete=!0,this.itemId=e._id,console.log(this.itemId)},rutFormat(e){let t=e.replace(/^0+/,"");if(t=t.replace(/\./g,"").replace(/-/g,""),t.length>1){let l=t.slice(0,-1),s=t.slice(-1);return l=l.replace(/\B(?=(\d{3})+(?!\d))/g,"."),`${l}-${s}`}return e},validateRut(e){const t=this.rutFormat(e);return/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/.test(t)?!0:"El RUT ingresado es inválido"},phoneFormat(e){let t=e.replace(/\D/g,"");if(t.startsWith("9")&&(t.length===8||t.length===9)){if(t.length===9)return t.slice(0,1)+t.slice(1,5)+t.slice(5);if(t.length===8)return t.slice(0,1)+t.slice(1,4)+t.slice(4)}return e},validateEmail(e){return e?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)?!0:"El correo debe tener un formato válido y no contener espacios ni símbolos inválidos":"El correo es obligatorio"},validatePassword(e){return e?e.length<9?"La contraseña debe tener al menos 9 caracteres":/[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;"'<>,.?~`-]/.test(e)?!0:"La contraseña debe contener al menos una letra, símbolo o número":"La contraseña es obligatoria"},isFormValid(){return this.post.name&&this.post.email&&this.post.phone&&this.post.password&&this.post.project_id},async deleteItem(){try{this.loading=!0;const e=await Z(this.itemId);this.getUsers(),this.dialogDelete=!1,this.loading=!1}catch(e){console.error(e)}},logout(){localStorage.removeItem("project_id"),this.dialogProject=!0},downloadPdf(){console.log("PDFURLLLL"),console.log(this.pdfUrl);const e=document.createElement("a");e.href=this.pdfUrl,e.target="_blank",e.download=this.pdfFileName,document.body.appendChild(e),e.click(),document.body.removeChild(e)}},watch:{selectedProyect:function(e,t){console.log(this.projectsNames),e!==t&&this.getUsers()}},async created(){let e=localStorage.getItem("project_id");!e||e.trim()===""?this.dialogProject=!0:this.dialogProject=!1,await this.getUsers(),await this.getProjects()}}),De={class:"pa-4 text-center"},Ne=w("small",{class:"text-caption text-medium-emphasis"},"* Indica que el campo es obligatorio",-1),Fe=w("span",{class:"my-letra"},"Proyecto",-1),Te=w("p",{class:"letra-abajo"}," Es necesario que seleccione su proyecto para poder gestionar ",-1),qe=w("span",null,"Confirmar Eliminación",-1);function Be(e,t,l,s,u,g){const c=d("v-text-field"),i=d("v-col"),f=d("v-spacer"),n=d("v-btn"),N=d("v-divider"),Y=d("v-icon"),K=d("v-switch"),z=d("v-data-table"),v=d("v-card"),k=d("v-row"),P=d("v-card-title"),G=d("v-textarea"),b=d("v-card-text"),V=d("v-dialog"),F=d("v-autocomplete"),U=d("v-card-actions"),W=d("v-container");return oe(),re(ae,null,[o(k,{class:"month-table"},{default:r(()=>[o(i,{cols:"3"},{default:r(()=>[o(c,{modelValue:e.search,"onUpdate:modelValue":t[0]||(t[0]=a=>e.search=a),class:"mx-auto",density:"comfortable","menu-icon":"",placeholder:"Buscar Usuario","prepend-inner-icon":"mdi-magnify",theme:"light",variant:"solo","auto-select-first":"","item-props":"",hint:"Escriba para buscar",rounded:""},null,8,["modelValue"])]),_:1}),o(i,{cols:"3"},{default:r(()=>[o(f),o(n,{variant:"tonal",color:"primary","prepend-icon":"mdi-account",onClick:t[1]||(t[1]=a=>e.dialog=!0),text:"Registrar nuevo usuario"})]),_:1}),o(i,{cols:"3"},{default:r(()=>[o(f),o(n,{variant:"tonal",color:"red","prepend-icon":"mdi-logout",onClick:e.logout,text:"cambiar de proyecto"},null,8,["onClick"])]),_:1}),o(i,{cols:"12",sm:"12"},{default:r(()=>[o(v,{class:"mx-auto"},{default:r(()=>[o(N),o(i,null,{default:r(()=>[o(z,{"items-per-page":e.itemsPerPage,"onUpdate:itemsPerPage":t[2]||(t[2]=a=>e.itemsPerPage=a),"items-per-page-options":e.rowsPerPageItems,headers:e.headers,items:e.usersArray,loading:e.loading,search:e.search,"item-key":"uid_user"},{"item.actions":r(({item:a})=>[o(n,{class:"ml-2",color:"error",icon:"",size:"x-small",flat:"",onClick:A=>e.openDeleteDialog(a)},{default:r(()=>[o(Y,null,{default:r(()=>[m("mdi-delete")]),_:1})]),_:2},1032,["onClick"])]),"item.checkin":r(({item:a})=>[o(n,{class:"ml-2",color:"primary",flat:"",onClick:A=>e.editItem(a)},{default:r(()=>[m(" Ingresar ")]),_:2},1032,["onClick"])]),"item.asist":r(({item:a})=>[o(K,{modelValue:a.asistioHoy,"onUpdate:modelValue":A=>a.asistioHoy=A,inset:"",color:"primary"},null,8,["modelValue","onUpdate:modelValue"])]),_:1},8,["items-per-page","items-per-page-options","headers","items","loading","search"])]),_:1})]),_:1})]),_:1})]),_:1}),o(V,{modelValue:e.dialogCheckin,"onUpdate:modelValue":t[5]||(t[5]=a=>e.dialogCheckin=a),"max-width":"600"},{default:r(()=>[o(v,null,{default:r(()=>[o(P,null,{default:r(()=>[m("Registrar ingreso citt")]),_:1}),o(b,null,{default:r(()=>[o(k,null,{default:r(()=>[o(i,null,{default:r(()=>[o(G,{modelValue:e.entryReason,"onUpdate:modelValue":t[3]||(t[3]=a=>e.entryReason=a),label:"Motivo"},null,8,["modelValue"])]),_:1})]),_:1}),o(n,{class:"ml-2",flat:"",onClick:t[4]||(t[4]=a=>e.dialogCheckin=!1)},{default:r(()=>[m(" cancelar ")]),_:1}),o(n,{class:"ml-2",color:"primary",flat:"",onClick:e.createCheckIn},{default:r(()=>[m(" Registrar ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),w("div",De,[o(V,{modelValue:e.dialog,"onUpdate:modelValue":t[14]||(t[14]=a=>e.dialog=a),"max-width":"600"},{default:r(()=>[o(v,{"prepend-icon":"mdi-account",title:"Crear Usuario"},{default:r(()=>[o(b,null,{default:r(()=>[o(k,{dense:""},{default:r(()=>[o(i,{cols:"12",md:"4",sm:"6"},{default:r(()=>[o(c,{modelValue:e.post.name,"onUpdate:modelValue":t[6]||(t[6]=a=>e.post.name=a),label:"Nombre*",required:""},null,8,["modelValue"])]),_:1}),o(i,{cols:"12",md:"4",sm:"6"},{default:r(()=>[o(c,{modelValue:e.post.email,"onUpdate:modelValue":t[7]||(t[7]=a=>e.post.email=a),hint:"email@duocuc.cl/ email@profesor.duoc.cl",label:"Email*",rules:[e.validateEmail],required:""},null,8,["modelValue","rules"])]),_:1}),o(i,{cols:"12",md:"4",sm:"6"},{default:r(()=>[o(c,{modelValue:e.post.phone,"onUpdate:modelValue":t[8]||(t[8]=a=>e.post.phone=a),hint:"Ej: +56 9 XXXX XXXX",label:"Teléfono*",required:"",rules:[e.validatePhone],onInput:t[9]||(t[9]=a=>e.post.phone=e.phoneFormat(e.post.phone))},null,8,["modelValue","rules"])]),_:1}),o(i,{cols:"12",md:"4",sm:"6"},{default:r(()=>[o(c,{modelValue:e.post.password,"onUpdate:modelValue":t[10]||(t[10]=a=>e.post.password=a),hint:"Debe tener al menos 9 caracteres y contener al menos una letra, símbolo o número",label:"Contraseña*",rules:[e.validatePassword],required:"",type:e.passwordVisible?"text":"password","append-icon":"mdi-eye","onClick:append":t[11]||(t[11]=a=>e.passwordVisible=!e.passwordVisible)},null,8,["modelValue","rules","type"])]),_:1}),o(i,{cols:"12",sm:"6"},{default:r(()=>[o(F,{modelValue:e.post.project_id,"onUpdate:modelValue":t[12]||(t[12]=a=>e.post.project_id=a),label:"Selecciona un proyecto...",items:e.projectArray,"item-value":"project_id","item-title":"project_name",variant:"underlined",onChange:e.selectItem},null,8,["modelValue","items","onChange"])]),_:1})]),_:1}),Ne]),_:1}),o(N),o(U,null,{default:r(()=>[o(f),o(n,{text:"Cerrar",variant:"plain",onClick:t[13]||(t[13]=a=>e.dialog=!1)}),o(n,{color:"primary",text:"Crear usuario",variant:"tonal",onClick:e.createUser,disabled:!e.isFormValid()},null,8,["onClick","disabled"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),o(V,{modelValue:e.dialogProject,"onUpdate:modelValue":t[16]||(t[16]=a=>e.dialogProject=a),persistent:"",width:"600"},{default:r(()=>[o(v,null,{default:r(()=>[o(P,null,{default:r(()=>[Fe]),_:1}),o(b,null,{default:r(()=>[o(W,null,{default:r(()=>[o(k,null,{default:r(()=>[o(i,{cols:"12"},{default:r(()=>[o(F,{modelValue:e.selectedItem.id,"onUpdate:modelValue":t[15]||(t[15]=a=>e.selectedItem.id=a),label:"Selecciona un proyecto...",items:e.projectArray,"item-value":"project_id","item-title":"project_name",variant:"underlined",onChange:e.selectItem},null,8,["modelValue","items","onChange"]),Te]),_:1})]),_:1})]),_:1})]),_:1}),o(U,null,{default:r(()=>[o(f),o(n,{color:"primary",rounded:!0,elevation:"2",variant:"text",onClick:e.selectProject},{default:r(()=>[m(" Login ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),o(V,{modelValue:e.dialogDelete,"onUpdate:modelValue":t[18]||(t[18]=a=>e.dialogDelete=a),persistent:"","max-width":"500px"},{default:r(()=>[o(v,null,{default:r(()=>[o(P,null,{default:r(()=>[qe]),_:1}),o(b,null,{default:r(()=>[m(" ¿Estás seguro de que deseas eliminar esto? ")]),_:1}),o(U,null,{default:r(()=>[o(n,{onClick:t[17]||(t[17]=a=>e.dialogDelete=!1)},{default:r(()=>[m("Cancelar")]),_:1}),o(n,{color:"red",onClick:e.deleteItem},{default:r(()=>[m("Eliminar")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}const He=ee($e,[["render",Be]]);export{He as I,le as g};