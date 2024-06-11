import { Select, SelectItem, SelectProps } from "@nextui-org/react";

export const AVAILABLE_BUILDINGS = [
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
            AVAILABLE_BUILDINGS.map((building) => (
                <SelectItem key={building.name} value={building.name}>
                    {building.label}
                </SelectItem>
            ))
        }
    </Select>
}