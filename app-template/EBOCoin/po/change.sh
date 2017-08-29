#!/bin/sh
en="EBOCoin"
zh="EBOCoin"
zhHK="EBOCoin"
sed -i "s/TCC/${zhHK}/g" `grep TCC -rl ./it.po`
sed -i "s/TCC/${zh}/g" `grep   TCC -rl ./zh.po`
sed -i "s/Tcash/${en}/g" `grep Tcash -rl ./en.po`
echo "修改成功!"
