#! /usr/local/bin/fish
function send_npm_run -a cmd
    tmux send-keys "srcenv .env; npm run $cmd" C-m
end

tmux split-window -v
tmux selectp -t 0
send_npm_run dev