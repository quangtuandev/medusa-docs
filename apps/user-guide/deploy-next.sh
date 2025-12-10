#!/bin/bash

# Thông tin server
SERVER_USER="root"
SERVER_IP="159.223.59.177"
SERVER_PATH="/root/guidelines/apps/user-guide"      # thư mục trên server muốn upload vào
ARCHIVE_NAME="next_build.tar.gz"

echo "👉 Đang nén thư mục .next…"
tar -czf $ARCHIVE_NAME .next

echo "👉 Đang đẩy file lên server…"
scp $ARCHIVE_NAME ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}

# echo "👉 SSH vào server để giải nén…"
# ssh ${SERVER_USER}@${SERVER_IP} << EOF
#     mkdir -p $SERVER_PATH
#     tar -xzf /tmp/$ARCHIVE_NAME -C $SERVER_PATH
#     rm -f /tmp/$ARCHIVE_NAME
#     echo "✔ Đã giải nén vào $SERVER_PATH"
# EOF

echo "✔ Hoàn tất deploy!"
