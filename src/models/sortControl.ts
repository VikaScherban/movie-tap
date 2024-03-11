import {SortByOption} from "../constants/sort-control-const";

export interface SortControlData {
    currentSorting: SortByOption;
    onSortChanged: (value: SortByOption) => void;
}
