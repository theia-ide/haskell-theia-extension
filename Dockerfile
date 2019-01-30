FROM gitpod/workspace-full

USER root

RUN curl -sSL https://get.haskellstack.org/ | sh

USER gitpod

RUN git clone https://github.com/haskell/haskell-ide-engine --recursive && \
    cd haskell-ide-engine && \
    stack install