//进入全屏
export function full(ele) {
  if (ele.requestFullscreen) {
      ele.requestFullscreen();
  } else if (ele.mozRequestFullScreen) {
      ele.mozRequestFullScreen();
  } else if (ele.webkitRequestFullscreen) {
      ele.webkitRequestFullscreen();
  } else if (ele.msRequestFullscreen) {
      ele.msRequestFullscreen();
  }
}
//退出全屏
export function exitFullscreen() {
  if(document.exitFullScreen) {
      document.exitFullScreen();
  } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
  } else if(document.msExitFullscreen) {
      document.msExitFullscreen();
  }
}
//判断当前是否为全屏
export function isFullScreen() {
  return  !! (
      document.fullscreen || 
      document.mozFullScreen ||                         
      document.webkitIsFullScreen ||       
      document.webkitFullScreen || 
      document.msFullScreen 
   );
}
//判断当前文档是否能切换到全屏
export function isFullscreenEnabled() {
  return  (
      document.fullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.msFullscreenEnabled
  );
}