#!/bin/sh
en="Tcash"
zh="TCC"
zhHK="TCC"
sed -i "s/魔幣/${zhHK}/g" `grep  MBC -rl ./it.po`
sed -i "s/魔币/${zh}/g" `grep   魔币 -rl ./zh.po`
sed -i "s/MMM/${en}/g" `grep MMM -rl ./en.po`
echo "修改成功!"
