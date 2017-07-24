#!/bin/sh
sed -i "s/MBC/DBC/g" `grep --exclude-dir={setup-for-mbc,../.*} MBC -rl ../`
sed -i "s/魔币/多宝金豆/g" `grep --exclude-dir={setup-for-mbc,../.*} 魔币 -rl ../`
sed -i "s/Mobicoin/Dbcoin/g" `grep --exclude-dir={setup-for-mbc,../.*} Mobicoin -rl ../`
