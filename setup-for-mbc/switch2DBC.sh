#!/bin/sh
sed -i "s/MBC/DBC/g" `grep MBC -rl ../www`
sed -i "s/魔币/多宝金豆/g" `grep 魔币 -rl ../www`
sed -i "s/Mobicoin/dbcash/g" `grep Mobicoin -rl ../www`
