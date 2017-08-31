#!/bin/sh
en="Tcash"
zh="TCC"
zhHK="tcc"
sed -i "s/EBO/${zhHK}/g" `grep EBO -rl ./it.po`
sed -i "s/EBO/${zh}/g" `grep   EBO -rl ./zh.po`
sed -i "s/EBOCoin/${en}/g" `grep EBOCoin -rl ./en.po`
echo "修改成功!"
