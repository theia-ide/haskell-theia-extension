/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable, inject } from "inversify";
import { BaseLanguageClientContribution, Workspace, Languages, LanguageClientFactory } from '@theia/languages/lib/browser';
import { HASKELL_LANGUAGE_ID, HASKELL_LANGUAGE_NAME } from '../common';

@injectable()
export class HaskellClientContribution extends BaseLanguageClientContribution {

    readonly id = HASKELL_LANGUAGE_ID;
    readonly name = HASKELL_LANGUAGE_NAME;

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace,
        @inject(Languages) protected readonly languages: Languages,
        @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory
    ) {
        super(workspace, languages, languageClientFactory);
    }

    protected get globPatterns() {
        return [
            '**/*.hs',
            '**/*.cabal',
            '**/*.lhs'
        ];
    }
}