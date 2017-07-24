#!/bin/sh 
sed -i "s/MBC/DBC/g" `grep --exclude-dir=setup-for-mbc --exclude-dir=.git MBC -rl ../`
sed -i "s/魔币/多宝金豆/g" `grep --exclude-dir=setup-for-mbc --exclude-dir=.git 魔币 -rl ../`
sed -i "s/Mobicoin/Dbcoin/g" `grep --exclude-dir=setup-for-mbc --exclude-dir=.git Mobicoin -rl ../`
