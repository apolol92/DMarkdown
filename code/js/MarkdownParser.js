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
    constructor(markdownLines) {
        super(markdownLines);
    }

}

class ListBlock extends StrongBlock {
    constructor(markdownLines) {
        super(markdownLines);
    }
    getHtml() {
        var html = "<ul>\n";
        for (var i = 0; i < this.markdown.length; i++) {
            var currentStr = this.markdown[i];
            console.log(currentStr);
            if (currentStr.indexOf("* ")==0) {
                html = html + "<li>" + currentStr.substring(2) + "</li>\n"
            }
        }
        html = html + "</ul>"
        return html;
    }

}

class MarkdownParser {

    splitMarkdownIntoLines(markdown) {
        return markdown.split(/\r?\n/);
    }

    toHtml(markdown) {
        var markdownLines = this.splitMarkdownIntoLines(markdown);
        var currentBlock;
        var blocks = [];
        var listing = false;
        for (var i = 0; i < markdownLines.length; i++) {
            var currentStr = String(markdownLines[i]);
            if (currentStr.indexOf("# ")==0) {
                currentBlock = new H1Block(currentStr);
                blocks.push(currentBlock);
                listing = false;
            }
            else if (currentStr.indexOf("## ")==0) {
                currentBlock = new H2Block(currentStr);
                blocks.push(currentBlock);
                listing = false;
            }
            else if (currentStr.indexOf("* ")==0 && listing == false) {
                currentBlock = new ListBlock(markdownLines.slice(i,markdownLines.length));
                blocks.push(currentBlock);
                listing = true;
            }
        }
        var html = "";
        for (var i = 0; i < blocks.length; i++) {
            html = html + blocks[i].getHtml() + "\n";
        }
        return html;
    }
}