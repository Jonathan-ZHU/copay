#!/bin/sh
echo "正在修改单位至DBC，请勿轻易使用该环境开发，也不要提交产生的git修改!" && \
sed  "" "s/MBC/DBC/g" `grep --exclude-dir=app-template --exclude-dir=DO_NOT_TOUCH --exclude-dir=.git --exclude=setup* MBC -rl ./` && \
sed  "" "s/魔币/多宝金豆/g" `grep --exclude-dir=app-template --exclude-dir=DO_NOT_TOUCH --exclude-dir=.git --exclude=setup*  魔币 -l ./` && \
sed  "" "s/Mobicoin/Dbcoin/g" `grep --exclude-dir=app-template --exclude-dir=DO_NOT_TOUCH --exclude-dir=.git --exclude=setup* Mobicoin -rl ./` && \
echo "修改单位至DBC成功!"
