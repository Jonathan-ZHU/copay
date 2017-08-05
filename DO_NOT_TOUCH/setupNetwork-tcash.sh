#!/bin/sh
filepath=$(cd "$(dirname "$0")"; pwd)
echo "正在配置网络参数..."

pathOnMac="${filepath}/../node_modules/bitcore-lib/lib/"
pathOnLinux="${filepath}/../node_modules/bitcore-wallet-client/node_modules/bitcore-lib/lib/"


if [ -d $pathOnLinux ]; then 
	cp -f ${filepath}/networks.js-tcash $pathOnLinux
else
	cp -f ${filepath}/networks.js-tcash $pathOnMac
fi
echo "完成！"
