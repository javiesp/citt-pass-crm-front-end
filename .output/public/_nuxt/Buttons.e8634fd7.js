import{_ as u}from"./UiChildCard.vue.a915e851.js";import{_ as d,a as n,o as r,e as s,b as e,w as t,h as o,d as m,r as p,F as v,f as g,c as x,t as h}from"./entry.6abbcea1.js";const w={},y={class:"d-flex gap-3 align-center flex-column flex-wrap flex-xl-nowrap flex-sm-row fill-height d-flex justify-space-between"};function $(i,c){const l=n("v-btn");return r(),s("div",y,[e(l,null,{default:t(()=>[o("elevates (default)")]),_:1}),e(l,{variant:"flat",color:"primary"},{default:t(()=>[o("flat")]),_:1}),e(l,{variant:"tonal",color:"primary"},{default:t(()=>[o("tonal")]),_:1}),e(l,{variant:"outlined",color:"primary"},{default:t(()=>[o("outlined")]),_:1}),e(l,{variant:"text",color:"primary"},{default:t(()=>[o("text")]),_:1}),e(l,{variant:"plain",color:"primary"},{default:t(()=>[o("plain")]),_:1})])}const b=d(w,[["render",$]]),z={class:"d-flex gap-3 align-center flex-column flex-wrap flex-xl-nowrap flex-sm-row fill-height"},B=m({__name:"ColorsButtons",setup(i){const c=p(["primary","secondary","error","warning","success"]);return(l,a)=>{const f=n("v-btn");return r(),s("div",z,[(r(!0),s(v,null,g(c.value,_=>(r(),x(f,{key:_,color:_,variant:"flat"},{default:t(()=>[o(h(_),1)]),_:2},1032,["color"]))),128))])}}}),k={},C={class:"d-flex gap-3 justify-center align-center flex-column flex-wrap flex-xl-nowrap flex-sm-row fill-height"};function S(i,c){const l=n("v-btn");return r(),s("div",C,[e(l,{color:"primary",variant:"outlined"},{default:t(()=>[o("primary")]),_:1}),e(l,{color:"secondary",variant:"outlined"},{default:t(()=>[o("secondary")]),_:1}),e(l,{variant:"flat",disabled:""},{default:t(()=>[o(" Disabled ")]),_:1}),e(l,{color:"info",variant:"outlined"},{default:t(()=>[o("link")]),_:1})])}const j=d(k,[["render",S]]),I={},D={class:"d-flex gap-2 justify-space-around align-center flex-column flex-md-row fill-height"};function E(i,c){const l=n("v-btn");return r(),s("div",D,[e(l,{size:"x-small",color:"primary",flat:""},{default:t(()=>[o(" Extra small ")]),_:1}),e(l,{size:"small",color:"primary",flat:""},{default:t(()=>[o(" Small ")]),_:1}),e(l,{color:"primary",flat:""},{default:t(()=>[o(" Normal ")]),_:1}),e(l,{color:"primary",size:"large",flat:""},{default:t(()=>[o(" Large ")]),_:1}),e(l,{size:"x-large",color:"primary",flat:""},{default:t(()=>[o(" Extra large ")]),_:1})])}const N=d(I,[["render",E]]),T={class:"d-flex flex-wrap gap-3 my-2 align-center flex-column flex-wrap flex-xl-nowrap flex-sm-row fill-height"},F=m({__name:"TextButtons",setup(i){const c=p(["primary","secondary","success","error","warning"]);return(l,a)=>{const f=n("v-btn");return r(),s("div",T,[(r(!0),s(v,null,g(c.value,_=>(r(),x(f,{key:_,color:_,variant:"text"},{default:t(()=>[o(h(_),1)]),_:2},1032,["color"]))),128))])}}}),L={},O={class:"d-flex flex-wrap justify-center gap-3 align-center flex-column flex-sm-row fill-height"};function V(i,c){const l=n("BellIcon"),a=n("v-btn");return r(),s("div",O,[e(a,{color:"primary",icon:"",size:"x-small",flat:""},{default:t(()=>[e(l,{"stroke-width":"1.5"})]),_:1}),e(a,{color:"secondary",icon:"",size:"small",flat:""},{default:t(()=>[e(l,{"stroke-width":"1.5"})]),_:1}),e(a,{color:"success",icon:"",flat:""},{default:t(()=>[e(l,{"stroke-width":"1.5"})]),_:1}),e(a,{color:"error",icon:"",size:"large",flat:""},{default:t(()=>[e(l,{"stroke-width":"1.5"})]),_:1}),e(a,{color:"warning",icon:"",size:"x-large",flat:""},{default:t(()=>[e(l,{"stroke-width":"1.5"})]),_:1})])}const q=d(L,[["render",V]]),H=m({__name:"Buttons",setup(i){return p(["primary","secondary","success","error","warning"]),(c,l)=>{const a=n("v-col"),f=n("v-row");return r(),x(f,null,{default:t(()=>[e(a,{cols:"12"},{default:t(()=>[e(f,null,{default:t(()=>[e(a,{cols:"12",sm:"12"},{default:t(()=>[e(u,{title:"Default"},{default:t(()=>[e(b)]),_:1})]),_:1}),e(a,{cols:"12",lg:"6"},{default:t(()=>[e(u,{title:"Colors"},{default:t(()=>[e(B)]),_:1})]),_:1}),e(a,{cols:"12",lg:"6"},{default:t(()=>[e(u,{title:"Outlined"},{default:t(()=>[e(j)]),_:1})]),_:1}),e(a,{cols:"12",lg:"12"},{default:t(()=>[e(u,{title:"Size"},{default:t(()=>[e(N)]),_:1})]),_:1}),e(a,{cols:"12",lg:"6"},{default:t(()=>[e(u,{title:"Text Color"},{default:t(()=>[e(F)]),_:1})]),_:1}),e(a,{cols:"12",lg:"6"},{default:t(()=>[e(u,{title:"Icon Size"},{default:t(()=>[e(q)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}});export{H as default};