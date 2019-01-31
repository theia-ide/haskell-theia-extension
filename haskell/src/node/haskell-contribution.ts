/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable } from "inversify";
import { IConnection, BaseLanguageServerContribution } from "@theia/languages/lib/node";
import { HASKELL_LANGUAGE_ID, HASKELL_LANGUAGE_NAME } from '../common';

@injectable()
export class HaskellContribution extends BaseLanguageServerContribution {

    readonly id = HASKELL_LANGUAGE_ID;
    readonly name = HASKELL_LANGUAGE_NAME;

    start(clientConnection: IConnection): void {
        const command = 'hie';
        const args: string[] = [
            '--lsp'
        ];
        console.info("starting haskell language server...")

        const serverConnection = this.createProcessStreamConnection(command, args);
        // serverConnection.reader.onError(err => console.log(err));
        this.forward(clientConnection, serverConnection);
    }

    protected onDidFailSpawnProcess(error: Error): void {
        super.onDidFailSpawnProcess(error);
        console.error("Error starting haskell language server.");
        console.error("Please make sure it is installed on your system.");
    }
}
