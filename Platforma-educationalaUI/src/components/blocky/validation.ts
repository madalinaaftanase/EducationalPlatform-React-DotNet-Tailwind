import Blockly from "blockly";

const allowedChildren: Record<string, string[]> = {
    "document": ["head", "body", "script", "attributes"],
    "form": ["input", "label", "div", "button", "attributes"],
    "head": ["title", "div", "attributes"],
    "table": ["thead", "tbody", "caption", "tr", "attributes"],
    "tbody": ["tr", "attributes"],
    "thead": ["tr", "attributes"],
    "tr": ["th", "td", "attributes"],
    "ul": ["li", "attributes"],
    "ol": ["li", "attributes"],
    "select": ["option", "attributes"],
    "GetElementById": ["onClick", "onMouseUp", "onMouseOver", "onMouseOut", "onMouseMove", "onMouseLeave", "onMouseEnter", "onMouseDown", "styleProp", "inner html"],
    "inner html": ["text"]
}

const allowedParents: Record<string, string[]> = {
    "id": ["attributes"],
    "style": ["attributes"],
    "script": ["document"],
    "styleProp": ["GetElementById"],
    "GetElementById": ["script", "onClick", "onMouseUp", "onMouseOver", "onMouseOut", "onMouseMove", "onMouseLeave", "onMouseEnter", "onMouseDown", "inner html", "Set Timeout", "Set Interval"],
    "inner html": ["GetElementById"]
}

const onlyOneChild: string[] = [
    "styleProp", "GetElementById"
]

function unplugInvalidChildren(startingChild: Blockly.Block, validCheck: (block: Blockly.Block) => boolean) {
    let block = startingChild
    while (block) {
        if (!validCheck(block)) {
            localStorage.setItem("warning", `${block.type} nu poate fi pus in ${startingChild.getSurroundParent().type}`)
            block.unplug(false)
            // block.setWarningText("Elementul nu poate fi atasat aici")
            return;
        }
        block = block.getNextBlock()
    }
}

export function blockyValidation(block: Blockly.BlockSvg) {
    const isDragInProgress = localStorage.getItem("isDragInProgress") === "true"
    if (isDragInProgress) return

    const { type: blockName } = block

    const parent = block.getSurroundParent()
    if (parent) {
        const { type: parentName } = parent
        if (allowedParents[blockName] && !allowedParents[blockName].includes(parentName)) {
            console.log(`Parent ${parentName} not ok for child ${blockName}`)
            block.unplug(false)
            // block.setWarningText("Elementul nu poate fi atasat aici")
        }
    }

    const child = block.childBlocks_[0]
    if (child && allowedChildren[blockName]) {
        unplugInvalidChildren(child, (block) => allowedChildren[blockName].includes(block.type))
    }

    const hasItemBefore = block.getParent()?.type !== parent?.type
    if (parent && hasItemBefore && onlyOneChild.includes(parent.type)) {
        console.log(parent.type, "can have only one child!")
        block.unplug(false)
    }
}