// Generated by CoffeeScript 1.4.0
(function() {
  var capitalize, clickItem, escapeHTML, getAttributes, getDescription, getTags, hide, hideItemBox, init, moveMouse, show,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  escapeHTML = function(string) {
    return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  capitalize = function(word) {
    return word[0].toUpperCase() + word.slice(1);
  };

  getAttributes = function(item) {
    var divs;
    divs = item.getElementsByTagName('div');
    if (divs.length) {
      return divs[0].innerHTML;
    } else {
      return '';
    }
  };

  getDescription = function(item) {
    return item.getAttribute('data-description') || '';
  };

  getTags = function(item) {
    return (item.getAttribute('data-tags') || '').split(',');
  };

  show = function(e) {
    var attributes, descList, description, title;
    title = e.target.title;
    attributes = getAttributes(e.target);
    description = escapeHTML(getDescription(e.target));
    if (description) {
      if (__indexOf.call(getTags(e.target), 'bundle') >= 0 && description.indexOf('---') !== -1) {
        descList = description.split('---');
        description = "" + descList[0] + "<br><span style='color:#95af0c'>" + descList[1] + "</span>";
      }
      description = "<br>" + description;
    }
    hoverBox.innerHTML = "<div style='font-size:1.2em;color:rgb(230,230,230)'>" + title + "</div>" + attributes + description;
    return hoverBox.style.display = "block";
  };

  hide = function() {
    return hoverBox.style.display = "none";
  };

  moveMouse = function(e) {
    hoverBox.style.top = "" + (e.pageY + 28) + "px";
    return hoverBox.style.left = "" + (e.pageX - 154) + "px";
  };

  clickItem = function(e) {
    showItemInfo(e.target);
    e.preventDefault();
    return e.stopPropagation();
  };

  hideItemBox = function(e) {
    var a, els;
    a = e.target;
    if (a.getAttribute('class') !== 'item') {
      els = [];
      while (a) {
        els.push(a);
        a = a.parentNode;
      }
      if (__indexOf.call(els, itemBox) < 0) {
        return itemBox.style.display = 'none';
      }
    }
  };

  init = function() {
    window.hoverBox = document.getElementById("hoverbox");
    return window.itemBox = document.getElementById("itembox");
  };

  window.showItemInfo = function(item, link) {
    var b, blueprints, blueprintsHTML, bundleHTML, buyButton, buyHTML, chance, classes, classesHTML, description, hoverArea, i, image, imageUrl, index, isToken, isWeapon, itemName, j, listItem, marketPrice, name, option, quality, re, storePrice, style, tags, tagsHTML, title, url, wikiLink, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _m, _n, _o, _p, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    if (link == null) {
      link = true;
    }
    init();
    marketPrice = item.getAttribute('data-marketprice') || '';
    if (marketPrice) {
      marketPrice = marketPrice.replace(/[{}']/g, '').replace(/, /g, '<br>');
      _ref = ['Unique', 'Vintage', 'Strange', 'Genuine', 'Haunted'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        re = new RegExp(i, "g");
        marketPrice = marketPrice.replace(re, "<span class='" + (i.toLowerCase()) + "'>" + i + "</span>");
      }
      marketPrice = "<h3 id='marketprice'>" + marketPrice + "</h3>";
    }
    description = getDescription(item);
    storePrice = item.getAttribute('data-storeprice');
    imageUrl = item.getAttribute('data-image');
    blueprints = item.getElementsByTagName('ul');
    blueprintsHTML = '';
    if (blueprints.length) {
      blueprintsHTML = '<div id="blueprints">';
      for (_j = 0, _len1 = blueprints.length; _j < _len1; _j++) {
        b = blueprints[_j];
        chance = b.getAttribute('data-chance');
        blueprintsHTML += '<div class="blueprint">';
        _ref1 = b.getElementsByTagName('li');
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          i = _ref1[_k];
          for (j = _l = 0, _ref2 = i.getAttribute('data-count'); 0 <= _ref2 ? _l < _ref2 : _l > _ref2; j = 0 <= _ref2 ? ++_l : --_l) {
            name = i.title;
            index = i.getAttribute('data-index');
            style = "background-image:url(" + (i.getAttribute('data-image')) + ");";
            listItem = "<div title=\"" + name + "\" class='item-small'   style='" + style + "'></div>";
            if (index) {
              url = "/item/" + index;
            } else {
              name = name.replace('Any ', '').replace('Spy Watch', 'PDA2 Weapon');
              if (name.split(' ').length > 2) {
                name = name.replace('Weapon', 'Set');
              }
              url = "/search?q=" + (encodeURIComponent(name));
            }
            listItem = "<a href=\"" + url + "\" target='_blank'>" + listItem + "</a>";
            blueprintsHTML += listItem;
          }
        }
        blueprintsHTML += "<div title='Crafting Chance'   style='position:relative;top: 13px;margin-left:420px;'>  <h3>" + chance + "%</h3></div></div>";
      }
      blueprintsHTML += '</div>';
    }
    buyHTML = storePrice ? "<form style='position:absolute;bottom:19px;left:345px;'>$" + storePrice + "<br><input type='text' value='1' size='1' id='quantity' class='textbox'></form><a href='#' id='buybutton'></a>" : '';
    classesHTML = "<div id='classes' style='position:absolute;top:0;right:0'>";
    classes = item.getAttribute('data-classes');
    if (classes) {
      _ref3 = classes.split(',');
      for (_m = 0, _len3 = _ref3.length; _m < _len3; _m++) {
        i = _ref3[_m];
        classesHTML += "<a href='/search?q=" + i + "' target='_blank'><img title='" + i + "' width='40px' height='40px' src='/images/items/" + i + "_icon.png'></a><br>";
      }
    }
    classesHTML += "</div>";
    tagsHTML = "<div id='tags' style='position:absolute;top:-5px;left:5px'>";
    tags = getTags(item);
    if (tags.length) {
      isWeapon = __indexOf.call(tags, 'weapon') >= 0;
      isToken = __indexOf.call(tags, 'token') >= 0;
      title = image = '';
      _ref4 = ['primary', 'secondary', 'melee', 'pda2'];
      for (_n = 0, _len4 = _ref4.length; _n < _len4; _n++) {
        i = _ref4[_n];
        if (__indexOf.call(tags, i) >= 0) {
          if (isWeapon) {
            title = capitalize(i) + ' Weapon';
            image = i;
          } else if (isToken) {
            title = 'Slot Token';
            image = 'slot_token';
          }
        }
      }
      _ref5 = ['hat', 'misc'];
      for (_o = 0, _len5 = _ref5.length; _o < _len5; _o++) {
        i = _ref5[_o];
        if (__indexOf.call(tags, i) >= 0) {
          title = capitalize(i);
          image = i;
        }
      }
      if (isToken && classes) {
        title = 'Class Token';
        image = 'class_token';
      }
      if (title && image) {
        tagsHTML += "<a href='/search?q=" + title + "' target='_blank'><img title='" + title + "' width='50px' height='50px' src='/images/items/" + image + ".png'></a><br>";
      }
    }
    tagsHTML += "</div>";
    bundleHTML = __indexOf.call(tags, 'bundle') >= 0 && description.indexOf('---') !== -1 ? "<a href=\"/search?q=" + item.title + " Set\" target='_blank'><div class='rounded glow' style='display: inline-block; padding: 7px;'>View items</div></a>" : '';
    itemName = item.title;
    if (link) {
      itemName = "<a href='/item/" + item.id + "' target='_blank' class='glow' title='Go to Item Page'>" + itemName + "</a>";
    }
    wikiLink = "http://wiki.teamfortress.com/wiki/" + item.title;
    itemBox.innerHTML = "<h2 id='itemname'>" + itemName + "</h2>" + bundleHTML + "<a class='button' target='_blank' title='Open in Wiki' style='position:absolute;bottom:10px;left:10px;' href=\"" + wikiLink + "\">Wiki</a>" + marketPrice + "<form name='tf2outpostform' method='POST' action='http://www.tf2outpost.com/search'><input type='hidden' name='has1'><input class='button' style='position:absolute;bottom:10px;left:70px;margin:0;' type='submit' title='Find Trades' name='submit' value='Trades'><input type='hidden' name='type' value='any'><select id='quality' class='textbox' style='text-align:left'>  <option value='6'>Unique</option>  <option value='3'>Vintage</option>  <option value='11'>Strange</option>  <option value='1'>Genuine</option>  <option value='13'>Haunted</option>  <option value='5'>Unusual</option></select></form>" + buyHTML + "" + blueprintsHTML + "" + classesHTML + "" + tagsHTML + "";
    hoverArea = document.createElement('div');
    hoverArea.title = item.title;
    hoverArea.setAttribute('data-description', description);
    hoverArea.setAttribute('data-tags', tags);
    hoverArea.id = 'hoverarea';
    hoverArea.style.backgroundImage = "url('" + imageUrl + "')";
    hoverArea.innerHTML = "<div style='display:none'>" + (getAttributes(item)) + "</div>";
    hoverArea.addEventListener("mouseout", hide, false);
    hoverArea.addEventListener("mousemove", moveMouse, false);
    hoverArea.addEventListener("mouseover", show, false);
    itemBox.appendChild(hoverArea);
    buyButton = document.getElementById('buybutton');
    if (buyButton) {
      buyButton.onclick = function() {
        var quantity;
        quantity = document.getElementById('quantity').value;
        return window.open("http://store.steampowered.com/buyitem/440/" + item.id + "/" + quantity);
      };
    }
    quality = document.tf2outpostform.quality;
    quality.onchange = function() {
      return document.tf2outpostform.has1.value = "440," + item.id + "," + quality.value;
    };
    if (itemName.indexOf('Strange Part') === -1) {
      _ref6 = quality.options;
      for (i = _p = 0, _len6 = _ref6.length; _p < _len6; i = ++_p) {
        option = _ref6[i];
        if (marketPrice.indexOf(option.innerHTML) !== -1) {
          quality.selectedIndex = i;
          break;
        }
      }
    }
    quality.onchange();
    return itemBox.style.display = "block";
  };

  window.addHoverBox = function() {
    var item, _i, _len, _ref;
    init();
    _ref = document.getElementsByClassName('item');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      item.addEventListener("mouseout", hide, false);
      item.addEventListener("mousemove", moveMouse, false);
      item.addEventListener("mouseover", show, false);
      item.addEventListener("click", clickItem, false);
    }
    document.getElementById('container').addEventListener("click", hideItemBox, false);
    return document.onkeydown = function(e) {
      if (e.keyCode === 27) {
        return itemBox.style.display = 'none';
      }
    };
  };

}).call(this);
