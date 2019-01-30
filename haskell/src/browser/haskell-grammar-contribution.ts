/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { LanguageGrammarDefinitionContribution, TextmateRegistry } from "@theia/monaco/lib/browser/textmate";
import { injectable } from "inversify";
import { HASKELL_LANGUAGE_ID } from "../common";

@injectable()
export class HaskellGrammarContribution implements LanguageGrammarDefinitionContribution {

    readonly config: monaco.languages.LanguageConfiguration = {
        comments: {
            "lineComment": "--",
            "blockComment": ["{-", "-}"]
        },
        brackets: [
            ["{", "}"],
            ["[", "]"],
            ["(", ")"]
        ],
        autoClosingPairs: [
            { "open": "{", "close": "}" },
            { "open": "[", "close": "]" },
            { "open": "(", "close": ")" },
            { "open": "\"", "close": "\"", "notIn": ["string"] },
            { "open": "`", "close": "`", "notIn": ["string", "comment"] }
        ],
        surroundingPairs: [
            {open:"{", close: "}"},
            {open:"[", close: "]"},
            {open:"(", close:")"},
            {open:"'", close:"'"},
            {open:"\"", close:"\""},
            {open:"`", close:"`"}
        ],
        folding: {
            "offSide": true
        }
    };

    registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: HASKELL_LANGUAGE_ID,
            aliases: [
                "Haskell",
                "haskell"
            ],
            extensions: [
                ".hs"
            ]
        });

        monaco.languages.setLanguageConfiguration(HASKELL_LANGUAGE_ID, this.config);

        const haskellGrammar = require('../../data/haskell.tmLanguage.json');
        registry.registerTextmateGrammarScope('source.haskell', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: haskellGrammar
                };
            }
        });

        registry.mapLanguageIdToTextmateGrammar(HASKELL_LANGUAGE_ID, 'source.haskell');
    }

    registerCabal(registry: TextmateRegistry) {
        monaco.languages.register({
            "id": "cabal",
            "aliases": [
                "Cabal",
                "cabal"
            ],
            "extensions": [
                ".cabal"
            ]
        });

        monaco.languages.setLanguageConfiguration("cabal", {
            "comments": {
                "lineComment": "--",
                "blockComment": ["{-", "-}"]
            }
        });

        const grammar = require('../../data/cabal.tmLanguage.json');
        registry.registerTextmateGrammarScope('source.cabal', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: grammar
                };
            }
        });

        registry.mapLanguageIdToTextmateGrammar('cabal', 'source.cabal');
    }

    registerLiterateHaskell(registry: TextmateRegistry) {
        monaco.languages.register({
            "id": "literate haskell",
            "aliases": [
                "Literate Haskell",
                "literate Haskell"
            ],
            "extensions": [
                ".lhs"
            ]
        });

        monaco.languages.setLanguageConfiguration("cabal", this.config);

        const grammar = require('../../data/literateHaskell.tmLanguage.json');
        registry.registerTextmateGrammarScope('source.cabal', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: grammar
                };
            }
        });

        registry.mapLanguageIdToTextmateGrammar('cabal', 'source.cabal');
    }

}