class SpanElement {
    
}

class BlockElement {
    constructor(markdown) {
        this.markdown = markdown;
    }

}

class WeakBlock extends BlockElement {
    constructor(markdown) {
        super(markdown);
    }
}

class H1Block extends WeakBlock {
    constructor(markdown) {
        super(markdown);
    }

    getHtml() {
        console.log(super.markdown);
         return "<h1>" + this.markdown.substring(2) + "</h1>";
    }
}

class H2Block extends WeakBlock {
    constructor(markdown) {
        super(markdown);
    }

    getHtml() {
        return "<h2>" + this.markdown.substring(3) + "</h2>";
    }
}

class StrongBlock extends BlockElement {

}

class MarkdownParser {

    splitMarkdownIntoLines(markdown) {
        return markdown.split(/\r?\n/);
    }

    toHtml(markdown) {
        var markdownLines = this.splitMarkdownIntoLines(markdown);
        var currentBlock;
        var blocks = [];
        for(var i = 0; i < markdownLines.length; i++) {
            var currentStr = String(markdownLines[i]);
            if(currentStr.match("^# ")) {
                currentBlock = new H1Block(currentStr);
                blocks.push(currentBlock);
            }
            else if(currentStr.match("^## ")) {
                currentBlock = new H2Block(currentStr);
                blocks.push(currentBlock);
            }
            else if(currentStr.match("^* ")) {
                currentBlock = new ListBlock(currentStr);
            }
        }
        var html = "";
        for(var i = 0; i < blocks.length; i++) {
            html = html + blocks[i].getHtml()+"\n";
        }
        return html;
    }
}