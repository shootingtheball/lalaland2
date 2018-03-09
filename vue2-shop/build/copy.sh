#!/bin/sh
cd /opt/source/zowork-cloud-dmall-wap-web/vue2-shop
cat pageheader > /opt/software/tomcat-wap/webapps/zowork-cloud-eshop-dmall-web/WEB-INF/views/index.jsp &&cat dist/index.html >>/opt/software/tomcat-wap/webapps/zowork-cloud-eshop-dmall-web/WEB-INF/views/index.jsp
mkdir /opt/software/tomcat-wap/webapps/zowork-cloud-eshop-dmall-web/WEB-INF/views/error
cat /opt/software/tomcat-wap/webapps/zowork-cloud-eshop-dmall-web/WEB-INF/views/index.jsp>/opt/software/tomcat-wap/webapps/zowork-cloud-eshop-dmall-web/WEB-INF/views/error/404.jsp
cat /opt/software/tomcat-wap/webapps/zowork-cloud-eshop-dmall-web/WEB-INF/views/index.jsp>/opt/software/tomcat-wap/webapps/zowork-cloud-eshop-dmall-web/WEB-INF/views/error/405.jsp
cat /opt/software/tomcat-wap/webapps/zowork-cloud-eshop-dmall-web/WEB-INF/views/index.jsp>/opt/software/tomcat-wap/webapps/zowork-cloud-eshop-dmall-web/WEB-INF/views/error/500.jsp
cat /opt/software/tomcat-wap/webapps/zowork-cloud-eshop-dmall-web/WEB-INF/views/index.jsp>/opt/software/tomcat-wap/webapps/zowork-cloud-eshop-dmall-web/WEB-INF/views/error/403.jsp



