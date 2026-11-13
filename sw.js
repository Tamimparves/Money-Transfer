// সার্ভিস ওয়ার্কার: মোবাইলে সিস্টেম নোটিফিকেশন দেখানো ও ক্লিকে সাইট খোলার জন্য
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    for(const c of l){if('focus' in c)return c.focus()}
    return self.clients.openWindow('./');
  }));
});
// ভবিষ্যতে Web Push (সার্ভার থেকে) যোগ করলে এটিই কাজ করবে
self.addEventListener('push',e=>{
  let d={};try{d=e.data.json()}catch(_){}
  e.waitUntil(self.registration.showNotification(d.title||'নতুন নোটিফিকেশন',{body:d.body||'',tag:d.tag,icon:d.icon,vibrate:[120,60,120]}));
});
