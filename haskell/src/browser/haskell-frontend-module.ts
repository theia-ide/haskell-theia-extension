/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { HaskellClientContribution } from './haskell-contribution';
import { LanguageClientContribution } from "@theia/languages/lib/browser";
import { ContainerModule } from "inversify";
import { LanguageGrammarDefinitionContribution } from '@theia/monaco/lib/browser/textmate';
import { HaskellGrammarContribution } from './haskell-grammar-contribution';

export default new ContainerModule(bind => {
    // add your contribution bindings here

    bind(HaskellClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toDynamicValue(ctx => ctx.container.get(HaskellClientContribution));

    bind(LanguageGrammarDefinitionContribution).to(HaskellGrammarContribution).inSingletonScope();
});