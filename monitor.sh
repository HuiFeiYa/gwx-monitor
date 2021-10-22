#!/bin/sh
monitor_start() {
  pm2 start service/index.js -f && npm run dev
}
action=$1

case "$action" in 
  start)
    monitor_start
    ;;

  esac