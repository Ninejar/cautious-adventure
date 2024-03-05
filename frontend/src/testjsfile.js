// testjsfile.js
function toggleSubMenu(subMenuId) {
    var subMenu = document.getElementById(subMenuId);
    var navItem = document.getElementById(subMenuId.replace('SubMenu', 'NavItem'));
  
    if (subMenu.style.display === 'block') {
      subMenu.style.display = 'none';
      navItem.style.height = 'auto';
    } else {
      subMenu.style.display = 'block';
      navItem.style.height = navItem.scrollHeight + 'px';
    }
  }
  
  export { toggleSubMenu };
  