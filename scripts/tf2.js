// Generated by CoffeeScript 1.3.3
(function() {
  var hide, hideitembox, moveMouse, openSummary, show,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  show = function(e) {
    hbox.innerHTML = e.target.firstChild.innerHTML;
    return hbox.style.display = "block";
  };

  hide = function() {
    return hbox.style.display = "none";
  };

  hideitembox = function(e) {
    var target, _ref;
    target = e.target || e.srcElement;
    if (target !== itembox && __indexOf.call(itembox.childNodes, target) < 0 && ((_ref = target.tagName) !== 'LI' && _ref !== 'A' && _ref !== 'INPUT')) {
      return itembox.style.display = 'none';
    }
  };

  moveMouse = function(e) {
    hbox.style.top = (e.pageY + 28) + "px";
    return hbox.style.left = (e.pageX - 154) + "px";
  };

  openSummary = function(e) {
    var buyButton, imageUrl, itemId, itemName, marketprice, storeprice;
    itemId = e.target.id;
    itemName = e.target.firstChild.innerHTML;
    marketprice = e.target.getAttribute('data-marketprice').replace(/[{}']/g, '').replace(/, /g, '<br>');
    storeprice = e.target.getAttribute('data-storeprice');
    if (storeprice) {
      storeprice = "$" + storeprice;
      buyButton = "<h3>" + storeprice + "</h3><a id='buy-button' href='http://store.steampowered.com/buyitem/440/" + itemId + "'></a>";
    } else {
      buyButton = '';
    }
    itembox.innerHTML = "<h2>" + itemName + "</h2>    <a class='button' target='_blank' style='position:absolute;bottom:10px;left:10px;' href='http://wiki.teamfortress.com/wiki/" + itemName + "'>Open in Wiki</a>    <h3>" + marketprice + "</h3>    <form name='tf2outpostform' method='POST' action='http://www.tf2outpost.com/search' target='_blank'>      <input type='hidden' name='has1' value='440," + itemId + ",6'>      <input class='button' style='position:absolute;bottom:10px;left:140px;' type='submit' name='submit' value='Find trades'>      <input type='hidden' name='type' value='any'>    </form>    " + buyButton;
    itembox.style.display = "block";
    imageUrl = e.target.lastChild.innerHTML;
    return itembox.style.backgroundImage = "url('" + imageUrl + "')";
  };

  window.onload = function() {
    var cell, icells, _i, _len;
    window.hbox = document.getElementById("hoverbox");
    window.itembox = document.getElementById("itembox");
    if (hbox) {
      icells = document.getElementsByTagName("li");
      for (_i = 0, _len = icells.length; _i < _len; _i++) {
        cell = icells[_i];
        cell.addEventListener("mouseout", hide, false);
        cell.addEventListener("mousemove", moveMouse, false);
        cell.addEventListener("mouseover", show, false);
        cell.addEventListener("click", openSummary, false);
      }
    }
    return document.addEventListener("click", hideitembox, false);
  };

}).call(this);
