# !/bin/bash

echo "Switching path"
cd $MENU_APP_PATH

echo "Update data"
git pull
npm i
echo "Generate new files"
npm run generate

echo "Clear files in deploy path $MENU_PATH"
rm -r $MENU_PATH/*

echo "Copy new file into deploy path $MENU_PATH"
cp -r /dist $MENU_PATH

cd --
