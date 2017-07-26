#!/bin/sh
echo "正在修改单位至DBC，请勿轻易使用该环境开发，也不要提交产生的git修改！"
sed -i "s/MBC/DBC/g" `grep --exclude-dir=setup-for-mbc --exclude-dir=.git MBC -rl ../`
sed -i "s/魔币/多宝金豆/g" `grep --exclude-dir=setup-for-mbc --exclude-dir=.git 魔币 -rl ../`
sed -i "s/Mobicoin/Dbcoin/g" `grep --exclude-dir=setup-for-mbc --exclude-dir=.git Mobicoin -rl ../`
echo "修改单位至DBC成功！"
