echo "Installing dependencies..."
cd schema
bun install
cd ../server-app
bun install
cd ../web-app
bun install

