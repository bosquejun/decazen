import { SelectItem } from "@nextui-org/react";
import { FieldValues } from "react-hook-form";
import { AVAILABLE_BUILDINGS } from "../common/building-selection";
import SelectInput, { SelectInputProps } from "./SelectInput";

type BuildingInputProps<TFormValues extends FieldValues> = Omit<SelectInputProps<TFormValues>, "children">;


export default function BuildingInput<TFormValues extends FieldValues>(props: BuildingInputProps<TFormValues>) {
    return <SelectInput {...props} defaultSelectedKeys={[AVAILABLE_BUILDINGS[0].name]}>
        {
            AVAILABLE_BUILDINGS.map(building => <SelectItem key={building.name} value={building.name}>{building.name}</SelectItem>)
        }
    </SelectInput>
}