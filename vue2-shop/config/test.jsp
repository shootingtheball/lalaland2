  <%@ page language="java" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <c:set var="ctx" value=""/>
    <aside id="sidebar">
    <div class="sidebar-search">
    <input id="left-menu-search" type="search"
    class="form-control input-sm" placeholder="搜索菜单..."> <a
    href="javascript:void(0)"><i class="search-close icon_search"></i></a>
    </div>
    <div class="sidebar-menu">
    <ul class="nav site-menu live-search-list" id="site-menu"
    data-plugin="custom-scroll" data-suppress-scroll-x="true"
    data-height="100%">
    <c:forEach var="menuItem" items="${leftSideMenus}"
               varStatus="status1">
      <li id="menu_${menuItem.id}" class="menu-title">
      <c:choose>
        <c:when test="${not empty menuItem.subMenus}">
          <i class="${menuItem.iconName}"></i>
          <span>${menuItem.name}</span>
          <ul class="main-menu">
          <c:forEach var="secondMenuItem" items="${menuItem.subMenus}"
                     varStatus="status2">

            <c:choose>
              <c:when test="${not empty secondMenuItem.subMenus}">
                <c:choose>
                  <c:when test="${secondMenuItem.active}">
                    <li id="menu_${secondMenuItem.id}" class="sub-item active">
                  </c:when>
                  <c:otherwise>
                    <li id="menu_${secondMenuItem.id}" class="sub-item">
                  </c:otherwise>
                </c:choose>

                <a href="javascript:void(0)"><span>${secondMenuItem.name}</span>
                <span class="float-xs-right"><i class="icon_plus"></i></span>
                </a>
                <ul class="sub-menu">
                <c:forEach var="thirdMenuItem"
                           items="${secondMenuItem.subMenus}" varStatus="status3">
                  <li id="menu_${thirdMenuItem.id}" class="menu-title">
                  <c:if
                    test="${not empty thirdMenuItem.uri}">
                    <a id="link_${thirdMenuItem.id}" class="menu_link"
                    href="${thirdMenuItem.uri}"> <span>${thirdMenuItem.name}</span>
                    </a>
                  </c:if>
                  <c:if test="${empty thirdMenuItem.uri}">
                    <a id="link_${thirdMenuItem.id}" class="menu_link"
                    href="javascript:void(0)"> <span>${thirdMenuItem.name}</span>
                    </a>
                  </c:if></li>
                </c:forEach>
                </ul></li>
              </c:when>
              <c:otherwise>
                <li id="menu_${secondMenuItem.id}" class="sub-item">
                <c:if
                  test="${not empty secondMenuItem.uri}">
                  <a id="link_${secondMenuItem.id}" class="menu_link"
                  href="${secondMenuItem.uri}"> <span>${secondMenuItem.name}</span>
                  </a>
                </c:if>
                <c:if test="${empty secondMenuItem.uri}">
                  <a id="link_${secondMenuItem.id}" class="menu_link"
                  href="javascript:void(0)"> <span>${secondMenuItem.name}</span>
                  </a>
                </c:if></li>
              </c:otherwise>
            </c:choose>


          </c:forEach>
          </ul>
        </c:when>
        <c:otherwise>
          <a id="link_${menuItem.id}" class="menu_link" href="${menuItem.uri}"><i
          class="${menuItem.iconName}" class="menu-title"></i><span>${menuItem.name}</span>
          </a>

        </c:otherwise>

      </c:choose>

      </li>
    </c:forEach>

    </div>
    <div class="sidebar-extra">
    <a href="#"><i class="icon_lock-open_alt"></i></a> <a href="#"><i
    class="icon_key_alt"></i></a> <a href="#"><i class="icon_lock_alt"></i></a>
    </div>
    </aside>
    <script type="text/javascript">
    var localStorage = window.localStorage;
    var menu_key = 'current_menu_id'
    $("#site-menu ul").removeClass("active");
    $("#site-menu li").removeClass("active");
    $(".menu_link").click(function() {
    localStorage.setItem(menu_key, this.id);
    });

    var currentMenuId = localStorage.getItem(menu_key);
    if (currentMenuId) {
    var container = $("#site-menu"), scrollTo = $("#" + currentMenuId);

    $("#" + currentMenuId).addClass("active");
    $("#" + currentMenuId).parents("li").addClass("active");
    $("#" + currentMenuId).parents("ul").addClass("active");
    container.animate({
    scrollTop : scrollTo.offset().top - container.offset().top
    + container.scrollTop() - 120
    });
    }
    </script>

