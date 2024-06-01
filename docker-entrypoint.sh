#!/bin/bash

# Démarrer le service SSH
#/bin/bash service ssh start

echo "Starting SSH..."
ssh-keygen -A
/usr/sbin/sshd -D

/bin/bash service ssh start 

export PATH="/app/node_modules:$PATH"
cd /app/
# yarn install
# Vérification du PATH et de l'environnement
echo "PATH: $PATH"
# which react-app-rewired
# react-app-rewired --version || { echo "react-app-rewired not found in PATH"; exit 1; }

# Démarrer l'application Node.js
exec yarn start