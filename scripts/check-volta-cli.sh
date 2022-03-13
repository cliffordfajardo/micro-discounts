#!/bin/bash
echo "\n-----------------Running: check-volta-cli.sh---------------------"
echo "[DEV_SETUP]: 🔎 checking if volta CLI binary is installed on your computer.... (More info: https://volta.sh/)"


if volta -v > /dev/null 2>&1; then
  # Check for the existence of the binary. redirect output to stderror. Without this, this `2>&1` the command may fail on linux distros in CI environments (vercel etc)
  # https://stackoverflow.com/a/818265/2971795
  echo "[DEV_SETUP]: ✅ 'volta' binary exists on your computer";
else
  echo "[DEV_SETUP]: 🌕 Could not find "volta" binary installed on your computer. Volta is used to automagically install or update node versions for you.";
  echo "[DEV_SETUP]: ⬇️ Downloading volta ....";
  curl https://get.volta.sh | bash;
  echo "[DEV_SETUP]: Finished downloading volta CLI";
fi

echo "[DEV_SETUP]: See https://volta.sh/ for more details on volta";
echo "-----------------Finished: check-volta-cli.sh---------------------\n"
