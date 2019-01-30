FROM gitpod/workspace-full

# add your tools here
USER root

RUN apt-get update && \
    apt-get install -y --no-install-recommends ghc-8.6.3 cabal-install-2.4 \
        zlib1g-dev libtinfo-dev libsqlite3-dev g++ netbase xz-utils make

RUN curl -fSL https://github.com/commercialhaskell/stack/releases/download/v1.9.1/stack-1.9.1-linux-x86_64.tar.gz -o stack.tar.gz && \
    curl -fSL https://github.com/commercialhaskell/stack/releases/download/v1.9.1/stack-1.9.1-linux-x86_64.tar.gz.asc -o stack.tar.gz.asc && \
    export GNUPGHOME="$(mktemp -d)" && \
    gpg --batch --keyserver ha.pool.sks-keyservers.net --recv-keys C5705533DA4F78D8664B5DC0575159689BEFB442 && \
    gpg --batch --verify stack.tar.gz.asc stack.tar.gz && \
    tar -xf stack.tar.gz -C /usr/local/bin --strip-components=1 && \
    /usr/local/bin/stack config set system-ghc --global true && \
    /usr/local/bin/stack config set install-ghc --global false && \
    rm -rf "$GNUPGHOME" /var/lib/apt/lists/* /stack.tar.gz.asc /stack.tar.gz

ENV PATH /root/.cabal/bin:/root/.local/bin:/opt/cabal/2.4/bin:/opt/ghc/8.6.3/bin:$PATH