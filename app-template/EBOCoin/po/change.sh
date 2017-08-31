#!/bin/sh
en="EBOCoin"
zh="EBOCoin"
zhHK="EBOCoin"
sed -i "s/EBO/${zhHK}/g" `grep EBO -rl ./it.po`
sed -i "s/EBO/${zh}/g" `grep   EBO -rl ./zh.po`
sed -i "s/EBOCoin/${en}/g" `grep EBOCoin -rl ./en.po`
echo "修改成功!"
