import Blockly from "blockly";

const allowedChildrenMap: Record<string, string[]> = {
    "document": ["head", "body", "footer"],
    "form": ["input", "label"],
    "head": ["title", "div"],
    "table": ["thead", "tbody", "caption", "tr"],
    "tbody": ["tr"],
    "thead": ["tr"],
    "tr": ["th", "td"],
    "ul": ["li"],
    "ol": ["li"],
}

function unplugInvalidChildren(startingChild: Blockly.Block, validCheck: (block: Blockly.Block) => boolean) {
    let block = startingChild
    while (block) {
        if (!validCheck(block)) {
            block.unplug(false)
            // block.setWarningText("Elementul nu poate fi atasat aici")
            return;
        }
        block = block.getNextBlock()
    }
}

export function blockyValidation(block: Blockly.BlockSvg) {
    const { type: blockName } = block

    const child = block.childBlocks_[0]
    if (child && allowedChildrenMap[blockName]) {
        unplugInvalidChildren(child, (block) => allowedChildrenMap[blockName].includes(block.type))
    }
}