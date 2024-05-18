import { Select, SelectItem, SelectProps } from "@nextui-org/react";

const buildings = [
    //     {
    //     name: "all",
    //     label: "All Buildings"
    // }
    {
        name: "N",
        label: "Building N"
    }, {
        name: "M",
        label: "Building M"
    }]


type BuildingSelectionProps = {
    defaultSelected?: string;
    selectProps?: Omit<SelectProps, "children">
}

export const BuildingSelection = ({ defaultSelected, selectProps }: BuildingSelectionProps) => {
    return <Select
        label="Building"
        fullWidth

        {...selectProps}
    >
        {
            buildings.map((building) => (
                <SelectItem key={building.name} value={building.name}>
                    {building.label}
                </SelectItem>
            ))
        }
    </Select>
}