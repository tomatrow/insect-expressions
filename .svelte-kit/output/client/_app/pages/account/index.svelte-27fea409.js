import{S as t,i as n,s as a,e as o,t as e,c as r,a as s,g as c,d as i,f as u,E as f,h as p,F as h}from"../../chunks/vendor-2580730b.js";function l(t){let n,a,l;return{c(){n=o("div"),a=e("Hello from "),l=e(t[0])},l(o){n=r(o,"DIV",{});var e=s(n);a=c(e,"Hello from "),l=c(e,t[0]),e.forEach(i)},m(t,o){u(t,n,o),f(n,a),f(n,l)},p(t,[n]){1&n&&p(l,t[0])},i:h,o:h,d(t){t&&i(n)}}}var d=function(t,n,a,o){return new(a||(a=Promise))((function(e,r){function s(t){try{i(o.next(t))}catch(n){r(n)}}function c(t){try{i(o.throw(t))}catch(n){r(n)}}function i(t){var n;t.done?e(t.value):(n=t.value,n instanceof a?n:new a((function(t){t(n)}))).then(s,c)}i((o=o.apply(t,n||[])).next())}))};function v({page:t}){return d(this,void 0,void 0,(function*(){return{props:{path:t.path}}}))}function m(t,n,a){let{path:o}=n;return console.log(o),t.$$set=t=>{"path"in t&&a(0,o=t.path)},[o]}export default class extends t{constructor(t){super(),n(this,t,m,l,a,{path:0})}}export{v as load};