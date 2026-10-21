const dialog=document.getElementById('max-dialog');
document.querySelectorAll('[data-max]').forEach(button=>button.addEventListener('click',()=>dialog.showModal()));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.getElementById('copy-message').addEventListener('click',async()=>{const text=document.getElementById('message-draft').textContent;try{await navigator.clipboard.writeText(text);dialog.querySelector('.status').textContent='Текст скопирован. Откройте MAX и вставьте его в сообщение.';}catch{dialog.querySelector('.status').textContent='Выделите и скопируйте текст сообщения выше.';}});
