### SCSS

The update to tables splits out the `scss` files into multiple partial files with specific functionality, with a main index file bringing them together.

#### Files

| Name                     | Description                              |
|--------------------------|------------------------------------------|
| data-tables              | index file, brings in all functionality  |
| data-table-v2-core       | Core styles and base modifiers, required |
| data-table-v2-action     | Action bar styles                        |
| data-table-v2-expandable | Expandable row styles                    |
| data-table-v2-sort       | Sortable header styles                   |

#### Modifiers

| Name                         | Description                                  |
|------------------------------|----------------------------------------------|
| sdt-data-table-v2--compact   | Change table row height to 24                |
| sdt-data-table-v2--short     | Change table row height to 32                |
| sdt-data-table-v2--tall      | Change table row height to 64                |
| sdt-data-table-v2--static    | Change default table width from 100% to auto |
| sdt-data-table-v2--no-border | Remove default border on table cells         |
| sdt-data-table-v2--nowrap    | Prevent word wrapping at th/td level         |

### JavaScript

#### Public Methods

| Name        | Params | Descriptions                                                                                                      |
|-------------|--------|-------------------------------------------------------------------------------------------------------------------|
| release     |        | Deletes the instance and removes document event listeners                                                         |
| refreshRows |        | When adding in new table rows, reinitialize parent-child relationships. Not required if not using expandable rows |

#### Events

| Key                      | Value                            | Description                                |
|--------------------------|----------------------------------|--------------------------------------------|
| eventBeforeExpand        | data-table-v2-beforetoggleexpand | Row expansion event                        |
| eventAfterExpand         | data-table-v2-aftertoggleexpand  | Row expansion event                        |
| eventBeforeSort          | data-table-v2-beforetogglesort   | Sort event                                 |
| eventAfterSort           | data-table-v2-aftertogglesort    | Sort event                                 |
| eventTrigger             | [data-event]                     | Data attribute for clickable events        |
| eventParentContainer     | [data-parent-row]                | Data attribute for event container         |


#### Options

| Key                      | Value                            | Description                                |
|--------------------------|----------------------------------|--------------------------------------------|
| selectorInit             | [data-table-v2]                  | Required css class to target table element |
| selectorToolbar          | .sdt-table--toolbar              | Toolbar parent selector                    |
| selectorActions          | .sdt-batch-actions               | Action bar parent selector                 |
| selectorCount            | [data-items-selected]            | Selected count span selector               |
| selectorActionCancel     | .sdt-batch-summary__cancel       | Action cancel button selector              |
| selectorCheckbox         | .sdt-checkbox                    | Checkbox class selector                    |
| selectorExpandCells      | .sdt-table-expand-v2             | Expand td selector                         |
| selectorExpandableRows   | .sdt-expandable-row-v2           | Expand tr selector                         |
| selectorParentRows       | .sdt-parent-row-v2               | Parent row selector                        |
| selectorChildRow         | [data-child-row]                 | Child row selector                         |
| selectorTableBody        | tbody                            | Generic tbody selector                     |
| classExpandableRow       | sdt-expandable-row-v2            | Expandable Row parent class                |
| classExpandableRowHidden | sdt-expandable-row--hidden-v2    | Initial hidden class                       |
| classExpandableRowHover  | sdt-expandable-row--hover-v2     | Hover styles class                         |
| classTableSortAscending  | sdt-table-sort-v2--ascending     | Ascending sort icon class                  |
| classTableSortActive     | sdt-table-sort-v2--active        | Active sort icon class                     |


### FAQ

**How do I sort the tables**
The table component does not sort the table for you, rather it emits an event and toggles the sort UI. It is up to the user to re-render the table rows sorted; you can see this in action `here`.

**How do I use the expandable rows**
If you would like to programmatically expand table rows, you can add the `sdt-expandable-row-v2` to the `selectorParentRows` elements.

**How do I activate the batch actions pane**
If you would like to programmatically activate the batch actions pane, you can add `sdt-batch-actions--active` to the `sdt-batch-actions` element.
