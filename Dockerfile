FROM node:latest

# Définir le répertoire de travail dans le conteneur
RUN mkdir /app
WORKDIR /app

RUN mkdir /app/node_modules
COPY  README.md /app/node_modules/

# Copier les fichiers de configuration SSH dans le conteneur
COPY sshd_config /etc/ssh/sshd_config


# Installer SSH et dialog
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends dialog openssh-server && \
    rm -rf /var/lib/apt/lists/*

# Configurer le service SSH
RUN mkdir /var/run/sshd

COPY README.md /app/node_modules/
# Changer le mot de passe root
RUN echo "root:Docker!" | chpasswd


# Copier les fichiers de package et installer les dépendances
COPY package.json yarn.lock /app/
RUN yarn install --network-timeout 600000 > yarn_install.log 2>&1

# Copier le reste du code source de l'application dans le conteneur
ADD . /app/
 
RUN chmod +x /app/docker-entrypoint.sh


# Exposer les ports sur lesquels l'application va tourner
EXPOSE 3000 2222

# Définir l'entrypoint
ENTRYPOINT ["/app/docker-entrypoint.sh"]

# Commande pour démarrer l'application et le service SSH
CMD ["/usr/sbin/sshd", "-D"]