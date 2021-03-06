export class Card {
    public collapsed: boolean = false;
    public codeCollapsed: boolean = true;
    public outputCollapsed: boolean = false;

    public isCustomMarkdown: boolean = false;

    constructor(
        public id: number,
        public title: string,
        public sourceCode: string,
        public outputs: CardOutput[],
        public jupyterData: object,
        public kernel: string
    ) {}
}

export class CardOutput {
    constructor(
        public type: string,
        public output: string
    ) {}
}