#!/bin/sh
echo "正在构建DBC钱包"
npm run apply:tcash && \
./DO_NOT_TOUCH/macbug1.sh && \
./DO_NOT_TOUCH/Unit2TCC.sh && \
echo "完成DBC钱包构建！"
