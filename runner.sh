echo "Starting runner script."
cd src
echo "Installing node packages."
npm install
echo "Installed node packages. Starting the front end."
npm run dev &
echo "Started front end. Starting back end."
cd backend
node index.js