#!/bin/sh
echo "正在构建MBC钱包"
npm run apply:mobiwallet && \
./DO_NOT_TOUCH/setupNetwork.sh && \
echo "完成MBC钱包构建！"
