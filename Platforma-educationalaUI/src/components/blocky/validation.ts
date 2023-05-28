import Blockly from "blockly";

const allowedChildren: Record<string, string[]> = {
    "document": ["head", "body", "script"],
    "form": ["input", "label"],
    "head": ["title", "div"],
    "table": ["thead", "tbody", "caption", "tr"],
    "tbody": ["tr"],
    "thead": ["tr"],
    "tr": ["th", "td"],
    "ul": ["li"],
    "ol": ["li"],
    "select": ["option"]
}

const allowedParents: Record<string, string[]> = {
    "id": ["attributes"],
    "style": ["attributes"],
    "script": ["document"],
    "GetElementById": ["script"]
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

    const parent = block.getSurroundParent()
    if (parent) {
        const { type: parentName } = parent
        if (allowedParents[blockName] && !allowedParents[blockName].includes(parentName)) {
            console.log("PARENT NOT OK", blockName, parentName, allowedParents[blockName])
            block.unplug(false)
            // block.setWarningText("Elementul nu poate fi atasat aici")
        }
    }

    const child = block.childBlocks_[0]
    if (child && allowedChildren[blockName]) {
        unplugInvalidChildren(child, (block) => allowedChildren[blockName].includes(block.type))
    }
}