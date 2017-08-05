#!/bin/sh
echo "正在修改URL至Tcash，请勿轻易使用该环境开发，也不要提交产生的git修改!"
sed "" "s/{{BWSURL}}/https:\/\/tcash.bws.tiny-calf.com\/bws\/api/g" `grep --exclude-dir=app-template --exclude-dir=DO_NOT_TOUCH --exclude-dir=.git --exclude=setup* {{BWSURL}} -rl ./`
sed "" "s/{{INSIGHTURL}}/https:\/\/tcash.insight.tiny-calf.com\/insight/g" `grep --exclude-dir=app-template --exclude-dir=DO_NOT_TOUCH --exclude-dir=.git --exclude=setup*  {{INSIGHTURL}} -rl ./`
echo "修改URL至Tcash成功"
