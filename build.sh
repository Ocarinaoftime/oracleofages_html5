#!/bin/bash
inotifywait -r -m -e modify /home/ocarina/OOAHTML5 |
    while read file_path file_event file_name; do
        npm run build
    done
 
