import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as o}from"./assets/vendor-8b6a13d8.js";const n=document.querySelector("form");n.addEventListener("submit",function(s){s.preventDefault();const t=parseInt(document.querySelector(".input-delay").value),i=document.querySelector('input[name="state"]:checked').value;new Promise((e,r)=>{setTimeout(i==="fulfilled"?()=>{e(t)}:()=>{r(t)},t)}).then(e=>{o.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight",timeout:3e3})}).catch(e=>{o.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topRight",timeout:3e3})})});
//# sourceMappingURL=commonHelpers2.js.map
