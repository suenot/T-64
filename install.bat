ECHO OFF
title Install package
color a
ECHO Install BOWER and NPM package...?
ECHO PRESS ENTER
pause > nul
start bower install
start npm install