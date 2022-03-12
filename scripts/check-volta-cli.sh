#!/bin/bash
echo "\n-----------------Running: check-volta-cli.sh---------------------"
echo "[DEV_SETUP]: checking if volta CLI (https://volta.sh/) binary is installed ...."

if volta -v > /dev/null; then
  echo "[DEV_SETUP]: ✅ Volta exists";
else
  echo "[DEV_SETUP]: 🌕 Could not find "volta" binary installed on your computer. Volta is used to automagically install or update node versions for you.";
  echo "[DEV_SETUP]: Downloading volta ....";
  curl https://get.volta.sh | bash;
  echo "[DEV_SETUP]: Finished downloading volta CLI. See https://volta.sh/ for more details";
fi

echo "-----------------Finished: check-volta-cli.sh---------------------\n"