#!/bin/sh
echo "正在构建DBC钱包"
npm run apply:mbc && \
./DO_NOT_TOUCH/setupNetwork.sh && \
./DO_NOT_TOUCH/Unit2DBC.sh && \
echo "完成DBC钱包构建！"
