#!/bin/sh
echo "正在修改单位至TCC，请勿轻易使用该环境开发，也不要提交产生的git修改!"
sed -i "s/MBC/TCC/g" `grep --exclude-dir=app-template --exclude-dir=DO_NOT_TOUCH --exclude-dir=.git --exclude=setup* MBC -rl ./`
sed -i "s/魔币/TCC/g" `grep --exclude-dir=app-template --exclude-dir=DO_NOT_TOUCH --exclude-dir=.git --exclude=setup*  魔币 -rl ./`
sed -i "s/Mobicoin/Tcash/g" `grep --exclude-dir=app-template --exclude-dir=DO_NOT_TOUCH --exclude-dir=.git --exclude=setup* Mobicoin -rl ./`
echo "修改单位至TCC成功!"
