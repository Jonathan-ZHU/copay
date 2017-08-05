#!/bin/sh
bwsrpl="{{BWSURL}}"
bws="https\:\/\/tcash\.bws\.tiny-calf\.com\/bws\/api"
insightrpl="{{INSIGHTURL}}"
insight="https\:\/\/tcash\.insight\.tiny-calf\.com\/insight"
echo "正在修改URL至Mobicoin，请勿轻易使用该环境开发，也不要提交产生的git修改!"
sed -i "s/${bwsrpl}/${bws}/g" `grep --exclude-dir=app-template --exclude-dir=DO_NOT_TOUCH --exclude-dir=.git --exclude=setup* ${bwsrpl} -rl ./`
sed -i "s/${insightrpl}/${insight}/g" `grep --exclude-dir=app-template --exclude-dir=DO_NOT_TOUCH --exclude-dir=.git --exclude=setup*  ${insightrpl} -rl ./`
echo "修改URL至Mobicoin成功"
