let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

let countItem = items.length;
let itemActive = 0;

// ✅ Pausar todos los videos cuando cambias de slide
function pauseAllVideos(){
  items.forEach(it => {
    const v = it.querySelector('video');
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  });
}

function showSlider(){
  pauseAllVideos();

  // remove item active old
  let itemActiveOld = document.querySelector('.slider .list .item.active');
  let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');

  if (itemActiveOld) itemActiveOld.classList.remove('active');
  if (thumbnailActiveOld) thumbnailActiveOld.classList.remove('active');

  // active new item
  items[itemActive].classList.add('active');
  thumbnails[itemActive].classList.add('active');
  setPositionThumbnail();
}

// event next click
next.onclick = function(){
  itemActive = itemActive + 1;
  if(itemActive >= countItem) itemActive = 0;
  showSlider();
}

// event prev click
prev.onclick = function(){
  itemActive = itemActive - 1;
  if(itemActive < 0) itemActive = countItem - 1;
  showSlider();
}

function setPositionThumbnail () {
  let thumbnailActive = document.querySelector('.thumbnail .item.active');
  if (!thumbnailActive) return;

  let rect = thumbnailActive.getBoundingClientRect();
  if (rect.left < 0 || rect.right > window.innerWidth) {
    thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
  }
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    itemActive = index;
    showSlider();
  });
});

// teclado (flechas)
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') next.click();
  if (e.key === 'ArrowLeft') prev.click();
});

// ✅ IMPORTANTE: eliminé COMPLETAMENTE el auto-run (setInterval)
