import { dia } from "jointjs"

import DrawerShapesFactory from '../../view/DrawerShapesFactory'

const removeColumnSize = {width: 25, height: 25}

const renderColumn = (addColumnCellView: dia.CellView) => {
    let addColumnCell = addColumnCellView.model
    let graph = addColumnCell.graph

    const addColumnCellPosition: {x: number, y: number} = addColumnCell.get("position")
    const addColumnCellSize: {width: number, height: number} = addColumnCell.get("size")

    let column = DrawerShapesFactory.COLUMN.getShape() as dia.Element
    column.position(addColumnCellPosition.x, addColumnCellPosition.y)

    let removeColumn = DrawerShapesFactory.REMOVE_COLUMN.getShape() as dia.Element
    removeColumn.position(addColumnCellPosition.x, addColumnCellPosition.y)
    removeColumn.set("size", removeColumnSize)
    
    let columnName = DrawerShapesFactory.LABEL.getShape() as dia.Element
    columnName.position(addColumnCellPosition.x+removeColumnSize.width, addColumnCellPosition.y)
    columnName.resize(addColumnCellSize.width-removeColumnSize.width, addColumnCellSize.height)
    columnName.attr("label/text", "column")

    graph.addCells([column, columnName, removeColumn])

    column.embed(removeColumn)
    column.embed(columnName)
    
    addColumnCell.set(
        "position", 
        {
            x: addColumnCellPosition.x, 
            y: addColumnCellPosition.y + addColumnCellSize.height
        }
    )

    addColumnCell.getParentCell()?.embed(column)
    
}

export default renderColumn