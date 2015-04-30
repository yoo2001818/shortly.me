# MemoryShortener
Easily memorable URL shortener

# Requirements
- npm dependencies, You can install them with ```npm install```
- MongoDB server
- Dictionary database file

## Grabbing dictionary
I didn't include dictionary DB in this repositiory.
You can grab free dictionary from [http://wordnet.princeton.edu/wordnet/download/current-version/](Here).
Download the database files, And paste all the files into ```dict``` folder.

# Running
You may need to populate the dictionary database if you are running it for the
first time. The program should do it automatically, but you can call it manually
if you want to. You can type ```node lib/importer.js``` to populate database.

After populating the database, You can run the program with ```node index.js```.

The server's default port is 1337.
