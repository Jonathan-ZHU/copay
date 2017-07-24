#!/bin/sh
sed -i "s/DBC/DBC/g" `grep DBC -rl ../`
sed -i "s/多宝金豆/多宝金豆/g" `grep 多宝金豆 -rl ../`
sed -i "s/dbcash/dbcash/g" `grep dbcash -rl ../`
