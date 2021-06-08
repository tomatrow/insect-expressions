#! /usr/local/bin/fish
function send_npm_run -a cmd
    tmux send-keys "srcenv .env; npm run $cmd" C-m
end

tmux split-window -v
tmux selectp -t 0
send_npm_run dev
tmux split-window -h -p 66
send_npm_run theme-watch
tmux split-window -h
send_npm_run section-proxy
tmux selectp -t 3
send_npm_run start